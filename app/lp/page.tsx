import Image from "next/image";
import Link from "next/link";

import { voices } from "@/lib/voices";
import { LpContactForm } from "./contact/LpContactForm";
import { LpCtaBand } from "./LpCtaBand";
import { LpPhoneBox } from "./LpPhoneBox";
import { LpStickyCta } from "./LpStickyCta";
import { LpTopBar } from "./LpTopBar";
import { lpPlans, PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 広告LP（CLAUDE.md §21）。
// 設計：docs/reports/2026-08-26-lp-page-design-15expert.html
// 競合7社のフルページ実測（public/images/LP/）を踏まえた構成。
// 取り入れた型：ヘッダー常設電話／ヒーロー直下の電話ボックス／入口分岐（お急ぎ・ご会葬）／
// バッジによる実績提示／プランカード／手書きアンケートによる社会的証明／ページ内フォーム。

const BADGES = [
  { value: "20年", label: "川口市で創業" },
  { value: "4,600件超", label: "累計の施行" },
  { value: "97%超", label: "アンケート満足度" },
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
    label: "01",
    title: "川口市めぐりの森まで、車で約5分",
    body: "火葬場がすぐ近くです。ご高齢の参列者が多い場合でも、ご移動の負担を抑えてお見送りいただけます。",
  },
  {
    image: "/images/home/hall/hall-parking.png",
    alt: "川口メモリアルホールの駐車場",
    label: "02",
    title: "駐車場70台・敷地内で無料",
    body: "お車でお越しの参列者が多いご葬儀でも、路上駐車で近隣にご迷惑をおかけすることがありません。",
  },
  {
    image: "/images/home/hall/hall-family-waiting-room.jpg",
    alt: "川口メモリアルホールのご親族控室",
    label: "03",
    title: "貸式場ではない、自社の式場です",
    body: "時間に追われることなく、ご家族のペースでお別れの時間をお過ごしいただけます。",
  },
];

const FLOW = [
  {
    step: "お電話",
    body: "24時間365日受付。ご状況をお聞かせください。",
    image: "/images/home/hall/hall-exterior.jpg",
    alt: "川口メモリアルホール外観",
  },
  {
    step: "お迎え・ご安置",
    body: "寝台車でおうかがいし、ご自宅または当社の安置施設へご安置します。",
    image: "/images/home/hall/hall-interior.jpg",
    alt: "川口メモリアルホール館内",
  },
  {
    step: "お打合せ",
    body: "ご希望とご予算をうかがい、お見積りをご提示します。",
    image: "/images/home/hall/hall-family-waiting-room.jpg",
    alt: "ご親族控室",
  },
  {
    step: "ご葬儀・ご火葬",
    body: "川口メモリアルホールでお見送りいただき、川口市めぐりの森などへご移動します。",
    image: "/images/home/hall/hall-ceremony-room.jpg",
    alt: "式場",
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

const LP_VOICE_SLUGS = [
  "oneday-careful-guidance",
  "cremation-clear-pricing",
  "family-funeral-warm",
];

const lpVoices = LP_VOICE_SLUGS.map((slug) =>
  voices.find((voice) => voice.slug === slug)
).filter((voice): voice is NonNullable<typeof voice> => Boolean(voice));

export default function LpPage() {
  return (
    <div className="bg-paper pb-28 text-ink">
      <LpTopBar />

      {/* ヒーロー */}
      <section className="relative">
        <div className="relative min-h-[420px] w-full md:min-h-[520px]">
          <Image
            src="/images/home/hero/hall-exterior-hero.jpg"
            alt="川口メモリアルホールの外観"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-deep/70 to-brand-deep/90" />
          <div className="relative flex flex-col items-center justify-center px-5 py-10 text-center text-white">
            <p className="rounded-full border border-white/50 px-3 py-1 text-[11px] tracking-[0.14em]">
              埼玉県川口市・新井宿／自社式場
            </p>
            <h1 className="font-serif-jp mt-4 text-[27px] font-medium leading-tight md:text-[44px]">
              川口市めぐりの森まで、
              <br />
              車で約5分。
            </h1>
            <p className="mt-3 text-sm leading-7 md:text-base">
              駐車場70台の自社式場・川口メモリアルホール
              <br />
              直葬から家族葬・市民葬まで、24時間365日承ります
            </p>

            <dl className="mt-5 grid w-full max-w-md grid-cols-3 gap-2">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-lg border border-gold/50 bg-white/10 px-1 py-2.5"
                >
                  <dd className="font-serif-jp text-lg font-medium leading-tight text-gold md:text-2xl">
                    {badge.value}
                  </dd>
                  <dt className="mt-1 text-[10px] leading-tight text-white/90">
                    {badge.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 入口分岐：お急ぎの方と、ご会葬の方を最初に分ける（光彩セレモの型） */}
      <section className="bg-white px-4 py-5">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2">
          <a
            href="#urgent"
            className="rounded-xl border-2 border-emergency bg-emergency/5 px-3 py-3 text-center"
          >
            <span className="block text-sm font-bold text-emergency">
              ご危篤・ご逝去で
              <br />
              お急ぎの方
            </span>
            <span className="mt-1 block text-[11px] text-ink-mid">
              いま何をすればよいか →
            </span>
          </a>
          <a
            href="#hall"
            className="rounded-xl border-2 border-brand bg-brand/5 px-3 py-3 text-center"
          >
            <span className="block text-sm font-bold text-brand-deep">
              ご会葬の方へ
              <br />
              （式場のご案内）
            </span>
            <span className="mt-1 block text-[11px] text-ink-mid">
              場所・駐車場を見る →
            </span>
          </a>
        </div>
      </section>

      <LpPhoneBox />

      {/* お急ぎの方へ */}
      <section
        id="urgent"
        className="scroll-mt-16 border-y-4 border-emergency bg-white px-5 py-9"
      >
        <div className="mx-auto max-w-2xl">
          <p className="inline-block rounded bg-emergency px-3 py-1 text-xs font-bold text-white">
            ご危篤・ご逝去でお急ぎの方へ
          </p>
          <h2 className="font-serif-jp mt-3 text-[22px] font-medium leading-snug text-ink-deep md:text-3xl">
            何も決まっていなくて
            <br className="md:hidden" />
            大丈夫です。
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-mid">
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
                <p className="mt-1 text-sm leading-7 text-ink-mid">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <a
            href={PHONE_HREF}
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
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
            川口典礼が選ばれる理由
          </h2>
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
                  <span className="font-serif-jp absolute left-0 top-0 bg-brand px-3 py-1 text-sm text-white">
                    {item.label}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-7 text-ink-mid">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LpCtaBand />

      {/* 費用 */}
      <section id="price" className="scroll-mt-16 bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            PLAN
          </p>
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
            費用の目安
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-7 text-ink-mid">
            表示は通常価格です。ご葬儀の内容・人数・ご希望により変わりますので、
            正式なお見積り時にご確認ください。
          </p>

          <div className="mt-6 space-y-4">
            {lpPlans.map((plan) => (
              <Link
                key={plan.slug}
                href={plan.href}
                className="flex gap-3 overflow-hidden rounded-xl border border-line bg-paper shadow-sm transition hover:border-brand hover:shadow-md"
              >
                {plan.image && (
                  <div className="relative w-28 shrink-0 md:w-40">
                    <Image
                      src={plan.image.src}
                      alt={plan.image.alt}
                      fill
                      loading="lazy"
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 py-3 pr-3">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-xl">
                    {plan.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-6 text-ink-mid">
                    {plan.short}
                  </p>
                  <p className="mt-1 inline-block rounded bg-brand-tint px-2 py-0.5 text-[10px] text-brand-deep">
                    {plan.people}／{plan.days}
                  </p>
                  <p className="mt-1.5 text-[22px] font-bold leading-tight text-emergency md:text-[26px]">
                    {plan.mainPrice}
                  </p>
                  {plan.memberPrice && (
                    <p className="text-[11px] leading-5 text-ink-soft">
                      事前相談会員価格 {plan.memberPrice}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-line bg-paper p-4">
            <p className="text-sm font-bold text-ink-deep">
              含まれるもの・含まれないもの
            </p>
            <p className="mt-2 text-sm leading-7 text-ink-mid">
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

      <LpPhoneBox
        lead="どのプランが合うか分からない、という段階でも構いません"
        tone="dark"
      />

      {/* お客様の声（手書きアンケート） */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            VOICE
          </p>
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
            ご葬儀を終えられたご家族から
          </h2>
          <p className="mt-2 text-center text-sm text-ink-mid">
            ご葬儀後にお答えいただいた、手書きのアンケートです。
          </p>

          <div className="mt-6 space-y-5">
            {lpVoices.map((voice) => (
              <figure
                key={voice.slug}
                className="overflow-hidden rounded-xl border border-line bg-white shadow-sm"
              >
                <div className="p-5">
                  <p aria-hidden className="text-base tracking-widest text-gold">
                    {"★".repeat(voice.rating)}
                  </p>
                  <blockquote className="font-serif-jp mt-2 text-base font-medium leading-relaxed text-ink-deep md:text-lg">
                    「{voice.title}」
                  </blockquote>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {voice.comment}
                  </p>
                  <figcaption className="mt-3 text-xs text-ink-soft">
                    {voice.family}
                  </figcaption>
                </div>
                {voice.surveyImage && (
                  <div className="relative h-56 w-full border-t border-line bg-paper md:h-72">
                    <Image
                      src={voice.surveyImage.src}
                      alt={voice.surveyImage.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 672px, 100vw"
                      className="object-contain"
                    />
                  </div>
                )}
              </figure>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-brand-tint bg-brand-tint/40 p-5 text-center">
            <p className="text-sm text-ink-mid">ご葬儀後アンケートの満足度</p>
            <p className="font-serif-jp mt-1 text-4xl font-medium text-brand-deep md:text-5xl">
              97<span className="text-2xl">%超</span>
            </p>
            <p className="mt-2 text-xs leading-6 text-ink-soft">
              ※
              ご葬儀後にお答えいただいたアンケートの集計に基づく数値です。累計4,600件以上・年間約260件はおおよその実績です。
            </p>
          </div>
        </div>
      </section>

      <LpCtaBand
        heading="ご相談だけでも構いません"
        note="無理におすすめすることはありません。ご不明な点をお聞きください。"
      />

      {/* 式場（ご会葬の方の着地点も兼ねる） */}
      <section id="hall" className="scroll-mt-16 bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            HALL
          </p>
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
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
        </div>
      </section>

      {/* 流れ */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
            FLOW
          </p>
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
            お電話をいただいてからの流れ
          </h2>
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
                  <p className="mt-1 text-sm leading-7 text-ink-mid">
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
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium md:text-3xl">
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
                <p className="mt-2 text-sm leading-7 text-ink-mid">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ページ内フォーム（ティアの型） */}
      <section id="contact" className="scroll-mt-16 bg-brand-deep px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs tracking-[0.16em] text-gold">
            CONTACT
          </p>
          <h2 className="font-serif-jp mt-1 text-center text-[22px] font-medium text-white md:text-3xl">
            メールでのご相談
          </h2>
          <p className="mt-2 text-center text-sm leading-7 text-white/85">
            お急ぎの場合は、お電話のほうが早くご案内できます。
          </p>
          <a
            href={PHONE_HREF}
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
