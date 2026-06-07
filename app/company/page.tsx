import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { company, getLocalBusinessJsonLd } from "@/lib/company";

const COMPANY_TITLE =
  "川口の葬儀社 川口典礼｜会社概要・創業20年・年間約260件";
const COMPANY_DESCRIPTION =
  "川口典礼は、埼玉県川口市西新井宿の地域密着葬儀社です。川口メモリアルホールを拠点に、家族葬・一日葬・直葬・川口市民葬まで対応。創業20年・年間約260件の施行実績。24時間365日受付。";

export const metadata: Metadata = {
  title: COMPANY_TITLE,
  description: COMPANY_DESCRIPTION,
  alternates: { canonical: "/company/" },
  openGraph: {
    title: COMPANY_TITLE,
    description: COMPANY_DESCRIPTION,
    url: "/company/",
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

const values = [
  {
    title: "ご家族の気持ちに寄り添う",
    description:
      "急なご逝去で何もわからない方にも、事前のご相談で時間をかけて検討される方にも、ご家族の状況とお気持ちに合わせて落ち着いてご案内します。",
  },
  {
    title: "地域に根ざした葬儀社として",
    description:
      "川口市・西新井宿の地で長年お見送りをお手伝いしてきました。川口市めぐりの森や近隣斎場の利用、川口市民葬の制度活用など、地域に密着した対応ができます。",
  },
  {
    title: "費用の透明性を大切に",
    description:
      "ご葬儀の費用は何に何がかかるのか、含まれるもの・別途必要なものを最初から明確にご案内します。ご家族が安心してお選びいただける情報提供を心がけています。",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: "https://kawaguchitenrei.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "会社概要",
      item: "https://kawaguchitenrei.com/company/",
    },
  ],
};

export default function CompanyPage() {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // LocalBusiness 構造化データ
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Company"
        subLabel="会社概要"
        title={
          <>
            川口市・新井宿の、
            <br className="md:hidden" />
            地域密着葬儀社です。
          </>
        }
        description={
          <p>{company.shortDescription}</p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "会社概要" },
        ]}
      />

      {/* 実績（E-E-A-T：地域での経験・実績の可視化。すべて確定事実・誇張なし §11） */}
      <section className="border-b border-line-soft bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Track Record
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              地域での経験と実績
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              川口の地で重ねてきた、
              <br className="md:hidden" />
              お見送りの経験。
            </h2>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {company.trackRecord.map((item) => (
              <div
                key={item.label}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
              >
                <dt className="text-sm font-semibold text-ink-mid">
                  {item.label}
                </dt>
                <dd className="font-serif-jp mt-2 text-3xl font-medium text-brand md:text-4xl">
                  {item.value}
                </dd>
                {item.note && (
                  <p className="mt-3 text-sm leading-7 text-ink-mid">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm">
            ※ 施行件数は年間のおおよその目安です。創業年・登録区分は確定の事実に基づき記載しています。
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Our Values
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口典礼の考え方
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご家族と向き合うために、
              <br className="md:hidden" />
              大切にしていること。
            </h2>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <li
                key={v.title}
                className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-7"
              >
                <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                  {v.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Profile
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">会社情報</p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              会社情報。
            </h2>
          </div>

          <dl className="mt-10 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                会社名
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                {company.name}
                {company.legalName && (
                  <span className="ml-2 text-sm text-ink-soft">
                    ({company.legalName})
                  </span>
                )}
              </dd>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                所在地
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                〒{company.postal}
                <br />
                {company.address}
              </dd>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                電話番号
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                <a
                  href={company.phoneTelLink}
                  className="font-serif-jp text-xl font-medium text-emergency hover:underline"
                >
                  {company.phone}
                </a>
                <span className="ml-2 text-sm text-ink-soft">
                  ({company.hours})
                </span>
              </dd>
            </div>
            {company.representative && (
              <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
                <dt className="text-sm font-semibold text-ink-soft md:text-base">
                  代表者
                </dt>
                <dd className="text-base text-ink-deep md:text-lg">
                  {company.representative}
                </dd>
              </div>
            )}
            <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                設立
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                {company.founded}
              </dd>
            </div>
            {company.capital && (
              <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
                <dt className="text-sm font-semibold text-ink-soft md:text-base">
                  資本金
                </dt>
                <dd className="text-base text-ink-deep md:text-lg">
                  {company.capital}
                </dd>
              </div>
            )}
            <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                自社ホール
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                <a
                  href={`/hall/${company.hallSlug}/`}
                  className="font-bold text-brand hover:underline"
                >
                  {company.hallName} →
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line-soft px-5 py-4 md:grid-cols-[220px_1fr] md:px-8 md:py-5">
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                対応エリア
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                {company.serviceAreas.join("・")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Business
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">事業内容</p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              事業内容。
            </h2>
          </div>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {company.business.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-line bg-paper px-5 py-4"
              >
                <span
                  aria-hidden
                  className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-base leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ul>

          {company.affiliations.length > 0 && (
            <div className="mt-10 rounded-lg border border-line-soft bg-cool p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                加盟団体・認可
              </p>
              <ul className="mt-3 space-y-2">
                {company.affiliations.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-7 text-ink-mid md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Access
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-mid">
                アクセス
              </p>
              <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
                ご来館・お問い合わせ。
              </h2>
              <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
                事前相談・ホール見学を承っています。お電話または事前相談フォームよりお気軽にお越しください。
              </p>

              <dl className="mt-6 space-y-3 text-base">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                    所在地
                  </dt>
                  <dd className="mt-2 text-ink-deep">
                    〒{company.postal} {company.address}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                    電話
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={company.phoneTelLink}
                      className="font-serif-jp text-xl font-medium text-emergency hover:underline"
                    >
                      {company.phone}
                    </a>
                    <span className="ml-2 text-sm text-ink-soft">
                      ({company.hours})
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/access/"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  アクセスの詳細を見る
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3.5 text-base font-bold text-ink-deep transition hover:bg-paper"
                >
                  事前相談する
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-warm shadow-sm">
              <iframe
                title="川口メモリアルホールの地図"
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapEmbedQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
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
            まずはお気軽に、
            <br className="md:hidden" />
            ご相談ください。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            費用や流れだけ知りたい、というご相談も歓迎しています。事前相談・お見積りは無料です。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href={company.phoneTelLink}
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
