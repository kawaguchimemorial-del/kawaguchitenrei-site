/**
 * GBP への書き込み前チェック（ガードレール）。
 *
 * プレイブック §11「絶対にやってはいけないこと」と CLAUDE.md §9/§11/§14 を
 * コードで機械的に止める。ここで 1 件でも violation が出たら書き込みはしない。
 *
 * 参照: docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md
 */

// CLAUDE.md §9 プラン正本（この数字以外を GBP に出さない）
export const CANON_PRICES = [
  139000, 189000, // 直葬
  229000, 279000, // 花入れお別れ
  396000, 496000, // 一日葬
  451000, 551000, // 夕暮れ家族葬
  528000, 628000, // 家族葬
  231000,         // 市民葬
  88000, 138000,  // シンプル直葬（サイト lib/plans.ts simpleAlternative）
];

// CLAUDE.md §11 / §19.3 の禁止表現
export const BANNED_PHRASES = [
  "最安", "必ず", "絶対", "追加費用なし", "総額確定", "標準価格",
  "いつでも利用", "空きがあります", "確実に手配",
  "唯一", "他社にはない", "後悔しない", "格安",
];

// 名称は登記・看板どおりのみ（キーワード詰め込みはガイドライン違反）
export const ALLOWED_TITLES = ["川口典礼", "株式会社川口典礼", "株式会社 川口典礼"];

// 自社運営ではない施設。カテゴリとして名乗ってはいけない
export const FORBIDDEN_CATEGORY_PATTERNS = [
  /火葬場/, /crematorium/i, /crematory/i, /墓地/, /cemetery/i,
];

/**
 * @param {object} args
 * @param {object} args.current  現在の location（API レスポンス）
 * @param {object} args.patch    これから送る差分
 * @returns {{violations: string[], warnings: string[]}}
 */
export function checkPatch({ current, patch }) {
  const violations = [];
  const warnings = [];

  // 1. 名称
  if (patch.title !== undefined && !ALLOWED_TITLES.includes(patch.title.trim())) {
    violations.push(
      `名称を「${patch.title}」に変更しようとしています。許可されるのは ${ALLOWED_TITLES.join(" / ")} のみです（キーワード詰め込みはガイドライン違反）。`
    );
  }

  // 2. カテゴリ
  const cats = [];
  if (patch.categories?.primaryCategory) cats.push(patch.categories.primaryCategory);
  for (const c of patch.categories?.additionalCategories ?? []) cats.push(c);
  for (const c of cats) {
    const label = `${c.displayName ?? ""} ${c.name ?? ""}`;
    for (const re of FORBIDDEN_CATEGORY_PATTERNS) {
      if (re.test(label)) {
        violations.push(
          `カテゴリ「${c.displayName ?? c.name}」は設定できません。川口市めぐりの森は川口市営で自社運営ではないため、火葬場・墓地系カテゴリは実態と乖離します（CLAUDE.md §19.3）。`
        );
      }
    }
  }
  if (cats.length > 4) {
    warnings.push(`カテゴリが ${cats.length} 件あります。主軸がぼやけるため 4 件以内を推奨します。`);
  }

  // 3. 文章中の禁止表現（説明文・サービス説明・Q&A 回答すべて）
  const texts = collectTexts(patch);
  for (const { where, text } of texts) {
    for (const p of BANNED_PHRASES) {
      if (text.includes(p)) {
        violations.push(`${where} に禁止表現「${p}」が含まれています（CLAUDE.md §11）。`);
      }
    }
  }

  // 4. 価格（正本外の数字を出していないか）
  for (const { where, text } of texts) {
    for (const m of text.matchAll(/([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{5,7})\s*円/g)) {
      const n = Number(m[1].replace(/,/g, ""));
      if (!CANON_PRICES.includes(n)) {
        violations.push(
          `${where} に正本外の価格「${m[0]}」が含まれています。CLAUDE.md §9 の正本のみ掲載可です。`
        );
      }
    }
  }

  // 5. 説明文の文字数
  const desc = patch.profile?.description;
  if (typeof desc === "string" && desc.length > 750) {
    violations.push(`ビジネス説明文が ${desc.length} 文字です（上限 750 文字）。`);
  }

  // 6. 電話番号（正本と一致しているか）
  const primary = patch.phoneNumbers?.primaryPhone;
  if (primary && !["0120-963-765", "048-281-1117"].includes(primary.trim())) {
    violations.push(`電話番号「${primary}」は NAP 正本と一致しません。`);
  }

  // 7. 営業時間を 24 時間から狭めていないか（事実は 24時間365日受付）
  if (patch.regularHours && current?.regularHours) {
    const wasAllDay = JSON.stringify(current.regularHours).includes("openTime");
    if (wasAllDay && JSON.stringify(patch.regularHours).length < 20) {
      warnings.push("営業時間の指定が極端に短い内容です。24時間営業の設定が消えていないか確認してください。");
    }
  }

  return { violations, warnings };
}

function collectTexts(patch) {
  const out = [];
  if (patch.profile?.description) out.push({ where: "ビジネス説明文", text: patch.profile.description });
  for (const [i, s] of (patch.serviceItems ?? []).entries()) {
    const label = s.structuredServiceItem?.description ?? s.freeFormServiceItem?.label?.description;
    const name = s.freeFormServiceItem?.label?.displayName ?? `サービス#${i + 1}`;
    if (label) out.push({ where: `サービス「${name}」の説明`, text: label });
    if (s.freeFormServiceItem?.label?.displayName) {
      out.push({ where: `サービス名#${i + 1}`, text: s.freeFormServiceItem.label.displayName });
    }
  }
  for (const [i, q] of (patch.__qanda ?? []).entries()) {
    if (q.question) out.push({ where: `Q&A#${i + 1} の質問`, text: q.question });
    if (q.answer) out.push({ where: `Q&A#${i + 1} の回答`, text: q.answer });
  }
  return out;
}

/** 違反があれば例外を投げる。書き込み前に必ず通す。 */
export function assertSafe({ current, patch }) {
  const { violations, warnings } = checkPatch({ current, patch });
  for (const w of warnings) console.warn(`  [警告] ${w}`);
  if (violations.length > 0) {
    const lines = violations.map((v, i) => `  ${i + 1}. ${v}`).join("\n");
    throw new Error(`書き込みを中止しました。${violations.length} 件の違反があります。\n${lines}`);
  }
}
