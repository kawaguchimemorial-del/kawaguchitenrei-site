import type { Metadata } from "next";
import { company } from "@/lib/company";
import { voices } from "@/lib/voices";
import { lpPlans, type LpPlan } from "./lp-data";
import { LpContent } from "./LpContent";

export const metadata: Metadata = {
  title: "川口市の家族葬・一日葬・直葬｜24時間ご相談受付｜川口典礼",
  description:
    "川口市・新井宿の自社式場、川口メモリアルホール。お迎え・ご安置から費用のご相談まで、24時間365日お電話を受け付けています。通常価格と別途費用を分けてご案内します。",
  alternates: { canonical: "https://kawaguchitenrei.com/lp/" },
};
const featured = ["direct-funeral", "oneday-funeral", "family-funeral"].map(
  (slug) => lpPlans.find((p) => p.slug === slug)!,
);
const otherPlans = lpPlans.filter((p) => !featured.includes(p));
const quotes = voices.filter((v) =>
  ["oneday-careful-guidance", "cremation-clear-pricing"].includes(v.slug),
);

function displayPlan(p: LpPlan) {
  const {
    slug,
    name,
    people,
    days,
    mainAmount,
    mainSuffix,
    mainPrice,
    memberPrice,
    href,
    lead,
  } = p;
  return {
    slug,
    name,
    people,
    days,
    mainAmount,
    mainSuffix,
    mainPrice,
    memberPrice,
    href,
    lead,
  };
}
export default function LpPage() {
  return (
    <LpContent
      featured={featured.map(displayPlan)}
      otherPlans={otherPlans.map(displayPlan)}
      quotes={quotes.map(({ slug, comment }) => ({ slug, comment }))}
      company={{
        yearsInBusiness: company.yearsInBusiness,
        address: company.address,
      }}
    />
  );
}
