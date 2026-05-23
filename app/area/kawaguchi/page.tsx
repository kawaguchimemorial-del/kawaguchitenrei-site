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
      <AreaDetailCta area={areaKawaguchi} />
    </>
  );
}
