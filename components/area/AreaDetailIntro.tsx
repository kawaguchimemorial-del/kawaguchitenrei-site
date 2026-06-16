import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PhoneIcon } from "@/components/common/icons";
import type { Area } from "@/lib/areas";

export function AreaDetailIntro({ area }: { area: Area }) {
  // 改行を含むheroTitleを <br /> に変換
  const titleLines = area.heroTitle.split("\n");

  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "対応エリア", href: "/area/" },
              { label: area.name },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Area
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              {area.name}対応エリア
            </p>
            <h1 className="font-serif-jp mt-4 text-[2.2rem] font-medium leading-[1.35] text-ink-deep md:text-[3rem] md:leading-[1.3]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 text-base font-semibold text-brand md:text-lg">
              {area.heroLead}
            </p>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {area.heroDescription}
            </p>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:flex-wrap md:flex">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <PhoneIcon className="h-4 w-4" />
                電話で相談する
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                事前相談する
              </a>
            </div>
          </div>

          <aside
            aria-label={`${area.name}でのご対応`}
            className="overflow-hidden rounded-lg border border-line bg-white shadow-sm"
          >
            <div className="relative aspect-[16/9] w-full bg-warm">
              <Image
                src={area.heroImage?.src ?? "/images/home/hall/hall-exterior.jpg"}
                alt={area.heroImage?.alt ?? "拠点・川口メモリアルホールの外観"}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover object-center"
                priority
              />
            </div>

            {area.heroImage?.caption && (
              <p className="border-b border-line-soft px-6 py-3 text-xs leading-6 text-ink-soft md:px-8">
                {area.heroImage.caption}
              </p>
            )}

            <div className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                対応のご案内
              </p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">受付</dt>
                  <dd className="font-serif-jp text-xl font-medium text-emergency">
                    24時間365日
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">電話</dt>
                  <dd>
                    <a
                      href="tel:0120-963-765"
                      className="font-serif-jp text-xl font-medium text-emergency hover:underline"
                    >
                      0120-963-765
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">対応形式</dt>
                  <dd className="text-right text-sm font-bold text-ink-deep">
                    家族葬・一日葬
                    <br />
                    直葬・一般葬
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink-soft">
                    ホール拠点
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-ink-mid">
                    川口市西新井宿
                    <br />
                    川口メモリアルホール
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs leading-6 text-ink-soft">
                ※ お急ぎの方はフォームではなくお電話ください。深夜・早朝でも対応します。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
