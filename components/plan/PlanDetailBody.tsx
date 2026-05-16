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

export function PlanCompatibleHalls({ plan }: { plan: Plan }) {
  const hallSlugMap: Record<string, string> = {
    川口メモリアルホール: "/hall/kawaguchi-memorial-hall/",
    川口市めぐりの森: "/saijo/megurinomori/",
    戸田葬祭場: "/saijo/toda-sousaijo/",
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

export function PlanCitizenFuneralBody({ plan }: { plan: Plan }) {
  if (!plan.citizenFuneralInfo) return null;
  const info = plan.citizenFuneralInfo;

  return (
    <>
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
        </div>
      </section>
    </>
  );
}
