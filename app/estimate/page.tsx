import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { UrgentCallout } from "@/components/forms/UrgentCallout";
import { EstimateForm } from "./EstimateForm";

export const metadata: Metadata = {
  title: "葬儀費用の概算見積り | 川口典礼",
  description:
    "川口市・新井宿の川口典礼で、葬儀費用の概算を相談いただけます。葬儀形式・人数・斎場・お料理・返礼品などをお聞きし、ご担当者より概算金額をご案内します。",
  alternates: { canonical: "/estimate/" },
};

const steps = [
  {
    step: "Step 1",
    label: "フォームにご入力",
    description:
      "葬儀形式・参列人数・希望の斎場など、わかる範囲でご入力ください。未定の項目は「相談したい」を選んでいただけます。",
  },
  {
    step: "Step 2",
    label: "ご担当者より連絡",
    description:
      "ご入力内容をもとに、ご担当者より概算金額をご連絡します。電話・メールいずれの方法も選べます。",
  },
  {
    step: "Step 3",
    label: "正式お見積り",
    description:
      "ご希望の方には正式なお見積りを無料でご案内します。事前相談・ホール見学とあわせてご相談いただけます。",
  },
];

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Estimate"
        subLabel="葬儀費用の概算"
        title={
          <>
            ご希望をうかがって、
            <br className="md:hidden" />
            概算金額をご案内します。
          </>
        }
        description={
          <p>
            葬儀形式・参列人数・お料理や返礼品の有無などをお聞きし、ご担当者から概算金額をご連絡します。お見積り・事前相談は無料です。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "葬儀費用の概算" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <UrgentCallout />
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              How It Works
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              概算ご案内の流れ
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご入力から概算ご案内まで。
            </h2>
          </div>

          <ol className="mt-9 grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <li
                key={item.step}
                className="rounded-lg border border-line bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  {item.step}
                </p>
                <p className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cool py-14 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Form
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              概算依頼フォーム
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              ご希望内容をお聞かせください。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              「未定」「相談したい」もお選びいただけます。確定していない項目があっても問題ありません。
            </p>
          </div>

          <div className="mt-9">
            <EstimateForm />
          </div>

          <div className="mt-8 space-y-3 rounded-lg border border-line-soft bg-white px-6 py-5 text-sm leading-7 text-ink-mid">
            <p>
              ※ ご入力いただいた概算金額は正式なお見積りではありません。安置日数、火葬場、式場使用料、お料理、返礼品、宗教者へのお礼、搬送距離などにより総額は変動します。
            </p>
            <p>
              ※ ご入力内容は概算のご案内・お問い合わせ対応のみに使用します。詳細は
              <a
                href="/privacy/"
                className="font-bold text-brand hover:underline"
              >
                プライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
