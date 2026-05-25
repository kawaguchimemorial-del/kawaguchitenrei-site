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
import { areaShiba } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaShiba.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaShiba.metaTitle,
  description: areaShiba.metaDescription,
  alternates: { canonical: `/area/${areaShiba.slug}/` },
  openGraph: {
    title: areaShiba.metaTitle,
    description: areaShiba.metaDescription,
    url: `/area/${areaShiba.slug}/`,
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
      name: areaShiba.name,
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaShiba.faqs.map((f) => ({
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
    name: "埼玉県川口市芝",
  },
  description:
    "川口市芝周辺で葬儀・家族葬・直葬・一日葬を承る葬儀社。自社式場「川口メモリアルホール」(川口市西新井宿)を中心に、ご搬送・ご安置・葬儀式・川口市めぐりの森での火葬まで一貫してサポートします。",
};

const relatedLinks = [
  {
    label: "川口市の葬儀・家族葬",
    description: "川口市全体の葬儀・対応エリアのご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "西川口の葬儀・家族葬",
    description: "西川口エリアの葬儀・家族葬のご案内",
    href: "/area/nishikawaguchi/",
  },
  {
    label: "青木の葬儀・家族葬",
    description: "青木地区の葬儀・家族葬のご案内",
    href: "/area/aoki/",
  },
  {
    label: "上青木の葬儀・家族葬",
    description: "上青木地区の葬儀・家族葬のご案内",
    href: "/area/kamiaoki/",
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
    description: "川口メモリアルホール・寺院会館・民営式場をエリア別にご紹介しています。",
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
];

export default function ShibaAreaPage() {
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

      <AreaDetailIntro area={areaShiba} />
      <AreaPrimaryHall
        area={areaShiba}
        description="芝エリアの住宅地から、お車でご来館いただける川口典礼の自社ホール。1日1組貸切の落ち着いた式場で、家族葬・一日葬に適しています。"
      />
      <AreaFeatures area={areaShiba} />
      <AreaPlans area={areaShiba} />
      <AreaSaijo area={areaShiba} />
      <AreaReasons area={areaShiba} />
      <AreaFlow area={areaShiba} />
      <AreaFaq area={areaShiba} />

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
              芝の葬儀を検討する方へ、
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

      <AreaDetailCta area={areaShiba} />
    </>
  );
}
