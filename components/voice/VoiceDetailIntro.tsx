import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { Voice } from "@/lib/voices";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export function VoiceDetailIntro({ voice }: { voice: Voice }) {
  return (
    <section className="border-b border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 md:px-8 md:pt-12 md:pb-20">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "お客様の声", href: "/voice/" },
              { label: voice.title },
            ]}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Voice
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              お客様の声
            </p>

            <figure className="mt-7">
              <span
                aria-hidden
                className="font-serif-jp block text-[5rem] leading-none text-brand/30 md:text-[7rem]"
              >
                「
              </span>
              <blockquote className="font-serif-jp -mt-6 text-[1.8rem] font-medium leading-[1.6] text-ink-deep md:-mt-10 md:text-[2.4rem] md:leading-[1.55]">
                {voice.title}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm text-ink-mid">
                <span className="font-semibold">— {voice.family}</span>
                <span aria-hidden>·</span>
                <time dateTime={voice.publishedAt}>
                  {formatDate(voice.publishedAt)}
                </time>
              </figcaption>
            </figure>

            <p className="mt-7 rounded-lg border-l-2 border-brand bg-white px-5 py-5 text-base leading-9 text-ink-mid shadow-sm md:text-lg md:leading-10">
              {voice.quote}
            </p>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:flex-wrap md:flex">
              <a
                href="tel:0120-963-765"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-emergency-deep"
              >
                <span aria-hidden>☎</span>
                電話で相談する
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
            aria-label="ご利用内容"
            className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              ご利用内容
            </p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 text-sm">
              <dt className="text-ink-soft">形式</dt>
              <dd className="font-semibold text-ink-deep">{voice.format}</dd>
              <dt className="text-ink-soft">参列人数</dt>
              <dd className="font-semibold text-ink-deep">{voice.people}</dd>
              <dt className="text-ink-soft">施行場所</dt>
              <dd className="font-semibold text-ink-deep">{voice.hall}</dd>
              <dt className="text-ink-soft">エリア</dt>
              <dd className="font-semibold text-ink-deep">{voice.area}</dd>
              {voice.staff && (
                <>
                  <dt className="text-ink-soft">担当</dt>
                  <dd className="font-semibold text-ink-deep">{voice.staff}</dd>
                </>
              )}
              <dt className="self-baseline text-ink-soft">総額</dt>
              <dd className="font-serif-jp text-2xl font-medium text-brand">
                {voice.total}
              </dd>
            </dl>

            <p className="mt-5 text-xs leading-6 text-ink-soft">
              ※ 個人情報を確認・マスキングしたうえで、ご家族の許可を得て掲載しています。
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
