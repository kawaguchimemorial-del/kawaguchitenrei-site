#!/usr/bin/env node
// 広告LP（/lp/）の日次チェック。読み取り専用・集計値のみ。
// 使い方: node --env-file=.env.local scripts/lp-daily-check.mjs 2026-09-24
// 記録先: docs/ad-lp/daily/（松澤依頼 2026-09-25：LPの状態を毎日チェックして積み上げる）
// 認証情報は --env-file で渡す。値やエラー本文は出力しない。
import { google } from "googleapis";

const day = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(day || "")) {
  console.error("Usage: node --env-file=.env.local scripts/lp-daily-check.mjs YYYY-MM-DD");
  process.exit(1);
}
const env = (n) => process.env[n]?.trim();
const propertyId = env("GA4_PROPERTY_ID")?.replace(/^properties\//, "");
const auth = new google.auth.OAuth2(env("GOOGLE_OAUTH_CLIENT_ID"), env("GOOGLE_OAUTH_CLIENT_SECRET"));
auth.setCredentials({ refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN") });
const api = google.analyticsdata({ version: "v1beta", auth });

const re = (fieldName, value) => ({ filter: { fieldName, stringFilter: { matchType: "FULL_REGEXP", value, caseSensitive: false } } });
const and = (...expressions) => ({ andGroup: { expressions } });
const lpLanding = re("landingPagePlusQueryString", "^/lp([/?].*)?$");
const lpPage = re("pagePath", "^/lp.*");

async function run(dimensions, metrics, dimensionFilter, limit = 100) {
  try {
    const r = await api.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: day, endDate: day }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        dimensionFilter,
        limit,
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
const sum = (rows, i = 0) => (Array.isArray(rows) ? rows.reduce((s, r) => s + r.v[i], 0) : null);

const out = { date: day, fetchedAt: new Date().toISOString() };

// 1. LP入口セッション（チャネル別）
const channels = await run(["sessionDefaultChannelGroup"], ["sessions", "engagedSessions"], lpLanding);
out.entrySessions = sum(channels);
out.entryByChannel = Array.isArray(channels) ? Object.fromEntries(channels.map((r) => [r.k[0], r.v[0]])) : channels;

// 2. LP上のイベント（件数・人数）
const events = await run(["eventName"], ["eventCount", "totalUsers"], and(lpPage,
  re("eventName", "^(page_view|lp_view|lp_click_tel|lp_contact_open|lp_plan_open|lp_form_start|lp_generate_lead|generate_lead|scroll)$")));
out.events = Array.isArray(events) ? Object.fromEntries(events.map((r) => [r.k[0], { count: r.v[0], users: r.v[1] }])) : events;

// 3. 電話タップ：ブラウザ別（アプリ内ブラウザの偏りを見る）
const telBrowser = await run(["browser"], ["eventCount", "totalUsers"], re("eventName", "^lp_click_tel$"));
out.telByBrowser = Array.isArray(telBrowser) ? Object.fromEntries(telBrowser.map((r) => [r.k[0], { count: r.v[0], users: r.v[1] }])) : telBrowser;

// 4. 電話タップ：ボタン位置別（2026-09-23 登録のカスタムディメンション）
const telPlace = await run(["customEvent:cta_placement"], ["eventCount", "totalUsers"], re("eventName", "^lp_click_tel$"));
out.telByPlacement = Array.isArray(telPlace) ? Object.fromEntries(telPlace.map((r) => [r.k[0], { count: r.v[0], users: r.v[1] }])) : telPlace;

// 5. 電話タップ：時間帯別（連打・深夜の偏り）
const telHour = await run(["hour"], ["eventCount", "totalUsers"], re("eventName", "^lp_click_tel$"));
out.telByHour = Array.isArray(telHour)
  ? Object.fromEntries(telHour.sort((a, b) => Number(a.k[0]) - Number(b.k[0])).map((r) => [r.k[0], { count: r.v[0], users: r.v[1] }]))
  : telHour;

// 6. プラン別の関心（2026-09-23 登録のカスタムディメンション）
const plan = await run(["customEvent:plan_slug"], ["eventCount", "totalUsers"], re("eventName", "^lp_plan_open$"));
out.planOpenBySlug = Array.isArray(plan) ? Object.fromEntries(plan.map((r) => [r.k[0], { count: r.v[0], users: r.v[1] }])) : plan;

// 6b. 区画ごとの到達人数（2026-09-25 導入の lp_section_view。ページ上から順）
const SECTION_ORDER = ["hero", "phone_box", "urgent", "reasons", "price", "halls", "preneed", "voice", "hall_map", "flow", "faq", "contact"];
const sections = await run(["customEvent:cta_placement"], ["totalUsers"], re("eventName", "^lp_section_view$"));
if (Array.isArray(sections)) {
  const map = Object.fromEntries(sections.map((r) => [r.k[0], r.v[0]]));
  out.sectionReachUsers = Object.fromEntries(SECTION_ORDER.map((name) => [name, map[name] ?? 0]));
} else out.sectionReachUsers = sections;

// 7. 計測の健全性：着地ページが空のセッションに入った lp_view（9/22から発生）
const split = await run(["landingPagePlusQueryString"], ["eventCount"], re("eventName", "^lp_view$"));
out.lpViewSplit = Array.isArray(split)
  ? { total: sum(split), emptyLanding: split.filter((r) => r.k[0] === "" || r.k[0] === "(not set)").reduce((s, r) => s + r.v[0], 0) }
  : split;

// 8. 入口の時間帯（深夜帯の割合）
const hours = await run(["hour"], ["sessions"], lpLanding);
if (Array.isArray(hours)) {
  const total = sum(hours);
  const night = hours.filter((r) => [20, 21, 22, 23, 0, 1, 2, 3, 4, 5].includes(Number(r.k[0]))).reduce((s, r) => s + r.v[0], 0);
  out.entryNight20to5 = { sessions: night, share: total ? Math.round((night / total) * 1000) / 10 : 0 };
}

console.log(JSON.stringify(out, null, 2));
