import Image from "next/image";
import type { Area } from "@/lib/areas";
import { hallKawaguchi } from "@/lib/halls";
import { saijoList } from "@/lib/saijo";

type PlanCardEntry = {
  name: string;
  short: string;
  price: string;
  href: string;
  isConsult?: boolean;
  image?: { src: string; alt: string };
};

// セクション2: 地域ごとの葬儀の特徴
export function AreaFeatures({ area }: { area: Area }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Features
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            {area.name}の葬儀の特徴
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {area.name}での葬儀の傾向と、
            <br className="md:hidden" />
            選ばれているかたち。
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {area.features.map((f) => (
            <li
              key={f.title}
              className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-7"
            >
              <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                {f.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                {f.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// セクション3: 対応できる葬儀プラン (4プラン固定 + 一般葬は要相談)
const planCards: PlanCardEntry[] = [
  {
    name: "直葬",
    short: "通夜・告別式を行わず、ご火葬を中心にシンプルにお見送り。",
    price: "139,000円(税込)〜",
    href: "/plan/direct-funeral/",
    image: {
      src: "/images/home/plans/plan-chokuso.png",
      alt: "直葬プランのイメージ",
    },
  },
  {
    name: "一日葬",
    short: "通夜を行わず、告別式と火葬を1日で執り行う形式です。",
    price: "396,000円(税込)〜",
    href: "/plan/oneday-funeral/",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "一日葬プランのイメージ",
    },
  },
  {
    name: "家族葬",
    short: "ご家族や親しい方を中心に、落ち着いてお見送りする葬儀です。",
    price: "528,000円(税込)〜",
    href: "/plan/family-funeral/",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "家族葬プランのイメージ",
    },
  },
  {
    name: "一般葬",
    short:
      "ご親族・ご友人・地域の方を含めた本格的なご葬儀。規模に応じて個別にご相談いただけます。",
    price: "内容により変動",
    href: "/contact/",
    isConsult: true,
    image: {
      src: "/images/home/plans/plan-ippan.png",
      alt: "一般葬プランのイメージ",
    },
  },
];

export function AreaPlans({ area }: { area: Area }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Plans
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            対応できる葬儀プラン
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {area.name}で対応できる葬儀プラン。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご家族の人数やご希望に合わせて、お選びいただけます。プラン名をクリックすると詳細をご確認いただけます。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {planCards.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:border-brand hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-warm">
                  {p.image ? (
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)]"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif-jp text-xl font-medium text-ink-deep group-hover:text-brand md:text-2xl">
                      {p.name}
                    </h3>
                    <p className="text-sm font-bold text-brand">{p.price}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {p.short}
                  </p>
                  <p className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    {p.isConsult ? "ご相談する" : `${p.name}の詳細を見る`}
                    <span aria-hidden>→</span>
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

// セクション4: よく利用される斎場・ホール / 火葬場・火葬場併設斎場
const saijoLabels: Record<string, { name: string; description: string }> = {
  megurinomori: {
    name: "川口市めぐりの森",
    description:
      "川口市営の火葬場です。通夜・告別式を行う式場は併設されていません。",
  },
  "toda-sousaijyo": {
    name: "戸田葬祭場",
    description:
      "東京都板橋区舟渡の火葬場併設斎場です。川口典礼は、戸田葬祭場でのご葬儀の手配・搬送・式場利用相談をサポートします。",
  },
  "yatsuka-saijo": {
    name: "谷塚斎場",
    description:
      "火葬場を併設した斎場です。ご利用条件や空き状況により、川口市からのご利用もご相談いただけます。",
  },
};

export function AreaSaijo({ area }: { area: Area }) {
  const ownHall = area.primaryHallSlug ? hallKawaguchi : undefined;

  // 利用できる斎場を実在のlinkとnameで構成
  const saijoEntries = area.primarySaijoSlugs.map((slug) => {
    const existing = saijoList.find((s) => s.slug === slug);
    const fallback = saijoLabels[slug];
    return {
      slug,
      name: existing?.name ?? fallback?.name ?? slug,
      description:
        fallback?.description ??
        existing?.intro ??
        "ご利用についてお気軽にご相談ください。",
      hasPage: Boolean(existing),
      photo: existing?.photos?.[0],
    };
  });

  return (
    <>
      {/* Section 1: 斎場・ホール（自社ホールのみ） */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Halls
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              よく利用される斎場・ホール
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              {area.name}でよくご利用いただく
              <br className="md:hidden" />
              斎場・ホール。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              川口市西新井宿の自社ホール「川口メモリアルホール」を中心に、ご葬儀をお手伝いします。日程・規模・ご希望に合わせて最適な施設をご案内します。
            </p>
          </div>

          {ownHall && (
            <ul className="mt-10 grid max-w-md gap-5">
              <li>
                <a
                  href={`/hall/${ownHall.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border-2 border-brand bg-paper shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-warm">
                    <Image
                      src="/images/home/hall/hall-exterior.jpg"
                      alt="川口メモリアルホールの外観"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      自社ホール
                    </p>
                    <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep group-hover:text-brand md:text-xl">
                      {ownHall.name}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-ink-mid">
                      川口市西新井宿の自社ホール。家族葬・一日葬に適した規模です。
                    </p>
                    <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                      詳しく見る
                      <span aria-hidden>→</span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          )}

          {area.otherFacilities && area.otherFacilities.length > 0 && (
            <div className="mt-8 space-y-3">
              {area.otherFacilities.map((f) => (
                <div
                  key={f.name}
                  className="rounded-lg border border-line-soft bg-cool px-5 py-4 md:px-6 md:py-5"
                >
                  <p className="text-sm font-bold text-ink-deep md:text-base">
                    {f.name}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: 火葬場・火葬場併設斎場 */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Cremation
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              よく利用される火葬場・火葬場併設斎場
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              {area.name}でよくご利用いただく
              <br className="md:hidden" />
              火葬場・火葬場併設斎場。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              川口市めぐりの森をはじめ、近隣の火葬場・火葬場併設斎場のご利用もご相談いただけます。施設の利用条件や空き状況により、ご案内内容が変わります。
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {saijoEntries.map((s) => {
              const cover = s.photo ? (
                <div className="relative aspect-[4/3] bg-warm">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] bg-warm">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)]"
                  />
                </div>
              );

              return (
                <li key={s.slug}>
                  {s.hasPage ? (
                    <a
                      href={`/saijo/${s.slug}/`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:border-brand hover:shadow-md"
                    >
                      {cover}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-serif-jp text-lg font-medium text-ink-deep group-hover:text-brand md:text-xl">
                          {s.name}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink-mid">
                          {s.description}
                        </p>
                        <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                          {s.name}の詳細を見る
                          <span aria-hidden>→</span>
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                      {cover}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                          {s.name}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink-mid">
                          {s.description}
                        </p>
                        <p className="mt-auto pt-4 text-xs text-ink-soft">
                          ご利用について詳しくはお問い合わせください
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
