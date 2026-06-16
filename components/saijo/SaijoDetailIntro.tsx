import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PhoneIcon } from "@/components/common/icons";
import type { Saijo } from "@/lib/saijo";

export function SaijoDetailIntro({ saijo }: { saijo: Saijo }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "斎場・ホール", href: "/saijo/" },
              { label: saijo.name },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Saijo
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              {saijo.type}
            </p>
            <h1 className="font-serif-jp mt-4 text-[2.3rem] font-medium leading-[1.3] text-ink-deep md:text-[2.9rem]">
              {saijo.h1 ? (
                saijo.h1.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))
              ) : (
                <>
                  {saijo.name}での
                  <br />
                  葬儀をお手伝いします。
                </>
              )}
            </h1>
            <p className="mt-5 text-base font-semibold text-brand md:text-lg">
              {saijo.intro}
            </p>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {saijo.description}
            </p>

            <div className="mt-7 hidden gap-3 sm:grid-cols-[1.2fr_1fr] md:grid">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <PhoneIcon className="h-4 w-4" />
                電話で相談する
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-5 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                事前相談する
              </a>
            </div>
          </div>

          <aside
            aria-label={`${saijo.name}の概要`}
            className="overflow-hidden rounded-lg border border-line bg-white shadow-sm"
          >
            {saijo.photos && saijo.photos[0] && (
              <div className="relative aspect-[16/9] w-full bg-warm">
                <Image
                  src={saijo.photos[0].src}
                  alt={saijo.photos[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                施設の概要
              </p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">
                    施設種別
                  </dt>
                  <dd className="text-base font-bold text-ink-deep">
                    {saijo.type}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">運営</dt>
                  <dd className="text-base font-bold text-ink-deep">
                    {saijo.operator}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">
                    川口典礼の対応形式
                  </dt>
                  <dd className="text-right text-sm font-bold text-ink-deep">
                    直葬・花入れお別れ
                    <br />
                    一日葬・家族葬
                  </dd>
                </div>
                <div className="border-b border-line-soft pb-4">
                  <dt className="text-sm font-semibold text-ink-soft">
                    川口典礼から
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-ink-mid">
                    {saijo.access.fromKawaguchi}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs leading-6 text-ink-soft">
                ※ ご利用の詳しい流れや、ご相談に応じた料金のお見積りは、事前のご相談時にご案内します。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
