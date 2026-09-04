#!/usr/bin/env node
/**
 * 電話着信記録の集計
 *
 * 目的:
 *   フォームの件数だけでは深夜帯も広告も評価できないため、電話を数字にする。
 *   運用手順は docs/operations/2026-09-04-call-tracking.md
 *
 * 使い方:
 *   node scripts/analyze-calls.mjs docs/operations/call-log/calls-202609.csv
 *   node --env-file=.env.local scripts/analyze-calls.mjs <csv> --ga4
 *     → GA4 の click_tel（電話ボタンのタップ）を取得して並べて表示する
 *
 * CSV の列: date,hour,type,purpose,origin,result,note
 *
 * プライバシー方針（CLAUDE.md §12）:
 *   - この CSV に個人情報を書かない前提で作っている
 *   - note 列は集計に使わず、出力にも一切表示しない
 *   - 出力はターミナルのみ。ファイルには書かない
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const useGa4 = args.includes("--ga4");

if (!csvPath) {
  console.error("使い方: node scripts/analyze-calls.mjs <csvファイル> [--ga4]");
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error(`ファイルが見つかりません: ${csvPath}`);
  process.exit(1);
}

// ---- CSV 読み込み（note 列は読み捨てる） ----
const text = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
const lines = text.split(/\r?\n/).filter((l) => l.trim());
const header = lines[0].split(",").map((h) => h.trim());
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
for (const need of ["date", "hour", "type", "purpose", "origin", "result"]) {
  if (!(need in idx)) {
    console.error(`列 "${need}" がありません。テンプレートを確認してください。`);
    process.exit(1);
  }
}

const rows = [];
for (const line of lines.slice(1)) {
  const c = line.split(",");
  const hour = Number(c[idx.hour]);
  if (!c[idx.date] || Number.isNaN(hour)) continue;
  rows.push({
    date: c[idx.date].trim(),
    hour,
    type: (c[idx.type] || "").trim(),
    purpose: (c[idx.purpose] || "").trim(),
    origin: (c[idx.origin] || "").trim(),
    result: (c[idx.result] || "").trim(),
  });
}

if (!rows.length) {
  console.error("データ行がありません。");
  process.exit(1);
}

const dates = [...new Set(rows.map((r) => r.date))].sort();
const inbound = rows.filter((r) => r.type === "着信");

const line = (s = "") => console.log(s);
const bar = (n, max, width = 28) =>
  "█".repeat(Math.max(n > 0 ? 1 : 0, Math.round((n / Math.max(max, 1)) * width)));

const count = (list, key) => {
  const m = new Map();
  for (const r of list) m.set(r[key] || "(未記入)", (m.get(r[key] || "(未記入)") || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

line("=".repeat(64));
line(`電話記録の集計  ${path.basename(csvPath)}`);
line(`期間 ${dates[0]} 〜 ${dates[dates.length - 1]}（${dates.length}日分の記録）`);
line("=".repeat(64));
line();
line(`全件 ${rows.length}件（着信 ${inbound.length} / 発信 ${rows.length - inbound.length}）`);
line();

// ---- 時間帯別 ----
const byHour = new Array(24).fill(0);
for (const r of inbound) byHour[r.hour]++;
const maxHour = Math.max(...byHour);
line("── 時間帯別の着信 ──");
for (let h = 0; h < 24; h++) {
  if (!byHour[h] && (h < 6 || h > 22)) continue;
  line(`${String(h).padStart(2)}時 ${String(byHour[h]).padStart(3)} ${bar(byHour[h], maxHour)}`);
}
const band = (a, b) => byHour.slice(a, b + 1).reduce((s, v) => s + v, 0);
line();
line(`  深夜 0-5時 ${band(0, 5)}件  /  朝〜昼 6-17時 ${band(6, 17)}件  /  夜 18-23時 ${band(18, 23)}件`);
const night = band(0, 5);
line(
  night === 0
    ? "  → 深夜の着信は0件。この記録が続いても0のままなら、深夜配信の見直しを検討する材料になる"
    : `  → 深夜に${night}件。フォームでは0件でも電話は動いている。深夜配信は維持の根拠になる`,
);
line();

// ---- きっかけ別 ----
line("── きっかけ（origin）別の着信 ──");
const origins = count(inbound, "origin");
const maxOrigin = Math.max(...origins.map((o) => o[1]));
for (const [k, v] of origins) {
  line(`${k.padEnd(16)} ${String(v).padStart(3)} (${((100 * v) / inbound.length).toFixed(0)}%) ${bar(v, maxOrigin, 20)}`);
}
const unknown = origins.find(([k]) => k === "不明")?.[1] ?? 0;
if (unknown / inbound.length > 0.9) {
  line("  → 「不明」が9割超。聞き方を変えるか、origin は諦めて件数だけにする（3か月後の見直し項目）");
}
line();

// ---- 用件別 ----
line("── 用件（purpose）別の着信 ──");
for (const [k, v] of count(inbound, "purpose")) {
  line(`${k.padEnd(16)} ${String(v).padStart(3)} (${((100 * v) / inbound.length).toFixed(0)}%)`);
}
const attendee = inbound.filter((r) => r.purpose === "参列者").length;
if (attendee) {
  line(`  → 参列者からの電話が${attendee}件（${((100 * attendee) / inbound.length).toFixed(0)}%）。指名広告を減らす判断の材料になる`);
}
line();

// ---- 結果別 ----
line("── その後（result）──");
for (const [k, v] of count(rows, "result")) line(`${k.padEnd(16)} ${String(v).padStart(3)}`);
const done = rows.filter((r) => r.result === "施行").length;
if (inbound.length) {
  line(`  → 着信${inbound.length}件のうち施行${done}件（${((100 * done) / inbound.length).toFixed(1)}%）`);
}
line();

// ---- GA4 の click_tel と突き合わせ ----
if (useGa4) {
  const ROOT = process.cwd();
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    for (const l of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      if (!l || l.trim().startsWith("#")) continue;
      const i = l.indexOf("=");
      if (i < 0) continue;
      const k = l.slice(0, i).trim();
      let v = l.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  }
  const { google } = await import("googleapis");
  const PROP = (process.env.GA4_PROPERTY_ID || "").trim().replace(/^properties\//, "");
  const KEY = (process.env.GOOGLE_PRIVATE_KEY || "").split("\\n").join("\n").trim();
  const jwt = new google.auth.JWT({
    email: (process.env.GOOGLE_CLIENT_EMAIL || "").trim(),
    key: KEY,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
  const ad = google.analyticsdata({ version: "v1beta", auth: jwt });
  const range = { startDate: dates[0], endDate: dates[dates.length - 1] };
  const filter = { filter: { fieldName: "eventName", stringFilter: { value: "click_tel" } } };

  const byHourRes = await ad.properties.runReport({
    property: `properties/${PROP}`,
    requestBody: {
      dateRanges: [range],
      dimensions: [{ name: "hour" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: filter,
      limit: 30,
    },
  });
  const tel = new Array(24).fill(0);
  for (const r of byHourRes.data.rows ?? []) tel[+r.dimensionValues[0].value] = +r.metricValues[0].value;
  const telTotal = tel.reduce((s, v) => s + v, 0);

  line("── GA4 の電話ボタンのタップ（click_tel）との突き合わせ ──");
  line("時間帯      着信記録   サイトのタップ");
  for (let h = 0; h < 24; h++) {
    if (!byHour[h] && !tel[h]) continue;
    line(`${String(h).padStart(2)}時 ${String(byHour[h]).padStart(11)} ${String(tel[h]).padStart(12)}`);
  }
  line(`合計 ${String(inbound.length).padStart(11)} ${String(telTotal).padStart(12)}`);
  line();
  if (telTotal) {
    const ratio = (inbound.length / telTotal).toFixed(2);
    line(`  → 着信は、サイトのタップの ${ratio} 倍。`);
    line(`     1.0 より大きい分は、サイトを経由していない電話（役所・病院の案内、チラシ、紹介、広告LP経由）`);
  }
  line();

  const bySrcRes = await ad.properties.runReport({
    property: `properties/${PROP}`,
    requestBody: {
      dateRanges: [range],
      dimensions: [{ name: "sessionSourceMedium" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: filter,
      limit: 20,
    },
  });
  line("── サイトのタップの参照元（GA4）──");
  for (const r of bySrcRes.data.rows ?? []) {
    line(`${String(r.metricValues[0].value).padStart(4)} ${r.dimensionValues[0].value}`);
  }
  line();
  line("  ※ 広告の着地先が外部LPのままだと google/cpc はここに出ない。");
  line("     着地先を当社サイト /lp/ に移せば、広告からの電話タップも見えるようになる");
  line();
}

line("=".repeat(64));
line("※ この出力はターミナルのみ。ファイルには保存していない");
line("※ note 列は集計に使わず、表示もしていない");
