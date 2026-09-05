// Public measurement ID, verified in the production GTM container on 2026-09-06.
// Keep this in sync if the property's web stream changes.
export const GA4_MEASUREMENT_ID = "G-44Z38F3J1P";
export const ANALYTICS_OPT_OUT_KEY = "kawaguchi-analytics-opt-out";

declare global {
  interface Window {
    kawaguchiAnalyticsAllowed?: () => boolean;
  }
}

/** Runs before GTM; the getter also covers client-side navigation after tag load. */
export const analyticsPolicyScript = String.raw`
(function () {
  var key = '${ANALYTICS_OPT_OUT_KEY}';
  var optedOut = false;
  var internal = /^\/(admin|post)(\/|$)/;
  var excluded = /^\/(admin|post)(\/|$)|^\/voice\/survey(\/|$)/;
  var mode = new URLSearchParams(window.location.search).get('analytics');
  try {
    if (mode === 'on') window.localStorage.removeItem(key);
    if (mode === 'off' || internal.test(window.location.pathname)) {
      window.localStorage.setItem(key, '1');
    }
    optedOut = window.localStorage.getItem(key) === '1';
  } catch (_) {}
  if (mode === 'off' || internal.test(window.location.pathname)) optedOut = true;
  window.kawaguchiAnalyticsAllowed = function () {
    return !optedOut && window.location.protocol === 'https:' &&
      /^(www\.)?kawaguchitenrei\.com$/.test(window.location.hostname) &&
      !excluded.test(window.location.pathname);
  };
  Object.defineProperty(window, 'ga-disable-${GA4_MEASUREMENT_ID}', {
    configurable: true,
    get: function () { return !window.kawaguchiAnalyticsAllowed(); }
  });
})();`;
