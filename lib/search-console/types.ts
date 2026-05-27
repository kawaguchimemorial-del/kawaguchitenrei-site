export type RangeKey = "7d" | "28d" | "3m";

export const RANGE_OPTIONS: { key: RangeKey; label: string; days: number }[] = [
  { key: "7d", label: "過去7日", days: 7 },
  { key: "28d", label: "過去28日", days: 28 },
  { key: "3m", label: "過去3か月", days: 90 },
];

export const DEFAULT_RANGE: RangeKey = "28d";

export type DeviceKey = "all" | "MOBILE" | "DESKTOP" | "TABLET";

export const DEVICE_OPTIONS: { key: DeviceKey; label: string }[] = [
  { key: "all", label: "全体" },
  { key: "MOBILE", label: "モバイル" },
  { key: "DESKTOP", label: "PC" },
  { key: "TABLET", label: "タブレット" },
];

export const DEFAULT_DEVICE: DeviceKey = "all";

export type SearchAnalyticsRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type MetricsRow = {
  label: string;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  position: number | null;
};

export type DashboardData = {
  ok: boolean;
  range: RangeKey;
  device: DeviceKey;
  startDate: string;
  endDate: string;
  fetchedAt: string;
  keywordRows: MetricsRow[];
  queryRows: MetricsRow[];
  pageRows: MetricsRow[];
};
