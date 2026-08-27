import Link from "next/link";

import { LpStickyCta } from "../LpStickyCta";
import { PHONE_DISPLAY, PHONE_HREF } from "../lp-data";
import { LpContactForm } from "./LpContactForm";

// 広告LP専用の問い合わせページ（CLAUDE.md §21）。noindex は app/lp/layout.tsx で適用済み。
export default function LpContactPage() {
  return (
    <div className="min-h-screen bg-paper pb-28 text-ink">
      <header className="bg-brand-deep px-5 py-5 text-center text-white">
        <p className="text-xs tracking-[0.2em]">埼玉県川口市・新井宿</p>
        <p className="font-serif-jp mt-1 text-lg font-medium">川口典礼</p>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-8">
        <h1 className="text-[24px] font-black md:text-3xl">
          事前のご相談フォーム
        </h1>
        <p className="mt-3 rounded-lg border border-emergency/40 bg-emergency/5 px-4 py-3 text-[15px] font-bold leading-7 text-ink-deep">
          ご逝去後のお急ぎのご依頼は、お電話でお願いします。
          フォームは、事前のご相談・お見積り・式場見学のお申し込みにご利用ください。
        </p>

        <a
          href={PHONE_HREF}
          className="mt-4 flex flex-col items-center rounded-xl bg-emergency px-5 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
        >
          <span className="text-sm font-semibold">24時間365日・年中無休</span>
          <span className="mt-1 text-3xl font-bold tracking-wider">
            {PHONE_DISPLAY}
          </span>
        </a>

        <div className="mt-8 rounded-lg border border-line bg-white p-5 md:p-6">
          <LpContactForm />
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/lp/" className="text-brand underline underline-offset-2">
            ← ご案内のページに戻る
          </Link>
        </p>
      </main>

      <LpStickyCta />
    </div>
  );
}
