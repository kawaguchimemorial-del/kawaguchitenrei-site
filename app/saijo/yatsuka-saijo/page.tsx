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
import { saijoYatsuka } from "@/lib/saijo";

const SITE_URL = "https://kawaguchitenrei-site-psi.vercel.app";
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
      <SaijoOurSupport saijo={saijoYatsuka} />
      <SaijoAvailablePlans saijo={saijoYatsuka} />
      <SaijoFacilityInfo saijo={saijoYatsuka} />
      <SaijoFeeTables saijo={saijoYatsuka} />
      <SaijoAccess saijo={saijoYatsuka} />
      <SaijoFaq saijo={saijoYatsuka} />
      <SaijoCta saijo={saijoYatsuka} />
    </>
  );
}
