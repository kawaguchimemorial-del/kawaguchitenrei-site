#!/usr/bin/env node
/**
 * GBP の口コミを読み取る／返信する（Google My Business API v4）。
 *
 *   node scripts/gbp/reviews.mjs                      # 一覧（読み取りのみ）
 *   node scripts/gbp/reviews.mjs --reply=<reviewId> --text-file=返信.txt   # dry-run
 *   node scripts/gbp/reviews.mjs --reply=<reviewId> --text="返信本文" --confirm
 *
 * 口コミ本文には投稿者名が含まれる。tmp/ に保存するのみで commit しない。
 */
import { getAuth, explainError, saveJson } from "./auth.mjs";

const ACCOUNT = "accounts/100808672342933280965";
const LOCATION = "locations/3951486682924761892";
const BASE = `https://mybusiness.googleapis.com/v4/${ACCOUNT}/${LOCATION}/reviews`;

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);

async function main() {
  const auth = getAuth();
  const { token } = await auth.getAccessToken();
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  if (args.reply) {
    if (args["text-file"]) args.text = (await import("node:fs")).readFileSync(args["text-file"], "utf8").trim();
    if (!args.text) throw new Error("--text または --text-file が必要です");
    const url = `${BASE}/${args.reply}/reply`;
    console.log(`返信先: ${url}\n本文:\n${args.text}\n`);
    if (!args.confirm) {
      console.log("dry-run: 送信していません。--confirm で送信します。");
      return;
    }
    const res = await fetch(url, { method: "PUT", headers, body: JSON.stringify({ comment: args.text }) });
    const body = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(body));
    console.log("送信しました:", JSON.stringify(body, null, 2));
    return;
  }

  const res = await fetch(`${BASE}?pageSize=50&orderBy=updateTime desc`, { headers });
  const body = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(body));
  saveJson("tmp/gbp/reviews-latest.json", body);
  console.log(`口コミ合計: ${body.totalReviewCount ?? "?"} 件 / 平均 ${body.averageRating ?? "?"}\n`);
  for (const r of body.reviews ?? []) {
    console.log(`--- ${r.reviewId}`);
    console.log(`  ${r.starRating}  ${r.createTime}  更新 ${r.updateTime}`);
    console.log(`  本文: ${r.comment ?? "(本文なし)"}`);
    console.log(`  返信: ${r.reviewReply ? r.reviewReply.comment : "(未返信)"}`);
  }
}

main().catch((e) => {
  console.error(explainError ? explainError(e) : e);
  process.exit(1);
});
