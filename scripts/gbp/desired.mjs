/**
 * GBP にこう設定したい、という「期待値」のデータ化。
 *
 * 出典は docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md（確定文言）。
 * 価格は CLAUDE.md §9 のプラン正本のみ。
 *
 * このファイルを直接編集して diff.mjs / apply.mjs に反映させる運用にする。
 * プレイブック（人間が読む）とこのファイル（機械が読む）を同時に更新すること。
 */

export const NAP = {
  // ⚠ 2026-09-11 修正：以前は "川口典礼" だった。
  //    GBP の現在の名称は「株式会社川口典礼 川口メモリアルホール」＝登記名＋看板名で正しく、
  //    変更しないと決めてある（docs/operations/gbp/2026-09-11-gbp-api-approved.md）。
  //    旧値のまま apply すると名称が書き換わるため、現行値に合わせた。
  title: "株式会社川口典礼 川口メモリアルホール",
  postalCode: "333-0833",
  addressLines: ["西新井宿440-1"],
  locality: "川口市",
  administrativeArea: "埼玉県",
  primaryPhone: "0120-963-765",
  additionalPhones: ["048-281-1117"],
  websiteUri: "https://kawaguchitenrei.com/",
};

/**
 * カテゴリは API 上 categoryId（例 "gcid:funeral_home"）で指定する。
 * 実際に有効な ID は categories.list で取得して確定させる（dump.mjs が候補を出す）。
 * ここでは「探すべき表示名」を持っておき、ID は実行時に解決する。
 */
/**
 * ⚠ 2026-09-11 修正：以前は primary: "葬儀店" / additional: ["葬儀場", "葬祭業"] だったが、
 *    **この3つは Google の日本のカテゴリに存在しない**（全4,053件を取得して確認）。
 *    実在する葬祭関連カテゴリは次のとおり。
 *
 *      葬儀屋            categories/gcid:funeral_director        ← 現在のメイン。これが最適
 *      斎場              categories/gcid:funeral_home            ← 現在の追加
 *      葬儀サービス      categories/gcid:funeral_celebrant_service ← 現在の追加
 *      火葬業            categories/gcid:cremation_service        ← 使わない（下記）
 *      墓地              categories/gcid:cemetery                 ← 使わない
 *      ペット葬儀サービス categories/gcid:pet_funeral_services     ← 使わない
 *      ペット霊園        categories/gcid:pet_cemetery             ← 使わない
 *      仏壇販売店        categories/gcid:butsudan_store
 *
 *    現在の設定（葬儀屋／斎場・葬儀サービス）が実在カテゴリの中で最適なため、期待値を現状に合わせた。
 */
export const CATEGORY_INTENT = {
  primary: "葬儀屋",
  additional: ["斎場", "葬儀サービス"],
  // 絶対に選ばない（guard.mjs でも二重に止める）
  //   火葬場・火葬業 : 川口市めぐりの森は市営。当社は火葬場を運営していない（CLAUDE.md の停止条件）
  //   墓地           : 事業内容と異なる
  //   ペット系       : ペット葬儀への導線は文脈上ふさわしくない（CLAUDE.md §11）
  forbidden: ["火葬場", "火葬業", "墓地", "霊園", "ペット"],
};

export const DESCRIPTION = `埼玉県川口市西新井宿の葬儀社、川口典礼です。2006年の創業から20年、川口市・新井宿・鳩ヶ谷を中心に、年間約260件のご葬儀をお手伝いしてきました。累計の施行実績は4,600件以上になります。

自社式場「川口メモリアルホール」は、川口市営の火葬場「川口市めぐりの森」まで車で約5分。ご火葬までの移動のご負担を抑えられます。敷地内に無料駐車場を70台ご用意しており、家族葬から200名規模の一般葬まで対応できます。個室の面会室もございます。

直葬・火葬式、花入れお別れ、一日葬、夕暮れ家族葬、家族葬、川口市の市民葬まで、ご希望とご予算に合わせてお選びいただけます。「夕暮れ家族葬」は、告別式を夕方から夜にかけて行い、翌日に火葬場へお集まりいただく当社オリジナルのプランです。日中はお仕事やご都合で集まりにくいご家族・ご親族にも、お別れのお時間をお取りいただけます。

ご相談・お見積りは無料です。事前のご相談も、お急ぎのご連絡も、24時間365日承っています。まだ何も決まっていない段階でも、お気軽にお声がけください。`;
// ⚠ 2026-09-11 修正：末尾にあった「電話：0120-963-765 ／ 048-281-1117」の行を削除した（493字 → 461字）。
//    493字版は 2026-09-09 に GBP 側で保存できず、電話行を削除した461字で保存に成功した経緯がある
//    （docs/operations/gbp/2026-09-09-gbp-description-and-post-saved.md）。
//    電話番号は NAP.primaryPhone / additionalPhones で別途設定されるため、説明文に重ねる必要もない。

const PRICE_NOTE =
  "※表示は事前相談会員価格（税込）です。火葬料、式場使用料、お料理、返礼品、宗教者へのお礼などが別途必要になる場合があります。総額は無料のお見積りでご案内します。";

// ⚠ 2026-09-11 追加：市民葬は「川口市民 葬祭事業価格」であって事前相談会員価格ではない。
//    PRICE_NOTE をそのまま付けると誤った価格表示になる（CLAUDE.md §14）。
const SHIMIN_PRICE_NOTE =
  "※表示は川口市民の葬祭事業価格（税込）です。ご利用には川口市の定める条件があります。火葬料、式場使用料、お料理、返礼品、宗教者へのお礼などが別途必要になる場合があります。総額は無料のお見積りでご案内します。";

/** サービス（商品）8件。並び順もプレイブックどおり。 */
export const SERVICES = [
  {
    name: "直葬プラン",
    priceJpy: 139000,
    description:
      "通夜・告別式を行わず、ご火葬を中心にシンプルにお見送りするプランです。ごく少人数・1日の日程で承ります。通常価格189,000円（税込）。",
  },
  {
    name: "花入れお別れプラン",
    priceJpy: 229000,
    description:
      "ご火葬の前に、お花入れのお別れのお時間を設けるプランです。少人数・1日の日程で承ります。通常価格279,000円（税込）。",
  },
  {
    name: "一日葬プラン",
    priceJpy: 396000,
    description:
      "通夜を行わず、告別式とご火葬を1日で執り行うプランです。5〜30名を目安に承ります。通常価格496,000円（税込）。",
  },
  {
    name: "夕暮れ家族葬",
    priceJpy: 451000,
    description:
      "告別式を夕方から夜にかけて行い、翌日に火葬場へお集まりいただく川口典礼オリジナルの一日葬です。日中はお仕事やご都合で集まりにくいご家族・ご親族にも、ゆっくりお別れのお時間をお取りいただけます。会場は自社式場の川口メモリアルホール。通常価格551,000円（税込）。",
  },
  {
    name: "家族葬プラン",
    priceJpy: 528000,
    description:
      "ご家族や親しい方を中心に、通夜・告別式の2日間でゆっくりお見送りするプランです。10〜30名を目安に承ります。通常価格628,000円（税込）。",
  },
  {
    name: "川口市民葬プラン",
    priceJpy: 231000,
    description:
      "川口市の葬祭事業（市民葬）に対応したプランです。ご利用には条件がありますので、まずはご相談ください。川口市民 葬祭事業価格（税込）。",
  },
  // ⚠ 2026-09-11 修正：無料の2件は 2026-09 にブラウザから手作業で入れた現行の文言をそのまま採用する
  //    （API で取得した実値と一致）。無料サービスに価格の注記を付けるのは不自然なため、
  //    PRICE_NOTE は有料プランにのみ付ける（下の .map を参照）。
  {
    name: "事前相談・お見積り",
    priceJpy: null,
    description:
      "ご葬儀の流れ、費用の目安、プランに含まれる内容と別途必要な費用をご案内します。ご相談・お見積りは無料です。まだ何も決まっていない段階でもご相談いただけます。お電話でのご相談は24時間365日受け付けています。",
  },
  {
    name: "川口メモリアルホール見学",
    priceJpy: null,
    description:
      "川口市西新井宿の自社式場をご見学いただけます。見学は無料・事前予約制です。敷地内に70台分の無料駐車場があり、個室面会室もご用意しています。お電話または当社サイトの事前相談フォームからお申し込みください。",
  },
].map((s) => {
  if (s.priceJpy === null) return s; // 無料のサービスに価格の注記は付けない
  const note = s.name === "川口市民葬プラン" ? SHIMIN_PRICE_NOTE : PRICE_NOTE;
  // GBP のサービス説明文は改行・連続空白を受け付けない
  // （API: "Strings must not contain leading/trailing or contiguous whitespace." 2026-09-11 実測）。
  // 注記は改行ではなく半角スペース1つでつなぐ。
  return { ...s, description: `${s.description} ${note}`.replace(/\s+/g, " ").trim() };
});

/**
 * Q&A 10問。
 *
 * ⚠ 2026-09-11 追記：My Business Q&A API は 2025-11-03 に廃止され、GBP の「質問と回答」機能自体も
 *    2025-12 から段階的に終了しています。**この配列は GBP へは適用できません。**
 *    内容は消さずに残していますが、用途は「サイトの /faq/ とエリアページの FAQPage 構造化データの原稿」です。
 *    AI 検索（Ask Maps / AI Overviews）時代の受け皿はサイト側にある、という整理です。
 */
export const QANDA = [
  {
    question: "夜間や早朝でも対応してもらえますか？",
    answer:
      "はい。24時間365日、お電話を承っています。深夜・早朝のお迎えにも対応しています。0120-963-765",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "敷地内に70台分の無料駐車場をご用意しています。ご参列の方もお車でお越しいただけます。",
  },
  {
    question: "火葬場は近いですか？",
    answer:
      "川口市営の火葬場「川口市めぐりの森」まで、川口メモリアルホールから車で約5分です。ご火葬までの移動のご負担を抑えられます。",
  },
  {
    question: "家族葬はいくらくらいですか？",
    answer:
      "家族葬プランは事前相談会員価格528,000円（税込）、通常価格628,000円（税込）です。火葬料・お料理・返礼品などが別途必要になる場合がありますので、総額は無料のお見積りでご案内します。",
  },
  {
    question: "夕暮れ家族葬とは何ですか？",
    answer:
      "告別式を夕方から夜にかけて行い、翌日に火葬場へお集まりいただく川口典礼オリジナルの一日葬です。日中はお仕事やご都合で集まりにくいご家族・ご親族にも、ゆっくりお別れのお時間をお取りいただけます。事前相談会員価格451,000円（税込）。",
  },
  {
    question: "事前に見学できますか？",
    answer:
      "はい。川口メモリアルホールはご見学いただけます。ご相談・お見積りは無料です。お電話または当社サイトの事前相談フォームよりお申し込みください。",
  },
  {
    question: "川口市の市民葬は使えますか？",
    answer:
      "川口典礼は川口市の葬祭事業（市民葬）の登録店です。ご利用には条件がありますので、まずはご相談ください。",
  },
  {
    question: "川口市以外からでも相談できますか？",
    answer:
      "はい。鳩ヶ谷・新井宿はもちろん、蕨市・戸田市・さいたま市緑区・草加市などからもご相談を承っています。",
  },
  {
    question: "まだ亡くなっていませんが相談できますか？",
    answer:
      "もちろんです。事前のご相談は無料で承っています。まだ何も決まっていない段階でも、お話をうかがうところから始めさせてください。",
  },
  {
    question: "ペットと一緒にお別れできますか？",
    answer:
      "個室の面会室で、ご家族とご一緒にお過ごしいただけます。詳しくはご相談ください。",
  },
];

/** Business Information API の locations.patch に渡す形へ組み立てる。 */
export function buildPatch({ categoryIds } = {}) {
  const patch = {
    title: NAP.title,
    websiteUri: NAP.websiteUri,
    phoneNumbers: {
      primaryPhone: NAP.primaryPhone,
      additionalPhones: NAP.additionalPhones,
    },
    profile: { description: DESCRIPTION },
    regularHours: {
      periods: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
        (d) => ({
          openDay: d,
          openTime: { hours: 0, minutes: 0 },
          closeDay: d,
          closeTime: { hours: 24, minutes: 0 },
        })
      ),
    },
    // ⚠ 2026-09-11 修正：既存の実データはすべて freeFormServiceItem.category を持っている。
    //    付けないと未分類になるため、メインカテゴリ（葬儀屋）に紐付ける。
    serviceItems: SERVICES.map((s) => ({
      freeFormServiceItem: {
        ...(categoryIds?.primary ? { category: categoryIds.primary } : {}),
        label: { displayName: s.name, description: s.description },
      },
      ...(s.priceJpy != null
        ? { price: { currencyCode: "JPY", units: String(s.priceJpy) } }
        : {}),
    })),
  };
  if (categoryIds?.primary) {
    patch.categories = {
      primaryCategory: { name: categoryIds.primary },
      additionalCategories: (categoryIds.additional ?? []).map((n) => ({ name: n })),
    };
  }
  // guard.mjs に Q&A も一緒に検査させるための内部フィールド（API には送らない）
  patch.__qanda = QANDA;
  return patch;
}

/** API 送信直前に内部フィールドを落とす。 */
export function stripInternal(patch) {
  const { __qanda, ...rest } = patch;
  return rest;
}

/** patch のキーから updateMask を作る。 */
export function buildUpdateMask(patch) {
  return Object.keys(stripInternal(patch)).join(",");
}
