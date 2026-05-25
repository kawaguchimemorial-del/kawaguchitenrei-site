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
import { areaKawaguchi } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaKawaguchi.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaKawaguchi.metaTitle,
  description: areaKawaguchi.metaDescription,
  alternates: { canonical: `/area/${areaKawaguchi.slug}/` },
  openGraph: {
    title: areaKawaguchi.metaTitle,
    description: areaKawaguchi.metaDescription,
    url: `/area/${areaKawaguchi.slug}/`,
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
      name: areaKawaguchi.name,
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaKawaguchi.faqs.map((f) => ({
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
    "@type": "City",
    name: "埼玉県川口市",
  },
  description:
    "川口市全域で葬儀・家族葬・直葬・一日葬・市民葬を承る葬儀社。自社式場「川口メモリアルホール」(川口市西新井宿)から川口市めぐりの森まで車で約5分の好立地で、駐車場70台を備え、家族葬から最大200名規模の一般葬まで対応します。24時間365日のお電話受付。",
};

const relatedLinks = [
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
  {
    label: "鳩ヶ谷の葬儀・家族葬",
    description: "鳩ヶ谷エリアの葬儀・家族葬のご案内",
    href: "/area/hatogaya/",
  },
  {
    label: "西川口の葬儀・家族葬",
    description: "西川口エリアの葬儀・家族葬のご案内",
    href: "/area/nishikawaguchi/",
  },
  {
    label: "東川口の葬儀・家族葬",
    description: "東川口エリアの葬儀・家族葬のご案内",
    href: "/area/higashikawaguchi/",
  },
  {
    label: "川口元郷の葬儀・家族葬",
    description: "川口元郷エリアの葬儀・家族葬のご案内",
    href: "/area/kawaguchi-motogo/",
  },
  {
    label: "南鳩ヶ谷の葬儀・家族葬",
    description: "南鳩ヶ谷エリアの葬儀・家族葬のご案内",
    href: "/area/minami-hatogaya/",
  },
  {
    label: "戸塚安行の葬儀・家族葬",
    description: "戸塚安行エリアの葬儀・家族葬のご案内",
    href: "/area/tozuka-angyo/",
  },
  {
    label: "神根の葬儀・家族葬",
    description: "神根エリアの葬儀・家族葬のご案内",
    href: "/area/kamine/",
  },
  {
    label: "新郷の葬儀・家族葬",
    description: "新郷エリアの葬儀・家族葬のご案内",
    href: "/area/shingo/",
  },
  {
    label: "芝の葬儀・家族葬",
    description: "芝地区の葬儀・家族葬のご案内",
    href: "/area/shiba/",
  },
  {
    label: "安行の葬儀・家族葬",
    description: "安行地区の葬儀・家族葬のご案内",
    href: "/area/angyo/",
  },
  {
    label: "上青木の葬儀・家族葬",
    description: "上青木地区の葬儀・家族葬のご案内",
    href: "/area/kamiaoki/",
  },
  {
    label: "青木の葬儀・家族葬",
    description: "青木地区の葬儀・家族葬のご案内",
    href: "/area/aoki/",
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
    label: "川口市・近隣の葬儀場一覧",
    description: "寺院会館・民営式場を含む川口市内の葬儀場候補をエリア別にご紹介しています。",
    href: "/saijo/",
  },
  {
    label: "家族葬プラン",
    description: "ご家族中心のお別れ・528,000円(税込)〜",
    href: "/plan/family-funeral/",
  },
  {
    label: "施行事例",
    description: "川口典礼でお手伝いした葬儀の施行事例を確認できます。",
    href: "/case/",
  },
];

export default function KawaguchiAreaPage() {
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

      <AreaDetailIntro area={areaKawaguchi} />
      <AreaFeatures area={areaKawaguchi} />
      <AreaPlans area={areaKawaguchi} />
      <AreaSaijo area={areaKawaguchi} />
      <AreaReasons area={areaKawaguchi} />
      <AreaFlow area={areaKawaguchi} />
      <AreaFaq area={areaKawaguchi} />

      {/* 関連ページ導線：川口市内の対応エリア・主要施設・プラン */}
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
              川口市内の対応エリアと
              <br className="md:hidden" />
              主要なご案内ページ
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              同じ川口市内の各エリアページ、自社式場・火葬場のご案内、主なプランをまとめています。
              ご家族のお住まいや状況に合わせて、あわせてご覧ください。
            </p>
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

      <AreaDetailCta area={areaKawaguchi} />
    </>
  );
}
