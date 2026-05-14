export type CaseRecord = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO date: YYYY-MM-DD
  format: string;
  planSlug: string;
  area: string;
  hall: string;
  hallSlug?: string;
  saijoSlug?: string;
  cremation: string;
  people: string;
  total: string;
  religion: string;
  galleryCount: number;
  requirements: string;
  implementation: string;
  staffComment?: string;
  includedItems: string[];
  extraItems: string[];
  relatedPlanSlugs: string[];
  relatedAreaSlugs: string[];
  metaDescription: string;
};

export const cases: CaseRecord[] = [
  {
    slug: "20-oneday-memorial-hall",
    title: "川口メモリアルホールで行った、20名の一日葬",
    summary:
      "ご家族と親しい方を中心に、通夜を行わず一日でお別れの時間をお取りしました。",
    publishedAt: "2026-04-15",
    format: "一日葬",
    planSlug: "oneday-funeral",
    area: "川口市・新井宿",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "20名",
    total: "税込○○万円",
    religion: "仏式",
    galleryCount: 5,
    requirements:
      "高齢のご親族が多く、通夜・告別式の二日間は身体的負担が大きいというご相談でした。ご家族中心で、落ち着いて見送る時間を確保したい、というご希望でした。",
    implementation:
      "通夜を行わず告別式と火葬を一日で執り行う一日葬をご案内しました。川口メモリアルホールにご安置のうえ、当日朝にご家族で対面の時間をお取りし、告別式・火葬・収骨までご案内しました。式場ではご親族の写真を映写し、お別れの時間をゆっくりお過ごしいただきました。",
    staffComment:
      "ご親族の体力面のご不安を伺っていたため、移動と待ち時間を最小限に組み立てました。式場と火葬場が近いめぐりの森を選んだことで、ご家族の負担を抑えることができたとお声をいただきました。",
    includedItems: [
      "ご搬送(病院→ご安置)",
      "ご安置(1日)",
      "棺・骨壺・白木位牌",
      "告別式のお手伝い",
      "霊柩車",
      "諸手続きの代行",
    ],
    extraItems: [
      "火葬料金",
      "宗教者へのお礼",
      "お料理(精進落とし)",
      "返礼品",
    ],
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    relatedAreaSlugs: ["kawaguchi", "nishiaraiyado"],
    metaDescription:
      "川口メモリアルホールで20名の一日葬を執り行った事例。仏式・税込○○万円。川口典礼の一日葬は通夜を行わず告別式と火葬を一日で。費用と内容をご紹介します。",
  },
  {
    slug: "5-cremation-megurinomori",
    title: "川口市めぐりの森を利用した、5名の火葬式",
    summary:
      "ご家族のみで静かに、火葬を中心にお見送りしました。",
    publishedAt: "2026-03-22",
    format: "火葬式",
    planSlug: "cremation",
    area: "川口市",
    hall: "川口市めぐりの森",
    saijoSlug: "megurinomori",
    cremation: "川口市めぐりの森",
    people: "5名",
    total: "税込○○万円",
    religion: "無宗教",
    galleryCount: 3,
    requirements:
      "ご親族が遠方のため少人数で見送りたい、宗教儀礼は希望しない、というご相談でした。費用面のご不安もあり、できるだけシンプルに整えたい、とのことでした。",
    implementation:
      "宗教儀礼を行わない火葬式をご提案しました。ご逝去当日に病院からご安置までご搬送し、翌日に川口市めぐりの森で火葬とお別れの時間をご案内しました。火葬炉前ではご家族でお花を手向け、お見送りいただきました。",
    staffComment:
      "ご家族が落ち着いてお過ごしいただける時間を最優先に組み立てました。事前のお打合せで費用の内訳を細かくご確認いただき、追加でかかる項目もご相談のうえ進めました。",
    includedItems: [
      "ご搬送",
      "ご安置(1日)",
      "棺・骨壺",
      "仏衣一式",
      "霊柩車",
      "諸手続きの代行",
    ],
    extraItems: [
      "火葬料金(公営)",
      "お花(お別れ用)",
    ],
    relatedPlanSlugs: ["cremation", "direct-funeral"],
    relatedAreaSlugs: ["kawaguchi"],
    metaDescription:
      "川口市めぐりの森を利用した5名の火葬式の事例。無宗教・税込○○万円。川口典礼ならめぐりの森での葬儀手配を一貫してお手伝いします。",
  },
  {
    slug: "30-family-funeral-memorial-hall",
    title: "川口メモリアルホールで行った、30名の家族葬",
    summary:
      "ご家族・ご親族・親しい方を含めて、通夜と告別式の二日間で丁寧にお見送りしました。",
    publishedAt: "2026-02-18",
    format: "家族葬",
    planSlug: "family-funeral",
    area: "川口市・西新井宿",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    cremation: "川口市めぐりの森",
    people: "30名",
    total: "税込○○万円",
    religion: "仏式",
    galleryCount: 6,
    requirements:
      "ご家族と親しい方を含めた30名規模で、丁寧にお別れの時間を取りたい、というご相談でした。お料理や返礼品も含めて、参列の方へきちんとおもてなしをしたい、とのことでした。",
    implementation:
      "通夜・告別式の二日構成の家族葬をご案内しました。川口メモリアルホールで通夜を執り行い、ご家族・ご親族の対面の時間を充分にお取りしました。翌日の告別式は宗教者のお勤め後、川口市めぐりの森で火葬・収骨までお手伝いしました。",
    staffComment:
      "参列いただく方の年齢層が幅広く、座席や動線、控室の使い方をきめ細かく調整しました。お料理と返礼品もご家族のご希望を伺ってご手配しています。",
    includedItems: [
      "ご搬送",
      "ご安置(2日)",
      "棺・骨壺・白木位牌",
      "祭壇の基本設え",
      "通夜・告別式のお手伝い",
      "霊柩車",
      "諸手続きの代行",
    ],
    extraItems: [
      "火葬料金",
      "宗教者へのお礼",
      "お料理(通夜振る舞い・精進落とし)",
      "返礼品(30名分)",
      "祭壇生花のグレードアップ",
    ],
    relatedPlanSlugs: ["family-funeral", "oneday-funeral"],
    relatedAreaSlugs: ["kawaguchi", "nishiaraiyado"],
    metaDescription:
      "川口メモリアルホールで30名の家族葬を執り行った事例。仏式・税込○○万円。通夜・告別式の二日構成。川口典礼の家族葬の費用と流れをご紹介。",
  },
  {
    slug: "8-direct-funeral-home-placement",
    title: "ご自宅安置から、8名の直葬",
    summary:
      "ご自宅でゆっくりお別れの時間をお取りしたあと、火葬を中心にシンプルにお見送りしました。",
    publishedAt: "2026-01-30",
    format: "直葬",
    planSlug: "direct-funeral",
    area: "川口市・新井宿",
    hall: "川口市めぐりの森",
    saijoSlug: "megurinomori",
    cremation: "川口市めぐりの森",
    people: "8名",
    total: "税込○○万円",
    religion: "無宗教",
    galleryCount: 3,
    requirements:
      "ご自宅で過ごしていた故人様を、最後までご自宅で見守りたい、というご家族のご希望でした。費用も抑え、儀式は行わずシンプルに執り行いたい、というご相談でした。",
    implementation:
      "ご自宅にご安置のうえ、ご家族で過ごす時間をお取りしました。火葬当日にご自宅から川口市めぐりの森へお移りいただき、火葬・収骨までお手伝いしました。",
    staffComment:
      "ご家族のご希望に沿って、ご自宅でのお別れの時間を最優先にしました。役所手続きや搬送日程など、細かい段取りをすべてこちらで整え、ご家族がご自宅でゆっくり過ごせるよう配慮しました。",
    includedItems: [
      "ご搬送(病院→ご自宅、ご自宅→火葬場)",
      "ご自宅安置のサポート(ドライアイス)",
      "棺・骨壺",
      "仏衣一式",
      "霊柩車",
      "諸手続きの代行",
    ],
    extraItems: [
      "火葬料金(公営)",
    ],
    relatedPlanSlugs: ["direct-funeral", "cremation"],
    relatedAreaSlugs: ["kawaguchi", "nishiaraiyado"],
    metaDescription:
      "ご自宅安置から始まる8名の直葬の事例。無宗教・税込○○万円。川口典礼ならご自宅でのお別れの時間にも丁寧に対応します。",
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
