#!/usr/bin/env node
/**
 * GBP へ設定を書き込む。既定は dry-run（何も書き込まない）。
 *
 *   node scripts/gbp/apply.mjs                      # dry-run（送信内容を表示するだけ）
 *   node scripts/gbp/apply.mjs --confirm            # 基本情報・サービスを書き込む
 *   node scripts/gbp/apply.mjs --confirm --qanda    # Q&A も投稿する
 *   node scripts/gbp/apply.mjs --confirm --only=profile   # 項目を絞る
 *
 * 【安全設計】
 *   - --confirm がなければ 1 バイトも送信しない
 *   - 送信前に guard.mjs の違反チェックを通す。違反が 1 件でもあれば中止
 *   - 送信前に必ず現在値を tmp/gbp/backup-before-apply.json に保存
 *   - カテゴリは categoryId の解決に成功した場合のみ含める（推測で送らない）
 *
 * GBP は公開情報である。誤った書き込みは営業に直接影響するため、
 * --confirm は人間が内容を確認したうえでのみ付けること。
 */

import fs from "node:fs";
import path from "node:path";
import { getClients, READ_MASK, explainError, saveJson } from "./auth.mjs";
import {
  CATEGORY_INTENT,
  QANDA,
  buildPatch,
  buildUpdateMask,
  stripInternal,
} from "./desired.mjs";
import { assertSafe } from "./guard.mjs";

const argv = process.argv.slice(2);
const CONFIRM = argv.includes("--confirm");
const WITH_QANDA = argv.includes("--qanda");
const ONLY = argv.find((a) => a.startsWith("--only="))?.split("=")[1];

async function resolveCategoryIds(info) {
  try {
    const res = await info.categories.list({
      regionCode: "JP",
      languageCode: "ja",
      view: "BASIC",
      filter: "displayName=葬儀",
      pageSize: 50,
    });
    const cats = res.data.categories ?? [];
    const find = (label) =>
      cats.find((c) => (c.displayName ?? "").trim() === label.trim())?.name ?? null;

    const primary = find(CATEGORY_INTENT.primary);
    const additional = CATEGORY_INTENT.additional.map(find).filter(Boolean);
    if (!primary) {
      console.warn(
        `  [警告] メインカテゴリ「${CATEGORY_INTENT.primary}」の categoryId を解決できませんでした。` +
          "カテゴリは今回の書き込み対象から除外します（管理画面で設定してください）。"
      );
      return null;
    }
    return { primary, additional };
  } catch (e) {
    console.warn(`  [警告] カテゴリ一覧の取得に失敗しました。カテゴリは書き込み対象から除外します。`);
    return null;
  }
}

async function main() {
  const { accounts, info, qanda } = getClients();

  console.log(
    CONFIRM
      ? "=== GBP 書き込み（--confirm あり：実際に送信します） ===\n"
      : "=== GBP 書き込み dry-run（--confirm なし：何も送信しません） ===\n"
  );

  const accRes = await accounts.accounts.list({ pageSize: 20 });
  const accs = accRes.data.accounts ?? [];
  if (accs.length === 0) throw new Error("アカウントが取得できませんでした。");

  const locations = [];
  for (const acc of accs) {
    const r = await info.accounts.locations.list({
      parent: acc.name,
      readMask: READ_MASK,
      pageSize: 100,
    });
    for (const loc of r.data.locations ?? []) locations.push(loc);
  }
  if (locations.length === 0) throw new Error("ロケーションが取得できませんでした。");
  if (locations.length > 1) {
    console.log(`ロケーションが ${locations.length} 件あります。すべてに同じ内容を適用します。`);
  }

  // 差し戻し用バックアップ（dry-run でも保存する）
  const backup = saveJson("tmp/gbp/backup-before-apply.json", { locations });
  console.log(`現在値のバックアップ: ${backup}\n`);

  const categoryIds = await resolveCategoryIds(info);

  for (const loc of locations) {
    console.log(`--- ${loc.title ?? "(名称なし)"} (${loc.name}) ---`);

    let patch = buildPatch({ categoryIds: categoryIds ?? undefined });

    if (ONLY) {
      const keep = new Set([ONLY, "__qanda"]);
      patch = Object.fromEntries(Object.entries(patch).filter(([k]) => keep.has(k)));
      console.log(`  --only=${ONLY} により対象を絞りました: ${Object.keys(stripInternal(patch)).join(", ")}`);
    }

    // ガードレール（違反があれば例外で中止）
    assertSafe({ current: loc, patch });
    console.log("  ✅ ガードレール通過");

    const body = stripInternal(patch);
    const updateMask = buildUpdateMask(patch);
    console.log(`  updateMask: ${updateMask}`);

    if (!CONFIRM) {
      const preview = saveJson(
        `tmp/gbp/dryrun-${loc.name.replace(/[^\w.-]/g, "_")}.json`,
        { name: loc.name, updateMask, body }
      );
      console.log(`  dry-run: 送信内容を ${preview} に書き出しました（送信していません）`);
    } else {
      await info.locations.patch({
        name: loc.name,
        updateMask,
        requestBody: body,
      });
      console.log("  ✅ 基本情報・サービスを書き込みました");
    }

    // Q&A は別 API。--qanda を付けたときだけ扱う
    if (WITH_QANDA) {
      const existing = await qanda.locations.questions
        .list({ parent: loc.name, pageSize: 50, answersPerQuestion: 1 })
        .then((r) => (r.data.questions ?? []).map((q) => (q.text ?? "").trim()))
        .catch(() => []);

      for (const q of QANDA) {
        if (existing.includes(q.question.trim())) {
          console.log(`  既存  Q&A: ${q.question}`);
          continue;
        }
        if (!CONFIRM) {
          console.log(`  dry-run  Q&A追加予定: ${q.question}`);
          continue;
        }
        const created = await qanda.locations.questions.create({
          parent: loc.name,
          requestBody: { text: q.question },
        });
        await qanda.locations.questions.answers.upsert({
          parent: created.data.name,
          requestBody: { answer: { text: q.answer } },
        });
        console.log(`  ✅ Q&A追加: ${q.question}`);
      }
    } else {
      console.log("  Q&A: スキップ（--qanda を付けると対象になります）");
    }
    console.log("");
  }

  console.log("────────────────────────────────────");
  if (CONFIRM) {
    console.log("書き込みが完了しました。管理画面で反映を目視確認してください。");
    console.log("差し戻しが必要な場合は tmp/gbp/backup-before-apply.json の値を使ってください。");
  } else {
    console.log("dry-run のため何も送信していません。");
    console.log("内容に問題がなければ: node scripts/gbp/apply.mjs --confirm --qanda");
  }
  console.log("\n※写真・投稿（最新情報）・口コミ返信は本スクリプトの対象外です。");
  console.log("　これらは旧 v4 系エンドポイントで、対応可否を承認後に確認します。");
}

main().catch((e) => {
  console.error("\n" + (e?.response ? explainError(e) : e.message));
  process.exit(1);
});
