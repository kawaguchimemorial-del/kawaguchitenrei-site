import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { CostBreakdownTable } from "@/components/common/CostBreakdownTable";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  PhoneIcon,
} from "@/components/common/icons";

const SITE_URL = "https://kawaguchitenrei.com";

type PlanPricing =
  | { type: "member-regular"; member: number; regular: number }
  | { type: "citizen"; citizen: number };

type PlanListItem = {
  slug: string;
  detailHref: string;
  ctaLabel: string;
  name: string;
  subtitle?: string;
  description: string;
  image: { src: string; alt: string };
  pricing: PlanPricing;
  people: string;
  days: string;
  forWhom: string;
};

const planList: PlanListItem[] = [
  {
    slug: "direct-funeral",
    detailHref: "/plan/direct-funeral/",
    ctaLabel: "詳しく見る",
    name: "直葬プラン",
    description: "ご火葬を中心に、シンプルにお見送り。",
    image: {
      src: "/images/home/plans/plan-chokuso.png",
      alt: "直葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 139000, regular: 189000 },
    people: "～5名",
    days: "1日",
    forWhom: "費用を抑え、簡素にお見送りしたい方",
  },
  {
    slug: "hanaire-owakare",
    detailHref: "/plan/hanaire-owakare/",
    ctaLabel: "詳しく見る",
    name: "花入れお別れプラン",
    subtitle: "お別れ会",
    description: "火葬前に、花入れのお別れ時間を。",
    image: {
      src: "/images/home/plans/plan-hanairere-owakare.png",
      alt: "花入れお別れプランのイメージ",
    },
    pricing: { type: "member-regular", member: 229000, regular: 279000 },
    people: "～10名",
    days: "1日",
    forWhom: "火葬前に、花入れのお別れ時間を設けたい方",
  },
  {
    slug: "oneday-funeral",
    detailHref: "/plan/oneday-funeral/",
    ctaLabel: "詳しく見る",
    name: "一日葬プラン",
    description: "お通夜を行わず、一日でお見送り。",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "一日葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 396000, regular: 496000 },
    people: "5〜30名",
    days: "1日",
    forWhom: "負担を抑えつつ、きちんと式を行いたい方",
  },
  {
    slug: "yugure-kazokuso",
    detailHref: "/plan/yugure-kazokuso/",
    ctaLabel: "詳しく見る",
    name: "夕暮れ家族葬",
    subtitle: "夕方から行う一日葬",
    description: "夕方から夜にお別れし、火葬は翌日。日中は難しい方にも。",
    image: {
      src: "/images/home/plans/plan-yugure-kazokuso.png",
      alt: "川口メモリアルホールの式場に設えた夕暮れ家族葬の生花祭壇",
    },
    pricing: { type: "member-regular", member: 451000, regular: 551000 },
    people: "ご家族・ご親族・ごく親しいご友人",
    days: "式は1日（火葬は翌日）",
    forWhom: "日中はお仕事やご都合で集まりにくいご家族・ご親族と、ゆっくりお別れしたい方",
  },
  {
    slug: "family-funeral",
    detailHref: "/plan/family-funeral/",
    ctaLabel: "プランを見る",
    name: "家族葬プラン",
    subtitle: "家族葬プラン",
    description: "川口メモリアルホールで、ご家族中心にゆっくりお見送り。",
    image: {
      src: "/images/home/plans/plan-ichinichiso-kazokuso.png",
      alt: "家族葬プランのイメージ",
    },
    pricing: { type: "member-regular", member: 528000, regular: 628000 },
    people: "10〜30名",
    days: "2日",
    forWhom: "ご家族や親しい方を中心に、落ち着いてお見送りしたい方",
  },
  {
    slug: "kawaguchi-shimin",
    detailHref: "/plan/kawaguchi-shimin/",
    ctaLabel: "詳しく見る",
    name: "市民葬プラン",
    subtitle: "川口市民の方向け",
    description: "川口市民の方のための安心プラン。",
    image: {
      src: "/images/home/plans/plan-shiminso.png",
      alt: "市民葬プランのイメージ",
    },
    pricing: { type: "citizen", citizen: 231000 },
    people: "要相談",
    days: "要相談",
    forWhom: "川口市の制度を活用したい方",
  },
];

const guideItems = [
  {
    title: "ご家族で静かに見送りたい",
    description:
      "家族葬プラン・一日葬プランがおすすめです。落ち着いた式の時間を確保できます。",
    plans: ["家族葬プラン", "一日葬プラン"],
  },
  {
    title: "費用を抑えたい",
    description:
      "直葬プランを中心にご案内します。必要な手配のみで完結します。",
    plans: ["直葬プラン"],
  },
  {
    title: "火葬前にお別れの時間を設けたい",
    description:
      "花入れお別れプランでは、火葬前に花入れのお別れ時間を設けられます。",
    plans: ["花入れお別れプラン"],
  },
  {
    title: "通夜の負担を減らしたい",
    description:
      "一日葬プランがおすすめです。告別式と火葬を1日で行います。",
    plans: ["一日葬プラン"],
  },
  {
    title: "川口市の制度を活用したい",
    description: "市民葬プランの利用条件を確認のうえご案内します。",
    plans: ["市民葬プラン"],
  },
];

// 依頼前の確認事項。事例は社名を出さず、リンクも付けない（消費者庁の公表資料より、とだけ記す）。
const checkQuestions = [
  {
    q: "その価格で、通夜・告別式は行えますか？",
    a: "広告で大きく示された価格が、式場を使わない直葬（火葬式）の料金であることがあります。家族葬・一日葬の価格かどうかを確かめてください。",
  },
  {
    q: "火葬料金は含まれていますか？",
    a: "火葬料金は火葬場や住所地によって変わるため、プラン料金に含まれないことが多い項目です。川口典礼のプランも火葬料金は別途で、上の表に火葬場ごとの目安を載せています。",
  },
  {
    q: "安置が1日延びたら、いくら増えますか？",
    a: "火葬場の予約状況や友引によって、ご安置の日数が延びることがあります。ドライアイスや安置の費用が1日ごとにいくらかを、先に聞いておくと安心です。",
  },
  {
    q: "当日、実際に担当するのはどこの会社ですか？",
    a: "比較・紹介サイトから申し込んだ場合、実際に葬儀を行うのは提携先の別の会社ということがあります。",
  },
  {
    q: "含まれるもの・含まれないものを、書面でもらえますか？",
    a: "口頭の説明だけでは、あとで食い違いが起きやすくなります。見積書で項目ごとに確かめてください。",
  },
];

const adCheckPoints = [
  "大きく書かれた価格の近くに「〜」や「※」があれば、その条件を探してください。",
  "「追加料金不要」「すべて込み」の条件が、別のページや小さな文字で書かれていることがあります。",
  "ドライアイス・安置日数・火葬料金・搬送距離は、ご家族が選べない事情で費用が増えやすい項目です。",
];

const enforcementCases = [
  {
    date: "2017年12月",
    ad: "新聞広告で「追加料金不要」と表示",
    fact: "条件によっては、表示価格のほかに追加料金が発生していた（措置命令）",
  },
  {
    date: "2019年6月",
    ad: "「全てセットの定額」「必要なものが全てコミコミ」と表示",
    fact: "安置日数によるドライアイスや火葬場の使用料などで追加料金が発生していた（措置命令）",
  },
  {
    date: "2021年7月",
    ad: "追加料金などが発生しない旨を表示",
    fact: "一定の条件で追加料金が設定されていた（課徴金納付命令・約1億円）",
  },
  {
    date: "2026年9月",
    ad: "テレビCMで「1日1組 貸切ホール」に続けて「家族葬 10.45万円〜」と表示",
    fact: "ホールを使う葬儀の最低価格は308,000円で、約10万円のプランは通夜・告別式を行わない直葬だった（措置命令）",
  },
];

export const metadata: Metadata = {
  title: "葬儀プラン一覧 | 川口典礼",
  description:
    "川口典礼の直葬・花入れお別れ・一日葬・家族葬・市民葬の各プランをご紹介します。費用や対応形式の比較、向いている方の目安もあわせてご確認いただけます。",
  alternates: { canonical: "/plan/" },
  openGraph: {
    title: "葬儀プラン一覧 | 川口典礼",
    description:
      "川口典礼の直葬・花入れお別れ・一日葬・家族葬・市民葬の各プランをご紹介します。費用や対応形式の比較、向いている方の目安もあわせてご確認いただけます。",
    url: "/plan/",
    type: "website",
    siteName: "川口典礼",
    locale: "ja_JP",
    images: [
      {
        url: "/images/home/hall/hall-exterior.jpg",
        width: 1200,
        height: 800,
        alt: "川口メモリアルホールの外観",
      },
    ],
  },
};

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
      name: "葬儀プラン",
      item: `${SITE_URL}/plan/`,
    },
  ],
};

function pricingToOffer(pricing: PlanPricing) {
  if (pricing.type === "member-regular") {
    return {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: pricing.member,
      description: `事前相談会員価格 ${pricing.member.toLocaleString("ja-JP")}円(税込)から。通常価格 ${pricing.regular.toLocaleString("ja-JP")}円(税込)。`,
      availability: "https://schema.org/InStock",
    } as const;
  }
  return {
    "@type": "Offer",
    priceCurrency: "JPY",
    price: pricing.citizen,
    description: `川口市民 葬祭事業価格 ${pricing.citizen.toLocaleString("ja-JP")}円(税込)。`,
    availability: "https://schema.org/InStock",
  } as const;
}

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "川口典礼の葬儀プラン一覧",
  numberOfItems: planList.length,
  itemListElement: planList.map((plan, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${plan.detailHref}`,
    name: plan.name,
    item: {
      "@type": "Service",
      name: plan.name,
      description: plan.description,
      url: `${SITE_URL}${plan.detailHref}`,
      serviceType: plan.name,
      provider: {
        "@type": "FuneralHome",
        name: "川口典礼",
        url: `${SITE_URL}/`,
        telephone: "0120-963-765",
      },
      areaServed: {
        "@type": "City",
        name: "埼玉県川口市",
      },
      offers: pricingToOffer(plan.pricing),
    },
  })),
};

function formatPrice(value: number): string {
  return `${value.toLocaleString("ja-JP")}円（税込）`;
}

function TablePriceCell({ pricing }: { pricing: PlanPricing }) {
  if (pricing.type === "citizen") {
    return (
      <div>
        <p className="text-[11px] font-semibold text-ink-soft">
          川口市民 葬祭事業価格
        </p>
        <p className="font-serif-jp mt-0.5 text-base font-bold text-ink-deep md:text-lg">
          {formatPrice(pricing.citizen)}
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-[11px] font-semibold text-brand">事前相談会員価格</p>
      <p className="font-serif-jp mt-0.5 text-base font-bold text-ink-deep md:text-lg">
        {formatPrice(pricing.member)}〜
      </p>
      <p className="mt-1 text-[11px] leading-4 text-ink-mid">
        通常 {formatPrice(pricing.regular)}
      </p>
    </div>
  );
}

function CardPriceBlock({ pricing }: { pricing: PlanPricing }) {
  if (pricing.type === "citizen") {
    return (
      <div>
        <p className="text-xs font-bold tracking-[0.04em] text-ink-mid md:text-sm">
          川口市民 葬祭事業価格
        </p>
        <p className="font-serif-jp mt-1 text-[1.65rem] font-bold leading-none text-ink-deep md:text-[1.85rem]">
          {formatPrice(pricing.citizen)}
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.04em] text-brand md:text-sm">
        事前相談会員価格
      </p>
      <p className="font-serif-jp mt-1 text-[1.65rem] font-bold leading-none text-ink-deep md:text-[1.85rem]">
        {formatPrice(pricing.member)}
      </p>
      <p className="mt-1.5 text-[11px] leading-5 text-ink-mid md:text-xs">
        通常 {formatPrice(pricing.regular)}
      </p>
    </div>
  );
}

export default function PlanIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHero
        eyebrow="Plan"
        subLabel="葬儀プラン一覧"
        title={
          <>
            ご希望に合わせて選べる、
            <br className="md:hidden" />
            5つの葬儀形式。
          </>
        }
        description={
          <p>
            川口典礼では、直葬・花入れお別れ・一日葬・家族葬・市民葬の5つの葬儀プランをご用意しています。費用や日数、参列人数の目安からご家族に合うかたちをご検討いただけます。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "葬儀プラン" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Compare
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              プラン比較表。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              費用目安・日数・参列人数の比較からご確認いただけます。スマホでは横スクロールで全列をご覧いただけます。
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-cool text-ink-deep">
                <tr>
                  <th className="px-4 py-4 text-sm font-bold">プラン</th>
                  <th className="px-4 py-4 text-sm font-bold">費用目安</th>
                  <th className="px-4 py-4 text-sm font-bold">日数</th>
                  <th className="px-4 py-4 text-sm font-bold">参列</th>
                  <th className="px-4 py-4 text-sm font-bold">向いている方</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {planList.map((plan) => (
                  <tr key={plan.slug} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 font-serif-jp text-base font-medium text-ink-deep">
                      <a
                        href={plan.detailHref}
                        className="hover:text-brand hover:underline"
                      >
                        {plan.name}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <TablePriceCell pricing={plan.pricing} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-ink-deep">
                      {plan.days}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-ink-deep">
                      {plan.people}
                    </td>
                    <td className="px-4 py-4 text-sm leading-7 text-ink-mid">
                      {plan.forWhom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm">
            ※「事前相談会員価格」は、事前相談にお申込みいただいた方の会員価格です。
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Plans
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              各プランの詳細。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              各プランの内容・人数・費用をご確認いただけます。詳細ページではプランに含まれるもの・流れ・追加費用などもご案内します。
            </p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planList.map((plan) => (
              <li key={plan.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-warm md:aspect-[4/3]">
                    <Image
                      src={plan.image.src}
                      alt={plan.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    {plan.subtitle && (
                      <p className="text-xs font-semibold tracking-[0.18em] text-brand">
                        {plan.subtitle}
                      </p>
                    )}
                    <h3 className="font-serif-jp mt-1 text-2xl font-medium text-ink-deep md:text-[1.6rem]">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                      {plan.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line-soft pt-4 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-ink-soft">
                          日数
                        </dt>
                        <dd className="mt-1 font-bold text-ink-deep">
                          {plan.days}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-ink-soft">
                          参列
                        </dt>
                        <dd className="mt-1 font-bold text-ink-deep">
                          {plan.people}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-ink-soft">
                          向いている方
                        </dt>
                        <dd className="mt-1 text-xs leading-5 text-ink-mid">
                          {plan.forWhom}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 border-t border-line-soft pt-5">
                      <CardPriceBlock pricing={plan.pricing} />
                    </div>

                    <a
                      href={plan.detailHref}
                      className="mt-6 inline-flex items-center justify-center gap-1 rounded-lg border border-ink-deep bg-white px-5 py-3 text-base font-bold text-ink-deep transition hover:bg-cool"
                    >
                      {plan.ctaLabel}
                      <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Guide
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご家族のご希望から選ぶ。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              迷ったときは、ご家族で大切にしたいことから絞ってみてください。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {guideItems.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
              >
                <p className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.plans.map((planName) => {
                    const target = planList.find((p) => p.name === planName);
                    if (!target) return null;
                    return (
                      <li key={planName}>
                        <a
                          href={target.detailHref}
                          className="inline-flex items-center gap-1 rounded-full border border-brand bg-white px-4 py-2 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
                        >
                          {planName}
                          <ChevronRightIcon className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Saijo
            </p>
            <p className="font-serif-jp mt-2 text-xl font-medium text-ink-deep md:text-2xl">
              各プランで利用できる葬儀場を見る。
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              川口メモリアルホールをはじめ、川口市めぐりの森・戸田葬祭場・谷塚斎場、川口市内の寺院会館・民営式場まで、ご希望の式場をご案内します。
            </p>
            <div className="mt-5">
              <a
                href="/saijo/"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                川口市・近隣で利用できる葬儀場一覧
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Non-religious
            </p>
            <p className="font-serif-jp mt-2 text-xl font-medium text-ink-deep md:text-2xl">
              ご家族らしい形でお別れしたい方へ。
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              宗教者を呼ばない無宗教葬のご相談も承ります。献花・黙祷・思い出の紹介など、進行はご家族のご希望に合わせてご相談いただけます。費用は内容により異なります。
            </p>
            <div className="mt-5">
              <a
                href="/plan/non-religious-funeral/"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                無宗教葬の相談を見る
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 費用の内訳の目安（AIに引用されやすい表形式） */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Cost breakdown
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              葬儀費用の内訳の目安
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              葬儀費用は、何にいくらかかるのか。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              葬儀の総額は、プランの基本料金に加えて、式場・火葬場・お料理や返礼品・宗教者へのお礼などにより変わります。主な内訳の目安と、火葬場別の火葬料の目安をまとめました。総額の目安は正式なお見積りでご案内します。
            </p>
          </div>
          <div className="mt-8">
            <CostBreakdownTable />
          </div>
        </div>
      </section>

      <section
        id="before-request"
        className="scroll-mt-24 bg-paper py-16 md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Check
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            葬儀社に依頼する前に
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            依頼の前に、確認したい5つのこと。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            全国の消費生活センターなどに寄せられた葬儀サービスの相談は、2025年度に1,007件となり、記録が残る2016年度以降で最も多くなりました。そのうち費用に関する相談の割合は52.3%で、過去最高です（
            <a
              href="https://news.ntv.co.jp/category/society/a0b2f921734340f39586921d2b502b20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-4 hover:text-brand-deep"
            >
              日テレNEWS NNN・2026年7月24日
            </a>
            ）。国民生活センターは、事前に情報を集めること、打ち合わせは複数人で行うことを呼びかけています（
            <a
              href="https://www.fnn.jp/articles/-/1080242"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-4 hover:text-brand-deep"
            >
              FNNプライムオンライン・2026年7月23日
            </a>
            ）。
          </p>

          <ol className="mt-10 space-y-4">
            {checkQuestions.map((item, i) => (
              <li
                key={item.q}
                className="flex gap-4 rounded-lg border border-line bg-white p-5 shadow-sm md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-serif-jp flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-serif-jp text-lg font-medium leading-8 text-ink-deep md:text-xl">
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {item.a}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
              広告の価格を見るときは
            </h3>
            <ul className="mt-5 space-y-3">
              {adCheckPoints.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-sm leading-7 text-ink-mid before:absolute before:left-0 before:top-[0.8em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand md:text-base md:leading-8"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
              葬儀の広告表示をめぐる行政処分の例
            </h3>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              いずれも消費者庁による景品表示法に基づく処分です。事業者名は伏せて記載しています（消費者庁の公表資料より）。
            </p>
            <ul className="mt-6 divide-y divide-line-soft overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              {enforcementCases.map((item) => (
                <li key={item.date} className="p-5 md:p-6">
                  <p className="text-sm font-bold text-brand">{item.date}</p>
                  <p className="mt-1 text-base font-bold leading-7 text-ink-deep">
                    {item.ad}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {item.fact}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              困ったときは、消費者ホットライン「188」で最寄りの消費生活センターにつながります。
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-brand bg-white p-6 md:p-8">
            <p className="font-serif-jp text-xl font-medium leading-9 text-ink-deep md:text-2xl">
              この5つは、川口典礼にもそのままお尋ねください。
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              ご契約の前に、プランに含まれるもの・含まれないものをご説明します。事前相談・お見積りは無料です。
            </p>
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            プラン選びでお迷いの方は、
            <br className="md:hidden" />
            お気軽にご相談ください。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            ご家族のご希望や状況をお伺いし、最適なプランをご提案します。事前相談・お見積りは無料です。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <PhoneIcon className="h-7 w-7" />
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  電話で相談する
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/90">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              事前相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
