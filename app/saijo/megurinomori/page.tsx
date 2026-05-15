import type { Metadata } from "next";
import { SaijoDetailIntro } from "@/components/saijo/SaijoDetailIntro";
import {
  SaijoAvailablePlans,
  SaijoCremationFees,
  SaijoFacilityInfo,
  SaijoFeatures,
  SaijoImportantNotice,
  SaijoOurSupport,
} from "@/components/saijo/SaijoDetailMain";
import {
  SaijoAccess,
  SaijoCta,
  SaijoFaq,
} from "@/components/saijo/SaijoDetailExtras";
import { saijoMegurinomori } from "@/lib/saijo";

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
  },
};

export default function MegurinomoriPage() {
  return (
    <>
      <SaijoDetailIntro saijo={saijoMegurinomori} />
      <SaijoImportantNotice saijo={saijoMegurinomori} />
      <SaijoFeatures saijo={saijoMegurinomori} />
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
