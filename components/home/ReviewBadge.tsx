import { StarIcon } from "@/components/common/icons";
import { reviewSummary } from "@/lib/reviews";

/**
 * 部分塗りに対応した星メーター。下層（淡色）に上層（金）を %幅で重ねて表現。
 * 装飾のため aria-hidden。数値は隣接テキストで読み上げる。
 */
function StarMeter({ value, sizeClass }: { value: number; sizeClass: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const stars = (extra: string) =>
    Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} className={`${sizeClass} ${extra}`} />
    ));
  return (
    <span aria-hidden className="relative inline-flex">
      <span className="inline-flex gap-0.5 text-gold/30">{stars("")}</span>
      <span
        className="absolute left-0 top-0 h-full overflow-hidden text-gold"
        style={{ width: `${pct}%` }}
      >
        <span className="inline-flex gap-0.5">{stars("shrink-0")}</span>
      </span>
    </span>
  );
}

export function ReviewBadge() {
  const { total, highlights, basis, asOf } = reviewSummary;

  return (
    <section
      aria-label="口コミ・アンケートの総合評価"
      className="bg-paper"
    >
      <div className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-9">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-line bg-white px-6 py-5 shadow-[0_10px_28px_-20px_rgba(31,45,39,0.5)] sm:flex-row sm:gap-6">
          {/* 総合評価 */}
          <div className="flex flex-col items-center text-center sm:w-40 sm:shrink-0">
            <span className="font-serif-jp text-[2.6rem] font-bold leading-none text-ink-deep">
              {total.rating.toFixed(1)}
            </span>
            <span className="mt-1.5">
              <StarMeter value={total.rating} sizeClass="h-[15px] w-[15px]" />
            </span>
            <p className="mt-1.5 text-xs font-semibold text-ink-mid">
              総合評価<span className="text-ink-soft">（{total.count}件）</span>
            </p>
          </div>

          {/* 区切り（PCは縦線・モバイルは横線） */}
          <div className="hidden w-px self-stretch bg-line-soft sm:block" />
          <div className="h-px w-full bg-line-soft sm:hidden" />

          {/* 内訳（出典が明確な2指標） */}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <ul className="space-y-1.5">
              {highlights.map((h) => (
                <li key={h.label} className="text-sm font-semibold text-ink-mid">
                  {h.label}{" "}
                  <span className="text-gold">★{h.rating.toFixed(1)}</span>{" "}
                  <span className="font-normal text-ink-soft">
                    （{h.count}件）
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[11px] leading-5 text-ink-soft">
              ※ {basis}（{asOf}）。掲載は実際にいただいた評価です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
