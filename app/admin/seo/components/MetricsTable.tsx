import type { MetricsRow } from "@/lib/search-console/types";

type Props = {
  title: string;
  description?: string;
  labelHeader: string;
  rows: MetricsRow[];
  emptyMessage?: string;
};

const PLACEHOLDER = "—";

function fmtInt(n: number | null): string {
  if (n === null) return PLACEHOLDER;
  return n.toLocaleString("ja-JP");
}

function fmtPercent(n: number | null): string {
  if (n === null) return PLACEHOLDER;
  return `${(n * 100).toFixed(2)}%`;
}

function fmtPosition(n: number | null): string {
  if (n === null) return PLACEHOLDER;
  return n.toFixed(1);
}

export function MetricsTable({
  title,
  description,
  labelHeader,
  rows,
  emptyMessage = "データがありません",
}: Props) {
  return (
    <section className="rounded-lg border border-line bg-white">
      <header className="border-b border-line-soft px-4 py-3 md:px-5">
        <h2 className="font-serif-jp text-base text-ink-deep md:text-lg">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs text-ink-soft">{description}</p>
        ) : null}
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line-soft text-xs text-ink-soft">
              <th className="px-4 py-2 text-left font-normal md:px-5">{labelHeader}</th>
              <th className="px-3 py-2 text-right font-normal">クリック</th>
              <th className="px-3 py-2 text-right font-normal">表示回数</th>
              <th className="px-3 py-2 text-right font-normal">CTR</th>
              <th className="px-3 py-2 text-right font-normal md:px-5">平均順位</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-ink-soft">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={`${row.label}-${i}`}
                  className="border-b border-line-soft last:border-b-0"
                >
                  <td className="px-4 py-2 text-ink md:px-5">
                    <span className="block max-w-[420px] truncate" title={row.label}>
                      {row.label}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink">
                    {fmtInt(row.clicks)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-mid">
                    {fmtInt(row.impressions)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-mid">
                    {fmtPercent(row.ctr)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-mid md:px-5">
                    {fmtPosition(row.position)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
