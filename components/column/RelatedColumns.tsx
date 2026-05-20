import { ColumnCard } from "./ColumnCard";
import type { ColumnArticle } from "@/lib/columns";
import { columns } from "@/lib/columns";

type Props = {
  currentSlug: string;
  category?: string;
  limit?: number;
  variant?: "grid" | "list";
  title?: string;
};

function getRelated(
  currentSlug: string,
  category: string | undefined,
  limit: number
): ColumnArticle[] {
  const others = columns.filter((c) => c.slug !== currentSlug);
  const sameCategory = category
    ? others.filter((c) => c.category === category)
    : [];
  const otherSorted = [...others].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );
  const seen = new Set<string>();
  const merged: ColumnArticle[] = [];
  for (const a of [...sameCategory, ...otherSorted]) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    merged.push(a);
    if (merged.length >= limit) break;
  }
  return merged;
}

export function RelatedColumns({
  currentSlug,
  category,
  limit = 6,
  variant = "grid",
  title = "関連の記事",
}: Props) {
  const related = getRelated(currentSlug, category, limit);
  if (related.length === 0) return null;

  if (variant === "list") {
    return (
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          <span aria-hidden className="inline-block h-1 w-4 bg-brand" />
          Related
        </p>
        <p className="mb-3 text-sm font-bold text-ink-deep">{title}</p>
        <ul className="space-y-1">
          {related.map((a) => (
            <li key={a.slug}>
              <ColumnCard article={a} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Related Articles
          </p>
          <h2 className="font-serif-jp mt-2 text-2xl font-medium text-ink-deep md:text-3xl">
            {title}
          </h2>
        </div>
        <a
          href="/column/"
          className="hidden text-sm font-bold text-brand hover:underline md:inline-flex"
        >
          コラム一覧へ →
        </a>
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 6).map((a) => (
          <li key={a.slug}>
            <ColumnCard article={a} showDescription={false} />
          </li>
        ))}
      </ul>
    </section>
  );
}
