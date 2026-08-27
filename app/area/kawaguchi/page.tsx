import type { Metadata } from "next";
import Link from "next/link";
import { AreaDetailIntro } from "@/components/area/AreaDetailIntro";
import {
  AreaFeatures,
  AreaPlans,
  AreaSaijo,
} from "@/components/area/AreaDetailMain";
import {
  AreaFaq,
  AreaFlow,
  AreaReasons,
} from "@/components/area/AreaDetailExtras";
import { AreaDetailCta } from "@/components/area/AreaDetailCta";
import { AreaLocalGuide } from "@/components/area/AreaLocalGuide";
import { buildLocalGuide } from "@/lib/area-local-guide";
import { ArrowRightIcon } from "@/components/common/icons";
import { areaKawaguchi } from "@/lib/areas";

const SITE_URL = "https://kawaguchitenrei.com";
const pageUrl = `${SITE_URL}/area/${areaKawaguchi.slug}/`;
const imageUrl = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;

export const metadata: Metadata = {
  title: areaKawaguchi.metaTitle,
  description: areaKawaguchi.metaDescription,
  alternates: { canonical: `/area/${areaKawaguchi.slug}/` },
  openGraph: {
    title: areaKawaguchi.metaTitle,
    description: areaKawaguchi.metaDescription,
    url: `/area/${areaKawaguchi.slug}/`,
    type: "article",
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
      name: "対応エリア",
      item: `${SITE_URL}/area/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: areaKawaguchi.name,
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: areaKawaguchi.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const funeralHomeJsonLd = {
  "@context": "https://schema.org",
  "@type": "FuneralHome",
  name: "川口典礼(川口メモリアルホール)",
  url: pageUrl,
  image: imageUrl,
  telephone: "0120-963-765",
  address: {
    "@type": "PostalAddress",
    postalCode: "333-0833",
    addressCountry: "JP",
    addressRegion: "埼玉県",
    addressLocality: "川口市",
    streetAddress: "西新井宿440-1",
  },
  areaServed: {
    "@type": "City",
    name: "埼玉県川口市",
  },
  description:
    "川口市全域で葬儀・家族葬・直葬・一日葬・市民葬を承る葬儀社。自社式場「川口メモリアルホール」(川口市西新井宿)から川口市めぐりの森まで車で約5分の好立地で、駐車場70台を備え、家族葬から最大200名規模の一般葬まで対応します。24時間365日のお電話受付。",
};

const relatedLinks = [
  {
    label: "新井宿の葬儀・家族葬",
    description: "新井宿エリアの葬儀・家族葬のご案内",
    href: "/area/araijuku/",
  },
  {
    label: "鳩ヶ谷の葬儀・家族葬",
    description: "鳩ヶ谷エリアの葬儀・家族葬のご案内",
    href: "/area/hatogaya/",
  },
  {
    label: "西川口の葬儀・家族葬",
    description: "西川口エリアの葬儀・家族葬のご案内",
    href: "/area/nishikawaguchi/",
  },
  {
    label: "東川口の葬儀・家族葬",
    description: "東川口エリアの葬儀・家族葬のご案内",
    href: "/area/higashikawaguchi/",
  },
  {
    label: "川口元郷の葬儀・家族葬",
    description: "川口元郷エリアの葬儀・家族葬のご案内",
    href: "/area/kawaguchi-motogo/",
  },
  {
    label: "南鳩ヶ谷の葬儀・家族葬",
    description: "南鳩ヶ谷エリアの葬儀・家族葬のご案内",
    href: "/area/minami-hatogaya/",
  },
  {
    label: "戸塚安行の葬儀・家族葬",
    description: "戸塚安行エリアの葬儀・家族葬のご案内",
    href: "/area/tozuka-angyo/",
  },
  {
    label: "神根の葬儀・家族葬",
    description: "神根エリアの葬儀・家族葬のご案内",
    href: "/area/kamine/",
  },
  {
    label: "新郷の葬儀・家族葬",
    description: "新郷エリアの葬儀・家族葬のご案内",
    href: "/area/shingo/",
  },
  {
    label: "芝の葬儀・家族葬",
    description: "芝地区の葬儀・家族葬のご案内",
    href: "/area/shiba/",
  },
  {
    label: "安行の葬儀・家族葬",
    description: "安行地区の葬儀・家族葬のご案内",
    href: "/area/angyo/",
  },
  {
    label: "上青木の葬儀・家族葬",
    description: "上青木地区の葬儀・家族葬のご案内",
    href: "/area/kamiaoki/",
  },
  {
    label: "青木の葬儀・家族葬",
    description: "青木地区の葬儀・家族葬のご案内",
    href: "/area/aoki/",
  },
  {
    label: "川口メモリアルホール",
    description: "自社式場(川口市西新井宿)のご紹介",
    href: "/hall/kawaguchi-memorial-hall/",
  },
  {
    label: "川口市めぐりの森",
    description: "車約5分の公営火葬場のご案内",
    href: "/saijo/megurinomori/",
  },
  {
    label: "川口市・近隣の葬儀場一覧",
    description: "寺院会館・民営式場を含む川口市内の葬儀場候補をエリア別にご紹介しています。",
    href: "/saijo/",
  },
  {
    label: "川口市の家族葬",
    description: "ご家族中心のお別れ。事前相談会員価格 528,000円(税込)〜",
    href: "/plan/family-funeral/",
  },
  {
    label: "川口の一日葬",
    description: "通夜を行わない1日完結のお別れ。396,000円(税込)〜",
    href: "/plan/oneday-funeral/",
  },
  {
    label: "川口の直葬",
    description: "火葬を中心としたシンプルなお別れ。139,000円(税込)〜",
    href: "/plan/direct-funeral/",
  },
  {
    label: "川口の火葬式",
    description: "通夜・告別式を行わないお別れのご相談",
    href: "/plan/cremation/",
  },
  {
    label: "川口市民葬",
    description: "川口市民の方の市民葬制度。231,000円(税込)",
    href: "/plan/kawaguchi-shimin/",
  },
  {
    label: "施行事例",
    description: "川口典礼でお手伝いした葬儀の施行事例を確認できます。",
    href: "/case/",
  },
];


export default function KawaguchiAreaPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(funeralHomeJsonLd) }}
      />

      <AreaDetailIntro area={areaKawaguchi} />

      {/* 結論先出し：川口・川口市の葬儀・葬儀社の基本情報（AIO向け） */}
      <section className="bg-cool py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-9">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Conclusion
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-[2rem]">
              川口・川口市で葬儀をお探しの方へ。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              川口典礼は、川口市西新井宿に自社式場「川口メモリアルホール」を構える地域密着の葬儀社です。川口で葬儀を検討しているご家族へ、川口市めぐりの森まで車で約5分・駐車場70台のホールから、家族葬・一日葬・直葬・火葬式から最大200名規模の一般葬・川口市民葬まで24時間365日対応します。創業20年・年間約260件の施行実績で、急なご逝去にも迅速にお迎えに伺います。事前相談・お見積りは無料です。
            </p>

            <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-line-soft pt-7 sm:grid-cols-2">
              <div className="border-b border-line-soft pb-4 sm:border-b-0 sm:pb-0">
                <dt className="text-sm font-semibold text-ink-soft">対応エリア</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  川口市全域・近隣地域
                </dd>
              </div>
              <div className="border-b border-line-soft pb-4 sm:border-b-0 sm:pb-0">
                <dt className="text-sm font-semibold text-ink-soft">自社式場</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  川口メモリアルホール（川口市西新井宿・駐車場70台）
                </dd>
              </div>
              <div className="border-b border-line-soft pb-4 sm:border-b-0 sm:pb-0">
                <dt className="text-sm font-semibold text-ink-soft">火葬場</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  川口市めぐりの森まで車で約5分
                </dd>
              </div>
              <div className="border-b border-line-soft pb-4 sm:border-b-0 sm:pb-0">
                <dt className="text-sm font-semibold text-ink-soft">対応形式</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  家族葬・一日葬・直葬・火葬式・一般葬・市民葬
                </dd>
              </div>
              <div className="border-b border-line-soft pb-4 sm:border-b-0 sm:pb-0">
                <dt className="text-sm font-semibold text-ink-soft">費用目安</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  直葬139,000円〜／家族葬528,000円〜（事前相談会員価格・税込）
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-ink-soft">受付</dt>
                <dd className="mt-1 text-sm leading-7 text-ink-deep md:text-base">
                  24時間365日（0120-963-765）
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <AreaFeatures area={areaKawaguchi} />
      <AreaPlans area={areaKawaguchi} />

      {/* 川口市の葬儀費用の目安（費用相場の考え方） */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Cost
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口市の葬儀費用の目安
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              川口市の葬儀費用の目安と、
              <br className="md:hidden" />
              総額が変わる要素。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              川口典礼の主なプランは、直葬139,000円〜・一日葬396,000円〜・家族葬528,000円〜（いずれも事前相談会員価格・税込）です。実際の総額は、参列人数・式場・火葬場・お料理や返礼品・宗教者へのお礼などにより変わります。正式なお見積りで総額の目安をご案内します。
            </p>
          </div>

          <ul className="mt-8 divide-y divide-line-soft overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            {[
              { name: "直葬プラン", price: "139,000円〜", note: "火葬を中心としたシンプルなお別れ", href: "/plan/direct-funeral/" },
              { name: "花入れお別れプラン", price: "229,000円〜", note: "火葬前にお花を手向けるお別れ", href: "/plan/hanaire-owakare/" },
              { name: "一日葬プラン", price: "396,000円〜", note: "通夜を行わず1日で執り行う形式", href: "/plan/oneday-funeral/" },
              { name: "川口市の家族葬プラン", price: "528,000円〜", note: "ご家族や親しい方を中心としたお別れ", href: "/plan/family-funeral/" },
              { name: "川口市民葬プラン", price: "231,000円", note: "川口市民の方の市民葬制度に対応", href: "/plan/kawaguchi-shimin/" },
            ].map((row) => (
              <li
                key={row.name}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 md:px-6"
              >
                <div>
                  <a
                    href={row.href}
                    className="font-serif-jp text-base font-medium text-ink-deep transition hover:text-brand md:text-lg"
                  >
                    {row.name}
                  </a>
                  <p className="mt-0.5 text-sm text-ink-mid">{row.note}</p>
                </div>
                <p className="text-base font-bold text-brand md:text-lg">
                  {row.price}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-lg border border-line-soft bg-paper p-5 md:p-6">
            <p className="text-sm font-bold text-ink-deep">
              総額が変わる主な要素
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-7 text-ink-mid sm:grid-cols-2">
              <li>・参列人数（お料理・返礼品の数）</li>
              <li>・式場使用料（川口メモリアルホール以外を利用する場合）</li>
              <li>・火葬料（川口市めぐりの森は川口市民30,000円〜が目安）</li>
              <li>・宗教者へのお礼（お勤めをご希望の場合）</li>
              <li>・ご安置日数（友引・火葬場の予約状況による）</li>
              <li>・お花・祭壇のグレード</li>
            </ul>
          </div>

          <p className="mt-4 text-xs leading-6 text-ink-soft">
            ※ 上記は事前相談会員価格・税込の目安です。内容・人数・式場・火葬場などにより総額は変わります。正式なお見積りで総額の目安をご案内します。
          </p>
          <div className="mt-5">
            <Link
              href="/plan/"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline md:text-base"
            >
              プラン・費用の詳細を見る
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 川口市の葬儀で使える公的制度（市民葬・葬祭費） */}
      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Public support
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              川口市の公的制度
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              川口市の葬儀で使える公的制度
              <br className="md:hidden" />
              （市民葬・葬祭費）。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              川口市にお住まいの方には、費用の負担を抑えられる公的な制度があります。
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
              <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                川口市民葬（市民葬制度）
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                川口市民の方を対象とした葬祭事業（市民葬）の制度に対応したプランをご用意しています（市民葬プラン 231,000円・税込ほか）。対象や含まれる内容は条件により異なるため、事前のご相談で確認のうえご案内します。
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href="/plan/kawaguchi-shimin/"
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
                >
                  川口市民葬プランを見る
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
              <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                国民健康保険・後期高齢者医療の葬祭費
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                国民健康保険・後期高齢者医療制度の被保険者が亡くなった場合、葬儀を行った喪主の方の申請により、葬祭費として5万円が支給されます（川口市の場合）。申請が必要で、支給額・要件は変わる場合があるため、最新の情報は川口市の窓口・公式情報でご確認ください。
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-6 text-ink-soft">
            ※ 公的制度の支給額・対象・申請方法は変更される場合があります。詳細は川口市にご確認ください。川口典礼では、制度の活用も含めて事前のご相談でご案内します。
          </p>
        </div>
      </section>

      <AreaSaijo area={areaKawaguchi} />
      <AreaReasons area={areaKawaguchi} />
      <AreaFlow area={areaKawaguchi} />
      <AreaFaq area={areaKawaguchi} />

      <AreaLocalGuide {...buildLocalGuide(areaKawaguchi)} />

      {/* 関連ページ導線：川口市内の対応エリア・主要施設・プラン */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Related
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              関連するページ
            </p>
            <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              川口市内の対応エリアと
              <br className="md:hidden" />
              主要なご案内ページ
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              同じ川口市内の各エリアページ、自社式場・火葬場のご案内、主なプランをまとめています。
              ご家族のお住まいや状況に合わせて、あわせてご覧ください。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-paper p-5 shadow-sm transition hover:border-brand hover:shadow-md md:p-6"
                >
                  <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand md:text-lg">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-mid">
                    {link.description}
                  </p>
                  <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    詳しく見る
                    <ArrowRightIcon className="h-4 w-4" />
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AreaDetailCta area={areaKawaguchi} />
    </>
  );
}
