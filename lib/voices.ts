export type Voice = {
  slug: string;
  title: string;
  family: string;
  rating: number; // 1-5
  comment: string;
  surveyImage: { src: string; alt: string };
  publishedAt: string;
  metaDescription: string;
};

export const voices: Voice[] = [
  {
    slug: "oneday-careful-guidance",
    title: "親身に対応していただき、大変助かりました。",
    family: "お客様アンケートより",
    rating: 5,
    comment:
      "親身になって対応して下さり、大変助かりました。不慣れな為、わからない所も汲んでおしえてくれ、とても信頼できました。助言もして下さります。頼んで出会えて良かったです。感謝です。",
    surveyImage: {
      src: "/images/voices/voice-01.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-04-22",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「親身になって対応していただき、大変助かりました」というご感想を、手書きアンケートとともに掲載しています。",
  },
  {
    slug: "cremation-clear-pricing",
    title: "初めてで不安でしたが、安心して終えることができました。",
    family: "お客様アンケートより",
    rating: 5,
    comment:
      "初めてで、経験が無かったので、心配だったが、親切に教えて下さって、無事に終わって、頼んで良かった。",
    surveyImage: {
      src: "/images/voices/voice-02.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-03-28",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「初めてで不安でしたが、親切に教えていただき、安心して終えることができました」というご感想を、手書きアンケートとともに掲載しています。",
  },
  {
    slug: "family-funeral-warm",
    title: "丁寧な説明と心づかいで安心できました。",
    family: "お客様アンケートより",
    rating: 5,
    comment:
      "シンプルな直葬でしたが、スタッフの丁寧な説明と心づかいで安心して見送ることができ、希望通りで、費用も明朗でした。",
    surveyImage: {
      src: "/images/voices/voice-03.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-02-25",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「シンプルな直葬で、丁寧な説明と心づかいで安心して見送ることができました」というご感想を、手書きアンケートとともに掲載しています。",
  },
  {
    slug: "direct-funeral-home-time",
    title: "落ち着いて故人を見送ることができました。",
    family: "お客様アンケートより",
    rating: 5,
    comment:
      "親身になって対応していただき、落ち着いて故人を見送ることができました。感謝しております。スタッフの言葉遣いや所作が丁寧で好感が持てました。総じて、参列者から好評でした。",
    surveyImage: {
      src: "/images/voices/voice-04.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-02-05",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「親身に対応いただき、落ち着いて故人を見送ることができました」というご感想を、手書きアンケートとともに掲載しています。",
  },
  {
    slug: "caring-support-farewell",
    title: "親身なサポートのおかげで、心安らかに見送れました。",
    family: "お客様アンケートより",
    rating: 5,
    comment:
      "何も分からず不安な中担当様の親身なサポートのおかげで、無事に式を終えることができました。おかげさまで家族一同、心安らかに父を見送ることができ、感謝しております。ありがとうございました。",
    surveyImage: {
      src: "/images/voices/voice-05.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-05-15",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「親身なサポートのおかげで、心安らかに見送ることができました」というご感想を、手書きアンケートとともに掲載しています。",
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
