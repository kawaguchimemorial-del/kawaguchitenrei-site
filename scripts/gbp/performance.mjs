#!/usr/bin/env node
/**
 * GBP パフォーマンス指標を取得する（読み取り専用）。
 * プレイブック §10「月次計測」を自動化するためのスクリプト。
 *
 *   node scripts/gbp/performance.mjs                     # 直近30日
 *   node scripts/gbp/performance.mjs --from=2026-07-01 --to=2026-07-31
 *
 * 最重要KPIは CALL_CLICKS（通話数）。葬儀は電話が主導線のため。
 */

import { getClients, READ_MASK, explainError, saveJson } from "./auth.mjs";

const METRICS = [
  ["BUSINESS_IMPRESSIONS_DESKTOP_MAPS", "マップ表示（PC）"],
  ["BUSINESS_IMPRESSIONS_DESKTOP_SEARCH", "検索表示（PC）"],
  ["BUSINESS_IMPRESSIONS_MOBILE_MAPS", "マップ表示（スマホ）"],
  ["BUSINESS_IMPRESSIONS_MOBILE_SEARCH", "検索表示（スマホ）"],
  ["CALL_CLICKS", "通話数 ★最重要"],
  ["WEBSITE_CLICKS", "サイトクリック"],
  ["BUSINESS_DIRECTION_REQUESTS", "ルート検索"],
  ["BUSINESS_CONVERSATIONS", "メッセージ"],
  ["BUSINESS_BOOKINGS", "予約"],
];

function arg(name, fallback) {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;
}

function ymd(d) {
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

async function main() {
  const { accounts, info, performance } = getClients();

  const today = new Date();
  const defFrom = new Date(today);
  defFrom.setUTCDate(defFrom.getUTCDate() - 30);
  const from = new Date(arg("from", defFrom.toISOString().slice(0, 10)));
  const to = new Date(arg("to", today.toISOString().slice(0, 10)));

  console.log(`=== GBP パフォーマンス ${from.toISOString().slice(0, 10)} 〜 ${to.toISOString().slice(0, 10)} ===\n`);

  const accRes = await accounts.accounts.list({ pageSize: 20 });
  const locations = [];
  for (const acc of accRes.data.accounts ?? []) {
    const r = await info.accounts.locations.list({
      parent: acc.name,
      readMask: "name,title",
      pageSize: 100,
    });
    for (const loc of r.data.locations ?? []) locations.push(loc);
  }

  const out = { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10), locations: [] };

  for (const loc of locations) {
    // Performance API は "locations/{id}" 形式を取る
    const locName = loc.name.startsWith("locations/") ? loc.name : `locations/${loc.name.split("/").pop()}`;
    console.log(`--- ${loc.title ?? locName} ---`);
    const rec = { name: locName, title: loc.title, metrics: {} };

    for (const [metric, label] of METRICS) {
      try {
        const res = await performance.locations.getDailyMetricsTimeSeries({
          name: locName,
          dailyMetric: metric,
          "dailyRange.startDate.year": ymd(from).year,
          "dailyRange.startDate.month": ymd(from).month,
          "dailyRange.startDate.day": ymd(from).day,
          "dailyRange.endDate.year": ymd(to).year,
          "dailyRange.endDate.month": ymd(to).month,
          "dailyRange.endDate.day": ymd(to).day,
        });
        const values = res.data.timeSeries?.datedValues ?? [];
        const total = values.reduce((a, v) => a + Number(v.value ?? 0), 0);
        rec.metrics[metric] = { label, total, days: values.length };
        console.log(`  ${label.padEnd(20)} ${String(total).padStart(6)}`);
      } catch (e) {
        rec.metrics[metric] = { label, error: e?.response?.status ?? "error" };
        console.log(`  ${label.padEnd(20)} 取得失敗 (${e?.response?.status ?? "?"})`);
      }
    }
    out.locations.push(rec);
    console.log("");
  }

  const p = saveJson("tmp/gbp/performance-latest.json", out);
  console.log(`保存しました: ${p}`);
  console.log("\n※この数値を docs/operations/gbp/ の月次ログに転記してください（プレイブック §10）。");
}

main().catch((e) => {
  console.error("\n" + explainError(e));
  process.exit(1);
});
