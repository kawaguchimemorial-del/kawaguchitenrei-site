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
} from "@/components/saijo/SaijoDetailExtras";
import { saijoMegurinomori } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei-site-psi.vercel.app";
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
      name: "斎場・火葬場",
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
      <SaijoGallery saijo={saijoMegurinomori} />
      <SaijoFeatures saijo={saijoMegurinomori} />
      <SaijoFlow saijo={saijoMegurinomori} />
      <SaijoOurSupport saijo={saijoMegurinomori} />
      <SaijoAvailablePlans saijo={saijoMegurinomori} />
      <SaijoFacilityInfo saijo={saijoMegurinomori} />
      <SaijoCremationFees saijo={saijoMegurinomori} />
      <SaijoAccess saijo={saijoMegurinomori} />
      <SaijoFaq saijo={saijoMegurinomori} />
      <SaijoCta saijo={saijoMegurinomori} />
    </>
  );
}
