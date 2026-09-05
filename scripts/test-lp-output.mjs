// Run after npm run build. Checks the emitted pages, not a copy of component logic.
import assert from "node:assert/strict";
import fs from "node:fs";

const read = name => fs.readFileSync(`.next/server/app/${name}`, "utf8");
const results = {};
for (const [file, path] of [["lp.html", "/lp/"], ["lp/contact.html", "/lp/contact/"]]) {
  const html = read(file);
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert(Buffer.byteLength(html) <= 50 * 1024, `${path} exceeds the LP HTML budget`);
  assert.match(markup, /<meta name="robots" content="[^"]*noindex/);
  assert(markup.includes(`<link rel="canonical" href="https://kawaguchitenrei.com${path}"`));
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  const phones = markup.match(/<a\b[^>]*href="tel:[^"]+"[^>]*>/g) || [];
  assert(phones.length >= 3);
  for (const phone of phones) assert.match(phone, /data-lp-event="lp_click_tel"/);
  results[path] = { htmlBytes: Buffer.byteLength(html), phoneLinks: phones.length };
  if (path === "/lp/") {
    for (const amount of ["189,000", "496,000", "628,000", "279,000", "551,000", "231,000"]) assert(markup.includes(amount));
    assert.equal((markup.match(/data-lp-event="lp_plan_open"/g) || []).length, 6);
    assert.equal((markup.match(/<details\b/g) || []).length, 6);
    assert.match(markup, /通常価格/);
    assert.match(markup, /別途費用/);
    assert(!markup.includes("88,000"));
    assert(!markup.includes("<form"));
  } else {
    for (const field of ["name", "phone", "consent"]) {
      assert((markup.match(/<input\b[^>]*>/g) || []).some(tag => tag.includes(`name="${field}"`) && /\brequired(?:="")?/.test(tag)));
    }
    assert.match(markup, /<form\b[^>]*data-lp-form/);
  }
}
const sitemap = read("sitemap.xml.body");
assert(!/<loc>[^<]*\/lp(?:\/|<)/.test(sitemap));
const robots = read("robots.txt.body");
assert(!/^Disallow:\s*\/lp(?:\/|$)/m.test(robots));
console.log(JSON.stringify({ pages: results, sitemapUrls: (sitemap.match(/<loc>/g) || []).length, noindexAndCrawlPolicy: "passed" }, null, 2));
