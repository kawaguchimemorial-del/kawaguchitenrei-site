import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { UrgentCallout } from "@/components/forms/UrgentCallout";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "事前相談・お問い合わせ | 川口典礼",
  description:
    "川口典礼の事前相談・ホール見学・費用相談などのお問い合わせフォーム。24時間365日のお電話受付も可能。川口市・新井宿の地域密着葬儀社。",
  alternates: { canonical: "/contact/" },
};

const contactPoints = [
  {
    label: "事前相談・お見積り",
    description:
      "葬儀の流れ、費用の目安、プランの違いなど、お時間のあるときに整理してご相談いただけます。",
  },
  {
    label: "ホール見学",
    description:
      "川口メモリアルホールのご見学を承ります。実際の式場や控室の雰囲気をご確認いただけます。",
  },
  {
    label: "費用のご相談",
    description:
      "プラン金額、追加費用が発生しやすい項目、川口市民葬の利用条件など、詳しくご案内します。",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        subLabel="事前相談・お問い合わせ"
        title={
          <>
            事前相談・ホール見学・
            <br className="md:hidden" />
            費用相談を承ります。
          </>
        }
        description={
          <p>
            お電話・フォームのいずれでもご相談いただけます。ご家族のご希望や状況に合わせて、ゆっくりお時間を取ってお話を伺います。事前相談・お見積りは無料です。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "事前相談・お問い合わせ" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <UrgentCallout />
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              How We Can Help
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              ご相談いただける内容
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              こんなご相談を承っています。
            </h2>
          </div>

          <ul className="mt-9 grid gap-4 md:grid-cols-3">
            {contactPoints.map((item) => (
              <li
                key={item.label}
                className="rounded-lg border border-line bg-white p-6 shadow-sm"
              >
                <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cool py-14 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Form
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              お問い合わせフォーム
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
              フォームからご相談いただく場合。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              ご記入いただいた内容をもとに、ご担当者よりご連絡します。通常2営業日以内にご返信します。
            </p>
          </div>

          <div className="mt-9">
            <ContactForm />
          </div>

          <p className="mt-6 text-sm leading-7 text-ink-soft">
            ※ お預かりした個人情報は、ご返信・ご相談対応のためにのみ使用します。詳細は
            <a href="/privacy/" className="font-bold text-brand hover:underline">
              プライバシーポリシー
            </a>
            をご確認ください。
          </p>
        </div>
      </section>
    </>
  );
}
