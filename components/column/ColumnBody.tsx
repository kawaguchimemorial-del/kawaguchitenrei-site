import Image from "next/image";
import type { ColumnBlock } from "@/lib/columns";

export function ColumnBody({ body }: { body: ColumnBlock[] }) {
  return (
    <div className="space-y-6 text-base leading-9 text-ink md:text-lg md:leading-10">
      {body.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className="font-serif-jp mt-12 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-serif-jp mt-8 text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {block.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6">
                {block.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>
            );
          case "image":
            return (
              <figure key={i}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-warm">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-ink-mid">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="rounded-lg border-l-4 border-brand bg-paper px-5 py-4 text-ink-mid"
              >
                {block.text}
              </blockquote>
            );
          case "cta":
            return (
              <p key={i}>
                <a
                  href={block.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  {block.label}
                  <span aria-hidden>→</span>
                </a>
              </p>
            );
        }
      })}
    </div>
  );
}
