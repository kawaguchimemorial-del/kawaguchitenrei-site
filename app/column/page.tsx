import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { columns } from "@/lib/columns";

export const metadata: Metadata = {
  title: "コラム一覧 | 川口典礼",
  description:
    "川口典礼のコラム一覧ページです。葬儀の準備、事前相談、家族葬・直葬・一日葬の違いなど、ご家族の判断の助けになる情報をお届けします。",
  alternates: { canonical: "/column/" },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

const sortedColumns = [...columns].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

export default function ColumnIndexPage() {
  return (
    <>
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
            葬儀の準備、事前相談、家族葬・直葬・一日葬の違いなど、ご家族が落ち着いて選ばれるための情報をお届けします。地域の風習や手続きについても、わかりやすくご紹介します。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "コラム" },
        ]}
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                All Columns
              </p>
              <p className="mt-2 font-serif-jp text-2xl font-medium text-ink-deep md:text-3xl">
                公開中の記事 {sortedColumns.length}件
              </p>
            </div>
            <p className="text-sm text-ink-soft">
              公開日が新しい順に表示しています
            </p>
          </div>

          {sortedColumns.length === 0 ? (
            <p className="mt-10 rounded-lg border border-line bg-white px-6 py-10 text-center text-base text-ink-mid">
              現在、公開中のコラム記事はありません。
            </p>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedColumns.map((article) => (
                <li key={article.slug}>
                  <a
                    href={`/column/${article.slug}/`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md"
                  >
                    {article.thumbnail ? (
                      <div className="relative aspect-[16/9] w-full bg-warm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.thumbnail.src}
                          alt={article.thumbnail.alt}
                          className="absolute inset-0 h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        aria-hidden
                        className="relative aspect-[16/9] w-full bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)]"
                      />
                    )}

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-center gap-3 text-xs">
                        {article.category && (
                          <span className="inline-flex rounded-full border border-line bg-paper px-3 py-1 font-bold text-ink-deep">
                            {article.category}
                          </span>
                        )}
                        <span className="text-ink-soft">
                          {formatDate(article.publishedAt)} 公開
                        </span>
                      </div>

                      <h2 className="font-serif-jp text-lg font-medium leading-[1.55] text-ink-deep group-hover:text-brand md:text-xl">
                        {article.title}
                      </h2>

                      <p className="text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                        {article.description}
                      </p>

                      <p className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                        記事を読む
                        <span aria-hidden>→</span>
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
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
