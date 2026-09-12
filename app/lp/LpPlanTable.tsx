import Image from "next/image";
import Link from "next/link";

import {
  FUNERAL_STAGES,
  PHONE_DISPLAY,
  PHONE_HREF,
  lpPlans,
  type LpPlan,
} from "./lp-data";

// 「葬儀の流れ」チップ。含まれる工程だけを塗り、含まれない工程は灰色で残す。
// 抜けている工程を消さずに薄く残すことで、プラン間の差が一目で分かる。
// PCは表の中に、モバイルはカードを開いたときに出す。
function StageChips({ plan }: { plan: LpPlan }) {
  return (
    <div>
      <ul className="flex items-stretch gap-0.5">
        {FUNERAL_STAGES.map((stage) => {
          const included = plan.stages.includes(stage);
          return (
            <li
              key={stage}
              className="flex w-9 items-center justify-center rounded px-1 py-2 text-[13px] font-bold leading-tight"
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
        <p className="mt-1 text-[12px] text-ink-soft">※{plan.stagesNote}</p>
      )}
    </div>
  );
}

// 価格。数字を大きく、単位と税込表記を小さく組む（折り返させない）。
function Price({ plan, big = false }: { plan: LpPlan; big?: boolean }) {
  return (
    <div>
      <p className="whitespace-nowrap leading-none text-emergency">
        {/* 数字は和文フォントに900の字形がなく font-black だけでは太りきらないため、
            同色の輪郭を足して太らせる（競合の価格表示に合わせた） */}
        <span
          style={{ WebkitTextStroke: "0.9px currentColor" }}
          className={`font-black tracking-tight ${
            big ? "text-[40px]" : "text-[30px] md:text-[34px]"
          }`}
        >
          {plan.mainAmount}
        </span>
        <span
          style={{ WebkitTextStroke: "0.4px currentColor" }}
          className={`ml-0.5 font-black ${
            big ? "text-[18px]" : "text-[15px]"
          }`}
        >
          {plan.mainSuffix}
        </span>
      </p>
      {plan.memberPrice && (
        <p className="mt-1.5 text-[13px] font-medium leading-5 text-ink-mid">
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
        <div className="grid grid-cols-[minmax(0,1fr)_296px_200px] bg-brand text-sm font-bold text-white">
          <div className="px-4 py-2.5">プラン名</div>
          <div className="border-l border-white/20 px-4 py-2.5">通常価格</div>
          <div className="border-l border-white/20 px-4 py-2.5">葬儀の流れ</div>
        </div>
        {lpPlans.map((plan) => (
          <details key={plan.slug} className="group border-t border-line bg-white">
            <summary
              data-lp-event="lp_plan_open"
              data-lp-placement="plan_row"
              data-lp-plan={plan.slug}
              className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_296px_200px] items-center transition hover:bg-paper [&::-webkit-details-marker]:hidden"
            >
            <div className="flex items-center gap-4 px-4 py-4">
              {plan.image && (
                <div className="relative h-32 w-48 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={plan.image.src}
                    alt={plan.image.alt}
                    fill
                    loading="lazy"
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-xs text-ink-mid">{plan.lead}</p>
                <p
                  className="mt-0.5 whitespace-nowrap text-[22px] font-black"
                  style={{ color: plan.accent }}
                >
                  {plan.name}
                </p>
                <p className="mt-1 text-[13px] text-ink-soft">
                  {plan.people}／{plan.days}
                </p>
              </div>
            </div>
            <div className="border-l border-line px-4 py-4">
              <Price plan={plan} />
            </div>
            <div className="border-l border-line px-4 py-4">
              <StageChips plan={plan} />
              <p className="mt-2 text-[12px] font-bold text-brand">
                <span className="group-open:hidden">＋ プランの詳細を見る</span>
                <span className="hidden group-open:inline">− 閉じる</span>
              </p>
            </div>
            </summary>

            <div className="flex items-center justify-between gap-6 border-t border-line bg-paper px-4 py-4">
              <div className="min-w-0">
                <p className="text-[14px] leading-6 text-ink-mid">
                  {plan.short}
                </p>
                {plan.memberPrice && (
                  <p className="mt-1 text-[13px] text-ink-soft">
                    事前相談会員価格 {plan.memberPrice}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <a
                  href={PHONE_HREF}
                  data-lp-event="lp_click_tel"
                  data-lp-placement="plan_detail"
                  data-lp-plan={plan.slug}
                  className="flex flex-col items-center rounded-lg bg-emergency px-4 py-2 text-white"
                >
                  <span className="text-[11px] font-bold">24時間365日</span>
                  <span className="text-xl font-bold tracking-wider">
                    {PHONE_DISPLAY}
                  </span>
                </a>
                <Link
                  href="/lp/contact/"
                  data-lp-event="lp_contact_open"
                  data-lp-placement="plan_detail"
                  data-lp-plan={plan.slug}
                  className="whitespace-nowrap rounded-lg border border-brand px-4 py-2.5 text-[14px] font-bold text-brand"
                >
                  このプランについて相談する
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* モバイル：写真とプラン名・価格を大きく見せ、詳細はその場で開く。
          以前は本サイトの /plan/ へリンクしていたが、広告の着地先から出てしまい
          lp_* も代理店のコンバージョンタグも届かなくなるため、LP内で完結させる
          （2026-09-12 松澤判断）。 */}
      <div className="space-y-5 md:hidden">
        {lpPlans.map((plan) => (
          <details
            key={plan.slug}
            className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm"
          >
            <summary
              data-lp-event="lp_plan_open"
              data-lp-placement="plan_card"
              data-lp-plan={plan.slug}
              className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              {/* キャッチコピーの帯（プランごとの識別色） */}
              <p
                className="px-4 py-2 text-center text-[15px] font-bold text-white"
                style={{ backgroundColor: plan.accent }}
              >
                {plan.lead}
              </p>

              <div className="px-4 pb-4 pt-3">
                <p
                  className="text-center text-[26px] font-black leading-tight"
                  style={{ color: plan.accent }}
                >
                  {plan.name}
                </p>

                <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                  <li className="rounded bg-paper px-2 py-1 text-[13px] text-ink-mid">
                    {plan.days}
                  </li>
                  <li className="rounded bg-paper px-2 py-1 text-[13px] text-ink-mid">
                    {plan.people}
                  </li>
                  <li className="rounded bg-paper px-2 py-1 text-[13px] text-ink-mid">
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
                  <p className="text-[13px] font-bold text-ink-mid">通常価格</p>
                  <div className="mt-1">
                    <Price plan={plan} big />
                  </div>
                </div>

                <p
                  className="mt-3 rounded py-2 text-center text-[15px] font-bold text-white"
                  style={{ backgroundColor: plan.accent }}
                >
                  <span className="group-open:hidden">プランの詳細を見る</span>
                  <span className="hidden group-open:inline">閉じる</span>
                </p>
              </div>
            </summary>

            <div className="border-t border-line px-4 pb-4 pt-3">
              <p className="text-[13px] font-bold text-ink-mid">葬儀の流れ</p>
              <div className="mt-2">
                <StageChips plan={plan} />
              </div>

              <p className="mt-3 text-[14px] leading-6 text-ink-mid">
                {plan.short}
              </p>

              {plan.memberPrice && (
                <p className="mt-2 text-[13px] text-ink-soft">
                  事前相談会員価格 {plan.memberPrice}
                </p>
              )}

              <a
                href={PHONE_HREF}
                data-lp-event="lp_click_tel"
                data-lp-placement="plan_detail"
                data-lp-plan={plan.slug}
                className="mt-3 flex flex-col items-center rounded-lg bg-emergency px-4 py-3 text-white"
              >
                <span className="text-[12px] font-bold">
                  24時間365日・年中無休
                </span>
                <span className="text-2xl font-bold tracking-wider">
                  {PHONE_DISPLAY}
                </span>
              </a>

              <Link
                href="/lp/contact/"
                data-lp-event="lp_contact_open"
                data-lp-placement="plan_detail"
                data-lp-plan={plan.slug}
                className="mt-2 block rounded-lg border border-brand py-2.5 text-center text-[15px] font-bold text-brand"
              >
                このプランについて相談する
              </Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
