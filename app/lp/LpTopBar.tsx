import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 上部固定バー。競合（小さなお葬式・花ぜんセレモニー）はいずれも
// 画面上部に常時電話を置いている。緊急層はスクロール位置を問わず電話を探すため。
export function LpTopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-brand-deep/20 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-3 py-2">
        <div className="leading-tight">
          <p className="font-serif-jp text-base font-medium text-brand-deep md:text-lg">
            川口典礼
          </p>
          <p className="text-[10px] text-ink-soft md:text-xs">
            川口市・新井宿／創業20年
          </p>
        </div>
        <a
          href={PHONE_HREF}
          className="flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-white shadow-sm transition hover:bg-emergency-deep"
        >
          <span className="text-[10px] font-bold leading-tight md:text-xs">
            24時間
            <br />
            365日
          </span>
          <span className="text-base font-bold tracking-wide md:text-xl">
            {PHONE_DISPLAY}
          </span>
        </a>
      </div>
    </div>
  );
}
