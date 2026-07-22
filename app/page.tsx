import type { Metadata } from "next";
import { AccessSection } from "@/components/home/AccessSection";
import { AdvanceConsultSection } from "@/components/home/AdvanceConsultSection";
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
import { ReviewBadge } from "@/components/home/ReviewBadge";
import { ThreeStrengthsSection } from "@/components/home/ThreeStrengthsSection";
import { VoicesSection } from "@/components/home/VoicesSection";
import { getHomeFaqs } from "@/lib/faqs";
import { getLocalBusinessJsonLd } from "@/lib/company";

const pageTitle =
  "川口市の葬儀・葬儀社なら川口典礼 | 創業20年・24時間365日対応";
const pageDescription =
  "川口市めぐりの森まで車で約5分、駐車場70台の自社式場・川口メモリアルホール。直葬は事前相談会員価格139,000円(税込)〜、家族葬は528,000円(税込)〜。創業20年・年間約260件の川口典礼が、川口市・新井宿・鳩ヶ谷の葬儀を24時間365日受け付けています。一日葬・火葬式・川口市民葬もご相談ください。";

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

const organizationJsonLd = getLocalBusinessJsonLd();

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: getHomeFaqs().map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <ReviewBadge />
      <AdvanceConsultSection />
      <ThreeStrengthsSection />
      <EmergencySection />
      <CostEstimateSection />
      <PlanSection />
      <HallSection />
      <MeguriSection />
      <CasesSection />
      <VoicesSection />
      <MediaLinksSection />
      <FaqSection />
      <AreasSection />
      <AccessSection />
      <FinalCtaSection />
    </>
  );
}
