import { unstable_cache } from "next/cache";
import { querySearchAnalytics } from "./client";
import { IMPORTANT_KEYWORDS } from "./keywords";
import {
  type DashboardData,
  type DeviceKey,
  type MetricsRow,
  type RangeKey,
  RANGE_OPTIONS,
} from "./types";

const CACHE_TTL_SECONDS = 60 * 60 * 6;

function extractErrorDetails(err: unknown): string {
  if (!err || typeof err !== "object") {
    return typeof err === "string" ? err : "unknown error";
  }
  const e = err as {
    message?: string;
    code?: string | number;
    response?: {
      status?: number;
      data?: {
        error?: {
          status?: string;
          message?: string;
          errors?: unknown;
          details?: unknown;
        };
      };
    };
  };
  const baseMessage = e.message ?? "non-Error throw";
  const httpStatus = e.response?.status;
  const apiStatus = e.response?.data?.error?.status;
  const apiMessage = e.response?.data?.error?.message;
  const apiErrors = e.response?.data?.error?.errors;
  const apiDetails = e.response?.data?.error?.details;
  const parts = [
    baseMessage,
    httpStatus ? `http=${httpStatus}` : null,
    apiStatus ? `apiStatus=${apiStatus}` : null,
    apiMessage && apiMessage !== baseMessage ? `apiMsg=${apiMessage}` : null,
    apiErrors ? `errors=${JSON.stringify(apiErrors).slice(0, 400)}` : null,
    apiDetails ? `details=${JSON.stringify(apiDetails).slice(0, 600)}` : null,
  ].filter(Boolean);
  return parts.join(" | ");
}

function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function resolveDateRange(range: RangeKey): {
  startDate: string;
  endDate: string;
} {
  const opt = RANGE_OPTIONS.find((o) => o.key === range) ?? RANGE_OPTIONS[1];
  const today = new Date();
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (opt.days - 1));
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

function deviceFilterGroup(device: DeviceKey) {
  if (device === "all") return undefined;
  return [
    {
      filters: [
        {
          dimension: "device" as const,
          operator: "equals" as const,
          expression: device,
        },
      ],
    },
  ];
}

function emptyRow(label: string): MetricsRow {
  return {
    label,
    clicks: null,
    impressions: null,
    ctr: null,
    position: null,
  };
}

function rowFromApi(
  label: string,
  apiRow: {
    clicks?: number | null;
    impressions?: number | null;
    ctr?: number | null;
    position?: number | null;
  } | undefined
): MetricsRow {
  if (!apiRow) return emptyRow(label);
  return {
    label,
    clicks: apiRow.clicks ?? 0,
    impressions: apiRow.impressions ?? 0,
    ctr: apiRow.ctr ?? 0,
    position: apiRow.position ?? 0,
  };
}

async function fetchImportantKeywords(
  startDate: string,
  endDate: string,
  device: DeviceKey
): Promise<MetricsRow[]> {
  const deviceFilters = deviceFilterGroup(device) ?? [];
  let firstError: unknown = undefined;

  const results = await Promise.all(
    IMPORTANT_KEYWORDS.map(async (kw) => {
      try {
        const rows = await querySearchAnalytics({
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 1,
          dimensionFilterGroups: [
            {
              filters: [
                {
                  dimension: "query",
                  operator: "equals",
                  expression: kw,
                },
                ...(deviceFilters[0]?.filters ?? []),
              ],
            },
          ],
        });
        return rowFromApi(kw, rows[0]);
      } catch (err) {
        if (!firstError) firstError = err;
        return emptyRow(kw);
      }
    })
  );

  const allEmpty = results.every((r) => r.clicks === null);
  if (allEmpty && firstError) {
    console.error(
      `[search-console] keyword fetch failed (all empty): ${extractErrorDetails(firstError)}`
    );
    throw firstError;
  }
  return results;
}

async function fetchTopQueries(
  startDate: string,
  endDate: string,
  device: DeviceKey,
  limit = 20
): Promise<MetricsRow[]> {
  try {
    const rows = await querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: limit,
      dimensionFilterGroups: deviceFilterGroup(device),
    });
    return rows.map((r) => rowFromApi(r.keys?.[0] ?? "—", r));
  } catch (err) {
    console.error(
      `[search-console] top-queries failed: ${extractErrorDetails(err)}`
    );
    throw err;
  }
}

async function fetchTopPages(
  startDate: string,
  endDate: string,
  device: DeviceKey,
  limit = 20
): Promise<MetricsRow[]> {
  try {
    const rows = await querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: limit,
      dimensionFilterGroups: deviceFilterGroup(device),
    });
    return rows.map((r) => rowFromApi(r.keys?.[0] ?? "—", r));
  } catch (err) {
    console.error(
      `[search-console] top-pages failed: ${extractErrorDetails(err)}`
    );
    throw err;
  }
}

async function loadDashboardSuccess(
  range: RangeKey,
  device: DeviceKey
): Promise<DashboardData> {
  const { startDate, endDate } = resolveDateRange(range);

  const settled = await Promise.allSettled([
    fetchImportantKeywords(startDate, endDate, device),
    fetchTopQueries(startDate, endDate, device),
    fetchTopPages(startDate, endDate, device),
  ]);

  const allRejected = settled.every((r) => r.status === "rejected");
  if (allRejected) {
    const firstReason =
      settled[0].status === "rejected" ? settled[0].reason : undefined;
    throw firstReason instanceof Error
      ? firstReason
      : new Error("all sections failed");
  }

  return {
    ok: true,
    range,
    device,
    startDate,
    endDate,
    fetchedAt: new Date().toISOString(),
    keywordRows: settled[0].status === "fulfilled" ? settled[0].value : [],
    queryRows: settled[1].status === "fulfilled" ? settled[1].value : [],
    pageRows: settled[2].status === "fulfilled" ? settled[2].value : [],
  };
}

export async function loadDashboardData(
  range: RangeKey,
  device: DeviceKey
): Promise<DashboardData> {
  const cached = unstable_cache(
    () => loadDashboardSuccess(range, device),
    ["search-console-dashboard:v3", range, device],
    {
      revalidate: CACHE_TTL_SECONDS,
      tags: ["search-console"],
    }
  );

  try {
    return await cached();
  } catch (err) {
    console.error(
      `[search-console] fetch failed: ${extractErrorDetails(err)}`
    );
    const { startDate, endDate } = resolveDateRange(range);
    return {
      ok: false,
      range,
      device,
      startDate,
      endDate,
      fetchedAt: new Date().toISOString(),
      keywordRows: [],
      queryRows: [],
      pageRows: [],
    };
  }
}
