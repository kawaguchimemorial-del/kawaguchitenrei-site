#!/usr/bin/env node
// Read-only, aggregate reporting. Load credentials with --env-file; never print values/errors.
import fs from "node:fs";
import { google } from "googleapis";
const args = process.argv.slice(2);
const validDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString().startsWith(value);
if (
  args.length !== 4 ||
  args[0] !== "--start" ||
  args[2] !== "--end" ||
  ![args[1], args[3]].every(validDate) ||
  args[1] > args[3]
) {
  console.error(
    "Usage: node --env-file=.env.local scripts/ad-lp-report.mjs --start YYYY-MM-DD --end YYYY-MM-DD",
  );
  process.exit(1);
}
const env = (name) => process.env[name]?.trim();
const propertyId = env("GA4_PROPERTY_ID")?.replace(/^properties\//, "");
if (!/^\d+$/.test(propertyId || "")) {
  console.error("GA4 property is not configured.");
  process.exit(1);
}
const auth =
  env("GOOGLE_PRIVATE_KEY") && env("GOOGLE_CLIENT_EMAIL")
    ? new google.auth.JWT({
        email: env("GOOGLE_CLIENT_EMAIL"),
        key: env("GOOGLE_PRIVATE_KEY").replaceAll("\\n", "\n"),
        scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
      })
    : new google.auth.OAuth2(
        env("GOOGLE_OAUTH_CLIENT_ID"),
        env("GOOGLE_OAUTH_CLIENT_SECRET"),
      );
if (auth instanceof google.auth.OAuth2 && !(auth instanceof google.auth.JWT))
  auth.setCredentials({ refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN") });
const api = google.analyticsdata({ version: "v1beta", auth });
const match = (fieldName, value, matchType = "FULL_REGEXP") => ({
  filter: {
    fieldName,
    stringFilter: { matchType, value, caseSensitive: false },
  },
});
const and = (...expressions) => ({ andGroup: { expressions } });
const not = (expression) => ({ notExpression: expression });
const lpLanding = match("landingPagePlusQueryString", "^/lp(/.*|\\?.*|$)");
const internal = match(
  "landingPagePlusQueryString",
  "^/(admin|post|voice/survey)(/.*|\\?.*|$)",
);
const unknown = match("landingPagePlusQueryString", "(not set)", "EXACT");
const host = match("hostName", "^(www\\.)?kawaguchitenrei\\.com$");
const cohorts = {
  lp_entry: lpLanding,
  main_entry: and(not(lpLanding), not(internal), not(unknown)),
  internal_entry: internal,
  unknown_entry: unknown,
  // This is a subset of main_entry, not another additive cohort.
  main_organic: and(
    not(lpLanding),
    not(internal),
    not(unknown),
    match("sessionDefaultChannelGroup", "Organic Search", "EXACT"),
  ),
};
const result = {
  fetchedAt: new Date().toISOString(),
  period: { startDate: args[1], endDate: args[3] },
  readOnly: true,
  grouping: "Session landing page; main_organic is a subset of main_entry",
  reports: {},
  failures: [],
};
for (const [cohort, filter] of Object.entries(cohorts)) {
  result.reports[cohort] = {};
  for (const [name, dimensions, metrics, extra] of [
    [
      "acquisition",
      ["sessionDefaultChannelGroup"],
      ["sessions", "engagedSessions"],
      null,
    ],
    [
      "events",
      ["eventName"],
      ["eventCount"],
      match("eventName", "^(lp_.*|click_tel|generate_lead)$"),
    ],
  ]) {
    try {
      const r = await api.properties.runReport(
        {
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [result.period],
            dimensions: dimensions.map((name) => ({ name })),
            metrics: metrics.map((name) => ({ name })),
            dimensionFilter: and(host, filter, ...(extra ? [extra] : [])),
            limit: 10000,
          },
        },
        { timeout: 30000, retry: false },
      );
      result.reports[cohort][name] = {
        dimensions,
        metrics,
        rows: (r.data.rows || []).map((row) => ({
          keys: row.dimensionValues.map((v) => v.value),
          values: row.metricValues.map((v) => Number(v.value)),
        })),
        rowCount: r.data.rowCount || 0,
        metadata: r.data.metadata,
      };
    } catch (error) {
      const failure = {
        cohort,
        report: name,
        status: error?.response?.status || null,
        category: "report_failed",
      };
      result.failures.push(failure);
      result.reports[cohort][name] = { ok: false };
    }
  }
}
fs.mkdirSync("tmp", { recursive: true });
const file = `tmp/ad-lp-report-${args[1]}-${args[3]}-${Date.now()}.json`;
fs.writeFileSync(file, JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      file,
      period: result.period,
      failures: result.failures,
      sessions: Object.fromEntries(
        Object.entries(result.reports).map(([key, value]) => [
          key,
          value.acquisition.rows?.reduce(
            (sum, row) => sum + row.values[0],
            0,
          ) ?? null,
        ]),
      ),
    },
    null,
    2,
  ),
);
if (result.failures.length) process.exitCode = 1;
