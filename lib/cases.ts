export type CaseRecord = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO date: YYYY-MM-DD
  format: string;
  planSlug?: string;
  area: string;
  hall: string;
  hallSlug?: string;
  saijoSlug?: string;
  cremation: string;
  people: string;
  total: string;
  religion: string;
  photo?: { src: string; alt: string };
  requirements: string;
  implementation: string;
  staffComment?: string;
  includedItems: string[];
  extraItems: string[];
  relatedPlanSlugs: string[];
  relatedAreaSlugs: string[];
  metaDescription: string;
};

// 葬儀形式ごとの共通リスト(後日、ケース固有の詳細に差し替え可能)
const ONEDAY_INCLUDED = [
  "ご搬送",
  "ご安置",
  "棺・骨壺・白木位牌",
  "告別式のお手伝い",
  "仏衣一式",
  "霊柩車",
  "諸手続きの代行",
];

const ONEDAY_EXTRA = [
  "火葬料金",
  "宗教者へのお礼",
  "お料理",
  "返礼品",
];

const FAMILY_INCLUDED = [
  "ご搬送",
  "ご安置(2日)",
  "棺・骨壺・白木位牌",
  "祭壇の基本設え",
  "通夜・告別式のお手伝い",
  "仏衣一式",
  "霊柩車",
  "諸手続きの代行",
];

const FAMILY_EXTRA = [
  "火葬料金",
  "宗教者へのお礼",
  "お料理(通夜振る舞い・精進落とし)",
  "返礼品",
  "祭壇生花のグレードアップ",
];

const COMPANY_INCLUDED = [
  "ご搬送・ご安置のサポート",
  "祭壇・式場設営",
  "司会・進行スタッフ",
  "受付・案内係",
  "霊柩車・送迎車手配",
];

const COMPANY_EXTRA = [
  "火葬料金",
  "宗教者へのお礼",
  "会葬お礼品",
  "供花・供物",
  "お料理(個別ご相談)",
];

export const cases: CaseRecord[] = [
  {
    slug: "kawaguchi-church-catholic-20-oneday-800k",
    title: "川口教会で行った、20名のカトリック式 一日葬",
    summary:
      "カトリック式のお別れを、川口教会でご家族中心に一日でお見送りしました。",
    publishedAt: "2026-05-15",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "川口教会",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "800,000円(税込)",
    religion: "カトリック",
    photo: {
      src: "/images/cases/kawaguchi-church-catholic-20-oneday-800k.jpg",
      alt: "川口教会で執り行ったカトリック式 一日葬の祭壇写真",
    },
    requirements:
      "カトリック式のお別れを、無理のない一日葬の形で整えたい、というご相談でした。ご親族・お知り合いを中心に20名規模での執り行いをご希望でした。",
    implementation:
      "通夜を行わず告別式と火葬を一日で執り行う形式で、川口教会でのカトリック式 葬儀ミサのうえ、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口教会で行った20名のカトリック式 一日葬の事例。費用 800,000円(税込)。川口典礼ではキリスト教式のご葬儀にも対応します。",
  },
  {
    slug: "kawaguchi-memorial-buddhist-20-oneday-1100k",
    title: "川口メモリアルホールで行った、20名の仏式 一日葬",
    summary:
      "ご家族・ご親族を中心に、通夜を行わず一日でお別れの時間をお取りしました。",
    publishedAt: "2026-05-10",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "1,100,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/kawaguchi-memorial-buddhist-20-oneday-1100k.jpg",
      alt: "川口メモリアルホールで執り行った仏式 一日葬の祭壇写真",
    },
    requirements:
      "ご親族の負担を抑えつつ、きちんと一日でお別れの時間を取りたい、というご相談でした。",
    implementation:
      "通夜を行わず告別式と火葬を一日で執り行う一日葬をご案内しました。川口メモリアルホールで告別式を行い、その後、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口メモリアルホールで行った20名の仏式 一日葬の事例。費用 1,100,000円(税込)。川口典礼の一日葬の内容と費用感をご紹介します。",
  },
  {
    slug: "kawaguchi-memorial-buddhist-20-oneday-1500k",
    title: "川口メモリアルホールで行った、20名の仏式 一日葬(祭壇拡充)",
    summary:
      "祭壇生花を拡充し、ご家族・ご親族中心に一日で丁寧にお別れしました。",
    publishedAt: "2026-05-05",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "1,500,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/kawaguchi-memorial-buddhist-20-oneday-1500k.jpg",
      alt: "川口メモリアルホールで執り行った仏式 一日葬(祭壇拡充)の祭壇写真",
    },
    requirements:
      "一日葬としてシンプルに、ただ祭壇のお花を充実させて丁寧にお見送りしたい、というご相談でした。",
    implementation:
      "一日葬の構成を維持しながら、祭壇生花をグレードアップしてご案内しました。川口メモリアルホールで告別式を行い、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口メモリアルホールで行った20名の仏式 一日葬の事例(祭壇拡充)。費用 1,500,000円(税込)。川口典礼の一日葬の祭壇仕様をご紹介します。",
  },
  {
    slug: "sangakuin-gokurakuden-buddhist-800-company-contact",
    title: "三学院 極楽殿で行った、800名規模の社葬",
    summary:
      "会社関係者の方々を含めた規模あるお別れの会を、三学院 極楽殿で執り行いました。",
    publishedAt: "2026-05-01",
    format: "社葬",
    // planSlug は社葬のため該当する既存プランなし → 省略
    area: "川口市",
    hall: "三学院 極楽殿",
    cremation: "川口市めぐりの森",
    people: "800名",
    total: "お問い合わせください",
    religion: "仏式",
    photo: {
      src: "/images/cases/sangakuin-gokurakuden-buddhist-800-company-contact.jpg",
      alt: "三学院 極楽殿で執り行った社葬の祭壇写真",
    },
    requirements:
      "会社関係者を含めた規模あるお別れの会を整えたい、というご相談でした。受付・案内・進行を含めて段取りのご支援が必要とのことでした。",
    implementation:
      "800名規模の社葬として、三学院 極楽殿で会場準備から進行まで一貫してお手伝いしました。受付・案内係の手配、祭壇設営、司会進行までを含めて対応しました。",
    includedItems: COMPANY_INCLUDED,
    extraItems: COMPANY_EXTRA,
    relatedPlanSlugs: [],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "三学院 極楽殿で行った800名規模の社葬の事例。費用はお問い合わせください。川口典礼では社葬・大規模葬のお手伝いも承ります。",
  },
  {
    slug: "machiya-saijo-buddhist-20-family-1200k",
    title: "町屋斎場で行った、20名の家族葬",
    summary:
      "町屋斎場で、ご家族・ご親族を中心に通夜と告別式の二日間で丁寧にお見送りしました。",
    publishedAt: "2026-04-25",
    format: "家族葬",
    planSlug: "family-funeral",
    area: "東京都荒川区",
    hall: "町屋斎場",
    cremation: "町屋斎場",
    people: "20名",
    total: "1,200,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/machiya-saijo-buddhist-20-family-1200k.jpg",
      alt: "町屋斎場で執り行った家族葬の祭壇写真",
    },
    requirements:
      "ご家族中心の落ち着いた家族葬を、町屋斎場で執り行いたい、というご相談でした。",
    implementation:
      "通夜・告別式の二日構成の家族葬をご案内しました。町屋斎場で執り行い、火葬・収骨までお手伝いしました。",
    includedItems: FAMILY_INCLUDED,
    extraItems: FAMILY_EXTRA,
    relatedPlanSlugs: ["family-funeral", "oneday-funeral"],
    relatedAreaSlugs: [],
    metaDescription:
      "町屋斎場で行った20名の家族葬の事例。仏式・費用 1,200,000円(税込)。川口典礼は東京都内の斎場でのご葬儀にも対応します。",
  },
  {
    slug: "yatsuka-saijo-buddhist-20-family-1200k",
    title: "谷塚斎場で行った、20名の家族葬",
    summary:
      "谷塚斎場で、ご家族・ご親族を中心に通夜と告別式の二日間で丁寧にお見送りしました。",
    publishedAt: "2026-04-20",
    format: "家族葬",
    planSlug: "family-funeral",
    area: "草加市",
    hall: "谷塚斎場",
    cremation: "谷塚斎場",
    people: "20名",
    total: "1,200,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/yatsuka-saijo-buddhist-20-family-1200k.jpg",
      alt: "谷塚斎場で執り行った家族葬の祭壇写真",
    },
    requirements:
      "ご家族中心の落ち着いた家族葬を、谷塚斎場で執り行いたい、というご相談でした。",
    implementation:
      "通夜・告別式の二日構成の家族葬をご案内しました。谷塚斎場で執り行い、火葬・収骨までお手伝いしました。",
    includedItems: FAMILY_INCLUDED,
    extraItems: FAMILY_EXTRA,
    relatedPlanSlugs: ["family-funeral", "oneday-funeral"],
    relatedAreaSlugs: [],
    metaDescription:
      "谷塚斎場で行った20名の家族葬の事例。仏式・費用 1,200,000円(税込)。川口典礼は谷塚斎場・草加市でのご葬儀にも対応します。",
  },
  {
    slug: "kawaguchi-memorial-friend-10-oneday-570k",
    title: "川口メモリアルホールで行った、10名の友人葬 一日葬",
    summary:
      "友人葬の形式で、ご家族と親しい方を中心に一日でお別れしました。",
    publishedAt: "2026-04-15",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "10名",
    total: "570,000円(税込)",
    religion: "友人葬",
    photo: {
      src: "/images/cases/kawaguchi-memorial-friend-10-oneday-570k.jpg",
      alt: "川口メモリアルホールで執り行った友人葬 一日葬の祭壇写真",
    },
    requirements:
      "友人葬の形式でのお別れを、ご家族と親しい方で行いたい、というご相談でした。",
    implementation:
      "友人葬の形式で一日葬としてご案内しました。川口メモリアルホールでお別れの時間を設け、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口メモリアルホールで行った10名の友人葬 一日葬の事例。費用 570,000円(税込)。川口典礼は友人葬の形式にも対応します。",
  },
  {
    slug: "home-buddhist-10-oneday-1600k",
    title: "ご自宅で行った、10名の仏式 一日葬",
    summary:
      "ご自宅で過ごされた故人様を、ご自宅でのお別れの時間を中心に丁寧にお見送りしました。",
    publishedAt: "2026-04-10",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "ご自宅",
    cremation: "川口市めぐりの森",
    people: "10名",
    total: "1,600,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/home-buddhist-10-oneday-1600k.jpg",
      alt: "ご自宅で執り行った仏式 一日葬の祭壇写真",
    },
    requirements:
      "ご自宅で過ごした故人様を、最後までご自宅近くで丁寧にお見送りしたい、というご家族のご希望でした。",
    implementation:
      "ご自宅でのお別れの時間を中心とした一日葬をご案内しました。ご自宅でのお見送り後、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "ご自宅でのお別れを中心に行った10名の仏式 一日葬の事例。費用 1,600,000円(税込)。川口典礼はご自宅でのお別れの時間にも丁寧に対応します。",
  },
  {
    slug: "kawaguchi-memorial-buddhist-20-family-1100k",
    title: "川口メモリアルホールで行った、20名の仏式 家族葬",
    summary:
      "ご家族・ご親族・親しい方を含めて、通夜と告別式の二日間で丁寧にお見送りしました。",
    publishedAt: "2026-04-05",
    format: "家族葬",
    planSlug: "family-funeral",
    area: "川口市",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "1,100,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/kawaguchi-memorial-buddhist-20-family-1100k.jpg",
      alt: "川口メモリアルホールで執り行った仏式 家族葬の祭壇写真",
    },
    requirements:
      "ご家族中心で、通夜・告別式の二日間で丁寧にお別れしたい、というご相談でした。",
    implementation:
      "通夜・告別式の二日構成の家族葬をご案内しました。川口メモリアルホールで通夜を執り行い、翌日の告別式後、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: FAMILY_INCLUDED,
    extraItems: FAMILY_EXTRA,
    relatedPlanSlugs: ["family-funeral", "oneday-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口メモリアルホールで行った20名の仏式 家族葬の事例。費用 1,100,000円(税込)。川口典礼の家族葬の費用と流れをご紹介します。",
  },
  {
    slug: "kawaguchi-memorial-buddhist-20-oneday-580k",
    title: "川口メモリアルホールで行った、20名の仏式 一日葬(少人数規模)",
    summary:
      "ご家族・ご親族を中心に、無理のない費用で一日葬を執り行いました。",
    publishedAt: "2026-03-30",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "580,000円(税込)",
    religion: "仏式",
    photo: {
      src: "/images/cases/kawaguchi-memorial-buddhist-20-oneday-580k.jpg",
      alt: "川口メモリアルホールで執り行った仏式 一日葬(少人数規模)の祭壇写真",
    },
    requirements:
      "ご親族中心で、費用面のご負担を抑えて一日葬を行いたい、というご相談でした。",
    implementation:
      "一日葬の基本構成でご案内しました。川口メモリアルホールで告別式を行い、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    includedItems: ONEDAY_INCLUDED,
    extraItems: ONEDAY_EXTRA,
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口メモリアルホールで行った20名の仏式 一日葬の事例(少人数規模)。費用 580,000円(税込)。川口典礼の一日葬の最小構成をご紹介します。",
  },
  {
    slug: "yatsuka-buddhist-400-company-contact",
    title: "谷塚斎場で行った、400名規模の社葬",
    summary:
      "会社関係者の方々を含めた400名規模のお別れの会を、谷塚斎場で執り行いました。",
    publishedAt: "2026-03-25",
    format: "社葬",
    // planSlug は社葬のため該当する既存プランなし → 省略
    area: "草加市",
    hall: "谷塚斎場",
    cremation: "谷塚斎場",
    people: "400名",
    total: "お問い合わせください",
    religion: "仏式",
    photo: {
      src: "/images/cases/yatsuka-buddhist-400-company-contact.png",
      alt: "谷塚斎場で執り行った社葬の祭壇写真",
    },
    requirements:
      "会社関係者の方々を含めた400名規模のお別れの会を整えたい、というご相談でした。受付・案内・進行を含めて段取りのご支援が必要とのことでした。",
    implementation:
      "400名規模の社葬として、谷塚斎場で会場準備から進行まで一貫してお手伝いしました。受付・案内係の手配、祭壇設営、司会進行までを含めて対応しました。",
    includedItems: COMPANY_INCLUDED,
    extraItems: COMPANY_EXTRA,
    relatedPlanSlugs: [],
    relatedAreaSlugs: [],
    metaDescription:
      "谷塚斎場で行った400名規模の社葬の事例。費用はお問い合わせください。川口典礼では社葬・大規模葬のお手伝いも承ります。",
  },
];

export function getCase(slug: string): CaseRecord | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return cases.map((c) => c.slug);
}

export function getRecentCases(limit: number): CaseRecord[] {
  return [...cases]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
