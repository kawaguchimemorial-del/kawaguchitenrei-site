export function FinalCtaSection() {
  return (
    <section id="final-cta" className="bg-deep py-16 text-white md:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
          Contact
        </p>
        <p className="mt-2 text-sm font-semibold text-white/80">
          ご相談ください
        </p>
        <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
          葬儀のことがわからなくても、
          <br className="md:hidden" />
          大丈夫です。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          急なご葬儀、費用の不安、斎場選び、家族葬の進め方など、わからないことがあれば川口典礼へご相談ください。直葬・火葬式・一日葬・家族葬・市民葬まで、自社ホール・谷塚斎場・戸田葬祭場・町屋斎場・寺院会館でのご葬儀に対応します。無理なご案内はいたしません。
        </p>

        <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
          <a
            href="tel:0120-963-765"
            className="group flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span aria-hidden className="text-2xl">
              ☎
            </span>
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

        <p className="mt-7 text-sm leading-7 text-brand-tint/80">
          まずは状況をお聞かせください。費用や流れだけ知りたい、というご相談も歓迎しています。
        </p>
      </div>
    </section>
  );
}
