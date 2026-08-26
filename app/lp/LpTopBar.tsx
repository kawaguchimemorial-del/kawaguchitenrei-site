import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 上部固定バー。競合7社（はじめてのお葬式・ティア・光彩セレモ 等）はいずれも
// ヘッダーに「電話 + CTAボタン」を常設している（2026-08-26 実測）。
export function LpTopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/97 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2">
        <div className="leading-tight">
          <p className="font-serif-jp text-base font-medium text-brand-deep md:text-xl">
            川口典礼
          </p>
          <p className="hidden text-[10px] text-ink-soft md:block">
            川口市・新井宿／創業20年・自社式場
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-lg bg-emergency px-3 py-1.5 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span className="text-[9px] font-bold leading-tight md:text-[11px]">
              24時間
              <br />
              365日
            </span>
            <span className="text-[15px] font-bold tracking-wide md:text-2xl">
              {PHONE_DISPLAY}
            </span>
          </a>
          <Link
            href="#contact"
            className="hidden rounded-lg border-2 border-brand px-3 py-2 text-xs font-bold text-brand md:block"
          >
            メール相談
          </Link>
        </div>
      </div>
    </div>
  );
}
