import { DeviceSwitch } from "./components/DeviceSwitch";
import { MetricsTable } from "./components/MetricsTable";
import { RangeSwitch } from "./components/RangeSwitch";
import { loadDashboardData } from "@/lib/search-console/queries";
import {
  DEFAULT_DEVICE,
  DEFAULT_RANGE,
  type DeviceKey,
  type RangeKey,
} from "@/lib/search-console/types";

export const dynamic = "force-dynamic";

type SearchParams = {
  range?: string;
  device?: string;
};

function normalizeRange(value: string | undefined): RangeKey {
  if (value === "7d" || value === "28d" || value === "3m") return value;
  return DEFAULT_RANGE;
}

function normalizeDevice(value: string | undefined): DeviceKey {
  if (
    value === "all" ||
    value === "MOBILE" ||
    value === "DESKTOP" ||
    value === "TABLET"
  ) {
    return value;
  }
  return DEFAULT_DEVICE;
}

function formatJpDateTime(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${dd} ${hh}:${mm}`;
}

export default async function AdminSeoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const range = normalizeRange(sp.range);
  const device = normalizeDevice(sp.device);

  const data = await loadDashboardData(range, device);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-white px-4 py-4 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-ink-soft">対象期間</p>
            <p className="font-serif-jp text-base text-ink-deep">
              {data.startDate} 〜 {data.endDate}
            </p>
          </div>
          <p className="text-xs text-ink-soft">
            取得時刻 {formatJpDateTime(data.fetchedAt)}
            <span className="ml-2 rounded bg-paper px-2 py-0.5">
              キャッシュ最大6時間
            </span>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <RangeSwitch current={range} device={device} />
          <DeviceSwitch current={device} range={range} />
        </div>
        <p className="mt-3 text-xs text-ink-soft">
          ※ Search Console のデータは 2〜3 日遅延します。直近の日付は数値が確定していない場合があります。
        </p>
      </section>

      {data.ok ? (
        <>
          <MetricsTable
            title="重要キーワード（固定20件）"
            description="表示回数が GSC の閾値に満たないキーワードは「—」表示になります。"
            labelHeader="キーワード"
            rows={data.keywordRows}
          />
          <MetricsTable
            title="クエリ TOP 20"
            labelHeader="クエリ"
            rows={data.queryRows}
            emptyMessage="該当期間のクエリデータがありません"
          />
          <MetricsTable
            title="ページ TOP 20"
            labelHeader="URL"
            rows={data.pageRows}
            emptyMessage="該当期間のページデータがありません"
          />
        </>
      ) : (
        <section className="rounded-lg border border-line bg-white px-4 py-8 text-center md:px-5">
          <p className="text-sm text-ink">データを取得できませんでした。</p>
          <p className="mt-2 text-xs text-ink-soft">
            時間をおいて再度お試しください。問題が続く場合はサーバーログをご確認ください。
          </p>
        </section>
      )}
    </div>
  );
}
