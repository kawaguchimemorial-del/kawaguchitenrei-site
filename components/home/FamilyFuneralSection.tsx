import Link from "next/link";

import { ArrowRightIcon } from "@/components/common/icons";
import { getPlan } from "@/lib/plans";

/**
 * 家族葬の見出しセクション（2026-09-06 新設）。
 *
 * 「川口市 家族葬」「川口 家族葬」の主ページはトップページ（CLAUDE.md §10.4）。
 * 本文では家族葬に53回触れているのに見出しが1本もなかったため、ここで宣言する。
 * 価格は lib/plans.ts から取得し、CLAUDE.md §9 の正本とずれないようにする。
 *
 * 他の葬儀形式を貶める比較は書かない（§11・§15）。家族葬だけを推す文体にしない。
 */
export function FamilyFuneralSection() {
  const plan = getPlan("family-funeral");
  if (!plan || plan.pricing?.type !== "member-regular") return null;
  const { member, regular } = plan.pricing;
  const yen = (value: number) => `${value.toLocaleString("ja-JP")}円（税込）`;

  return (
    <section id="family-funeral" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Family Funeral
          </p>
          <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.35] text-ink-deep md:text-[2.4rem]">
            川口市の家族葬は、
            <br className="md:hidden" />
            1日1組の自社式場で。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            ご家族やごく親しい方を中心に、通夜と告別式を行うお別れです。参列は10〜30名が目安。川口市西新井宿の川口メモリアルホールは1日1組の貸切で、川口市めぐりの森(火葬場)まで車で約5分、敷地内に駐車場70台をご用意しています。
          </p>
          <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg">
            事前相談会員価格 {yen(member)}／通常価格 {yen(regular)}。火葬料・お料理・返礼品・宗教者へのお礼などは別途かかります。人数やご希望をうかがったうえで、総額の目安を事前にご案内します。
          </p>
          <p className="mt-4 text-base leading-9 text-ink-mid md:text-lg">
            通夜を行わない一日葬や、火葬を中心とした直葬もお選びいただけます。どの形式が合うかは、ご家族の状況やご希望によって変わりますので、迷われる場合はご相談ください。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/plan/family-funeral/"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-deep md:text-base"
            >
              家族葬プランの料金と内容
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/hall/kawaguchi-memorial-hall/"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
            >
              川口メモリアルホールの設備
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
