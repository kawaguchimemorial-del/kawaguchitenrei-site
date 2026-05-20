import type { TocItem } from "@/lib/column-toc";

type Props = {
  items: TocItem[];
  variant?: "sidebar" | "mobile";
};

export function ColumnToc({ items, variant = "sidebar" }: Props) {
  if (items.length === 0) return null;

  const list = (
    <ol className="space-y-2 text-sm leading-relaxed">
      {items.map((item) => (
        <li
          key={item.id}
          className={item.level === 3 ? "pl-4" : ""}
        >
          <a
            href={`#${item.id}`}
            className={
              item.level === 2
                ? "block border-l-2 border-line pl-3 text-ink-deep hover:border-brand hover:text-brand"
                : "block text-ink-mid hover:text-brand"
            }
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="group rounded-lg border border-line-soft bg-paper px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ink-deep">
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
            />
            目次
          </span>
          <span
            aria-hidden
            className="text-base text-ink-soft transition group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="mt-4">{list}</div>
      </details>
    );
  }

  return (
    <nav aria-label="この記事の目次" className="rounded-lg border border-line-soft bg-white p-5">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
        <span aria-hidden className="inline-block h-1 w-4 bg-brand" />
        Table of Contents
      </p>
      <p className="mb-4 text-sm font-bold text-ink-deep">目次</p>
      {list}
    </nav>
  );
}
