import { ArrowRightIcon } from "@/components/common/icons";

type ConsultCard = {
  category: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

const cards: ConsultCard[] = [
  {
    category: "Cost",
    title: "費用を前もって知りたい",
    body: "ご希望の人数や形式に合わせて、葬儀費用の目安や見積りを確認できます。",
    href: "/estimate/",
    linkLabel: "見積りを依頼する",
  },
  {
    category: "Hall",
    title: "式場を見ておきたい",
    body: "川口メモリアルホールの設備や雰囲気を、事前に確認していただけます。",
    href: "/hall/kawaguchi-memorial-hall/",
    linkLabel: "式場を見る",
  },
  {
    category: "Plan",
    title: "家族葬・直葬を相談したい",
    body: "ご家族の人数やご希望に合わせて、無理のないお見送りの形を一緒に整理します。",
    href: "/plan/",
    linkLabel: "プランを見る",
  },
  {
    category: "Compare",
    title: "互助会や他社見積りを相談したい",
    body: "互助会に加入中の方や、他社見積りを比較したい方のご相談も承っています。",
    href: "/column/gojokai-kaiyaku/",
    linkLabel: "互助会の相談を見る",
  },
];

export function AdvanceConsultSection() {
  return (
    <section
      id="advance-consult"
      className="bg-white py-16 md:py-24"
      aria-labelledby="advance-consult-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Before
          </p>
          <h2
            id="advance-consult-heading"
            className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]"
          >
            今すぐではない方も、
            <br className="md:hidden" />
            ご相談いただけます。
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-mid md:text-lg md:leading-9">
            費用の目安、式場のこと、家族葬・直葬の選び方まで。事前に確認しておくことで、いざという時の不安を減らせます。
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {cards.map((c) => (
            <li key={c.category} className="h-full">
              <a
                href={c.href}
                className="group flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-sm transition hover:border-brand hover:shadow-md md:p-7"
              >
                <p className="text-xs font-bold tracking-[0.22em] text-ink-soft uppercase">
                  {c.category}
                </p>
                <p className="font-serif-jp mt-3 text-lg font-medium leading-[1.45] text-ink-deep group-hover:text-brand md:text-xl">
                  {c.title}
                </p>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {c.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand md:text-base">
                  {c.linkLabel}
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-line-soft pt-8 md:mt-12 md:flex-row md:justify-center md:gap-4 md:pt-10">
          <a
            href="/contact/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep md:w-auto md:text-base"
          >
            事前相談する
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="/estimate/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 py-3 text-sm font-bold text-ink-deep transition hover:border-brand hover:text-brand md:w-auto md:text-base"
          >
            見積りを依頼する
          </a>
        </div>

        <p className="mt-5 text-center text-sm leading-7 text-ink-mid md:text-base">
          事前相談・お見積りは無料です。無理な勧誘はいたしませんので、お気軽にご相談ください。
        </p>
      </div>
    </section>
  );
}
