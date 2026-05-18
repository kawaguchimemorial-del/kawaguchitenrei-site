export type Voice = {
  slug: string;
  title: string;
  family: string;
  publishedAt: string;
  quote: string;
  quoteLong: string;
  planSlug: string;
  format: string;
  hall: string;
  hallSlug?: string;
  saijoSlug?: string;
  people: string;
  total: string;
  area: string;
  staff?: string;
  hasHandwrittenSurvey: boolean;
  relatedCaseSlug?: string;
  relatedPlanSlugs: string[];
  metaDescription: string;
};

export const voices: Voice[] = [
  {
    slug: "oneday-careful-guidance",
    title: "最初の電話から、丁寧にご案内いただきました。",
    family: "川口市在住・60代女性",
    publishedAt: "2026-04-22",
    quote: "急なことで何もわからない中、最初のお電話から落ち着いてご案内いただきました。",
    quoteLong:
      "母が亡くなった日の夜にお電話したのですが、深夜にもかかわらず落ち着いて対応してくださり、それだけで気持ちが楽になりました。葬儀の流れも費用も、わかりやすく一つひとつ確認しながら進めていただけたので、安心してお任せできました。一日葬という形式も、最初は知らなかったのですが、家族の事情をくみ取って提案していただきました。",
    planSlug: "oneday-funeral",
    format: "一日葬",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    people: "20名",
    total: "税込○○万円",
    area: "川口市・新井宿",
    staff: "担当：◯◯",
    hasHandwrittenSurvey: true,
    relatedCaseSlug: "kawaguchi-memorial-buddhist-20-oneday-1100k",
    relatedPlanSlugs: ["oneday-funeral", "family-funeral"],
    metaDescription:
      "川口典礼で一日葬を執り行ったご家族の声。「最初の電話から落ち着いて対応いただき安心できた」というご感想。川口メモリアルホール・20名・一日葬の実例。",
  },
  {
    slug: "cremation-clear-pricing",
    title: "費用を事前にきちんと説明していただきました。",
    family: "川口市在住・70代男性",
    publishedAt: "2026-03-28",
    quote: "費用について事前にきちんと説明があり、追加でかかる項目もわかりやすかったです。",
    quoteLong:
      "葬儀の費用というのは何にどれくらいかかるのか、はじめは見当もつきませんでした。川口典礼さんは、含まれているもの・別途必要になるものを最初から細かく教えてくださって、納得して進めることができました。火葬式というシンプルな形式でしたが、最後まで丁寧に対応いただいて、家族みんなで静かに見送れたのがよかったです。",
    planSlug: "cremation",
    format: "火葬式",
    hall: "川口市めぐりの森",
    saijoSlug: "megurinomori",
    people: "5名",
    total: "税込○○万円",
    area: "川口市",
    staff: "担当：◯◯",
    hasHandwrittenSurvey: true,
    relatedPlanSlugs: ["cremation", "direct-funeral"],
    metaDescription:
      "川口市めぐりの森で火葬式を執り行ったご家族の声。「費用が事前にわかりやすく説明された」というご感想。5名・無宗教の実例。",
  },
  {
    slug: "family-funeral-warm",
    title: "親族のことまで気を配っていただきました。",
    family: "川口市・西新井宿在住・50代女性",
    publishedAt: "2026-02-25",
    quote: "ご親族の人数や年齢まで気を配ってくださり、当日の負担がほとんどありませんでした。",
    quoteLong:
      "両親の世代の親族が多く、当日の段取りに不安がありましたが、川口典礼さんが座席や動線、控室の使い方まで細かく整えてくださり、おかげで家族はゆっくりお別れの時間を持つことができました。お料理や返礼品も、こちらの希望を丁寧に聞いてくださって、参列いただいた方からも喜びの声がありました。打合せの段階から最後まで、本当に丁寧でした。",
    planSlug: "family-funeral",
    format: "家族葬",
    hall: "川口メモリアルホール",
    hallSlug: "kawaguchi-memorial-hall",
    people: "30名",
    total: "税込○○万円",
    area: "川口市・西新井宿",
    staff: "担当：◯◯",
    hasHandwrittenSurvey: false,
    relatedCaseSlug: "kawaguchi-memorial-buddhist-20-family-1100k",
    relatedPlanSlugs: ["family-funeral", "oneday-funeral"],
    metaDescription:
      "川口メモリアルホールで30名の家族葬を執り行ったご家族の声。「親族の年齢まで気を配って対応いただいた」というご感想。仏式・通夜と告別式の二日構成の実例。",
  },
  {
    slug: "direct-funeral-home-time",
    title: "自宅でゆっくりお別れの時間を持てました。",
    family: "川口市在住・40代男性",
    publishedAt: "2026-02-05",
    quote: "自宅でゆっくり過ごす時間を最後まで大切にしていただけました。",
    quoteLong:
      "父は自宅で最後を迎えたかったので、できれば最後まで自宅で見送りたいというのが家族の希望でした。川口典礼さんはこちらの希望をすぐにくみ取ってくださり、自宅にご安置のお手伝いから、火葬当日の段取りまでをすべて整えていただきました。儀式を行わないシンプルな形でしたが、家族だけで自宅で過ごす時間が持てたことが、何よりありがたかったです。",
    planSlug: "direct-funeral",
    format: "直葬",
    hall: "川口市めぐりの森",
    saijoSlug: "megurinomori",
    people: "8名",
    total: "税込○○万円",
    area: "川口市・新井宿",
    staff: "担当：◯◯",
    hasHandwrittenSurvey: true,
    relatedCaseSlug: "home-buddhist-10-oneday-1600k",
    relatedPlanSlugs: ["direct-funeral", "cremation"],
    metaDescription:
      "ご自宅安置からの直葬を執り行ったご家族の声。「自宅でゆっくり過ごす時間を大切にしていただけた」というご感想。8名・無宗教の実例。",
  },
];

export function getVoice(slug: string): Voice | undefined {
  return voices.find((v) => v.slug === slug);
}

export function getAllVoiceSlugs(): string[] {
  return voices.map((v) => v.slug);
}

export function getRecentVoices(limit: number): Voice[] {
  return [...voices]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function getVoiceByCaseSlug(caseSlug: string): Voice | undefined {
  return voices.find((v) => v.relatedCaseSlug === caseSlug);
}
