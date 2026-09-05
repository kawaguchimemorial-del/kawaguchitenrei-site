import { plans, type Plan } from "@/lib/plans";

export { PHONE_DISPLAY, PHONE_HREF } from "./lp-constants";


// 掲載する6プラン（2026-08-26指示）。データ順は維持する。
// 2026-09-06のLP再設計ではpage.tsxで主要3プランと追加3プランへ表示を分ける。
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

/**
 * プランごとの色。葬祭の文脈に合う彩度の低い色に限る（原色・蛍光色は使わない）。
 * プラン間の違いを一目で見分けるための識別色であり、装飾のためではない。
 */
const PLAN_ACCENT: Record<string, string> = {
  "direct-funeral": "#6b7a72",
  "hanaire-owakare": "#9b6f74",
  "oneday-funeral": "#3f7d78",
  "yugure-kazokuso": "#9a7442",
  "family-funeral": "#2a5145",
  "kawaguchi-shimin": "#4a5f7a",
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
  /** 大きく組むための分解（数字とそれ以外） */
  mainAmount: string;
  mainSuffix: string;
  /** 補足として添える事前相談会員価格。市民葬など区分がないものは null */
  memberPrice: string | null;
  href: string;
  image: { src: string; alt: string } | null;
  lead: string;
  accent: string;
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
  let mainAmount = plan.price;
  let mainSuffix = "";

  if (pricing?.type === "member-regular") {
    mainPrice = `${yen(pricing.regular)}〜`;
    memberPrice = `${yen(pricing.member)}〜`;
    mainAmount = pricing.regular.toLocaleString("ja-JP");
    mainSuffix = "円（税込）〜";
  } else if (pricing?.type === "citizen") {
    mainPrice = yen(pricing.citizen);
    mainAmount = pricing.citizen.toLocaleString("ja-JP");
    mainSuffix = "円（税込）";
  }

  return {
    slug: plan.slug,
    name: plan.name,
    short: plan.short,
    people: plan.people,
    days: plan.days,
    mainPrice,
    mainAmount,
    mainSuffix,
    memberPrice,
    href: `/plan/${plan.slug}/`,
    image: plan.image ?? null,
    lead: PLAN_LEAD[plan.slug] ?? plan.short,
    accent: PLAN_ACCENT[plan.slug] ?? "#2a5145",
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
