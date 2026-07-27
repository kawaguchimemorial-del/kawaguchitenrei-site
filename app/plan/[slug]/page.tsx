import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlanDetailIntro } from "@/components/plan/PlanDetailIntro";
import {
  PlanAdditional,
  PlanCitizenFuneralBody,
  PlanCompatibleHalls,
  PlanConclusionBox,
  PlanCostGuide,
  PlanCta,
  PlanFaq,
  PlanFlow,
  PlanFormatGuide,
  PlanInclusions,
  PlanNonReligiousBody,
  PlanRelated,
  PlanSimpleAlternative,
} from "@/components/plan/PlanDetailBody";
import {
  PlanYugureBody,
  YugureComparison,
  YugureCta,
} from "@/components/plan/PlanYugureBody";
import { getAllPlanSlugs, getPlan, type Plan } from "@/lib/plans";

const SITE_URL = "https://kawaguchitenrei.com";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildOffers(plan: Plan) {
  // 無宗教葬は新規価格を出さないため Offer は付与しない
  if (plan.nonReligiousInfo) {
    return undefined;
  }
  // 川口市民葬の仕様1・仕様2を Offer 配列で出す（公式と整合：仕様1=231,000円/補助40,000円、仕様2=143,000円/補助20,000円）
  if (plan.citizenFuneralInfo) {
    const offers = plan.citizenFuneralInfo.specs.map((spec) => {
      const numericPrice = Number(spec.price.replace(/[^0-9]/g, ""));
      return {
        "@type": "Offer",
        priceCurrency: "JPY",
        price: Number.isFinite(numericPrice) ? numericPrice : undefined,
        name: `${plan.name} ${spec.scope}`,
        description: `${spec.scope}向けの仕様。${spec.price}。${spec.subsidy}。式場使用料・火葬料(川口市めぐりの森使用料)・供花・飲食代・遺影写真・寺院費用などが別途必要になる場合があります。`,
        availability: "https://schema.org/InStock",
      };
    });
    return offers.length > 0 ? offers : undefined;
  }

  if (!plan.pricing) return undefined;
  if (plan.pricing.type === "member-regular") {
    return [
      {
        "@type": "Offer",
        priceCurrency: "JPY",
        price: plan.pricing.member,
        description: `事前相談会員価格 ${plan.pricing.member.toLocaleString("ja-JP")}円(税込)から。通常価格 ${plan.pricing.regular.toLocaleString("ja-JP")}円(税込)。別途、火葬料・式場使用料・宗教者へのお礼などが必要になる場合があります。`,
        availability: "https://schema.org/InStock",
      },
    ];
  }
  return [
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: plan.pricing.citizen,
      description: `川口市民 葬祭事業価格 ${plan.pricing.citizen.toLocaleString("ja-JP")}円(税込)。式場使用料・火葬料(川口市めぐりの森使用料)・宗教者費用などが別途必要になる場合があります。`,
      availability: "https://schema.org/InStock",
    },
  ];
}

function buildPlanJsonLd(plan: Plan) {
  const pageUrl = `${SITE_URL}/plan/${plan.slug}/`;

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
        name: "葬儀プラン",
        item: `${SITE_URL}/plan/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: plan.name,
        item: pageUrl,
      },
    ],
  };

  const offers = buildOffers(plan);
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: plan.name,
    description: plan.long,
    serviceType: plan.name,
    url: pageUrl,
    provider: {
      "@type": "FuneralHome",
      name: "川口典礼",
      url: `${SITE_URL}/`,
      telephone: "0120-963-765",
      address: {
        "@type": "PostalAddress",
        postalCode: "333-0833",
        addressCountry: "JP",
        addressRegion: "埼玉県",
        addressLocality: "川口市",
        streetAddress: "西新井宿440-1",
      },
    },
    areaServed: {
      "@type": "City",
      name: "埼玉県川口市",
    },
    ...(offers ? { offers } : {}),
  };

  const displayedFaqs = plan.nonReligiousInfo
    ? plan.nonReligiousInfo.faqs
    : plan.citizenFuneralInfo
    ? plan.citizenFuneralInfo.faqs
    : plan.faqs;
  const faqPage =
    displayedFaqs && displayedFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: displayedFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : undefined;

  return { breadcrumb, service, faqPage };
}

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
  const pageTitle = plan.metaTitle ?? `${plan.name} | 川口典礼の葬儀プラン`;
  return {
    title: pageTitle,
    description: plan.metaDescription,
    alternates: {
      canonical: `/plan/${plan.slug}/`,
    },
    openGraph: {
      title: pageTitle,
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

  const { breadcrumb, service, faqPage } = buildPlanJsonLd(plan);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}

      <PlanDetailIntro plan={plan} />
      {plan.yugureInfo ? (
        <>
          <PlanYugureBody plan={plan} />
          <PlanFaq plan={plan} />
          <YugureComparison plan={plan} />
          <YugureCta plan={plan} />
          <PlanRelated plan={plan} />
        </>
      ) : plan.nonReligiousInfo ? (
        <PlanNonReligiousBody plan={plan} />
      ) : plan.citizenFuneralInfo ? (
        <PlanCitizenFuneralBody plan={plan} />
      ) : (
        <>
          <PlanConclusionBox plan={plan} />
          <PlanFormatGuide plan={plan} />
          <PlanInclusions plan={plan} />
          <PlanSimpleAlternative plan={plan} />
          <PlanFlow plan={plan} />
          <PlanAdditional plan={plan} />
          <PlanCostGuide plan={plan} />
          <PlanCompatibleHalls plan={plan} />
          <PlanFaq plan={plan} />
          <PlanRelated plan={plan} />
        </>
      )}
      {!plan.yugureInfo && <PlanCta plan={plan} />}
    </>
  );
}
