import type { Metadata } from "next";
import { AreaDetailIntro } from "@/components/area/AreaDetailIntro";
import {
  AreaFeatures,
  AreaPlans,
  AreaSaijo,
} from "@/components/area/AreaDetailMain";
import {
  AreaFaq,
  AreaFlow,
  AreaReasons,
} from "@/components/area/AreaDetailExtras";
import { AreaDetailCta } from "@/components/area/AreaDetailCta";
import { AreaPrimaryHall } from "@/components/area/AreaPrimaryHall";
import { ArrowRightIcon } from "@/components/common/icons";
import { areaNishikawaguchi } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaNishikawaguchi.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaNishikawaguchi.metaTitle,
  description: areaNishikawaguchi.metaDescription,
  alternates: { canonical: `/area/${areaNishikawaguchi.slug}/` },
  openGraph: {
    title: areaNishikawaguchi.metaTitle,
    description: areaNishikawaguchi.metaDescription,
    url: `/area/${areaNishikawaguchi.slug}/`,
    type: "article",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "川口典礼",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "対応エリア",
      item: `${SITE_URL}/area/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: areaNishikawaguchi.name,
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaNishikawaguchi.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const funeralHomeJsonLd = {
  "@context": "https://schema.org",
  "@type": "FuneralHome",
  name: "川口典礼(川口メモリアルホール)",
  url: pageUrl,
  image: imageUrl,
  telephone: "0120-963-765",
  address: {
    "@type": "PostalAddress",
    postalCode: "333-0833",
    addressCountry: "JP",
    addressRegion: "埼玉県",
    addressLocality: "川口市",
    streetAddress: "西新井宿440-1",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "埼玉県川口市西川口",
  },
  description:
    "JR京浜東北線「西川口駅」周辺で葬儀・家族葬・直葬・一日葬を承る葬儀社。自社式場「川口メモリアルホール」(川口市西新井宿)を中心に、ご搬送・ご安置・葬儀式・川口市めぐりの森での火葬まで一貫してサポートします。",
};

const relatedLinks = [
  {
    label: "川口市の葬儀ガイド",
    description: "川口市で葬儀を行う場合の流れ・式場・制度のご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
  {
    label: "川口メモリアルホール",
    description: "自社式場(川口市西新井宿)のご紹介",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "川口市めぐりの森",
    description: "川口市営の火葬場のご案内",
    href: "/saijo/megurinomori/",
  },
  {
    label: "川口市・近隣の葬儀場一覧",
    description: "川口市内の寺院会館・民営式場の候補をエリア別にご紹介しています。",
    href: "/saijo/",
  },
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
    label: "お役立ちコラム",
    description: "葬儀の流れ・費用・準備のお役立ち情報",
    href: "/column/",
  },
];

export default function NishikawaguchiAreaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(funeralHomeJsonLd) }}
      />

      <AreaDetailIntro area={areaNishikawaguchi} />
      <AreaPrimaryHall
        area={areaNishikawaguchi}
        description="西川口駅周辺の住宅エリアから、お車でご来館いただける川口典礼の自社ホール。1日1組貸切の落ち着いた式場で、家族葬・一日葬に適しています。"
      />
      <AreaFeatures area={areaNishikawaguchi} />
      <AreaPlans area={areaNishikawaguchi} />
      <AreaSaijo area={areaNishikawaguchi} />
      <AreaReasons area={areaNishikawaguchi} />
      <AreaFlow area={areaNishikawaguchi} />
      <AreaFaq area={areaNishikawaguchi} />

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
              西川口の葬儀を検討する方へ、
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

      <AreaDetailCta area={areaNishikawaguchi} />
    </>
  );
}
