import Image from "next/image";
import { ArrowRightIcon } from "@/components/common/icons";
import type { Area } from "@/lib/areas";

// Hero 直下に配置する「○○周辺から利用しやすい自社式場」セクション
// Hero画像が地域固有(駅写真など)になる場合に、川口メモリアルホールの導線を上部に保つために使用
export function AreaPrimaryHall({
  area,
  description,
}: {
  area: Area;
  description?: string;
}) {
  if (!area.primaryHallSlug) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-6 overflow-hidden rounded-lg border border-line bg-paper shadow-sm md:grid-cols-[320px_1fr] md:gap-0">
          <div className="relative aspect-[4/3] bg-warm md:aspect-auto">
            <Image
              src="/images/home/hall/hall-exterior.jpg"
              alt="川口メモリアルホールの外観"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Primary Hall
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              {area.shortName}周辺から利用しやすい自社式場
            </p>
            <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
              川口メモリアルホール
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              {description ??
                `${area.name}エリアのご葬儀の主な拠点となる、川口典礼の自社ホール。家族葬・一日葬に適した1日1組貸切の式場で、川口市めぐりの森(火葬場)まで車で約5分、駐車場70台を完備しています。`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/hall/kawaguchi-memorial-hall/"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:bg-cool md:text-base"
              >
                川口メモリアルホールを詳しく見る
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep md:text-base"
              >
                事前相談する
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
