import Image from "next/image";
import type { ColumnBlock } from "@/lib/columns";
import { headingId } from "@/lib/column-toc";

export function ColumnBody({ body }: { body: ColumnBlock[] }) {
  let h2Count = 0;
  let h3Count = 0;

  return (
    <div className="space-y-6 text-[15px] leading-[1.95] text-ink md:text-base md:leading-[2.05]">
      {body.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-ink">
                {block.text}
              </p>
            );
          case "h2": {
            h2Count += 1;
            h3Count = 0;
            const id = headingId(h2Count);
            return (
              <h2
                key={i}
                id={id}
                className="font-serif-jp scroll-mt-24 mt-14 border-l-[5px] border-brand bg-paper py-3 pl-4 text-xl font-medium leading-[1.5] text-ink-deep md:mt-16 md:text-2xl md:py-4 md:pl-5"
              >
                {block.text}
              </h2>
            );
          }
          case "h3": {
            h3Count += 1;
            const id = headingId(h2Count, h3Count);
            return (
              <h3
                key={i}
                id={id}
                className="font-serif-jp scroll-mt-24 mt-10 flex items-baseline gap-3 border-b border-line-soft pb-2 text-lg font-medium leading-[1.5] text-ink-deep md:text-xl"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                />
                <span>{block.text}</span>
              </h3>
            );
          }
          case "ul":
            return (
              <ul
                key={i}
                className="space-y-2 rounded-lg bg-paper px-5 py-4 md:space-y-3 md:px-6 md:py-5"
              >
                {block.items.map((t, j) => (
                  <li
                    key={j}
                    className="relative pl-5 leading-[1.85] md:leading-[1.95]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] inline-block h-1.5 w-1.5 rounded-full bg-brand"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2 pl-5 md:space-y-3">
                {block.items.map((t, j) => (
                  <li
                    key={j}
                    className="relative pl-9 leading-[1.85] md:leading-[1.95]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white md:h-7 md:w-7 md:text-sm"
                    >
                      {j + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            );
          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-warm">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-ink-mid">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="relative my-2 rounded-lg border border-line-soft bg-cool/40 px-6 py-5 text-ink-mid md:px-7 md:py-6"
              >
                <span
                  aria-hidden
                  className="absolute left-3 top-2 font-serif-jp text-3xl leading-none text-brand-soft md:text-4xl"
                >
                  “
                </span>
                <p className="pl-6 text-[15px] leading-[1.95] md:text-base md:leading-[2.05]">
                  {block.text}
                </p>
              </blockquote>
            );
          case "cta":
            return (
              <div
                key={i}
                className="my-8 rounded-lg border border-line bg-paper px-6 py-6 text-center shadow-sm md:px-8 md:py-8"
              >
                <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                  Next Step
                </p>
                <p className="mt-2 text-base text-ink-mid md:text-lg">
                  詳しい内容や費用感は、川口典礼までお気軽にご相談ください。
                </p>
                <a
                  href={block.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  {block.label}
                  <span aria-hidden>→</span>
                </a>
              </div>
            );
          case "table":
            return (
              <figure key={i} className="my-4">
                <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
                  <table className="w-full min-w-[480px] border-collapse">
                    <thead>
                      <tr className="bg-brand text-white">
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-left text-sm font-bold md:px-5 md:py-4 md:text-base"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr
                          key={r}
                          className={
                            r % 2 === 1
                              ? "border-t border-line-soft bg-paper/60"
                              : "border-t border-line-soft bg-white"
                          }
                        >
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className="px-4 py-3 text-sm leading-7 text-ink md:px-5 md:py-4 md:text-base md:leading-8"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-ink-mid">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
