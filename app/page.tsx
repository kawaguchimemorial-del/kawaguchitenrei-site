import type { Metadata } from "next";
import { AccessSection } from "@/components/home/AccessSection";
import { AreasSection } from "@/components/home/AreasSection";
import { CasesSection } from "@/components/home/CasesSection";
import { CostEstimateSection } from "@/components/home/CostEstimateSection";
import { EmergencySection } from "@/components/home/EmergencySection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HallSection } from "@/components/home/HallSection";
import { Hero } from "@/components/home/Hero";
import { MediaLinksSection } from "@/components/home/MediaLinksSection";
import { MeguriSection } from "@/components/home/MeguriSection";
import { PlanSection } from "@/components/home/PlanSection";
import { ThreeStrengthsSection } from "@/components/home/ThreeStrengthsSection";
import { VoicesSection } from "@/components/home/VoicesSection";

const SITE_URL = "https://kawaguchitenrei-site-psi.vercel.app";
const pageTitle =
  "川口典礼 | 川口市・新井宿の葬儀・家族葬 | 川口メモリアルホール";
const pageDescription =
  "川口市・新井宿の地域密着葬儀社。川口メモリアルホールを中心に、家族葬・一日葬・直葬・市民葬まで対応。川口市めぐりの森、戸田葬祭場、谷塚斎場での火葬・葬儀相談も24時間365日承ります。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    type: "website",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FuneralHome",
  name: "川口典礼",
  url: `${SITE_URL}/`,
  telephone: "0120-963-765",
  image: `${SITE_URL}/images/home/hall/hall-exterior.jpg`,
  address: {
    "@type": "PostalAddress",
    postalCode: "333-0833",
    addressCountry: "JP",
    addressRegion: "埼玉県",
    addressLocality: "川口市",
    streetAddress: "西新井宿440-1",
  },
  areaServed: [
    { "@type": "City", name: "川口市" },
    { "@type": "AdministrativeArea", name: "新井宿" },
    { "@type": "AdministrativeArea", name: "埼玉県南部" },
  ],
  description:
    "川口市・新井宿の地域密着葬儀社。家族葬・一日葬・直葬・市民葬、川口市めぐりの森・戸田葬祭場・谷塚斎場の利用相談に対応。24時間365日受付。",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ThreeStrengthsSection />
      <EmergencySection />
      <CostEstimateSection />
      <PlanSection />
      <HallSection />
      <MeguriSection />
      <CasesSection />
      <VoicesSection />
      <FaqSection />
      <AreasSection />
      <AccessSection />
      <FinalCtaSection />
      <MediaLinksSection />
    </>
  );
}
