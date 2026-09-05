import { getPlan } from "@/lib/plans";

/** This format guide points to actual plans instead of implying a separate package. */
export function CremationPlanGuide() {
  const direct = getPlan("direct-funeral")!;
  const flower = getPlan("hanaire-owakare")!;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <h2 className="font-serif-jp text-2xl font-medium leading-relaxed text-ink-deep md:text-3xl">
          火葬式の費用は、お別れの内容から確認します。
        </h2>
        <p className="mt-6 text-base leading-9 text-ink-mid">
          「火葬式」は葬儀の形式を表す言葉です。このページで形式と確認点を整理し、具体的な内容・料金は下記のプランでご確認いただけます。
          火葬料、ご安置の日数、搬送距離、宗教者へのお礼などによって総額は変わります。
        </p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {[direct, flower].map((plan) => (
            <div key={plan.slug} className="py-6">
              <dt className="text-lg font-semibold text-ink-deep">
                <a className="underline underline-offset-4" href={`/plan/${plan.slug}/`}>{plan.name}</a>
              </dt>
              <dd className="mt-3 text-base leading-8 text-ink-mid">
                {plan.slug === "direct-funeral" ? "火葬を中心に、ご家族でシンプルにお見送りするプランです。" : "火葬前にお花を手向け、お別れの時間を取るプランです。"}
                {plan.pricing?.type === "member-regular" && (
                  <>事前相談会員価格{plan.pricing.member.toLocaleString("ja-JP")}円（税込）、通常価格{plan.pricing.regular.toLocaleString("ja-JP")}円（税込）。</>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-8 text-lg font-semibold text-ink-deep">ご安置・面会・火葬当日の確認点</h3>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-ink-mid">
          <li>ご安置中に面会を希望するか、お花入れの時間を取りたいかをお聞かせください。直葬プラン内のシンプル直葬は、お預かり中の面会を行いません。</li>
          <li>ご安置・ドライアイスに含まれる日数と、日程が延びた場合の費用をお見積りで確認します。</li>
          <li><a href="/saijo/megurinomori/" className="underline underline-offset-4">川口市めぐりの森</a>は川口市営の火葬場で、通夜・告別式の式場はありません。火葬前のお別れの場所と日程は、利用条件・予約状況を確認してご案内します。</li>
        </ul>
        <p className="mt-6 text-base leading-8 text-ink-mid">ご希望がまだ決まっていない場合も、<a href="/contact/" className="underline underline-offset-4">事前相談</a>で必要な内容と総額の目安を一緒に整理できます。</p>
      </div>
    </section>
  );
}
