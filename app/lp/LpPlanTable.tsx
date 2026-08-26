import Image from "next/image";
import Link from "next/link";

import { FUNERAL_STAGES, lpPlans, type LpPlan } from "./lp-data";

// 「葬儀の流れ」チップ。含まれる工程だけを塗り、含まれない工程は灰色で残す。
// 抜けている工程を消さずに薄く残すことで、プラン間の差が一目で分かる。
// PC専用。モバイルでは写真とプラン名を大きく見せることを優先して出さない。
function StageChips({ plan }: { plan: LpPlan }) {
  return (
    <div>
      <ul className="flex items-stretch gap-0.5">
        {FUNERAL_STAGES.map((stage) => {
          const included = plan.stages.includes(stage);
          return (
            <li
              key={stage}
              className="flex w-9 items-center justify-center rounded px-1 py-2 text-[11px] font-bold leading-tight"
              style={
                included
                  ? { backgroundColor: plan.accent, color: "#fff" }
                  : undefined
              }
            >
              <span
                className={`[writing-mode:vertical-rl] ${
                  included ? "" : "text-ink-soft/50"
                }`}
              >
                {stage}
              </span>
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

// 価格。数字を大きく、単位と税込表記を小さく組む（折り返させない）。
function Price({ plan, big = false }: { plan: LpPlan; big?: boolean }) {
  return (
    <div>
      <p className="whitespace-nowrap leading-none text-emergency">
        <span className={`font-bold ${big ? "text-[40px]" : "text-[26px]"}`}>
          {plan.mainAmount}
        </span>
        <span
          className={`ml-0.5 font-bold ${big ? "text-[18px]" : "text-[14px]"}`}
        >
          {plan.mainSuffix}
        </span>
      </p>
      {plan.memberPrice && (
        <p className="mt-1.5 text-[11px] leading-5 text-ink-soft">
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
        <div className="grid grid-cols-[minmax(0,1fr)_230px_210px] bg-brand text-sm font-bold text-white">
          <div className="px-4 py-2.5">プラン名</div>
          <div className="border-l border-white/20 px-4 py-2.5">通常価格</div>
          <div className="border-l border-white/20 px-4 py-2.5">葬儀の流れ</div>
        </div>
        {lpPlans.map((plan) => (
          <Link
            key={plan.slug}
            href={plan.href}
            className="grid grid-cols-[minmax(0,1fr)_230px_210px] items-center border-t border-line bg-white transition hover:bg-paper"
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
                <p
                  className="font-serif-jp mt-0.5 whitespace-nowrap text-xl font-medium"
                  style={{ color: plan.accent }}
                >
                  {plan.name}
                </p>
                <p className="mt-1 text-[11px] text-ink-soft">
                  {plan.people}／{plan.days}
                </p>
              </div>
            </div>
            <div className="border-l border-line px-4 py-4">
              <Price plan={plan} />
            </div>
            <div className="border-l border-line px-4 py-4">
              <StageChips plan={plan} />
            </div>
          </Link>
        ))}
      </div>

      {/* モバイル：写真とプラン名・価格を大きく見せる。葬儀の流れは載せない。 */}
      <div className="space-y-5 md:hidden">
        {lpPlans.map((plan) => (
          <Link
            key={plan.slug}
            href={plan.href}
            className="block overflow-hidden rounded-xl border border-line bg-white shadow-sm"
          >
            {/* キャッチコピーの帯（プランごとの識別色） */}
            <p
              className="px-4 py-2 text-center text-[13px] font-bold text-white"
              style={{ backgroundColor: plan.accent }}
            >
              {plan.lead}
            </p>

            <div className="px-4 pb-4 pt-3">
              <p
                className="font-serif-jp text-center text-[26px] font-medium leading-tight"
                style={{ color: plan.accent }}
              >
                {plan.name}
              </p>

              <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                <li className="rounded bg-paper px-2 py-1 text-[11px] text-ink-mid">
                  {plan.days}
                </li>
                <li className="rounded bg-paper px-2 py-1 text-[11px] text-ink-mid">
                  {plan.people}
                </li>
                <li className="rounded bg-paper px-2 py-1 text-[11px] text-ink-mid">
                  全宗派対応
                </li>
              </ul>

              {plan.image && (
                <div className="relative mt-3 h-44 w-full overflow-hidden rounded-lg">
                  <Image
                    src={plan.image.src}
                    alt={plan.image.alt}
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mt-3 rounded-lg bg-paper px-3 py-3 text-center">
                <p className="text-[11px] font-bold text-ink-mid">通常価格</p>
                <div className="mt-1">
                  <Price plan={plan} big />
                </div>
              </div>

              <p
                className="mt-3 rounded py-2 text-center text-[13px] font-bold text-white"
                style={{ backgroundColor: plan.accent }}
              >
                プランの詳細を見る
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
