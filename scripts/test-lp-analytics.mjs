import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const source = fs.readFileSync("lib/lp-analytics.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
function run(pathname = "/lp/", allowed = true) {
  const window = {
    location: {
      pathname,
      origin: "https://kawaguchitenrei.com",
      search: "?email=private@example.test",
    },
    kawaguchiAnalyticsAllowed: () => allowed,
    dataLayer: [],
  };
  const context = {
    exports: {},
    window,
    require: () => ({ GA4_MEASUREMENT_ID: "G-TEST" }),
  };
  vm.runInNewContext(compiled, context);
  return { ...context.exports, window };
}
for (const event of run().LP_EVENTS) {
  const test = run();
  test.trackLpEvent(event, "hero", "oneday-funeral");
  const command = test.window.dataLayer[0];
  assert.equal(command[0], "event");
  assert.equal(command[1], event);
  assert.equal(command[2].send_to, "G-TEST");
  assert.equal(command[2].site_area, "ad_lp");
  assert.equal(command[2].page_location, "https://kawaguchitenrei.com/lp/");
  assert.equal(command[2].cta_placement, "hero");
  assert.equal(JSON.stringify(command).includes("private@"), false);
}
for (const path of ["/", "/plan/oneday-funeral/", "/lp-other/"]) {
  const t = run(path);
  t.trackLpEvent("lp_click_tel");
  assert.equal(t.window.dataLayer.length, 0);
}
const off = run("/lp/", false);
off.trackLpEvent("lp_generate_lead");
assert.equal(off.window.dataLayer.length, 0);
const contact = run("/lp/contact/");
contact.trackLpEvent("lp_form_start", "name@example.test");
assert.equal(contact.window.dataLayer[0][2].cta_placement, "unknown");
const invalid = run();
invalid.trackLpEvent("arbitrary_event");
assert.equal(invalid.window.dataLayer.length, 0);
console.log(
  "LP event tests passed: routing, event whitelist, production opt-out gate, path boundary, query exclusion and label validation.",
);
