import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compiled = ts.transpileModule(fs.readFileSync('lib/analytics-policy.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleScope = { exports: {} };
vm.runInNewContext(compiled, moduleScope);
const { analyticsPolicyScript, GA4_MEASUREMENT_ID, ANALYTICS_OPT_OUT_KEY } = moduleScope.exports;
function boot(url, storage = new Map(), storageBlocked = false) {
  const window = { location: new URL(url), localStorage: {
    getItem: k => { if (storageBlocked) throw Error('blocked'); return storage.get(k); },
    setItem: (k, v) => { if (storageBlocked) throw Error('blocked'); storage.set(k, v); },
    removeItem: k => { if (storageBlocked) throw Error('blocked'); storage.delete(k); },
  } };
  vm.runInNewContext(analyticsPolicyScript, { window, URLSearchParams });
  return window;
}
for (const path of ['/', '/plan/cremation/', '/contact/', '/estimate/', '/lp/', '/lp/contact/']) {
  assert.equal(boot('https://kawaguchitenrei.com' + path).kawaguchiAnalyticsAllowed(), true, path);
}
for (const path of ['/admin', '/admin/seo/', '/post/', '/voice/survey/']) {
  assert.equal(boot('https://kawaguchitenrei.com' + path).kawaguchiAnalyticsAllowed(), false, path);
}
for (const url of ['http://localhost:3000/', 'https://preview.vercel.app/', 'https://kawaguchitenrei.com.evil.test/']) {
  assert.equal(boot(url).kawaguchiAnalyticsAllowed(), false, url);
}
assert.equal(boot('https://kawaguchitenrei.com/postscript/').kawaguchiAnalyticsAllowed(), true);
const storage = new Map();
boot('https://kawaguchitenrei.com/?analytics=off', storage);
assert.equal(storage.get(ANALYTICS_OPT_OUT_KEY), '1');
assert.equal(boot('https://kawaguchitenrei.com/lp/contact/', storage).kawaguchiAnalyticsAllowed(), false);
assert.equal(boot('https://kawaguchitenrei.com/?analytics=on', storage).kawaguchiAnalyticsAllowed(), true);
boot('https://kawaguchitenrei.com/admin/seo/', storage);
assert.equal(boot('https://kawaguchitenrei.com/', storage).kawaguchiAnalyticsAllowed(), false);
assert.equal(boot('https://kawaguchitenrei.com/?analytics=off', new Map(), true).kawaguchiAnalyticsAllowed(), false);
const visitor = boot('https://kawaguchitenrei.com/');
assert.equal(visitor['ga-disable-' + GA4_MEASUREMENT_ID], false);
visitor.location = new URL('https://kawaguchitenrei.com/post/');
assert.equal(visitor['ga-disable-' + GA4_MEASUREMENT_ID], true);
visitor.location = new URL('https://kawaguchitenrei.com/plan/');
assert.equal(visitor['ga-disable-' + GA4_MEASUREMENT_ID], false);
console.log('Analytics policy: public pages, LP leads, internal paths, preview hosts, opt-out persistence, blocked storage and SPA transitions passed.');
