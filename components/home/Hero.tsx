import Image from "next/image";

const trustPoints = [
  "川口市めぐりの森まで車で約5分",
  "駐車場70台の自社式場",
  "直葬〜一般葬まで対応",
  "創業20年・年間約260件",
];

const mobileTrustPoints = [
  "川口市めぐりの森まで車で約5分",
  "駐車場70台の自社式場",
  "直葬〜一般葬まで対応",
];

const heroImage = "/images/home/hero/kawaguchi-memorial-hall-hero.png";

export function Hero() {
  return (
    <section className="bg-paper">
      {/* スマホ用FV：画像先行型 */}
      <div className="md:hidden">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-warm">
            <Image
              src={heroImage}
              alt="川口メモリアルホール 外観と祭壇イメージ"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-ink-deep/30 via-ink-deep/15 to-ink-deep/90"
            />
            <div className="absolute inset-x-0 top-0 px-5 pt-5">
              <p className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-brand">
                川口市・新井宿の皆様へ
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-white">
              <h1 className="font-serif-jp text-[1.55rem] font-medium leading-[1.4] [text-shadow:_0_2px_12px_rgba(0,0,0,0.35)]">
                川口市・新井宿で
                <br />
                家族葬・直葬をお考えの方へ。
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/95 [text-shadow:_0_1px_8px_rgba(0,0,0,0.35)]">
                急なお迎えから費用のご相談まで
                <br />
                地元川口の葬儀社が24時間対応します
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 pt-6 pb-8">
          <ul className="space-y-2.5 text-sm font-semibold text-ink">
            {mobileTrustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white"
                >
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a
            href="tel:0120-963-765"
            className="mt-6 flex items-center justify-between gap-3 rounded-lg bg-emergency px-5 py-3.5 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-base"
              >
                ☎
              </span>
              <span className="text-left">
                <span className="block text-base font-bold leading-tight">
                  電話する
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold tracking-wider text-white/85">
                  24時間365日 受付
                </span>
              </span>
            </span>
            <span aria-hidden className="text-lg text-white/80">
              →
            </span>
          </a>
          <a
            href="/contact/"
            className="mt-3 block rounded-lg border border-line bg-white px-5 py-3.5 text-center text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
          >
            事前相談する
          </a>

          <div className="mt-4 text-center">
            <a
              href="/plan/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mid transition hover:text-brand hover:underline"
            >
              <span aria-hidden>→</span>
              プラン・費用の目安を見る
            </a>
          </div>

          <p className="mt-5 text-xs leading-5 text-ink-soft">
            創業20年・年間約260件の施行実績／川口市西新井宿の自社式場
          </p>
        </div>
      </div>

      {/* PC用FV：既存の2カラム構成を維持 */}
      <div className="mx-auto hidden max-w-6xl px-5 pt-8 pb-12 md:grid md:grid-cols-[1.08fr_0.92fr] md:items-start md:gap-x-14 md:px-8 md:pt-20 md:pb-24">
        <p className="text-sm font-bold tracking-[0.02em] text-brand md:col-start-1 md:row-start-1">
          川口市・新井宿の皆様へ
        </p>

        <h1 className="font-serif-jp mt-5 text-[1.75rem] font-medium leading-[1.4] tracking-normal text-ink-deep md:col-start-1 md:row-start-2 md:mt-5 md:text-[2.2rem] md:leading-[1.32]">
          川口市・新井宿で
          <br />
          家族葬・直葬をお考えの方へ。
        </h1>

        <p className="mt-5 text-sm leading-7 text-ink-mid md:col-start-1 md:row-start-3 md:mt-5 md:text-base md:leading-8">
          急なお迎えから費用のご相談まで、地元川口の葬儀社が24時間対応します。川口市西新井宿の自社式場 / 創業20年・年間約260件の施行実績。
        </p>

        <figure className="-mx-5 mt-7 md:col-start-2 md:row-start-1 md:row-span-5 md:mx-0 md:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden border-line bg-warm md:aspect-[5/6] md:rounded-lg md:border md:shadow-[0_24px_70px_rgba(26,42,35,0.12)]">
            <Image
              src={heroImage}
              alt="川口メモリアルホール 外観と祭壇イメージ"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              priority
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

        <div className="md:col-start-1 md:row-start-5 md:mt-7 md:block">
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
