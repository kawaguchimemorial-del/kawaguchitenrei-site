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

/** 葬儀の流れ5段階。プランに含まれる工程だけを塗る（lib/plans.ts の flow が根拠） */
export const FUNERAL_STAGES = ["搬送", "安置", "通夜", "告別式", "火葬"] as const;
export type FuneralStage = (typeof FUNERAL_STAGES)[number];

/**
 * 各プランに含まれる工程。lib/plans.ts の flow 配列から読み取って記述している。
 *  direct-funeral   : お迎え・ご安置 → 火葬（通夜・告別式なし）
 *  hanaire-owakare  : お迎え・ご安置 → 花入れのお別れ → ご火葬（式は行わない）
 *  oneday-funeral   : お迎え・ご安置 → 告別式 → 火葬（通夜なし）
 *  yugure-kazokuso  : ご安置 → 夕方からの式 → 翌日火葬（通夜なし）
 *  family-funeral   : お迎え・ご安置 → 通夜 → 告別式 → 火葬
 *  kawaguchi-shimin : 内容によって変わるため、式の有無は「要相談」
 */
const PLAN_STAGES: Record<string, FuneralStage[]> = {
  "direct-funeral": ["搬送", "安置", "火葬"],
  "hanaire-owakare": ["搬送", "安置", "火葬"],
  "oneday-funeral": ["搬送", "安置", "告別式", "火葬"],
  "yugure-kazokuso": ["搬送", "安置", "告別式", "火葬"],
  "family-funeral": ["搬送", "安置", "通夜", "告別式", "火葬"],
  "kawaguchi-shimin": ["搬送", "安置", "通夜", "告別式", "火葬"],
};

/** 一覧で1行に添える短い説明（何を優先するプランかを一言で） */
const PLAN_LEAD: Record<string, string> = {
  "direct-funeral": "式を行わず、ご火葬を中心に",
  "hanaire-owakare": "火葬前に、お花を手向ける時間を",
  "oneday-funeral": "お通夜を行わず、一日で",
  "yugure-kazokuso": "夕方からの式で、翌日にご火葬",
  "family-funeral": "お通夜と告別式を、親しい方だけで",
  "kawaguchi-shimin": "川口市民の方のための市の制度",
};

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
  image: { src: string; alt: string } | null;
  lead: string;
  stages: FuneralStage[];
  /** 市民葬は内容により式の有無が変わるため、流れを断定しない */
  stagesNote?: string;
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
    image: plan.image ?? null,
    lead: PLAN_LEAD[plan.slug] ?? plan.short,
    stages: PLAN_STAGES[plan.slug] ?? [],
    stagesNote:
      plan.slug === "kawaguchi-shimin"
        ? "内容により異なります"
        : undefined,
  };
}

// 価格は lib/plans.ts（本サイト正本）からのみ導出する。LP側にハードコードしない。
export const lpPlans: LpPlan[] = LP_PLAN_SLUGS.map((slug) => {
  const plan = plans.find((item) => item.slug === slug);
  if (!plan) throw new Error(`LP: plan not found: ${slug}`);
  return toLpPlan(plan);
});
