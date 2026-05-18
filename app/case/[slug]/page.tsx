import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailIntro } from "@/components/case/CaseDetailIntro";
import {
  CaseCostBreakdown,
  CaseCta,
  CaseRelated,
  CaseStory,
} from "@/components/case/CaseDetailBody";
import { getAllCaseSlugs, getCase } from "@/lib/cases";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) {
    return { title: "施行事例が見つかりません | 川口典礼" };
  }
  return {
    title: `${c.title} | 川口典礼 施行事例`,
    description: c.metaDescription,
    alternates: { canonical: `/case/${c.slug}/` },
    openGraph: {
      title: `${c.title} | 川口典礼 施行事例`,
      description: c.metaDescription,
      url: `/case/${c.slug}/`,
      type: "article",
      publishedTime: c.publishedAt,
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = getCase(slug);
  if (!caseItem) {
    notFound();
  }

  return (
    <>
      <CaseDetailIntro caseItem={caseItem} />
      <CaseStory caseItem={caseItem} />
      <CaseCostBreakdown caseItem={caseItem} />
      <CaseRelated caseItem={caseItem} />
      <CaseCta caseItem={caseItem} />
    </>
  );
}
