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

export const metadata: Metadata = {
  title: areaKawaguchi.metaTitle,
  description: areaKawaguchi.metaDescription,
  alternates: { canonical: `/area/${areaKawaguchi.slug}/` },
  openGraph: {
    title: areaKawaguchi.metaTitle,
    description: areaKawaguchi.metaDescription,
    url: `/area/${areaKawaguchi.slug}/`,
    type: "article",
  },
};

export default function KawaguchiAreaPage() {
  return (
    <>
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
