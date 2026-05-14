import type { Metadata } from "next";
import { SaijoDetailIntro } from "@/components/saijo/SaijoDetailIntro";
import {
  SaijoAvailablePlans,
  SaijoFacilityInfo,
  SaijoFeatures,
  SaijoOurSupport,
} from "@/components/saijo/SaijoDetailMain";
import {
  SaijoAccess,
  SaijoCta,
  SaijoFaq,
} from "@/components/saijo/SaijoDetailExtras";
import { saijoMegurinomori } from "@/lib/saijo";

export const metadata: Metadata = {
  title: `${saijoMegurinomori.name}での葬儀 | 川口典礼`,
  description: saijoMegurinomori.metaDescription,
  alternates: { canonical: `/saijo/${saijoMegurinomori.slug}/` },
  openGraph: {
    title: `${saijoMegurinomori.name}での葬儀 | 川口典礼`,
    description: saijoMegurinomori.metaDescription,
    url: `/saijo/${saijoMegurinomori.slug}/`,
    type: "article",
  },
};

export default function MegurinomoriPage() {
  return (
    <>
      <SaijoDetailIntro saijo={saijoMegurinomori} />
      <SaijoFeatures saijo={saijoMegurinomori} />
      <SaijoOurSupport saijo={saijoMegurinomori} />
      <SaijoAvailablePlans saijo={saijoMegurinomori} />
      <SaijoFacilityInfo saijo={saijoMegurinomori} />
      <SaijoAccess saijo={saijoMegurinomori} />
      <SaijoFaq saijo={saijoMegurinomori} />
      <SaijoCta saijo={saijoMegurinomori} />
    </>
  );
}
