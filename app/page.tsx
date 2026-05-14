import { AccessSection } from "@/components/home/AccessSection";
import { AreasSection } from "@/components/home/AreasSection";
import { CasesSection } from "@/components/home/CasesSection";
import { CostEstimateSection } from "@/components/home/CostEstimateSection";
import { EmergencySection } from "@/components/home/EmergencySection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HallSection } from "@/components/home/HallSection";
import { Hero } from "@/components/home/Hero";
import { MeguriSection } from "@/components/home/MeguriSection";
import { PlanSection } from "@/components/home/PlanSection";
import { VoicesSection } from "@/components/home/VoicesSection";

export default function Home() {
  return (
    <>
      <Hero />
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
    </>
  );
}
