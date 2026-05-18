import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 川口典礼",
  description:
    "川口典礼のプライバシーポリシーです。お客様からお預かりする個人情報の取扱い方針についてご案内します。",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        subLabel="プライバシーポリシー"
        title={<>個人情報の取扱いについて。</>}
        description={
          <p>
            川口典礼では、お客様からお預かりする個人情報を、葬儀のお手伝いに必要な範囲で大切に取り扱います。本ページでは、当社の個人情報の取扱い方針についてご案内します。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "プライバシーポリシー" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <article className="space-y-12">
            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                1. 基本方針
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                川口典礼は、ご家族の大切な時間に寄り添う葬儀社として、お客様の個人情報をはじめとするご家族のプライバシーを尊重します。法令その他の規範を遵守し、適切な取扱いに努めます。
              </p>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                2. 取得する個人情報
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                お電話、事前相談フォーム、対面でのお打合せなどを通じて、以下の情報をお伺いする場合があります。
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-9 text-ink md:text-lg">
                <li>お名前、ご連絡先(電話番号・メールアドレス)、ご住所</li>
                <li>故人様のお名前、続柄、ご逝去場所などの情報</li>
                <li>ご希望の葬儀形式、参列予定人数、宗教形式 等</li>
                <li>お見積りやお打合せの過程で必要となる関連情報</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                3. 利用目的
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                お預かりした個人情報は、以下の目的でのみ利用します。
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-9 text-ink md:text-lg">
                <li>葬儀・お別れの会の手配、ご案内、運営</li>
                <li>事前相談・お見積りに対するご回答</li>
                <li>ご請求・お支払い手続きの対応</li>
                <li>葬儀後の法要・アフターサポートのご案内</li>
                <li>サービス品質向上のための社内利用</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                4. 第三者提供
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                法令に基づく場合、または葬儀の手配上やむを得ず外部のお取引先(斎場・火葬場・宗教者・お料理・返礼品業者など)へ必要最小限の情報を共有する場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。
              </p>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                5. 安全管理
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                個人情報の漏えい、滅失または毀損の防止その他の安全管理のために、必要かつ適切な措置を講じます。担当者以外が不必要に閲覧することがないよう、社内での取扱いにも配慮します。
              </p>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                6. 開示・訂正・削除のご請求
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                ご本人またはご家族から、ご自身の個人情報の開示・訂正・削除をご希望いただいた場合は、ご本人確認のうえ、適切に対応します。下記のご相談窓口までご連絡ください。
              </p>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                7. ご相談窓口
              </h2>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-lg border border-line bg-paper px-6 py-6 text-base md:text-lg">
                <dt className="text-ink-soft">事業者</dt>
                <dd className="font-semibold text-ink-deep">{company.name}</dd>
                <dt className="text-ink-soft">所在地</dt>
                <dd className="text-ink-deep">
                  〒{company.postal} {company.address}
                </dd>
                <dt className="text-ink-soft">電話</dt>
                <dd className="text-ink-deep">{company.phone}</dd>
                <dt className="text-ink-soft">メール</dt>
                <dd className="break-all text-ink-deep">{company.email}</dd>
                <dt className="text-ink-soft">受付</dt>
                <dd className="text-ink-deep">{company.hours}</dd>
              </dl>
            </div>

            <div>
              <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                8. 改定について
              </h2>
              <p className="mt-5 text-base leading-9 text-ink md:text-lg md:leading-10">
                本ポリシーの内容は、法令の変更や運用の見直しに伴い改定することがあります。改定後の内容は、本ページにて掲載した時点から適用されるものとします。
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
