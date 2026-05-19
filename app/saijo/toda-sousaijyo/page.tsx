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
} from "@/components/saijo/SaijoDetailExtras";
import { saijoTodaSousaijyo } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei-site-psi.vercel.app";
const pageUrl = `${SITE_URL}/saijo/${saijoTodaSousaijyo.slug}/`;
const imageUrl = `${SITE_URL}/images/saijo/toda-sousaijyo/exterior.png`;

const defaultTitle = `${saijoTodaSousaijyo.name}での葬儀 | 川口典礼`;
const pageTitle = saijoTodaSousaijyo.metaTitle ?? defaultTitle;

export const metadata: Metadata = {
  title: pageTitle,
  description: saijoTodaSousaijyo.metaDescription,
  alternates: { canonical: `/saijo/${saijoTodaSousaijyo.slug}/` },
  openGraph: {
    title: pageTitle,
    description: saijoTodaSousaijyo.metaDescription,
    url: `/saijo/${saijoTodaSousaijyo.slug}/`,
    type: "article",
    images: [
      {
        url: "/images/saijo/toda-sousaijyo/exterior.png",
        width: 1200,
        height: 800,
        alt: "戸田葬祭場の外観",
      },
    ],
  },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "戸田葬祭場",
  alternateName: "戸田斎場",
  address: {
    "@type": "PostalAddress",
    postalCode: "174-0041",
    addressCountry: "JP",
    addressRegion: "東京都",
    addressLocality: "板橋区",
    streetAddress: "舟渡四丁目15番1号",
  },
  telephone: "03-3966-4241",
  url: pageUrl,
  image: imageUrl,
  description:
    "戸田葬祭場は、東京都板橋区舟渡にある火葬場併設斎場です。川口典礼では、戸田葬祭場での葬儀相談、搬送、安置、式場利用相談、火葬予約、当日の進行をサポートします。",
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
      name: "戸田葬祭場",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: saijoTodaSousaijyo.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function TodaSousaijyoPage() {
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
      <SaijoDetailIntro saijo={saijoTodaSousaijyo} />
      <SaijoImportantNotice saijo={saijoTodaSousaijyo} />
      <SaijoGallery saijo={saijoTodaSousaijyo} />
      <SaijoFeatures saijo={saijoTodaSousaijyo} />
      <SaijoCremationFurnaces saijo={saijoTodaSousaijyo} />
      <SaijoHallRooms saijo={saijoTodaSousaijyo} />
      <SaijoCremationWaitingRooms saijo={saijoTodaSousaijyo} />
      <SaijoFlow saijo={saijoTodaSousaijyo} />
      <SaijoOurSupport saijo={saijoTodaSousaijyo} />
      <SaijoAvailablePlans saijo={saijoTodaSousaijyo} />
      <SaijoFacilityInfo saijo={saijoTodaSousaijyo} />
      <SaijoFeeTables saijo={saijoTodaSousaijyo} />
      <SaijoAccess saijo={saijoTodaSousaijyo} />
      <SaijoFaq saijo={saijoTodaSousaijyo} />
      <SaijoCta saijo={saijoTodaSousaijyo} />
    </>
  );
}
