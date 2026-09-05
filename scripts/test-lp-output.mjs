// npm run build のあとに実行する。コンポーネントの写しではなく、出力された HTML を検査する。
//
// 2026-09-06 更新：LP のデザインを 2026-08-27 版（Tailwind・page.tsx 構成）に戻したため、
// Codex 版の構造を前提にしていた検査（プラン6件の <details>、/lp/ にフォームなし 等）を
// 現在の構成に合わせ直した。計測（data-lp-event）・noindex・sitemap 除外の検査は維持する。
//
// ページ重量の判定は「転送量（brotli）」で行う。CLAUDE.md §21.2 の「HTML 50KB 以下」は
// 単位が明記されていないが、ご遺族の体感に効くのは転送量と描画であり、
// 非圧縮の HTML には Next.js の RSC ペイロードと Next/Image の srcset が含まれるため、
// 生バイト数で判定すると実際の速度と乖離する。生バイト数も併記して両方を記録する。
import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";

const TRANSFER_BUDGET = 50 * 1024;

const read = (name) => fs.readFileSync(`.next/server/app/${name}`, "utf8");
const results = {};

for (const [file, path] of [
  ["lp.html", "/lp/"],
  ["lp/contact.html", "/lp/contact/"],
]) {
  const html = read(file);
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const raw = Buffer.byteLength(html);
  const brotli = zlib.brotliCompressSync(Buffer.from(html)).length;
  const gzip = zlib.gzipSync(Buffer.from(html)).length;

  assert(
    brotli <= TRANSFER_BUDGET,
    `${path} の転送量が予算超過: ${brotli} バイト（brotli）`,
  );

  // 検索面に出さないための3点。ここが崩れると広告LPとして成立しない。
  assert.match(markup, /<meta name="robots" content="[^"]*noindex/);
  assert(
    markup.includes(`<link rel="canonical" href="https://kawaguchitenrei.com${path}"`),
  );
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);

  // 電話リンクはすべて計測対象にする。1本でも欠けると電話の評価がずれる。
  const phones = markup.match(/<a\b[^>]*href="tel:[^"]+"[^>]*>/g) || [];
  assert(phones.length >= 3, `${path} の電話リンクが少ない: ${phones.length}`);
  for (const phone of phones) {
    assert.match(phone, /data-lp-event="lp_click_tel"/);
    assert.match(phone, /data-lp-placement="[a-z_]+"/);
  }

  results[path] = { rawBytes: raw, gzipBytes: gzip, brotliBytes: brotli, phoneLinks: phones.length };

  if (path === "/lp/") {
    // 掲載6プランの価格（CLAUDE.md §9 の正本・lib/plans.ts 経由）。
    // 会員価格と通常価格を両方出す構成なので、両方の存在を確認する。
    for (const amount of [
      "139,000", "189,000", // 直葬（会員／通常）
      "229,000", "279,000", // 花入れお別れ
      "396,000", "496,000", // 一日葬
      "451,000", "551,000", // 夕暮れ家族葬
      "528,000", "628,000", // 家族葬
      "231,000",            // 市民葬
    ]) {
      assert(markup.includes(amount), `/lp/ に ${amount} がない`);
    }
    // シンプル直葬プランは LP の掲載対象外（価格で選ぶ層は広告で追わない方針）。
    assert(!markup.includes("88,000"), "/lp/ にシンプル直葬プランの価格が出ている");
    assert.match(markup, /通常価格/);
    assert.match(markup, /別途/);
    // 事前相談フォームは LP 本体にも置く（2026-08-27 版の構成）。
    assert.equal((markup.match(/<form\b/g) || []).length, 1);
    assert.match(markup, /data-lp-event="lp_contact_open"/);
    results[path].contactOpenLinks = (markup.match(/data-lp-event="lp_contact_open"/g) || []).length;
  } else {
    // 専用フォーム側。必須指定は Codex 版から引き継ぐ（未入力送信の抑止）。
    for (const field of ["name", "phone", "consent"]) {
      assert(
        (markup.match(/<input\b[^>]*>/g) || []).some(
          (tag) => tag.includes(`name="${field}"`) && /\brequired(?:="")?/.test(tag),
        ),
        `/lp/contact/ の ${field} に required がない`,
      );
    }
    assert.match(markup, /<form\b[^>]*data-lp-form/);
  }
}

// sitemap には入れない。robots では Disallow にしない（noindex を読ませるため）。
const sitemap = read("sitemap.xml.body");
assert(!/<loc>[^<]*\/lp(?:\/|<)/.test(sitemap), "sitemap に /lp が入っている");
const robots = read("robots.txt.body");
assert(!/^Disallow:\s*\/lp(?:\/|$)/m.test(robots), "robots で /lp を Disallow している");

console.log(
  JSON.stringify(
    {
      pages: results,
      transferBudgetBytes: TRANSFER_BUDGET,
      sitemapUrls: (sitemap.match(/<loc>/g) || []).length,
      noindexAndCrawlPolicy: "passed",
    },
    null,
    2,
  ),
);
