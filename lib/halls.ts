export type Hall = {
  slug: string;
  name: string;
  shortName: string;
  postal: string;
  address: string;
  intro: string;
  description: string;
  features: string[];
  gallery: { label: string; description: string; src: string; alt: string }[];
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
  intro:
    "川口市めぐりの森まで車で5分。駐車場70台。家族葬から200名規模の一般葬まで。",
  description:
    "川口メモリアルホールは、川口市西新井宿にある川口典礼の自社葬儀ホールです。川口市めぐりの森(火葬場)まで車で約5分の好立地で、火葬場までの移動を最小限に抑えてご家族の負担を軽減できます。敷地内に駐車場70台を完備し、家族葬から最大200名規模の一般葬まで、ご希望の規模に合わせて対応可能です。創業20年、年間約260件のご葬儀をお手伝いしてきました。",
  features: [
    "川口市めぐりの森まで車で約5分の好立地",
    "敷地内駐車場70台完備で大規模葬儀にも対応",
    "家族葬から最大200名規模の一般葬まで対応",
    "創業20年・年間約260件の施行実績",
    "控室・相談スペース完備、バリアフリー対応",
    "落ち着いた雰囲気の式場でご家族中心のお見送りに",
  ],
  gallery: [
    {
      label: "外観",
      description: "落ち着いた佇まいの自社ホール",
      src: "/images/home/hall/hall-exterior.jpg",
      alt: "川口メモリアルホールの外観",
    },
    {
      label: "式場",
      description: "家族葬から一般葬まで規模を調整可能",
      src: "/images/home/hall/hall-ceremony-room.jpg",
      alt: "川口メモリアルホールの式場",
    },
    {
      label: "控室",
      description: "ご家族でゆっくりお過ごしいただけます",
      src: "/images/home/hall/hall-family-waiting-room.jpg",
      alt: "川口メモリアルホールの親族控室",
    },
    {
      label: "エントランス",
      description: "段差の少ない動線",
      src: "/images/home/hall/hall-interior.jpg",
      alt: "川口メモリアルホールのエントランス",
    },
  ],
  equipment: [
    { label: "対応規模", value: "家族葬〜最大200名規模の一般葬まで" },
    { label: "控室", value: "あり" },
    { label: "宿泊", value: "要相談" },
    { label: "バリアフリー", value: "対応" },
    { label: "駐車場", value: "70台(敷地内・無料)" },
    { label: "対応形式", value: "家族葬・一日葬・直葬・花入れお別れ・市民葬・一般葬" },
    { label: "近隣火葬場", value: "川口市めぐりの森まで車で約5分" },
  ],
  supportedPlans: [
    "direct-funeral",
    "hanaire-owakare",
    "oneday-funeral",
    "family-funeral",
    "kawaguchi-shimin",
  ],
  access: {
    stations: [
      "埼玉高速鉄道「新井宿」駅　徒歩約10分",
    ],
    car: "首都高速川口線「新井宿出入口」より約5分。敷地内に駐車場70台ございますので、参列の方もお車でお越しいただけます。",
    parking: "70台(敷地内・無料)。一般葬・大規模葬でも近隣にご迷惑をおかけしません。",
    nearby: "川口市めぐりの森(車で約5分)。戸田葬祭場、谷塚斎場へもアクセス可能。",
  },
  faqs: [
    {
      q: "見学はできますか？",
      a: "はい、ご見学いただけます。お電話または事前相談フォームよりお申し込みください。担当スタッフが式場・控室・駐車場までご案内します。事前相談・お見積りは無料です。",
    },
    {
      q: "駐車場は何台分ありますか？",
      a: "敷地内に70台分の駐車スペースをご用意しています。一般葬・大規模葬の際もお車でお越しいただけ、近隣にご迷惑をおかけしません。利用は無料です。",
    },
    {
      q: "どのくらいの規模まで対応できますか？",
      a: "家族葬の少人数から、最大200名規模の一般葬まで対応可能です。式場の使い方やお料理・返礼品の手配を、ご希望の規模に合わせて整えます。",
    },
    {
      q: "川口市めぐりの森との距離はどのくらいですか？",
      a: "川口メモリアルホールから車で約5分の距離です。当ホールで通夜・告別式を行い、翌日めぐりの森で火葬、という流れもスムーズにご案内できます。",
    },
    {
      q: "宿泊はできますか？",
      a: "控室でのご休息は可能です。ご宿泊の可否は日程やご希望により異なるため、ご相談時に詳細をご案内します。",
    },
    {
      q: "バリアフリーですか？",
      a: "ご高齢の方や車椅子の方も安心してご利用いただけるよう、館内のバリアフリーに配慮しています。エントランスから式場まで段差を抑えた動線です。",
    },
    {
      q: "他の宗派にも対応していますか？",
      a: "仏式・神式・キリスト教式・無宗教葬など、ご希望の形式に合わせて対応します。お付き合いのある宗教者がない場合のご紹介も承ります。",
    },
  ],
  mapEmbedQuery: "川口メモリアルホール 埼玉県川口市西新井宿440-1",
  metaDescription:
    "川口メモリアルホールは、川口市めぐりの森まで車で5分・駐車場70台完備の自社葬儀ホール。家族葬から200名規模の一般葬まで対応。創業20年・年間約260件の施行実績。見学・事前相談は24時間受付。",
};

export const halls: Hall[] = [hallKawaguchi];

export function getHall(slug: string): Hall | undefined {
  return halls.find((h) => h.slug === slug);
}
