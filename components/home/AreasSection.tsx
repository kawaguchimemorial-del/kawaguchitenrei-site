type AreaLink = { name: string; href?: string };

const kawaguchiAreas: AreaLink[] = [
  { name: "川口市", href: "/area/kawaguchi/" },
  { name: "新井宿" },
  { name: "鳩ヶ谷" },
];

const nearbyAreas: AreaLink[] = [
  { name: "戸田市" },
  { name: "蕨市" },
  { name: "草加市" },
];

const halls: AreaLink[] = [
  { name: "川口市めぐりの森", href: "/saijo/megurinomori/" },
  { name: "川口メモリアルホール", href: "/hall/kawaguchi-memorial-hall/" },
  { name: "戸田葬祭場" },
  { name: "谷塚斎場" },
];

export function AreasSection() {
  return (
    <section id="areas" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Area
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">対応エリア</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            川口市を中心に、
            <br className="md:hidden" />
            近隣エリアの葬儀に対応。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            川口市の直葬・花入れお別れ・一日葬・家族葬・市民葬を中心に、新井宿・鳩ヶ谷、また戸田市・蕨市・草加市など近隣エリアのご葬儀もご相談いただけます。
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              対応エリア
            </p>

            <p className="mt-4 text-sm font-bold text-ink-mid">
              川口市内エリア
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {kawaguchiAreas.map((area) => (
                <li key={area.name}>
                  {area.href ? (
                    <a
                      href={area.href}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-4 py-2 text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
                    >
                      {area.name}の葬儀
                      <span aria-hidden>›</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-line-soft bg-paper px-4 py-2 text-base font-semibold text-ink-mid">
                      {area.name}の葬儀
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-bold text-ink-mid">近隣エリア</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {nearbyAreas.map((area) => (
                <li key={area.name}>
                  {area.href ? (
                    <a
                      href={area.href}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-4 py-2 text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
                    >
                      {area.name}の葬儀
                      <span aria-hidden>›</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-line-soft bg-paper px-4 py-2 text-base font-semibold text-ink-mid">
                      {area.name}の葬儀
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              利用できる斎場
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {halls.map((hall) => (
                <li key={hall.name}>
                  {hall.href ? (
                    <a
                      href={hall.href}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
                    >
                      {hall.name}
                      <span aria-hidden>›</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-line-soft bg-white px-4 py-2 text-base font-semibold text-ink-mid">
                      {hall.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
