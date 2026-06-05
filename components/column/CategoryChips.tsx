type ChipCategory = {
  label: string;
  count: number;
};

type Props = {
  categories: ChipCategory[];
  total: number;
  activeCategory?: string;
};

export function CategoryChips({ categories, total, activeCategory }: Props) {
  if (categories.length === 0) return null;

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
        <span className="text-xs font-normal opacity-80">({total})</span>
      </a>
      {categories.map((category) => (
        <a
          key={category.label}
          href={`#cat-${encodeURIComponent(category.label)}`}
          className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-bold text-ink-mid transition hover:border-brand hover:text-brand"
        >
          {category.label}
          <span className="text-xs font-normal opacity-70">
            ({category.count})
          </span>
        </a>
      ))}
    </nav>
  );
}
