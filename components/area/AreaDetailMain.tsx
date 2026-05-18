import type { Area } from "@/lib/areas";
import { hallKawaguchi } from "@/lib/halls";
import { saijoList } from "@/lib/saijo";

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
const planCards = [
  {
    name: "直葬",
    short: "通夜・告別式を行わず、ご火葬を中心にシンプルにお見送り。",
    price: "139,000円(税込)〜",
    href: "/plan/direct-funeral/",
  },
  {
    name: "一日葬",
    short: "通夜を行わず、告別式と火葬を1日で執り行う形式です。",
    price: "396,000円(税込)〜",
    href: "/plan/oneday-funeral/",
  },
  {
    name: "家族葬",
    short: "ご家族や親しい方を中心に、落ち着いてお見送りする葬儀です。",
    price: "528,000円(税込)〜",
    href: "/plan/family-funeral/",
  },
  {
    name: "一般葬",
    short:
      "ご親族・ご友人・地域の方を含めた本格的なご葬儀。規模に応じて個別にご相談いただけます。",
    price: "内容により変動",
    href: "/contact/",
    isConsult: true,
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
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-brand hover:shadow-md"
              >
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// セクション4: よく利用される斎場
const saijoLabels: Record<string, { name: string; description: string }> = {
  megurinomori: {
    name: "川口市めぐりの森",
    description:
      "川口市営の火葬場・斎場。火葬と式を1つの施設で完結できます。",
  },
  "toda-sousaijo": {
    name: "戸田葬祭場",
    description: "戸田市の斎場。近隣エリアからのご利用に対応します。",
  },
  "yatsuka-saijo": {
    name: "谷塚斎場",
    description:
      "草加市の斎場。火葬・式場利用にあわせてご案内可能です。",
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
    };
  });

  return (
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
            自社ホールに加えて、地域の公営・民営斎場でのご葬儀にも対応しています。日程・規模・ご希望に合わせて最適な施設をご案内します。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ownHall && (
            <li>
              <a
                href={`/hall/${ownHall.slug}/`}
                className="group flex h-full flex-col rounded-lg border-2 border-brand bg-paper p-6 shadow-sm transition hover:shadow-md"
              >
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
              </a>
            </li>
          )}
          {saijoEntries.map((s) => (
            <li key={s.slug}>
              {s.hasPage ? (
                <a
                  href={`/saijo/${s.slug}/`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-brand hover:shadow-md"
                >
                  <p className="font-serif-jp text-lg font-medium text-ink-deep group-hover:text-brand md:text-xl">
                    {s.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-mid">
                    {s.description}
                  </p>
                  <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    詳しく見る
                    <span aria-hidden>→</span>
                  </p>
                </a>
              ) : (
                <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm">
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
              )}
            </li>
          ))}
        </ul>

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
  );
}
