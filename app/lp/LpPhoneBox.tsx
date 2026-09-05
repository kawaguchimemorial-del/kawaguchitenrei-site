import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// ヒーロー直下や各セクション間に置く電話ボックス。
// ティア・光彩セレモ・はじめてのお葬式は、いずれもヒーロー直下に
// 大きな電話ボックスを置いている（2026-08-26 実測）。
export function LpPhoneBox({
  lead = "深夜・早朝を問わず、いつでもお電話ください",
  tone = "light",
}: {
  lead?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-brand-deep px-4 py-8" : "bg-white px-4 py-8"}>
      <div
        className={`mx-auto max-w-2xl rounded-2xl border-2 p-5 text-center shadow-md ${
          dark ? "border-white/30 bg-white/5" : "border-emergency/30 bg-paper"
        }`}
      >
        <p
          className={`text-sm font-bold md:text-base ${
            dark ? "text-white" : "text-ink-deep"
          }`}
        >
          {lead}
        </p>
        <a
          href={PHONE_HREF}
          data-lp-event="lp_click_tel"
          data-lp-placement="hero"
          className="mt-3 flex flex-col items-center rounded-xl bg-emergency px-4 py-4 text-white shadow-lg transition hover:bg-emergency-deep"
        >
          <span className="text-xs font-bold tracking-wide">
            24時間365日・年中無休／通話無料
          </span>
          <span className="mt-0.5 text-[32px] font-bold leading-none tracking-wider md:text-[46px]">
            {PHONE_DISPLAY}
          </span>
          <span className="mt-1.5 text-[13px]">タップで発信できます</span>
        </a>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="#price"
            className={`rounded-lg border-2 px-3 py-2.5 text-xs font-bold ${
              dark
                ? "border-white/60 text-white"
                : "border-brand bg-white text-brand"
            }`}
          >
            費用の目安を見る
          </Link>
          <Link
            href="#contact"
            data-lp-event="lp_contact_open"
            data-lp-placement="hero"
            className={`rounded-lg border-2 px-3 py-2.5 text-xs font-bold ${
              dark
                ? "border-white/60 text-white"
                : "border-brand bg-white text-brand"
            }`}
          >
            事前に相談する
          </Link>
        </div>
      </div>
    </section>
  );
}
