import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "@/components/common/icons";
import { PageHero } from "@/components/common/PageHero";
import { ColumnBody } from "@/components/column/ColumnBody";
import { ColumnLocalFuneralGuide } from "@/components/column/ColumnLocalFuneralGuide";
import { ColumnToc } from "@/components/column/ColumnToc";
import { RelatedColumns } from "@/components/column/RelatedColumns";
import { getAllColumnSlugs, getColumn, type ColumnArticle } from "@/lib/columns";
import { extractToc } from "@/lib/column-toc";

const SITE_URL = "https://kawaguchitenrei.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllColumnSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getColumn(slug);
  if (!article) {
    return { title: "コラム記事が見つかりません | 川口典礼" };
  }
  const description = article.metaDescription ?? article.description;
  const ogImage = article.heroImage?.src
    ? {
        url: article.heroImage.src.startsWith("http")
          ? article.heroImage.src
          : `${SITE_URL}${article.heroImage.src}`,
        alt: article.heroImage.alt,
      }
    : null;
  return {
    title: `${article.title} | 川口典礼 コラム`,
    description,
    alternates: { canonical: `/column/${article.slug}/` },
    openGraph: {
      title: `${article.title} | 川口典礼 コラム`,
      description,
      url: `/column/${article.slug}/`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

function buildArticleJsonLd(article: ColumnArticle) {
  const pageUrl = `${SITE_URL}/column/${article.slug}/`;
  const description = article.metaDescription ?? article.description;
  const datePublished = article.publishedAt;
  const dateModified = article.updatedAt ?? article.publishedAt;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: article.title,
    description,
    datePublished,
    dateModified,
    url: pageUrl,
    inLanguage: "ja",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "川口典礼",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "川口典礼",
      url: `${SITE_URL}/`,
    },
  };

  if (article.heroImage?.src) {
    const src = article.heroImage.src;
    const imageUrl = src.startsWith("http") ? src : `${SITE_URL}${src}`;
    jsonLd.image = imageUrl;
    jsonLd.thumbnailUrl = imageUrl;
  }

  if (article.category) {
    jsonLd.articleSection = article.category;
  }

  if (article.tags && article.tags.length > 0) {
    jsonLd.keywords = article.tags.join(", ");
  }

  return jsonLd;
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getColumn(slug);
  if (!article) {
    notFound();
  }

  const toc = extractToc(article.body);
  const articleJsonLd = buildArticleJsonLd(article);
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/column/${article.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHero
        eyebrow="Column"
        subLabel={article.category ?? "コラム"}
        title={article.title}
        description={
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span>{formatDate(article.publishedAt)} 公開</span>
            {article.updatedAt && (
              <>
                <span aria-hidden>・</span>
                <span>{formatDate(article.updatedAt)} 更新</span>
              </>
            )}
            {article.tags && article.tags.length > 0 && (
              <>
                <span aria-hidden>・</span>
                <span className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-ink-deep"
                    >
                      #{tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "コラム", href: "/column/" },
          { label: article.title },
        ]}
      />

      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            {/* Main content */}
            <div className="min-w-0">
              {article.heroImage && (
                <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-warm md:mb-10">
                  <Image
                    src={article.heroImage.src}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              )}

              {/* リード文（要点ボックス） */}
              <div className="rounded-lg border-l-4 border-brand bg-paper px-5 py-5 md:px-6 md:py-6">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                  <span aria-hidden className="inline-block h-1 w-4 bg-brand" />
                  Lead
                </p>
                <p className="mt-2 text-sm font-bold text-ink-deep md:text-base">
                  この記事のご案内
                </p>
                <p className="mt-3 text-sm leading-[1.95] text-ink-mid md:text-base md:leading-[2.05]">
                  {article.description}
                </p>
              </div>

              {/* モバイル用目次（折りたたみ） */}
              {toc.length > 0 && (
                <div className="mt-6 lg:hidden">
                  <ColumnToc items={toc} variant="mobile" />
                </div>
              )}

              <div className="mt-10 md:mt-12">
                <ColumnBody body={article.body} />
              </div>

              {/* 地域密着・川口市の葬儀（形式別）導線。全コラム共通で表示 */}
              <ColumnLocalFuneralGuide />

              {/* 記事下のCTA + 戻り導線 */}
              <div className="mt-14 rounded-lg border border-line bg-paper px-6 py-8 text-center md:px-8 md:py-10">
                <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                  Contact
                </p>
                <p className="font-serif-jp mt-3 text-lg font-medium text-ink-deep md:text-xl">
                  ご家族のお気持ちに、寄り添うお手伝いを。
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base">
                  記事の内容でわからないこと、ご家族の状況に合わせたご相談も承ります。
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="/contact/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep md:text-base"
                  >
                    事前相談する
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="/estimate/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-3 text-sm font-bold text-brand transition hover:border-brand md:text-base"
                  >
                    見積りを依頼する
                  </a>
                </div>
              </div>

              <div className="mt-10 border-t border-line-soft pt-6">
                <a
                  href="/column/"
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline md:text-base"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  コラム一覧へ戻る
                </a>
              </div>
            </div>

            {/* サイドバー（PCのみ） */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {toc.length > 0 && <ColumnToc items={toc} />}

                <div className="rounded-lg border border-line-soft bg-white p-5">
                  <RelatedColumns
                    currentSlug={article.slug}
                    category={article.category}
                    limit={4}
                    variant="list"
                    title="この記事を読む方におすすめ"
                  />
                </div>

                <div className="rounded-lg border border-line-soft bg-paper p-5 text-center">
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                    Contact
                  </p>
                  <p className="font-serif-jp mt-2 text-base font-medium text-ink-deep">
                    まずはお気軽に
                  </p>
                  <p className="mt-2 text-xs leading-6 text-ink-mid">
                    24時間365日 受付
                  </p>
                  <a
                    href="tel:0120-963-765"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emergency px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emergency-deep"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    0120-963-765
                  </a>
                  <a
                    href="/contact/"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-brand transition hover:border-brand"
                  >
                    事前相談する
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* 関連記事（記事下） */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <RelatedColumns
            currentSlug={article.slug}
            category={article.category}
            limit={6}
            title="この記事を読む方におすすめ"
          />
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
              <PhoneIcon className="h-7 w-7" />
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
