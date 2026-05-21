import Image from "next/image";
import { getRecentVoices } from "@/lib/voices";

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p
      aria-label={`5段階中${clamped}の評価`}
      className="flex items-center gap-2"
    >
      <span aria-hidden className="text-base tracking-[0.18em] text-gold">
        {"★".repeat(clamped)}
        <span className="text-gold/30">{"★".repeat(5 - clamped)}</span>
      </span>
      <span className="text-xs font-semibold text-ink-soft">
        5段階中 {clamped}
      </span>
    </p>
  );
}

export function VoicesSection() {
  const items = getRecentVoices(2);

  return (
    <section id="voices" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Voices
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            お客様の声
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            ご利用いただいたご家族の声。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            お見送りの後、ご家族にお書きいただいたアンケートと感想をご紹介します。掲載は個人情報を確認のうえ、ご家族の許可を得ています。
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((voice) => (
            <li key={voice.slug}>
              <a
                href={`/voice/${voice.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-sm transition hover:shadow-md"
              >
                {voice.surveyImage && (
                  <div className="relative aspect-[4/3] bg-warm">
                    <Image
                      src={voice.surveyImage.src}
                      alt={voice.surveyImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-center"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <p className="font-serif-jp text-lg font-medium leading-[1.6] text-ink-deep group-hover:text-brand md:text-xl">
                    「{voice.title}」
                  </p>

                  <StarRating rating={voice.rating} />

                  <blockquote className="border-l-2 border-brand pl-4 text-sm leading-8 text-ink-mid md:text-base">
                    {voice.comment}
                  </blockquote>

                  <div className="mt-auto flex items-center justify-between gap-4 text-sm">
                    <span className="text-ink-soft">{voice.family}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-brand group-hover:underline">
                      詳しく見る
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center md:text-right">
          <a
            href="/voice/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep shadow-sm transition hover:bg-paper"
          >
            お客様の声をすべて見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
