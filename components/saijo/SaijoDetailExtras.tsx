import type { Saijo } from "@/lib/saijo";

export function SaijoAccess({ saijo }: { saijo: Saijo }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    saijo.mapEmbedQuery
  )}`;

  return (
    <section id="access" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Access
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">アクセス</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            {saijo.shortName}へのアクセス。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            川口典礼から{saijo.shortName}までの移動はお任せください。霊柩車・案内車両の手配も含めて対応します。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              所在地
            </p>
            <p className="font-serif-jp mt-3 text-xl font-medium leading-relaxed text-ink-deep md:text-2xl">
              {saijo.postal && <>〒{saijo.postal}　</>}
              {saijo.address}
            </p>

            <dl className="mt-6 space-y-5 text-base">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  川口典礼から
                </dt>
                <dd className="mt-2 text-ink-deep">
                  {saijo.access.fromKawaguchi}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  最寄駅
                </dt>
                <dd className="mt-2 space-y-1 text-ink-deep">
                  {saijo.access.stations.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  お車で
                </dt>
                <dd className="mt-2 text-ink-deep">{saijo.access.car}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  駐車場
                </dt>
                <dd className="mt-2 text-ink-deep">{saijo.access.parking}</dd>
              </div>
            </dl>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                Googleマップで見る
              </a>
              <a
                href="tel:0120-963-765"
                className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                電話で確認する
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white shadow-sm md:aspect-auto md:min-h-[420px]">
            <iframe
              title="川口市めぐりの森の地図"
              src={`https://www.google.com/maps?q=${encodeURIComponent(saijo.mapEmbedQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SaijoFaq({ saijo }: { saijo: Saijo }) {
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
            {saijo.shortName}についてのご質問。
          </h2>
        </div>

        <ul className="mt-10 space-y-3">
          {saijo.faqs.map((faq) => (
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

export function SaijoCta({ saijo }: { saijo: Saijo }) {
  return (
    <section
      id="consultation"
      className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
          Contact
        </p>
        <p className="mt-2 text-sm font-semibold text-white/80">
          ご相談ください
        </p>
        <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
          {saijo.shortName}でのご葬儀、
          <br className="md:hidden" />
          川口典礼へご相談ください。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          {saijo.shortName}でのご葬儀の手配・お見送りを、24時間365日承っています。事前のご相談・お見積りは無料です。
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
