type Strength = {
  number: string;
  unit: string;
  label: string;
  description: string;
  ariaLabel: string;
};

const strengths: Strength[] = [
  {
    number: "5",
    unit: "分",
    label: "川口市めぐりの森まで",
    description:
      "自社ホールから公営火葬場まで車で約5分の好立地。火葬場までの移動が短く、ご親族のご負担を抑え、お別れの時間を最大限に確保できます。",
    ariaLabel: "川口市めぐりの森まで車で約5分",
  },
  {
    number: "70",
    unit: "台",
    label: "敷地内駐車場",
    description:
      "一般葬・大規模葬でも、近隣にご迷惑をおかけしない大型駐車場。ご高齢の方も歩く距離を最小限にできます。利用は無料です。",
    ariaLabel: "敷地内駐車場70台",
  },
  {
    number: "200",
    unit: "名",
    label: "一般葬まで対応",
    description:
      "少人数の家族葬から、最大200名規模の一般葬まで。ご家族のご希望に合わせて、式の規模で困らない自社ホールです。",
    ariaLabel: "家族葬から200名規模の一般葬まで対応",
  },
];

export function ThreeStrengthsSection() {
  return (
    <section
      id="strengths"
      className="bg-paper py-16 md:py-24"
      aria-labelledby="strengths-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Our Strengths
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            川口典礼の3つの強み
          </p>
          <h2
            id="strengths-heading"
            className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]"
          >
            ご家族に選ばれる、
            <br className="md:hidden" />
            川口典礼の3つの強み。
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {strengths.map((s, idx) => (
            <li key={s.label}>
              <article
                aria-label={s.ariaLabel}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-sm md:p-8"
              >
                <p className="font-serif-jp text-xs font-medium tracking-[0.18em] text-brand">
                  0{idx + 1}
                </p>
                <p
                  className="font-serif-jp mt-4 leading-none text-ink-deep"
                  aria-hidden
                >
                  <span className="text-[4rem] font-medium md:text-[5rem]">
                    {s.number}
                  </span>
                  <span className="ml-1 text-2xl font-medium md:text-3xl">
                    {s.unit}
                  </span>
                </p>
                <p className="font-serif-jp mt-3 text-lg font-medium text-ink-deep md:text-xl">
                  {s.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {s.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 rounded-lg border border-line-soft bg-white px-6 py-5 text-center text-sm leading-7 text-ink-mid md:px-8 md:py-6 md:text-base">
          創業から
          <strong className="font-serif-jp mx-1 text-lg font-medium text-brand md:text-xl">
            20年
          </strong>
          、川口市西新井宿の地で、年間
          <strong className="font-serif-jp mx-1 text-lg font-medium text-brand md:text-xl">
            約260件
          </strong>
          のご葬儀をお手伝いしてきました。
        </p>
      </div>
    </section>
  );
}
