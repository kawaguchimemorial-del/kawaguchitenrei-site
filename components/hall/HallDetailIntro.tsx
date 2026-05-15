import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { Hall } from "@/lib/halls";

export function HallDetailIntro({ hall }: { hall: Hall }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "斎場・ホール", href: "/hall/" },
              { label: hall.name },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Hall
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              自社ホール
            </p>
            <h1 className="font-serif-jp mt-4 text-[2.4rem] font-medium leading-[1.3] text-ink-deep md:text-[3rem]">
              {hall.name}
            </h1>
            <p className="mt-5 text-base font-semibold text-brand md:text-lg">
              {hall.intro}
            </p>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {hall.description}
            </p>

            <div className="mt-7 hidden gap-3 sm:grid-cols-[1.2fr_1fr] md:grid">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <span aria-hidden>☎</span>
                電話で相談する
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                見学を予約する
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-warm shadow-[0_24px_70px_rgba(26,42,35,0.12)] md:aspect-[5/6]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-deep/55 via-ink-deep/0 p-5 text-white md:p-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                    Memorial Hall
                  </p>
                  <p className="mt-1 text-base font-bold leading-tight md:text-lg">
                    {hall.shortName}
                  </p>
                </div>
                <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink-deep">
                  西新井宿
                </span>
              </div>
              <div className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-semibold text-ink-mid/70">
                [ホール外観の写真]
              </div>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-ink-mid">
              <span>
                〒{hall.postal}　{hall.address}
              </span>
              <a href="#access" className="font-bold text-brand hover:underline">
                アクセスを見る →
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
