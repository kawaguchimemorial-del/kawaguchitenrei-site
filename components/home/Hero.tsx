import Image from "next/image";

const trustPoints = [
  "めぐりの森から車で約5分",
  "駐車場70台",
  "直葬〜一般葬まで対応",
];

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-12 md:grid md:grid-cols-[1.08fr_0.92fr] md:items-start md:gap-x-14 md:px-8 md:pt-20 md:pb-24">
        <p className="text-sm font-bold tracking-[0.02em] text-brand md:col-start-1 md:row-start-1">
          川口市・新井宿の皆様へ
        </p>

        <h1 className="font-serif-jp mt-5 text-[1.75rem] font-medium leading-[1.4] tracking-normal text-ink-deep md:col-start-1 md:row-start-2 md:mt-5 md:text-[2.2rem] md:leading-[1.32]">
          大切なご家族のお葬式は、
          <br />
          めぐりの森近くの
          <br className="md:hidden" />
          自社式場で。
        </h1>

        <p className="mt-5 text-sm leading-7 text-ink-mid md:col-start-1 md:row-start-3 md:mt-5 md:text-base md:leading-8">
          川口市西新井宿の自社式場 / 創業20年・年間約260件の施行実績
        </p>

        <figure className="-mx-5 mt-7 md:col-start-2 md:row-start-1 md:row-span-5 md:mx-0 md:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden border-line bg-warm md:aspect-[5/6] md:rounded-lg md:border md:shadow-[0_24px_70px_rgba(26,42,35,0.12)]">
            <Image
              src="/images/home/hero/kawaguchi-memorial-hall-hero.png"
              alt="川口メモリアルホール 外観と祭壇イメージ"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              preload
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-deep/55 via-ink-deep/0 p-5 text-white md:p-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                  Memorial Hall
                </p>
                <p className="mt-1 text-base font-bold leading-tight md:text-lg">
                  川口メモリアルホール
                </p>
              </div>
              <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink-deep">
                西新井宿
              </span>
            </div>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 px-5 text-sm text-ink-mid md:px-0">
            <span>埼玉県川口市西新井宿440-1</span>
            <a href="#access" className="font-bold text-brand hover:underline">
              アクセスを見る →
            </a>
          </figcaption>
        </figure>

        <ul className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-ink md:col-start-1 md:row-start-4 md:mt-7 md:text-[0.95rem]">
          {trustPoints.map((point, i) => (
            <li key={point} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                />
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 md:col-start-1 md:row-start-5 md:mt-7">
          <a
            href="tel:0120-963-765"
            className="group flex w-full items-center justify-between gap-4 rounded-lg bg-emergency px-5 py-3.5 text-white transition hover:bg-emergency-deep md:max-w-md md:px-6 md:py-4"
          >
            <span className="flex items-center gap-3 md:gap-4">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg md:h-11 md:w-11 md:text-xl"
              >
                ☎
              </span>
              <span className="text-left">
                <span className="block text-base font-bold leading-tight md:text-lg">
                  電話で相談する
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold tracking-wider text-white/85 md:mt-1 md:text-xs">
                  24時間365日 受付
                </span>
              </span>
            </span>
            <span
              aria-hidden
              className="text-lg text-white/80 transition group-hover:translate-x-0.5 md:text-xl"
            >
              →
            </span>
          </a>

          <div className="mt-3 md:max-w-md">
            <a
              href="/contact/"
              className="block rounded-lg border border-line bg-white px-5 py-3.5 text-center text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
            >
              事前相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
