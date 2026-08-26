import Link from "next/link";

import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// セクションの区切りに繰り返し差し込むCTA帯。
// 競合はトップページで7回前後CTAを反復している（2026-08-26 実測）。
export function LpCtaBand({
  heading = "お急ぎの方は、お電話ください",
  note = "深夜・早朝でもつながります。ご安置場所が決まっていなくても構いません。",
}: {
  heading?: string;
  note?: string;
}) {
  return (
    <section className="bg-brand-deep px-5 py-8 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif-jp text-lg font-medium md:text-xl">{heading}</p>
        <p className="mt-2 text-xs leading-6 text-white/80 md:text-sm">{note}</p>
        <a
          href={PHONE_HREF}
          className="mt-4 flex flex-col items-center rounded-xl bg-emergency px-5 py-4 shadow-lg transition hover:bg-emergency-deep"
        >
          <span className="text-xs font-bold tracking-wide">
            24時間365日・年中無休
          </span>
          <span className="mt-0.5 text-3xl font-bold tracking-wider md:text-4xl">
            {PHONE_DISPLAY}
          </span>
          <span className="mt-0.5 text-[11px]">タップで発信できます</span>
        </a>
        <Link
          href="/lp/contact/"
          className="mt-3 inline-block text-sm text-white/90 underline underline-offset-4"
        >
          メールでのご相談はこちら
        </Link>
      </div>
    </section>
  );
}
