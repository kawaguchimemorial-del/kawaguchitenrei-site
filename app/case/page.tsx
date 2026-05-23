import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { cases } from "@/lib/cases";

const SITE_URL = "https://kawaguchitenrei.com";

export const metadata: Metadata = {
  title: "施行事例一覧 | 川口典礼",
  description:
    "川口典礼の施行事例をご覧いただけます。家族葬・一日葬・直葬の費用、参列人数、内容、ご家族からのご要望と実施内容まで掲載。川口市・新井宿エリアの実例です。",
  alternates: { canonical: "/case/" },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

const sortedCases = [...cases].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "川口典礼",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "施行事例",
      item: `${SITE_URL}/case/`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "川口典礼の施行事例一覧",
  numberOfItems: sortedCases.length,
  itemListElement: sortedCases.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/case/${c.slug}/`,
    name: c.title,
  })),
};

export default function CaseIndexPage() {
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
        eyebrow="Cases"
        subLabel="施行事例一覧"
        title={
          <>
            実際の葬儀事例を、
            <br className="md:hidden" />
            費用・内容とあわせて。
          </>
        }
        description={
          <p>
            川口典礼でお手伝いした葬儀の事例をご紹介します。形式・人数・斎場・総額のほか、ご家族のご要望と実施内容も掲載しています。掲載は、ご家族の許可をいただいたものです。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "施行事例" },
        ]}
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                All Cases
              </p>
              <p className="mt-2 font-serif-jp text-2xl font-medium text-ink-deep md:text-3xl">
                公開中の事例 {sortedCases.length}件
              </p>
            </div>
            <p className="text-sm text-ink-soft">
              公開日が新しい順に表示しています
            </p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCases.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/case/${c.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-warm">
                    {c.photo ? (
                      <Image
                        src={c.photo.src}
                        alt={c.photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex rounded-full border border-line bg-paper px-3 py-1 font-bold text-ink-deep">
                        {c.format}
                      </span>
                      <span className="text-ink-soft">
                        {formatDate(c.publishedAt)} 公開
                      </span>
                    </div>
                    <h2 className="font-serif-jp mt-3 text-lg font-medium leading-7 text-ink-deep group-hover:text-brand md:text-xl">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-ink-mid">
                      {c.summary}
                    </p>

                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line-soft pt-4 text-xs">
                      <dt className="text-ink-soft">式場</dt>
                      <dd className="font-semibold text-ink-deep">{c.hall}</dd>
                      <dt className="text-ink-soft">人数</dt>
                      <dd className="font-semibold text-ink-deep">
                        {c.people}
                      </dd>
                      <dt className="text-ink-soft">総額</dt>
                      <dd className="font-bold text-brand">{c.total}</dd>
                    </dl>

                    <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                      事例の詳細を見る
                      <span aria-hidden>→</span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-lg border border-line-soft bg-cool p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                  Notes
                </p>
                <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
                  事例の掲載について
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  事例は、ご家族の許可をいただいたうえで掲載しています。お顔・お名前など個人を特定する情報は伏せ、地名は市区町村レベルに留めています。
                </p>
              </div>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-paper"
              >
                お気軽にご相談ください
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
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
            ご希望に近い事例を、
            <br className="md:hidden" />
            ご一緒に整えていきます。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            参考になりそうな事例を見つけたら、お気軽にお電話または事前相談フォームでご連絡ください。
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
