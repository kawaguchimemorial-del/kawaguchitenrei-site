const hallFeatures = [
  "川口市西新井宿の自社ホール",
  "家族葬・一日葬に適した規模",
  "ご相談・事前見学にも対応",
  "川口市めぐりの森へ移動しやすい立地",
];

const hallGallery = [
  { label: "外観", aspect: "aspect-[4/3]" },
  { label: "式場", aspect: "aspect-[4/3]" },
  { label: "控室", aspect: "aspect-[4/3]" },
  { label: "相談スペース", aspect: "aspect-[4/3]" },
];

export function HallSection() {
  return (
    <section id="hall" className="bg-warm py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Hall
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">自社ホール</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            川口市西新井宿の、
            <br className="md:hidden" />
            川口メモリアルホール。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            少人数の家族葬・一日葬に適した、落ち着いた雰囲気のホールです。ご相談や事前見学も承ります。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="grid grid-cols-2 gap-3">
            {hallGallery.map((item) => (
              <div
                key={item.label}
                className={`${item.aspect} flex items-center justify-center rounded-lg border border-line bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)] text-sm font-semibold text-ink-soft`}
              >
                [{item.label}]
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-lg font-bold text-ink-deep md:text-xl">
              ホールの特長
            </p>
            <ul className="mt-5 space-y-3">
              {hallFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-lg bg-paper px-4 py-3 text-base leading-7 text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href="/hall/kawaguchi-memorial-hall/"
                className="rounded-lg bg-brand px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                ホールの詳細を見る
              </a>
              <a
                href="#consultation"
                className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-paper"
              >
                見学を相談する
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
