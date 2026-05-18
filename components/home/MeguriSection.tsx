const HALL_QUERY = "川口メモリアルホール 埼玉県川口市西新井宿440-1";
const SAIJO_QUERY = "川口市めぐりの森 埼玉県川口市大字新井宿430-1";
const ROUTE_EMBED_SRC = `https://www.google.com/maps?saddr=${encodeURIComponent(
  HALL_QUERY
)}&daddr=${encodeURIComponent(SAIJO_QUERY)}&output=embed`;
const ROUTE_EXTERNAL_HREF = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
  HALL_QUERY
)}&destination=${encodeURIComponent(SAIJO_QUERY)}`;

const meguriPlans = [
  {
    name: "直葬プラン",
    description: "ご火葬を中心に、シンプルにお見送りしたい方へ",
    href: "/plan/direct-funeral/",
  },
  {
    name: "一日葬",
    description: "通夜を行わず、一日でお別れしたい方へ",
    href: "/plan/oneday-funeral/",
  },
  {
    name: "家族葬",
    description: "ご家族中心で、落ち着いてお見送りしたい方へ",
    href: "/plan/family-funeral/",
  },
];

export function MeguriSection() {
  return (
    <section id="meguri" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Saijo
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口市めぐりの森
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
              川口市めぐりの森での
              <br className="md:hidden" />
              火葬・葬儀にも対応。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              当ホール(川口メモリアルホール)から川口市めぐりの森まで車で約5分。火葬場までの移動が短く、ご親族のご負担を抑えてお見送りができます。当ホールでの通夜+翌日めぐりの森での火葬という組み合わせもスムーズです。
            </p>

            <a
              href="/saijo/megurinomori/"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
            >
              川口市めぐりの森の葬儀を見る
              <span aria-hidden>→</span>
            </a>

            <p className="mt-5 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              他にも、谷塚斎場・戸田葬祭場・町屋斎場・寺院会館でのご葬儀にも対応します。
            </p>
          </div>

          <div className="rounded-lg border border-line bg-paper p-5 shadow-sm md:p-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-warm">
              <iframe
                title="川口メモリアルホールから川口市めぐりの森までの地図"
                src={ROUTE_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <a
              href={ROUTE_EXTERNAL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
            >
              Googleマップでルートを見る
              <span aria-hidden>→</span>
            </a>

            <ul className="mt-5 space-y-3">
              {meguriPlans.map((plan) => (
                <li key={plan.name}>
                  <a
                    href={plan.href}
                    className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white px-4 py-4 text-left shadow-sm transition hover:border-brand"
                  >
                    <div>
                      <p className="text-base font-bold text-ink-deep">
                        {plan.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-ink-mid">
                        {plan.description}
                      </p>
                    </div>
                    <span aria-hidden className="text-xl text-ink-soft">
                      ›
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
