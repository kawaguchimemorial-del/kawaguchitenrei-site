import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "葬儀プラン一覧 | 川口典礼",
  description:
    "川口典礼の家族葬・一日葬・火葬式・直葬・川口市民葬の各プランをご紹介します。費用や対応形式の比較、向いている方の目安もあわせてご確認いただけます。",
  alternates: { canonical: "/plan/" },
};

const guideItems = [
  {
    title: "ご家族で静かに見送りたい",
    description: "家族葬・一日葬がおすすめです。落ち着いた式の時間を確保できます。",
    plans: ["家族葬", "一日葬"],
  },
  {
    title: "費用を抑えたい",
    description: "火葬式・直葬を中心にご案内します。必要な手配のみで完結します。",
    plans: ["火葬式", "直葬"],
  },
  {
    title: "通夜の負担を減らしたい",
    description: "一日葬がおすすめです。告別式と火葬を1日で行います。",
    plans: ["一日葬"],
  },
  {
    title: "川口市の制度を活用したい",
    description: "川口市民葬の利用条件を確認のうえご案内します。",
    plans: ["川口市民葬"],
  },
];

export default function PlanIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan"
        subLabel="葬儀プラン一覧"
        title={
          <>
            ご希望に合わせて選べる、
            <br className="md:hidden" />
            5つの葬儀形式。
          </>
        }
        description={
          <p>
            川口典礼では、家族葬・一日葬・火葬式・直葬・川口市民葬の5つの葬儀プランをご用意しています。費用や日数、参列人数の目安からご家族に合うかたちをご検討いただけます。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "葬儀プラン" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Compare
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              プラン比較表。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              費用目安・日数・参列人数の比較からご確認いただけます。スマホでは横スクロールで全列をご覧いただけます。
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-cool text-ink-deep">
                <tr>
                  <th className="px-4 py-4 text-sm font-bold">プラン</th>
                  <th className="px-4 py-4 text-sm font-bold">費用目安</th>
                  <th className="px-4 py-4 text-sm font-bold">日数</th>
                  <th className="px-4 py-4 text-sm font-bold">参列</th>
                  <th className="px-4 py-4 text-sm font-bold">向いている方</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {plans.map((plan) => (
                  <tr key={plan.slug} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 font-serif-jp text-base font-medium text-ink-deep">
                      <a
                        href={`/plan/${plan.slug}/`}
                        className="hover:text-brand hover:underline"
                      >
                        {plan.name}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-brand">
                      {plan.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-ink-deep">
                      {plan.days}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-ink-deep">
                      {plan.people}
                    </td>
                    <td className="px-4 py-4 text-sm leading-7 text-ink-mid">
                      {plan.forWhom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Plans
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              各プランの詳細。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              プラン名をクリックすると、含まれる内容・流れ・別途費用などの詳細をご確認いただけます。
            </p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.slug}>
                <a
                  href={`/plan/${plan.slug}/`}
                  className={`group relative flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md md:p-7 ${
                    plan.featured ? "border-brand" : "border-line"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                      最も選ばれている形式
                    </span>
                  )}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif-jp text-2xl font-medium text-ink-deep md:text-[1.6rem]">
                      {plan.name}
                    </h3>
                    <p className="text-right text-sm font-bold text-brand">
                      {plan.price}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                    {plan.short}
                  </p>

                  <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line-soft pt-4 text-sm">
                    <div>
                      <dt className="text-xs font-semibold text-ink-soft">
                        日数
                      </dt>
                      <dd className="mt-1 font-bold text-ink-deep">
                        {plan.days}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-ink-soft">
                        参列
                      </dt>
                      <dd className="mt-1 font-bold text-ink-deep">
                        {plan.people}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-ink-soft">
                        向いている方
                      </dt>
                      <dd className="mt-1 text-xs leading-5 text-ink-mid">
                        {plan.forWhom}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:underline">
                    {plan.name}の詳細を見る
                    <span aria-hidden>→</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cool py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Guide
            </p>
            <h2 className="font-serif-jp mt-3 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご家族のご希望から選ぶ。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              迷ったときは、ご家族で大切にしたいことから絞ってみてください。
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {guideItems.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-7"
              >
                <p className="font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.plans.map((planName) => {
                    const target = plans.find((p) => p.name === planName);
                    if (!target) return null;
                    return (
                      <li key={planName}>
                        <a
                          href={`/plan/${target.slug}/`}
                          className="inline-flex items-center gap-1 rounded-full border border-brand bg-white px-4 py-2 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
                        >
                          {planName}
                          <span aria-hidden>›</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            プラン選びでお迷いの方は、
            <br className="md:hidden" />
            お気軽にご相談ください。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            ご家族のご希望や状況をお伺いし、最適なプランをご提案します。事前相談・お見積りは無料です。
          </p>

          <div className="mt-9 grid gap-3 md:grid-cols-[1.2fr_1fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <span aria-hidden className="text-2xl">
                ☎
              </span>
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  電話で相談する
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/90">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/estimate/"
              className="rounded-lg border border-white/60 bg-transparent px-5 py-5 text-center text-base font-bold text-white shadow-sm transition hover:bg-white/10"
            >
              費用の概算
            </a>
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              事前相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
