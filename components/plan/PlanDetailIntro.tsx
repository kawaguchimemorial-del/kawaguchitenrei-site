import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { Plan } from "@/lib/plans";

export function PlanDetailIntro({ plan }: { plan: Plan }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "葬儀プラン", href: "/plan/" },
              { label: plan.name },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Plan
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              葬儀プラン
            </p>
            <h1 className="font-serif-jp mt-4 text-[2.4rem] font-medium leading-[1.3] text-ink-deep md:text-[3rem]">
              {plan.name}
            </h1>
            <p className="mt-6 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {plan.long}
            </p>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:flex-wrap md:flex">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <span aria-hidden>☎</span>
                電話で相談する
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                事前相談する
              </a>
            </div>
          </div>

          <aside
            aria-label={`${plan.name}の概要`}
            className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              このプランの目安
            </p>
            <dl className="mt-5 space-y-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                <dt className="text-sm font-semibold text-ink-soft">費用</dt>
                <dd className="font-serif-jp text-2xl font-medium text-brand">
                  {plan.price}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                <dt className="text-sm font-semibold text-ink-soft">日数</dt>
                <dd className="text-base font-bold text-ink-deep">
                  {plan.days}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                <dt className="text-sm font-semibold text-ink-soft">参列</dt>
                <dd className="text-base font-bold text-ink-deep">
                  {plan.people}
                </dd>
              </div>
              <div className="border-b border-line-soft pb-4">
                <dt className="text-sm font-semibold text-ink-soft">
                  向いている方
                </dt>
                <dd className="mt-2 text-sm leading-7 text-ink-mid">
                  {plan.forWhom}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-6 text-ink-soft">
              ※ 表示金額は概算です。式場使用料、火葬料、お料理、返礼品、宗教者へのお礼などにより総額は変動します。
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
