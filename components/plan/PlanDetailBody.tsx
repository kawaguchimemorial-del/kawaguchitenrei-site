import type { Plan } from "@/lib/plans";

export function PlanInclusions({ plan }: { plan: Plan }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Inclusions
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            プランに含まれるもの
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {plan.name}の費用に含まれる内容。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご葬儀の進行に必要な手配を、基本のセットとしてご用意します。詳細は事前のご相談で個別にご案内します。
          </p>
        </div>

        <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {plan.inclusions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-line bg-paper px-5 py-4"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
              >
                ✓
              </span>
              <span className="text-base leading-7 text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PlanSimpleAlternative({ plan }: { plan: Plan }) {
  if (!plan.simpleAlternative) return null;
  const sa = plan.simpleAlternative;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Alternative
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            さらに簡素な選択肢
          </p>
          <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-[1.8rem]">
            {sa.heading}
          </h2>
        </div>

        <div className="mt-8 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
              {sa.name}
            </p>
            <p className="text-sm font-bold text-ink-soft">
              人数目安 {sa.peopleNote}
            </p>
          </div>
          <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            {sa.description}
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line-soft bg-paper px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                会員価格
              </dt>
              <dd className="font-serif-jp mt-2 text-2xl font-medium text-ink-deep">
                {sa.memberPrice}
              </dd>
            </div>
            <div className="rounded-lg border border-line-soft bg-paper px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                通常価格
              </dt>
              <dd className="font-serif-jp mt-2 text-2xl font-medium text-ink-deep">
                {sa.regularPrice}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            {sa.cautions.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 text-ink-soft">
                  ※
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PlanFlow({ plan }: { plan: Plan }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Flow
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">葬儀の流れ</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            お電話から後日のご相談まで。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            お問い合わせから葬儀の執行、後日のご相談まで、一つひとつ確認しながら進めます。
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {plan.flow.map((item, index) => (
            <li
              key={item.step}
              className="flex gap-5 rounded-lg border border-line bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint font-serif-jp text-lg font-medium text-brand">
                {index + 1}
              </span>
              <div>
                <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                  {item.step}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PlanAdditional({ plan }: { plan: Plan }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Additional
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">別途費用</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            別途費用が発生する可能性のある項目。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご希望の内容や使用施設により、以下の項目が別途必要になる場合があります。事前にわかる範囲でご案内します。
          </p>
        </div>

        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {plan.additional.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-line-soft bg-paper px-5 py-4"
            >
              <span
                aria-hidden
                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-ink-soft"
              />
              <span className="text-base leading-7 text-ink-mid">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 rounded-lg border border-line-soft bg-cool px-5 py-4 text-sm leading-7 text-ink-mid">
          ※ 上記はあくまで目安です。具体的な総額は、ご希望の内容を伺ったうえで個別にお見積りします。
        </p>
      </div>
    </section>
  );
}

const costConfirmationPriorities = [
  {
    title: "火葬料",
    note: "公営(川口市めぐりの森など)と民営で費用が異なります。",
  },
  {
    title: "式場使用料",
    note: "外部斎場をご利用の場合は別途必要になる場合があります。",
  },
  {
    title: "お料理・返礼品",
    note: "参列人数やご希望のグレードにより変動します。",
  },
  {
    title: "宗教者へのお礼",
    note: "宗派・寺院・地域により異なります。具体額はご希望に合わせてご確認ください。",
  },
  {
    title: "ご安置日数の延長",
    note: "友引や火葬場の予約状況により、必要日数が変わる場合があります。",
  },
] as const;

export function PlanCostGuide({ plan }: { plan: Plan }) {
  const hasPricing = Boolean(plan.pricing);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Cost Guide
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            費用の考え方
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {plan.name}の総額の考え方。
          </h2>
        </div>

        <div className="mt-8 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
          <p className="text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            {hasPricing
              ? "葬儀の総額は、プランに含まれる基本費用に加えて、火葬料・式場使用料・お料理・返礼品・宗教者へのお礼などにより変動します。川口典礼では、ご家族の状況とご希望をうかがったうえで、正式なお見積りで個別にご案内します。"
              : `${plan.name}の費用は、ご家族の人数・ご希望の内容・ご利用予定の火葬場により変動します。プランの内容や費用の目安は、事前のご相談で個別にご案内します。`}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Included
            </p>
            <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
              プランに含まれるもの
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              基本費用としてご用意する項目です。
            </p>
            <ul className="mt-5 space-y-2.5 text-sm leading-7 text-ink md:text-base md:leading-8">
              {plan.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line-soft bg-cool p-6 shadow-sm md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              Additional
            </p>
            <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
              別途必要になる場合があるもの
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              ご希望の内容や状況により変動する項目です。
            </p>
            <ul className="mt-5 space-y-2.5 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              {plan.additional.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Check Points
          </p>
          <p className="font-serif-jp mt-2 text-xl font-medium text-ink-deep md:text-2xl">
            事前に確認しておきたい費用。
          </p>
          <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            葬儀社選びで分かりにくいのが「あとで追加されるかもしれない費用」です。川口典礼では、以下の項目を事前に整理してご案内します。
          </p>
          <ol className="mt-6 space-y-3">
            {costConfirmationPriorities.map((item, i) => (
              <li
                key={item.title}
                className="flex items-start gap-4 rounded-lg border border-line-soft bg-paper p-4 md:p-5"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint font-serif-jp text-base font-medium text-brand md:h-9 md:w-9"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-base font-bold text-ink-deep md:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 rounded-lg border border-line-soft bg-white p-6 md:p-8">
          <p className="text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            ご家族の人数・ご希望・ご利用予定の斎場などをお伺いし、正式なお見積りで個別にご案内します。事前相談・お見積りは無料です。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/estimate/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-paper"
            >
              費用の概算を依頼する
              <span aria-hidden>→</span>
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-4 text-base font-semibold text-ink-mid transition hover:border-brand hover:text-brand"
            >
              事前相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlanCompatibleHalls({ plan }: { plan: Plan }) {
  const hallSlugMap: Record<string, string> = {
    川口メモリアルホール: "/hall/kawaguchi-memorial-hall/",
    川口市めぐりの森: "/saijo/megurinomori/",
    戸田葬祭場: "/saijo/toda-sousaijyo/",
    谷塚斎場: "/saijo/yatsuka-saijo/",
  };

  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Halls
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            利用できる斎場
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {plan.name}で利用できる斎場・火葬場。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご希望や参列人数に合わせて、最適な斎場をご案内します。
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plan.compatibleHalls.map((hall) => {
            const href = hallSlugMap[hall];
            const Inner = (
              <div className="flex h-full flex-col gap-3 rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-brand">
                <p className="font-serif-jp text-lg font-medium text-ink-deep">
                  {hall}
                </p>
                <p className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand">
                  詳しく見る
                  <span aria-hidden>→</span>
                </p>
              </div>
            );
            return (
              <li key={hall}>
                {href ? <a href={href}>{Inner}</a> : Inner}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm leading-7 text-ink-mid md:text-base">
          川口市・近隣の他の葬儀場もご検討の方は、
          <a
            href="/saijo/"
            className="font-bold text-brand hover:underline"
          >
            各プランで利用できる葬儀場を見る
          </a>
          からまとめてご覧いただけます。
        </p>
      </div>
    </section>
  );
}

export function PlanFaq({ plan }: { plan: Plan }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            FAQ
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            よくある質問
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {plan.name}についてのご質問。
          </h2>
        </div>

        <ul className="mt-10 space-y-3">
          {plan.faqs.map((faq) => (
            <li key={faq.q}>
              <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                  <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                    <span aria-hidden className="font-serif-jp text-brand">
                      Q.
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                  <span
                    aria-hidden
                    className="font-serif-jp mr-2 font-bold text-brand"
                  >
                    A.
                  </span>
                  {faq.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PlanCta({ plan }: { plan: Plan }) {
  return (
    <section id="consultation" className="scroll-mt-24 bg-deep py-16 text-white md:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
          Contact
        </p>
        <p className="mt-2 text-sm font-semibold text-white/80">ご相談ください</p>
        <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.2rem]">
          {plan.name}のご相談、
          <br className="md:hidden" />
          まずはお気軽にお電話ください。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          費用の目安、流れ、含まれる内容など、ご不明な点はいつでもお問い合わせください。無理なご案内はいたしません。
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

const citizenFuneralOfficialSource = {
  url: "https://www.city.kawaguchi.lg.jp/soshiki/01090/010/sousai/19407.html",
  label: "川口市「葬祭事業」",
  updated: "2026-04-01",
};

const citizenFuneralRelatedLinks = [
  {
    label: "川口市めぐりの森",
    description: "市民葬で利用する川口市営の火葬場のご案内",
    href: "/saijo/megurinomori/",
  },
  {
    label: "川口メモリアルホール",
    description: "自社式場(川口市西新井宿)。仕様1のお別れにも対応します。",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "直葬プラン",
    description: "火葬中心のシンプルなお別れ・139,000円(税込)〜",
    href: "/plan/direct-funeral/",
  },
  {
    label: "一日葬プラン",
    description: "通夜なしの1日完結プラン・396,000円(税込)〜",
    href: "/plan/oneday-funeral/",
  },
  {
    label: "家族葬プラン",
    description: "ご家族中心のお別れ・528,000円(税込)〜",
    href: "/plan/family-funeral/",
  },
  {
    label: "川口市の葬儀・家族葬",
    description: "川口市全体の葬儀・対応エリアのご案内",
    href: "/area/kawaguchi/",
  },
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
];

export function PlanCitizenFuneralBody({ plan }: { plan: Plan }) {
  if (!plan.citizenFuneralInfo) return null;
  const info = plan.citizenFuneralInfo;

  return (
    <>
      {/* 結論ボックス（AIO向け） */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-brand/30 bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Summary
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.5] text-ink-deep md:text-[1.75rem]">
              川口市民葬(葬祭事業)とは。
            </h2>
            <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              川口市民葬(葬祭事業)は、川口市民の方が川口市めぐりの森で火葬を行う場合に利用できる、川口市の制度です。
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-ink md:text-base md:leading-8">
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  <span className="font-bold">仕様1: 通夜・告別式等を行う方</span> — 231,000円(税込)・市補助40,000円
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  <span className="font-bold">仕様2: 火葬のみを行う方</span> — 143,000円(税込)・市補助20,000円
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>補助は市から葬祭業者へ直接支払われます。利用者への現金給付ではありません。</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>別途、式場使用料・火葬料・宗教者費用などが必要になる場合があります。</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>川口典礼は川口市の葬祭事業登録業者として、申請手続き・葬儀・川口市めぐりの森での火葬までサポートします。</span>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-6 text-ink-soft md:text-sm">
              出典:{" "}
              <a
                href={citizenFuneralOfficialSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2 hover:text-brand-deep"
              >
                {citizenFuneralOfficialSource.label}
              </a>
              （{citizenFuneralOfficialSource.updated} 更新）
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Important
            </p>
            <h2 className="font-serif-jp mt-3 text-xl font-medium leading-[1.5] text-ink-deep md:text-2xl">
              {info.notice.heading}
            </h2>
            <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {info.notice.body}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Specs
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              基本仕様と費用
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              2つの仕様から選べます。
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {info.specs.map((spec) => (
              <article
                key={spec.id}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
              >
                <p className="text-xs font-bold tracking-[0.04em] text-ink-soft">
                  対象
                </p>
                <p className="font-serif-jp mt-1 text-lg font-medium text-ink-deep md:text-xl">
                  {spec.scope}
                </p>
                <div className="mt-5 border-t border-line-soft pt-5">
                  <p className="text-xs font-bold tracking-[0.04em] text-brand">
                    費用
                  </p>
                  <p className="font-serif-jp mt-1 text-[1.85rem] font-bold leading-none text-ink-deep md:text-[2rem]">
                    {spec.price}
                  </p>
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-ink-soft">
                      市の補助
                    </dt>
                    <dd className="mt-1 leading-7 text-ink">{spec.subsidy}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-soft">
                      利用条件
                    </dt>
                    <dd className="mt-1 leading-7 text-ink">{spec.coverage}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <p className="mt-8 rounded-lg border border-line-soft bg-cool px-5 py-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            {info.paymentNotice}
          </p>
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Eligibility
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              利用できる方
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご利用いただける方の条件。
            </h2>
          </div>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {info.eligibility.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-line bg-white px-5 py-5"
              >
                <span
                  aria-hidden
                  className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-base leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            ※ {info.ineligibilityNote}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Includes
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              含まれる内容
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              葬祭事業に含まれる5つの内容。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              下記(1)〜(5)の用具・サービスが、川口市の葬祭事業として提供されます。
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {info.categories.map((cat) => (
              <li
                key={cat.number}
                className="flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-sm md:p-7"
              >
                <p className="font-serif-jp text-xl font-medium text-brand">
                  {cat.number}
                </p>
                <p className="font-serif-jp mt-2 text-lg font-medium leading-[1.5] text-ink-deep md:text-xl">
                  {cat.title}
                </p>
                <ul className="mt-4 space-y-2 border-t border-line-soft pt-4">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-7 text-ink md:text-base md:leading-8"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Separate Fees
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              別途必要となる場合がある費用
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              基本仕様の費用以外に必要になる場合があるもの。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              ご希望の内容や状況により、以下の費用が別途必要になる場合があります。総額の目安は事前のご相談時にご案内します。
            </p>
          </div>

          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {info.separateFees.map((fee) => (
              <li
                key={fee}
                className="flex items-start gap-3 rounded-lg border border-line-soft bg-white px-5 py-4"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-ink-soft"
                />
                <span className="text-base leading-7 text-ink-mid">{fee}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
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
                川口典礼で市民葬を相談するメリット。
              </h2>
              <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
                川口典礼は川口市の葬祭事業登録業者です。申請手続きから葬儀の準備、川口市めぐりの森での火葬まで一貫してお手伝いします。
              </p>
            </div>

            <ul className="space-y-3">
              {info.supportPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-lg border border-line bg-paper p-5 shadow-sm md:p-6"
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

      {/* 中間 CTA */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Consultation
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              川口市民葬の利用条件や費用が
              <br className="md:hidden" />
              気になる方へ。
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              制度の対象になるか、仕様1・仕様2のどちらが合うか、別途必要になる費用の見通しなど、川口典礼までお気軽にご相談ください。事前相談・お見積りは無料です。
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-[1.2fr_1fr]">
              <a
                href="tel:0120-963-765"
                className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <span aria-hidden className="text-xl">
                  ☎
                </span>
                <span className="text-left">
                  <span className="block text-base font-bold leading-tight md:text-lg">
                    電話で相談する
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-white/90">
                    24時間365日 受付
                  </span>
                </span>
              </a>
              <a
                href="/contact/"
                className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep shadow-sm transition hover:bg-cool"
              >
                事前相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              FAQ
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              よくある質問
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              市民葬についてのご質問。
            </h2>
          </div>

          <ul className="mt-10 space-y-3">
            {info.faqs.map((faq) => (
              <li key={faq.q}>
                <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                    <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                      <span aria-hidden className="font-serif-jp text-brand">
                        Q.
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                    <span
                      aria-hidden
                      className="font-serif-jp mr-2 font-bold text-brand"
                    >
                      A.
                    </span>
                    {faq.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>

          {/* 出典・更新日 */}
          <div className="mt-10 rounded-lg border border-line-soft bg-white px-5 py-5 text-sm leading-7 text-ink-mid md:px-6 md:py-6 md:text-base md:leading-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              Source
            </p>
            <p className="mt-2 font-serif-jp text-base font-medium text-ink-deep md:text-lg">
              制度情報の確認元
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={citizenFuneralOfficialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline underline-offset-2 hover:text-brand-deep"
                >
                  {citizenFuneralOfficialSource.label}
                </a>
                （{citizenFuneralOfficialSource.updated} 更新確認）
              </li>
              <li className="text-ink-mid">
                当ページは、川口市公式情報と既存の川口典礼データをもとに掲載しています。制度内容は変更される場合があるため、最新情報は事前相談時にご確認ください。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Related
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              関連するページ
            </p>
            <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              川口市民葬を検討する方へ、
              <br className="md:hidden" />
              あわせてご覧ください。
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {citizenFuneralRelatedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-paper p-5 shadow-sm transition hover:border-brand hover:shadow-md md:p-6"
                >
                  <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {link.description}
                  </p>
                  <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    詳しく見る
                    <span aria-hidden>→</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
