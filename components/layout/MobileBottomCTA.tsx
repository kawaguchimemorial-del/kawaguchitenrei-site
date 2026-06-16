"use client";

import { PencilIcon, PhoneIcon } from "@/components/common/icons";

export function MobileBottomCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line-soft bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(21,32,28,0.16)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1.15fr_1fr] gap-3">
        <a
          href="tel:0120-963-765"
          className="flex min-h-16 items-center justify-center gap-2 rounded-lg bg-emergency px-3 text-center text-white shadow-sm transition active:bg-emergency-deep"
        >
          <PhoneIcon className="h-6 w-6" />
          <span className="text-left leading-tight">
            <span className="block text-base font-bold">電話する</span>
            <span className="mt-0.5 block text-[10px] font-semibold text-white/90">
              24時間 受付
            </span>
          </span>
        </a>
        <a
          href="#consultation"
          onClick={(e) => {
            // #consultation がないページ（privacy / tokushoho / sitemap 等）では
            // アンカーが無反応になるため、/contact/ へフォールバックする。
            if (!document.getElementById("consultation")) {
              e.preventDefault();
              window.location.href = "/contact/";
            }
          }}
          className="flex min-h-16 items-center justify-center gap-2 rounded-lg bg-brand px-3 text-center text-white shadow-sm transition active:bg-brand-deep"
        >
          <PencilIcon className="h-5 w-5" />
          <span className="text-left leading-tight">
            <span className="block text-base font-bold">相談する</span>
            <span className="mt-0.5 block text-[10px] font-semibold text-white/90">
              事前相談
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
