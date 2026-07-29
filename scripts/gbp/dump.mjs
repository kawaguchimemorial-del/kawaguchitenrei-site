#!/usr/bin/env node
/**
 * GBP の現在値をすべて読み取って tmp/ に保存する（読み取り専用・書き込みなし）。
 *
 *   node scripts/gbp/dump.mjs
 *
 * 出力: tmp/gbp/dump-<日付なし連番>.json ＋ 標準出力に要約
 *   - アカウント一覧
 *   - ロケーション（基本情報・カテゴリ・営業時間・説明文・サービス・属性）
 *   - Q&A
 *   - カテゴリ候補（「葬儀」で検索した結果 → categoryId を確定するため）
 *
 * このスクリプトは書き込みを一切行わない。apply.mjs の前に必ず実行し、
 * 出力を差し戻し用のバックアップとして保管する。
 */

import { getClients, READ_MASK, explainError, saveJson } from "./auth.mjs";
import { CATEGORY_INTENT } from "./desired.mjs";

const REGION = "JP";
const LANG = "ja";

async function main() {
  const { accounts, info, qanda } = getClients();
  const out = { fetchedAt: null, accounts: [], locations: [], qanda: {}, categoryCandidates: [] };

  console.log("=== GBP 現在値の取得（読み取りのみ） ===\n");

  // 1. アカウント
  const accRes = await accounts.accounts.list({ pageSize: 20 });
  out.accounts = accRes.data.accounts ?? [];
  console.log(`アカウント: ${out.accounts.length} 件`);
  for (const a of out.accounts) {
    console.log(`  ${a.name}  ${a.accountName ?? ""}  (${a.type ?? "-"})`);
  }
  if (out.accounts.length === 0) {
    console.log("\nアカウントが取得できませんでした。権限またはアクセス承認を確認してください。");
    return;
  }

  // 2. ロケーション
  for (const acc of out.accounts) {
    const locRes = await info.accounts.locations.list({
      parent: acc.name,
      readMask: READ_MASK,
      pageSize: 100,
    });
    for (const loc of locRes.data.locations ?? []) {
      out.locations.push({ account: acc.name, ...loc });
    }
  }
  console.log(`\nロケーション: ${out.locations.length} 件`);

  for (const loc of out.locations) {
    console.log(`\n--- ${loc.title ?? "(名称なし)"} (${loc.name}) ---`);
    console.log(`  メインカテゴリ : ${loc.categories?.primaryCategory?.displayName ?? "未設定"}`);
    const add = (loc.categories?.additionalCategories ?? []).map((c) => c.displayName);
    console.log(`  追加カテゴリ   : ${add.length ? add.join(" / ") : "なし"}`);
    console.log(`  電話           : ${loc.phoneNumbers?.primaryPhone ?? "未設定"}`);
    console.log(`  サイト         : ${loc.websiteUri ?? "未設定"}`);
    const desc = loc.profile?.description ?? "";
    console.log(`  説明文         : ${desc ? `${desc.length}文字` : "未設定"}`);
    console.log(`  サービス       : ${(loc.serviceItems ?? []).length} 件`);
    for (const s of loc.serviceItems ?? []) {
      const label =
        s.freeFormServiceItem?.label?.displayName ??
        s.structuredServiceItem?.serviceTypeId ??
        "(名称不明)";
      const price = s.price ? `${Number(s.price.units ?? 0).toLocaleString("ja-JP")}円` : "価格なし";
      console.log(`    - ${label} / ${price}`);
    }
    console.log(`  属性           : ${(loc.attributes ?? []).length} 件`);
    const periods = loc.regularHours?.periods ?? [];
    console.log(`  営業時間       : ${periods.length ? `${periods.length} 期間の設定あり` : "未設定"}`);

    // 3. Q&A
    try {
      const qRes = await qanda.locations.questions.list({
        parent: loc.name,
        pageSize: 50,
        answersPerQuestion: 3,
      });
      const qs = qRes.data.questions ?? [];
      out.qanda[loc.name] = qs;
      console.log(`  Q&A            : ${qs.length} 件`);
      for (const q of qs) {
        console.log(`    Q: ${(q.text ?? "").slice(0, 40)}  （回答 ${q.totalAnswerCount ?? 0} 件）`);
      }
    } catch (e) {
      console.log(`  Q&A            : 取得失敗（${e?.response?.status ?? "?"}）`);
    }
  }

  // 4. カテゴリ候補（categoryId を確定するため）
  try {
    const cRes = await info.categories.list({
      regionCode: REGION,
      languageCode: LANG,
      view: "BASIC",
      filter: `displayName=葬儀`,
      pageSize: 30,
    });
    out.categoryCandidates = cRes.data.categories ?? [];
    console.log(`\n=== カテゴリ候補（「葬儀」で検索）: ${out.categoryCandidates.length} 件 ===`);
    for (const c of out.categoryCandidates) {
      const forbidden = CATEGORY_INTENT.forbidden.some((f) => (c.displayName ?? "").includes(f));
      console.log(`  ${forbidden ? "[使用禁止] " : "          "}${c.displayName}  ${c.name}`);
    }
  } catch (e) {
    console.log(`\nカテゴリ候補の取得に失敗: ${e?.response?.status ?? "?"}`);
  }

  const path = saveJson("tmp/gbp/dump-latest.json", out);
  console.log(`\n保存しました: ${path}`);
  console.log("このファイルは差し戻し用のバックアップとして保管してください（tmp/ は git 追跡外）。");
}

main().catch((e) => {
  console.error("\n" + explainError(e));
  process.exit(1);
});
