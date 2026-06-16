import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { StarIcon } from "@/components/common/icons";
import type { Voice } from "@/lib/voices";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p
      aria-label={`5段階中${clamped}の評価`}
      className="mt-5 flex items-center gap-2"
    >
      <span aria-hidden className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            filled={i < clamped}
            className={`h-5 w-5 md:h-6 md:w-6 ${
              i < clamped ? "text-gold" : "text-gold/35"
            }`}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-ink-soft md:text-sm">
        5段階中 {clamped}
      </span>
    </p>
  );
}

export function VoiceDetailIntro({ voice }: { voice: Voice }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-4xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "お客様の声", href: "/voice/" },
              { label: voice.title },
            ]}
          />
        </div>

        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
          Voice
        </p>
        <p className="mt-2 text-sm font-semibold text-ink-mid">お客様の声</p>

        <figure className="mt-7">
          <span
            aria-hidden
            className="font-serif-jp block text-[5rem] leading-none text-brand/30 md:text-[7rem]"
          >
            「
          </span>
          <blockquote className="font-serif-jp -mt-6 text-[1.8rem] font-medium leading-[1.6] text-ink-deep md:-mt-10 md:text-[2.4rem] md:leading-[1.55]">
            {voice.title}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm text-ink-mid">
            <span className="font-semibold">— {voice.family}</span>
            <span aria-hidden>·</span>
            <time dateTime={voice.publishedAt}>
              {formatDate(voice.publishedAt)}
            </time>
          </figcaption>
        </figure>

        <StarRating rating={voice.rating} />

        <p className="mt-5 text-xs leading-6 text-ink-soft">
          ※ 個人情報を確認・マスキングしたうえで、ご家族の許可を得て掲載しています。
        </p>
      </div>
    </section>
  );
}
