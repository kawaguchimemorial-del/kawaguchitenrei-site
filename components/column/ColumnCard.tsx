import Image from "next/image";
import type { ColumnArticle } from "@/lib/columns";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

type Variant = "default" | "featured" | "compact";

type Props = {
  article: ColumnArticle;
  variant?: Variant;
  showDescription?: boolean;
};

export function ColumnCard({
  article,
  variant = "default",
  showDescription = true,
}: Props) {
  if (variant === "compact") {
    return (
      <a
        href={`/column/${article.slug}/`}
        className="group flex items-center gap-3 rounded-md p-2 transition hover:bg-paper"
      >
        <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-md bg-warm">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail.src}
              alt={article.thumbnail.alt}
              fill
              sizes="80px"
              className="object-cover object-center"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#e8e1d2_0_8px,transparent_8px_16px)]"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {article.category && (
            <p className="truncate text-[10px] font-semibold tracking-wider text-brand uppercase">
              {article.category}
            </p>
          )}
          <p className="line-clamp-2 text-sm font-medium leading-snug text-ink-deep group-hover:text-brand">
            {article.title}
          </p>
        </div>
      </a>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <a
      data-reveal
      href={`/column/${article.slug}/`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm"
    >
      {article.thumbnail ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-warm">
          <Image
            src={article.thumbnail.src}
            alt={article.thumbnail.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="relative aspect-[16/9] w-full bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)]"
        />
      )}

      <div
        className={`flex flex-1 flex-col gap-3 p-5 ${
          isFeatured ? "md:gap-4 md:p-6" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {article.category && (
            <span className="inline-flex rounded-full border border-line bg-paper px-3 py-1 font-bold text-ink-deep">
              {article.category}
            </span>
          )}
          <span className="text-ink-soft">{formatDate(article.publishedAt)}</span>
        </div>

        <h3
          className={`font-serif-jp font-medium leading-[1.55] text-ink-deep group-hover:text-brand ${
            isFeatured
              ? "text-lg md:text-xl"
              : "text-base md:text-lg"
          }`}
        >
          {article.title}
        </h3>

        {showDescription && article.description && (
          <p className="line-clamp-3 text-sm leading-7 text-ink-mid md:leading-7">
            {article.description}
          </p>
        )}

        <p className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
          記事を読む
          <span aria-hidden>→</span>
        </p>
      </div>
    </a>
  );
}
