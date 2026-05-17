import type { Hall } from "@/lib/halls";

export function HallAccess({ hall }: { hall: Hall }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hall.mapEmbedQuery
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
            アクセス・周辺案内。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご見学やご相談のためのアクセス情報です。お車・電車・タクシーいずれの場合もご案内します。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              所在地
            </p>
            <p className="font-serif-jp mt-3 text-xl font-medium leading-relaxed text-ink-deep md:text-2xl">
              〒{hall.postal}
              <br />
              {hall.address}
            </p>

            <dl className="mt-6 space-y-5 text-base">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  最寄駅
                </dt>
                <dd className="mt-2 space-y-1 text-ink-deep">
                  {hall.access.stations.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  お車で
                </dt>
                <dd className="mt-2 text-ink-deep">{hall.access.car}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  駐車場
                </dt>
                <dd className="mt-2 text-ink-deep">{hall.access.parking}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  近隣施設
                </dt>
                <dd className="mt-2 text-ink-deep">{hall.access.nearby}</dd>
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
              title="川口メモリアルホールの地図"
              src={`https://www.google.com/maps?q=${encodeURIComponent(hall.mapEmbedQuery)}&output=embed`}
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

export function HallFaq({ hall }: { hall: Hall }) {
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
            {hall.shortName}についてのご質問。
          </h2>
        </div>

        <ul className="mt-10 space-y-3">
          {hall.faqs.map((faq) => (
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

export function HallCta({ hall }: { hall: Hall }) {
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
          見学・事前相談
        </p>
        <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
          {hall.shortName}の見学・
          <br className="md:hidden" />
          事前相談を承ります。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          実際にご見学いただいて、ホールの雰囲気や設備をご確認いただけます。事前相談・お見積りは無料です。
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
            見学予約フォーム
          </a>
        </div>
      </div>
    </section>
  );
}
