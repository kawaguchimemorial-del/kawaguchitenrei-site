import { GA4_MEASUREMENT_ID } from "./analytics-policy";

export const LP_VARIANT = "2026-09-consultation-v2";
export const LP_EVENTS = [
  "lp_view",
  "lp_click_tel",
  "lp_contact_open",
  "lp_plan_open",
  "lp_form_start",
  "lp_generate_lead",
  "lp_directions",
] as const;
export type LpEvent = (typeof LP_EVENTS)[number];

/** Only controlled labels are accepted; never pass form values or URL queries. */
export function trackLpEvent(event: LpEvent, placement = "page", plan = "") {
  if (typeof window === "undefined" || !window.kawaguchiAnalyticsAllowed?.())
    return;
  if (
    !/^\/lp(?:\/|$)/.test(window.location.pathname) ||
    !LP_EVENTS.includes(event)
  )
    return;
  const safe = (value: string) =>
    /^[a-z0-9_-]{1,45}$/.test(value) ? value : "unknown";
  const params = {
    send_to: GA4_MEASUREMENT_ID,
    site_area: "ad_lp",
    lp_variant: LP_VARIANT,
    cta_placement: safe(placement),
    ...(plan ? { plan_slug: safe(plan) } : {}),
    // Override the automatic URL for these events; do not send arbitrary query values.
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname,
    transport_type: "beacon",
  };
  // gtag's command queue is shared with the existing Google tag loaded through GTM.
  // No new config/page_view command or Google Ads conversion tag is added here.
  function command(...args: unknown[]) {
    void args;
    window.dataLayer = window.dataLayer || [];
    // Google's documented command queue consumes an Arguments object, not a data-layer event object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  }
  command("event", event, params);
}
