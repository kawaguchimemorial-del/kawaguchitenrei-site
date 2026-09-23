import Link from "next/link";

import { LpInAppCallNotice } from "./LpInAppCallNotice";
import { PHONE_DISPLAY, PHONE_HREF, lpPlans } from "./lp-data";

// 最初の画面で「いくら・どこ・どう来てくれるか」に答える3行（2026-09-23 総点検）。
// 価格は lp-data（= lib/plans.ts）から導出し、LPの方針どおり通常価格を出す。
const direct = lpPlans.find((plan) => plan.slug === "direct-funeral");
const family = lpPlans.find((plan) => plan.slug === "family-funeral");
const QUICK_FACTS = [
  {
    label: "費用",
    body:
      direct && family
        ? `直葬 ${direct.mainAmount}円〜／家族葬 ${family.mainAmount}円〜（税込・通常価格）`
        : "プランごとの料金は下の「費用の目安」でご確認いただけます",
  },
  {
    label: "場所",
    body: "川口市西新井宿の自社式場（めぐりの森まで車で約5分）",
  },
  {
    label: "お迎え",
    body: "お電話のあと寝台車でうかがいます。お迎えの時点で内容を決める必要はありません。",
  },
];

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
          <span className="mt-0.5 whitespace-nowrap text-[28px] font-bold leading-none tracking-wider min-[380px]:text-[32px] md:text-[46px]">
            {PHONE_DISPLAY}
          </span>
          <span className="mt-1.5 text-[13px]">タップで発信できます</span>
        </a>
        <LpInAppCallNotice tone={tone} />

        <dl
          className={`mt-4 divide-y rounded-lg border text-left text-[14px] leading-6 ${
            dark
              ? "divide-white/20 border-white/30 text-white"
              : "divide-line border-line bg-white text-ink"
          }`}
        >
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="flex gap-3 px-3 py-2.5">
              <dt
                className={`w-12 shrink-0 font-bold ${
                  dark ? "text-white" : "text-brand-deep"
                }`}
              >
                {fact.label}
              </dt>
              <dd className="font-medium">{fact.body}</dd>
            </div>
          ))}
        </dl>

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
