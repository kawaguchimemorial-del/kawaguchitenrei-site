import Link from "next/link";

/**
 * 地域の実務情報をまとめて置くセクション。
 * 「川口市 葬儀場」「川口市 火葬 料金」「めぐりの森 火葬料金」など、
 * 地名×施設×料金×形式の掛け合わせで検索する方の受け皿にする。
 *
 * 数値の出どころ：
 *  - 火葬料金は lib/saijo.ts（川口市めぐりの森・市民30,000円／市外100,000円・目安）
 *  - 式場・アクセスは lib/halls.ts
 * このコンポーネント側に数値をハードコードしない。
 */
export type LocalGuideItem = { term: string; description: string };

export function AreaLocalGuide({
  heading,
  lead,
  items,
  paragraphs,
  note,
}: {
  heading: string;
  lead: string;
  items: LocalGuideItem[];
  paragraphs: string[];
  note?: string;
}) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Local Guide
          </p>
          <h2 className="font-serif-jp mt-4 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
            {lead}
          </p>
        </div>

        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.term}
              className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6"
            >
              <dt className="font-serif-jp text-base font-medium text-ink-deep md:text-lg">
                {item.term}
              </dt>
              <dd className="mt-2 text-sm leading-7 text-ink-mid">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 max-w-3xl space-y-4">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-sm leading-8 text-ink-mid md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {note && (
          <p className="mt-6 max-w-3xl text-xs leading-6 text-ink-soft">
            {note}
          </p>
        )}

        <p className="mt-8 text-sm">
          <Link
            href="/saijo/megurinomori/"
            className="font-bold text-brand underline underline-offset-4"
          >
            川口市めぐりの森の火葬料金・アクセスを詳しく見る
          </Link>
        </p>
      </div>
    </section>
  );
}
