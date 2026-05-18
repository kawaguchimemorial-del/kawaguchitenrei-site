import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | 川口典礼",
  description:
    "川口典礼の特定商取引法に基づく表記です。販売事業者、所在地、電話、サービス内容、お支払いについてご案内します。",
  alternates: { canonical: "/tokushoho/" },
};

type Row = { label: string; value: string };

const rows: Row[] = [
  { label: "販売事業者", value: company.name },
  { label: "運営責任者", value: "事前相談時にご案内します" },
  {
    label: "所在地",
    value: `〒${company.postal} ${company.address}`,
  },
  { label: "電話番号", value: company.phone },
  { label: "メールアドレス", value: company.email },
  { label: "受付時間", value: company.hours },
  {
    label: "取扱サービス",
    value:
      "葬儀・告別式の請負(家族葬・一日葬・直葬ほか)、事前相談・葬儀プランのご案内、斎場・式場の運営、搬送・ご安置のサポート、宗教者の手配、法要・アフターサポート、川口市民葬制度の活用ご案内",
  },
  {
    label: "販売価格",
    value:
      "葬儀の内容(形式、参列人数、式場、お料理・返礼品、宗教者の有無、ご安置日数 など)により異なります。個別にお見積りをご案内します。",
  },
  {
    label: "代金の支払方法",
    value:
      "現金、銀行振込、クレジットカードなど。詳細は事前相談時にご案内します。",
  },
  {
    label: "代金の支払時期",
    value:
      "葬儀終了後、お見積りに基づくお支払いとなります。具体的な期日はご相談時にご案内します。",
  },
  {
    label: "役務の提供時期",
    value:
      "ご依頼内容、葬儀日程、ご安置場所、斎場のご都合に応じて手配・実施します。",
  },
  {
    label: "返品・キャンセル",
    value:
      "葬儀の性質上、ご手配開始後のキャンセルについては個別にご相談を承ります。やむを得ない事情によるご変更は、可能な限り柔軟に対応いたします。詳細は事前相談時にご案内します。",
  },
  {
    label: "加盟団体",
    value: "事前相談時にご案内します",
  },
];

export default function TokushohoPage() {
  return (
    <>
      <PageHero
        eyebrow="Notation"
        subLabel="特定商取引法に基づく表記"
        title={<>事業者情報の表記。</>}
        description={
          <p>
            本ページは、特定商取引法第11条の表示事項に準じて、当社のサービス提供条件についてご案内するものです。葬儀の手配・事前相談は、原則としてお電話・対面でのお打合せにより進めます。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "特定商取引法に基づく表記" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <dl className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[auto_1fr] gap-x-6 px-5 py-4 md:grid-cols-[200px_1fr] md:px-8 md:py-5 ${
                  i > 0 ? "border-t border-line-soft" : ""
                }`}
              >
                <dt className="text-sm font-semibold text-ink-soft md:text-base">
                  {row.label}
                </dt>
                <dd className="text-base leading-7 text-ink-deep md:text-lg md:leading-8">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-6 text-ink-soft md:text-sm md:leading-7">
            ※ 本表記は、当社のサービスをご利用いただく方への一般的なご案内です。具体的なお見積り、お支払い条件、ご契約内容については、事前のご相談・お打合せでご案内します。
          </p>
        </div>
      </section>
    </>
  );
}
