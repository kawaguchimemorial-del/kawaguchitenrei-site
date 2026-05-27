import Link from "next/link";
import { type DeviceKey, type RangeKey, RANGE_OPTIONS } from "@/lib/search-console/types";

type Props = {
  current: RangeKey;
  device: DeviceKey;
};

export function RangeSwitch({ current, device }: Props) {
  return (
    <nav aria-label="期間切り替え" className="flex flex-wrap gap-2">
      {RANGE_OPTIONS.map((opt) => {
        const isActive = opt.key === current;
        const params = new URLSearchParams();
        params.set("range", opt.key);
        if (device !== "all") params.set("device", device);
        return (
          <Link
            key={opt.key}
            href={`/admin/seo/?${params.toString()}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full border border-brand bg-brand px-4 py-1.5 text-sm text-white"
                : "rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink-mid hover:border-brand-soft hover:text-brand-deep"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </nav>
  );
}
