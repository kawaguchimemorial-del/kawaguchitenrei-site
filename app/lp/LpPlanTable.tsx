import Image from "next/image";
import Link from "next/link";

import { FUNERAL_STAGES, lpPlans, type LpPlan } from "./lp-data";

// 「葬儀の流れ」チップ。含まれる工程だけを塗り、含まれない工程は灰色で残す。
// 抜けている工程を消さずに薄く残すことで、プラン間の差が一目で分かる。
function StageChips({ plan }: { plan: LpPlan }) {
  return (
    <div>
      <ul className="flex items-stretch gap-0.5">
        {FUNERAL_STAGES.map((stage) => {
          const included = plan.stages.includes(stage);
          return (
            <li
              key={stage}
              className={`flex w-8 items-center justify-center rounded px-1 py-2 text-[10px] font-bold leading-tight md:w-9 md:text-[11px] ${
                included
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-ink-soft/60"
              }`}
            >
              <span className="[writing-mode:vertical-rl]">{stage}</span>
            </li>
          );
        })}
      </ul>
      {plan.stagesNote && (
        <p className="mt-1 text-[10px] text-ink-soft">※{plan.stagesNote}</p>
      )}
    </div>
  );
}

function PriceBlock({ plan }: { plan: LpPlan }) {
  return (
    <div>
      <p className="text-[22px] font-bold leading-tight text-emergency md:text-[26px]">
        {plan.mainPrice}
      </p>
      {plan.memberPrice && (
        <p className="mt-0.5 text-[11px] leading-5 text-ink-soft">
          事前相談会員価格 {plan.memberPrice}
        </p>
      )}
    </div>
  );
}

export function LpPlanTable() {
  return (
    <div className="mt-6">
      {/* PC：プラン名／通常価格／葬儀の流れ の3列 */}
      <div className="hidden overflow-hidden rounded-xl border border-line md:block">
        <div className="grid grid-cols-[1fr_240px_220px] bg-brand text-sm font-bold text-white">
          <div className="px-4 py-2.5">プラン名</div>
          <div className="border-l border-white/20 px-4 py-2.5">通常価格</div>
          <div className="border-l border-white/20 px-4 py-2.5">葬儀の流れ</div>
        </div>
        {lpPlans.map((plan) => (
          <Link
            key={plan.slug}
            href={plan.href}
            className="grid grid-cols-[1fr_240px_220px] items-center border-t border-line bg-white transition hover:bg-paper"
          >
            <div className="flex items-center gap-4 px-4 py-4">
              {plan.image && (
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded">
                  <Image
                    src={plan.image.src}
                    alt={plan.image.alt}
                    fill
                    loading="lazy"
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-xs text-ink-mid">{plan.lead}</p>
                <p className="font-serif-jp mt-0.5 text-xl font-medium text-brand-deep">
                  {plan.name}
                </p>
                <p className="mt-1 text-[11px] text-ink-soft">
                  {plan.people}／{plan.days}
                </p>
              </div>
            </div>
            <div className="border-l border-line px-4 py-4">
              <PriceBlock plan={plan} />
            </div>
            <div className="border-l border-line px-4 py-4">
              <StageChips plan={plan} />
            </div>
          </Link>
        ))}
      </div>

      {/* スマホ：横3列は狭いのでカードに落とす */}
      <div className="space-y-4 md:hidden">
        {lpPlans.map((plan) => (
          <Link
            key={plan.slug}
            href={plan.href}
            className="block overflow-hidden rounded-xl border border-line bg-white shadow-sm"
          >
            <div className="flex gap-3">
              {plan.image && (
                <div className="relative w-24 shrink-0">
                  <Image
                    src={plan.image.src}
                    alt={plan.image.alt}
                    fill
                    loading="lazy"
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 py-3 pr-3">
                <p className="text-[11px] text-ink-mid">{plan.lead}</p>
                <p className="font-serif-jp mt-0.5 text-base font-medium text-brand-deep">
                  {plan.name}
                </p>
                <p className="mt-0.5 text-[10px] text-ink-soft">
                  {plan.people}／{plan.days}
                </p>
                <div className="mt-1.5">
                  <PriceBlock plan={plan} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-line bg-paper px-3 py-2.5">
              <span className="shrink-0 text-[11px] font-bold text-ink-mid">
                葬儀の流れ
              </span>
              <StageChips plan={plan} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
