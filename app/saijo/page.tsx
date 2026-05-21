import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/saijo/`;

export const metadata: Metadata = {
  title: "川口市・近隣の葬儀場一覧｜川口典礼",
  description:
    "川口市・近隣で利用できる葬儀場を一覧でご案内。川口メモリアルホール、めぐりの森、戸田葬祭場、谷塚斎場、川口市内の寺院会館・民営式場など、川口典礼でご相談・手配に対応しています。",
  alternates: { canonical: "/saijo/" },
  openGraph: {
    title: "川口市・近隣の葬儀場一覧｜川口典礼",
    description:
      "川口市・近隣で利用できる葬儀場を一覧でご案内。川口メモリアルホール、めぐりの森、戸田葬祭場、谷塚斎場、川口市内の寺院会館・民営式場など、川口典礼でご相談・手配に対応しています。",
    url: "/saijo/",
    type: "website",
  },
};

const publicSaijo = [
  {
    name: "川口市めぐりの森",
    href: "/saijo/megurinomori/",
    address: "埼玉県川口市大字新井宿430-1",
    summary:
      "川口市が運営する火葬場。式場は併設されておらず、ご家族の式場とは別の場所で火葬を行います。",
    badge: "公営・火葬場",
  },
  {
    name: "戸田葬祭場",
    href: "/saijo/toda-sousaijyo/",
    address: "埼玉県戸田市美女木2-15-1",
    summary:
      "式場と火葬場が同じ敷地内にある民営の総合斎場。川口市から車で利用しやすく、移動の負担が少ない斎場です。",
    badge: "式場・火葬場併設",
  },
  {
    name: "谷塚斎場",
    href: "/saijo/yatsuka-saijo/",
    address: "埼玉県草加市谷塚町474",
    summary:
      "草加市・八潮市・川口市東部の方が利用される斎場。式場と火葬場を併設しています。",
    badge: "式場・火葬場併設",
  },
];

const templeHalls = [
  {
    name: "東礼川口",
    address: "埼玉県川口市内",
    suitedFor: "ご家族・ご親族中心の家族葬や一日葬をお考えの方",
    features:
      "川口市内の民営式場。少人数のお別れから一般的な家族葬まで、落ち着いた雰囲気でお見送りいただけます。",
  },
  {
    name: "随泉寺会館",
    address: "埼玉県川口市内",
    suitedFor: "菩提寺や宗教者との繋がりを大切にしたいご家族",
    features:
      "寺院に併設された会館で、僧侶との連携がスムーズ。宗教儀礼を丁寧に進めたい方に向いています。",
  },
  {
    name: "実相寺会館 鷲峰殿",
    address: "埼玉県川口市内",
    suitedFor: "格式を保ちながら家族葬を行いたいご家族",
    features:
      "落ち着いた佇まいの寺院会館。家族葬から一般葬まで幅広く対応できる規模感です。",
  },
  {
    name: "東光院会館",
    address: "埼玉県川口市内",
    suitedFor: "菩提寺との関係を活かしたお別れをご希望の方",
    features:
      "寺院併設の会館。読経・法要の流れをそのまま会館内で行えるため、ご家族の移動負担が少ない式場です。",
  },
  {
    name: "専称寺会館 迎了殿",
    address: "埼玉県川口市内",
    suitedFor: "親族・ご近所中心の家族葬をご希望の方",
    features:
      "ご家族・ご親族でゆっくりとお別れの時間を過ごしていただける広さ。地域に根ざした式場です。",
  },
  {
    name: "正源寺",
    address: "埼玉県川口市内",
    suitedFor: "寺院の本堂で式を執り行いたい方",
    features:
      "寺院本堂を式場としてご利用いただける場合があります。詳細はご相談時にご案内します。",
  },
  {
    name: "興照寺センゲンホール",
    address: "埼玉県川口市内",
    suitedFor: "ご家族中心のお見送り、一日葬・家族葬をお考えの方",
    features:
      "寺院に併設された式場。宗教者との連携がしやすく、お別れの場として落ち着いた環境を整えやすい会館です。",
  },
  {
    name: "新隆寺 法要殿",
    address: "埼玉県川口市内",
    suitedFor: "法要・告別を同じ場所で行いたいご家族",
    features:
      "寺院併設の法要殿。お通夜・告別式から法要までをひと続きで行いやすい式場です。",
  },
];

const selectionPoints = [
  {
    title: "自宅からの距離",
    body: "ご家族・ご親族の集まりやすさや、ご移動の負担を考えて選びます。",
  },
  {
    title: "火葬場までの距離",
    body: "式場と火葬場が離れているか、併設かによって移動時間や霊柩車の手配が変わります。",
  },
  {
    title: "駐車場",
    body: "ご親族や参列者の人数に対して、駐車場の台数が十分かを確認します。",
  },
  {
    title: "安置・面会の可否",
    body: "ご安置場所や面会できる時間帯は式場によって異なります。",
  },
  {
    title: "家族葬に向いているか",
    body: "少人数のお別れに合う広さ・雰囲気か、落ち着いて過ごせる空間かを確認します。",
  },
  {
    title: "宗教者・菩提寺との関係",
    body: "菩提寺のご意向や宗教者の出向きやすさによって、適した式場が変わることがあります。",
  },
  {
    title: "費用",
    body: "式場使用料、控室、ご利用時間、追加設備など、式場によって費用構成が異なります。",
  },
  {
    title: "空き状況",
    body: "ご希望日・時間帯に空きがあるかは、お電話・ご相談時に確認させていただきます。",
  },
];

const faqs = [
  {
    q: "川口メモリアルホール以外でも葬儀はできますか？",
    a: "はい。川口典礼では、自社式場の川口メモリアルホールに加えて、川口市めぐりの森・戸田葬祭場・谷塚斎場や、川口市内の寺院会館・民営式場など、ご希望や地域に合わせた葬儀場でのご相談・手配に対応しています。",
  },
  {
    q: "めぐりの森で葬儀はできますか？",
    a: "川口市めぐりの森は火葬場で、通夜・告別式を行う式場は併設されていません。川口典礼では、式場でのお別れから川口市めぐりの森での火葬まで、一連の流れをサポートします。",
  },
  {
    q: "戸田葬祭場や谷塚斎場も手配できますか？",
    a: "はい。戸田葬祭場・谷塚斎場はいずれも川口典礼の運営する施設ではありませんが、ご希望に応じて、これらの斎場をご利用いただく葬儀のご相談・手配に対応しています。",
  },
  {
    q: "寺院会館でも家族葬はできますか？",
    a: "はい。川口市内の寺院会館・民営式場でも、家族葬・一日葬・一般葬のお見送りに対応しています。菩提寺との関係や、ご希望の規模・雰囲気に合わせてご提案します。",
  },
  {
    q: "式場の空き状況は確認してもらえますか？",
    a: "はい。ご希望の式場・日程をお伺いしたうえで、空き状況を確認しご連絡します。ご相談・お見積りは無料で承っています。",
  },
  {
    q: "費用は式場によって変わりますか？",
    a: "はい。式場使用料、ご利用時間、付帯設備、火葬場までの距離などにより、ご葬儀全体の費用は変動します。ご希望の式場・規模に合わせて、概算のお見積りをお出しします。",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "川口典礼",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "葬儀場一覧",
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function SaijoIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* FV */}
      <section className="border-b border-line-soft bg-paper">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "ホーム", href: "/" },
                { label: "葬儀場一覧" },
              ]}
            />
          </div>

          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Saijo
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            川口市・近隣で利用できる葬儀場
          </p>
          <h1 className="font-serif-jp mt-4 max-w-3xl text-[2.1rem] font-medium leading-[1.35] text-ink-deep md:text-[2.9rem] md:leading-[1.3]">
            川口市・近隣で利用できる
            <br className="hidden md:block" />
            葬儀場一覧
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-9 text-ink-mid md:text-lg md:leading-10">
            川口典礼では、自社式場「川口メモリアルホール」をはじめ、川口市めぐりの森、戸田葬祭場、谷塚斎場、川口市内の寺院会館・民営式場など、ご希望や地域に合わせた葬儀場のご相談に対応しています。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
            >
              葬儀場について相談する
              <span aria-hidden>→</span>
            </a>
            <a
              href="/estimate/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
            >
              費用の見積りを依頼する
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 自社式場 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Our Hall
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              まずご検討いただきたい自社式場
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              川口メモリアルホール。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              ご家族中心の落ち着いたお別れを、ご移動の少ない動線で。川口典礼の自社式場として、家族葬・一日葬・直葬まで丁寧にお手伝いします。
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border-2 border-brand bg-white shadow-sm md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
            <div className="p-6 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Our Own Hall
              </p>
              <h3 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                川口メモリアルホール
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-deep">
                川口典礼の自社式場
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-y-4 text-sm md:gap-y-5">
                <div className="flex items-baseline gap-3 border-b border-line-soft pb-3">
                  <dt className="w-28 shrink-0 font-semibold text-ink-soft">
                    所在地
                  </dt>
                  <dd className="font-bold text-ink-deep">
                    埼玉県川口市西新井宿440-1
                  </dd>
                </div>
                <div className="flex items-baseline gap-3 border-b border-line-soft pb-3">
                  <dt className="w-28 shrink-0 font-semibold text-ink-soft">
                    火葬場まで
                  </dt>
                  <dd className="font-bold text-ink-deep">
                    川口市めぐりの森まで車で約5分
                  </dd>
                </div>
                <div className="flex items-baseline gap-3 border-b border-line-soft pb-3">
                  <dt className="w-28 shrink-0 font-semibold text-ink-soft">
                    駐車場
                  </dt>
                  <dd className="font-bold text-ink-deep">70台</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-28 shrink-0 font-semibold text-ink-soft">
                    対応形式
                  </dt>
                  <dd className="font-bold text-ink-deep">
                    家族葬・一日葬・直葬
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/hall/kawaguchi-memorial-hall/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  川口メモリアルホールの詳細
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
                >
                  この式場について相談する
                </a>
              </div>
            </div>

            <div className="bg-paper p-6 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                川口メモリアルホールの特徴
              </p>
              <ul className="mt-5 space-y-4 text-base leading-8 text-ink-mid">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    川口市めぐりの森に近く、式場と火葬場の移動負担が少ない動線。
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    駐車場70台で、ご親族・参列者の方も停めやすい広さ。
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    家族葬・一日葬・直葬まで、ご希望の規模に合わせて柔軟に対応。
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    ご安置・お打合せ・式当日まで、川口典礼が一貫してお手伝い。
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 公営斎場・火葬場併設斎場 */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Public Saijo
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              公営斎場・火葬場併設斎場
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              地域の公営斎場・火葬場併設斎場。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              川口典礼が運営する施設ではありませんが、ご希望に応じて、これらの斎場をご利用いただく葬儀のご相談・手配に対応しています。
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {publicSaijo.map((s) => (
              <li key={s.name}>
                <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                    {s.badge}
                  </p>
                  <h3 className="font-serif-jp mt-3 text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-ink-mid">
                    {s.address}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink-mid">
                    {s.summary}
                  </p>
                  <div className="mt-auto pt-6">
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-deep hover:underline"
                    >
                      {s.name}の詳細
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-lg border border-line-soft bg-white px-5 py-4 text-sm leading-7 text-ink-mid">
            ※ 川口市めぐりの森・戸田葬祭場・谷塚斎場はいずれも川口典礼が運営する施設ではありません。川口典礼ではこれらの斎場をご利用いただく葬儀のご相談・手配に対応しています。
          </p>
        </div>
      </section>

      {/* 寺院会館・民営式場 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Temple Hall
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口市内の寺院会館・民営式場
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              寺院会館・民営式場でのお見送り。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              菩提寺との関係を大切にされたい方や、地域に馴染んだ式場でお別れをご希望の方に。川口典礼では、これらの式場でも葬儀のご相談・手配に対応しています。
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {templeHalls.map((h) => (
              <li key={h.name}>
                <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
                  <h3 className="font-serif-jp text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl">
                    {h.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink-mid">
                    {h.address}
                  </p>

                  <dl className="mt-5 space-y-4 text-sm leading-7">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        向いている方
                      </dt>
                      <dd className="mt-1 text-ink-deep">{h.suitedFor}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        特徴
                      </dt>
                      <dd className="mt-1 text-ink-mid">{h.features}</dd>
                    </div>
                    <div className="rounded-lg border border-line-soft bg-paper px-4 py-3">
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                        川口典礼での対応
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink-deep">
                        ご相談・手配に対応
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6">
                    <a
                      href="/contact/"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool"
                    >
                      この式場について相談する
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-lg border border-line-soft bg-paper px-5 py-4 text-sm leading-7 text-ink-mid">
            ※ 上記の寺院会館・民営式場は川口典礼が運営する施設ではありません。利用条件や空き状況は式場により異なります。詳しくはお電話・お問い合わせフォームよりご相談ください。
          </p>
        </div>
      </section>

      {/* 葬儀場の選び方 */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              How to Choose
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              葬儀場の選び方
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              葬儀場を選ぶときに、
              <br className="md:hidden" />
              確認しておきたいこと。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              「どの斎場が向いているか」は、ご家族の人数や宗教者との関係、ご自宅からの距離など、いくつかの条件で見えてきます。迷われたときは、川口典礼にご相談ください。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {selectionPoints.map((p, i) => (
              <li
                key={p.title}
                className="rounded-lg border border-line bg-white p-6 shadow-sm"
              >
                <p className="font-serif-jp text-2xl font-medium text-brand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-bold text-ink-deep">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-mid">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              FAQ
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              よくある質問
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              葬儀場についての
              <br className="md:hidden" />
              よくあるご質問。
            </h2>
          </div>

          <ul className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <li key={faq.q}>
                <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                    <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                      <span aria-hidden className="font-serif-jp text-brand">
                        Q.
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                    <span
                      aria-hidden
                      className="font-serif-jp mr-2 font-bold text-brand"
                    >
                      A.
                    </span>
                    {faq.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            葬儀場のご相談・お手配は、
            <br className="md:hidden" />
            川口典礼へ。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            ご希望の式場・地域・規模をお伺いし、空き状況の確認から概算のお見積りまで、川口典礼が承ります。事前のご相談は無料です。
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              葬儀場について相談する
            </a>
            <a
              href="/estimate/"
              className="rounded-lg border border-white/40 bg-transparent px-5 py-5 text-center text-base font-bold text-white transition hover:bg-white/10"
            >
              費用の見積りを依頼する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
