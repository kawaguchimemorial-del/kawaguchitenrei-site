import type { Metadata } from "next";
import Image from "next/image";
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

const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

type PublicSaijo = {
  name: string;
  href: string;
  address: string;
  badge: string;
  summary: string;
};

const publicSaijo: PublicSaijo[] = [
  {
    name: "川口市めぐりの森",
    href: "/saijo/megurinomori/",
    address: "埼玉県川口市大字新井宿430-1",
    badge: "公営・火葬場",
    summary:
      "川口市が運営する火葬場。式場は併設されていないため、別の式場でお別れの時間を過ごしたあと、火葬のために移動します。川口メモリアルホールから車で約5分。",
  },
  {
    name: "戸田葬祭場",
    href: "/saijo/toda-sousaijyo/",
    address: "東京都板橋区舟渡4-15-1",
    badge: "式場・火葬場併設",
    summary:
      "東京都板橋区舟渡の火葬場併設斎場。式場・火葬炉・待合室を同じ敷地内に備え、移動の負担が少ない斎場です。",
  },
  {
    name: "谷塚斎場",
    href: "/saijo/yatsuka-saijo/",
    address: "埼玉県草加市瀬崎4-6-36",
    badge: "式場・火葬場併設",
    summary:
      "草加市瀬崎にある火葬場併設の斎場。5式場と複数の火葬炉を備え、家族葬から一般葬まで幅広く対応できます。",
  },
];

type TempleHall = {
  name: string;
  address: string;
  feeNote: string;
  suitedFor: string;
  features: string;
};

const templeHalls: TempleHall[] = [
  {
    name: "東礼川口",
    address: "埼玉県川口市大字榛松1980-1",
    feeNote: "式場使用料の目安：110,000円",
    suitedFor: "ご家族・ご親族中心の家族葬・一日葬をお考えの方",
    features:
      "川口市榛松エリアの民営式場。家族葬から一般葬まで対応できる規模感で、落ち着いた雰囲気の中でお見送りいただけます。",
  },
  {
    name: "随泉寺会館",
    address: "埼玉県川口市元郷3-4-17",
    feeNote: "式場使用料の目安：50,000円〜100,000円",
    suitedFor: "菩提寺や宗教者との繋がりを大切にされたいご家族",
    features:
      "川口市元郷の寺院会館。宗教者との連携がしやすく、宗教儀礼を丁寧に進めたい方に向いています。",
  },
  {
    name: "実相寺会館 鷲峰殿",
    address: "埼玉県川口市領家2-14-11",
    feeNote: "式場使用料の目安：1日葬 100,000円／2日葬 200,000円",
    suitedFor: "格式を保ちながら家族葬・一日葬を行いたいご家族",
    features:
      "川口市領家の寺院会館。落ち着いた佇まいで、家族葬から一般葬まで幅広く対応できる規模感です。",
  },
  {
    name: "東光院会館",
    address: "埼玉県川口市江戸袋1-20-32",
    feeNote: "式場使用料は確認のうえご案内します",
    suitedFor: "菩提寺との関係を活かしたお別れをご希望の方",
    features:
      "川口市江戸袋の寺院会館。読経・法要から告別の流れまでひと続きで行いやすく、ご家族の移動負担が少ない式場です。",
  },
  {
    name: "専称寺会館 迎了殿",
    address: "埼玉県川口市上青木5-3-43",
    feeNote: "式場使用料の目安：200,000円",
    suitedFor: "親族・ご近所中心の家族葬をご希望の方",
    features:
      "川口市上青木の寺院会館。ご家族・ご親族でゆっくりとお別れの時間を過ごしていただける広さがあります。",
  },
  {
    name: "正源寺会館",
    address: "埼玉県川口市新堀934",
    feeNote: "式場使用料の目安：150,000円",
    suitedFor: "寺院の境内で落ち着いたお別れをご希望の方",
    features:
      "川口市新堀の寺院会館。地域に根ざした寺院に併設された式場で、家族葬を中心にご利用いただけます。",
  },
  {
    name: "興照寺センゲンホール",
    address: "埼玉県川口市差間2-13-5",
    feeNote: "式場使用料の目安：150,000円",
    suitedFor: "ご家族中心のお見送り、一日葬・家族葬をお考えの方",
    features:
      "川口市差間の寺院に併設された式場。宗教者との連携がしやすく、落ち着いた環境でお別れの時間を過ごせます。",
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
    a: "はい。川口典礼では、自社式場の川口メモリアルホールに加えて、川口市めぐりの森、戸田葬祭場、谷塚斎場、川口市内の寺院会館・民営式場など、ご希望や地域に合わせた葬儀場でのご相談・手配に対応しています。詳しい利用条件は、正式なお見積り時に確認しご案内します。",
  },
  {
    q: "めぐりの森で葬儀はできますか？",
    a: "川口市めぐりの森は川口市が運営する火葬場で、通夜・告別式を行う式場は併設されていません。川口メモリアルホールなどの式場でお別れの時間を過ごしたあと、車で約5分のめぐりの森へ移動して火葬を行う流れになります。川口典礼では一連の流れをまとめてサポートします。",
  },
  {
    q: "戸田葬祭場や谷塚斎場も手配できますか？",
    a: "はい。戸田葬祭場・谷塚斎場はいずれも川口典礼が運営する施設ではありませんが、川口典礼ではこれらの斎場をご利用いただく葬儀のご相談・手配に対応しています。空き状況や料金は時期・条件により変わるため、正式なお見積り時に確認のうえご案内します。",
  },
  {
    q: "寺院会館でも家族葬はできますか？",
    a: "はい。川口市内の寺院会館・民営式場でも、家族葬・一日葬・一般葬のお見送りに対応しています。寺院会館・民営式場は川口典礼が運営する施設ではありませんが、菩提寺との関係やご希望の規模・雰囲気に合わせてご相談・ご提案します。",
  },
  {
    q: "式場の空き状況は確認してもらえますか？",
    a: "はい。ご希望の式場・日程をお伺いしたうえで、空き状況を確認しご連絡します。空き状況は時期により変わるため、正式なお見積り時に最新の状況をご案内します。事前のご相談・お見積りは無料で承っています。",
  },
  {
    q: "費用は式場によって変わりますか？",
    a: "はい。式場使用料、ご利用時間、付帯設備、火葬場までの距離などにより、ご葬儀全体の費用は変動します。掲載している式場使用料はあくまで目安で、ご利用条件により変わる場合があります。ご希望の式場・規模に合わせて、正式なお見積りでご案内します。",
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
              川口市の家族葬・一日葬・直葬を、ご移動の少ない動線でお手伝いする川口典礼の自社式場。落ち着いた雰囲気のなか、ご家族中心のお別れの時間を過ごしていただけます。
            </p>
          </div>

          <article className="mt-10 overflow-hidden rounded-lg border-2 border-brand bg-white shadow-md md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
            <div className="relative aspect-[16/10] w-full bg-warm md:aspect-auto md:min-h-[460px]">
              <Image
                src="/images/home/hall/hall-exterior.jpg"
                alt="川口メモリアルホールの外観"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
                priority
              />
            </div>

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

              <dl className="mt-6 space-y-4 text-sm md:text-base">
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
                    式場使用料
                  </dt>
                  <dd className="text-ink-deep">
                    プラン・ご葬儀内容により異なります。詳しくはお見積りでご案内します。
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

              <ul className="mt-6 space-y-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>めぐりの森に近く、式場と火葬場の移動負担が少ない動線</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>ご家族中心のお見送りに合う、落ち着いた雰囲気の式場</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>ご安置・お打合せから式当日まで、川口典礼が一貫してお手伝い</span>
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/hall/kawaguchi-memorial-hall/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  詳しく見る
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
                >
                  式場見学を相談する
                </a>
              </div>
            </div>
          </article>
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
              川口市の家族葬・一日葬・直葬で利用される、公営斎場・火葬場併設斎場をご案内します。
            </p>
          </div>

          <p className="mt-6 rounded-lg border border-line-soft bg-white px-5 py-4 text-sm leading-7 text-ink-mid">
            ※ 掲載している公営斎場・火葬場併設斎場は、川口典礼が運営する施設ではありません。川口典礼で葬儀のご相談・手配に対応している斎場としてご案内しています。式場使用料・空き状況・利用条件は変更となる場合があるため、正式なお見積り時に確認いたします。
          </p>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {publicSaijo.map((s) => (
              <li key={s.name}>
                <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
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

                  <div className="mt-5 rounded-lg border border-line-soft bg-paper px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      川口典礼での対応
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink-deep">
                      ご相談・手配に対応
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col gap-2">
                    <a
                      href={s.href}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep"
                    >
                      {s.name}の詳細
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href="/contact/"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-4 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool"
                    >
                      この斎場について相談する
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
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
              川口市 寺院会館・民営式場での
              <br className="md:hidden" />
              お見送り。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              菩提寺との関係を大切にされたい方や、地域に馴染んだ式場で家族葬・一日葬をご希望の方に。川口市内の寺院会館・民営式場でも、川口典礼で葬儀のご相談・手配に対応しています。
            </p>
          </div>

          <p className="mt-6 rounded-lg border border-line-soft bg-paper px-5 py-4 text-sm leading-7 text-ink-mid">
            ※ 掲載している寺院会館・民営式場は、川口典礼が運営する施設ではありません。川口典礼で葬儀のご相談・手配に対応している式場としてご案内しています。式場使用料・空き状況・利用条件は変更となる場合があるため、正式なお見積り時に確認いたします。
          </p>

          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {templeHalls.map((h) => (
              <li key={h.name}>
                <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
                  <h3 className="font-serif-jp text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl">
                    {h.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink-mid">
                    {h.address}
                  </p>

                  <dl className="mt-5 space-y-4 text-sm leading-7">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        式場使用料の目安
                      </dt>
                      <dd className="mt-1 font-bold text-ink-deep">
                        {h.feeNote}
                      </dd>
                    </div>
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

                  <div className="mt-auto pt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a
                      href={mapSearchUrl(`${h.name} ${h.address}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-4 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool"
                    >
                      Googleマップで見る
                      <span aria-hidden>↗</span>
                    </a>
                    <a
                      href="/contact/"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep"
                    >
                      この式場について相談する
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm leading-7 text-ink-soft">
            ※ 式場使用料の表記は、確認時点での目安です。税込・税別の区分や、控室・通夜振舞いなど付帯条件により変動する場合があります。最新の金額は正式なお見積り時にご案内します。
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
              川口市の葬儀場・斎場を選ぶときに、
              <br className="md:hidden" />
              確認しておきたいこと。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              「どの葬儀場が向いているか」は、ご家族の人数や菩提寺との関係、ご自宅からの距離など、いくつかの観点で見えてきます。
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

          <div className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              どの式場がよいか分からない場合は、川口典礼へご相談ください。ご希望の地域・人数・ご予算に合わせて、利用しやすい葬儀場をご案内します。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            川口市の葬儀場のご相談・お手配は、
            <br className="md:hidden" />
            川口典礼へ。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            ご希望の式場・地域・規模をお伺いし、空き状況の確認から正式なお見積りまで、川口典礼が承ります。事前のご相談は無料です。
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
