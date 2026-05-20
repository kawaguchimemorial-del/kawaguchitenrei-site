type Strength = {
  category: string;
  number: string;
  unit: string;
  title: string;
  body: string;
};

const strengths: Strength[] = [
  {
    category: "Location",
    number: "5",
    unit: "分",
    title: "めぐりの森まで車で約5分",
    body: "火葬場までの移動負担を抑え、故人様とのお別れの時間を落ち着いて確保できます。",
  },
  {
    category: "Parking",
    number: "70",
    unit: "台",
    title: "駐車場70台完備",
    body: "ご高齢のご親族や遠方からの参列にも配慮し、敷地内に大型駐車スペースをご用意しています。",
  },
  {
    category: "Capacity",
    number: "200",
    unit: "名",
    title: "家族葬から一般葬まで対応",
    body: "少人数の家族葬から最大200名規模の一般葬まで、自社ホールで対応できます。",
  },
];

export function ThreeStrengthsSection() {
  return (
    <section
      id="strengths"
      className="bg-paper py-14 md:py-20"
      aria-labelledby="strengths-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Our Promise
          </p>
          <h2
            id="strengths-heading"
            className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]"
          >
            川口典礼が選ばれる
            <br className="md:hidden" />
            3つの安心。
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-mid md:text-lg md:leading-9">
            川口市西新井宿の自社ホールを中心に、ご家族の負担を抑えたお見送りをお手伝いします。
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {strengths.map((s) => (
            <li
              key={s.category}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                {s.category}
              </p>
              <p
                aria-hidden
                className="font-serif-jp mt-3 flex items-baseline leading-none text-brand"
              >
                <span className="text-5xl md:text-6xl">{s.number}</span>
                <span className="ml-1 text-base font-medium md:text-lg">
                  {s.unit}
                </span>
              </p>
              <p className="font-serif-jp mt-4 text-lg font-medium leading-[1.45] text-ink-deep md:text-xl">
                {s.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                {s.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-line-soft pt-8 md:mt-12 md:gap-5 md:pt-10">
          <p className="text-center text-sm leading-7 text-ink-mid md:text-base">
            <span className="font-serif-jp inline-flex flex-wrap items-baseline justify-center gap-1 text-ink-deep">
              創業
              <span className="text-brand">20年</span>
              <span aria-hidden className="mx-1 text-ink-soft">
                ／
              </span>
              年間
              <span className="text-brand">約260件</span>
              <span>の葬儀実績</span>
            </span>
            <span className="mt-1 block text-ink-soft">
              川口市西新井宿で、地域のご家族をお手伝いしてきました。
            </span>
          </p>
          <a
            href="/hall/kawaguchi-memorial-hall/"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
          >
            川口メモリアルホールを詳しく見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
