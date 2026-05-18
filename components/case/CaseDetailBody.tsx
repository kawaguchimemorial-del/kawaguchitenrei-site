import Image from "next/image";
import type { CaseRecord } from "@/lib/cases";
import { plans } from "@/lib/plans";
import { cases } from "@/lib/cases";

export function CaseStory({ caseItem }: { caseItem: CaseRecord }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <article className="space-y-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Requirements
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              ご家族のご要望
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご家族からのご相談内容。
            </h2>
            <p className="mt-5 rounded-lg border-l-4 border-brand bg-white px-6 py-5 text-base leading-9 text-ink-mid shadow-sm md:text-lg">
              {caseItem.requirements}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Implementation
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              実施内容
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              実際にお手伝いした内容。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {caseItem.implementation}
            </p>
          </div>

          {caseItem.staffComment && (
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Staff Note
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-mid">
                担当者コメント
              </p>
              <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
                担当者より。
              </h2>
              <blockquote className="mt-5 rounded-lg border border-line bg-white px-6 py-6 text-base leading-9 text-ink-mid shadow-sm md:text-lg">
                {caseItem.staffComment}
              </blockquote>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

export function CaseCostBreakdown({ caseItem }: { caseItem: CaseRecord }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Cost
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">費用の内訳</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            費用に含まれたもの・別途費用。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            この事例の費用構成の目安です。総額はご家族の状況により異なるため、
            <strong className="text-brand">個別にご案内</strong>します。
          </p>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              費用に含まれたもの
            </p>
            <ul className="mt-4 space-y-2.5">
              {caseItem.includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-7 text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line-soft bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              別途発生した項目
            </p>
            <ul className="mt-4 space-y-2.5">
              {caseItem.extraItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-7 text-ink-mid"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-ink-soft"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs leading-6 text-ink-soft">
          ※ 別途項目はご家族のご希望や使用施設により発生します。同様の構成での総額は、お電話または事前相談でご案内します。
        </p>
      </div>
    </section>
  );
}

export function CaseRelated({ caseItem }: { caseItem: CaseRecord }) {
  const relatedPlans = plans.filter((p) =>
    caseItem.relatedPlanSlugs.includes(p.slug)
  );
  const otherCases = cases
    .filter((c) => c.slug !== caseItem.slug)
    .slice(0, 3);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Related
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">関連情報</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            関連するプラン・他の事例。
          </h2>
        </div>

        {relatedPlans.length > 0 && (
          <div className="mt-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              関連する葬儀プラン
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {relatedPlans.map((plan) => (
                <li key={plan.slug}>
                  <a
                    href={`/plan/${plan.slug}/`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-paper px-5 py-4 transition hover:border-brand"
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

        {otherCases.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              他の施行事例
            </p>
            <ul className="mt-4 grid gap-5 md:grid-cols-3">
              {otherCases.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/case/${c.slug}/`}
                    className="group block h-full overflow-hidden rounded-lg border border-line bg-paper shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] bg-warm">
                      {c.photo ? (
                        <Image
                          src={c.photo.src}
                          alt={c.photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)]"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                        {c.title}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft">
                        <span>{c.format}</span>
                        <span aria-hidden>·</span>
                        <span>{c.people}</span>
                        <span aria-hidden>·</span>
                        <span className="font-bold text-brand">{c.total}</span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="/case/"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
          >
            事例一覧をすべて見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function CaseCta({ caseItem }: { caseItem: CaseRecord }) {
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
          似たご希望の葬儀を、
          <br className="md:hidden" />
          ご相談ください。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          {caseItem.format}・{caseItem.hall}での葬儀をご検討の方は、お気軽にご相談ください。概算金額のご案内、事前のホール見学も承ります。
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
