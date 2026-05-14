export type Hall = {
  slug: string;
  name: string;
  shortName: string;
  postal: string;
  address: string;
  intro: string;
  description: string;
  features: string[];
  gallery: { label: string; description: string }[];
  equipment: { label: string; value: string }[];
  supportedPlans: string[];
  access: {
    stations: string[];
    car: string;
    parking: string;
    nearby: string;
  };
  faqs: { q: string; a: string }[];
  mapEmbedQuery: string;
  metaDescription: string;
};

export const hallKawaguchi: Hall = {
  slug: "kawaguchi-memorial-hall",
  name: "川口メモリアルホール",
  shortName: "川口メモリアルホール",
  postal: "333-0833",
  address: "埼玉県川口市西新井宿440-1",
  intro: "川口市西新井宿にある、川口典礼の自社ホール。",
  description:
    "川口メモリアルホールは、川口市西新井宿にある川口典礼の自社葬儀ホールです。少人数の家族葬・一日葬・火葬式に適した、落ち着いた雰囲気のホールで、ご家族の心情に寄り添ったお見送りができます。川口市めぐりの森への移動もしやすい立地です。",
  features: [
    "川口市西新井宿の自社ホール",
    "家族葬・一日葬・火葬式に適した規模",
    "落ち着いた雰囲気の式場",
    "控室・相談スペース完備",
    "駐車場あり",
    "川口市めぐりの森へ移動しやすい立地",
  ],
  gallery: [
    { label: "外観", description: "落ち着いた佇まいの自社ホール" },
    { label: "式場", description: "家族葬・一日葬に適した広さ" },
    { label: "控室", description: "ご家族でゆっくりお過ごしいただけます" },
    { label: "相談スペース", description: "事前相談・打合せに" },
    { label: "エントランス", description: "段差の少ない動線" },
    { label: "駐車場", description: "敷地内に駐車スペース" },
  ],
  equipment: [
    { label: "式場収容人数", value: "○○名(要確認)" },
    { label: "控室", value: "あり" },
    { label: "宿泊", value: "要相談" },
    { label: "バリアフリー", value: "対応" },
    { label: "駐車場", value: "○台(要確認)" },
    { label: "対応形式", value: "家族葬・一日葬・火葬式・直葬・市民葬" },
  ],
  supportedPlans: [
    "family-funeral",
    "oneday-funeral",
    "cremation",
    "direct-funeral",
    "kawaguchi-shimin",
  ],
  access: {
    stations: [
      "JR京浜東北線「川口」駅(要確認・タクシー約○分)",
      "埼玉高速鉄道「新井宿」駅(要確認・徒歩約○分)",
    ],
    car: "外環道「川口中央IC」より約○分(要確認)。首都高速川口線「新井宿出入口」より約○分(要確認)。",
    parking: "○台(要確認)。参列人数によっては近隣駐車場のご案内も可能です。",
    nearby: "川口市めぐりの森(車で約○分)、戸田葬祭場、谷塚斎場へもアクセス可能。",
  },
  faqs: [
    {
      q: "見学はできますか？",
      a: "はい、ご見学いただけます。お電話または事前相談フォームよりお申し込みください。担当スタッフがご案内します。事前相談・お見積りは無料です。",
    },
    {
      q: "駐車場は何台分ありますか？",
      a: "○台分(要確認)の駐車スペースをご用意しています。参列人数によっては近隣の駐車場のご案内も可能ですので、ご相談時にお伝えください。",
    },
    {
      q: "宿泊はできますか？",
      a: "控室でのご休息は可能です。ご宿泊の可否は日程やご希望により異なるため、ご相談時に詳細をご案内します。",
    },
    {
      q: "バリアフリーですか？",
      a: "ご高齢の方や車椅子の方も安心してご利用いただけるよう、館内のバリアフリーに配慮しています。",
    },
    {
      q: "他の宗派にも対応していますか？",
      a: "仏式・神式・無宗教葬など、ご希望の形式に合わせて対応します。お付き合いのある宗教者がない場合のご紹介も承ります。",
    },
    {
      q: "川口市めぐりの森も利用できますか？",
      a: "はい、ホールでの式と川口市めぐりの森での火葬を組み合わせたご案内も可能です。火葬式・一日葬・家族葬それぞれに対応します。",
    },
  ],
  mapEmbedQuery: "埼玉県川口市西新井宿440-1",
  metaDescription:
    "川口メモリアルホールは、川口市西新井宿にある川口典礼の自社葬儀ホール。家族葬・一日葬・火葬式に適した規模で、川口市めぐりの森にも近い立地。見学・事前相談は24時間受付。",
};

export const halls: Hall[] = [hallKawaguchi];

export function getHall(slug: string): Hall | undefined {
  return halls.find((h) => h.slug === slug);
}
