import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@/components/common/icons";
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
                className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white"
              >
                <CheckIcon className="h-4 w-4" />
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

export function HallVisitationRoom() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Visitation Room
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            個室面会室・ペット同伴のご相談
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            個室面会室で、
            <br className="md:hidden" />
            ゆっくりお別れいただけます。
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full bg-warm">
              <Image
                src="/images/hall/kawaguchi-memorial-hall/kawaguchi-memorial-hall-visitation-room-pet.png"
                alt="川口メモリアルホールの個室面会室でペットと一緒にお別れする様子"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="border-t border-line-soft px-5 py-4 text-sm leading-6 text-ink-mid">
              個室面会室では、ご家族・ペットと一緒に静かなお別れの時間を過ごしていただけます。
            </figcaption>
          </figure>

          <div>
            <p className="text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              川口メモリアルホールには、故人様とゆっくりお別れいただける個室面会室を備えています。ご家族だけで静かに過ごしたい方、葬儀までの間にお顔を見てお別れしたい方にもご利用いただけます。
            </p>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              ペットも大切なご家族の一員と考え、ペットを連れてのご面会にも可能な範囲で対応しています。ご希望の場合は、事前にご相談ください。
            </p>

            <ul className="mt-7 space-y-3 rounded-lg border border-line-soft bg-paper p-5 md:p-6">
              <li className="flex items-start gap-3 text-sm leading-7 text-ink md:text-base md:leading-8">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>ご家族だけで、故人様と静かに過ごせる個室空間</span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-7 text-ink md:text-base md:leading-8">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>葬儀までの間、お顔を見てお別れの時間を過ごしたい方にも</span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-7 text-ink md:text-base md:leading-8">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>ペット同伴のご面会も、可能な範囲で対応（事前にご相談ください）</span>
              </li>
            </ul>

            <div className="mt-7">
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                個室面会室について相談する
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
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
            ご家族のご希望に合わせて、直葬・花入れお別れ・一日葬・家族葬・市民葬まで幅広く対応します。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportedPlanData.map((plan) => (
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover object-center"
                    />
                  </div>
                )}
                <div className="p-6">
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
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
