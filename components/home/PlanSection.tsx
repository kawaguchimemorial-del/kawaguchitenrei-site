type Plan = {
  name: string;
  summary: string;
  forWhom: string;
  people: string;
  days: string;
  price: string;
  featured?: boolean;
  slug: string;
};

const plans: Plan[] = [
  {
    name: "家族葬",
    summary: "ご家族や親しい方を中心に、落ち着いてお見送りする葬儀です。",
    forWhom: "身近な方だけで丁寧に見送りたい方",
    people: "10〜50名",
    days: "2日",
    price: "税込○○万円〜",
    featured: true,
    slug: "family-funeral",
  },
  {
    name: "一日葬",
    summary: "お通夜を行わず、告別式と火葬を一日で執り行う形式です。",
    forWhom: "負担を抑えつつ式を行いたい方",
    people: "5〜30名",
    days: "1日",
    price: "税込○○万円〜",
    slug: "oneday-funeral",
  },
  {
    name: "火葬式",
    summary: "通夜・告別式を行わず、火葬を中心にお見送りする形式です。",
    forWhom: "できるだけシンプルに見送りたい方",
    people: "少人数",
    days: "1日",
    price: "税込○○万円〜",
    slug: "cremation",
  },
  {
    name: "直葬",
    summary: "宗教儀礼を簡略にし、必要な手配と火葬を中心に整えます。",
    forWhom: "費用を抑え、簡素に見送りたい方",
    people: "ごく少人数",
    days: "1日",
    price: "税込○○万円〜",
    slug: "direct-funeral",
  },
  {
    name: "川口市民葬",
    summary: "川口市の制度を利用した葬儀にも対応します。条件は事前にご確認ください。",
    forWhom: "川口市の制度を活用したい方",
    people: "要相談",
    days: "要相談",
    price: "内容により変動",
    slug: "kawaguchi-shimin",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const isFeatured = plan.featured;
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md md:p-7 ${
        isFeatured ? "border-brand" : "border-line"
      }`}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
          最も選ばれている形式
        </span>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif-jp text-2xl font-medium text-ink-deep md:text-[1.6rem]">
          {plan.name}
        </h3>
        <p className="text-right text-sm font-bold text-brand">{plan.price}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
        {plan.summary}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line-soft pt-4 text-sm">
        <div>
          <dt className="text-xs font-semibold text-ink-soft">日数</dt>
          <dd className="mt-1 font-bold text-ink-deep">{plan.days}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-ink-soft">参列</dt>
          <dd className="mt-1 font-bold text-ink-deep">{plan.people}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-ink-soft">向いている方</dt>
          <dd className="mt-1 text-xs leading-5 text-ink-mid md:text-sm">
            {plan.forWhom}
          </dd>
        </div>
      </dl>

      <a
        href={`/plan/${plan.slug}/`}
        className={`mt-6 inline-flex items-center justify-center gap-1 rounded-lg px-5 py-3 text-base font-bold transition ${
          isFeatured
            ? "bg-brand text-white hover:bg-brand-deep"
            : "border border-ink-deep bg-white text-ink-deep hover:bg-cool"
        }`}
      >
        {plan.name}の詳細を見る
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

export function PlanSection() {
  const [featured, ...rest] = plans;
  return (
    <section id="plans" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Plan
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.35] text-ink-deep md:text-[2.4rem]">
            ご希望とご予算に合わせて選べる、
            <br className="md:hidden" />
            5つの葬儀形式。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご家族の状況やご希望に合わせて、葬儀の形式をお選びいただけます。費用や追加項目もあわせてご確認いただけます。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <PlanCard plan={featured} />
          </div>
          {rest.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 rounded-lg border border-line-soft bg-cool px-6 py-5 text-sm leading-7 text-ink-mid md:flex-row md:items-center md:justify-between md:text-base">
          <p>
            プランの違いや追加費用が発生しやすい項目について、より詳しい料金ページもご用意しています。
          </p>
          <a
            href="/plan/"
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-ink-deep bg-white px-5 py-3 text-base font-bold text-ink-deep transition hover:bg-paper"
          >
            料金プラン一覧を見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
