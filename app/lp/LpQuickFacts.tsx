import Link from "next/link";

import { lpPlans } from "./lp-data";

// 最初の画面で「どう来てくれるか・いくら・どこ」に答える3行（2026-09-28 専門家会議）。
// 順番はご逝去直後の方の問いに合わせて お迎え → 費用 → 場所。
// 価格は lp-data（= lib/plans.ts）から導出し、LPの方針どおり通常価格を出す。
// 金額の近くに条件（火葬料などは別途）を置く（CLAUDE.md §14）。
const direct = lpPlans.find((plan) => plan.slug === "direct-funeral");
const family = lpPlans.find((plan) => plan.slug === "family-funeral");

const FACTS = [
  {
    label: "お迎え",
    body: "24時間365日、寝台車でうかがいます。その場で内容を決める必要はありません。",
  },
  {
    label: "費用",
    body:
      direct && family
        ? `直葬 ${direct.mainAmount}円〜／家族葬 ${family.mainAmount}円〜（税込・通常価格）`
        : "プランごとの料金は、下の「費用の目安」でご確認いただけます。",
  },
  {
    label: "場所",
    body: "川口市西新井宿の自社式場（めぐりの森まで車で約5分）",
  },
];

export function LpQuickFacts() {
  return (
    <div className="rounded-xl border border-line bg-white/95 px-3.5 py-2.5 text-left shadow-sm">
      <dl className="divide-y divide-line-soft">
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex gap-2.5 py-1.5">
            <dt className="w-[3.2em] shrink-0 text-[15px] font-bold leading-6 text-brand-deep">
              {fact.label}
            </dt>
            <dd className="text-[15px] font-medium leading-6 text-ink">{fact.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-1 text-[12px] leading-5 text-ink-mid">
        ※火葬料などは別途かかります。{" "}
        <Link href="#price" className="font-bold text-brand underline underline-offset-2">
          全プランの料金を見る
        </Link>
      </p>
    </div>
  );
}
