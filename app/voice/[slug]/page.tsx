import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VoiceDetailIntro } from "@/components/voice/VoiceDetailIntro";
import {
  VoiceCta,
  VoiceLong,
  VoiceSurvey,
} from "@/components/voice/VoiceDetailBody";
import { getAllVoiceSlugs, getVoice, type Voice } from "@/lib/voices";

const SITE_URL = "https://kawaguchitenrei.com";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildVoiceJsonLd(v: Voice) {
  const pageUrl = `${SITE_URL}/voice/${v.slug}/`;

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
        name: "お客様の声",
        item: `${SITE_URL}/voice/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: v.title,
        item: pageUrl,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: v.title,
    description: v.metaDescription,
    datePublished: v.publishedAt,
    dateModified: v.publishedAt,
    author: {
      "@type": "Organization",
      name: "川口典礼",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "川口典礼",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    articleSection: "お客様の声",
    about: "葬儀のお客様アンケート",
    mainEntityOfPage: pageUrl,
  };

  return { breadcrumb, article };
}

export async function generateStaticParams() {
  return getAllVoiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVoice(slug);
  if (!v) {
    return { title: "お客様の声が見つかりません | 川口典礼" };
  }
  return {
    title: `${v.title} | 川口典礼 お客様の声`,
    description: v.metaDescription,
    alternates: { canonical: `/voice/${v.slug}/` },
    openGraph: {
      title: `${v.title} | 川口典礼 お客様の声`,
      description: v.metaDescription,
      url: `/voice/${v.slug}/`,
      type: "article",
      publishedTime: v.publishedAt,
    },
  };
}

export default async function VoiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const voice = getVoice(slug);
  if (!voice) {
    notFound();
  }

  const { breadcrumb, article } = buildVoiceJsonLd(voice);

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

      <VoiceDetailIntro voice={voice} />
      <VoiceLong voice={voice} />
      <VoiceSurvey voice={voice} />
      <VoiceCta />
    </>
  );
}
