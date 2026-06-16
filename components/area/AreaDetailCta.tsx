import { ArrowRightIcon, PhoneIcon } from "@/components/common/icons";
import type { Area } from "@/lib/areas";

// セクション8: 自然な単独カードCTA
// スマホ下部固定CTAとの重複密度を抑え、bg-deepの全面ブロックではなく
// bg-paper の中の落ち着いた白カードとして配置する
export function AreaDetailCta({ area }: { area: Area }) {
  return (
    <section
      id="consultation"
      className="scroll-mt-24 bg-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Contact
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-mid">
                ご相談ください
              </p>
              <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-[2rem]">
                {area.name}でのご葬儀、
                <br />
                まずはお気軽にご相談ください。
              </h2>
              <p className="mt-5 text-base leading-8 text-ink-mid md:text-lg md:leading-9">
                急なご葬儀から事前のご相談まで、お電話または事前相談フォームでお問い合わせください。お見積り・事前相談は無料です。
              </p>
            </div>

            <div className="hidden w-full gap-3 md:grid md:w-auto md:min-w-[260px]">
              <a
                href="tel:0120-963-765"
                className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <PhoneIcon className="h-6 w-6" />
                <span className="text-left">
                  <span className="block text-base font-bold leading-tight">
                    電話で相談する
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold text-white/90">
                    24時間365日 受付
                  </span>
                </span>
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                事前相談する
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="mt-7 border-t border-line-soft pt-5 text-xs leading-6 text-ink-soft">
            ※ 費用や流れだけ知りたい、というご相談も歓迎しています。無理にご案内することはありません。
          </p>
        </div>
      </div>
    </section>
  );
}
