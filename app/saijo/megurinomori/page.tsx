import type { Metadata } from "next";
import { SaijoDetailIntro } from "@/components/saijo/SaijoDetailIntro";
import {
  SaijoAvailablePlans,
  SaijoCremationFees,
  SaijoFacilityInfo,
  SaijoFeatures,
  SaijoFlow,
  SaijoGallery,
  SaijoImportantNotice,
  SaijoOurSupport,
} from "@/components/saijo/SaijoDetailMain";
import {
  SaijoAccess,
  SaijoCta,
  SaijoFaq,
  SaijoMidCta,
} from "@/components/saijo/SaijoDetailExtras";
import { ArrowRightIcon } from "@/components/common/icons";
import { saijoMegurinomori } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/saijo/${saijoMegurinomori.slug}/`;
const imageUrl = `${SITE_URL}/images/saijo/megurinomori/exterior.png`;

const defaultTitle = `${saijoMegurinomori.name}での葬儀 | 川口典礼`;
const pageTitle = saijoMegurinomori.metaTitle ?? defaultTitle;

export const metadata: Metadata = {
  title: pageTitle,
  description: saijoMegurinomori.metaDescription,
  alternates: { canonical: `/saijo/${saijoMegurinomori.slug}/` },
  openGraph: {
    title: pageTitle,
    description: saijoMegurinomori.metaDescription,
    url: `/saijo/${saijoMegurinomori.slug}/`,
    type: "article",
    images: [
      {
        url: "/images/saijo/megurinomori/exterior.png",
        width: 1200,
        height: 800,
        alt: "川口市めぐりの森の外観",
      },
    ],
  },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "川口市めぐりの森",
  address: {
    "@type": "PostalAddress",
    postalCode: "333-0826",
    addressCountry: "JP",
    addressRegion: "埼玉県",
    addressLocality: "川口市",
    streetAddress: "大字新井宿430-1",
  },
  telephone: "048-242-5414",
  url: pageUrl,
  image: imageUrl,
  description:
    "川口市めぐりの森は、川口市大字新井宿にある火葬場です。通夜・告別式を行う式場は併設されていません。川口典礼では、式場でのお別れから川口市めぐりの森での火葬まで一貫してサポートします。",
};

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
      name: "斎場・ホール",
      item: `${SITE_URL}/saijo/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "川口市めぐりの森",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: saijoMegurinomori.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const relatedLinks = [
  {
    label: "川口メモリアルホール",
    description:
      "川口市西新井宿の自社式場。家族葬・一日葬のご相談に対応します。",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
  {
    label: "神根の葬儀・家族葬",
    description: "神根エリアの葬儀・家族葬のご案内",
    href: "/area/kamine/",
  },
  {
    label: "安行の葬儀・家族葬",
    description: "安行地区の葬儀・家族葬のご案内",
    href: "/area/angyo/",
  },
  {
    label: "川口市の葬儀ガイド",
    description: "川口市で葬儀を行う場合の流れ・式場・制度のご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "家族葬プランの料金と内容",
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
    label: "川口市民葬プラン",
    description: "川口市民の方の市民葬制度に対応",
    href: "/plan/kawaguchi-shimin/",
  },
];

export default function MegurinomoriPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SaijoDetailIntro saijo={saijoMegurinomori} />
      <SaijoImportantNotice saijo={saijoMegurinomori} />

      {/* 結論先出し＋基本情報表（AIO・施設名キーワード対策） */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Summary
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              川口市めぐりの森（火葬場）の基本情報
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              川口市めぐりの森は<strong>川口市営の火葬場</strong>です（通夜・告別式を行う葬儀式場は併設されていません）。川口典礼の自社式場「川口メモリアルホール」から<strong>車で約5分</strong>の近さで、式場でのお別れから川口市めぐりの森での火葬まで一貫してご相談いただけます。なお川口市めぐりの森は川口市が運営する施設で、川口典礼が運営する施設ではありません。
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "所在地", value: saijoMegurinomori.address },
                { label: "施設種別", value: "火葬場（川口市営・公営）" },
                { label: "葬儀式場の併設", value: "なし" },
                {
                  label: "川口典礼（川口メモリアルホール）から",
                  value: "車で約5分",
                },
                { label: "駐車場", value: "75台（火葬施設をご利用の方のみ）" },
                {
                  label: "火葬料金の目安（大人12歳以上）",
                  value: "川口市民 30,000円 / 市外 100,000円（目安・改定の場合あり）",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-line-soft bg-white px-4 py-3"
                >
                  <dt className="text-xs font-semibold text-ink-soft">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-ink-deep">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-6 text-ink-soft">
              ※ 火葬料金は目安です。火葬料のほかに搬送・ご安置・式場使用料・宗教者費用などが別途必要になる場合があります。最新の料金・総額の目安は事前のご相談でご案内します。
            </p>
          </div>
        </div>
      </section>

      {/* お別れの場所のご案内：川口メモリアルホール導線 */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Where to hold the ceremony
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              通夜・告別式・家族でのお別れは、
              <br className="md:hidden" />
              川口メモリアルホールなどで。
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              川口市めぐりの森は火葬を行う施設のため、通夜・告別式を行う式場は併設されていません。
              ご家族でのお別れや家族葬・一日葬をご希望の場合は、川口典礼の自社式場「川口メモリアルホール」などを利用し、火葬を川口市めぐりの森で行う流れをご相談いただけます。
              式場手配・宗教者のお勤め・搬送・安置・火葬当日の移動まで、川口典礼が一貫してお手伝いします。
            </p>
            <div className="mt-6">
              <a
                href="/hall/kawaguchi-memorial-hall/"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                川口メモリアルホールを見る
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SaijoGallery saijo={saijoMegurinomori} />
      <SaijoFeatures saijo={saijoMegurinomori} />
      <SaijoFlow saijo={saijoMegurinomori} />
      <SaijoMidCta saijo={saijoMegurinomori} />
      <SaijoOurSupport saijo={saijoMegurinomori} />
      <SaijoAvailablePlans saijo={saijoMegurinomori} />
      <SaijoFacilityInfo saijo={saijoMegurinomori} />
      <SaijoCremationFees saijo={saijoMegurinomori} />
      <SaijoAccess saijo={saijoMegurinomori} />
      <SaijoFaq saijo={saijoMegurinomori} />

      {/* 関連ページ導線 */}
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
              川口市めぐりの森での葬儀を検討する方へ、
              <br className="md:hidden" />
              あわせてご覧ください。
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
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
                    <ArrowRightIcon className="h-4 w-4" />
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SaijoCta saijo={saijoMegurinomori} />
    </>
  );
}
