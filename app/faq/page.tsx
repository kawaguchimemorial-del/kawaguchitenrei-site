import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PhoneIcon } from "@/components/common/icons";
import { UrgentCallout } from "@/components/forms/UrgentCallout";
import { faqCategories, faqs, getFaqsByCategory } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "よくある質問 | 川口典礼",
  description:
    "川口典礼によくいただくご質問を、急なご葬儀・費用・プラン・斎場・事前相談・対応エリア・葬儀後サポートの7カテゴリに整理しました。川口市・新井宿の地域密着葬儀社。",
  alternates: { canonical: "/faq/" },
};

// FAQPage 構造化データを生成
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // FAQPage Rich Result 用の構造化データ
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        subLabel="よくある質問"
        title={
          <>
            葬儀前によくいただく、
            <br className="md:hidden" />
            ご質問。
          </>
        }
        description={
          <p>
            急なご葬儀のとき、事前にご検討いただくとき、それぞれのタイミングでよくお寄せいただくご質問をまとめました。お探しのご質問が見つからない場合は、お電話または事前相談フォームでお気軽にお問い合わせください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "よくある質問" },
        ]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <UrgentCallout />
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Index
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            カテゴリから探す
          </p>
          <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
            ご質問の{faqCategories.length}カテゴリ。
          </h2>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {faqCategories.map((cat) => {
              const count = getFaqsByCategory(cat.slug).length;
              return (
                <li key={cat.slug}>
                  <a
                    href={`#cat-${cat.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-lg border border-line bg-white px-5 py-4 transition hover:border-brand"
                  >
                    <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                      {cat.title}
                    </p>
                    <p className="mt-auto text-xs font-semibold text-ink-soft">
                      {count}件のご質問
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {faqCategories.map((cat, idx) => {
        const items = getFaqsByCategory(cat.slug);
        if (items.length === 0) return null;
        const bg = idx % 2 === 0 ? "bg-white" : "bg-paper";
        return (
          <section
            key={cat.slug}
            id={`cat-${cat.slug}`}
            className={`scroll-mt-24 ${bg} py-16 md:py-20`}
          >
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Category {String(idx + 1).padStart(2, "0")}
              </p>
              <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
                {cat.title}
              </h2>
              <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg">
                {cat.description}
              </p>

              <ul className="mt-8 space-y-3">
                {items.map((faq) => (
                  <li key={faq.id} id={faq.id} className="scroll-mt-24">
                    <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                        <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                          <span aria-hidden className="font-serif-jp text-brand">
                            Q.
                          </span>
                          <span>{faq.question}</span>
                        </span>
                        <span
                          aria-hidden
                          className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                        <span
                          aria-hidden
                          className="font-serif-jp mr-2 font-bold text-brand"
                        >
                          A.
                        </span>
                        {faq.answer}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-right">
                <a
                  href="#top"
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
                >
                  カテゴリ一覧に戻る
                  <span aria-hidden>↑</span>
                </a>
              </div>
            </div>
          </section>
        );
      })}

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
            お探しのご質問が
            <br className="md:hidden" />
            見つからない場合は。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            お電話または事前相談フォームから、お気軽にお問い合わせください。事前相談・お見積りは無料です。
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
