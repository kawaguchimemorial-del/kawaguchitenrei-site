import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/common/Breadcrumbs";

type Props = {
  eyebrow: string;
  subLabel?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
};

export function PageHero({
  eyebrow,
  subLabel,
  title,
  description,
  breadcrumbs,
}: Props) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
          {eyebrow}
        </p>
        {subLabel && (
          <p className="mt-2 text-sm font-semibold text-ink-mid">{subLabel}</p>
        )}
        <h1 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.6rem]">
          {title}
        </h1>
        {description && (
          <div className="mt-5 max-w-3xl text-base leading-9 text-ink-mid md:text-lg">
            {description}
          </div>
        )}
      </div>
    </section>
  );
}
