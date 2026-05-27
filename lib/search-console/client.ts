import { google, type webmasters_v3 } from "googleapis";

let cachedClient: webmasters_v3.Webmasters | null = null;
let siteUrlPatternLogged = false;

function logSiteUrlPatternOnce(url: string) {
  if (siteUrlPatternLogged) return;
  siteUrlPatternLogged = true;
  const prefix = url.startsWith("sc-domain:")
    ? "sc-domain:"
    : url.startsWith("https://")
      ? "https://"
      : url.startsWith("http://")
        ? "http://"
        : "OTHER";
  const endsWithSlash = url.endsWith("/") ? "yes" : "no";
  const hasWhitespace = /\s/.test(url) ? "yes" : "no";
  const firstCode = url.length > 0 ? url.charCodeAt(0) : -1;
  const lastCode = url.length > 0 ? url.charCodeAt(url.length - 1) : -1;
  const startsWithQuote =
    url.startsWith('"') || url.startsWith("'") ? "yes" : "no";
  const endsWithQuote =
    url.endsWith('"') || url.endsWith("'") ? "yes" : "no";
  const hasBom = firstCode === 0xfeff ? "yes" : "no";
  const containsColon = url.includes(":") ? "yes" : "no";
  console.error(
    `[search-console] siteUrl pattern: prefix=${prefix} endsWithSlash=${endsWithSlash} hasWhitespace=${hasWhitespace} length=${url.length} firstCharCode=${firstCode} lastCharCode=${lastCode} startsWithQuote=${startsWithQuote} endsWithQuote=${endsWithQuote} hasBom=${hasBom} containsColon=${containsColon}`
  );
}

function getSiteUrl(): string {
  const url = process.env.SEARCH_CONSOLE_SITE_URL;
  if (!url) {
    throw new Error("SEARCH_CONSOLE_SITE_URL is not configured");
  }
  const trimmed = url.trim();
  logSiteUrlPatternOnce(trimmed);
  return trimmed;
}

function getWebmastersClient(): webmasters_v3.Webmasters {
  if (cachedClient) return cachedClient;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth env not configured");
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });

  cachedClient = google.webmasters({ version: "v3", auth });
  return cachedClient;
}

export type SearchAnalyticsParams = {
  startDate: string;
  endDate: string;
  dimensions?: ("query" | "page" | "device" | "country" | "date")[];
  rowLimit?: number;
  startRow?: number;
  dimensionFilterGroups?: webmasters_v3.Schema$ApiDimensionFilterGroup[];
};

export async function querySearchAnalytics(
  params: SearchAnalyticsParams
): Promise<webmasters_v3.Schema$ApiDataRow[]> {
  const client = getWebmastersClient();
  const siteUrl = getSiteUrl();

  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: params.startDate,
      endDate: params.endDate,
      dimensions: params.dimensions,
      rowLimit: params.rowLimit ?? 1000,
      startRow: params.startRow ?? 0,
      dimensionFilterGroups: params.dimensionFilterGroups,
    },
  });

  return res.data.rows ?? [];
}
