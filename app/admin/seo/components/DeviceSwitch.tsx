import Link from "next/link";
import { type DeviceKey, DEVICE_OPTIONS, type RangeKey } from "@/lib/search-console/types";

type Props = {
  current: DeviceKey;
  range: RangeKey;
};

export function DeviceSwitch({ current, range }: Props) {
  return (
    <nav aria-label="デバイス切り替え" className="flex flex-wrap gap-2">
      {DEVICE_OPTIONS.map((opt) => {
        const isActive = opt.key === current;
        const params = new URLSearchParams();
        params.set("range", range);
        if (opt.key !== "all") params.set("device", opt.key);
        return (
          <Link
            key={opt.key}
            href={`/admin/seo/?${params.toString()}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full border border-brand-deep bg-brand-deep px-3 py-1 text-xs text-white"
                : "rounded-full border border-line bg-white px-3 py-1 text-xs text-ink-mid hover:border-brand-soft hover:text-brand-deep"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </nav>
  );
}
