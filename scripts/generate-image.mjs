#!/usr/bin/env node
/**
 * 画像生成・画像編集（GPT Image 2.5）
 *
 * 2026-09-08 提供開始の gpt-image-2.5 系を使う。
 *   - gpt-image-2.5-sunburst … 編集精度・指示への忠実さ重視（既定）
 *   - gpt-image-2.5-flare    … 速度重視。案を何枚も試すとき
 *
 * 2026-09-09: 組織認証（Individual）が完了し、sunburst・flare とも利用可能になった。
 * 生成と既存画像の編集の両方を実測で確認済み。--model の指定は不要。
 *
 * 依存パッケージは追加していない。Node の標準 fetch で API を直接呼ぶ。
 * （openai パッケージの導入は package.json の変更にあたり、CLAUDE.md §5 で事前提案が必要なため）
 *
 * 使い方:
 *   node --env-file=.env.local scripts/generate-image.mjs \
 *     --prompt "落ち着いた色調の、信頼感のある葬儀相談の案内画像" \
 *     --out public/images/column/xxx/cover.webp
 *
 *   # 速度優先（案出し）
 *   node --env-file=.env.local scripts/generate-image.mjs --fast --prompt "..." --out tmp/案1.webp
 *
 *   # 既存画像の編集
 *   node --env-file=.env.local scripts/generate-image.mjs \
 *     --edit public/images/home/hall/hall-exterior.jpg \
 *     --prompt "空を少し明るく、全体の色調を落ち着かせる" \
 *     --out tmp/hall-exterior-edit.webp
 *
 * 主なオプション:
 *   --prompt <text>    生成・編集の指示（必須）
 *   --out <path>       保存先（必須）。既存ファイルは上書きしない（--force で上書き）
 *   --edit <path...>   編集元の画像。カンマ区切りで複数可
 *   --fast             flare を使う（既定は sunburst）
 *   --model <name>     モデル名を直接指定（日付付きスナップショットを使う場合）
 *   --size <s>         1024x1024 / 1536x1024 / 1024x1536 / auto（既定 1536x1024）
 *   --quality <q>      auto / low / medium / high / xhigh / max（既定 high）
 *   --format <f>       webp / png / jpeg（既定 webp）
 *   --n <count>        生成枚数（既定 1）。複数のときは -1 -2 … を付けて保存
 *   --dry-run          リクエスト内容だけ表示して送信しない
 *
 * 掲載前に必ず守ること（CLAUDE.md §12・§13）:
 *   - 生成画像を、当社の実在する建物・スタッフ・お客様として見せない
 *   - 遺影・名札・会葬礼状・故人様・喪主様を想起させる指示を書かない
 *   - 掲載前に人間が目視確認する。本スクリプトはその確認を代替しない
 *   - 既存画像のファイル名・配置場所は変更しない
 *   - プロンプトに個人情報（氏名・電話・住所・相談内容）を書かない
 */

import fs from "node:fs";
import path from "node:path";

const MODELS = {
  quality: "gpt-image-2.5-sunburst",
  fast: "gpt-image-2.5-flare",
};
const SIZES = ["1024x1024", "1536x1024", "1024x1536", "auto"];
const QUALITIES = ["auto", "low", "medium", "high", "xhigh", "max"];
const FORMATS = { webp: "image/webp", png: "image/png", jpeg: "image/jpeg" };

// プロンプトに書いてはいけない語。ご遺族への配慮と §12 の個人情報保護のため。
const FORBIDDEN = [
  "遺影", "名札", "会葬礼状", "故人", "喪主", "位牌", "焼香",
  "遺体", "ご遺体", "棺の中",
];

function parseArgs(argv) {
  const out = { n: 1 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    if (["fast", "force", "dry-run"].includes(key)) {
      out[key] = true;
      continue;
    }
    out[key] = argv[++i];
  }
  return out;
}

function fail(message) {
  // Windows で process.exit と非同期の stdout が競合してアサーションが出るため同期で書く
  fs.writeSync(2, `\n✗ ${message}\n\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

if (!args.prompt) fail("--prompt が指定されていません。");
if (!args.out) fail("--out（保存先）が指定されていません。");

const apiKey = process.env.OPENAI_API_KEY?.trim();
if (!apiKey) {
  fail(
    "OPENAI_API_KEY が読み込めていません。\n" +
      "  node --env-file=.env.local scripts/generate-image.mjs ... の形で実行してください。",
  );
}

const hit = FORBIDDEN.filter((w) => args.prompt.includes(w));
if (hit.length) {
  fail(
    `プロンプトに使わない語が含まれています: ${hit.join("、")}\n` +
      "  ご遺族への配慮と CLAUDE.md §12・§13 のため、これらを含む画像は生成しません。",
  );
}

const model = args.model || (args.fast ? MODELS.fast : MODELS.quality);
const size = args.size || "1536x1024";
const quality = args.quality || "high";
const format = (args.format || "webp").toLowerCase();
const count = Math.max(1, Number(args.n) || 1);

if (!SIZES.includes(size)) fail(`--size は ${SIZES.join(" / ")} のいずれかです。`);
if (!QUALITIES.includes(quality)) fail(`--quality は ${QUALITIES.join(" / ")} のいずれかです。`);
if (!FORMATS[format]) fail(`--format は ${Object.keys(FORMATS).join(" / ")} のいずれかです。`);

const outPath = path.resolve(args.out);
const outDir = path.dirname(outPath);
const ext = path.extname(outPath).slice(1).toLowerCase();
if (ext && ext !== format && !(ext === "jpg" && format === "jpeg")) {
  fail(`保存先の拡張子（.${ext}）と --format（${format}）が一致していません。`);
}

const targets = count === 1
  ? [outPath]
  : Array.from({ length: count }, (_, i) =>
      path.join(outDir, `${path.basename(outPath, path.extname(outPath))}-${i + 1}${path.extname(outPath)}`),
    );

for (const t of targets) {
  if (fs.existsSync(t) && !args.force) {
    fail(
      `既にファイルがあります: ${path.relative(process.cwd(), t)}\n` +
        "  既存画像を壊さないため上書きしません（CLAUDE.md §13）。\n" +
        "  意図して置き換える場合のみ --force を付けてください。",
    );
  }
}

const editPaths = args.edit
  ? args.edit.split(",").map((p) => p.trim()).filter(Boolean)
  : [];
for (const p of editPaths) {
  if (!fs.existsSync(p)) fail(`編集元の画像が見つかりません: ${p}`);
}

console.log("─".repeat(60));
console.log(`モデル    : ${model}${args.model ? "（明示指定）" : args.fast ? "（速度優先）" : "（既定）"}`);
console.log(`サイズ    : ${size} ／ 品質: ${quality} ／ 形式: ${format}`);
console.log(`枚数      : ${count}`);
if (editPaths.length) console.log(`編集元    : ${editPaths.join(", ")}`);
console.log(`保存先    : ${targets.map((t) => path.relative(process.cwd(), t)).join(", ")}`);
console.log(`プロンプト: ${args.prompt}`);
console.log("─".repeat(60));

if (args["dry-run"]) {
  console.log("\n--dry-run のため送信していません。\n");
  process.exit(0);
}

const endpoint = editPaths.length
  ? "https://api.openai.com/v1/images/edits"
  : "https://api.openai.com/v1/images/generations";

let body;
let headers = { Authorization: `Bearer ${apiKey}` };

if (editPaths.length) {
  const form = new FormData();
  form.append("model", model);
  form.append("prompt", args.prompt);
  form.append("size", size);
  form.append("quality", quality);
  form.append("output_format", format);
  form.append("n", String(count));
  for (const p of editPaths) {
    const buf = fs.readFileSync(p);
    const type = p.endsWith(".png") ? "image/png"
      : p.endsWith(".webp") ? "image/webp"
      : "image/jpeg";
    form.append("image[]", new Blob([buf], { type }), path.basename(p));
  }
  body = form; // Content-Type は fetch が境界つきで自動設定する
} else {
  headers["Content-Type"] = "application/json";
  body = JSON.stringify({
    model,
    prompt: args.prompt,
    size,
    quality,
    output_format: format,
    n: count,
  });
}

const started = Date.now();
process.stdout.write("生成中");
const timer = setInterval(() => process.stdout.write("."), 2000);

let res;
try {
  res = await fetch(endpoint, { method: "POST", headers, body });
} catch (e) {
  clearInterval(timer);
  fail(`通信に失敗しました: ${e.message}`);
}
clearInterval(timer);
console.log("");

if (!res.ok) {
  const text = await res.text();
  let detail = text.slice(0, 400);
  try {
    detail = JSON.parse(text)?.error?.message || detail;
  } catch {}
  const hintMap = {
    401: "APIキーが無効です。.env.local の OPENAI_API_KEY を確認してください（値は表示しないこと）。",
    403:
      "組織認証が外れている可能性があります。" +
      "\n     https://platform.openai.com/settings/organization/general の Verifications と、" +
      "\n     使用中のAPIキーの組織が一致しているかを確認してください" +
      "\n     （2026-09-09 に Individual で認証済み。反映には最大15分かかります）。",
    404: `モデル名が見つかりません（${model}）。--model で正しい名前を指定してください。`,
    429: "レート制限または残高不足です。時間をおいて再実行してください。",
  };
  fail(`APIエラー (${res.status}): ${detail}${hintMap[res.status] ? `\n  → ${hintMap[res.status]}` : ""}`);
}

const json = await res.json();
const items = json.data ?? [];
if (!items.length) fail("画像が返りませんでした。");

fs.mkdirSync(outDir, { recursive: true });
const saved = [];
items.forEach((item, i) => {
  if (!item.b64_json) return;
  const target = targets[i] ?? targets[0];
  fs.writeFileSync(target, Buffer.from(item.b64_json, "base64"));
  saved.push(target);
});

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log(`✓ ${saved.length}枚を保存しました（${seconds}秒）\n`);
for (const s of saved) {
  const kb = (fs.statSync(s).size / 1024).toFixed(0);
  console.log(`  ${path.relative(process.cwd(), s)}  ${kb}KB`);
}
if (json.usage) {
  console.log(`\n  トークン: 入力 ${json.usage.input_tokens ?? "—"} / 出力 ${json.usage.output_tokens ?? "—"}`);
}

console.log(`
掲載前に必ず確認してください（CLAUDE.md §12・§13）
  □ 人間が目視で確認したか
  □ 当社の実在する建物・スタッフ・お客様として見せていないか
  □ 遺影・名札・会葬礼状の類が写り込んでいないか
  □ alt に内容を具体的に書いたか（例「事前相談の様子（イメージ）」）
  □ サイトに載せる場合、イメージ写真である旨を添えるか検討したか
`);
