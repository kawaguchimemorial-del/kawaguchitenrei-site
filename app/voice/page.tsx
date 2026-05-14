import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { voices } from "@/lib/voices";

export const metadata: Metadata = {
  title: "お客様の声一覧 | 川口典礼",
  description:
    "川口典礼でご葬儀を執り行ったご家族から、ご利用いただいた感想をお寄せいただいています。プラン・人数・総額・施行場所もあわせて掲載。手書きアンケートも掲載しています。",
  alternates: { canonical: "/voice/" },
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

const sortedVoices = [...voices].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

const surveyCount = voices.filter((v) => v.hasHandwrittenSurvey).length;

export default function VoiceIndexPage() {
  return (
    <>
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
            川口典礼でお見送りをお手伝いしたご家族からの感想を掲載しています。プラン・人数・総額・施行場所もあわせてご覧いただけます。掲載は個人情報を確認のうえ、ご家族の許可を得たものです。
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
              {surveyCount > 0 && (
                <p className="mt-1 text-sm text-ink-mid">
                  うち手書きアンケート掲載 {surveyCount}件
                </p>
              )}
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
                  className="group flex h-full flex-col gap-5 rounded-lg border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:p-8"
                >
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex rounded-full border border-line bg-paper px-3 py-1 font-bold text-ink-deep">
                      {voice.format}
                    </span>
                    {voice.hasHandwrittenSurvey && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 font-bold text-gold">
                        手書きあり
                      </span>
                    )}
                    <span className="text-ink-soft">
                      {formatDate(voice.publishedAt)} 公開
                    </span>
                  </div>

                  <p className="font-serif-jp text-xl font-medium leading-[1.55] text-ink-deep group-hover:text-brand md:text-2xl">
                    「{voice.title}」
                  </p>

                  <blockquote className="border-l-2 border-brand pl-4 text-sm leading-8 text-ink-mid md:text-base">
                    {voice.quote}
                  </blockquote>

                  <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-lg border border-line-soft bg-paper px-4 py-4 text-sm">
                    <dt className="text-ink-soft">プラン</dt>
                    <dd className="font-semibold text-ink-deep">
                      {voice.format}
                    </dd>
                    <dt className="text-ink-soft">参列人数</dt>
                    <dd className="font-semibold text-ink-deep">
                      {voice.people}
                    </dd>
                    <dt className="text-ink-soft">総額</dt>
                    <dd className="font-bold text-brand">{voice.total}</dd>
                    <dt className="text-ink-soft">施行場所</dt>
                    <dd className="font-semibold text-ink-deep">
                      {voice.hall}
                    </dd>
                  </dl>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{voice.family}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-brand group-hover:underline">
                      詳しく見る
                      <span aria-hidden>→</span>
                    </span>
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
                  ご家族の許可をいただいたうえで掲載しています。お名前や個人を特定する情報はマスキングし、星評価などの簡易な数値化ではなく、お客様のお言葉そのものを大切に扱っています。
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

          <div className="mt-9 grid gap-3 md:grid-cols-[1.2fr_1fr_1fr]">
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
              href="/estimate/"
              className="rounded-lg border border-white/60 bg-transparent px-5 py-5 text-center text-base font-bold text-white shadow-sm transition hover:bg-white/10"
            >
              費用の概算
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
