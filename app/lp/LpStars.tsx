// ★の見た目を評価値どおりに出す（4.7 なら4つ目まで満たし、5つ目を7割）。
// 「★★★★☆」の文字だけだと 4.5 も 4.7 も同じ見え方になってしまうため。
export function LpStars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-block leading-none ${className}`}
      role="img"
      aria-label={`5点満点中 ${rating} 点`}
    >
      <span aria-hidden className="text-line">
        ★★★★★
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-0 overflow-hidden text-gold"
        style={{ width: `${percent}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}
