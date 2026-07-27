import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/common/icons";
import type { Plan, YugureInfo } from "@/lib/plans";

function getYugure(plan: Plan): YugureInfo | null {
  return plan.yugureInfo ?? null;
}

/** 3. 結論先出しボックス — AI引用・強調スニペット狙い */
export function YugureDefinition({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-warm p-6 shadow-sm md:p-9">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Summary
          </p>
          <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-[1.9rem]">
            夕暮れ家族葬とは
          </h2>
          <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
            {y.definition}
          </p>
        </div>
      </div>
    </section>
  );
}

/** 4. 一日のながれ（一例）— 通常の一日葬との比較。モバイルは縦積み2カード */
export function YugureTimelines({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Timeline
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            通常の一日葬とのちがい（進行の一例）
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            {y.timelineNote}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {y.timelines.map((tl) => (
            <div
              key={tl.label}
              className={`rounded-lg border p-6 shadow-sm md:p-8 ${
                tl.tone === "yugure"
                  ? "border-brand-tint bg-warm"
                  : "border-line bg-white"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                  {tl.label}
                </h3>
                <p className="text-xs font-semibold text-ink-soft md:text-sm">
                  ※{tl.note}
                </p>
              </div>

              <ol className="mt-6 space-y-0">
                {tl.steps.map((step) => (
                  <li
                    key={`${tl.label}-${step.time}-${step.body}`}
                    className="flex gap-4 border-b border-line-soft py-3 last:border-b-0"
                  >
                    <span className="w-[5.5rem] shrink-0 text-sm font-bold text-ink-soft md:text-base">
                      {step.time}
                    </span>
                    <span className="min-w-0 text-sm leading-7 text-ink md:text-base md:leading-8">
                      {step.body}
                      {step.annotation && (
                        <span className="ml-1 text-xs text-ink-soft md:text-sm">
                          （{step.annotation}）
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-5 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                {tl.summary}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-base leading-9 text-ink-mid md:text-lg md:leading-10">
          {y.timelineSummary}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:max-w-2xl">
          <a
            href="tel:0120-963-765"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emergency px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <PhoneIcon className="h-4 w-4" />
            電話で相談する
          </a>
          <a
            href="/contact/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3.5 text-base font-bold text-ink-deep transition hover:bg-cool"
          >
            事前相談する
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** 5. 費用 */
export function YugurePrice({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y || !plan.pricing || plan.pricing.type !== "member-regular") return null;
  const { member, regular } = plan.pricing;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
          Price
        </p>
        <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
          費用について
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-tint bg-warm px-6 py-7 shadow-sm md:px-8">
            <p className="text-xs font-bold tracking-[0.18em] text-brand md:text-sm">
              事前相談会員価格
            </p>
            <p className="font-serif-jp mt-2 text-[2.1rem] font-medium leading-none text-brand md:text-[2.6rem]">
              {member.toLocaleString("ja-JP")}円
              <span className="ml-2 text-lg md:text-xl">（税込）</span>
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper px-6 py-7 md:px-8">
            <p className="text-xs font-bold tracking-[0.18em] text-ink-soft md:text-sm">
              通常価格
            </p>
            <p className="font-serif-jp mt-2 text-[2.1rem] font-medium leading-none text-ink-deep md:text-[2.6rem]">
              {regular.toLocaleString("ja-JP")}円
              <span className="ml-2 text-lg md:text-xl">（税込）</span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
          ※{y.priceNote}
        </p>

        <p className="mt-6 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
          {y.pricePositioning}
        </p>
      </div>
    </section>
  );
}

/** 6. このプランが生まれた理由 */
export function YugureOrigin({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-[2rem]">
          {y.origin.heading}
        </h2>
        <blockquote className="mt-6 border-l-2 border-brand-tint pl-6 text-base leading-9 text-ink md:pl-8 md:text-lg md:leading-10">
          {y.origin.body}
        </blockquote>
      </div>
    </section>
  );
}

/** 7. 選ばれる理由 */
export function YugureReasons({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Reasons
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            夕暮れ家族葬が選ばれる理由
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {y.reasons.map((r, i) => (
            <div
              key={r.title}
              className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8"
            >
              <span className="font-serif-jp text-sm font-medium text-brand">
                0{i + 1}
              </span>
              <h3 className="font-serif-jp mt-2 text-xl font-medium leading-[1.5] text-ink-deep md:text-[1.4rem]">
                {r.title}
              </h3>
              <p className="mt-4 text-base leading-9 text-ink-mid md:leading-10">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 8. 三日間の流れ */
export function YugureThreeDays({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Flow
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            三日間の流れ
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {y.threeDays.map((d) => (
            <li
              key={d.day}
              className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
            >
              <span className="inline-flex items-center rounded-full bg-brand-tint px-3 py-1 text-xs font-bold text-brand md:text-sm">
                {d.day}
              </span>
              <h3 className="font-serif-jp mt-4 text-lg font-medium text-ink-deep md:text-xl">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-8 text-ink-mid md:text-base md:leading-9">
                {d.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 9. 翌日のご参列について */
export function YugureNextDay({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-cool p-6 md:p-9">
          <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-[1.9rem]">
            {y.nextDay.heading}
          </h2>
          <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
            {y.nextDay.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/** 10. プランに含まれる主な内容 ＋ 11. 別途必要になるもの */
export function YugureInclusions({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Inclusions
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            プラン料金に含まれる主な内容
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {y.inclusionsHighlight.map((item) => (
            <li
              key={item.name}
              className="flex items-start gap-3 rounded-lg border border-line bg-white px-4 py-4 md:px-5"
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white"
              >
                <CheckIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-sm leading-7 text-ink md:text-base">
                {item.name}
                {item.note && (
                  <span className="block text-xs text-ink-soft md:text-sm">
                    （{item.note}）
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <details className="mt-6 rounded-lg border border-line bg-white px-6 py-5">
          <summary className="cursor-pointer text-base font-bold text-ink-deep">
            プランに含まれる内容をすべて見る
          </summary>
          <ul className="mt-5 grid gap-2 md:grid-cols-2">
            {y.inclusionsAll.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8"
              >
                <span aria-hidden className="mt-1 text-brand">
                  ・
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-6 text-ink-soft md:text-sm">
            ※ 内容の詳細はご相談時にご説明します。祭壇のグレードアップも承っています。
          </p>
        </details>

        <div className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
          <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
            別途必要になるもの
          </h3>
          <ul className="mt-5 grid gap-2 md:grid-cols-2">
            {y.exclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-7 text-ink md:text-base md:leading-8"
              >
                <span aria-hidden className="mt-1 text-ink-soft">
                  ・
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            {y.exclusionsNote}
          </p>
        </div>
      </div>
    </section>
  );
}

/** 12. 会場 ＋ 13. 翌日の火葬について */
export function YugureHallAndCremation({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-paper p-6 md:p-8">
            <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-[1.8rem]">
              {y.hall.heading}
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:leading-10">
              {y.hall.body}
            </p>
            <ul className="mt-5 space-y-2">
              {y.hall.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8"
                >
                  <span aria-hidden className="mt-1 text-brand">
                    ・
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="/hall/"
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand transition hover:text-brand-deep md:text-base"
            >
              川口メモリアルホールを見る
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-lg border border-line bg-paper p-6 md:p-8">
            <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-[1.8rem]">
              {y.cremation.heading}
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:leading-10">
              {y.cremation.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 15. 他のプランとのちがい（価格列を持たない3軸表） */
export function YugureComparison({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;
  const c = y.comparison;

  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif-jp text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {c.heading}
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            {c.intro}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-lg border border-line bg-white text-left">
            <thead>
              <tr className="bg-paper">
                <th
                  scope="col"
                  className="border-b border-line px-5 py-4 text-sm font-bold text-ink-deep md:text-base"
                >
                  プラン
                </th>
                <th
                  scope="col"
                  className="border-b border-line px-5 py-4 text-sm font-bold text-ink-deep md:text-base"
                >
                  日数
                </th>
                <th
                  scope="col"
                  className="border-b border-line px-5 py-4 text-sm font-bold text-ink-deep md:text-base"
                >
                  お時間帯
                </th>
                <th
                  scope="col"
                  className="border-b border-line px-5 py-4 text-sm font-bold text-ink-deep md:text-base"
                >
                  お集まりやすさ
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.name} className="border-b border-line-soft last:border-b-0">
                  <th
                    scope="row"
                    className="px-5 py-4 text-sm font-bold text-ink-deep md:text-base"
                  >
                    {row.href ? (
                      <a href={row.href} className="text-brand hover:underline">
                        {row.name}
                      </a>
                    ) : (
                      row.name
                    )}
                  </th>
                  <td className="px-5 py-4 text-sm leading-7 text-ink-mid md:text-base">
                    {row.days}
                  </td>
                  <td className="px-5 py-4 text-sm leading-7 text-ink-mid md:text-base">
                    {row.timeOfDay}
                  </td>
                  <td className="px-5 py-4 text-sm leading-7 text-ink-mid md:text-base">
                    {row.gathering}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm leading-7 text-ink-soft md:text-base">
          ※{c.note}
        </p>
      </div>
    </section>
  );
}

/** 16. ご相談・お問い合わせ */
export function YugureCta({ plan }: { plan: Plan }) {
  const y = getYugure(plan);
  if (!y) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-paper p-7 shadow-sm md:p-10">
          <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-[2rem]">
            {y.cta.heading}
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            {y.cta.body}
          </p>
          <p className="mt-4 text-base leading-9 text-ink md:text-lg md:leading-10">
            {y.cta.note}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href="tel:0120-963-765"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emergency px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <PhoneIcon className="h-4 w-4" />
              0120-963-765
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
            >
              事前相談する
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-5 text-sm leading-7 text-ink-soft md:text-base">
            TEL 048-281-1117 ／ フリーダイヤル{" "}
            <a href="tel:0120-963-765" className="font-bold text-brand hover:underline">
              0120-963-765
            </a>
            （24時間365日）
          </p>
        </div>
      </div>
    </section>
  );
}

export function PlanYugureBody({ plan }: { plan: Plan }) {
  return (
    <>
      <YugureDefinition plan={plan} />
      <YugureTimelines plan={plan} />
      <YugurePrice plan={plan} />
      <YugureOrigin plan={plan} />
      <YugureReasons plan={plan} />
      <YugureThreeDays plan={plan} />
      <YugureNextDay plan={plan} />
      <YugureInclusions plan={plan} />
      <YugureHallAndCremation plan={plan} />
    </>
  );
}
