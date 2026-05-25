import type { Metadata } from "next";
import { SaijoDetailIntro } from "@/components/saijo/SaijoDetailIntro";
import {
  SaijoAvailablePlans,
  SaijoFacilityInfo,
  SaijoFeatures,
  SaijoFeeTables,
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
import { saijoMachiya } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/saijo/${saijoMachiya.slug}/`;
const imageUrl = `${SITE_URL}/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-02.png`;

const defaultTitle = `${saijoMachiya.name}での葬儀 | 川口典礼`;
const pageTitle = saijoMachiya.metaTitle ?? defaultTitle;

export const metadata: Metadata = {
  title: pageTitle,
  description: saijoMachiya.metaDescription,
  alternates: { canonical: `/saijo/${saijoMachiya.slug}/` },
  openGraph: {
    title: pageTitle,
    description: saijoMachiya.metaDescription,
    url: `/saijo/${saijoMachiya.slug}/`,
    type: "article",
    images: [
      {
        url: "/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-02.png",
        width: 1200,
        height: 800,
        alt: "町屋斎場の式場内(椅子配置と祭壇)",
      },
    ],
  },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "町屋斎場",
  address: {
    "@type": "PostalAddress",
    postalCode: "116-0001",
    addressCountry: "JP",
    addressRegion: "東京都",
    addressLocality: "荒川区",
    streetAddress: "町屋1-23-4",
  },
  url: pageUrl,
  image: imageUrl,
  description:
    "町屋斎場は、東京都荒川区町屋にある火葬場併設の総合斎場です。川口典礼では、町屋斎場での葬儀相談、搬送、安置、式場利用相談、火葬予約、当日の進行をサポートします。",
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
      name: "町屋斎場",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: saijoMachiya.faqs.map((f) => ({
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
    label: "川口市の葬儀・家族葬",
    description: "川口市全体の葬儀・対応エリアのご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "戸田葬祭場",
    description: "板橋区舟渡の火葬場併設斎場のご相談に対応",
    href: "/saijo/toda-sousaijyo/",
  },
  {
    label: "谷塚斎場",
    description: "草加市瀬崎の火葬場併設斎場のご相談に対応",
    href: "/saijo/yatsuka-saijo/",
  },
  {
    label: "川口市・近隣の葬儀場一覧",
    description:
      "川口メモリアルホール・寺院会館・民営式場をエリア別にご紹介しています。",
    href: "/saijo/",
  },
  {
    label: "家族葬プラン",
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
];

export default function MachiyaSaijoPage() {
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
      <SaijoDetailIntro saijo={saijoMachiya} />
      <SaijoImportantNotice saijo={saijoMachiya} />
      <SaijoGallery saijo={saijoMachiya} />
      <SaijoFeatures saijo={saijoMachiya} />
      <SaijoFlow saijo={saijoMachiya} />
      <SaijoMidCta saijo={saijoMachiya} />
      <SaijoOurSupport saijo={saijoMachiya} />
      <SaijoAvailablePlans saijo={saijoMachiya} />
      <SaijoFacilityInfo saijo={saijoMachiya} />
      <SaijoFeeTables saijo={saijoMachiya} />
      <SaijoAccess saijo={saijoMachiya} />
      <SaijoFaq saijo={saijoMachiya} />

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
              町屋斎場での葬儀を検討する方へ、
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
                    <span aria-hidden>→</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SaijoCta saijo={saijoMachiya} />
    </>
  );
}
