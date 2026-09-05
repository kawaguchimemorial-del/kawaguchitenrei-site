type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export type LeadFormType = "contact" | "estimate" | "lp_contact";

export function pushGenerateLead(formType: LeadFormType) {
  if (typeof window === "undefined" || !window.kawaguchiAnalyticsAllowed?.()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    form_type: formType,
    page_path: window.location.pathname,
  });
}
