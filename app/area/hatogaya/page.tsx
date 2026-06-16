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
import { areaHatogaya } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaHatogaya.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaHatogaya.metaTitle,
  description: areaHatogaya.metaDescription,
  alternates: { canonical: `/area/${areaHatogaya.slug}/` },
  openGraph: {
    title: areaHatogaya.metaTitle,
    description: areaHatogaya.metaDescription,
    url: `/area/${areaHatogaya.slug}/`,
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
      name: "鳩ヶ谷",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaHatogaya.faqs.map((f) => ({
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
    name: "埼玉県川口市鳩ヶ谷",
  },
  description:
    "川口市鳩ヶ谷・南鳩ヶ谷周辺で葬儀・家族葬・直葬・一日葬を承る葬儀社。搬送・安置・ご葬儀・火葬場(川口市めぐりの森)利用の手配まで、ご家族の状況に合わせて一貫してサポートします。",
};

const relatedLinks = [
  {
    label: "川口市の葬儀・家族葬",
    description: "川口市全体の葬儀・対応エリアのご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
  {
    label: "南鳩ヶ谷の葬儀・家族葬",
    description: "南鳩ヶ谷エリアの葬儀・家族葬のご案内",
    href: "/area/minami-hatogaya/",
  },
  {
    label: "川口元郷の葬儀・家族葬",
    description: "川口元郷エリアの葬儀・家族葬のご案内",
    href: "/area/kawaguchi-motogo/",
  },
  {
    label: "戸塚安行の葬儀・家族葬",
    description: "戸塚安行エリアの葬儀・家族葬のご案内",
    href: "/area/tozuka-angyo/",
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
    description: "鳩ヶ谷エリアからも利用できる公営火葬場",
    href: "/saijo/megurinomori/",
  },
  {
    label: "川口市内の寺院会館・民営式場（朝日・南鳩ヶ谷方面）",
    description: "鳩ヶ谷・南鳩ヶ谷方面で利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。",
    href: "/saijo/#asahi-minami-hatogaya",
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
  {
    label: "施行事例",
    description: "川口典礼でお手伝いした葬儀の施行事例を確認できます。",
    href: "/case/",
  },
];

export default function HatogayaAreaPage() {
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

      <AreaDetailIntro area={areaHatogaya} />
      <AreaPrimaryHall
        area={areaHatogaya}
        description="鳩ヶ谷エリアからのご葬儀の主な拠点となる、川口典礼の自社ホール。1日1組貸切の落ち着いた式場で、家族葬・一日葬に適した規模です。川口市めぐりの森(火葬場)まで車で約5分の立地で、鳩ヶ谷からのお別れの段取りもスムーズです。"
      />
      <AreaFeatures area={areaHatogaya} />
      <AreaPlans area={areaHatogaya} />
      <AreaSaijo area={areaHatogaya} />
      <AreaReasons area={areaHatogaya} />
      <AreaFlow area={areaHatogaya} />
      <AreaFaq area={areaHatogaya} />

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
              鳩ヶ谷の葬儀を検討する方へ、
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

      <AreaDetailCta area={areaHatogaya} />
    </>
  );
}
