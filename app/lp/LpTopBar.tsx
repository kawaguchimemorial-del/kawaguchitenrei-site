import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 上部固定バー。競合7社（はじめてのお葬式・ティア・光彩セレモ 等）はいずれも
// ヘッダーに「電話 + CTAボタン」を常設している（2026-08-26 実測）。
// 小さな森の家のモバイル版は、その下に「緊急の方へ」を含むナビを常設している。
const NAV = [
  { href: "#price", label: "費用の目安" },
  { href: "#hall", label: "式場のご案内" },
];

export function LpTopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/97 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2">
        <div className="leading-tight">
          <p className="font-serif-jp text-base font-medium text-brand-deep md:text-xl">
            川口典礼
          </p>
          <p className="hidden text-[12px] text-ink-soft md:block">
            川口市・新井宿／創業20年・自社式場
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            data-lp-event="lp_click_tel"
            data-lp-placement="header"
            className="flex items-center gap-2 rounded-lg bg-emergency px-3 py-1.5 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span className="text-[13px] font-bold leading-tight md:text-[13px]">
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
            data-lp-event="lp_contact_open"
            data-lp-placement="header"
            className="hidden rounded-lg border-2 border-brand px-3 py-2 text-xs font-bold text-brand md:block"
          >
            事前相談
          </Link>
        </div>
      </div>

      {/* ページ内ナビ。「お急ぎの方へ」だけ色を変えて、緊急層がどこからでも戻れるようにする */}
      <nav className="border-t border-line">
        <ul className="mx-auto grid max-w-5xl grid-cols-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border-r border-line py-2 text-center text-[13px] font-semibold text-ink-mid transition hover:bg-paper md:text-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#urgent"
              className="block bg-emergency py-2 text-center text-[13px] font-bold text-white transition hover:bg-emergency-deep md:text-sm"
            >
              お急ぎの方へ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
