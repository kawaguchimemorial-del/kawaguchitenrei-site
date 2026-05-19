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
import { saijoTodaSousaijyo } from "@/lib/saijo";

const defaultTitle = `${saijoTodaSousaijyo.name}での葬儀 | 川口典礼`;
const pageTitle = saijoTodaSousaijyo.metaTitle ?? defaultTitle;

export const metadata: Metadata = {
  title: pageTitle,
  description: saijoTodaSousaijyo.metaDescription,
  alternates: { canonical: `/saijo/${saijoTodaSousaijyo.slug}/` },
  openGraph: {
    title: pageTitle,
    description: saijoTodaSousaijyo.metaDescription,
    url: `/saijo/${saijoTodaSousaijyo.slug}/`,
    type: "article",
  },
};

export default function TodaSousaijyoPage() {
  return (
    <>
      <SaijoDetailIntro saijo={saijoTodaSousaijyo} />
      <SaijoImportantNotice saijo={saijoTodaSousaijyo} />
      <SaijoGallery saijo={saijoTodaSousaijyo} />
      <SaijoFeatures saijo={saijoTodaSousaijyo} />
      <SaijoCremationFurnaces saijo={saijoTodaSousaijyo} />
      <SaijoHallRooms saijo={saijoTodaSousaijyo} />
      <SaijoCremationWaitingRooms saijo={saijoTodaSousaijyo} />
      <SaijoFlow saijo={saijoTodaSousaijyo} />
      <SaijoOurSupport saijo={saijoTodaSousaijyo} />
      <SaijoAvailablePlans saijo={saijoTodaSousaijyo} />
      <SaijoFacilityInfo saijo={saijoTodaSousaijyo} />
      <SaijoFeeTables saijo={saijoTodaSousaijyo} />
      <SaijoAccess saijo={saijoTodaSousaijyo} />
      <SaijoFaq saijo={saijoTodaSousaijyo} />
      <SaijoCta saijo={saijoTodaSousaijyo} />
    </>
  );
}
