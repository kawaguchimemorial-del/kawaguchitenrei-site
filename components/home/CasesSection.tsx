import Image from "next/image";
import { cases, type CaseRecord } from "@/lib/cases";

function CaseCard({
  item,
  duplicate = false,
}: {
  item: CaseRecord;
  duplicate?: boolean;
}) {
  return (
    <a
      href={`/case/${item.slug}/`}
      // マーキーの複製カードはキーボード/読み上げ対象から除外
      tabIndex={duplicate ? -1 : undefined}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm">
        {item.photo ? (
          <Image
            src={item.photo.src}
            alt={item.photo.alt}
            fill
            sizes="(max-width: 768px) 280px, 360px"
            className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#eef3ee_0_8px,transparent_8px_16px)]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif-jp text-lg font-medium leading-7 text-ink-deep group-hover:text-brand md:text-xl">
          {item.title}
        </h3>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-ink-soft">形式</dt>
          <dd className="font-semibold text-ink-deep">{item.format}</dd>
          <dt className="text-ink-soft">場所</dt>
          <dd className="font-semibold text-ink-deep">{item.hall}</dd>
          <dt className="text-ink-soft">人数</dt>
          <dd className="font-semibold text-ink-deep">{item.people}</dd>
          <dt className="text-ink-soft">総額</dt>
          <dd className="font-bold text-brand">{item.total}</dd>
        </dl>
        <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand">
          この事例を見る
          <span aria-hidden>→</span>
        </p>
      </div>
    </a>
  );
}

export function CasesSection() {
  // スマホ・PC共通：公開中の全件を新しい順に自動スクロール（marquee）
  const marqueeItems = [...cases].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

  return (
    <section id="cases" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Cases
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">施行事例</p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
              実際の葬儀事例を、
              <br className="md:hidden" />
              費用・人数とあわせて。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              ご希望のイメージに近い事例をご覧いただけます。掲載内容は、ご家族の許可をいただいています。
            </p>
          </div>
          <a
            href="/case/"
            className="hidden shrink-0 rounded-lg border border-ink-deep bg-white px-5 py-3 text-base font-bold text-ink-deep transition hover:bg-cool md:inline-flex"
          >
            事例一覧を見る
          </a>
        </div>
      </div>

      {/* スマホ・PC共通：全件を自動横スクロール（ホバーで一時停止／reduced-motionで停止） */}
      <div
        className="mt-10"
        aria-label="施行事例（自動でスクロールします。カードにカーソルを合わせると停止します）"
      >
        <div className="overflow-hidden">
          <ul className="marquee gap-5 md:gap-6">
            {[...marqueeItems, ...marqueeItems].map((item, i) => {
              const isDup = i >= marqueeItems.length;
              return (
                <li
                  key={`${item.slug}-${i}`}
                  aria-hidden={isDup || undefined}
                  className="w-[280px] shrink-0 md:w-[360px]"
                >
                  <CaseCard item={item} duplicate={isDup} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mt-8 md:hidden">
          <a
            href="/case/"
            className="block w-full rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep shadow-sm"
          >
            施行事例をもっと見る
          </a>
        </div>
      </div>
    </section>
  );
}
