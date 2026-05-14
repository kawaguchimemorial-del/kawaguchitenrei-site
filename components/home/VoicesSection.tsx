import { getRecentVoices } from "@/lib/voices";

export function VoicesSection() {
  const items = getRecentVoices(2);

  return (
    <section id="voices" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Voices
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            お客様の声
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            ご利用いただいたご家族の声。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            プラン・人数・総額・施行場所もあわせて掲載しています。掲載は個人情報を確認のうえ、ご家族の許可を得ています。
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((voice) => (
            <li key={voice.slug}>
              <article className="flex h-full flex-col gap-5 rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
                <p className="font-serif-jp text-lg font-medium leading-[1.6] text-ink-deep md:text-xl">
                  「{voice.title}」
                </p>
                <blockquote className="border-l-2 border-brand pl-4 text-sm leading-8 text-ink-mid md:text-base">
                  {voice.quote}
                </blockquote>

                <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-lg border border-line-soft bg-white px-4 py-4 text-sm">
                  <dt className="text-ink-soft">プラン</dt>
                  <dd className="font-semibold text-ink-deep">
                    {voice.format}
                  </dd>
                  <dt className="text-ink-soft">参列人数</dt>
                  <dd className="font-semibold text-ink-deep">
                    {voice.people}
                  </dd>
                  <dt className="text-ink-soft">総額</dt>
                  <dd className="font-bold text-brand">{voice.total}</dd>
                  <dt className="text-ink-soft">施行場所</dt>
                  <dd className="font-semibold text-ink-deep">{voice.hall}</dd>
                </dl>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-ink-soft">{voice.family}</span>
                  <a
                    href={`/voice/${voice.slug}/`}
                    className="inline-flex items-center gap-1 font-bold text-brand hover:underline"
                  >
                    詳しく見る
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-4 rounded-lg border border-gold/40 bg-gold-soft/50 p-4">
            <div className="flex aspect-square w-20 shrink-0 items-center justify-center rounded-md border border-dashed border-gold bg-white text-[11px] font-semibold text-gold">
              [手書き]
            </div>
            <div>
              <p className="text-base font-bold text-ink-deep">
                手書きのお客様アンケートも掲載しています
              </p>
              <p className="mt-1 text-sm leading-6 text-ink-mid">
                個人情報を確認・マスキングしたうえで、ご家族の許可を得て掲載しています。
              </p>
            </div>
          </div>
          <a
            href="/voice/"
            className="block w-full rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep shadow-sm md:w-auto"
          >
            お客様の声を見る
          </a>
        </div>
      </div>
    </section>
  );
}
