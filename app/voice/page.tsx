import type { Metadata } from "next";
import { ArrowRightIcon, PhoneIcon } from "@/components/common/icons";
import { PageHero } from "@/components/common/PageHero";
import { VoiceFilterList } from "@/components/voice/VoiceFilterList";
import { company } from "@/lib/company";
import { voices } from "@/lib/voices";

const SITE_URL = "https://kawaguchitenrei.com";

export const metadata: Metadata = {
  title: "川口の葬儀・家族葬 お客様の声｜川口典礼",
  description:
    "川口市で川口典礼にご葬儀をご依頼いただいたご家族の声を掲載。家族葬・一日葬・直葬などのご感想と、お客様アンケートをご紹介しています。",
  alternates: { canonical: "/voice/" },
  openGraph: {
    title: "川口の葬儀・家族葬 お客様の声｜川口典礼",
    description:
      "川口市で川口典礼にご葬儀をご依頼いただいたご家族の声を掲載。家族葬・一日葬・直葬などのご感想と、お客様アンケートをご紹介しています。",
    url: "/voice/",
    type: "website",
    siteName: "川口典礼",
    locale: "ja_JP",
    images: [
      {
        url: "/images/home/hall/hall-exterior.jpg",
        width: 1200,
        height: 800,
        alt: "川口メモリアルホールの外観",
      },
    ],
  },
};

const sortedVoices = [...voices].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

const breadcrumbJsonLd = {
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
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "川口典礼のお客様の声一覧",
  numberOfItems: sortedVoices.length,
  itemListElement: sortedVoices.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/voice/${v.slug}/`,
    name: v.title,
  })),
};

export default function VoiceIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHero
        eyebrow="Voices"
        subLabel="お客様の声一覧"
        title={
          <>
            ご利用いただいた
            <br className="md:hidden" />
            ご家族のお声。
          </>
        }
        description={
          <p>
            川口典礼でお見送りをお手伝いしたご家族から、お客様アンケートと感想をお寄せいただいています。掲載は個人情報を確認のうえ、ご家族の許可を得たものです。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "お客様の声" },
        ]}
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <VoiceFilterList />

          {company.googleReviewsUrl && (
            <div className="mt-10 rounded-lg border border-line bg-paper px-5 py-6 text-center md:px-8">
              <p className="text-sm leading-7 text-ink-mid md:text-base">
                Googleマップにも、ご利用いただいた方の口コミが寄せられています。第三者の口コミもあわせてご確認いただけます。
              </p>
              <a
                href={company.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                Googleマップの口コミを見る
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-lg border border-line-soft bg-cool p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                  Policy
                </p>
                <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
                  お客様の声の掲載方針
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  ご家族の許可をいただいたうえで掲載しています。お名前や個人を特定する情報はマスキングし、お客様のお言葉そのものを大切に扱っています。
                </p>
              </div>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-paper"
              >
                ご相談はこちら
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            ご家族のお気持ちに、
            <br className="md:hidden" />
            寄り添うお手伝いを。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            費用や流れだけ知りたい、というご相談も歓迎しています。お電話または事前相談フォームでお気軽にお問い合わせください。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <PhoneIcon className="h-7 w-7" />
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  電話で相談する
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/90">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              事前相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
