export type CremationFeeRow = {
  category: string;
  resident: string;
  nonResident: string;
};

export type CremationFees = {
  heading: string;
  lead: string;
  rows: CremationFeeRow[];
  footnote: string;
  changeNotice: string;
};

export type Saijo = {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  operator: string;
  postal?: string;
  address: string;
  intro: string;
  description: string;
  features: string[];
  ourSupport: string[];
  availablePlans: string[];
  facilityInfo: { label: string; value: string }[];
  access: {
    fromKawaguchi: string;
    stations: string[];
    car: string;
    parking: string;
  };
  faqs: { q: string; a: string }[];
  mapEmbedQuery: string;
  metaDescription: string;
  h1?: string;
  metaTitle?: string;
  importantNotice?: { heading: string; body: string };
  cremationFees?: CremationFees;
};

export const saijoMegurinomori: Saijo = {
  slug: "megurinomori",
  name: "川口市めぐりの森",
  shortName: "めぐりの森",
  type: "川口市の火葬場",
  operator: "株式会社 川口斎苑サービス",
  postal: "333-0826",
  address: "埼玉県川口市大字新井宿430-1",
  h1: "川口市めぐりの森での\n火葬・葬儀のご相談",
  metaTitle: "川口市めぐりの森での火葬・葬儀のご相談 | 川口典礼",
  intro:
    "川口市めぐりの森は、川口市の火葬場として多くの方が利用されている、地域に根差した施設です。",
  description:
    "川口典礼では、川口メモリアルホールでのお別れから、めぐりの森での火葬まで、ご家族の状況に合わせて一貫してお手伝いします。川口メモリアルホール(川口市西新井宿)からめぐりの森までは車で約5分。葬儀式・お別れの時間はメモリアルホールで、火葬はめぐりの森で行う流れになります。",
  features: [
    "川口市の火葬場",
    "駐車場75台",
    "川口市民の市民葬制度に対応",
    "川口メモリアルホールから車で約5分",
    "ご家族中心のお見送りに適した、落ち着いた施設",
    "24時間365日、手配・搬送・式段取りまで川口典礼がサポート",
  ],
  ourSupport: [
    "川口メモリアルホールから、めぐりの森まで車で約5分",
    "直葬・火葬式・一日葬・家族葬まで相談可能",
    "川口市民の市民葬制度にも対応",
    "火葬場予約、搬送、安置、式場準備までまとめて相談可能",
  ],
  availablePlans: [
    "direct-funeral",
    "hanaire-owakare",
    "oneday-funeral",
    "family-funeral",
    "kawaguchi-shimin",
  ],
  facilityInfo: [
    { label: "所在地", value: "〒333-0826 埼玉県川口市大字新井宿430-1" },
    { label: "運営", value: "株式会社 川口斎苑サービス" },
    { label: "電話", value: "048-242-5414（代）" },
    { label: "FAX", value: "048-242-5415" },
    { label: "施設種別", value: "火葬場" },
    {
      label: "葬儀式場の併設",
      value: "なし(通夜・告別式を行う式場は併設されていません)",
    },
    { label: "駐車場", value: "75台(火葬施設をご利用の方のみ)" },
    { label: "川口典礼から", value: "車で約5分" },
    {
      label: "問い合わせ・予約受付",
      value:
        "電話でのお問い合わせは17時まで(以降は翌日以降の対応となります)。ご予約はWebまたは音声ガイダンスにより24時間受付。",
    },
  ],
  access: {
    fromKawaguchi:
      "川口典礼(川口メモリアルホール・川口市西新井宿)から車で約5分",
    stations: ["埼玉高速鉄道「新井宿」駅より徒歩15分"],
    car: "首都高速川口線脇の県道239号沿いで、上り路線からのみ進入できます。首都高川口PAやイイナパーク川口からは入場できません。カーナビでは別の場所が表示される場合があるため、車両向けの地図でご確認のうえ、ご不明な場合は事前にお問い合わせください。",
    parking:
      "75台。火葬施設をご利用の方のみご利用いただけます。イイナパーク川口にお越しの方は、公園側駐車場をご利用ください。",
  },
  importantNotice: {
    heading: "めぐりの森は火葬場です。葬儀式は別会場で行います。",
    body: "川口市めぐりの森は火葬を行う施設であり、通夜・告別式を行う葬儀式場は併設されていません。そのため、葬儀式やお別れの時間は、川口メモリアルホールなどの式場で行い、その後、めぐりの森へ移動して火葬を行う流れになります。",
  },
  cremationFees: {
    heading: "川口市めぐりの森の火葬料金",
    lead: "川口市めぐりの森の火葬料金は、市内居住者と市外居住者で異なります。",
    rows: [
      {
        category: "大人(12歳以上)",
        resident: "30,000円",
        nonResident: "100,000円",
      },
      {
        category: "子供(12歳未満)",
        resident: "15,000円",
        nonResident: "50,000円",
      },
      {
        category: "妊娠4ヶ月以上の胎児",
        resident: "15,000円",
        nonResident: "50,000円",
      },
      {
        category: "妊娠4ヶ月未満の胎児",
        resident: "7,500円",
        nonResident: "25,000円",
      },
      {
        category: "改葬遺骨",
        resident: "7,500円",
        nonResident: "25,000円",
      },
      {
        category: "身体の一部",
        resident: "7,500円",
        nonResident: "25,000円",
      },
    ],
    footnote:
      "火葬料金のほか、葬儀内容により搬送費、安置料、骨壺、ドライアイス、式場使用料、宗教者費用などが別途必要になる場合があります。総額がわかるお見積りをご希望の方は、川口典礼までお気軽にご相談ください。",
    changeNotice:
      "料金は変更になる場合があります。詳しくはご相談時にご確認ください。",
  },
  faqs: [
    {
      q: "川口市めぐりの森で葬儀式はできますか？",
      a: "通夜・告別式を行う式場は併設されていません。葬儀式やお別れの時間は川口メモリアルホールなどの式場で行い、その後、めぐりの森へ移動して火葬を行う流れになります。",
    },
    {
      q: "川口市民でなくても利用できますか？",
      a: "ご利用いただけます。川口市民の方と市外の方で火葬料金が異なります。詳しい料金は事前のご相談時にご案内します。",
    },
    {
      q: "駐車場はありますか？",
      a: "駐車場は75台ご用意されています。お車での参列にも対応できます。",
    },
    {
      q: "川口メモリアルホールから近いですか？",
      a: "川口メモリアルホール(川口市西新井宿)から車で約5分の距離です。",
    },
    {
      q: "市民葬制度は使えますか？",
      a: "川口市民の方の市民葬制度にも対応しています。プラン詳細は事前のご相談でご案内します。",
    },
  ],
  mapEmbedQuery: "埼玉県川口市大字新井宿430-1 川口市めぐりの森",
  metaDescription:
    "川口市めぐりの森は川口市の火葬場です。葬儀式場は併設されていません。川口典礼では川口メモリアルホール(川口市西新井宿)での葬儀式から、めぐりの森での火葬まで一貫してお手伝いします。24時間365日相談受付。",
};

export const saijoList: Saijo[] = [saijoMegurinomori];

export function getSaijo(slug: string): Saijo | undefined {
  return saijoList.find((s) => s.slug === slug);
}
