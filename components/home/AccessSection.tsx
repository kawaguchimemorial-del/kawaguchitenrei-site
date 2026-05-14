const accessMeta = [
  { label: "所在地", value: "埼玉県川口市西新井宿440-1" },
  { label: "対応", value: "事前相談・葬儀相談・ホール見学" },
  { label: "受付", value: "24時間365日" },
  { label: "駐車場", value: "あり" },
  { label: "近隣", value: "川口市めぐりの森" },
];

export function AccessSection() {
  return (
    <section id="access" className="bg-cool py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Access
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">アクセス</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            川口典礼・川口メモリアルホール。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            事前相談、ホール見学、葬儀のご相談など、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              本社・川口メモリアルホール
            </p>
            <p className="font-serif-jp mt-3 text-xl font-medium leading-relaxed text-ink-deep md:text-2xl">
              〒333-0833
              <br />
              埼玉県川口市西新井宿440-1
            </p>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-base">
              {accessMeta.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-semibold text-ink-soft">{row.label}</dt>
                  <dd className="text-ink-deep">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=%E5%9F%BC%E7%8E%89%E7%9C%8C%E5%B7%9D%E5%8F%A3%E5%B8%82%E8%A5%BF%E6%96%B0%E4%BA%95%E5%AE%BF440-1"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                Googleマップで見る
              </a>
              <a
                href="/access/"
                className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-paper"
              >
                アクセスページを見る
              </a>
            </div>
          </div>

          <div
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white shadow-sm md:aspect-auto md:min-h-[360px]"
            aria-label="地図プレースホルダー"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_24px,#e2eae3_24px,#e2eae3_25px),repeating-linear-gradient(90deg,transparent_0_24px,#e2eae3_24px,#e2eae3_25px),#faf8f3]"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
              📍
            </div>
            <div className="absolute bottom-3 right-3 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-ink-mid shadow">
              [Googleマップ埋め込み枠]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
