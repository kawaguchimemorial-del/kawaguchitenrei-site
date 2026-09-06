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
import { areaKawaguchiEkimae } from "@/lib/areas";
import { AreaLocalGuide } from "@/components/area/AreaLocalGuide";
import { buildLocalGuide } from "@/lib/area-local-guide";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaKawaguchiEkimae.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaKawaguchiEkimae.metaTitle,
  description: areaKawaguchiEkimae.metaDescription,
  alternates: { canonical: `/area/${areaKawaguchiEkimae.slug}/` },
  openGraph: {
    title: areaKawaguchiEkimae.metaTitle,
    description: areaKawaguchiEkimae.metaDescription,
    url: `/area/${areaKawaguchiEkimae.slug}/`,
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
      name: "川口駅周辺",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaKawaguchiEkimae.faqs.map((f) => ({
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
    name: "埼玉県川口市(川口駅周辺・本町・栄町)",
  },
  description:
    "川口駅周辺(本町・栄町など)で葬儀・家族葬・直葬・一日葬を承る葬儀社。お住まいの近くの寺院会館・式場のご利用から、火葬場(川口市めぐりの森)まで車で約5分の川口メモリアルホールでのお別れまで、ご希望に合わせて搬送から火葬まで一貫してサポートします。",
};

const relatedLinks = [
  {
    label: "川口市の葬儀ガイド",
    description: "川口市で葬儀を行う場合の流れ・式場・制度のご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "川口元郷の葬儀・家族葬",
    description: "川口元郷エリアの葬儀・家族葬のご案内",
    href: "/area/kawaguchi-motogo/",
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
    label: "芝の葬儀・家族葬",
    description: "芝地区の葬儀・家族葬のご案内",
    href: "/area/shiba/",
  },
  {
    label: "川口メモリアルホール",
    description: "自社式場(川口市西新井宿)のご紹介",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "川口市めぐりの森",
    description: "車約5分の公営火葬場のご案内",
    href: "/saijo/megurinomori/",
  },
  {
    label: "川口市・近隣の葬儀場・斎場一覧",
    description: "川口メモリアルホール・寺院会館・民営式場をエリア別にご紹介しています。",
    href: "/saijo/",
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
    label: "施行事例",
    description: "川口典礼でお手伝いした葬儀の施行事例を確認できます。",
    href: "/case/",
  },
];

export default function KawaguchiEkimaeAreaPage() {
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

      <AreaDetailIntro area={areaKawaguchiEkimae} />
      <AreaPrimaryHall
        area={areaKawaguchiEkimae}
        description="川口市西新井宿の自社ホール。川口駅からは車で約25分と離れますが、川口市めぐりの森(火葬場)まで車で約5分と近く、式場でのお別れから火葬までの移動を抑えられます。1日1組貸切の落ち着いた式場で、家族葬・一日葬に適しています。お住まいの近くをご希望の場合は、川口駅周辺の寺院会館・式場のご利用もご相談ください。"
      />
      <AreaFeatures area={areaKawaguchiEkimae} />
      <AreaPlans area={areaKawaguchiEkimae} />
      <AreaSaijo area={areaKawaguchiEkimae} />
      <AreaReasons area={areaKawaguchiEkimae} />
      <AreaFlow area={areaKawaguchiEkimae} />
      <AreaFaq area={areaKawaguchiEkimae} />

      <AreaLocalGuide {...buildLocalGuide(areaKawaguchiEkimae)} />

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
              川口駅周辺の葬儀を検討する方へ、
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

      <AreaDetailCta area={areaKawaguchiEkimae} />
    </>
  );
}
