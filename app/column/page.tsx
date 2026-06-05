import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ColumnCard } from "@/components/column/ColumnCard";
import { CategoryChips } from "@/components/column/CategoryChips";
import { columns } from "@/lib/columns";

const SITE_URL = "https://kawaguchitenrei.com";

const META_DESCRIPTION =
  "川口典礼のコラム一覧ページです。葬儀の準備、事前相談、家族葬・直葬・一日葬の違いなど、ご家族の判断の助けになる情報をお届けします。";

export const metadata: Metadata = {
  title: "コラム一覧 | 川口典礼",
  description: META_DESCRIPTION,
  alternates: { canonical: "/column/" },
  openGraph: {
    title: "コラム一覧 | 川口典礼",
    description: META_DESCRIPTION,
    url: "/column/",
    type: "website",
    siteName: "川口典礼",
    locale: "ja_JP",
    images: [
      {
        url: "/images/home/hall/hall-exterior.jpg",
        width: 1200,
        height: 800,
        alt: "川口メモリアルホールの外観",
      },
    ],
  },
};

const sortedColumns = [...columns].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

const featured = sortedColumns.slice(0, 3);
const remaining = sortedColumns.slice(3);

// 表示用セクションを構成する。
// 2記事以上のカテゴリは件数の多い順に個別セクション化し、
// 1記事だけのカテゴリは「その他のテーマ」に集約して、
// 下部グリッドが疎にならない（＝スカスカに見えない）ようにする。
const OTHER_LABEL = "その他のテーマ";

function buildSections(
  articles: typeof sortedColumns
): [string, typeof sortedColumns][] {
  const map = new Map<string, typeof sortedColumns>();
  for (const a of articles) {
    const key = a.category ?? OTHER_LABEL;
    const arr = map.get(key);
    if (arr) arr.push(a);
    else map.set(key, [a]);
  }
  const all = Array.from(map.entries());
  const major = all
    .filter(([, arr]) => arr.length >= 2)
    .sort((a, b) => b[1].length - a[1].length);
  const minor = all
    .filter(([, arr]) => arr.length < 2)
    .flatMap(([, arr]) => arr);
  const sections: [string, typeof sortedColumns][] = [...major];
  if (minor.length > 0) sections.push([OTHER_LABEL, minor]);
  return sections;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "コラム",
      item: `${SITE_URL}/column/`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "川口典礼 コラム一覧",
  itemListElement: sortedColumns.map((article, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/column/${article.slug}/`,
    name: article.title,
  })),
};

export default function ColumnIndexPage() {
  const sections = buildSections(sortedColumns);
  const chipCategories = sections.map(([label, arts]) => ({
    label,
    count: arts.length,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHero
        eyebrow="Column"
        subLabel="コラム"
        title={
          <>
            ご家族の判断の、
            <br className="md:hidden" />
            助けになる読みもの。
          </>
        }
        description={
          <p>
            葬儀の流れ・費用・準備・法要・相続など、葬儀に関する基礎知識をわかりやすくまとめています。事前相談前にも、ご相談後にも、お役立てください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "コラム" },
        ]}
      />

      {/* 新着記事（Featured） */}
      {featured.length > 0 && (
        <section className="bg-paper py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                  Latest
                </p>
                <h2 className="font-serif-jp mt-2 text-2xl font-medium text-ink-deep md:text-3xl">
                  新着の記事
                </h2>
              </div>
              <p className="hidden text-sm text-ink-soft md:block">
                公開全 {sortedColumns.length}件
              </p>
            </div>

            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {featured.map((article) => (
                <li key={article.slug}>
                  <ColumnCard article={article} variant="featured" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* カテゴリチップ */}
      <section className="border-t border-line-soft bg-white py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase shrink-0">
              Categories
            </p>
            <CategoryChips
              categories={chipCategories}
              total={sortedColumns.length}
            />
          </div>
        </div>
      </section>

      {/* カテゴリ別 + 全件 */}
      <section
        id="all-articles"
        className="scroll-mt-24 bg-paper py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {sortedColumns.length === 0 ? (
            <p className="rounded-lg border border-line bg-white px-6 py-10 text-center text-base text-ink-mid">
              現在、公開中のコラム記事はありません。
            </p>
          ) : (
            <div className="space-y-14 md:space-y-20">
              {sections.map(([category, arts]) => (
                <div
                  key={category}
                  id={`cat-${encodeURIComponent(category)}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-line-soft pb-3">
                    <h2 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                      <span className="mr-2 inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-brand align-middle" />
                      {category}
                    </h2>
                    <span className="text-sm text-ink-soft">
                      {arts.length}件
                    </span>
                  </div>
                  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {arts.map((article) => (
                      <li key={article.slug}>
                        <ColumnCard article={article} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {remaining.length > 0 && (
            <div className="mt-14 flex justify-center md:mt-20">
              <a
                href="#all-articles"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-6 py-3 text-sm font-bold text-brand transition hover:border-brand"
              >
                <span aria-hidden>↑</span>
                ページの先頭へ戻る
              </a>
            </div>
          )}
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            ご家族のお気持ちに、
            <br className="md:hidden" />
            寄り添うお手伝いを。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            費用や流れだけ知りたい、というご相談も歓迎しています。お電話または事前相談フォームでお気軽にお問い合わせください。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <span aria-hidden className="text-2xl">
                ☎
              </span>
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  電話で相談する
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/90">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              事前相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
