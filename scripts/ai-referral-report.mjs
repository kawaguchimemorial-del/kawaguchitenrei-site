#!/usr/bin/env node
/**
 * AI 経由の参照（ChatGPT / OpenAI / Gemini / Perplexity / Copilot / Claude）を月別に集計する。
 * 読み取り専用。GA4 の sessionSource に AI 系の文字列を含むセッションを拾う。
 *
 *   node --env-file=.env.local scripts/ai-referral-report.mjs            # 直近4か月
 *   node --env-file=.env.local scripts/ai-referral-report.mjs --months=6
 *
 * 出力は月ごとの「セッション / キーイベント / 着地ページ上位」。
 * 注意：キーイベントは 1〜2 セッションで偏ることがある（2026-08 は /plan/ 2セッションで 8 件）。
 * 「傾向」として読む前に、着地ページの内訳を必ず見る。秘密情報・個人情報は出力しない。
 */
import { google } from "googleapis";

const months = +(process.argv.find((a) => a.startsWith("--months="))?.split("=")[1] ?? 4);
const KEY = (process.env.GOOGLE_PRIVATE_KEY || "").split("\n").join("\n").trim();
const jwt = new google.auth.JWT({
  email: (process.env.GOOGLE_CLIENT_EMAIL || "").trim(),
  key: KEY,
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});
const ad = google.analyticsdata({ version: "v1beta", auth: jwt });
const PROP = (process.env.GA4_PROPERTY_ID || "").trim().replace(/^properties\//, "");
const AI = ["chatgpt", "openai", "perplexity", "gemini", "copilot", "claude", "bing.com/chat"];

const today = new Date();
const periods = [];
for (let i = months - 1; i >= 0; i--) {
  const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i, 1));
  const y = d.getUTCFullYear(), m = d.getUTCMonth();
  const start = `${y}-${String(m + 1).padStart(2, "0")}-01`;
  const last = new Date(Date.UTC(y, m + 1, 0));
  const end = i === 0 ? today.toISOString().slice(0, 10) : last.toISOString().slice(0, 10);
  periods.push([`${y}-${String(m + 1).padStart(2, "0")}`, start, end]);
}

console.log("| 月 | AI セッション | キーイベント | 着地ページ上位（セッション/キーイベント） |");
console.log("|---|---:|---:|---|");
for (const [label, startDate, endDate] of periods) {
  try {
    const r = await ad.properties.runReport({
      property: `properties/${PROP}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }, { name: "landingPage" }],
        metrics: [{ name: "sessions" }, { name: "keyEvents" }],
        dimensionFilter: {
          orGroup: {
            expressions: AI.map((v) => ({
              filter: { fieldName: "sessionSource", stringFilter: { matchType: "CONTAINS", value: v } },
            })),
          },
        },
      },
    });
    const rows = (r.data.rows || []).map((x) => ({
      src: x.dimensionValues[0].value,
      lp: x.dimensionValues[1].value,
      s: +x.metricValues[0].value,
      k: +x.metricValues[1].value,
    }));
    const s = rows.reduce((a, x) => a + x.s, 0);
    const k = rows.reduce((a, x) => a + x.k, 0);
    const top = rows.sort((a, b) => b.s - a.s).slice(0, 5).map((x) => `${x.lp}（${x.s}/${x.k}）`).join("、");
    console.log(`| ${label}（${startDate}〜${endDate}） | ${s} | ${k} | ${top || "—"} |`);
  } catch (e) {
    console.log(`| ${label} | 取得失敗 | HTTP ${e?.response?.status ?? "?"} | |`);
  }
}
