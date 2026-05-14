import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VoiceDetailIntro } from "@/components/voice/VoiceDetailIntro";
import {
  VoiceCta,
  VoiceLong,
  VoiceRelated,
  VoiceSurvey,
} from "@/components/voice/VoiceDetailBody";
import { getAllVoiceSlugs, getVoice } from "@/lib/voices";

type Props = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <>
      <VoiceDetailIntro voice={voice} />
      <VoiceLong voice={voice} />
      <VoiceSurvey voice={voice} />
      <VoiceRelated voice={voice} />
      <VoiceCta voice={voice} />
    </>
  );
}
