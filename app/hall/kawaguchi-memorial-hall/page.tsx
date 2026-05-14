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

export const metadata: Metadata = {
  title: `${hallKawaguchi.name} | 川口典礼の自社ホール`,
  description: hallKawaguchi.metaDescription,
  alternates: { canonical: `/hall/${hallKawaguchi.slug}/` },
  openGraph: {
    title: `${hallKawaguchi.name} | 川口典礼の自社ホール`,
    description: hallKawaguchi.metaDescription,
    url: `/hall/${hallKawaguchi.slug}/`,
    type: "article",
  },
};

export default function KawaguchiMemorialHallPage() {
  return (
    <>
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
