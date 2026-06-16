import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ArrowRightIcon, PhoneIcon } from "@/components/common/icons";
import { company, getLocalBusinessJsonLd } from "@/lib/company";

export const metadata: Metadata = {
  title: "アクセス | 川口典礼",
  description:
    "川口典礼・川口メモリアルホール(埼玉県川口市西新井宿440-1)へのアクセスをご案内します。お車・電車・タクシーでのアクセス、駐車場、川口市めぐりの森との位置関係も。事前相談・ホール見学は24時間365日受付。",
  alternates: { canonical: "/access/" },
};

const transportModes = [
  {
    icon: "🚗",
    label: "お車で",
    description:
      "首都高速川口線「新井宿出入口」より約5分。敷地内に駐車場70台ございますので、参列の方もお車でお越しいただけます。",
  },
  {
    icon: "🚆",
    label: "電車で",
    description:
      "埼玉高速鉄道「新井宿」駅より徒歩約10分。",
  },
  {
    icon: "🚕",
    label: "タクシー",
    description:
      "「川口典礼」または「川口市西新井宿440-1」とお伝えください。最寄駅からのご利用も可能です。",
  },
];

type Nearby = {
  label: string;
  description: string;
  href?: string;
};

const nearby: Nearby[] = [
  {
    label: "川口市めぐりの森",
    description:
      "車で約5分。火葬場としてご利用いただけます（式場は併設されていません）。",
    href: "/saijo/megurinomori/",
  },
  {
    label: "戸田葬祭場",
    description:
      "火葬・式場をご利用いただけます。詳細は事前相談時にご案内します。",
  },
  {
    label: "谷塚斎場",
    description:
      "火葬・式場をご利用いただけます。詳細は事前相談時にご案内します。",
  },
];

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.mapEmbedQuery
)}`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: "https://kawaguchitenrei.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "アクセス",
      item: "https://kawaguchitenrei.com/access/",
    },
  ],
};

export default function AccessPage() {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // LocalBusiness 構造化データ
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Access"
        subLabel="アクセス"
        title={
          <>
            川口典礼・
            <br className="md:hidden" />
            川口メモリアルホール。
          </>
        }
        description={
          <p>
            埼玉県川口市西新井宿の自社ホールへのアクセスをご案内します。事前のホール見学、ご相談など、お気軽にお越しください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "アクセス" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-stretch">
            <div className="rounded-lg border border-line bg-paper p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                所在地
              </p>
              <p className="font-serif-jp mt-3 text-xl font-medium leading-relaxed text-ink-deep md:text-2xl">
                〒{company.postal}
                <br />
                {company.address}
              </p>

              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-base">
                <dt className="font-semibold text-ink-soft">会社名</dt>
                <dd className="text-ink-deep">{company.name}</dd>
                <dt className="font-semibold text-ink-soft">ホール</dt>
                <dd className="text-ink-deep">{company.hallName}</dd>
                <dt className="font-semibold text-ink-soft">受付</dt>
                <dd className="text-ink-deep">{company.hours}</dd>
                <dt className="font-semibold text-ink-soft">電話</dt>
                <dd>
                  <a
                    href={company.phoneTelLink}
                    className="font-serif-jp text-xl font-medium text-emergency hover:underline"
                  >
                    {company.phone}
                  </a>
                </dd>
              </dl>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  Googleマップで見る
                </a>
                <a
                  href={company.phoneTelLink}
                  className="rounded-lg bg-emergency px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
                >
                  電話で確認する
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-warm shadow-sm md:aspect-auto md:min-h-[420px]">
              <iframe
                title="川口メモリアルホールの地図"
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapEmbedQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Transport
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              交通アクセス
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              お越しいただく方法。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              お車・電車・タクシーいずれの方法でもお越しいただけます。具体的な所要時間は事前のご相談時にもご案内します。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {transportModes.map((mode) => (
              <li
                key={mode.label}
                className="rounded-lg border border-line bg-white p-6 shadow-sm"
              >
                <p aria-hidden className="text-3xl">
                  {mode.icon}
                </p>
                <p className="font-serif-jp mt-3 text-lg font-medium text-ink-deep md:text-xl">
                  {mode.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {mode.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Parking
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-mid">
                駐車場のご案内
              </p>
              <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
                駐車場のご案内。
              </h2>
              <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
                敷地内に70台の駐車スペースをご用意しています。参列人数が多い場合は、近隣駐車場へのご案内も可能です。事前のご相談時にお伝えください。
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                駐車場の概要
              </p>
              <dl className="mt-4 space-y-3 text-base">
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3">
                  <dt className="font-semibold text-ink-soft">駐車台数</dt>
                  <dd className="font-bold text-ink-deep">70台</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3">
                  <dt className="font-semibold text-ink-soft">場所</dt>
                  <dd className="font-bold text-ink-deep">敷地内</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-3">
                  <dt className="font-semibold text-ink-soft">利用料</dt>
                  <dd className="font-bold text-ink-deep">無料</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-soft">混雑時</dt>
                  <dd className="mt-2 text-sm leading-7 text-ink-mid">
                    近隣の駐車場をご案内します。事前にご相談ください。
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Nearby
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              近隣の斎場・火葬場
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              周辺施設との位置関係。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              当社ホールから、川口市めぐりの森ほか近隣の斎場・火葬場へのアクセスもご案内します。式場と火葬場を組み合わせたご葬儀にも対応可能です。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {nearby.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-paper p-6 shadow-sm transition hover:border-brand"
                  >
                    <p className="font-serif-jp text-lg font-medium text-ink-deep group-hover:text-brand md:text-xl">
                      {item.label}
                    </p>
                    <p className="text-sm leading-7 text-ink-mid">
                      {item.description}
                    </p>
                    <p className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand">
                      詳しく見る
                      <ArrowRightIcon className="h-4 w-4" />
                    </p>
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <div className="flex h-full flex-col gap-3 rounded-lg border border-line bg-paper p-6 shadow-sm">
                    <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                      {item.label}
                    </p>
                    <p className="text-sm leading-7 text-ink-mid">
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
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
            見学・ご相談
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            ホール見学・事前相談を
            <br className="md:hidden" />
            承ります。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            実際にホールにお越しいただいて、雰囲気や設備をご確認いただけます。事前相談・お見積りは無料です。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href={company.phoneTelLink}
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
              見学予約フォーム
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
