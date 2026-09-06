import type { Metadata } from "next";
import { SaijoDetailIntro } from "@/components/saijo/SaijoDetailIntro";
import {
  SaijoAvailablePlans,
  SaijoCremationFurnaces,
  SaijoCremationWaitingRooms,
  SaijoFacilityInfo,
  SaijoFeatures,
  SaijoFeeTables,
  SaijoFlow,
  SaijoGallery,
  SaijoHallRooms,
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
import { saijoYatsuka } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/saijo/${saijoYatsuka.slug}/`;
const imageUrl = `${SITE_URL}/images/saijo/yatsuka-saijo/exterior.png`;

const defaultTitle = `${saijoYatsuka.name}での葬儀 | 川口典礼`;
const pageTitle = saijoYatsuka.metaTitle ?? defaultTitle;

export const metadata: Metadata = {
  title: pageTitle,
  description: saijoYatsuka.metaDescription,
  alternates: { canonical: `/saijo/${saijoYatsuka.slug}/` },
  openGraph: {
    title: pageTitle,
    description: saijoYatsuka.metaDescription,
    url: `/saijo/${saijoYatsuka.slug}/`,
    type: "article",
    images: [
      {
        url: "/images/saijo/yatsuka-saijo/exterior.png",
        width: 1200,
        height: 800,
        alt: "谷塚斎場の外観",
      },
    ],
  },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "谷塚斎場",
  address: {
    "@type": "PostalAddress",
    postalCode: "340-0022",
    addressCountry: "JP",
    addressRegion: "埼玉県",
    addressLocality: "草加市",
    streetAddress: "瀬崎4丁目6番36号",
  },
  telephone: "048-922-2342",
  url: pageUrl,
  image: imageUrl,
  description:
    "谷塚斎場は、埼玉県草加市瀬崎にある火葬場併設斎場です。川口典礼では、谷塚斎場での葬儀相談、搬送、安置、式場利用相談、火葬予約、当日の進行をサポートします。",
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
      name: "谷塚斎場",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: saijoYatsuka.faqs.map((f) => ({
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
    label: "町屋斎場",
    description:
      "荒川区町屋の火葬場併設斎場。町屋斎場でのお見送りもご相談いただけます。",
    href: "/saijo/machiya-saijo/",
  },
  {
    label: "川口市の葬儀ガイド",
    description: "川口市で葬儀を行う場合の流れ・式場・制度のご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "戸塚安行の葬儀・家族葬",
    description: "戸塚安行エリアの葬儀・家族葬のご案内",
    href: "/area/tozuka-angyo/",
  },
  {
    label: "東川口の葬儀・家族葬",
    description: "東川口エリアの葬儀・家族葬のご案内",
    href: "/area/higashikawaguchi/",
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
];

export default function YatsukaSaijoPage() {
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
      <SaijoDetailIntro saijo={saijoYatsuka} />
      <SaijoImportantNotice saijo={saijoYatsuka} />
      <SaijoGallery saijo={saijoYatsuka} />
      <SaijoFeatures saijo={saijoYatsuka} />
      <SaijoCremationFurnaces saijo={saijoYatsuka} />
      <SaijoHallRooms saijo={saijoYatsuka} />
      <SaijoCremationWaitingRooms saijo={saijoYatsuka} />
      <SaijoFlow saijo={saijoYatsuka} />
      <SaijoMidCta saijo={saijoYatsuka} />
      <SaijoOurSupport saijo={saijoYatsuka} />
      <SaijoAvailablePlans saijo={saijoYatsuka} />
      <SaijoFacilityInfo saijo={saijoYatsuka} />
      <SaijoFeeTables saijo={saijoYatsuka} />
      <SaijoAccess saijo={saijoYatsuka} />
      <SaijoFaq saijo={saijoYatsuka} />

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
              谷塚斎場での葬儀を検討する方へ、
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

      <SaijoCta saijo={saijoYatsuka} />
    </>
  );
}
