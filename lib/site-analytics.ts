import { GA4_MEASUREMENT_ID } from "./analytics-policy";

// 本サイト（/lp/ 以外）の区画到達の計測（2026-09-27）。
// 広告LPの lp_section_view と同じく、既存の Google タグへ gtag コマンドで直接送る。
// 区画名は登録済みのカスタムディメンション cta_placement に入れ、ページは pagePath で見る。
const EXCLUDED = /^\/(lp|admin|post|voice\/survey)(\/|$)/;

export function trackSiteSection(section: string) {
  if (typeof window === "undefined" || !window.kawaguchiAnalyticsAllowed?.()) return;
  const path = window.location.pathname;
  if (EXCLUDED.test(path) || !/^[a-z0-9_-]{1,45}$/.test(section)) return;
  const params = {
    send_to: GA4_MEASUREMENT_ID,
    site_area: "main",
    cta_placement: section,
    page_location: window.location.origin + path,
    page_path: path,
    transport_type: "beacon",
  };
  function command(...args: unknown[]) {
    void args;
    window.dataLayer = window.dataLayer || [];
    // Google のコマンドキューは Arguments オブジェクトを受け取る（lib/lp-analytics.ts と同じ）
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  }
  command("event", "site_section_view", params);
}
