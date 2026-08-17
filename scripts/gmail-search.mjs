#!/usr/bin/env node
/**
 * Gmail 検索スクリプト（読み取り専用・用件限定）
 *
 * 目的:
 *   GBP API の承認/却下メールなど、「特定の用件のメールが届いているか」だけを確認する。
 *   受信箱を全部読むためのものではない。
 *
 * 使い方:
 *   node --env-file=.env.local scripts/gmail-search.mjs "検索クエリ"
 *   node --env-file=.env.local scripts/gmail-search.mjs --preset=gbp
 *   node --env-file=.env.local scripts/gmail-search.mjs "検索クエリ" --body   ← 本文も表示
 *
 * 前提:
 *   1) Google Cloud で Gmail API を有効化しておく
 *   2) node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all+gmail
 *      でトークンを取り直し、.env.local の GOOGLE_OAUTH_REFRESH_TOKEN を更新する
 *
 * プライバシー方針（CLAUDE.md §12 準拠）:
 *   - 権限は gmail.readonly のみ。送信・削除・変更は一切できない
 *   - 検索結果はターミナルに表示するだけで、ファイルには保存しない
 *   - 既定では 差出人 / 日付 / 件名 / 冒頭抜粋 のみ表示する
 *   - 本文の全文は --body を明示したときだけ表示する
 *   - 取得内容を commit しないこと
 */

import { google } from "googleapis";

const PRESETS = {
  // GBP API アクセス申請（2026-07-30 提出）の承認・却下・追加情報依頼を探す
  gbp: [
    'from:google.com ("Business Profile" OR "My Business" OR API)',
    '"Business Profile API"',
    '"Google My Business"',
    'subject:(API AND (access OR approved OR denied OR rejected))',
    'from:(noreply@google.com OR businessprofile-noreply@google.com)',
  ],
};

const args = process.argv.slice(2);
const showBody = args.includes("--body");
const presetArg = args.find((a) => a.startsWith("--preset="))?.split("=")[1];
const freeQuery = args.find((a) => !a.startsWith("--"));
const MAX = Number(args.find((a) => a.startsWith("--max="))?.split("=")[1] ?? 12);

let queries;
if (presetArg) {
  queries = PRESETS[presetArg];
  if (!queries) {
    console.error(`ERROR: --preset は ${Object.keys(PRESETS).join(" / ")} のいずれかです`);
    process.exit(1);
  }
} else if (freeQuery) {
  queries = [freeQuery];
} else {
  console.error("使い方: node --env-file=.env.local scripts/gmail-search.mjs \"検索クエリ\"");
  console.error("        node --env-file=.env.local scripts/gmail-search.mjs --preset=gbp");
  process.exit(1);
}

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim();

if (!clientId || !clientSecret || !refreshToken) {
  console.error("ERROR: GOOGLE_OAUTH_CLIENT_ID / SECRET / REFRESH_TOKEN が読み込まれていません（値は非表示）");
  process.exit(2);
}

const auth = new google.auth.OAuth2(clientId, clientSecret);
auth.setCredentials({ refresh_token: refreshToken });
const gmail = google.gmail({ version: "v1", auth });

function header(payload, name) {
  const h = payload?.headers?.find((x) => x.name.toLowerCase() === name.toLowerCase());
  return h?.value ?? "";
}

/** 本文（text/plain 優先）を取り出す */
function extractBody(payload) {
  if (!payload) return "";
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf8");
  }
  for (const p of payload.parts ?? []) {
    const t = extractBody(p);
    if (t) return t;
  }
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64")
      .toString("utf8")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ");
  }
  return "";
}

async function run(q) {
  console.log("\n" + "=".repeat(78));
  console.log("検索:", q);
  console.log("=".repeat(78));

  // 迷惑メール・ゴミ箱も含めて検索する（この種の通知は振り分けられやすい）
  const list = await gmail.users.messages.list({
    userId: "me",
    q,
    maxResults: MAX,
    includeSpamTrash: true,
  });
  const msgs = list.data.messages ?? [];
  if (msgs.length === 0) {
    console.log("  → 該当なし");
    return 0;
  }
  console.log(`  → ${msgs.length} 件`);

  for (const m of msgs) {
    const full = await gmail.users.messages.get({
      userId: "me",
      id: m.id,
      format: showBody ? "full" : "metadata",
      metadataHeaders: ["From", "Date", "Subject", "To"],
    });
    const p = full.data.payload;
    const labels = (full.data.labelIds ?? []).join(",");
    console.log("\n  ── ──────────────────────────────────────────────");
    console.log("  差出人:", header(p, "From"));
    console.log("  日付  :", header(p, "Date"));
    console.log("  件名  :", header(p, "Subject"));
    if (/SPAM|TRASH/.test(labels)) {
      console.log("  ⚠ 場所 :", labels.includes("SPAM") ? "迷惑メール" : "ゴミ箱");
    }
    console.log("  抜粋  :", (full.data.snippet ?? "").slice(0, 300));
    if (showBody) {
      const body = extractBody(p).trim();
      if (body) {
        console.log("  --- 本文 ---");
        console.log(
          body
            .split("\n")
            .slice(0, 60)
            .map((l) => "  " + l)
            .join("\n")
        );
      }
    }
  }
  return msgs.length;
}

const main = async () => {
  let total = 0;
  for (const q of queries) {
    try {
      total += await run(q);
    } catch (e) {
      const msg = e?.message || String(e);
      console.error(`\n  検索エラー（${q}）: ${msg}`);
      if (/insufficient authentication scopes/i.test(msg)) {
        console.error(
          "\n  → トークンに Gmail の権限がありません。次を実行してトークンを取り直してください:\n" +
            "     node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all+gmail"
        );
        process.exit(3);
      }
      if (/has not been used|is disabled|SERVICE_DISABLED/i.test(msg)) {
        console.error(
          "\n  → Google Cloud で Gmail API が有効化されていません。\n" +
            "     Console →「APIとサービス」→「ライブラリ」→「Gmail API」→「有効にする」"
        );
        process.exit(4);
      }
    }
  }
  console.log("\n" + "=".repeat(78));
  console.log(`合計 ${total} 件（重複を含む）`);
  console.log("※ この結果はファイルに保存していません。commit しないでください。");
};

main().catch((e) => {
  console.error("ERROR:", e?.message || String(e));
  process.exit(1);
});
