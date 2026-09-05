import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { company } from "@/lib/company";
import { reviewSummary } from "@/lib/reviews";
import { voices } from "@/lib/voices";
import { LpContactForm } from "./contact/LpContactForm";
import { LpHalls } from "./LpHalls";
import { LpPhoneBox } from "./LpPhoneBox";
import { LpPreneed } from "./LpPreneed";
import { LpPlanTable } from "./LpPlanTable";
import { LpStars } from "./LpStars";
import { LpStickyCta } from "./LpStickyCta";
import { LpTopBar } from "./LpTopBar";
import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 広告LP（CLAUDE.md §21）。
// 設計：docs/reports/2026-08-26-lp-page-design-15expert.html
// 競合7社のフルページ実測（docs/ad-lp/competitor-captures/・Git管理外）を踏まえた構成。
// 取り入れた型：ヘッダー常設電話／ヒーロー直下の電話ボックス／入口分岐（お急ぎ・ご会葬）／
// バッジによる実績提示／プランカード／手書きアンケートによる社会的証明／ページ内フォーム。

// ヒーローの特徴チップ。数値の根拠は lib/company.ts / lib/halls.ts に一致させる。
const HERO_POINTS = [
  "めぐりの森まで車5分",
  "駐車場70台",
  "創業20年・累計4,600件超",
];

const URGENT_STEPS = [
  {
    title: "「すぐに移動を」と言われた",
    body: "病院・施設へ寝台車でお迎えにあがります。深夜・早朝でも動きます。",
  },
  {
    title: "安置する場所がない",
    body: "ご自宅が難しい場合、当社の安置施設をご利用いただけます。決まっていない前提でご相談ください。",
  },
  {
    title: "費用が心配で決められない",
    body: "お迎えの時点で内容を決める必要はありません。お見積りをご確認のうえ、お決めいただけます。",
  },
];

const REASONS = [
  {
    image: "/images/home/hero/kawaguchi-memorial-hall-hero.png",
    alt: "川口メモリアルホールの外観",
    icon: "/images/lp/reason-crematory.webp",
    label: "01",
    title: "川口市めぐりの森まで、車で約5分",
    body: "火葬場がすぐ近くです。ご高齢の参列者が多い場合でも、ご移動の負担を抑えてお見送りいただけます。",
  },
  {
    image: "/images/home/hall/hall-parking.png",
    alt: "川口メモリアルホールの駐車場",
    icon: "/images/lp/reason-parking.webp",
    label: "02",
    title: "駐車場70台・敷地内で無料",
    body: "お車でお越しの参列者が多いご葬儀でも、路上駐車で近隣にご迷惑をおかけすることがありません。",
  },
  {
    image: "/images/home/hall/hall-family-waiting-room.jpg",
    alt: "川口メモリアルホールのご親族控室",
    icon: "/images/lp/reason-hall.webp",
    label: "03",
    title: "貸式場ではない、自社の式場です",
    body: "時間に追われることなく、ご家族のペースでお別れの時間をお過ごしいただけます。",
  },
  {
    // 旧LPの「事前説明で安心料金プラン」を引き継ぐ項目。
    // 「追加費用なし」「総額確定」とは書かない（CLAUDE.md §11・§14）。
    // 金額を保証するのではなく、ご了承なく増えないという進め方の約束として書く。
    image: "/images/lp/reason-estimate.webp",
    alt: "お見積りの内容を説明する様子（イメージ）",
    icon: "/images/lp/reason-estimate-icon.webp",
    label: "04",
    title: "費用は、お見積りでご説明します",
    body: "お見積りにない費用が、ご家族のご了承なく加わることはありません。内容が変わる場合は、その都度ご説明したうえでお決めいただきます。",
  },
];

const FLOW = [
  {
    step: "お電話",
    body: "24時間365日受付。ご状況をお聞かせください。",
    image: "/images/lp/flow-1-call.webp",
    alt: "お電話を受けるスタッフ（イメージ）",
  },
  {
    step: "お迎え・ご安置",
    body: "寝台車でおうかがいし、ご自宅または当社の安置施設へご安置します。",
    image: "/images/lp/flow-2-transfer.webp",
    alt: "寝台車でお迎えにうかがうスタッフ（イメージ）",
  },
  {
    step: "お打合せ",
    body: "ご希望とご予算をうかがい、お見積りをご提示します。",
    image: "/images/lp/flow-3-meeting.webp",
    alt: "ご家族とお打合せをする様子（イメージ）",
  },
  {
    step: "ご葬儀・ご火葬",
    body: "川口メモリアルホールでお見送りいただき、川口市めぐりの森などへご移動します。",
    image: "/images/lp/flow-4-farewell.webp",
    alt: "生花祭壇（イメージ）",
  },
];

const HALL_PHOTOS = [
  { src: "/images/home/hall/hall-ceremony-room.jpg", alt: "川口メモリアルホールの式場" },
  { src: "/images/home/hall/hall-interior.jpg", alt: "川口メモリアルホールの館内" },
  {
    src: "/images/hall/kawaguchi-memorial-hall/kawaguchi-memorial-hall-visitation-room-pet.png",
    alt: "川口メモリアルホールの個室面会室",
  },
  { src: "/images/home/hall/hall-family-waiting-room.jpg", alt: "ご親族控室" },
  { src: "/images/home/hall/hall-parking.png", alt: "敷地内の駐車場" },
  { src: "/images/home/hero/hall-exterior-hero.jpg", alt: "川口メモリアルホールの外観" },
];

const FAQS = [
  {
    q: "深夜や早朝でも来てもらえますか。",
    a: "はい。24時間365日、年中無休でお電話を受け付けています。お迎えも時間を問わずうかがいます。",
  },
  {
    q: "病院から「すぐに移動を」と言われています。",
    a: "お電話をいただければ、お迎えの手配をいたします。ご安置場所が決まっていない場合も、そのままご相談ください。",
  },
  {
    q: "まだ亡くなってはいませんが、相談してもよいですか。",
    a: "はい。ご危篤の段階でのご相談もお受けしています。あらかじめご事情をうかがっておくことで、その時のご負担を減らせます。",
  },
  {
    q: "費用はいつ決まりますか。",
    a: "お打合せでご希望をうかがったうえで、お見積りをご提示します。お迎えの時点でお決めいただく必要はありません。",
  },
  {
    q: "川口市民葬プランは誰でも使えますか。",
    a: "川口市民の方が対象です。適用の可否や必要な手続きは、お電話またはフォームでご確認ください。",
  },
  {
    q: "菩提寺がありません。宗派の指定はありますか。",
    a: "特定の宗派に限定していません。菩提寺がある場合もない場合も、ご事情にあわせてご相談いただけます。",
  },
  {
    q: "参列するのですが、式場の場所を知りたいです。",
    a: "川口メモリアルホールは埼玉県川口市西新井宿440-1です。埼玉高速鉄道「新井宿」駅から徒歩約10分、敷地内に無料駐車場が70台ございます。",
  },
];

// 手書きアンケートの画像があるものだけを、新しい順に横スクロールで並べる。
// 個人名・故人名・喪主名は voices 側で既に伏せられている（§12）。
// 件数は4件まで。1件increase するごとに Next/Image の srcset が約1.4KB 増え、
// §21.2 のページ重量に効く。続きは /voice/ へ誘導する。
const lpVoices = voices
  .filter((voice) => Boolean(voice.surveyImage))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 4);

const googleReview =
  reviewSummary.highlights.find((item) => item.label === "Google口コミ") ??
  reviewSummary.highlights[0];

// Codex版から引き継ぐ点：自己参照 canonical と LP 専用のタイトル。
// noindex なので検索順位には効かないが、広告の審査クローラや社内確認で
// 「このURLが正」と分かる状態にしておく。
export const metadata: Metadata = {
  title: "川口市の葬儀・家族葬｜川口典礼",
  alternates: { canonical: "https://kawaguchitenrei.com/lp/" },
};

export default function LpPage() {
  return (
    <div className="bg-paper pb-28 text-ink">
      <LpTopBar />

      {/* ヒーロー
          構成は競合（小さな森の家 モバイル版）の実測に合わせている。
          ・上段：明るい背景に特大の見出し
          ・下段：式場の実写を全幅に敷き、左に円形バッジ、右にスタッフ。余白を作らない
          ・本サイトのセリフ体基調（§3）はLPには適用しない（§21） */}
      <section className="relative flex min-h-[calc(100svh-84px)] flex-col overflow-hidden md:min-h-[580px] md:justify-center">
        {/* 背景はCSSのグラデーションで作る。
            以前は背景写真の四隅に柄を描き込んでいたが、object-cover で
            画面比率に応じて柄が切り落とされ、単色の余白に見えていた。
            装飾は独立した素材として位置を固定する。 */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(160deg,#ffffff_0%,#fbf9f4_45%,#f3f1e8_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-8 h-56 w-56 opacity-70 md:-left-14 md:-top-12 md:h-80 md:w-80"
        >
          <Image
            src="/images/lp/ornament-lily.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="320px"
            className="object-contain"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/3 hidden h-72 w-72 rotate-180 opacity-50 md:block"
        >
          <Image
            src="/images/lp/ornament-lily.webp"
            alt=""
            aria-hidden
            fill
            loading="lazy"
            sizes="288px"
            className="object-contain"
          />
        </div>

        {/* 上段：見出し */}
        <div className="relative px-5 pt-3.5 md:mx-auto md:w-full md:max-w-6xl md:px-10 md:pt-0">
          <div className="md:max-w-[52%]">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="inline-block rounded bg-emergency px-2 py-1 text-[11px] font-bold text-white md:px-2.5 md:text-[15px]">
                ご危篤・ご逝去でお急ぎの方へ
              </p>
              <p className="inline-block rounded border border-brand bg-white px-2 py-1 text-[11px] font-bold text-brand-deep md:px-2.5 md:text-[15px]">
                <span className="md:hidden">市民葬の登録店</span>
                <span className="hidden md:inline">
                  川口市の葬祭事業（市民葬）登録店
                </span>
              </p>
            </div>

            <h1 className="mt-2.5 text-[29px] font-black leading-[1.3] tracking-tighter text-brand-deep md:mt-3 md:text-[31px] md:tracking-tight lg:text-[40px] xl:text-[46px]">
              <span className="text-emergency">川口市</span>の家族葬・直葬なら
              <br />
              自社式場の<span className="text-emergency">川口典礼</span>へ。
            </h1>

            <p className="mt-2.5 text-[16px] font-bold leading-[1.7] text-ink md:mt-3 md:text-base lg:mt-4 lg:text-xl">
              まだ何も決まっていなくて、大丈夫です。
              <br />
              24時間365日、いまお電話がつながります。
            </p>

            {/* 特徴チップ。上段の余白を埋めつつ、当社の差別化を短く出す */}
            <ul className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
              {HERO_POINTS.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-brand-tint bg-white/90 px-2.5 py-1 text-[12px] font-bold text-brand-deep shadow-sm md:px-2.5 md:py-1 md:text-[12px] lg:px-3 lg:py-1.5 lg:text-sm"
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-white/90 px-2.5 py-1.5 shadow-sm md:mt-4 md:gap-2 md:px-3 md:py-2">
              <LpStars rating={googleReview.rating} className="text-sm md:text-base" />
              <span className="text-base font-bold leading-none text-ink-deep md:text-lg">
                {googleReview.rating}
              </span>
              <span className="text-[12px] font-bold leading-none text-ink-mid md:text-xs">
                Googleクチコミ
              </span>
              <span className="text-[10px] leading-none text-ink-soft md:text-[12px]">
                {reviewSummary.asOf}
              </span>
            </div>
          </div>
        </div>

        {/* 下段：式場の実写を全幅に敷き、左に円形バッジ、右にスタッフ。左右に余白を作らない */}
        <div className="relative mt-auto h-[42vh] min-h-[250px] w-full md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[46%]">
          <Image
            src="/images/home/hero/hall-exterior-hero.jpg"
            alt="川口メモリアルホールの外観"
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-center md:rounded-l-[2.5rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/25 to-transparent md:rounded-l-[2.5rem]" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-paper via-transparent to-transparent md:block md:rounded-l-[2.5rem]" />

          {/* 円形バッジ（左） */}
          <div className="absolute bottom-[86px] left-3 z-10 flex h-[108px] w-[108px] items-center justify-center md:bottom-8 md:left-8 md:h-[140px] md:w-[140px]">
            <Image
              src="/images/lp/badge-circle.webp"
              alt=""
              aria-hidden
              fill
              priority
              sizes="124px"
              className="object-contain drop-shadow"
            />
            <div className="relative px-2 text-center leading-none">
              <p className="text-[10px] font-bold text-ink-mid md:text-[11px]">
                アンケート満足度
              </p>
              <p className="mt-0.5 text-brand-deep">
                <span className="text-[30px] font-black md:text-[34px]">97</span>
                <span className="text-[15px] font-black">%超</span>
              </p>
            </div>
          </div>

          {/* スタッフ（イメージ） */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-full w-[62%] md:h-[94%] md:w-[72%]">
            <Image
              src="/images/lp/staff-hero.webp"
              alt="黒いフォーマルスーツで対応する葬祭スタッフ（イメージ）"
              fill
              priority
              sizes="(min-width: 768px) 34vw, 62vw"
              className="object-contain object-bottom md:object-right-bottom"
            />
          </div>

        </div>
      </section>

      {/* ヒーローのバッジ（アンケート満足度97%超）の出典注記。景表法上、
          自社調べであることと母数の性質を明示する。 */}
      <p className="bg-white px-5 pt-3 text-[11px] leading-5 text-ink-soft">
        ※「アンケート満足度97%超」は、ご葬儀後にお答えいただいた当社アンケートの集計結果です（川口典礼調べ・2026年8月時点）。
      </p>

      {/* 入口分岐：お急ぎの方と、ご会葬の方を最初に分ける（光彩セレモの型） */}
      <section className="bg-white px-4 pb-5 pt-3">
        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-1.5">
          <a
            href="#urgent"
            className="rounded-xl border-2 border-emergency bg-emergency/5 px-2 py-3 text-center"
          >
            <span className="block text-[13px] font-bold leading-snug text-emergency md:text-sm">
              ご危篤・ご逝去
              <br />
              でお急ぎの方
            </span>
            <span className="mt-1 block text-[12px] leading-tight text-ink-mid">
              いま何をすべきか →
            </span>
          </a>
          <a
            href="#preneed"
            className="rounded-xl border-2 border-brand bg-brand/5 px-2 py-3 text-center"
          >
            <span className="block text-[13px] font-bold leading-snug text-brand-deep md:text-sm">
              事前に
              <br />
              相談したい方
            </span>
            <span className="mt-1 block text-[12px] leading-tight text-ink-mid">
              相談・見積り無料 →
            </span>
          </a>
          <a
            href="#hall"
            className="rounded-xl border-2 border-line bg-white px-2 py-3 text-center"
          >
            <span className="block text-[13px] font-bold leading-snug text-ink-deep md:text-sm">
              ご会葬の
              <br />
              方へ
            </span>
            <span className="mt-1 block text-[12px] leading-tight text-ink-mid">
              場所・駐車場 →
            </span>
          </a>
        </div>
      </section>

      <LpPhoneBox />

      {/* お急ぎの方へ */}
      <section
        id="urgent"
        className="scroll-mt-24 border-y-4 border-emergency bg-white px-5 py-9"
      >
        <div className="mx-auto max-w-2xl">
          <p className="inline-block rounded bg-emergency px-3 py-1 text-xs font-bold text-white">
            ご危篤・ご逝去でお急ぎの方へ
          </p>
          <h2 className="mt-3 text-[24px] font-black leading-snug text-ink-deep md:text-[36px]">
            何も決まっていなくて
            <br className="md:hidden" />
            大丈夫です。
          </h2>
          <p className="mt-2 text-[15px] font-medium leading-7 text-ink">
            葬儀社を決めていなくても、ご予算が固まっていなくても構いません。
            まずお電話をいただければ、その場でできることからお手伝いします。
          </p>
          <div className="mt-5 space-y-3">
            {URGENT_STEPS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-line border-l-4 border-l-emergency bg-paper p-4"
              >
                <p className="text-sm font-bold text-ink-deep">{item.title}</p>
                <p className="mt-1 text-[15px] font-medium leading-7 text-ink">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <figure className="mt-5 overflow-hidden rounded-xl border border-line">
            <div className="relative h-44 w-full md:h-56">
              <Image
                src="/images/lp/staff-night-call.webp"
                alt="夜間にお電話を受ける葬祭スタッフ（イメージ）"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="bg-ink-deep px-3 py-2 text-center text-xs text-white">
              深夜・早朝もお電話を受け付けています
              <span className="ml-1 text-white/60">※写真はイメージです</span>
            </figcaption>
          </figure>

          <a
            href={PHONE_HREF}
            data-lp-event="lp_click_tel"
            data-lp-placement="urgent"
            className="mt-5 flex flex-col items-center rounded-xl bg-emergency px-5 py-4 text-white shadow-md transition hover:bg-emergency-deep"
          >
            <span className="text-xs font-bold">
              24時間365日・年中無休／通話無料
            </span>
            <span className="mt-0.5 text-[32px] font-bold leading-none tracking-wider">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            REASON
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            川口典礼が選ばれる理由
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium leading-7 text-ink md:text-base md:leading-8">
            川口市で創業20年。年間約260件のご葬儀をお手伝いしてきました。
            川口市の葬祭事業（市民葬）の登録店として、制度のご利用もご案内できます。
          </p>
          <div className="mt-6 space-y-5">
            {REASONS.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-xl border border-line bg-white shadow-sm"
              >
                <div className="relative h-48 w-full md:h-60">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 672px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-0 top-0 bg-brand px-3 py-1 text-sm font-black text-white">
                    {item.label}
                  </span>
                </div>
                <div className="flex gap-3 p-4">
                  <div className="relative h-14 w-14 shrink-0 md:h-16 md:w-16">
                    <Image
                      src={item.icon}
                      alt=""
                      aria-hidden
                      fill
                      loading="lazy"
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-black text-ink-deep md:text-2xl">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[15px] font-medium leading-7 text-ink">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LpHalls />

      {/* 費用 */}
      <section id="price" className="scroll-mt-24 bg-white px-5 py-10">
        {/* 表を組むPCだけ広げる（列が狭いとプラン名が1文字ずつ折り返す） */}
        <div className="mx-auto max-w-2xl md:max-w-5xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            PLAN
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            費用の目安
          </h2>
          {/* 何が「セット」に含まれ、何で総額が変わるのかを先に示す。
              通常価格か会員価格かは、表のヘッダーと各行の補足で示している。 */}
          <div className="mx-auto mt-4 max-w-3xl rounded-xl border-2 border-brand-tint bg-paper px-5 py-4 text-center md:mt-5 md:px-6 md:py-5">
            <p className="text-[17px] font-black leading-8 text-ink-deep md:text-[20px]">
              表示している金額は
              <span className="mx-1 rounded bg-emergency px-2 py-0.5 text-white">
                セットプラン
              </span>
              の価格です。
            </p>
            <p className="mt-2 text-[15px] font-medium leading-7 text-ink md:text-base md:leading-8">
              ご葬儀の規模、返礼品、お食事の有無などにより、最終的なお見積り金額が決まります。
            </p>
          </div>

          <LpPlanTable />

          <div className="mt-6 rounded-lg border border-line bg-paper p-4">
            <p className="text-sm font-bold text-ink-deep">
              含まれるもの・含まれないもの
            </p>
            <p className="mt-2 text-[15px] font-medium leading-7 text-ink">
              プランには、ご搬送・ご安置・お棺・ご遺影・式場使用料・スタッフの人件費などが含まれます。
              <strong className="font-semibold text-ink-deep">
                火葬料金、式場までの参列者の交通費、お食事代、返礼品、宗教者へのお礼
              </strong>
              は別途申し受けます。プランごとの内訳は各プランのページでご確認いただけます。
            </p>
            <p className="mt-3 text-xs leading-6 text-ink-soft">
              ※
              事前相談会員価格は、事前にご相談いただいた方の価格です。川口市民葬プランは川口市民の方が対象で、会員・通常の区分はございません。
            </p>
          </div>
        </div>
      </section>

      <LpPreneed />

      {/* お客様の声（手書きアンケート） */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            VOICE
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            ご葬儀を終えられたご家族から
          </h2>
          <p className="mt-2 text-center text-sm text-ink-mid">
            ご葬儀後にお答えいただいた、手書きのアンケートです。
          </p>

          <p className="mt-1 text-center text-xs text-ink-soft">
            横にスワイプしてご覧いただけます（{lpVoices.length}件）
          </p>

          <div className="-mx-5 mt-5 overflow-x-auto px-5 pb-3">
            <ul className="flex snap-x snap-mandatory gap-4">
              {lpVoices.map((voice) => (
                <li
                  key={voice.slug}
                  className="w-[80vw] max-w-xs shrink-0 snap-start md:w-80"
                >
                  <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                    {voice.surveyImage && (
                      <div className="relative h-44 w-full border-b border-line bg-paper">
                        <Image
                          src={voice.surveyImage.src}
                          alt={voice.surveyImage.alt}
                          fill
                          loading="lazy"
                          sizes="320px"
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-4">
                      <LpStars rating={voice.rating} className="text-sm" />
                      <blockquote className="font-serif-jp mt-1.5 text-[15px] font-medium leading-relaxed text-ink-deep">
                        「{voice.title}」
                      </blockquote>
                      <p className="mt-2 line-clamp-5 text-[15px] leading-6 text-ink-mid">
                        {voice.comment}
                      </p>
                      <figcaption className="mt-auto pt-3 text-[13px] text-ink-soft">
                        {voice.family}
                      </figcaption>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-1 text-center text-sm">
            <Link
              href="/voice/"
              className="text-brand underline underline-offset-4"
            >
              お客様の声をもっと見る
            </Link>
          </p>

          {/* 出典別の評価。数値は lib/reviews.ts の1か所のみを参照する */}
          <div className="mt-6 overflow-hidden rounded-xl border border-brand-tint bg-white">
            <div className="bg-brand-tint/60 px-4 py-3 text-center">
              <p className="text-xs text-ink-mid">いただいているご評価</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <LpStars rating={reviewSummary.total.rating} className="text-xl" />
                <span className="text-[34px] font-black leading-none text-brand-deep">
                  {reviewSummary.total.rating}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-mid">
                {reviewSummary.total.count}件の平均（{reviewSummary.asOf}）
              </p>
            </div>
            <ul className="divide-y divide-line">
              {reviewSummary.sources.map((source) => (
                <li
                  key={source.label}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="text-sm text-ink-deep">{source.label}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <LpStars rating={source.rating} className="text-sm" />
                    <span className="text-sm font-bold text-ink-deep">
                      {source.rating}
                    </span>
                    {source.showCount && (
                      <span className="w-14 text-right text-xs text-ink-mid">
                        {source.count}件
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-4 py-3 text-xs leading-6 text-ink-soft">
              ※
              {reviewSummary.basis}
              。ご利用後アンケートはご葬儀後にお答えいただいたものです。ポータルサイト名は各社の規約により記載していません。
            </p>
          </div>
        </div>
      </section>

      {/* 式場（ご会葬の方の着地点も兼ねる） */}
      <section id="hall" className="scroll-mt-24 bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            HALL
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            川口メモリアルホール
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
            {HALL_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative h-28 w-full overflow-hidden rounded-lg md:h-36"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 220px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <dl className="mt-5 divide-y divide-line rounded-lg border border-line text-sm">
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-16 shrink-0 font-semibold text-ink-deep">
                所在地
              </dt>
              <dd className="text-ink-mid">埼玉県川口市西新井宿440-1</dd>
            </div>
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-16 shrink-0 font-semibold text-ink-deep">電車</dt>
              <dd className="text-ink-mid">
                埼玉高速鉄道「新井宿」駅 徒歩約10分
              </dd>
            </div>
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-16 shrink-0 font-semibold text-ink-deep">お車</dt>
              <dd className="text-ink-mid">
                首都高速川口線「新井宿出入口」より約5分／駐車場70台（敷地内・無料）
              </dd>
            </div>
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-16 shrink-0 font-semibold text-ink-deep">
                火葬場
              </dt>
              <dd className="text-ink-mid">川口市めぐりの森まで車で約5分</dd>
            </div>
          </dl>

          {/* 地図。ご会葬の方が場所を確かめる導線も兼ねる（本サイト /access/ と同じ方式） */}
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg border border-line md:aspect-[16/9]">
            <iframe
              title="川口メモリアルホールの地図"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                company.mapEmbedQuery
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <p className="mt-2 text-center text-sm">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                company.mapEmbedQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-4"
            >
              Googleマップで経路を調べる
            </a>
          </p>
        </div>
      </section>

      {/* 流れ */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            FLOW
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            お電話をいただいてからの流れ
          </h2>
          <p className="mt-2 text-center text-[13px] text-ink-soft">
            ※写真はイメージです
          </p>
          <ol className="mt-6 space-y-4">
            {FLOW.map((item, index) => (
              <li
                key={item.step}
                className="flex items-stretch gap-3 overflow-hidden rounded-xl border border-line bg-white shadow-sm"
              >
                <div className="relative w-24 shrink-0 md:w-32">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 py-3 pr-3">
                  <p className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-ink-deep">
                      {item.step}
                    </span>
                  </p>
                  <p className="mt-1 text-[15px] font-medium leading-7 text-ink">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            FAQ
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
            よくあるご質問
          </h2>
          <div className="mt-6 space-y-2">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="rounded-lg border border-line bg-paper p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-ink-deep">
                  {item.q}
                </summary>
                <p className="mt-2 text-[15px] font-medium leading-7 text-ink">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ページ内フォーム（ティアの型） */}
      <section id="contact" className="scroll-mt-24 bg-brand-deep px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-gold">
            PRE-CONSULTATION
          </p>
          <h2 className="mt-1 text-center text-[24px] font-black text-white md:text-[38px]">
            事前のご相談フォーム
          </h2>
          <p className="mx-auto mt-3 max-w-2xl rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-center text-[15px] font-bold leading-7 text-white">
            ご逝去後のお急ぎのご依頼は、お電話でお願いします。
            <br className="hidden md:block" />
            フォームは、事前のご相談・お見積り・式場見学のお申し込みにご利用ください。
          </p>
          <a
            href={PHONE_HREF}
            data-lp-event="lp_click_tel"
            data-lp-placement="footer"
            className="mx-auto mt-4 flex max-w-sm flex-col items-center rounded-xl bg-emergency px-4 py-3.5 text-white shadow-lg transition hover:bg-emergency-deep"
          >
            <span className="text-xs font-bold">24時間365日・通話無料</span>
            <span className="mt-0.5 text-[30px] font-bold leading-none tracking-wider">
              {PHONE_DISPLAY}
            </span>
          </a>

          <div className="mt-6 rounded-xl bg-white p-5 shadow-lg md:p-6">
            <LpContactForm />
          </div>
        </div>
      </section>

      <footer className="px-5 py-6 text-center text-xs leading-6 text-ink-soft">
        <p>川口典礼／埼玉県川口市西新井宿440-1</p>
        <p className="mt-1">
          <Link href="/privacy/" className="underline underline-offset-2">
            プライバシーポリシー
          </Link>
        </p>
      </footer>

      <LpStickyCta />
    </div>
  );
}
