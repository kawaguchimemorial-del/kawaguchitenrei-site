import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlanDetailIntro } from "@/components/plan/PlanDetailIntro";
import {
  PlanAdditional,
  PlanCitizenFuneralBody,
  PlanCompatibleHalls,
  PlanCta,
  PlanFaq,
  PlanFlow,
  PlanInclusions,
  PlanSimpleAlternative,
} from "@/components/plan/PlanDetailBody";
import { getAllPlanSlugs, getPlan } from "@/lib/plans";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPlanSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) {
    return {
      title: "プランが見つかりません | 川口典礼",
    };
  }
  return {
    title: `${plan.name} | 川口典礼の葬儀プラン`,
    description: plan.metaDescription,
    alternates: {
      canonical: `/plan/${plan.slug}/`,
    },
    openGraph: {
      title: `${plan.name} | 川口典礼の葬儀プラン`,
      description: plan.metaDescription,
      url: `/plan/${plan.slug}/`,
      type: "article",
    },
  };
}

export default async function PlanDetailPage({ params }: Props) {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) {
    notFound();
  }

  return (
    <>
      <PlanDetailIntro plan={plan} />
      {plan.citizenFuneralInfo ? (
        <PlanCitizenFuneralBody plan={plan} />
      ) : (
        <>
          <PlanInclusions plan={plan} />
          <PlanSimpleAlternative plan={plan} />
          <PlanFlow plan={plan} />
          <PlanAdditional plan={plan} />
          <PlanCompatibleHalls plan={plan} />
          <PlanFaq plan={plan} />
        </>
      )}
      <PlanCta plan={plan} />
    </>
  );
}
