import Image from "next/image";

type PlanPricing =
  | { type: "member-regular"; member: number; regular: number }
  | { type: "citizen"; citizen: number };

type Plan = {
  slug: string;
  detailHref: string;
  ctaLabel: string;
  name: string;
  subtitle?: string;
  description: string;
  image: { src: string; alt: string };
  pricing: PlanPricing;
  highlights: string[];
};

const plans: Plan[] = [
  {
    slug: "direct-funeral",
    detailHref: "/plan/direct-funeral/",
    ctaLabel: "詳しく見る",
    name: "直葬プラン",
    description: "ご火葬を中心に、シンプルにお見送り。",
    image: {
      src: "/images/home/plans/plan-chokuso.png",
      alt: "直葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 139000, regular: 189000 },
    highlights: ["通夜・告別式なし", "1日", "ごく少人数"],
  },
  {
    slug: "hanaire-owakare",
    detailHref: "/contact/",
    ctaLabel: "詳しくは相談する",
    name: "花入れお別れプラン",
    subtitle: "お別れ会",
    description: "火葬前に、花入れのお別れ時間を。",
    image: {
      src: "/images/home/plans/plan-hanairere-owakare.png",
      alt: "花入れお別れプランのイメージ",
    },
    pricing: { type: "member-regular", member: 229000, regular: 279000 },
    highlights: ["お別れ時間あり", "1日", "少人数"],
  },
  {
    slug: "oneday-funeral",
    detailHref: "/plan/oneday-funeral/",
    ctaLabel: "詳しく見る",
    name: "一日葬プラン",
    description: "お通夜を行わず、一日でお見送り。",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "一日葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 396000, regular: 496000 },
    highlights: ["1日", "5〜30名", "通夜なし"],
  },
  {
    slug: "family-funeral",
    detailHref: "/plan/family-funeral/",
    ctaLabel: "詳しく見る",
    name: "家族葬プラン",
    description: "親しい方だけで、ゆっくりお見送り。",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "家族葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 528000, regular: 628000 },
    highlights: ["2日", "10〜50名", "通夜・告別式"],
  },
  {
    slug: "kawaguchi-shimin",
    detailHref: "/plan/kawaguchi-shimin/",
    ctaLabel: "詳しく見る",
    name: "市民葬プラン",
    subtitle: "川口市民の方向け",
    description: "川口市民の方のための安心プラン。",
    image: {
      src: "/images/home/plans/plan-shiminso.png",
      alt: "市民葬プランのイメージ",
    },
    pricing: { type: "citizen", citizen: 231000 },
    highlights: ["川口市民対象", "要相談"],
  },
];

function formatPrice(value: number): string {
  return `${value.toLocaleString("ja-JP")}円（税込）`;
}

function PriceBlock({ pricing }: { pricing: PlanPricing }) {
  if (pricing.type === "citizen") {
    return (
      <div>
        <p className="text-xs font-bold tracking-[0.04em] text-ink-mid md:text-sm">
          川口市民 葬祭事業価格
        </p>
        <p className="font-serif-jp mt-1 text-[1.65rem] font-bold leading-none text-ink-deep md:text-[1.85rem]">
          {formatPrice(pricing.citizen)}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.04em] text-brand md:text-sm">
        事前相談会員価格
      </p>
      <p className="font-serif-jp mt-1 text-[1.65rem] font-bold leading-none text-ink-deep md:text-[1.85rem]">
        {formatPrice(pricing.member)}
      </p>
      <p className="mt-1.5 text-[11px] leading-5 text-ink-mid md:text-xs">
        通常 {formatPrice(pricing.regular)}
      </p>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md">
      <div className="flex">
        <div className="relative w-28 flex-shrink-0 self-stretch bg-warm md:w-36">
          <Image
            src={plan.image.src}
            alt={plan.image.alt}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            className="object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1 p-4 md:p-5">
          {plan.subtitle && (
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand md:text-xs">
              {plan.subtitle}
            </p>
          )}
          <h3 className="font-serif-jp mt-0.5 text-lg font-medium leading-tight text-ink-deep md:text-xl">
            {plan.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-ink-mid md:text-sm md:leading-6">
            {plan.description}
          </p>

          <div className="mt-3 md:mt-4">
            <PriceBlock pricing={plan.pricing} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-soft px-4 py-3 md:px-5">
        <ul className="flex min-w-0 flex-wrap gap-1.5">
          {plan.highlights.map((tag) => (
            <li
              key={tag}
              className="whitespace-nowrap rounded-full border border-line-soft bg-paper px-2.5 py-1 text-[11px] font-bold text-ink md:text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={plan.detailHref}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand transition hover:text-brand-deep md:text-sm"
        >
          {plan.ctaLabel}
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

export function PlanSection() {
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
            川口市で、直葬・花入れお別れ・一日葬・家族葬・市民葬まで、ご家族の状況やご希望に合わせて葬儀の形式をお選びいただけます。費用や追加項目もあわせてご確認いただけます。
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm">
          ※「事前相談会員価格」は、事前相談にお申込みいただいた方の会員価格です。
        </p>

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-line-soft bg-cool px-6 py-5 text-sm leading-7 text-ink-mid md:flex-row md:items-center md:justify-between md:text-base">
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
