import type { Metadata } from "next";
import { HallDetailIntro } from "@/components/hall/HallDetailIntro";
import {
  HallEquipment,
  HallFeatures,
  HallGallery,
  HallSupportedPlans,
} from "@/components/hall/HallDetailMain";
import {
  HallAccess,
  HallCta,
  HallFaq,
} from "@/components/hall/HallDetailExtras";
import { hallKawaguchi } from "@/lib/halls";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/hall/${hallKawaguchi.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;
const pageTitle = `${hallKawaguchi.name} | 川口典礼の自社ホール`;

export const metadata: Metadata = {
  title: pageTitle,
  description: hallKawaguchi.metaDescription,
  alternates: { canonical: `/hall/${hallKawaguchi.slug}/` },
  openGraph: {
    title: pageTitle,
    description: hallKawaguchi.metaDescription,
    url: `/hall/${hallKawaguchi.slug}/`,
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

const funeralHomeJsonLd = {
  "@context": "https://schema.org",
  "@type": "FuneralHome",
  name: "川口メモリアルホール",
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
  description:
    "川口メモリアルホールは、川口市新井宿にある川口典礼の自社式場です。家族葬・一日葬・直葬から一般葬まで対応し、駐車場70台を備えています。",
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
      name: "葬儀式場",
      item: `${SITE_URL}/hall/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "川口メモリアルホール",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hallKawaguchi.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function KawaguchiMemorialHallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(funeralHomeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HallDetailIntro hall={hallKawaguchi} />
      <HallFeatures hall={hallKawaguchi} />
      <HallGallery hall={hallKawaguchi} />
      <HallEquipment hall={hallKawaguchi} />
      <HallSupportedPlans hall={hallKawaguchi} />
      <HallAccess hall={hallKawaguchi} />
      <HallFaq hall={hallKawaguchi} />
      <HallCta hall={hallKawaguchi} />
    </>
  );
}
