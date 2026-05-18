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
    title: "最初の電話から、丁寧にご案内いただきました。",
    family: "川口市在住・60代女性",
    rating: 5,
    comment:
      "母が亡くなった日の夜にお電話したのですが、深夜にもかかわらず落ち着いて対応してくださり、それだけで気持ちが楽になりました。葬儀の流れも費用も、わかりやすく一つひとつ確認しながら進めていただけたので、安心してお任せできました。家族の事情をくみ取って、無理のない形を提案していただきました。",
    surveyImage: {
      src: "/images/voices/voice-01.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-04-22",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「最初の電話から落ち着いて対応いただき安心できた」というご感想を、手書きのお客様アンケートとともに掲載しています。",
  },
  {
    slug: "cremation-clear-pricing",
    title: "費用を事前にきちんと説明していただきました。",
    family: "川口市在住・70代男性",
    rating: 5,
    comment:
      "葬儀の費用というのは何にどれくらいかかるのか、はじめは見当もつきませんでした。川口典礼さんは、含まれているもの・別途必要になるものを最初から細かく教えてくださって、納得して進めることができました。シンプルな形式でしたが、最後まで丁寧に対応いただいて、家族みんなで静かに見送れたのがよかったです。",
    surveyImage: {
      src: "/images/voices/voice-02.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-03-28",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「費用が事前にわかりやすく説明された」というご感想を、手書きのお客様アンケートとともに掲載しています。",
  },
  {
    slug: "family-funeral-warm",
    title: "親族のことまで気を配っていただきました。",
    family: "川口市・西新井宿在住・50代女性",
    rating: 5,
    comment:
      "両親の世代の親族が多く、当日の段取りに不安がありましたが、川口典礼さんが座席や動線、控室の使い方まで細かく整えてくださり、おかげで家族はゆっくりお別れの時間を持つことができました。お料理や返礼品も、こちらの希望を丁寧に聞いてくださって、参列いただいた方からも喜びの声がありました。打合せの段階から最後まで、本当に丁寧でした。",
    surveyImage: {
      src: "/images/voices/voice-03.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-02-25",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「親族の年齢まで気を配って対応いただいた」というご感想を、手書きのお客様アンケートとともに掲載しています。",
  },
  {
    slug: "direct-funeral-home-time",
    title: "自宅でゆっくりお別れの時間を持てました。",
    family: "川口市在住・40代男性",
    rating: 5,
    comment:
      "父は自宅で最後を迎えたかったので、できれば最後まで自宅で見送りたいというのが家族の希望でした。川口典礼さんはこちらの希望をすぐにくみ取ってくださり、自宅にご安置のお手伝いから、火葬当日の段取りまでをすべて整えていただきました。儀式を行わないシンプルな形でしたが、家族だけで自宅で過ごす時間が持てたことが、何よりありがたかったです。",
    surveyImage: {
      src: "/images/voices/voice-04.jpg",
      alt: "ご家族にいただいたお客様アンケートの手書き原稿",
    },
    publishedAt: "2026-02-05",
    metaDescription:
      "川口典礼でご葬儀を執り行ったご家族の声。「自宅でゆっくり過ごす時間を大切にしていただけた」というご感想を、手書きのお客様アンケートとともに掲載しています。",
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
