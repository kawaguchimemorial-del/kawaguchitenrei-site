import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { SurveyForm } from "./SurveyForm";

export const metadata: Metadata = {
  title: "お客様アンケート | 川口典礼",
  description:
    "川口典礼をご利用いただいたお客様向けのアンケートフォームです。",
  alternates: { canonical: "/voice/survey/" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function VoiceSurveyPage() {
  return (
    <>
      <PageHero
        eyebrow="Survey"
        subLabel="お客様アンケート"
        title={
          <>
            ご葬儀を終えられたご家族へ、
            <br className="md:hidden" />
            アンケートのお願い。
          </>
        }
        description={
          <p>
            この度は、ご葬儀をお任せいただきありがとうございました。今後のサービス改善のため、お時間のあるときにアンケートへのご協力をお願いいたします。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "お客様の声", href: "/voice/" },
          { label: "お客様アンケート" },
        ]}
      />

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SurveyForm />
        </div>
      </section>
    </>
  );
}
