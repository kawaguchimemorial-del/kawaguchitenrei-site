// 葬儀費用の「項目別内訳の目安」と「火葬場別の火葬料の目安」を表で示す共通コンポーネント。
// すべて目安であり、内容・人数・式場・火葬場により変動する旨を明記する（§14）。
// 禁止表現（総額確定・追加費用なし・最安・標準価格）は使わない。価格は §9 正本＋公開情報の範囲。

type BreakdownRow = { item: string; guide: string; note: string };

const breakdownRows: BreakdownRow[] = [
  {
    item: "プラン基本料金",
    guide: "直葬 139,000円〜／家族葬 528,000円〜（税込）",
    note: "事前相談会員価格。形式・内容により異なります。",
  },
  {
    item: "式場使用料",
    guide: "外部斎場の利用時に別途",
    note: "施設・規模・利用日数により変動します。",
  },
  {
    item: "火葬料",
    guide: "火葬場・市内/市外で異なる",
    note: "川口市めぐりの森は川口市民30,000円〜が目安。下表もご参照ください。",
  },
  {
    item: "ご搬送（お迎え・移動）",
    guide: "距離・回数により変動",
    note: "病院・施設・ご自宅からのお迎え、火葬場への移動など。",
  },
  {
    item: "ご安置（ドライアイス等）",
    guide: "ご安置日数により変動",
    note: "友引・火葬場の予約状況で日数が延びる場合があります。",
  },
  {
    item: "お料理・飲食",
    guide: "参列人数・内容により変動",
    note: "ご希望に応じてご手配します。",
  },
  {
    item: "返礼品",
    guide: "会葬者数により変動",
    note: "ご希望に応じてご手配します。",
  },
  {
    item: "宗教者へのお礼",
    guide: "宗派・お勤めにより変動",
    note: "宗教者を呼ばない形式（無宗教葬等）もご相談いただけます。",
  },
];

type CremationFeeRow = { facility: string; resident: string; nonResident: string };

const cremationFeeRows: CremationFeeRow[] = [
  {
    facility: "川口市めぐりの森（川口市営）",
    resident: "30,000円〜（大人12歳以上）",
    nonResident: "100,000円〜（大人12歳以上）",
  },
  {
    facility: "戸田葬祭場 ／ 谷塚斎場 ほか",
    resident: "施設・利用条件により異なります",
    nonResident: "施設・利用条件により異なります",
  },
];

export function CostBreakdownTable({ heading }: { heading?: string } = {}) {
  return (
    <div>
      {heading && (
        <h2 className="font-serif-jp text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.2rem]">
          {heading}
        </h2>
      )}

      {/* 項目別内訳の目安 */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm md:text-base">
          <caption className="sr-only">葬儀費用の項目別内訳の目安</caption>
          <thead>
            <tr className="bg-paper text-ink-deep">
              <th className="border-b border-line px-4 py-3 font-bold">項目</th>
              <th className="border-b border-line px-4 py-3 font-bold">目安</th>
              <th className="border-b border-line px-4 py-3 font-bold">補足（変動する要素）</th>
            </tr>
          </thead>
          <tbody>
            {breakdownRows.map((row) => (
              <tr key={row.item} className="align-top">
                <td className="border-b border-line-soft px-4 py-3 font-semibold text-ink-deep">
                  {row.item}
                </td>
                <td className="border-b border-line-soft px-4 py-3 text-ink-deep">
                  {row.guide}
                </td>
                <td className="border-b border-line-soft px-4 py-3 leading-7 text-ink-mid">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-6 text-ink-soft">
        ※ 上記はいずれも目安です。プランに含まれる項目・別途必要になる項目は、葬儀形式・参列人数・式場・火葬場などにより異なります。総額の目安は正式なお見積りでご案内します。
      </p>

      {/* 火葬場別の火葬料の目安 */}
      <h3 className="mt-10 font-serif-jp text-xl font-medium text-ink-deep md:text-2xl">
        火葬場別の火葬料の目安
      </h3>
      <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm md:text-base">
          <caption className="sr-only">火葬場別の火葬料の目安</caption>
          <thead>
            <tr className="bg-paper text-ink-deep">
              <th className="border-b border-line px-4 py-3 font-bold">火葬場</th>
              <th className="border-b border-line px-4 py-3 font-bold">市内・該当者</th>
              <th className="border-b border-line px-4 py-3 font-bold">市外・非該当者</th>
            </tr>
          </thead>
          <tbody>
            {cremationFeeRows.map((row) => (
              <tr key={row.facility} className="align-top">
                <td className="border-b border-line-soft px-4 py-3 font-semibold text-ink-deep">
                  {row.facility}
                </td>
                <td className="border-b border-line-soft px-4 py-3 text-ink-deep">
                  {row.resident}
                </td>
                <td className="border-b border-line-soft px-4 py-3 text-ink-deep">
                  {row.nonResident}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-6 text-ink-soft">
        ※ 火葬料は各施設の定めにより変わる場合があります。川口市めぐりの森の料金は川口市の公開情報に基づく目安で、改定される場合があります。最新の料金・ご利用条件は各施設または川口典礼のご相談時にご確認ください。
      </p>
    </div>
  );
}
