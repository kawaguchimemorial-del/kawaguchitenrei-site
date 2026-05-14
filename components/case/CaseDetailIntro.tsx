import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { CaseRecord } from "@/lib/cases";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export function CaseDetailIntro({ caseItem }: { caseItem: CaseRecord }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "施行事例", href: "/case/" },
              { label: caseItem.title },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Case
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              施行事例
            </p>
            <h1 className="font-serif-jp mt-4 text-[2rem] font-medium leading-[1.35] text-ink-deep md:text-[2.6rem] md:leading-[1.3]">
              {caseItem.title}
            </h1>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg md:leading-10">
              {caseItem.summary}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
              <time dateTime={caseItem.publishedAt}>
                {formatDate(caseItem.publishedAt)} 公開
              </time>
              <span aria-hidden>·</span>
              <span>{caseItem.area}</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <span aria-hidden>☎</span>
                電話で相談する
              </a>
              <a
                href="/estimate/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
              >
                同様の概算を相談する
                <span aria-hidden>→</span>
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-deep bg-white px-6 py-4 text-base font-bold text-ink-deep transition hover:bg-cool"
              >
                事前相談する
              </a>
            </div>
          </div>

          <aside
            aria-label={`${caseItem.title}の概要`}
            className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              事例サマリー
            </p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 text-sm">
              <dt className="text-ink-soft">形式</dt>
              <dd className="font-semibold text-ink-deep">{caseItem.format}</dd>
              <dt className="text-ink-soft">参列人数</dt>
              <dd className="font-semibold text-ink-deep">{caseItem.people}</dd>
              <dt className="text-ink-soft">式場</dt>
              <dd className="font-semibold text-ink-deep">{caseItem.hall}</dd>
              <dt className="text-ink-soft">火葬場</dt>
              <dd className="font-semibold text-ink-deep">
                {caseItem.cremation}
              </dd>
              <dt className="text-ink-soft">宗教形式</dt>
              <dd className="font-semibold text-ink-deep">
                {caseItem.religion}
              </dd>
              <dt className="text-ink-soft">エリア</dt>
              <dd className="font-semibold text-ink-deep">{caseItem.area}</dd>
              <dt className="self-baseline text-ink-soft">総額</dt>
              <dd className="font-serif-jp text-2xl font-medium text-brand">
                {caseItem.total}
              </dd>
            </dl>

            <p className="mt-5 text-xs leading-6 text-ink-soft">
              ※ 総額は事例当時のもので、内容により変動します。同様の構成での概算金額はお電話または概算フォームでご確認いただけます。
            </p>
          </aside>
        </div>

        <figure className="mt-10">
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg border border-line bg-warm shadow-[0_24px_70px_rgba(26,42,35,0.12)]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#e8e1d2_0_10px,transparent_10px_22px)]"
            />
            <div className="relative z-10 text-sm font-semibold text-ink-soft">
              [メイン写真：祭壇／式場の様子]
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
