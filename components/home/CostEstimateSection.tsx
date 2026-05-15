const costItems = [
  "葬儀形式と参列人数",
  "式場・火葬場の利用",
  "返礼品やお料理の有無",
  "ご安置日数と搬送距離",
];

export function CostEstimateSection() {
  return (
    <section id="cost" className="bg-cool py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Cost
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">費用について</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            葬儀費用の概算を、
            <br />
            事前に分かりやすく。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご希望の送り方や人数を伺い、必要な費用を整理してご案内します。追加費用が分かりにくい項目も、後で確認しやすい形でまとめます。
          </p>
          <div className="mt-7">
            <a
              href="/plan/"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
            >
              料金プランを見る
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div
          id="consultation"
          className="scroll-mt-24 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-lg font-bold text-ink-deep md:text-xl">
            概算時に確認すること
          </p>
          <ul className="mt-5 space-y-3">
            {costItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg bg-paper px-4 py-4"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                <p className="text-base font-semibold text-ink">{item}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-7 text-ink-soft">
            ※ 概算金額は正式なお見積りではありません。安置日数、火葬場、式場使用料、料理、返礼品、宗教者、搬送距離などにより変動します。
          </p>
        </div>
      </div>
    </section>
  );
}
