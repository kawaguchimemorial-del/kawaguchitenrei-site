export type ColumnBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "cta"; label: string; href: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string };

export type ColumnArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO "YYYY-MM-DD"
  updatedAt?: string;
  category?: string;
  tags?: string[];
  thumbnail?: { src: string; alt: string };
  heroImage?: { src: string; alt: string };
  body: ColumnBlock[];
  relatedPlanSlugs?: string[];
  metaDescription?: string;
};

export const columns: ColumnArticle[] = [
  {
    slug: "kouden_souba",
    title:
      "香典の相場は？関係性や年齢による葬儀・法要での香典金額の違い",
    description:
      "香典は故人との関係性や年齢、立場によって金額が変わります。葬儀・一周忌での親族・友人・職場関係者の相場、避けるべき金額、香典袋の選び方、宗派別の表書きまで、ご家族が迷わず準備できるよう整理しました。",
    publishedAt: "2025-03-28",
    updatedAt: "2025-03-28",
    category: "香典",
    tags: ["香典", "葬儀マナー", "法要"],
    thumbnail: {
      src: "/images/column/kouden_souba/cover.jpg",
      alt: "香典の相場を解説するコラム記事のイメージ",
    },
    heroImage: {
      src: "/images/column/kouden_souba/cover.jpg",
      alt: "香典の相場を解説するコラム記事のイメージ",
    },
    body: [
      { type: "h2", text: "香典とは？" },
      {
        type: "p",
        text: "香典は、故人を供養し、遺族を支援するための金銭的なお悔やみです。金額は、故人との関係性や年齢・立場によって変わります。この記事では、香典の相場を関係性や年齢別に詳しく解説します。ただし、相場は地域によって異なるため、参考程度にしてください。",
      },
      { type: "h3", text: "この記事のポイント" },
      {
        type: "ul",
        items: [
          "香典の金額は、故人との関係性や年齢によって変わる。親族の場合は1万円〜10万円が一般的。",
          "香典の金額は「割り切れない数」を意識し、4や9を避けるのがマナー。",
          "宗派によって香典袋の表書きが異なり、浄土真宗では「御霊前」を使用しない。",
        ],
      },

      { type: "h2", text: "【葬儀】香典の相場" },
      { type: "h3", text: "親族の香典相場" },
      {
        type: "table",
        headers: ["関係", "20代", "30代", "40代以上"],
        rows: [
          ["両親", "3万円〜10万円", "5万円〜10万円", "5万円〜10万円"],
          ["兄弟・姉妹", "3万円〜5万円", "5万円", "5万円"],
          ["祖父母", "1万円", "1万円〜3万円", "3万円〜5万円"],
          ["おじ・おば", "1万円", "1万円〜3万円", "3万円〜"],
        ],
      },
      {
        type: "ul",
        items: [
          "義理の兄弟・姉妹でも同様の相場。",
          "祖父母への香典は、若い世代ほど金額が低めになる傾向。",
          "近しくない親族なら5千円〜1万円が一般的。",
        ],
      },

      { type: "h3", text: "友人・知人の香典相場" },
      {
        type: "table",
        headers: ["関係", "20代", "30代", "40代以上"],
        rows: [
          ["友人・知人", "5千円", "5千円〜1万円", "5千円〜1万円"],
          ["先生・近所の方", "3千円〜5千円", "3千円〜1万円", "3千円〜1万円"],
        ],
      },

      { type: "h3", text: "職場関係者の香典相場" },
      {
        type: "table",
        headers: ["関係", "20代", "30代", "40代以上"],
        rows: [
          ["上司", "5千円", "5千円〜1万円", "1万円〜"],
          ["上司の家族", "5千円", "5千円〜1万円", "1万円〜"],
          ["同僚", "5千円", "5千円〜1万円", "1万円〜"],
          ["同僚の家族", "3千円〜5千円", "3千円〜1万円", "3千円〜1万円"],
        ],
      },

      { type: "h2", text: "【一周忌】香典の相場" },
      {
        type: "p",
        text: "一周忌でも香典を用意するのが一般的です。",
      },
      { type: "h3", text: "親族の香典相場" },
      {
        type: "table",
        headers: ["関係", "相場"],
        rows: [
          ["両親", "1万円〜5万円"],
          ["兄弟・姉妹", "1万円〜5万円"],
          ["祖父母", "5千円〜3万円"],
          ["おじ・おば", "5千円〜1万円"],
        ],
      },
      { type: "h3", text: "配偶者の親族の香典相場" },
      {
        type: "table",
        headers: ["関係", "相場"],
        rows: [
          ["配偶者の両親", "1万円〜5万円"],
          ["配偶者の兄弟・姉妹", "1万円〜5万円"],
          ["配偶者の祖父母", "5千円〜3万円"],
          ["配偶者のおじ・おば", "5千円〜1万円"],
        ],
      },

      { type: "h2", text: "香典を準備する際の注意点" },
      { type: "h3", text: "香典を包まないケース" },
      {
        type: "ul",
        items: [
          "親が香典を用意する場合、自身は用意しなくてもよい。",
          "喪主の場合は香典を包まない。",
        ],
      },
      { type: "h3", text: "避けるべき金額" },
      {
        type: "ul",
        items: [
          "4(死)や9(苦)を連想させる金額を避ける。",
          "1万円なら1万円札1枚、3万円なら1万円札3枚が望ましい。",
        ],
      },
      { type: "h3", text: "香典袋の選び方" },
      {
        type: "table",
        headers: ["金額", "適した香典袋"],
        rows: [
          ["5千円", "水引が印刷された略式袋"],
          ["1万円〜2万円", "黒白または双銀の水引(7〜10本)"],
          ["3万円〜5万円", "双銀の水引(10本以上)"],
          ["10万円以上", "大判でひだ折りのある高級和紙使用袋"],
        ],
      },

      { type: "h2", text: "香典袋の書き方" },
      { type: "h3", text: "表書き(宗派別)" },
      {
        type: "table",
        headers: ["宗派", "表書き"],
        rows: [
          ["仏教", "御香典、御仏前、御霊前(浄土真宗では御霊前を使用しない)"],
          ["神道", "御榊料、御玉串料、御神饌料"],
          [
            "キリスト教",
            "御花料(プロテスタント)、御ミサ料(カトリック)",
          ],
        ],
      },
      { type: "h3", text: "連名での記入方法" },
      {
        type: "ul",
        items: [
          "3名以内:右側から目上の順に記入。",
          "4名以上:「代表者名+外一同」とし、別紙に全員の氏名を記入。",
        ],
      },

      { type: "h2", text: "香典を辞退されている場合の対応" },
      {
        type: "p",
        text: "遺族が香典を辞退している場合は、意向を尊重し持参を控えましょう。",
      },
      { type: "h3", text: "弔意を示す方法" },
      {
        type: "ul",
        items: [
          "供物や供花を贈る(事前に遺族へ確認)。",
          "手紙や弔電を送る。",
        ],
      },

      { type: "h2", text: "まとめ" },
      {
        type: "p",
        text: "香典は、故人を偲び、遺族を支援するためのものですが、金額やマナーには注意が必要です。地域や宗派によって異なるため、事前に確認すると安心です。葬儀・法要のご相談は、川口典礼まで24時間365日承っております。",
      },
      {
        type: "cta",
        label: "事前相談・お問い合わせ",
        href: "/contact/",
      },
    ],
    metaDescription:
      "香典の相場を、故人との関係性や年齢別に解説。葬儀・一周忌の親族／友人／職場関係者の金額目安、香典袋の選び方、宗派別の表書きまで、ご家族が安心して準備できる内容をまとめています。",
  },
  {
    slug: "sample-article",
    title: "【サンプル】事前相談で確認しておきたい3つのこと",
    description:
      "（サンプル記事）コラム機能の骨組み動作確認用の仮記事です。後日、実コンテンツに差し替えます。",
    publishedAt: "2026-05-18",
    category: "事前相談",
    tags: ["サンプル", "骨組み確認用"],
    body: [
      {
        type: "p",
        text: "※ このページはコラム機能の骨組み動作確認用のサンプル記事です。実際のコンテンツは後日差し替えます。",
      },
      { type: "h2", text: "サンプル見出し H2" },
      {
        type: "p",
        text: "段落のテストです。本文はブロック単位（段落、見出し、リスト、画像、引用、CTA）で構造化して管理しています。",
      },
      { type: "h3", text: "サンプル見出し H3" },
      {
        type: "ul",
        items: [
          "箇条書きの項目1",
          "箇条書きの項目2",
          "箇条書きの項目3",
        ],
      },
      {
        type: "quote",
        text: "引用ブロックのサンプルです。ご家族の言葉や、参考になる一節を引用するときに使います。",
      },
      {
        type: "cta",
        label: "事前相談はこちら",
        href: "/contact/",
      },
    ],
    metaDescription:
      "（サンプル記事の meta description）後日、実コンテンツに差し替えます。",
  },
];

export function getColumn(slug: string): ColumnArticle | undefined {
  return columns.find((c) => c.slug === slug);
}

export function getAllColumnSlugs(): string[] {
  return columns.map((c) => c.slug);
}
