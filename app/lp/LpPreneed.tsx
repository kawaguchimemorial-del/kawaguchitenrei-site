import Image from "next/image";
import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

/**
 * 事前のご相談セクション。
 *
 * このLPはご逝去後の緊急層を主対象にしているが（docs/ad-lp/README.md §2）、
 * 事前相談も承っていることを示す（2026-08-27 松澤指示）。
 *
 * 料金表に出している「事前相談会員価格」が何なのかを説明する役割も兼ねる。
 * 会員価格の定義は lib/plans.ts のFAQ「生前に事前相談をお申し込みいただいた方向けの価格」に一致させる。
 */

const PRENEED_POINTS = [
  {
    title: "ご相談・お見積りは無料です",
    body: "費用の目安、式の流れ、必要な手続きなど、その場でお答えします。ご契約をお願いすることはありません。",
  },
  {
    title: "式場をご覧いただけます",
    body: "川口メモリアルホールの式場・ご親族控室・駐車場を実際にご覧いただけます。ご予約のうえお越しください。",
  },
  {
    title: "事前相談会員価格でご案内できます",
    body: "生前にご相談いただいた方は、料金表に併記している事前相談会員価格が適用されます。",
  },
];

export function LpPreneed() {
  return (
    <section id="preneed" className="scroll-mt-24 bg-white px-5 py-10">
      <div className="mx-auto max-w-2xl md:max-w-4xl">
        <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
          PRE-CONSULTATION
        </p>
        <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
          事前のご相談も承っています
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium leading-7 text-ink md:text-base md:leading-8">
          「まだ先のことだが、いざという時に慌てたくない」というご相談を多くいただきます。
          ご本人様からのご相談も、ご家族からのご相談もお受けしています。
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {PRENEED_POINTS.map((point, index) => (
            <div
              key={point.title}
              className="rounded-xl border border-line bg-paper p-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-2 text-[16px] font-black leading-snug text-ink-deep">
                {point.title}
              </p>
              <p className="mt-1.5 text-[14px] font-medium leading-6 text-ink">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-line md:flex">
          <div className="relative h-48 w-full md:h-auto md:w-1/2">
            <Image
              src="/images/lp/preneed-meeting.webp"
              alt="明るい応接室でご夫婦の事前相談に応じる葬祭スタッフ（イメージ）"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1 bg-brand-deep p-5 text-white md:p-6">
            <p className="text-[18px] font-black leading-snug md:text-lg lg:text-xl">
              ご希望やご不安を、ゆっくりおうかがいします
            </p>
            <p className="mt-2 text-[14px] font-medium leading-7 text-white/90 md:text-[15px] md:leading-8">
              ご予算、ご参列いただく方の人数、菩提寺とのお付き合い、ご安置の場所。
              あらかじめうかがっておくことで、いざという時に決めなければならないことを減らせます。
              お電話でも、フォームでも承ります。
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <a
                href={PHONE_HREF}
                data-lp-event="lp_click_tel"
                data-lp-placement="preneed"
                className="flex flex-col items-center rounded-lg bg-emergency px-4 py-3 transition hover:bg-emergency-deep"
              >
                <span className="text-[11px] font-bold">
                  24時間365日・通話無料
                </span>
                <span className="whitespace-nowrap text-xl font-bold tracking-wide">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <Link
                href="#contact"
                data-lp-event="lp_contact_open"
                data-lp-placement="preneed"
                className="flex items-center justify-center rounded-lg border-2 border-white px-4 py-3 text-[15px] font-bold text-white"
              >
                相談フォームへ
              </Link>
            </div>
            <p className="mt-3 text-[12px] leading-5 text-white/70">
              ※ スタッフ写真はイメージです
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
