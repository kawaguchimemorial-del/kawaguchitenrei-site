import Image from "next/image";
import type { Hall } from "@/lib/halls";
import { plans } from "@/lib/plans";

export function HallFeatures({ hall }: { hall: Hall }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Features
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            このホールの特長
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            落ち着いた雰囲気の、
            <br className="md:hidden" />
            ご家族のためのホール。
          </h2>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hall.features.map((feature) => (
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

export function HallGallery({ hall }: { hall: Hall }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Gallery
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            ホール内観・施設写真
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            写真でご覧いただける、
            <br className="md:hidden" />
            ホールの様子。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            外観・式場・控室など、ホール内の各スペースをご紹介します。事前のご見学も承っています。
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {hall.gallery.map((item) => (
            <li key={item.label}>
              <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-line-soft px-5 py-4">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                    {item.label}
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
      </div>
    </section>
  );
}

export function HallEquipment({ hall }: { hall: Hall }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Equipment
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">設備・仕様</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            設備・仕様。
          </h2>
        </div>

        <dl className="mt-10 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          {hall.equipment.map((row, i) => (
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
      </div>
    </section>
  );
}

export function HallSupportedPlans({ hall }: { hall: Hall }) {
  const supportedPlanData = plans.filter((p) =>
    hall.supportedPlans.includes(p.slug)
  );

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Plans
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            このホールで対応できるプラン
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {hall.shortName}で対応できる葬儀プラン。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご家族のご希望に合わせて、家族葬・一日葬・火葬式・直葬・川口市民葬まで幅広く対応します。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportedPlanData.map((plan) => (
            <li key={plan.slug}>
              <a
                href={`/plan/${plan.slug}/`}
                className="group block h-full rounded-lg border border-line bg-paper p-6 shadow-sm transition hover:border-brand hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                    {plan.name}
                  </h3>
                  <p className="text-sm font-bold text-brand">{plan.price}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {plan.short}
                </p>
                <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                  {plan.name}の詳細を見る
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
