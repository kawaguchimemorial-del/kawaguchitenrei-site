import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { voices } from "@/lib/voices";

const SITE_URL = "https://kawaguchitenrei.com";

export const metadata: Metadata = {
  title: "お客様の声一覧 | 川口典礼",
  description:
    "川口典礼でご葬儀を執り行ったご家族から、ご利用いただいた感想をお寄せいただいています。お客様アンケートと感想本文を掲載しています。",
  alternates: { canonical: "/voice/" },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p
      aria-label={`5段階中${clamped}の評価`}
      className="flex items-center gap-2"
    >
      <span aria-hidden className="text-base tracking-[0.18em] text-gold">
        {"★".repeat(clamped)}
        <span className="text-gold/30">{"★".repeat(5 - clamped)}</span>
      </span>
      <span className="text-xs font-semibold text-ink-soft">
        5段階中 {clamped}
      </span>
    </p>
  );
}

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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                All Voices
              </p>
              <p className="mt-2 font-serif-jp text-2xl font-medium text-ink-deep md:text-3xl">
                公開中のお声 {sortedVoices.length}件
              </p>
            </div>
            <p className="text-sm text-ink-soft">
              公開日が新しい順に表示しています
            </p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {sortedVoices.map((voice) => (
              <li key={voice.slug}>
                <a
                  href={`/voice/${voice.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md"
                >
                  {voice.surveyImage && (
                    <div className="relative aspect-[4/3] bg-warm">
                      <Image
                        src={voice.surveyImage.src}
                        alt={voice.surveyImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                    <p className="text-xs text-ink-soft">
                      {formatDate(voice.publishedAt)} 公開
                    </p>

                    <p className="font-serif-jp text-xl font-medium leading-[1.55] text-ink-deep group-hover:text-brand md:text-2xl">
                      「{voice.title}」
                    </p>

                    <StarRating rating={voice.rating} />

                    <blockquote className="border-l-2 border-brand pl-4 text-sm leading-8 text-ink-mid md:text-base">
                      {voice.comment}
                    </blockquote>

                    <div className="mt-auto flex items-center justify-between text-sm">
                      <span className="text-ink-soft">{voice.family}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-brand group-hover:underline">
                        詳しく見る
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
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
                <span aria-hidden>→</span>
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
              <span aria-hidden className="text-2xl">
                ☎
              </span>
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
