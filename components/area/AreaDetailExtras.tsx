import type { Area } from "@/lib/areas";

// セクション5: 川口典礼が選ばれる理由
export function AreaReasons({ area }: { area: Area }) {
  return (
    <section className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Why Us
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            川口典礼が選ばれる理由
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {area.name}のご葬儀で、
            <br className="md:hidden" />
            川口典礼が選ばれる理由。
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {area.reasons.map((r, idx) => (
            <li
              key={r.title}
              className="flex h-full flex-col gap-3 rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
            >
              <p className="font-serif-jp text-sm font-medium text-brand">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                {r.title}
              </p>
              <p className="text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                {r.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// セクション6: 葬儀までの流れ (全エリア共通)
const flowSteps = [
  {
    step: "Step 1",
    label: "ご相談・お問い合わせ",
    description:
      "お電話または事前相談フォームでご連絡ください。状況を伺い、必要なご案内を一つひとつ確認します。24時間365日対応です。",
  },
  {
    step: "Step 2",
    label: "お迎え",
    description:
      "ご逝去の際は、病院・施設・ご自宅へお迎えに伺います。ご安置先のご相談も承ります。",
  },
  {
    step: "Step 3",
    label: "お打合せ",
    description:
      "ご葬儀の日程、ご希望の形式、参列人数、宗教者の有無などを確認します。ご家族のご希望に沿ったプランをご提案します。",
  },
  {
    step: "Step 4",
    label: "ご安置",
    description:
      "ご自宅または当社ホールでのご安置に対応します。ドライアイスなど必要な手配を整えます。",
  },
  {
    step: "Step 5",
    label: "通夜・告別式または火葬",
    description:
      "ご希望の形式に合わせて、通夜・告別式または火葬を執り行います。スタッフがご家族をサポートします。",
  },
  {
    step: "Step 6",
    label: "アフターサポート",
    description:
      "葬儀後の役所手続き、四十九日や一周忌などの法要、仏壇・お墓のご相談まで、引き続きサポートします。",
  },
];

export function AreaFlow({ area }: { area: Area }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Flow
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            葬儀までの流れ
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            ご相談からアフターサポートまで。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            {area.name}のお客様にもご利用いただいている、お問い合わせから葬儀後のサポートまでの基本的な流れです。
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((s, i) => (
            <li
              key={s.step}
              className="flex gap-5 rounded-lg border border-line bg-paper p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint font-serif-jp text-lg font-medium text-brand">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  {s.step}
                </p>
                <p className="font-serif-jp mt-1 text-lg font-medium text-ink-deep md:text-xl">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// セクション7: FAQ
export function AreaFaq({ area }: { area: Area }) {
  return (
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
            {area.name}での葬儀について、
            <br className="md:hidden" />
            よくいただくご質問。
          </h2>
        </div>

        <ul className="mt-10 space-y-3">
          {area.faqs.map((faq) => (
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

        <div className="mt-8 text-right">
          <a
            href="/faq/"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
          >
            よくある質問の一覧を見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
