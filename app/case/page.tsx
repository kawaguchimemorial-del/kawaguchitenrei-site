import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { ArrowRightIcon, PhoneIcon } from "@/components/common/icons";
import { cases } from "@/lib/cases";

const SITE_URL = "https://kawaguchitenrei.com";

export const metadata: Metadata = {
  title:
    "川口市の施行事例 | 川口典礼の家族葬・一日葬・直葬の実例 | 川口典礼",
  description:
    "川口市で施行した葬儀事例をご紹介しています。家族葬・一日葬・直葬・火葬式の形式別に、参列人数・式場・内容・総額の例を掲載。事例の総額は内容・人数・式場・火葬場・料理・返礼品等により変わるため、事前のご相談で個別にお見積りをご案内します。",
  alternates: { canonical: "/case/" },
  openGraph: {
    title: "川口市の施行事例 | 川口典礼の家族葬・一日葬・直葬の実例 | 川口典礼",
    description:
      "川口市で施行した葬儀事例をご紹介しています。家族葬・一日葬・直葬・火葬式の形式別に、参列人数・式場・内容・総額の例を掲載。事例の総額は内容・人数・式場・火葬場・料理・返礼品等により変わるため、事前のご相談で個別にお見積りをご案内します。",
    url: "/case/",
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

const conclusionPoints = [
  "川口典礼では、家族葬・一日葬・直葬・火葬式・市民葬・無宗教葬まで、ご家族のご希望に合わせたお別れをご相談いただけます。",
  "掲載中の各事例の総額は、その葬儀における一例です。同じ形式・人数でも、式場・火葬場・お料理・返礼品・宗教者へのお礼などにより総額は変わります。",
  "川口メモリアルホールでのお別れから、川口市めぐりの森(川口市営の火葬場)での火葬まで、ご相談から葬儀後のサポートまで一貫してお手伝いします。",
  "各事例は、ご家族の許可をいただいたうえで、お顔・お名前など個人を特定する情報を伏せて掲載しています。",
  "同じような状況のご相談は事前にご案内可能です。お電話または事前相談フォームよりご連絡ください。",
];

const caseFaqs: { q: string; a: string }[] = [
  {
    q: "施行事例とは何ですか？",
    a: "川口典礼が実際にお手伝いした葬儀の事例を、形式・参列人数・式場・内容・総額の目安とあわせてご紹介しているページです。掲載は、ご家族の許可をいただいたうえで、お顔・お名前など個人を特定する情報を伏せて行っています。",
  },
  {
    q: "事例と同じ金額になりますか？",
    a: "掲載している総額は、その葬儀における一例です。同じ形式・人数のご葬儀でも、式場・火葬場・お料理・返礼品・宗教者へのお礼などにより総額は変わります。ご希望をうかがったうえで、事前に個別のお見積りをご案内します。",
  },
  {
    q: "事例と同じ内容でできますか？",
    a: "形式・規模・進行など、近い形でのご相談はいただけます。ただし式場・火葬場の空き状況、ご家族のご希望、宗教者の同席の有無などにより、進行や内容は調整させていただきます。事前相談時にご一緒に整理させていただきます。",
  },
  {
    q: "事例の総額に含まれるものは何ですか？",
    a: "事例ごとに、含まれている項目(プラン基本費用・式場使用料・火葬料・お料理・返礼品・宗教者へのお礼など)が異なります。詳しくは個別の事例ページの内容をご確認いただくか、事前相談時にご案内します。",
  },
  {
    q: "別途必要になる費用はありますか？",
    a: "事例の総額外で、ご安置日数の延長、お料理・返礼品の追加、宗教者へのお礼、祭壇生花のグレードアップ、遠方への搬送などが必要になる場合があります。ご希望の形に合わせて、事前に個別のお見積りをご案内します。",
  },
  {
    q: "事例にない形式でも相談できますか？",
    a: "はい。家族葬・一日葬・直葬・火葬式・市民葬・無宗教葬まで、ご家族のご希望に合わせた形でのご相談を承ります。事例に掲載されていない進行・規模でも、お気軽にご相談ください。",
  },
  {
    q: "事前相談だけでもできますか？",
    a: "はい。「まだ決まっていない」「事例の中で気になるものがあるので詳しく聞きたい」「費用感だけ知りたい」というご相談も歓迎します。ご相談・お見積りは無料で、24時間365日お電話を受け付けています。",
  },
];

const caseRelatedLinks: {
  label: string;
  description: string;
  href: string;
}[] = [
  {
    label: "川口市の家族葬",
    description: "ご家族中心のお別れ・528,000円(税込)〜",
    href: "/plan/family-funeral/",
  },
  {
    label: "一日葬プラン",
    description: "通夜なしの1日完結プラン・396,000円(税込)〜",
    href: "/plan/oneday-funeral/",
  },
  {
    label: "直葬プラン",
    description: "火葬中心のシンプルなお別れ・139,000円(税込)〜",
    href: "/plan/direct-funeral/",
  },
  {
    label: "火葬式",
    description: "通夜・告別式を行わないお別れのご相談",
    href: "/plan/cremation/",
  },
  {
    label: "川口市民葬プラン",
    description: "川口市民の方の市民葬制度に対応",
    href: "/plan/kawaguchi-shimin/",
  },
  {
    label: "川口市の無宗教葬",
    description: "宗教者を呼ばないお別れのご相談",
    href: "/plan/non-religious-funeral/",
  },
  {
    label: "川口メモリアルホール",
    description: "自社式場(川口市西新井宿)のご紹介",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "川口市の葬儀ガイド",
    description: "川口市で葬儀を行う場合の流れ・式場・制度のご案内",
    href: "/area/kawaguchi/",
  },
];

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: caseFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

      {/* 結論ボックス（AIO向け） */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-brand/30 bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Summary
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.5] text-ink-deep md:text-[1.75rem]">
              川口市の施行事例について。
            </h2>
            <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              川口典礼でお手伝いした葬儀の事例を、形式・人数・式場・内容・総額の目安とあわせてご紹介しています。
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-ink md:text-base md:leading-8">
              {conclusionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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

          {/* 総額表示の誤認注意（強調表示） */}
          <div className="mt-8 rounded-lg border border-brand/40 bg-white p-5 shadow-sm md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Notice
            </p>
            <p className="mt-2 text-sm leading-7 text-ink-deep md:text-base md:leading-8">
              掲載している総額は、それぞれの葬儀における一例です。実際の費用は、内容・人数・式場・火葬場・お料理・返礼品・宗教者へのお礼などにより変わります。ご希望を伺ったうえで、事前に個別のお見積りをご案内します。
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
                      <ArrowRightIcon className="h-3.5 w-3.5" />
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
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              FAQ
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              よくある質問
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              施行事例についてのご質問。
            </h2>
          </div>

          <ul className="mt-10 space-y-3">
            {caseFaqs.map((faq) => (
              <li key={faq.q}>
                <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                    <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                      <span aria-hidden className="font-serif-jp text-brand">
                        Q.
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                    <span
                      aria-hidden
                      className="font-serif-jp mr-2 font-bold text-brand"
                    >
                      A.
                    </span>
                    {faq.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Related
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              関連するページ
            </p>
            <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              施行事例とあわせて、
              <br className="md:hidden" />
              ご覧いただきたいページ
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseRelatedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-paper p-5 shadow-sm transition hover:border-brand hover:shadow-md md:p-6"
                >
                  <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {link.description}
                  </p>
                  <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    詳しく見る
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </p>
                </a>
              </li>
            ))}
          </ul>
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

          <div className="mt-9 grid gap-3 md:grid-cols-[1.2fr_1fr]">
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
