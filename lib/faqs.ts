export type FaqCategory = {
  slug: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  categorySlug: string;
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  {
    slug: "urgent",
    title: "急なご葬儀・お迎え",
    description: "ご逝去直後のご対応、搬送・お迎えに関するご質問です。",
  },
  {
    slug: "cost",
    title: "費用・お見積もり",
    description: "プランの費用、追加で発生する項目、お支払いに関するご質問です。",
  },
  {
    slug: "format",
    title: "葬儀形式・プラン",
    description: "家族葬・一日葬・火葬式・直葬・市民葬の違いとプラン選びについて。",
  },
  {
    slug: "hall",
    title: "斎場・施設",
    description: "川口メモリアルホール、川口市めぐりの森ほかの斎場・施設について。",
  },
  {
    slug: "preconsult",
    title: "事前相談・ご準備",
    description: "事前相談、ホール見学、生前準備のご相談について。",
  },
  {
    slug: "area",
    title: "対応エリア・宗派",
    description: "対応エリア、ご宗派、宗教者の手配について。",
  },
  {
    slug: "after",
    title: "葬儀後のサポート",
    description: "葬儀後の手続き、法要、ご相談について。",
  },
];

export const faqs: FaqItem[] = [
  // 急なご葬儀・お迎え
  {
    id: "urgent-24h",
    categorySlug: "urgent",
    question: "24時間対応していますか？",
    answer:
      "はい、24時間365日お電話を受け付けています。深夜・早朝でも担当者が落ち着いてご案内します。0120-963-765までお電話ください。",
  },
  {
    id: "urgent-transport",
    categorySlug: "urgent",
    question: "すぐに搬送してもらえますか？",
    answer:
      "お電話を受け次第、すぐに搬送の手配を進めます。病院・施設・ご自宅など、現在いらっしゃる場所をお伝えください。搬送先のご相談も承ります。",
  },
  {
    id: "urgent-what-to-do",
    categorySlug: "urgent",
    question: "まず何をすればよいですか？",
    answer:
      "落ち着いて川口典礼までお電話ください。ご逝去の場所、故人様のお名前、ご連絡可能なご家族の方のお電話番号をお伺いします。その後の手続きは、担当者が一つひとつご案内します。",
  },
  {
    id: "urgent-pickup-area",
    categorySlug: "urgent",
    question: "どこまでお迎えに来てもらえますか？",
    answer:
      "川口市・新井宿・鳩ヶ谷を中心に、戸田市・蕨市・草加市など近隣エリアに対応しています。それ以外のエリアもご相談に応じますので、まずはお電話ください。",
  },
  {
    id: "urgent-no-decision",
    categorySlug: "urgent",
    question: "葬儀社が決まっていなくても搬送だけお願いできますか？",
    answer:
      "ご搬送のみのご依頼も承ります。ご搬送後にご葬儀の形式や費用をゆっくりご相談いただけます。無理にお勧めすることはありません。",
  },

  // 費用・お見積もり
  {
    id: "cost-family-funeral",
    categorySlug: "cost",
    question: "家族葬の費用はいくらですか？",
    answer:
      "ご参列人数、式場、お料理・返礼品、宗教者の有無などにより総額は変わります。サイト内の料金プラン、または概算見積りで目安をご確認いただけます。詳しくは事前のご相談で個別にご案内します。",
  },
  {
    id: "cost-cremation",
    categorySlug: "cost",
    question: "火葬式の費用はいくらですか？",
    answer:
      "火葬式は宗教儀礼を行わずシンプルにお見送りする形式のため、家族葬に比べて費用を抑えられます。火葬料金や安置日数などにより総額は変動します。具体的な金額は概算見積りでご確認いただけます。",
  },
  {
    id: "additional-fees",
    categorySlug: "cost",
    question: "追加費用はかかりますか？",
    answer:
      "ご安置日数、火葬場、式場使用料、お料理、返礼品、宗教者へのお礼、搬送距離などにより別途費用が発生する場合があります。事前にわかる範囲でご案内します。",
  },
  {
    id: "cost-payment",
    categorySlug: "cost",
    question: "お支払い方法は何がありますか？",
    answer:
      "現金、銀行振込、クレジットカードなど複数の方法に対応しています。ご家族のご事情にあわせて柔軟に対応しますので、お打合せ時にご相談ください。",
  },
  {
    id: "cost-kawaguchi-shimin",
    categorySlug: "cost",
    question: "川口市民葬の制度は何ですか？",
    answer:
      "川口市が定める葬儀の制度に基づき、市民の方が一定の条件で利用できる葬儀プランです。利用条件や費用については、ご家族の状況・ご希望に合わせて事前にご確認のうえご案内します。",
  },
  {
    id: "cost-estimate-accuracy",
    categorySlug: "cost",
    question: "概算見積りはどのくらい正確ですか？",
    answer:
      "ご入力内容に基づく目安の金額です。実際の総額は、ご安置日数、火葬場、式場、お料理、返礼品、宗教者、搬送距離などにより変動します。正式なお見積りはご担当者より個別にご案内します。",
  },

  // 葬儀形式・プラン
  {
    id: "format-how-to-choose",
    categorySlug: "format",
    question: "葬儀形式の選び方を教えてください。",
    answer:
      "ご参列人数、式の規模、宗教者のお勤め、ご予算などのご希望をうかがって、ご家族に合うかたちを一緒に整えていきます。事前相談ではこうした選び方のお話を中心にご案内しています。",
  },
  {
    id: "format-oneday-vs-family",
    categorySlug: "format",
    question: "家族葬と一日葬の違いは何ですか？",
    answer:
      "家族葬は通夜・告別式を2日で執り行います。一日葬は通夜を行わず、告別式と火葬を1日で執り行う形式です。ご親族の負担や費用面で違いがあるため、ご家族のご希望に合わせてお選びいただけます。",
  },
  {
    id: "format-cremation-vs-direct",
    categorySlug: "format",
    question: "火葬式と直葬の違いは何ですか？",
    answer:
      "火葬式は火葬を中心としたシンプルな葬儀で、白木位牌や祭壇など必要なものはご用意します。直葬はさらに簡素化し、儀式に関わるものを最小限にした形式です。費用や内容を相談しながらお決めいただけます。",
  },
  {
    id: "cremation-only",
    categorySlug: "format",
    question: "火葬式だけでもお願いできますか？",
    answer:
      "通夜や告別式を行わない火葬式・直葬にも対応しています。ご家族の事情に合わせて、必要な手配のみシンプルに整えます。",
  },
  {
    id: "format-religious",
    categorySlug: "format",
    question: "無宗教の葬儀もできますか？",
    answer:
      "はい、無宗教葬にも対応しています。宗教儀礼を行わない形式でも、お花や音楽を取り入れたお別れの時間など、ご家族のご希望に合わせてご提案します。",
  },

  // 斎場・施設
  {
    id: "hall-visit",
    categorySlug: "hall",
    question: "川口メモリアルホールの見学はできますか？",
    answer:
      "はい、ご見学いただけます。お電話または事前相談フォームよりお申し込みください。担当スタッフがご案内します。事前相談・お見積りも無料です。",
  },
  {
    id: "megurinomori-funeral",
    categorySlug: "hall",
    question: "川口市めぐりの森で葬儀はできますか？",
    answer:
      "川口典礼は、川口市めぐりの森を利用したご葬儀にも対応しています。火葬式・一日葬・家族葬など、ご希望の形式に合わせてご案内します。",
  },
  {
    id: "hall-other-saijo",
    categorySlug: "hall",
    question: "他の斎場でもお願いできますか？",
    answer:
      "川口市めぐりの森、戸田葬祭場、谷塚斎場など、複数の斎場に対応しています。ご希望の斎場や、近隣施設のご相談にも応じます。",
  },
  {
    id: "hall-parking",
    categorySlug: "hall",
    question: "駐車場はありますか？",
    answer:
      "川口メモリアルホールには駐車スペースをご用意しています。参列人数が多い場合は近隣の駐車場のご案内も可能です。ご相談時にお伝えください。",
  },
  {
    id: "hall-barrier-free",
    categorySlug: "hall",
    question: "バリアフリーですか？",
    answer:
      "ご高齢の方や車椅子の方も安心してご利用いただけるよう、館内のバリアフリーに配慮しています。",
  },

  // 事前相談・ご準備
  {
    id: "preconsult-only",
    categorySlug: "preconsult",
    question: "事前相談だけでも大丈夫ですか？",
    answer:
      "もちろん大丈夫です。ご相談・お見積り・ホール見学は無料で承っています。費用や流れだけ知っておきたい、というご相談も歓迎しています。",
  },
  {
    id: "preconsult-flow",
    categorySlug: "preconsult",
    question: "事前相談の流れを教えてください。",
    answer:
      "お電話または事前相談フォームでご予約いただきます。ご来館またはお電話でご希望をお伺いし、プランや費用、流れについてご案内します。ご希望があればホール見学もご案内します。",
  },
  {
    id: "preconsult-elderly",
    categorySlug: "preconsult",
    question: "ご高齢の家族のことで相談したいのですが、可能ですか？",
    answer:
      "ご家族の余命や高齢化をきっかけに、事前に相談いただくケースは多くいただいています。ご家族の状況をうかがいながら、無理のないかたちで一緒に整理していきます。",
  },

  // 対応エリア・宗派
  {
    id: "area-coverage",
    categorySlug: "area",
    question: "対応エリアはどこまでですか？",
    answer:
      "川口市・新井宿・鳩ヶ谷を中心に、戸田市・蕨市・草加市などの近隣エリアに対応しています。それ以外のエリアもご相談ください。",
  },
  {
    id: "area-outside-kawaguchi",
    categorySlug: "area",
    question: "川口市民でなくても利用できますか？",
    answer:
      "はい、ご利用いただけます。市外のお客様も歓迎しています。川口市民葬の制度は適用条件が異なる場合がありますので、事前にご相談ください。",
  },
  {
    id: "area-religion",
    categorySlug: "area",
    question: "宗教者は紹介してもらえますか？",
    answer:
      "ご希望の宗派に合わせて、宗教者のご紹介も承ります。お付き合いのあるお寺がない場合もご相談ください。仏式・神式・キリスト教式など幅広く対応しています。",
  },

  // 葬儀後のサポート
  {
    id: "after-houyou",
    categorySlug: "after",
    question: "四十九日や法要の相談もできますか？",
    answer:
      "ご葬儀後の四十九日、一周忌などの法要のご相談も承ります。会場手配、宗教者の手配を含めてサポートします。",
  },
  {
    id: "after-procedure",
    categorySlug: "after",
    question: "役所手続きのサポートはありますか？",
    answer:
      "死亡届をはじめ、葬儀に必要な役所手続きの代行を承ります。その後の年金・保険・相続など、お客様のご状況に応じて専門家のご紹介もできます。",
  },
];

export const HOME_FEATURED_FAQ_IDS = [
  "urgent-transport",
  "megurinomori-funeral",
  "cost-family-funeral",
  "cremation-only",
  "additional-fees",
  "preconsult-only",
];

export function getHomeFaqs(): FaqItem[] {
  return HOME_FEATURED_FAQ_IDS.map((id) =>
    faqs.find((f) => f.id === id)
  ).filter((f): f is FaqItem => Boolean(f));
}

export function getFaqsByCategory(categorySlug: string): FaqItem[] {
  return faqs.filter((f) => f.categorySlug === categorySlug);
}

export function getCategoryByFaq(faqId: string): FaqCategory | undefined {
  const faq = faqs.find((f) => f.id === faqId);
  if (!faq) return undefined;
  return faqCategories.find((c) => c.slug === faq.categorySlug);
}
