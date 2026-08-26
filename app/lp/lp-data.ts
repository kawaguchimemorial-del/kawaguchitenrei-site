import { plans, type Plan } from "@/lib/plans";

export const PHONE_DISPLAY = "0120-963-765";
export const PHONE_HREF = "tel:0120-963-765";

// 掲載するプラン（2026-08-26 松澤指示）。並び順もこの指定どおり。
const LP_PLAN_SLUGS = [
  "direct-funeral",
  "hanaire-owakare",
  "oneday-funeral",
  "yugure-kazokuso",
  "family-funeral",
  "kawaguchi-shimin",
] as const;

export type LpPlan = {
  slug: string;
  name: string;
  short: string;
  people: string;
  days: string;
  /** LPの主表示。ご逝去後にお越しの方は事前相談会員になれないため通常価格を出す */
  mainPrice: string;
  /** 補足として添える事前相談会員価格。市民葬など区分がないものは null */
  memberPrice: string | null;
  href: string;
};

function yen(value: number): string {
  return `${value.toLocaleString("ja-JP")}円（税込）`;
}

function toLpPlan(plan: Plan): LpPlan {
  const pricing = plan.pricing;
  let mainPrice = plan.price;
  let memberPrice: string | null = null;

  if (pricing?.type === "member-regular") {
    mainPrice = `${yen(pricing.regular)}〜`;
    memberPrice = `${yen(pricing.member)}〜`;
  } else if (pricing?.type === "citizen") {
    mainPrice = yen(pricing.citizen);
  }

  return {
    slug: plan.slug,
    name: plan.name,
    short: plan.short,
    people: plan.people,
    days: plan.days,
    mainPrice,
    memberPrice,
    href: `/plan/${plan.slug}/`,
  };
}

// 価格は lib/plans.ts（本サイト正本）からのみ導出する。LP側にハードコードしない。
export const lpPlans: LpPlan[] = LP_PLAN_SLUGS.map((slug) => {
  const plan = plans.find((item) => item.slug === slug);
  if (!plan) throw new Error(`LP: plan not found: ${slug}`);
  return toLpPlan(plan);
});
