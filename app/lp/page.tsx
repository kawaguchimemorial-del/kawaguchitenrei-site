import Image from "next/image";
import Link from "next/link";

import { voices } from "@/lib/voices";
import { LpCtaBand } from "./LpCtaBand";
import { LpStickyCta } from "./LpStickyCta";
import { LpTopBar } from "./LpTopBar";
import { lpPlans, PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 広告LP（CLAUDE.md §21）。
// 設計：docs/reports/2026-08-26-lp-page-design-15expert.html
// 競合実測（小さなお葬式・花ぜんセレモニー 2026-08-26）を踏まえ、
// 上部固定電話・CTAの反復・お急ぎ専用ブロック・写真によるメリハリを入れている。

const URGENT_STEPS = [
  {
    title: "病院・施設からのお迎え",
    body: "「すぐに移動を」と言われた方も、まずお電話ください。深夜・早朝でも寝台車でお迎えにあがります。",
  },
  {
    title: "ご安置場所が決まっていない",
    body: "ご自宅に安置が難しい場合、当社の安置施設をご利用いただけます。決まっていない前提でご相談ください。",
  },
  {
    title: "費用が心配で決められない",
    body: "お迎えの時点で内容を決めていただく必要はありません。お見積りをご確認のうえ、お決めいただけます。",
  },
];

const TRACK_RECORD = [
  { value: "20年", label: "創業" },
  { value: "4,600件超", label: "累計の施行" },
  { value: "約260件", label: "年間の施行" },
  { value: "97%超", label: "満足度" },
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
    title: "自社式場だから、時間に追われません",
    body: "貸式場ではなく自社の式場です。ご家族のペースでお別れの時間をお過ごしいただけます。",
  },
];

const FLOW = [
  { step: "お電話", body: "24時間365日受付。ご状況をお聞かせください。" },
  { step: "お迎え", body: "寝台車で病院・施設・ご自宅へおうかがいします。" },
  { step: "ご安置", body: "ご自宅または当社の安置施設へご安置します。" },
  { step: "お打合せ", body: "ご希望とご予算をうかがい、お見積りをご提示します。" },
  { step: "ご葬儀", body: "川口メモリアルホールでお見送りいただけます。" },
  { step: "ご火葬", body: "川口市めぐりの森などへご移動します。" },
];

const HALL_PHOTOS = [
  { src: "/images/home/hall/hall-ceremony-room.jpg", alt: "川口メモリアルホールの式場" },
  { src: "/images/home/hall/hall-interior.jpg", alt: "川口メモリアルホールの館内" },
  {
    src: "/images/hall/kawaguchi-memorial-hall/kawaguchi-memorial-hall-visitation-room-pet.png",
    alt: "川口メモリアルホールの個室面会室",
  },
  { src: "/images/home/hall/hall-family-waiting-room.jpg", alt: "ご親族控室" },
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
];

const LP_VOICE_SLUGS = [
  "oneday-careful-guidance",
  "cremation-clear-pricing",
  "direct-funeral-home-time",
];

const lpVoices = LP_VOICE_SLUGS.map((slug) =>
  voices.find((voice) => voice.slug === slug)
).filter((voice): voice is NonNullable<typeof voice> => Boolean(voice));

export default function LpPage() {
  return (
    <div className="bg-paper pb-28 text-ink">
      <LpTopBar />

      {/* ヒーロー：地域と「近さ」を一言で刺す。花ぜんの「川口駅徒歩5分！」に対応する当社の武器 */}
      <section className="relative">
        <div className="relative h-[380px] w-full md:h-[460px]">
          <Image
            src="/images/home/hero/hall-exterior-hero.jpg"
            alt="川口メモリアルホールの外観"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/75 via-brand-deep/65 to-brand-deep/85" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <p className="rounded-full border border-white/50 px-3 py-1 text-[11px] tracking-[0.16em] md:text-xs">
              埼玉県川口市・新井宿／自社式場
            </p>
            <h1 className="font-serif-jp mt-4 text-[26px] font-medium leading-tight md:text-[42px]">
              川口市めぐりの森まで、
              <br />
              車で約5分。
            </h1>
            <p className="mt-3 text-sm leading-7 md:text-base">
              駐車場70台の自社式場・川口メモリアルホール
              <br />
              直葬から家族葬・市民葬まで、24時間365日ご相談を承ります
            </p>
            <a
              href={PHONE_HREF}
              className="mt-5 flex w-full max-w-sm flex-col items-center rounded-xl bg-emergency px-5 py-4 shadow-xl transition hover:bg-emergency-deep"
            >
              <span className="text-xs font-bold tracking-wide">
                深夜・早朝もつながります
              </span>
              <span className="mt-0.5 text-[34px] font-bold leading-tight tracking-wider md:text-[42px]">
                {PHONE_DISPLAY}
              </span>
              <span className="text-[11px]">タップで発信できます</span>
            </a>
            <a
              href="#price"
              className="mt-3 text-sm text-white underline underline-offset-4"
            >
              費用の目安を見る ↓
            </a>
          </div>
        </div>
      </section>

      {/* お急ぎの方へ：LPで最も重要なブロック。緊急層の3つの困りごとに直接答える */}
      <section className="border-y-4 border-emergency bg-white px-5 py-8">
        <div className="mx-auto max-w-2xl">
          <p className="inline-block rounded bg-emergency px-3 py-1 text-xs font-bold text-white">
            ご危篤・ご逝去でお急ぎの方へ
          </p>
          <h2 className="font-serif-jp mt-3 text-xl font-medium leading-snug text-ink-deep md:text-2xl">
            何も決まっていなくて大丈夫です。
            <br />
            まず、お電話ください。
          </h2>
          <div className="mt-5 space-y-3">
            {URGENT_STEPS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border-l-4 border-emergency bg-paper p-4"
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
            <span className="text-xs font-bold">24時間365日・年中無休</span>
            <span className="mt-0.5 text-3xl font-bold tracking-wider">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>
      </section>

      {/* 実績の帯 */}
      <section className="bg-brand px-5 py-6 text-white">
        <dl className="mx-auto grid max-w-2xl grid-cols-4 gap-2 text-center">
          {TRACK_RECORD.map((item) => (
            <div key={item.label}>
              <dd className="font-serif-jp text-lg font-medium leading-tight md:text-2xl">
                {item.value}
              </dd>
              <dt className="mt-1 text-[10px] text-white/85 md:text-xs">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-5 text-white/70">
          ※
          年間施行件数はおおよその目安、累計件数は創業からの実績です。満足度はご葬儀後にお答えいただいたアンケートの集計に基づく数値です。
        </p>
      </section>

      {/* 選ばれる理由 */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
            川口典礼が選ばれる理由
          </h2>
          <div className="mt-6 space-y-5">
            {REASONS.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-xl border border-line bg-white shadow-sm"
              >
                <div className="relative h-44 w-full md:h-56">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 672px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-0 top-0 bg-brand px-3 py-1 font-serif-jp text-sm text-white">
                    {item.label}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-serif-jp text-lg font-medium text-ink-deep">
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
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
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
                className="flex gap-3 overflow-hidden rounded-xl border border-line bg-paper shadow-sm transition hover:border-brand"
              >
                {plan.image && (
                  <div className="relative h-auto w-28 shrink-0 md:w-36">
                    <Image
                      src={plan.image.src}
                      alt={plan.image.alt}
                      fill
                      loading="lazy"
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 py-3 pr-3">
                  <p className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                    {plan.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-6 text-ink-mid">
                    {plan.short}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {plan.people}／{plan.days}
                  </p>
                  <p className="mt-2 text-xl font-bold text-brand-deep md:text-2xl">
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

      {/* お迎えまでの流れ */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
            お電話をいただいてからの流れ
          </h2>
          <ol className="mt-6 space-y-0">
            {FLOW.map((item, index) => (
              <li key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  {index < FLOW.length - 1 && (
                    <span className="h-full w-px flex-1 bg-brand-tint" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-ink-deep">{item.step}</p>
                  <p className="mt-0.5 text-sm leading-7 text-ink-mid">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LpCtaBand
        heading="ご不明な点は、お電話でお聞きください"
        note="ご相談だけでも構いません。無理におすすめすることはありません。"
      />

      {/* 式場 */}
      <section className="bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
            川口メモリアルホール
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {HALL_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative h-32 w-full overflow-hidden rounded-lg md:h-40"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 330px, 50vw"
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

      {/* お客様の声 */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
            ご葬儀を終えられたご家族から
          </h2>
          <div className="mt-6 space-y-4">
            {lpVoices.map((voice) => (
              <figure
                key={voice.slug}
                className="rounded-xl border border-line bg-white p-5 shadow-sm"
              >
                <p aria-hidden className="text-sm text-gold">
                  {"★".repeat(voice.rating)}
                </p>
                <blockquote className="font-serif-jp mt-2 text-base font-medium leading-relaxed text-ink-deep">
                  「{voice.title}」
                </blockquote>
                <p className="mt-2 text-sm leading-7 text-ink-mid">
                  {voice.comment}
                </p>
                <figcaption className="mt-3 text-xs text-ink-soft">
                  {voice.family}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-ink-soft">
            ご葬儀後にお答えいただいたアンケートより。個人が特定される情報は掲載していません。
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif-jp text-center text-xl font-medium md:text-2xl">
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

      <LpCtaBand
        heading="川口市のご葬儀は、川口典礼へ"
        note="24時間365日・年中無休。ご危篤の段階でのご相談もお受けしています。"
      />

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
