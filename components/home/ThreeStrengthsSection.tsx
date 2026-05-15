type Strength = {
  category: string;
  number: string;
  unit: string;
  headline: { lead: string; emphasis: string; tail: string };
  body: string;
};

const strengths: Strength[] = [
  {
    category: "立地",
    number: "5",
    unit: "分",
    headline: {
      lead: "川口市めぐりの森まで、",
      emphasis: "車で約5分",
      tail: "の好立地。",
    },
    body: "火葬場までの移動が短いということは、ご親族のお身体のご負担を抑えるということ。そして、故人様とのお別れの時間を、最大限に確保できるということです。",
  },
  {
    category: "駐車場",
    number: "70",
    unit: "台",
    headline: {
      lead: "敷地内に、",
      emphasis: "駐車場70台",
      tail: "完備。",
    },
    body: "参列の方がお車でお越しになる際、ご高齢のご親族が歩く距離を抑えられるよう、また近隣にご迷惑をおかけしないよう、大型の駐車スペースをご用意しています。",
  },
  {
    category: "対応規模",
    number: "200",
    unit: "名",
    headline: {
      lead: "家族葬から、最大",
      emphasis: "200名規模の一般葬",
      tail: "まで。",
    },
    body: "ご家族のみの少人数のお見送りから、参列者の多いご葬儀まで、自社ホールでお手配します。式の規模で困らないこと。それも川口典礼が大切にしていることです。",
  },
];

export function ThreeStrengthsSection() {
  return (
    <section
      id="strengths"
      className="bg-paper py-16 md:py-24"
      aria-labelledby="strengths-heading"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Our Promise
          </p>
          <h2
            id="strengths-heading"
            className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]"
          >
            川口典礼が、
            <br className="md:hidden" />
            ご家族にお伝えしたい3つのこと。
          </h2>
        </div>

        <div className="mt-12 md:mt-16">
          {strengths.map((s, idx) => (
            <article
              key={s.category}
              className={`grid items-baseline gap-x-10 gap-y-5 py-9 md:grid-cols-[180px_1fr] md:py-12 ${
                idx > 0 ? "border-t border-line-soft" : ""
              }`}
            >
              <div className="flex items-baseline gap-4 md:block">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                  {s.category}
                </p>
                <p
                  aria-hidden
                  className="font-serif-jp leading-none text-brand md:mt-5"
                >
                  <span className="text-3xl md:text-[2.4rem]">{s.number}</span>
                  <span className="ml-1 text-sm font-medium md:text-base">
                    {s.unit}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-serif-jp text-xl font-medium leading-[1.55] text-ink-deep md:text-[1.6rem] md:leading-[1.5]">
                  {s.headline.lead}
                  <span className="text-brand">{s.headline.emphasis}</span>
                  {s.headline.tail}
                </h3>
                <p className="mt-4 text-base leading-9 text-ink-mid md:mt-5 md:text-lg md:leading-10">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-line-soft pt-9 text-center md:mt-16 md:pt-12">
          <p className="font-serif-jp text-base leading-[2.1] text-ink-mid md:text-lg">
            創業から
            <span className="mx-1 text-brand">20年</span>
            、川口市西新井宿の地で、
            <br className="md:hidden" />
            年間
            <span className="mx-1 text-brand">約260件</span>
            のご葬儀をお手伝いしてきました。
          </p>
        </div>
      </div>
    </section>
  );
}
