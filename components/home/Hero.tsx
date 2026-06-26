import Image from "next/image";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
} from "@/components/common/icons";

// 価格は §9 正本のみ・税込明記。割引/最安などの断定はしない（§14）。
const priceLine = "直葬 139,000円〜（事前相談会員価格・税込）";

const trustPoints = [
  "川口市めぐりの森まで車で約5分",
  "駐車場70台の自社式場",
  "直葬〜一般葬まで対応",
  "創業20年・年間約260件",
  priceLine,
];

const mobileTrustPoints = [
  "川口市めぐりの森まで車で約5分",
  "駐車場70台の自社式場",
  "直葬〜一般葬まで対応",
  priceLine,
];

// FV直下の E-E-A-T バッジ列（すべて事実ベース・誇張なし §11）。
const eeatBadges = [
  "創業20年",
  "年間約260件",
  "川口市民葬 登録",
  "葬祭ディレクター在籍",
  "駐車場70台",
  "めぐりの森 車5分",
];

// FV画像：PC・モバイル共通の実写（川口メモリアルホール外観・最適化済み）
const heroImage = "/images/home/hero/hall-exterior-hero.jpg";

export function Hero() {
  return (
    <section className="bg-paper">
      {/* スマホ用FV：画像先行型（現状維持） */}
      <div className="md:hidden">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-warm">
            <Image
              src={heroImage}
              alt="川口メモリアルホールの外観（埼玉県川口市西新井宿）"
              fill
              sizes="100vw"
              priority
              className="hero-image-fade object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-ink-deep/30 via-ink-deep/15 to-ink-deep/90"
            />
            <div className="absolute inset-x-0 top-0 px-5 pt-5">
              <p className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-brand">
                川口市・新井宿の皆様へ
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-white">
              <h1 className="font-serif-jp text-[1.55rem] font-medium leading-[1.4] [text-shadow:_0_2px_12px_rgba(0,0,0,0.35)]">
                川口市・新井宿で
                <br />
                家族葬・直葬をお考えの方へ。
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/95 [text-shadow:_0_1px_8px_rgba(0,0,0,0.35)]">
                急なお迎えから費用のご相談まで
                <br />
                地元川口の葬儀社が24時間対応します
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 pt-6 pb-8">
          <ul className="space-y-2.5 text-sm font-semibold text-ink">
            {mobileTrustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand text-white"
                >
                  <CheckIcon className="h-3 w-3" strokeWidth={2.4} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a
            href="tel:0120-963-765"
            className="mt-6 flex items-center justify-between gap-3 rounded-lg bg-emergency px-5 py-3.5 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
              >
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-base font-bold leading-tight">
                  電話する
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold tracking-wider text-white/85">
                  24時間365日 受付
                </span>
              </span>
            </span>
            <ArrowRightIcon className="h-5 w-5 text-white/80" />
          </a>
          <a
            href="/contact/"
            className="mt-3 block rounded-lg border border-line bg-white px-5 py-3.5 text-center text-base font-bold text-ink-deep transition hover:border-brand hover:text-brand"
          >
            事前相談する
          </a>

          <p className="mt-3 text-center text-[12px] leading-5 text-ink-mid">
            ご相談・お見積りは無料です。お見積りだけでも、無理な勧誘はいたしません。
          </p>

          <div className="mt-4 text-center">
            <a
              href="/plan/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mid transition hover:text-brand hover:underline"
            >
              <ArrowRightIcon className="h-4 w-4" />
              プラン・費用の目安を見る
            </a>
          </div>

          <p className="mt-5 text-[13px] leading-6 text-ink-mid">
            創業20年・年間約260件の施行実績／川口市西新井宿の自社式場
          </p>
        </div>
      </div>

      {/* PC用FV：文字 → 全幅画像 → CTA×2 の縦構成 */}
      <div className="hidden md:block">
        {/* 文字 */}
        <div className="mx-auto max-w-6xl px-8 pt-16 pb-8 text-center">
          <p className="text-sm font-bold tracking-[0.02em] text-brand">
            川口市・新井宿の皆様へ
          </p>
          {/* h1 はスマホ側に1つ。PC側は見出し風テキスト（p）にして h1 の二重出力を回避 */}
          <p className="font-serif-jp mx-auto mt-4 max-w-3xl text-[2.3rem] font-medium leading-[1.32] text-ink-deep">
            川口市・新井宿で、家族葬・直葬をお考えの方へ。
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-mid">
            急なお迎えから費用のご相談まで、地元川口の葬儀社が24時間対応します。川口市西新井宿の自社式場 ／ 創業20年・年間約260件の施行実績。
          </p>
        </div>

        {/* 全幅画像（横長バナー・看板が残るよう上寄りクロップ） */}
        <figure className="relative w-full">
          <div className="relative h-[clamp(260px,42vh,460px)] w-full overflow-hidden bg-warm">
            <Image
              src={heroImage}
              alt="川口メモリアルホールの外観（埼玉県川口市西新井宿）"
              fill
              sizes="100vw"
              priority
              className="hero-image-fade object-cover object-[center_45%]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-deep/45 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0">
              <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-8 pb-5 text-white">
                <span className="text-base font-bold [text-shadow:_0_1px_8px_rgba(0,0,0,0.45)]">
                  川口メモリアルホール（川口市西新井宿）
                </span>
                <a
                  href="#access"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-ink-deep transition hover:bg-white"
                >
                  アクセスを見る
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </figcaption>
          </div>
        </figure>

        {/* 信頼ポイント ＋ CTA×2（電話・事前相談） */}
        <div className="mx-auto max-w-6xl px-8 pt-8 pb-14">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.95rem] font-semibold text-ink">
            {trustPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
                <span className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                  />
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-[1.2fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="group flex items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15"
              >
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  電話で相談する
                </span>
                <span className="mt-1 block text-xs font-semibold tracking-wider text-white/85">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/contact/"
              className="flex items-center justify-center rounded-lg border border-ink-deep bg-white px-6 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-cool"
            >
              事前相談する
            </a>
          </div>
          <p className="mt-4 text-center text-sm leading-6 text-ink-mid">
            ご相談・お見積りは無料です。お見積りだけでも、無理な勧誘はいたしません。
          </p>
        </div>
      </div>

      {/* FV直下：E-E-A-T バッジ列（控えめ・既存の丸ピン意匠に合わせる） */}
      <div className="border-t border-line-soft bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 md:px-8 md:py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 md:justify-start">
            {eeatBadges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink-mid md:text-xs"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
