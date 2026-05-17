import type { Saijo } from "@/lib/saijo";
import { plans } from "@/lib/plans";

export function SaijoImportantNotice({ saijo }: { saijo: Saijo }) {
  if (!saijo.importantNotice) return null;

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Important
          </p>
          <h2 className="font-serif-jp mt-3 text-xl font-medium leading-[1.5] text-ink-deep md:text-2xl">
            {saijo.importantNotice.heading}
          </h2>
          <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            {saijo.importantNotice.body}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SaijoCremationFees({ saijo }: { saijo: Saijo }) {
  if (!saijo.cremationFees) return null;
  const fees = saijo.cremationFees;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Cremation Fees
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">火葬料金</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {fees.heading}
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            {fees.lead}
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr className="bg-paper">
                <th className="px-4 py-3 text-left text-sm font-bold text-ink-deep md:px-5 md:py-4 md:text-base">
                  区分
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-ink-deep md:px-5 md:py-4 md:text-base">
                  市内料金
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-ink-deep md:px-5 md:py-4 md:text-base">
                  市外料金
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.rows.map((row) => (
                <tr
                  key={row.category}
                  className="border-t border-line-soft"
                >
                  <td className="px-4 py-4 text-sm leading-6 text-ink md:px-5 md:py-5 md:text-base">
                    {row.category}
                  </td>
                  <td className="font-serif-jp px-4 py-4 text-right text-base font-bold text-ink-deep md:px-5 md:py-5 md:text-lg">
                    {row.resident}
                  </td>
                  <td className="font-serif-jp px-4 py-4 text-right text-base font-bold text-ink-deep md:px-5 md:py-5 md:text-lg">
                    {row.nonResident}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
          {fees.footnote}
        </p>
        <p className="mt-3 text-xs leading-6 text-ink-soft md:text-sm">
          ※ {fees.changeNotice}
        </p>
      </div>
    </section>
  );
}

export function SaijoFeatures({ saijo }: { saijo: Saijo }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            About
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            {saijo.shortName}について
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.name}の特長。
          </h2>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {saijo.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-lg border border-line bg-paper px-5 py-5"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
              >
                ✓
              </span>
              <span className="text-base leading-7 text-ink">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SaijoOurSupport({ saijo }: { saijo: Saijo }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Our Support
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口典礼ができること
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              {saijo.shortName}での葬儀を、
              <br className="md:hidden" />
              一貫してお手伝いします。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              公営施設のご予約から、当日のお見送りまで。川口典礼が一貫してお手伝いします。お電話一本でご相談いただけます。
            </p>
          </div>

          <ul className="space-y-3">
            {saijo.ourSupport.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-lg border border-line bg-white p-5 shadow-sm md:p-6"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint font-serif-jp text-sm font-medium text-brand"
                >
                  →
                </span>
                <p className="text-base leading-8 text-ink md:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SaijoAvailablePlans({ saijo }: { saijo: Saijo }) {
  const planData = plans.filter((p) => saijo.availablePlans.includes(p.slug));

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Plans
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            めぐりの森での火葬を含む葬儀プラン
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            めぐりの森での火葬を含む葬儀プラン。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            川口典礼では、川口メモリアルホールなどでのお別れ・葬儀式から、川口市めぐりの森での火葬まで、ご家族のご希望に合わせて一貫してお手伝いします。直葬プラン、花入れお別れプラン、一日葬プラン、家族葬プラン、市民葬プランなど、内容に応じてご相談いただけます。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {planData.map((plan) => (
            <li key={plan.slug}>
              <a
                href={`/plan/${plan.slug}/`}
                className="group block h-full rounded-lg border border-line bg-paper p-6 shadow-sm transition hover:border-brand hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                    {plan.name}
                  </h3>
                  <p className="text-sm font-bold text-brand">{plan.price}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {plan.short}
                </p>
                <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                  詳細を見る
                  <span aria-hidden>→</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SaijoFacilityInfo({ saijo }: { saijo: Saijo }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Facility
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">施設情報</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            施設情報。
          </h2>
        </div>

        <dl className="mt-10 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          {saijo.facilityInfo.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[auto_1fr] gap-x-6 px-5 py-4 md:grid-cols-[200px_1fr] md:px-8 md:py-5 ${
                i > 0 ? "border-t border-line-soft" : ""
              }`}
            >
              <dt className="text-sm font-semibold text-ink-soft md:text-base">
                {row.label}
              </dt>
              <dd className="text-base text-ink-deep md:text-lg">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm leading-7 text-ink-soft">
          ※ 施設の詳細仕様・利用料金は、公営施設のため変動する可能性があります。最新の情報は事前のご相談時にご確認いただけます。
        </p>
      </div>
    </section>
  );
}
