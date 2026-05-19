import Image from "next/image";
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
            {saijo.availablePlansLabel ?? "葬儀プラン"}
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.availablePlansHeading ?? `${saijo.shortName}での葬儀プラン。`}
          </h2>
          {saijo.availablePlansLead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {saijo.availablePlansLead}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {planData.map((plan) => (
            <li key={plan.slug}>
              <a
                href={`/plan/${plan.slug}/`}
                className="group block h-full overflow-hidden rounded-lg border border-line bg-paper shadow-sm transition hover:border-brand hover:shadow-md"
              >
                {plan.image && (
                  <div className="relative aspect-[4/3] w-full bg-warm">
                    <Image
                      src={plan.image.src}
                      alt={plan.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="object-cover object-center"
                    />
                  </div>
                )}
                <div className="p-6">
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
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm leading-7 text-ink-mid md:text-base md:leading-8">
          どのプランが合うかは、ご家族の状況やご希望に合わせてご案内します。
          <a
            href="/contact/"
            className="ml-2 inline-flex items-center gap-1 font-bold text-brand hover:underline"
          >
            川口典礼へご相談
            <span aria-hidden>→</span>
          </a>
        </p>
      </div>
    </section>
  );
}

export function SaijoGallery({ saijo }: { saijo: Saijo }) {
  if (!saijo.photos || saijo.photos.length === 0) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Facility
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">施設の様子</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.photosHeading ?? `${saijo.name}の施設写真。`}
          </h2>
          {saijo.photosLead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {saijo.photosLead}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {saijo.photos.map((photo) => (
            <li key={photo.src}>
              <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-line-soft px-5 py-4">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                    {photo.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink-mid">
                    {photo.caption}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {saijo.photosFootnote && (
          <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm">
            ※ {saijo.photosFootnote}
          </p>
        )}
      </div>
    </section>
  );
}

export function SaijoFlow({ saijo }: { saijo: Saijo }) {
  if (!saijo.flow || saijo.flow.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Flow
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">利用の流れ</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.flowHeading ?? `${saijo.name}を利用する葬儀の流れ。`}
          </h2>
          {saijo.flowLead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {saijo.flowLead}
            </p>
          )}
        </div>

        <ol className="mt-10 space-y-4">
          {saijo.flow.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-lg border border-line bg-paper p-5 shadow-sm md:gap-6 md:p-6"
            >
              <span
                aria-hidden
                className="font-serif-jp mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white md:h-10 md:w-10"
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                  {s.step}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
          この流れを
          <strong className="font-bold text-ink-deep">
            川口典礼が一貫してお手伝いします
          </strong>
          。火葬場予約、ご搬送、ご安置、式場でのお別れ、火葬当日の移動などをまとめてご相談いただけます。
        </p>
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

export function SaijoCremationFurnaces({ saijo }: { saijo: Saijo }) {
  if (!saijo.cremationFurnaces || saijo.cremationFurnaces.items.length === 0)
    return null;
  const block = saijo.cremationFurnaces;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Cremation Furnace
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">火葬炉</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {block.heading}
          </h2>
          {block.lead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {block.lead}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <li key={item.name}>
              <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-line-soft px-5 py-4">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="mt-1 text-sm leading-6 text-ink-mid">
                      {item.description}
                    </p>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm">
          ※ 各火葬炉の仕様や違いについては事前のご相談時にご案内します。
        </p>
      </div>
    </section>
  );
}

export function SaijoHallRooms({ saijo }: { saijo: Saijo }) {
  if (!saijo.hallRooms || saijo.hallRooms.items.length === 0) return null;
  const block = saijo.hallRooms;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Hall Rooms
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">式場</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {block.heading}
          </h2>
          {block.lead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {block.lead}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {block.items.map((room) => {
            const content = (
              <>
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={room.image.src}
                    alt={room.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                    {room.location}
                  </p>
                  <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
                    {room.name}
                  </p>
                  {room.description && (
                    <p className="mt-2 text-sm leading-7 text-ink-mid">
                      {room.description}
                    </p>
                  )}
                  {room.feeNote && (
                    <p className="mt-3 text-sm font-bold text-brand">
                      式場料金 {room.feeNote}
                    </p>
                  )}
                  <p className="mt-auto pt-4 text-xs text-ink-soft">
                    {room.detailHref
                      ? "式場の詳細を見る →"
                      : "詳細は事前相談時にご案内"}
                  </p>
                </div>
              </>
            );

            return (
              <li key={room.slug}>
                {room.detailHref ? (
                  <a
                    href={room.detailHref}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:border-brand hover:shadow-md"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function SaijoCremationWaitingRooms({ saijo }: { saijo: Saijo }) {
  if (
    !saijo.cremationWaitingRooms ||
    saijo.cremationWaitingRooms.items.length === 0
  )
    return null;
  const block = saijo.cremationWaitingRooms;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Waiting Room
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            火葬待合室
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {block.heading}
          </h2>
          {block.lead && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {block.lead}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((room) => (
            <li key={room.name}>
              <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={room.image.src}
                    alt={room.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-line-soft px-5 py-4">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                    {room.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink-mid">
                    収容: {room.capacity}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {block.seatFeeNote && (
          <p className="mt-6 rounded-lg border border-line-soft bg-paper px-5 py-4 text-sm leading-7 text-ink-mid md:px-6 md:py-5 md:text-base md:leading-8">
            {block.seatFeeNote}
          </p>
        )}
      </div>
    </section>
  );
}

export function SaijoFeeTables({ saijo }: { saijo: Saijo }) {
  if (!saijo.feeTables || saijo.feeTables.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Fees
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">料金一覧</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.shortName}の施設利用料・火葬料。
          </h2>
          {saijo.feeTablesNote && (
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              {saijo.feeTablesNote}
            </p>
          )}
        </div>

        <div className="mt-10 space-y-10">
          {saijo.feeTables.map((table, tableIndex) => {
            const hasNoteColumn =
              Boolean(table.noteHeader) ||
              table.rows.some((r) => r.note && r.note.length > 0);

            return (
              <div key={`${table.heading}-${tableIndex}`}>
                <h3 className="font-serif-jp text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl">
                  {table.heading}
                </h3>
                {table.lead && (
                  <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {table.lead}
                  </p>
                )}

                <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
                  <table className="w-full min-w-[480px] border-collapse">
                    <thead>
                      <tr className="bg-paper">
                        {table.columns.map((col, i) => (
                          <th
                            key={col}
                            className={`px-4 py-3 text-sm font-bold text-ink-deep md:px-5 md:py-4 md:text-base ${
                              i === 0 ? "text-left" : "text-right"
                            }`}
                          >
                            {col}
                          </th>
                        ))}
                        {hasNoteColumn && (
                          <th className="px-4 py-3 text-right text-xs font-bold text-ink-soft md:px-5 md:py-4 md:text-sm">
                            {table.noteHeader ?? ""}
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr
                          key={`${row.category}-${rowIndex}`}
                          className="border-t border-line-soft"
                        >
                          <td className="px-4 py-4 text-sm leading-6 text-ink md:px-5 md:py-5 md:text-base">
                            {row.category}
                          </td>
                          {row.values.map((val, i) => (
                            <td
                              key={i}
                              className="font-serif-jp px-4 py-4 text-right text-base font-bold text-ink-deep md:px-5 md:py-5 md:text-lg"
                            >
                              {val}
                            </td>
                          ))}
                          {hasNoteColumn && (
                            <td className="px-4 py-4 text-right text-xs leading-6 text-ink-soft md:px-5 md:py-5 md:text-sm">
                              {row.note ?? ""}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {table.footnote && (
                  <p className="mt-3 text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                    ※ {table.footnote}
                  </p>
                )}
                {table.footnotes && table.footnotes.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                    {table.footnotes.map((note, i) => (
                      <li key={i}>※ {note}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
