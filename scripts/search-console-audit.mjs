#!/usr/bin/env node
// Read-only audit. Credentials are loaded by Node's --env-file option, never printed.
// Results stay in git-ignored tmp/. No sitemap submission, indexing request or GBP update.
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

const flags = new Set(process.argv.slice(2));
const allowedFlags = new Set(['--probe', '--inspect', '--inspect-all', '--with-gbp', '--with-ga4']);
if ([...flags].some(flag => !allowedFlags.has(flag))) {
  console.error('Use --probe, --inspect, --inspect-all, --with-gbp, --with-ga4 only.');
  process.exit(1);
}
const SITE = process.env.SEARCH_CONSOLE_SITE_URL?.trim();
const ALLOWED_SITES = ['sc-domain:kawaguchitenrei.com', 'https://kawaguchitenrei.com/'];
const BASE = 'https://kawaguchitenrei.com';
const env = key => process.env[key]?.trim();
const day = date => date.toISOString().slice(0, 10);
const shift = (value, count) => day(new Date(Date.parse(`${value}T12:00:00Z`) + count * 86400000));
const today = day(new Date());
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputFile = path.resolve('tmp', `search-console-audit-${stamp}.json`);
const options = { timeout: 30000, retry: false };
const output = { fetchedAt: new Date().toISOString(), readOnly: true, property: SITE, gsc: {}, gbp: null, ga4: null };

function safeError(error) {
  // Never serialize a Google client error: it can contain Authorization headers.
  const status = Number(error?.response?.status || 0) || null;
  const api = error?.response?.data?.error;
  const message = typeof api === 'object' ? api?.message || '' : String(api || '');
  const check = `${message} ${error?.message || ''}`;
  const category = /invalid_grant/.test(check) ? 'oauth_refresh_rejected'
    : /quota|resource.exhausted|rate.limit/i.test(check) ? 'quota_or_rate_limit'
    : /insufficient.*scope|ACCESS_TOKEN_SCOPE_INSUFFICIENT/i.test(check) ? 'insufficient_scope'
    : /disabled|not been used/i.test(check) ? 'api_not_enabled'
    : status === 401 ? 'authentication_failed'
    : status === 403 ? 'permission_denied'
    : /DECODER|PEM|private.key/i.test(check) ? 'credential_format_error'
    : 'request_failed';
  const zeroQuota = /quota.*value.{0,10}0\b|limit.{0,10}0\b|per minute.*0\b/i.test(check)
    || (typeof api === 'object' && JSON.stringify(api?.details || []).includes('"quota_limit_value":"0"'));
  return { ok: false, status, category, zeroQuota };
}
async function capture(fn) {
  try { return { ok: true, ...(await fn()) }; }
  catch (error) { return safeError(error); }
}
function persist() {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
}
async function batches(items, fn, width = 3) {
  const result = [];
  for (let i = 0; i < items.length; i += width) {
    result.push(...await Promise.all(items.slice(i, i + width).map(fn)));
  }
  return result;
}
async function main() {
  if (!ALLOWED_SITES.includes(SITE)) throw new Error('Expected project Search Console property is not configured.');
  if (!['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET', 'GOOGLE_OAUTH_REFRESH_TOKEN'].every(env)) {
    throw new Error('Required OAuth environment variables are missing.');
  }
  const auth = new google.auth.OAuth2(env('GOOGLE_OAUTH_CLIENT_ID'), env('GOOGLE_OAUTH_CLIENT_SECRET'));
  auth.setCredentials({ refresh_token: env('GOOGLE_OAUTH_REFRESH_TOKEN') });
  const webmasters = google.webmasters({ version: 'v3', auth });
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  async function query(range, dimensions = [], extra = {}) {
    const rows = [];
    let responseAggregationType;
    let hitSafetyCap = false;
    for (let startRow = 0; startRow < 100000; startRow += 25000) {
      const response = await webmasters.searchanalytics.query({ siteUrl: SITE, requestBody: {
        ...range, type: 'web', dataState: 'final', dimensions, aggregationType: dimensions.includes('page') ? 'auto' : 'byProperty',
        rowLimit: 25000, startRow, ...extra,
      } }, options);
      responseAggregationType = response.data.responseAggregationType;
      const page = response.data.rows || [];
      rows.push(...page);
      if (page.length < 25000) break;
      if (startRow === 75000) hitSafetyCap = true;
    }
    return { rows, responseAggregationType, hitSafetyCap };
  }
  output.gsc.connection = await capture(async () => {
    const property = await webmasters.sites.get({ siteUrl: SITE }, options);
    const daily = await query({ startDate: shift(today, -16), endDate: today }, ['date']);
    const dates = daily.rows.map(row => row.keys[0]).sort();
    return { permissionLevel: property.data.permissionLevel, latestFinalDate: dates.at(-1) || null, recentDaily: daily.rows };
  });
  console.log(JSON.stringify({ step: 'gsc_connection', ...output.gsc.connection, recentDaily: undefined }));
  if (!output.gsc.connection.ok || !output.gsc.connection.latestFinalDate) {
    persist(); process.exitCode = 2; return;
  }
  if (flags.has('--probe')) { persist(); console.log(`Saved: ${outputFile}`); return; }
  const end = output.gsc.connection.latestFinalDate;
  const periods = {
    current28: { startDate: shift(end, -27), endDate: end },
    previous28: { startDate: shift(end, -55), endDate: shift(end, -28) },
    current7: { startDate: shift(end, -6), endDate: end },
    previous7: { startDate: shift(end, -13), endDate: shift(end, -7) },
  };
  output.gsc.periods = periods;
  output.gsc.windows = {};
  const jobs = Object.entries(periods).flatMap(([period, range]) => ['total', 'queries', 'pages', 'devices', 'queryPages'].map(kind => ({ period, range, kind })));
  const dims = { total: [], queries: ['query'], pages: ['page'], devices: ['device'], queryPages: ['query', 'page'] };
  await batches(jobs, async ({ period, range, kind }) => {
    const value = await capture(() => query(range, dims[kind]));
    output.gsc.windows[period] ||= {};
    output.gsc.windows[period][kind] = value;
    console.log(JSON.stringify({ step: `${period}_${kind}`, ok: value.ok, rows: value.rows?.length, category: value.category }));
  });
  output.gsc.daily90 = await capture(() => query({ startDate: shift(end, -89), endDate: end }, ['date']));
  output.gsc.sitemaps = await capture(async () => {
    const response = await webmasters.sitemaps.list({ siteUrl: SITE }, options);
    // contents[].indexed is deprecated; it must not be reported as an indexed URL count.
    return { items: (response.data.sitemap || []).map(s => ({ path: s.path, lastDownloaded: s.lastDownloaded, isPending: s.isPending, warnings: s.warnings, errors: s.errors, contents: s.contents?.map(c => ({ type: c.type, submitted: c.submitted })) })) };
  });
  persist();
  if (flags.has('--inspect') || flags.has('--inspect-all')) {
    let targets = ['/', '/plan/', '/plan/family-funeral/', '/plan/oneday-funeral/', '/plan/direct-funeral/', '/plan/cremation/', '/plan/kawaguchi-shimin/', '/plan/yugure-kazokuso/', '/area/kawaguchi/', '/area/nishikawaguchi/', '/area/higashikawaguchi/', '/hall/kawaguchi-memorial-hall/', '/saijo/megurinomori/', '/column/kazokusou/', '/column/fuhou/'];
    if (flags.has('--inspect-all')) {
      const response = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error('Sitemap could not be read.');
      const xml = await response.text();
      const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
      if (!urls.length || urls.length > 500 || urls.some(url => url.origin !== BASE || url.search || url.hash)) {
        throw new Error('Unexpected sitemap contents.');
      }
      targets = [...new Set(urls.map(url => url.pathname))];
    }
    output.gsc.inspections = await batches(targets, async urlPath => ({ urlPath, ...await capture(async () => {
      const response = await searchconsole.urlInspection.index.inspect({ requestBody: { inspectionUrl: BASE + urlPath, siteUrl: SITE, languageCode: 'ja-JP' } }, options);
      const result = response.data.inspectionResult || {};
      const state = result.indexStatusResult || {};
      return { index: Object.fromEntries(['verdict','coverageState','robotsTxtState','indexingState','lastCrawlTime','pageFetchState','googleCanonical','userCanonical','crawledAs','sitemap'].map(k => [k,state[k]])), richResults: result.richResultsResult || null };
    }) }));
    console.log(JSON.stringify({ step: 'url_inspection', count: output.gsc.inspections.length, success: output.gsc.inspections.filter(r => r.ok).length }));
  }
  persist();
  if (flags.has('--with-gbp')) {
    output.gbp = await capture(async () => {
      const accountsApi = google.mybusinessaccountmanagement({ version: 'v1', auth });
      const infoApi = google.mybusinessbusinessinformation({ version: 'v1', auth });
      const response = await accountsApi.accounts.list({ pageSize: 20 }, options);
      const matching = [];
      // Only retain the user's target business, not account names or other businesses.
      for (const account of response.data.accounts || []) {
        const locations = await infoApi.accounts.locations.list({ parent: account.name, pageSize: 100, readMask: 'name,title,websiteUri,categories,regularHours,profile,serviceItems' }, options);
        for (const location of locations.data.locations || []) {
          if (!/川口典礼|川口メモリアルホール/.test(location.title || '') && !/kawaguchitenrei\.com/.test(location.websiteUri || '')) continue;
          matching.push({ title: location.title, websiteUri: location.websiteUri, categories: location.categories, regularHours: location.regularHours, descriptionLength: location.profile?.description?.length || 0, serviceItemsCount: location.serviceItems?.length || 0 });
        }
      }
      return { matchingLocations: matching };
    });
    console.log(JSON.stringify({ step: 'gbp', ...output.gbp }));
  }
  if (flags.has('--with-ga4')) {
    output.ga4 = await capture(async () => {
      const propertyId = env('GA4_PROPERTY_ID')?.replace(/^properties\//, '');
      if (!/^\d+$/.test(propertyId || '')) return { configured: false };
      const key = env('GOOGLE_PRIVATE_KEY')?.replaceAll('\\n', '\n');
      const email = env('GOOGLE_CLIENT_EMAIL');
      const gaAuth = key && email ? new google.auth.JWT({ email, key, scopes: ['https://www.googleapis.com/auth/analytics.readonly'] }) : auth;
      const analytics = google.analyticsdata({ version: 'v1beta', auth: gaAuth });
      const reports = {};
      for (const period of ['current28', 'previous28']) {
        reports[period] = {};
        const reportDefs = {
          sources: { dimensions: ['sessionSourceMedium'], metrics: ['sessions', 'engagedSessions', 'keyEvents'] },
          leadEvents: { dimensions: ['eventName', 'pagePath', 'sessionSourceMedium'], metrics: ['eventCount'], dimensionFilter: { filter: { fieldName: 'eventName', inListFilter: { values: ['generate_lead', 'click_tel'] } } } },
          landingPages: { dimensions: ['landingPage'], metrics: ['sessions', 'engagedSessions', 'keyEvents'] },
        };
        for (const [name, definition] of Object.entries(reportDefs)) {
          reports[period][name] = await capture(async () => {
            const r = await analytics.properties.runReport({ property: `properties/${propertyId}`, requestBody: {
              dateRanges: [periods[period]], dimensions: definition.dimensions.map(name => ({name})), metrics: definition.metrics.map(name => ({name})),
              ...(definition.dimensionFilter ? { dimensionFilter: definition.dimensionFilter } : {}), limit: 10000,
            } }, options);
            return { dimensions: definition.dimensions, metrics: definition.metrics, rowCount: r.data.rowCount || 0, metadata: { timeZone: r.data.metadata?.timeZone, subjectToThresholding: r.data.metadata?.subjectToThresholding, dataLossFromOtherRow: r.data.metadata?.dataLossFromOtherRow }, rows: (r.data.rows || []).map(row => ({ keys: row.dimensionValues.map(v=>v.value), values: row.metricValues.map(v=>Number(v.value)) })) };
          });
        }
      }
      return { configured: true, reports };
    });
    console.log(JSON.stringify({ step: 'ga4', ok: output.ga4.ok, configured: output.ga4.configured, reportStates: output.ga4.reports ? Object.fromEntries(Object.entries(output.ga4.reports).map(([p,r])=>[p,Object.fromEntries(Object.entries(r).map(([k,v])=>[k,v.ok?'ok':v.category]))])) : undefined, category: output.ga4.category }));
  }
  persist();
  console.log(JSON.stringify({ saved: outputFile, periods, totals: Object.fromEntries(Object.entries(output.gsc.windows).map(([key,w])=>[key,w.total.rows?.[0] || null])) }));
}
main().catch(error => {
  persist();
  console.error(JSON.stringify({ step: 'audit_failed', ...safeError(error) }));
  process.exitCode = 1;
});
