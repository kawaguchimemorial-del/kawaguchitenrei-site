import Image from "next/image";
import Link from "next/link";

import { LpStickyCta } from "./LpStickyCta";
import { lpPlans, PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

// 広告LP（CLAUDE.md §21）。構成は docs/reports/2026-08-26-lp-page-design-15expert.html の合議に従う。
// ・ファーストビューに価格を置かない（会員価格が適用されない層が着地するため）
// ・価格は通常価格を主表示
// ・煽り表現を使わず、手順の提示で電話までの障壁を下げる
// ・JSON-LD は入れない（noindex のため）

const TRACK_RECORD = [
  { value: "20年", label: "創業" },
  { value: "4,600件以上", label: "累計の施行実績" },
  { value: "約260件", label: "年間の施行実績" },
  { value: "97%以上", label: "アンケート満足度" },
];

const FIRST_STEPS = [
  {
    title: "まずはお電話ください",
    body: "病院・施設・ご自宅、どちらからでもお迎えに向かいます。深夜・早朝でもお電話がつながります。",
  },
  {
    title: "ご安置場所は未定でも大丈夫です",
    body: "決まっていない場合は、当社の安置施設をご利用いただけます。お電話でご相談ください。",
  },
  {
    title: "費用は後からご相談いただけます",
    body: "お迎えの時点で内容を決めていただく必要はありません。お見積りをご確認のうえ、お決めいただけます。",
  },
];

const REASONS = [
  {
    title: "川口市めぐりの森まで車で約5分",
    body: "火葬場が近く、ご移動のご負担を抑えられます。ご高齢の参列者が多い場合にも配慮できます。",
  },
  {
    title: "駐車場70台・自社式場",
    body: "敷地内に無料の駐車場を70台。お車でお越しの参列者が多いご葬儀でも、近隣にご迷惑をおかけしません。",
  },
  {
    title: "川口市の葬祭事業（市民葬）登録店",
    body: "川口市民の方は市民葬プランをご利用いただけます。申請手続きからご相談いただけます。",
  },
];

const FLOW = [
  { step: "お電話", body: "24時間365日受付。まずはご連絡ください。" },
  { step: "お迎え・ご安置", body: "病院・施設・ご自宅へお迎えにあがります。" },
  { step: "お打合せ", body: "ご希望とご予算をうかがい、お見積りをご提示します。" },
  { step: "通夜・ご葬儀", body: "川口メモリアルホールでお見送りいただけます。" },
  { step: "ご火葬", body: "川口市めぐりの森などへご移動し、お見送りします。" },
];

const FAQS = [
  {
    q: "深夜や早朝でも対応してもらえますか。",
    a: "はい。24時間365日、年中無休でお電話を受け付けています。お迎えも時間を問わずうかがいます。",
  },
  {
    q: "病院から「すぐに移動を」と言われています。",
    a: "お電話をいただければ、お迎えの手配をいたします。ご安置場所が決まっていない場合も、そのままご相談ください。",
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
    q: "宗派の指定はありますか。",
    a: "特定の宗派に限定していません。菩提寺がある場合もない場合も、ご事情にあわせてご相談いただけます。",
  },
];

export default function LpPage() {
  return (
    <div className="bg-paper pb-28 text-ink">
      {/* 1. ファーストビュー ─ 価格は置かない。電話と「今すべきこと」への導線のみ */}
      <section className="relative">
        <div className="relative h-[210px] w-full md:h-[320px]">
          <Image
            src="/images/home/hall/hall-exterior.jpg"
            alt="川口メモリアルホールの外観"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-deep/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <p className="text-xs font-semibold tracking-[0.2em] md:text-sm">
              埼玉県川口市・新井宿
            </p>
            <h1 className="font-serif-jp mt-2 text-2xl font-medium leading-snug md:text-4xl">
              川口市のご葬儀は
              <br className="md:hidden" />
              川口典礼へ
            </h1>
            <p className="mt-2 text-sm md:text-base">
              自社式場 川口メモリアルホール／創業20年
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 py-6">
          <a
            href={PHONE_HREF}
            className="flex flex-col items-center rounded-xl bg-emergency px-5 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span className="text-sm font-semibold tracking-wide">
              24時間365日・年中無休で受付
            </span>
            <span className="mt-1 text-3xl font-bold tracking-wider md:text-4xl">
              {PHONE_DISPLAY}
            </span>
            <span className="mt-1 text-xs">タップでお電話がつながります</span>
          </a>
          <a
            href="#price"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-brand bg-white px-4 py-3 text-sm font-semibold text-brand"
          >
            費用の目安を見る
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      {/* 2. ご逝去直後の方へ ─ 煽らず、手順を渡す */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            ご逝去直後の方へ ― いま必要な3つのこと
          </h2>
          <ol className="mt-5 space-y-4">
            {FIRST_STEPS.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-lg border border-line bg-paper p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink-deep">{item.title}</p>
                  <p className="mt-1 text-sm leading-7 text-ink-mid">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. 費用の目安 ─ 通常価格を主表示。7プランではなく指定の6プランを1表に */}
      <section id="price" className="scroll-mt-4 py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            費用の目安
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-mid">
            下記は通常価格です。ご葬儀の内容・人数・ご希望により変わりますので、
            正式なお見積り時にご確認ください。
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-brand-tint text-ink-deep">
                  <th className="border border-line px-3 py-2 text-left">
                    プラン
                  </th>
                  <th className="border border-line px-3 py-2 text-left">
                    人数・日数の目安
                  </th>
                  <th className="border border-line px-3 py-2 text-right">
                    通常価格
                  </th>
                </tr>
              </thead>
              <tbody>
                {lpPlans.map((plan) => (
                  <tr key={plan.slug} className="align-top">
                    <td className="border border-line px-3 py-3">
                      <Link
                        href={plan.href}
                        className="font-semibold text-brand underline underline-offset-2"
                      >
                        {plan.name}
                      </Link>
                      <p className="mt-1 text-xs leading-6 text-ink-mid">
                        {plan.short}
                      </p>
                    </td>
                    <td className="border border-line px-3 py-3 text-xs leading-6 text-ink-mid">
                      {plan.people}
                      <br />
                      {plan.days}
                    </td>
                    <td className="border border-line px-3 py-3 text-right">
                      <span className="font-bold text-ink-deep">
                        {plan.mainPrice}
                      </span>
                      {plan.memberPrice && (
                        <span className="mt-1 block text-[11px] leading-5 text-ink-soft">
                          事前相談会員価格
                          <br />
                          {plan.memberPrice}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-lg border border-line bg-white p-4">
            <p className="text-sm font-semibold text-ink-deep">
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
              ※ 事前相談会員価格は、事前にご相談いただいた方の価格です。
              川口市民葬プランは川口市民の方が対象で、会員・通常の区分はございません。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 選ばれる理由 */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            川口典礼が選ばれる理由
          </h2>
          <div className="mt-5 space-y-3">
            {REASONS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-line bg-paper p-4"
              >
                <p className="font-semibold text-ink-deep">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-ink-mid">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {TRACK_RECORD.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-line bg-paper p-4 text-center"
              >
                <dt className="text-xs text-ink-mid">{item.label}</dt>
                <dd className="font-serif-jp mt-1 text-2xl font-medium text-brand">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-6 text-ink-soft">
            ※
            年間施行件数はおおよその目安、累計件数は創業からの実績です。満足度はご葬儀後にお答えいただいたアンケートの集計に基づく数値です。
          </p>
        </div>
      </section>

      {/* 5. 式場のご案内 */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            川口メモリアルホール
          </h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-line bg-white">
            <div className="relative h-48 w-full md:h-64">
              <Image
                src="/images/home/hall/hall-ceremony-room.jpg"
                alt="川口メモリアルホールの式場内観"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
            <dl className="divide-y divide-line text-sm">
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-20 shrink-0 font-semibold text-ink-deep">
                  所在地
                </dt>
                <dd className="text-ink-mid">埼玉県川口市西新井宿440-1</dd>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-20 shrink-0 font-semibold text-ink-deep">
                  電車
                </dt>
                <dd className="text-ink-mid">
                  埼玉高速鉄道「新井宿」駅 徒歩約10分
                </dd>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-20 shrink-0 font-semibold text-ink-deep">
                  お車
                </dt>
                <dd className="text-ink-mid">
                  首都高速川口線「新井宿出入口」より約5分。駐車場70台（敷地内・無料）
                </dd>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-20 shrink-0 font-semibold text-ink-deep">
                  火葬場
                </dt>
                <dd className="text-ink-mid">
                  川口市めぐりの森まで車で約5分
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 6. ご依頼の流れ */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            ご依頼の流れ
          </h2>
          <ol className="mt-5 space-y-3">
            {FLOW.map((item, index) => (
              <li key={item.step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand text-sm font-bold text-brand">
                  {index + 1}
                </span>
                <div>
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

      {/* 7. よくあるご質問 */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            よくあるご質問
          </h2>
          <div className="mt-5 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="rounded-lg border border-line bg-white p-4"
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

      {/* 8. お問い合わせ */}
      <section className="bg-brand-deep py-10 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-serif-jp text-xl font-medium md:text-2xl">
            お気軽にご相談ください
          </h2>
          <p className="mt-2 text-sm leading-7">
            ご葬儀のご依頼だけでなく、費用のご相談・式場の見学もお受けしています。
          </p>
          <a
            href={PHONE_HREF}
            className="mt-5 flex flex-col items-center rounded-xl bg-white px-5 py-4 text-emergency shadow-sm"
          >
            <span className="text-sm font-semibold">24時間365日・年中無休</span>
            <span className="mt-1 text-3xl font-bold tracking-wider">
              {PHONE_DISPLAY}
            </span>
          </a>
          <Link
            href="/lp/contact/"
            className="mt-3 flex items-center justify-center rounded-lg border-2 border-white px-4 py-3 text-sm font-semibold text-white"
          >
            メールでのご相談はこちら
          </Link>
        </div>
      </section>

      <footer className="py-6 text-center text-xs text-ink-soft">
        <p>川口典礼（埼玉県川口市西新井宿440-1）</p>
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
