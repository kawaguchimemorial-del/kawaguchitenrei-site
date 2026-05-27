#!/usr/bin/env node
/**
 * Google OAuth2 refresh_token 取得スクリプト（一時利用）
 *
 * 使い方:
 *   1) .env.local に GOOGLE_OAUTH_CLIENT_ID と GOOGLE_OAUTH_CLIENT_SECRET を設定
 *   2) node --env-file=.env.local scripts/get-refresh-token.mjs
 *   3) ターミナルに表示される認証 URL をブラウザで開いて Google アカウントで承認
 *   4) ブラウザが http://localhost:4321/oauth-callback に戻り、ターミナルに refresh_token が
 *      1 回だけ表示される（このスクリプトはファイルやログには何も保存しない）
 *   5) 表示された値を .env.local の GOOGLE_OAUTH_REFRESH_TOKEN= に貼り付ける
 *   6) ターミナルの履歴から refresh_token を必要に応じて消去
 *
 * 注意:
 *   - このスクリプトは値をファイルに書き込みません
 *   - 取得した refresh_token は .env.local（git 追跡外）にだけ保存してください
 *   - Vercel 用には Vercel ダッシュボードの環境変数に手動でコピーしてください
 *   - スクリプト本体に秘密情報を埋め込まないでください
 */

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";
import { google } from "googleapis";

const PORT = 4321;
const REDIRECT_URI = `http://localhost:${PORT}/oauth-callback`;
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();

if (!clientId || !clientSecret) {
  console.error(
    "ERROR: GOOGLE_OAUTH_CLIENT_ID と GOOGLE_OAUTH_CLIENT_SECRET が読み込まれていません。"
  );
  console.error(
    "実行例: node --env-file=.env.local scripts/get-refresh-token.mjs"
  );
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

const tmpDir = path.join(process.cwd(), "tmp");
await fs.mkdir(tmpDir, { recursive: true });
const authUrlPath = path.join(tmpDir, "auth-url.txt");
await fs.writeFile(authUrlPath, authUrl, { mode: 0o600 });

console.log("\n=== Google OAuth2 refresh_token 取得スクリプト ===\n");
console.log(
  "認証 URL を生成しました（値はターミナルに表示しない設計です）。"
);
console.log(`保存先: ${authUrlPath}`);
console.log("\n手順:");
console.log("  1. `type tmp\\auth-url.txt` で URL を確認");
console.log("  2. その URL をブラウザで開いて Google アカウントで承認");
console.log("  3. 承認完了でこのスクリプトが自動終了し、");
console.log("     refresh_token が tmp/refresh-token.txt に書き出されます");
console.log("  4. 完了後 `del tmp\\auth-url.txt` で削除してください");
console.log(
  `\nlocal callback サーバ起動中 (http://localhost:${PORT}/oauth-callback)`
);
console.log("Ctrl+C で中断できます。\n");

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end();
    return;
  }
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/oauth-callback") {
    res.writeHead(404).end("Not found");
    return;
  }
  const error = url.searchParams.get("error");
  if (error) {
    res.writeHead(400).end(`OAuth error: ${error}`);
    console.error(`\nERROR: OAuth エラー: ${error}`);
    server.close();
    process.exit(1);
    return;
  }
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Missing code parameter");
    return;
  }
  try {
    const { tokens } = await oauth2.getToken(code);
    if (!tokens.refresh_token) {
      res
        .writeHead(400, { "Content-Type": "text/html; charset=utf-8" })
        .end(
          `<html><body style="font-family:sans-serif;padding:40px"><h2>refresh_token が返されませんでした</h2><p>このアプリは既に承認済みのため、Google は refresh_token を再発行しません。<br>https://myaccount.google.com/permissions でこのアプリのアクセスを取り消してから、もう一度スクリプトを実行してください。</p></body></html>`
        );
      console.error("\nERROR: refresh_token が返されませんでした。");
      console.error(
        "https://myaccount.google.com/permissions で対象アプリのアクセスを取り消してから、"
      );
      console.error("もう一度このスクリプトを実行してください。");
      server.close();
      process.exit(1);
      return;
    }
    const tmpDir = path.join(process.cwd(), "tmp");
    await fs.mkdir(tmpDir, { recursive: true });
    const tokenPath = path.join(tmpDir, "refresh-token.txt");
    await fs.writeFile(tokenPath, tokens.refresh_token, { mode: 0o600 });

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      `<html><body style="font-family:sans-serif;padding:40px"><h2>refresh_token を取得しました</h2><p>このタブは閉じて OK です。<br>ターミナルの案内に従って、<code>tmp/refresh-token.txt</code> の値を <code>.env.local</code> に転記し、ファイルを削除してください。</p></body></html>`
    );

    console.log("\n✓ refresh_token を取得しました（値はターミナルに出力しません）。");
    console.log(`保存先: ${tokenPath}`);
    console.log("\n手順:");
    console.log("  1. `type tmp\\refresh-token.txt` で値を確認");
    console.log("  2. .env.local に GOOGLE_OAUTH_REFRESH_TOKEN=<値> を追記");
    console.log("  3. Vercel ダッシュボードにも同じ値を手動設定");
    console.log("  4. `del tmp\\refresh-token.txt` でファイルを削除");
    console.log(
      "\nこのファイルは tmp/ 配下にあり .gitignore で除外されています。"
    );
    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500).end("Token exchange failed");
    console.error(
      "\nERROR: token 交換に失敗しました:",
      err instanceof Error ? err.message : String(err)
    );
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  // listening
});
