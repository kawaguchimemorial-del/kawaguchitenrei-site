export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-sm text-ink-soft">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
              {crumb.href && !isLast ? (
                <a
                  href={crumb.href}
                  className="transition hover:text-brand hover:underline"
                >
                  {crumb.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-ink-mid"
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-ink-soft">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
