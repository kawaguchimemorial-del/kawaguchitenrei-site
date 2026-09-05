import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailIntro } from "@/components/case/CaseDetailIntro";
import {
  CaseCostBreakdown,
  CaseCta,
  CaseRelated,
  CaseStory,
} from "@/components/case/CaseDetailBody";
import { getAllCaseSlugs, getCase, type CaseRecord } from "@/lib/cases";
import { defaultOpenGraphImages } from "@/lib/seo";

const SITE_URL = "https://kawaguchitenrei.com";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildCaseJsonLd(c: CaseRecord) {
  const pageUrl = `${SITE_URL}/case/${c.slug}/`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "川口典礼",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "施行事例",
        item: `${SITE_URL}/case/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.title,
        item: pageUrl,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.metaDescription,
    datePublished: c.publishedAt,
    dateModified: c.publishedAt,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "川口典礼",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "川口典礼",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    articleSection: "施行事例",
    about: c.format,
    mainEntityOfPage: pageUrl,
    ...(c.photo ? { image: `${SITE_URL}${c.photo.src}` } : {}),
  };

  return { breadcrumb, article };
}

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
      images: c.photo ? [{ url: c.photo.src, alt: c.photo.alt }] : defaultOpenGraphImages,
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = getCase(slug);
  if (!caseItem) {
    notFound();
  }

  const { breadcrumb, article } = buildCaseJsonLd(caseItem);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />

      <CaseDetailIntro caseItem={caseItem} />
      <CaseStory caseItem={caseItem} />
      <CaseCostBreakdown caseItem={caseItem} />
      <CaseRelated caseItem={caseItem} />
      <CaseCta caseItem={caseItem} />
    </>
  );
}
