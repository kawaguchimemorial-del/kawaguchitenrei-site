import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { ColumnBody } from "@/components/column/ColumnBody";
import { getAllColumnSlugs, getColumn } from "@/lib/columns";

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
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getColumn(slug);
  if (!article) {
    notFound();
  }

  return (
    <>
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

      <article className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {article.heroImage && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-warm">
              <Image
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
                priority
              />
            </div>
          )}

          <p className="rounded-lg border border-line-soft bg-paper px-5 py-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            {article.description}
          </p>

          <div className="mt-10">
            <ColumnBody body={article.body} />
          </div>

          <div className="mt-14 border-t border-line-soft pt-8">
            <a
              href="/column/"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline md:text-base"
            >
              <span aria-hidden>←</span>
              コラム一覧へ戻る
            </a>
          </div>
        </div>
      </article>

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
