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
};

export const saijoMegurinomori: Saijo = {
  slug: "megurinomori",
  name: "川口市めぐりの森",
  shortName: "めぐりの森",
  type: "川口市営の火葬場・斎場",
  operator: "川口市",
  address: "埼玉県川口市内(詳細住所は要確認)",
  intro: "川口市が運営する火葬場・斎場。川口典礼の自社ホールから車で約5分の近さでお手伝いします。",
  description:
    "川口市めぐりの森は、川口市が運営する公営の火葬場・斎場です。火葬と式を1つの施設で執り行えるため、ご家族やご親族の移動の負担を抑えられます。川口典礼の自社ホール(川口メモリアルホール)からめぐりの森までは車で約5分。当ホールで通夜・告別式を行い、翌日めぐりの森で火葬という流れもスムーズにご案内できます。火葬式・一日葬・家族葬・一般葬のご相談から手配、当日のお手伝いまで承っています。",
  features: [
    "川口市が運営する公営施設",
    "火葬と式を1つの施設で完結できる",
    "川口市民は利用料の優遇あり(要確認)",
    "落ち着いた環境で、ご家族中心のお見送りに適した雰囲気",
    "川口典礼の自社ホールから車で約5分の好立地",
    "駐車場あり",
  ],
  ourSupport: [
    "お電話一本で、めぐりの森でのご葬儀をご手配します",
    "火葬・式場の予約からお見送りまで一貫してお手伝い",
    "川口市民・市外の方どちらにも対応",
    "川口メモリアルホール(駐車場70台)での安置・打合せとの組み合わせも可能",
    "通夜は当ホール、翌日の火葬・告別式はめぐりの森という流れもスムーズに",
    "宗教者の手配も承ります",
  ],
  availablePlans: [
    "cremation",
    "direct-funeral",
    "oneday-funeral",
    "family-funeral",
  ],
  facilityInfo: [
    { label: "所在地", value: "川口市内(詳細は要確認)" },
    { label: "運営", value: "川口市" },
    { label: "施設種別", value: "火葬場・斎場" },
    { label: "式場規模", value: "複数規模あり(要確認)" },
    { label: "駐車場", value: "あり(台数は要確認)" },
    { label: "対応形式", value: "火葬式・直葬・一日葬・家族葬" },
    { label: "川口典礼から", value: "車で約5分" },
  ],
  access: {
    fromKawaguchi: "川口典礼(川口メモリアルホール・川口市西新井宿)から車で約5分",
    stations: ["最寄駅○○(要確認)"],
    car: "外環道○○出入口より約○分(要確認)。首都高速川口線○○より約○分(要確認)。",
    parking: "あり(台数は要確認)。お車でのお越しも可能です。",
  },
  faqs: [
    {
      q: "川口市民でなくても利用できますか？",
      a: "ご利用いただけます。ただし、川口市民の方と市外の方で利用料金が異なる場合があります(要確認)。詳しい料金は事前のご相談時にご案内します。",
    },
    {
      q: "火葬式と一日葬、どちらが適していますか？",
      a: "ご家族の人数や式の規模、宗教者のお勤めをご希望されるかどうかにより異なります。費用や流れも含めて、ご家族のご希望をお伺いしながらご提案します。",
    },
    {
      q: "利用料金はいくらですか？",
      a: "公営施設の利用料金は、ご家族の住民票の状況や利用される式場・火葬炉の規模により異なります。葬儀プラン全体の総額については、概算見積りでご確認いただけます。",
    },
    {
      q: "予約はどのくらい前から必要ですか？",
      a: "公営施設のため、日程や式場の空き状況により予約可能日が変わります。急なご葬儀の場合もまずはお電話ください。空き状況を確認のうえご案内します。",
    },
    {
      q: "宗教者の手配もしてもらえますか？",
      a: "はい、ご希望の宗派に合わせて宗教者のご紹介も承ります。お付き合いのあるお寺がない場合もご相談ください。",
    },
    {
      q: "川口典礼のホールと組み合わせることはできますか？",
      a: "可能です。川口メモリアルホールはめぐりの森から車で約5分の好立地です。当ホールでのご安置・打合せ・通夜を行い、翌日にめぐりの森で告別式・火葬を執り行う、といった組み合わせもご案内できます。駐車場は当ホールに70台ございますので、参列の方もお車でお越しいただけます。",
    },
  ],
  mapEmbedQuery: "川口市めぐりの森",
  metaDescription:
    "川口市めぐりの森での葬儀(火葬式・一日葬・家族葬)を川口典礼がお手伝いします。市民・市外どちらにも対応、24時間365日相談受付。川口典礼のホールとの組み合わせも可能。",
};

export const saijoList: Saijo[] = [saijoMegurinomori];

export function getSaijo(slug: string): Saijo | undefined {
  return saijoList.find((s) => s.slug === slug);
}
