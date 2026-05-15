import type { Voice } from "@/lib/voices";
import { plans } from "@/lib/plans";
import { getCase } from "@/lib/cases";
import { voices } from "@/lib/voices";

export function VoiceLong({ voice }: { voice: Voice }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Full Voice
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            ご家族からのメッセージ
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            お寄せいただいたお声。
          </h2>
        </div>

        <div className="mt-9 rounded-lg border border-line bg-paper p-7 shadow-sm md:p-10">
          <p className="font-serif-jp text-base leading-[2] text-ink md:text-lg md:leading-[2.1]">
            {voice.quoteLong}
          </p>
          <p className="mt-7 text-right text-sm font-semibold text-ink-mid">
            — {voice.family}
          </p>
        </div>
      </div>
    </section>
  );
}

export function VoiceSurvey({ voice }: { voice: Voice }) {
  if (!voice.hasHandwrittenSurvey) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Handwritten
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            手書きのお客様アンケート
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            ご家族からのアンケート。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            お見送りの後、ご家族にお書きいただいた手書きのアンケートです。掲載は個人情報を確認・マスキングしたうえで、ご家族の許可をいただいています。
          </p>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-stretch">
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gold bg-gold-soft/40 text-base font-semibold text-gold">
            <div className="text-center">
              <p>[手書きアンケート画像]</p>
              <p className="mt-2 text-xs font-normal opacity-80">
                ご家族のお名前部分はマスキング処理しています
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              掲載にあたって
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-mid">
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                ご家族の許可をいただいたものを掲載しています
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                個人を特定する情報はマスキング処理しています
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                星評価ではなく、お客様のお言葉そのものを大切にしています
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VoiceRelated({ voice }: { voice: Voice }) {
  const relatedPlans = plans.filter((p) =>
    voice.relatedPlanSlugs.includes(p.slug)
  );
  const relatedCase = voice.relatedCaseSlug
    ? getCase(voice.relatedCaseSlug)
    : undefined;
  const otherVoices = voices
    .filter((v) => v.slug !== voice.slug)
    .slice(0, 3);

  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Related
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">関連情報</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            関連する事例・プラン。
          </h2>
        </div>

        {relatedCase && (
          <div className="mt-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              この声に対応する施行事例
            </p>
            <a
              href={`/case/${relatedCase.slug}/`}
              className="group mt-4 grid gap-6 rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md md:grid-cols-[0.55fr_1.45fr]"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-t-lg bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)] text-sm font-semibold text-ink-soft md:rounded-l-lg md:rounded-tr-none">
                [祭壇のお写真]
              </div>
              <div className="p-6 md:py-7 md:pr-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  Case
                </p>
                <p className="font-serif-jp mt-2 text-xl font-medium text-ink-deep group-hover:text-brand md:text-2xl">
                  {relatedCase.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {relatedCase.summary}
                </p>
                <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                  事例の詳細を見る
                  <span aria-hidden>→</span>
                </p>
              </div>
            </a>
          </div>
        )}

        {relatedPlans.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              関連する葬儀プラン
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {relatedPlans.map((plan) => (
                <li key={plan.slug}>
                  <a
                    href={`/plan/${plan.slug}/`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-white px-5 py-4 transition hover:border-brand"
                  >
                    <div>
                      <p className="font-serif-jp text-lg font-medium text-ink-deep">
                        {plan.name}
                      </p>
                      <p className="mt-1 text-sm text-ink-mid">
                        {plan.short}
                      </p>
                    </div>
                    <span aria-hidden className="text-xl text-brand">
                      ›
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {otherVoices.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              他のお客様の声
            </p>
            <ul className="mt-4 grid gap-5 md:grid-cols-3">
              {otherVoices.map((v) => (
                <li key={v.slug}>
                  <a
                    href={`/voice/${v.slug}/`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
                  >
                    <p className="font-serif-jp text-base font-medium leading-[1.6] text-ink-deep group-hover:text-brand md:text-lg">
                      「{v.title}」
                    </p>
                    <p className="mt-auto pt-5 text-xs text-ink-soft">
                      {v.family}
                    </p>
                    <p className="mt-2 text-xs">
                      <span className="text-ink-soft">{v.format}</span>
                      <span aria-hidden className="mx-2">
                        ·
                      </span>
                      <span className="text-ink-soft">{v.people}</span>
                      <span aria-hidden className="mx-2">
                        ·
                      </span>
                      <span className="font-bold text-brand">{v.total}</span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="/voice/"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-paper"
          >
            お客様の声をすべて見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function VoiceCta({ voice }: { voice: Voice }) {
  return (
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
          私たちも、
          <br className="md:hidden" />
          ご家族のお気持ちに寄り添います。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          {voice.format}・{voice.hall}での葬儀をご検討中の方、または同じようなご相談がある方は、お気軽にお問い合わせください。
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
  );
}
