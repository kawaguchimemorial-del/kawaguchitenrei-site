#!/usr/bin/env node
// 本サイト（/lp/ 以外）の週次チェック。読み取り専用・集計値のみ。
// 使い方: node --env-file=.env.local scripts/site-weekly-check.mjs 2026-09-21 2026-09-27
// 記録先: docs/reports/site-weekly/（松澤依頼 2026-09-27：本サイトの離脱を週1回監視）
// 認証情報は --env-file で渡す。値やエラー本文は出力しない。
import { google } from "googleapis";

const [start, end] = process.argv.slice(2);
const valid = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || "");
if (!valid(start) || !valid(end) || start > end) {
  console.error("Usage: node --env-file=.env.local scripts/site-weekly-check.mjs YYYY-MM-DD YYYY-MM-DD");
  process.exit(1);
}
const env = (n) => process.env[n]?.trim();
const propertyId = env("GA4_PROPERTY_ID")?.replace(/^properties\//, "");
const auth = new google.auth.OAuth2(env("GOOGLE_OAUTH_CLIENT_ID"), env("GOOGLE_OAUTH_CLIENT_SECRET"));
auth.setCredentials({ refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN") });
const api = google.analyticsdata({ version: "v1beta", auth });

const re = (fieldName, value) => ({ filter: { fieldName, stringFilter: { matchType: "FULL_REGEXP", value, caseSensitive: false } } });
const and = (...expressions) => ({ andGroup: { expressions } });
const not = (expression) => ({ notExpression: expression });
const EXCLUDE_PATH = "^/(lp|admin|post|voice/survey)(/.*)?$";

async function run(dimensions, metrics, dimensionFilter, limit = 200, orderBys) {
  try {
    const r = await api.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        dimensionFilter,
        limit,
        orderBys,
      },
    }, { timeout: 30000 });
    return (r.data.rows || []).map((row) => ({
      k: row.dimensionValues.map((v) => v.value),
      v: row.metricValues.map((v) => Number(v.value)),
    }));
  } catch (error) {
    return { failed: error?.response?.status || "error" };
  }
}

const out = { period: { start, end }, fetchedAt: new Date().toISOString() };

// 1. 最初に開いたページ別（広告以外の流入）：来訪・読んだ割合・ページ数・成果
const landing = await run(
  ["landingPage"],
  ["sessions", "engagementRate", "screenPageViewsPerSession", "keyEvents"],
  and(not(re("landingPage", EXCLUDE_PATH)), re("sessionDefaultChannelGroup", "^(Organic Search|Direct|Referral|Organic Social|Unassigned)$")),
  15,
  [{ metric: { metricName: "sessions" }, desc: true }],
);
out.landingPages = Array.isArray(landing)
  ? landing.map((r) => ({ page: r.k[0], sessions: r.v[0], engagedRate: Math.round(r.v[1] * 100), pagesPerSession: Math.round(r.v[2] * 100) / 100, keyEvents: r.v[3] }))
  : landing;

// 2. 成果につながる操作（ページ別）
const actions = await run(
  ["eventName", "pagePath"],
  ["eventCount", "totalUsers"],
  and(not(re("pagePath", EXCLUDE_PATH)), re("eventName", "^(click_tel|click_contact_cta|click_estimate_cta|form_start|generate_lead)$")),
  100,
);
out.actions = Array.isArray(actions)
  ? actions.map((r) => ({ event: r.k[0], page: r.k[1], count: r.v[0], users: r.v[1] }))
  : actions;

// 3. 区画ごとの到達人数（2026-09-27 導入の site_section_view）
const sections = await run(
  ["pagePath", "customEvent:cta_placement"],
  ["totalUsers"],
  re("eventName", "^site_section_view$"),
  1000,
);
if (Array.isArray(sections)) {
  const byPage = {};
  for (const r of sections) (byPage[r.k[0]] ||= {})[r.k[1]] = r.v[0];
  // 主なページだけ残す（トップ・プラン一覧・ホール・プラン詳細・コラム上位）
  const focus = Object.entries(byPage)
    .map(([page, s]) => [page, s, Math.max(...Object.values(s))])
    .sort((a, b) => b[2] - a[2])
    .slice(0, 12);
  out.sectionReachUsers = Object.fromEntries(focus.map(([page, s]) => [page, s]));
} else out.sectionReachUsers = sections;

console.log(JSON.stringify(out, null, 2));
