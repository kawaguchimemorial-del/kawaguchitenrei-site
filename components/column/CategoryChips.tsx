import type { ColumnArticle } from "@/lib/columns";

type Props = {
  articles: ColumnArticle[];
  activeCategory?: string;
};

export function CategoryChips({ articles, activeCategory }: Props) {
  const counts = new Map<string, number>();
  for (const a of articles) {
    if (!a.category) continue;
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  }
  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;

  return (
    <nav aria-label="カテゴリ" className="flex flex-wrap gap-2">
      <a
        href="#all-articles"
        className={
          activeCategory
            ? "inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-bold text-ink-mid transition hover:border-brand hover:text-brand"
            : "inline-flex items-center gap-1 rounded-full border border-brand bg-brand px-4 py-1.5 text-sm font-bold text-white"
        }
      >
        すべて
        <span className="text-xs font-normal opacity-80">
          ({articles.length})
        </span>
      </a>
      {entries.map(([category, count]) => (
        <a
          key={category}
          href={`#cat-${encodeURIComponent(category)}`}
          className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-bold text-ink-mid transition hover:border-brand hover:text-brand"
        >
          {category}
          <span className="text-xs font-normal opacity-70">({count})</span>
        </a>
      ))}
    </nav>
  );
}
