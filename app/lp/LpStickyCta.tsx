import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 画面下部の固定CTA。電話：フォーム＝おおむね 2:1（2026-08-26 15名討議の合議）。
// 本サイトの MobileBottomCTA とは別物。LP からは共通レイアウトを外しているため、
// このコンポーネントが LP 内での唯一の常時表示CTAになる。
export function LpStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-stretch gap-2">
        <a
          href={PHONE_HREF}
          data-lp-event="lp_click_tel"
          data-lp-placement="sticky"
          className="flex flex-[2] flex-col items-center justify-center rounded-lg bg-emergency px-3 py-2.5 text-white transition hover:bg-emergency-deep"
        >
          <span className="text-[13px] font-semibold tracking-wide">
            24時間365日・年中無休
          </span>
          <span className="text-xl font-bold leading-tight tracking-wide md:text-2xl">
            {PHONE_DISPLAY}
          </span>
        </a>
        <Link
          href="/lp/contact/"
          data-lp-event="lp_contact_open"
          data-lp-placement="sticky"
          className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-brand bg-white px-2 py-2.5 text-brand transition hover:bg-brand-tint"
        >
          <span className="text-[13px] font-semibold">事前の</span>
          <span className="text-sm font-bold leading-tight">ご相談</span>
        </Link>
      </div>
    </div>
  );
}
