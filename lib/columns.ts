export type ColumnBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "cta"; label: string; href: string };

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
