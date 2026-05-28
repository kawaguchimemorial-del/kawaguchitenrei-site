"use client";

import { useActionState, useEffect } from "react";
import { submitSurvey, type SurveyFormState } from "./actions";

const GOOGLE_REVIEW_URL = "https://g.page/r/CW_iqAgygutwEAE/review";

const funeralPlanOptions = [
  { value: "direct", label: "直葬" },
  { value: "cremation", label: "火葬式" },
  { value: "oneday", label: "一日葬" },
  { value: "family", label: "家族葬" },
  { value: "general", label: "一般葬" },
  { value: "citizen", label: "市民葬" },
  { value: "other", label: "その他" },
];

const hallOptions = [
  { value: "kawaguchi-memorial-hall", label: "川口メモリアルホール" },
  { value: "megurinomori", label: "めぐりの森" },
  { value: "toda", label: "戸田斎場" },
  { value: "yatsuka", label: "谷塚斎場" },
  { value: "other", label: "その他" },
];

const totalCostOptions = [
  { value: "under-10", label: "10万円未満" },
  { value: "10-20", label: "10万円〜20万円未満" },
  { value: "20-30", label: "20万円〜30万円未満" },
  { value: "30-50", label: "30万円〜50万円未満" },
  { value: "50-80", label: "50万円〜80万円未満" },
  { value: "80-100", label: "80万円〜100万円未満" },
  { value: "100-150", label: "100万円〜150万円未満" },
  { value: "150-200", label: "150万円〜200万円以下" },
  { value: "over-200", label: "200万円を超える" },
  { value: "no-answer", label: "覚えていない / 回答しない" },
];

const costExplanationOptions = [
  { value: "very-clear", label: "とてもわかりやすかった" },
  { value: "clear", label: "わかりやすかった" },
  { value: "neutral", label: "普通" },
  { value: "slightly-unclear", label: "少しわかりにくかった" },
  { value: "unclear", label: "わかりにくかった" },
];

const starOptions = [
  { value: "5", label: "5 とても満足" },
  { value: "4", label: "4 満足" },
  { value: "3", label: "3 普通" },
  { value: "2", label: "2 やや不満" },
  { value: "1", label: "1 不満" },
];

const publishPermissionOptions = [
  { value: "anonymous-ok", label: "匿名で掲載してよい" },
  { value: "review-then-ok", label: "内容を確認したうえで掲載してよい" },
  { value: "no", label: "掲載しない" },
];

const costPublishPermissionOptions = [
  { value: "publish-ok", label: "掲載してよい" },
  { value: "publish-mask", label: "金額は伏せれば掲載してよい" },
  { value: "no", label: "掲載しない" },
];

const inputBase =
  "block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink-deep transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 text-sm font-semibold text-emergency" role="alert">
      {message}
    </p>
  );
}

function Required() {
  return (
    <span aria-hidden className="ml-1 text-emergency">
      *
    </span>
  );
}

type RadioGroupProps = {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  helpText?: string;
  columns?: 1 | 2 | 3;
};

function RadioGroup({
  name,
  legend,
  options,
  required,
  error,
  helpText,
  columns = 2,
}: RadioGroupProps) {
  const gridClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "";
  return (
    <fieldset>
      <legend className="text-sm font-bold text-ink-deep">
        {legend}
        {required && <Required />}
      </legend>
      {helpText && (
        <p className="mt-1 text-xs leading-6 text-ink-soft">{helpText}</p>
      )}
      <div className={`mt-3 grid gap-2 ${gridClass}`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-base font-semibold text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:checked]:text-brand-deep"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              required={required}
              className="h-4 w-4 accent-brand"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
        {index}
      </p>
      <h2 className="font-serif-jp mt-1 text-lg font-medium text-ink-deep md:text-xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-7 text-ink-mid">{description}</p>
      )}
    </div>
  );
}

function ThankYouPanel() {
  return (
    <section
      aria-labelledby="survey-thanks-heading"
      className="rounded-lg border-2 border-brand bg-white p-8 shadow-sm md:p-10"
    >
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
        Thank You
      </p>
      <h2
        id="survey-thanks-heading"
        className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl"
      >
        アンケートのご協力、誠にありがとうございます。
      </h2>
      <div className="mt-6 space-y-4 text-base leading-9 text-ink-mid md:text-lg">
        <p>いただいた内容は、今後のサービス改善の参考にさせていただきます。</p>
        <p>
          よろしければ、Google の口コミにもご投稿いただけますと、川口市周辺で葬儀社を探されている方の参考になります。
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-line-soft bg-paper px-5 py-4 text-sm leading-7 text-ink-mid">
        <ul className="space-y-1.5">
          <li>・投稿は任意です。</li>
          <li>・評価や内容の指定はございません。</li>
          <li>・実際にご利用いただいたご感想を、そのままお書きください。</li>
        </ul>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep"
        >
          Google口コミを投稿する
          <span aria-hidden>↗</span>
        </a>
        <a
          href="/"
          className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-cool"
        >
          トップページへ戻る
        </a>
      </div>
    </section>
  );
}

export function SurveyForm() {
  const [state, formAction, pending] = useActionState<
    SurveyFormState,
    FormData
  >(submitSurvey, null);

  useEffect(() => {
    if (state?.ok) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [state?.ok]);

  if (state?.ok) {
    return <ThankYouPanel />;
  }

  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-10"
    >
      <div className="rounded-lg border border-line-soft bg-cool px-5 py-4 text-sm leading-7 text-ink-mid">
        このアンケートは、今後のサービス改善のために使用いたします。お名前やご連絡先は任意です。サイト掲載をご希望いただいた場合も、個人が特定されないよう内容を確認したうえで掲載いたします。
      </div>

      {state?.message && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-emergency bg-emergency/5 px-5 py-4 text-sm font-semibold text-emergency-deep"
        >
          {state.message}
        </div>
      )}

      <div className="mt-8 space-y-10">
        <section>
          <SectionHeading index="01" title="ご葬儀の内容について" />
          <div className="space-y-6">
            <RadioGroup
              name="funeralPlan"
              legend="ご利用いただいた葬儀内容"
              options={funeralPlanOptions}
              required
              error={errors.funeralPlan}
              columns={2}
            />
            <RadioGroup
              name="hall"
              legend="ご利用斎場"
              options={hallOptions}
              required
              error={errors.hall}
              columns={2}
            />
          </div>
        </section>

        <section>
          <SectionHeading index="02" title="費用について" />
          <div className="space-y-6">
            <RadioGroup
              name="totalCostRange"
              legend="葬儀費用の総額"
              options={totalCostOptions}
              required
              error={errors.totalCostRange}
              columns={2}
              helpText="ご記憶の範囲で結構です。"
            />
            <RadioGroup
              name="costExplanationRating"
              legend="葬儀費用や追加費用の説明はわかりやすかったですか？"
              options={costExplanationOptions}
              required
              error={errors.costExplanationRating}
              columns={2}
            />
          </div>
        </section>

        <section>
          <SectionHeading index="03" title="ご満足度の評価" />
          <div className="space-y-6">
            <RadioGroup
              name="staffRating"
              legend="スタッフの対応はいかがでしたか？"
              options={starOptions}
              required
              error={errors.staffRating}
              columns={2}
            />
            <RadioGroup
              name="ceremonyRating"
              legend="葬儀の進行はいかがでしたか？"
              options={starOptions}
              required
              error={errors.ceremonyRating}
              columns={2}
            />
            <RadioGroup
              name="overallRating"
              legend="総合的な満足度を教えてください"
              options={starOptions}
              required
              error={errors.overallRating}
              columns={2}
            />
          </div>
        </section>

        <section>
          <SectionHeading
            index="04"
            title="ご感想"
            description="率直にお書きいただけますと、サービス改善の参考になります。"
          />
          <div className="space-y-6">
            <div>
              <label htmlFor="goodPoints" className="block">
                <span className="text-sm font-bold text-ink-deep">
                  よかった点があればご記入ください
                  <Required />
                </span>
              </label>
              <textarea
                id="goodPoints"
                name="goodPoints"
                rows={5}
                required
                aria-invalid={Boolean(errors.goodPoints)}
                className={`mt-2 resize-y ${inputBase} ${
                  errors.goodPoints ? "border-emergency" : "border-line"
                }`}
              />
              <FieldError message={errors.goodPoints} />
            </div>

            <div>
              <label htmlFor="improvementPoints" className="block">
                <span className="text-sm font-bold text-ink-deep">
                  改善してほしい点があればご記入ください
                  <Required />
                </span>
              </label>
              <textarea
                id="improvementPoints"
                name="improvementPoints"
                rows={5}
                required
                aria-invalid={Boolean(errors.improvementPoints)}
                className={`mt-2 resize-y ${inputBase} ${
                  errors.improvementPoints ? "border-emergency" : "border-line"
                }`}
              />
              <FieldError message={errors.improvementPoints} />
            </div>

            <div>
              <label htmlFor="costComment" className="block">
                <span className="text-sm font-bold text-ink-deep">
                  費用について、よかった点・わかりにくかった点があればご記入ください
                  <span className="ml-2 text-xs font-semibold text-ink-soft">
                    (任意)
                  </span>
                </span>
              </label>
              <textarea
                id="costComment"
                name="costComment"
                rows={4}
                aria-invalid={Boolean(errors.costComment)}
                className={`mt-2 resize-y ${inputBase} ${
                  errors.costComment ? "border-emergency" : "border-line"
                }`}
              />
              <FieldError message={errors.costComment} />
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            index="05"
            title="サイト掲載について"
            description="ご感想や費用に関するコメントを、川口典礼の公式サイトに掲載してもよろしいか教えてください。"
          />
          <div className="space-y-6">
            <RadioGroup
              name="publishPermission"
              legend="ご感想を川口典礼サイトに掲載してもよろしいですか？"
              options={publishPermissionOptions}
              required
              error={errors.publishPermission}
              columns={1}
            />
            <RadioGroup
              name="costPublishPermission"
              legend="費用に関する感想を掲載してもよろしいですか？"
              options={costPublishPermissionOptions}
              required
              error={errors.costPublishPermission}
              columns={1}
            />
          </div>
        </section>

        <section>
          <SectionHeading
            index="06"
            title="お名前・ご連絡先（任意）"
            description="ご連絡が必要な場合がございましたら、ご記入ください。掲載時には個別にご確認いたします。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block">
                <span className="text-sm font-bold text-ink-deep">
                  お名前
                  <span className="ml-2 text-xs font-semibold text-ink-soft">
                    (任意)
                  </span>
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className={`mt-2 ${inputBase} ${
                  errors.name ? "border-emergency" : "border-line"
                }`}
              />
              <FieldError message={errors.name} />
            </div>

            <div>
              <label htmlFor="contact" className="block">
                <span className="text-sm font-bold text-ink-deep">
                  ご連絡先
                  <span className="ml-2 text-xs font-semibold text-ink-soft">
                    (任意)
                  </span>
                </span>
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                inputMode="text"
                placeholder="電話番号またはメールアドレス"
                aria-invalid={Boolean(errors.contact)}
                className={`mt-2 ${inputBase} ${
                  errors.contact ? "border-emergency" : "border-line"
                }`}
              />
              <FieldError message={errors.contact} />
            </div>
          </div>
        </section>

        <section>
          <SectionHeading index="07" title="その他、ご意見・ご要望（任意）" />
          <div>
            <label htmlFor="otherComment" className="sr-only">
              その他、ご意見・ご要望
            </label>
            <textarea
              id="otherComment"
              name="otherComment"
              rows={4}
              aria-invalid={Boolean(errors.otherComment)}
              className={`resize-y ${inputBase} ${
                errors.otherComment ? "border-emergency" : "border-line"
              }`}
            />
            <FieldError message={errors.otherComment} />
          </div>
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-ink-soft sm:max-w-md">
          ※ いただいた内容は、社内のサービス改善の目的で使用いたします。
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "送信中..." : "アンケートを送信する"}
          {!pending && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
