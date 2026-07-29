/**
 * Google ビジネスプロフィール（GBP）操作スクリプト共通の認証・共通処理。
 *
 * 【重要】このファイルは秘密情報を一切ログ出力しない。
 * トークン・クライアントシークレットを console に出す変更を加えてはならない。
 *
 * 前提:
 *   - .env.local に GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET /
 *     GOOGLE_OAUTH_REFRESH_TOKEN が設定されていること
 *   - refresh_token が business.manage スコープを含むこと
 *     （scripts/get-refresh-token.mjs --scope=all で再取得する）
 *   - Google の Business Profile API アクセス申請が承認済みであること
 */

import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

const ROOT = process.cwd();
const SCOPE = "https://www.googleapis.com/auth/business.manage";

/** .env.local を読む。値は返すだけで、出力は一切しない。 */
export function loadEnv() {
  const p = path.join(ROOT, ".env.local");
  if (!fs.existsSync(p)) {
    throw new Error(".env.local が見つかりません（プロジェクトルートで実行してください）");
  }
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[m[1]] = v.replace(/\\n/g, "\n");
  }
  return env;
}

export function getAuth() {
  const env = loadEnv();
  const id = env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const secret = env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  const token = env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim();
  if (!id || !secret || !token) {
    throw new Error(
      "GOOGLE_OAUTH_CLIENT_ID / SECRET / REFRESH_TOKEN が .env.local に揃っていません"
    );
  }
  const auth = new google.auth.OAuth2(id, secret);
  auth.setCredentials({ refresh_token: token });
  return auth;
}

/** 各 API クライアントをまとめて返す。 */
export function getClients() {
  const auth = getAuth();
  return {
    auth,
    accounts: google.mybusinessaccountmanagement({ version: "v1", auth }),
    info: google.mybusinessbusinessinformation({ version: "v1", auth }),
    qanda: google.mybusinessqanda({ version: "v1", auth }),
    performance: google.businessprofileperformance({ version: "v1", auth }),
  };
}

/**
 * locations.list / locations.get で取得するフィールド。
 * Business Information API は readMask が必須。
 */
export const READ_MASK = [
  "name",
  "title",
  "storefrontAddress",
  "phoneNumbers",
  "categories",
  "regularHours",
  "specialHours",
  "moreHours",
  "profile",
  "websiteUri",
  "serviceItems",
  "serviceArea",
  "attributes",
  "labels",
  "openInfo",
  "latlng",
  "metadata",
].join(",");

/**
 * API エラーを運用者に読める形にして投げ直す。
 * 承認前の「割り当て 0」は最も起こりやすい失敗なので個別に案内する。
 */
export function explainError(e) {
  const status = e?.response?.status;
  const msg = e?.response?.data?.error?.message || e?.message || String(e);
  if (status === 403 && /quota|permission|disabled|not been used/i.test(msg)) {
    return [
      "API 呼び出しが拒否されました。次のいずれかが未完了の可能性があります。",
      "  1. Google Cloud で 8 つの Business Profile 系 API を有効化していない",
      "  2. Business Profile API のアクセス申請が未承認（承認前は割り当て 0）",
      "  3. refresh_token に business.manage スコープが含まれていない",
      "     → node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all",
      "",
      `詳細: ${msg}`,
    ].join("\n");
  }
  if (status === 401) {
    return `認証に失敗しました。refresh_token を再取得してください。詳細: ${msg}`;
  }
  return `API エラー (status ${status ?? "不明"}): ${msg}`;
}

/** tmp/ 配下に JSON を保存する（tmp は .gitignore 対象）。 */
export function saveJson(relPath, data) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
  return full;
}

export { SCOPE };
