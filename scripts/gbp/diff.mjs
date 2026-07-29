#!/usr/bin/env node
/**
 * 現在の GBP 設定と desired.mjs の期待値を比較して差分を表示する（書き込みなし）。
 *
 *   node scripts/gbp/dump.mjs        # 先に現在値を取得
 *   node scripts/gbp/diff.mjs        # 差分を確認
 *
 * ここで表示される内容が apply.mjs で書き込まれる対象になる。
 * 差分を見て納得できない項目があれば、desired.mjs を直してから apply する。
 */

import fs from "node:fs";
import path from "node:path";
import {
  NAP,
  DESCRIPTION,
  SERVICES,
  QANDA,
  CATEGORY_INTENT,
} from "./desired.mjs";
import { checkPatch } from "./guard.mjs";

const DUMP = path.join(process.cwd(), "tmp/gbp/dump-latest.json");

function line(label, current, desired) {
  const same = String(current ?? "") === String(desired ?? "");
  const mark = same ? "  一致" : "→ 変更";
  console.log(`  ${mark}  ${label}`);
  if (!same) {
    console.log(`          現在: ${truncate(current ?? "(未設定)")}`);
    console.log(`          変更: ${truncate(desired ?? "(未設定)")}`);
  }
}

function truncate(s, n = 90) {
  const t = String(s).replace(/\n/g, " ⏎ ");
  return t.length > n ? `${t.slice(0, n)}…（全${t.length}文字）` : t;
}

function main() {
  if (!fs.existsSync(DUMP)) {
    console.error("tmp/gbp/dump-latest.json がありません。先に node scripts/gbp/dump.mjs を実行してください。");
    process.exit(1);
  }
  const dump = JSON.parse(fs.readFileSync(DUMP, "utf8"));
  const locs = dump.locations ?? [];
  if (locs.length === 0) {
    console.error("ロケーションが dump に含まれていません。");
    process.exit(1);
  }

  for (const loc of locs) {
    console.log(`\n=== ${loc.title ?? "(名称なし)"} (${loc.name}) ===\n`);

    console.log("【基本情報】");
    line("名称", loc.title, NAP.title);
    line("ウェブサイト", loc.websiteUri, NAP.websiteUri);
    line("電話（主）", loc.phoneNumbers?.primaryPhone, NAP.primaryPhone);
    line(
      "電話（副）",
      (loc.phoneNumbers?.additionalPhones ?? []).join(" / "),
      NAP.additionalPhones.join(" / ")
    );

    console.log("\n【カテゴリ】");
    const curPrimary = loc.categories?.primaryCategory?.displayName;
    line("メインカテゴリ", curPrimary, CATEGORY_INTENT.primary);
    const curAdd = (loc.categories?.additionalCategories ?? []).map((c) => c.displayName);
    line("追加カテゴリ", curAdd.join(" / "), CATEGORY_INTENT.additional.join(" / "));
    for (const f of CATEGORY_INTENT.forbidden) {
      const hit = [curPrimary, ...curAdd].filter(Boolean).some((c) => c.includes(f));
      if (hit) console.log(`  ⚠ 使用禁止カテゴリ「${f}」が現在設定されています。削除が必要です。`);
    }

    console.log("\n【説明文】");
    const curDesc = loc.profile?.description ?? "";
    if (curDesc.trim() === DESCRIPTION.trim()) {
      console.log("    一致  ビジネス説明文");
    } else {
      console.log(`  → 変更  ビジネス説明文（現在 ${curDesc.length}文字 → 変更後 ${DESCRIPTION.length}文字 / 上限750）`);
    }

    console.log("\n【営業時間】");
    const periods = loc.regularHours?.periods ?? [];
    const allDay =
      periods.length === 7 &&
      periods.every((p) => p.openTime?.hours === 0 && (p.closeTime?.hours ?? 0) >= 24);
    console.log(allDay ? "    一致  24時間営業（7日）" : `  → 変更  24時間営業（7日）に設定（現在 ${periods.length} 期間）`);

    console.log("\n【サービス】");
    const curServices = (loc.serviceItems ?? []).map(
      (s) => s.freeFormServiceItem?.label?.displayName ?? "(名称不明)"
    );
    console.log(`  現在 ${curServices.length} 件 → 期待 ${SERVICES.length} 件`);
    for (const s of SERVICES) {
      const exists = curServices.includes(s.name);
      const price = s.priceJpy ? `${s.priceJpy.toLocaleString("ja-JP")}円` : "無料";
      console.log(`  ${exists ? "  既存" : "→ 追加"}  ${s.name}（${price}）`);
    }
    const extra = curServices.filter((c) => !SERVICES.some((s) => s.name === c));
    for (const e of extra) console.log(`  ⚠ 期待値に無いサービス「${e}」が登録されています（要確認）`);

    console.log("\n【Q&A】");
    const curQ = (dump.qanda?.[loc.name] ?? []).map((q) => (q.text ?? "").trim());
    console.log(`  現在 ${curQ.length} 件 → 期待 ${QANDA.length} 件`);
    for (const q of QANDA) {
      const exists = curQ.some((c) => c === q.question.trim());
      console.log(`  ${exists ? "  既存" : "→ 追加"}  ${q.question}`);
    }

    // ガードレールの事前チェック
    console.log("\n【ガードレール事前チェック】");
    const { violations, warnings } = checkPatch({
      current: loc,
      patch: {
        title: NAP.title,
        profile: { description: DESCRIPTION },
        phoneNumbers: { primaryPhone: NAP.primaryPhone },
        serviceItems: SERVICES.map((s) => ({
          freeFormServiceItem: { label: { displayName: s.name, description: s.description } },
        })),
        __qanda: QANDA,
      },
    });
    if (violations.length === 0) console.log("  ✅ 違反なし");
    for (const v of violations) console.log(`  ❌ ${v}`);
    for (const w of warnings) console.log(`  ⚠ ${w}`);
  }

  console.log("\n────────────────────────────────────");
  console.log("書き込みは行っていません。");
  console.log("内容を確認したら: node scripts/gbp/apply.mjs --confirm");
}

main();
