import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { areas } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/`;

const META_DESCRIPTION =
  "川口典礼の対応エリア一覧。川口市内（新井宿・川口元郷・芝・青木ほか）と鳩ヶ谷・西川口・東川口・安行など近隣エリアごとに、葬儀・家族葬・直葬・一日葬のご相談に対応しています。地域の式場・火葬場へのアクセスもご案内します。";

export const metadata: Metadata = {
  title: "対応エリア一覧｜川口市・近隣の葬儀・家族葬｜川口典礼",
  description: META_DESCRIPTION,
  alternates: { canonical: "/area/" },
  openGraph: {
    title: "対応エリア一覧｜川口市・近隣の葬儀・家族葬｜川口典礼",
    description: META_DESCRIPTION,
    url: "/area/",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "対応エリア", item: pageUrl },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "川口典礼 対応エリア一覧",
  itemListElement: areas.map((area, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/area/${area.slug}/`,
    name: `${area.name}の葬儀・家族葬`,
  })),
};

export default function AreaIndexPage() {
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
        eyebrow="Area"
        subLabel="対応エリア"
        title={
          <>
            川口市・近隣の
            <br className="md:hidden" />
            対応エリア
          </>
        }
        description={
          <p>
            川口市内と近隣エリアごとに、地域の葬儀の傾向・ご利用いただける式場・火葬場へのアクセス・対応プランをまとめています。お住まいの地域からお選びください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "対応エリア" },
        ]}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Areas
            </p>
            <h2 className="font-serif-jp mt-2 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              地域ごとのご案内
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              川口典礼は、川口市西新井宿の自社式場「川口メモリアルホール」を拠点に、川口市めぐりの森まで車で約5分の立地で、地域に密着してお手伝いしています。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <li key={area.slug}>
                <a
                  href={`/area/${area.slug}/`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md md:p-6"
                >
                  <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                    {area.name}の葬儀・家族葬
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {area.heroLead}
                  </p>
                  <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    詳しく見る
                    <span aria-hidden>→</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-base leading-8 text-ink-mid md:text-lg md:leading-9">
              ご希望の地域が見当たらない場合も、川口市・近隣であればお気軽にご相談ください。葬儀プランや、川口市・近隣の葬儀場・斎場のご案内もまとめています。
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="/plan/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                葬儀プランを見る
                <span aria-hidden>→</span>
              </a>
              <a
                href="/saijo/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                川口市・近隣の葬儀場一覧を見る
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
