import Image from "next/image";
import type { Voice } from "@/lib/voices";

export function VoiceLong({ voice }: { voice: Voice }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Comment
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            ご家族からのメッセージ
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            お寄せいただいたお声。
          </h2>
        </div>

        <div className="mt-9 rounded-lg border border-line bg-paper p-7 shadow-sm md:p-10">
          <p className="font-serif-jp text-base leading-[2] text-ink md:text-lg md:leading-[2.1]">
            {voice.comment}
          </p>
          <p className="mt-7 text-right text-sm font-semibold text-ink-mid">
            — {voice.family}
          </p>
        </div>
      </div>
    </section>
  );
}

export function VoiceSurvey({ voice }: { voice: Voice }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Survey
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            お客様アンケートより
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
            ご家族からのアンケート。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            お見送りの後、ご家族にお書きいただいたアンケートです。掲載は個人情報を確認・マスキングしたうえで、ご家族の許可をいただいています。
          </p>
        </div>

        <figure className="mt-9">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            <Image
              src={voice.surveyImage.src}
              alt={voice.surveyImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-4 text-xs leading-6 text-ink-soft">
            ※ お客様のお名前など個人を特定する情報はマスキング処理しています。
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function VoiceCta() {
  return (
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
          私たちも、
          <br className="md:hidden" />
          ご家族のお気持ちに寄り添います。
        </h2>
        <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
          ご葬儀をご検討中の方、または同じようなご相談がある方は、お気軽にお問い合わせください。事前のご相談・お見積りは無料です。
        </p>

        <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
          <a
            href="tel:0120-963-765"
            className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
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
      </div>
    </section>
  );
}
