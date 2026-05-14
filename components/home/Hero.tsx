const trustPoints = [
  "24時間365日",
  "自社ホール完備",
  "川口市めぐりの森近く",
  "家族葬・一日葬・火葬式",
];

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-14 md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-14 md:px-8 md:pt-20 md:pb-24">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Kawaguchi Tenrei
          </p>
          <p className="mt-3 text-base font-bold text-ink-mid">
            川口市・新井宿の地域密着葬儀社
          </p>
          <h1 className="font-serif-jp mt-6 text-[2.4rem] font-medium leading-[1.32] tracking-normal text-ink-deep md:text-[3.4rem] md:leading-[1.22]">
            ご家族に寄り添う、
            <br />
            川口の葬儀社。
          </h1>
          <p className="mt-7 max-w-xl text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            川口メモリアルホールを拠点に、家族葬・一日葬・火葬式まで、ご家族の希望に合わせて落ち着いてご相談いただけます。
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-ink md:text-[0.95rem]">
            {trustPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="h-3 w-px bg-line" />
                )}
                <span className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                  />
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <a
              href="tel:0120-963-765"
              className="group flex w-full items-center justify-between gap-4 rounded-lg bg-emergency px-6 py-5 text-white shadow-sm transition hover:bg-emergency-deep md:max-w-md"
            >
              <span className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl"
                >
                  ☎
                </span>
                <span className="text-left">
                  <span className="block text-xl font-bold leading-tight">
                    電話で相談する
                  </span>
                  <span className="mt-1 block text-xs font-semibold tracking-wider text-white/85">
                    24時間365日 受付
                  </span>
                </span>
              </span>
              <span
                aria-hidden
                className="text-xl text-white/80 transition group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:max-w-md">
              <a
                href="#cost"
                className="rounded-lg border border-line bg-white px-5 py-3.5 text-center text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
              >
                費用の概算を見る
              </a>
              <a
                href="#consultation"
                className="rounded-lg border border-line bg-white px-5 py-3.5 text-center text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
              >
                事前相談する
              </a>
            </div>
          </div>
        </div>

        <figure className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-warm shadow-[0_24px_70px_rgba(26,42,35,0.12)] md:aspect-[5/6]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-deep/55 via-ink-deep/0 p-5 text-white md:p-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                  Memorial Hall
                </p>
                <p className="mt-1 text-base font-bold leading-tight md:text-lg">
                  川口メモリアルホール
                </p>
              </div>
              <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink-deep">
                西新井宿
              </span>
            </div>
            <div className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-semibold text-ink-mid/70">
              [ホール外観の写真]
            </div>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-ink-mid">
            <span>埼玉県川口市西新井宿440-1</span>
            <a href="#access" className="font-bold text-brand hover:underline">
              アクセスを見る →
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
