"use client";

import { useActionState, useEffect } from "react";
import { submitEstimate, type EstimateFormState } from "./actions";

const formatOptions = [
  { value: "direct-funeral", label: "直葬" },
  { value: "hanaire-owakare", label: "花入れお別れ" },
  { value: "oneday-funeral", label: "一日葬" },
  { value: "family-funeral", label: "家族葬" },
  { value: "kawaguchi-shimin", label: "川口市民葬" },
];

const peopleOptions = [
  { value: "1-5", label: "5名まで" },
  { value: "6-10", label: "6〜10名" },
  { value: "11-30", label: "11〜30名" },
  { value: "31-50", label: "31〜50名" },
  { value: "51+", label: "51名以上" },
];

const hallOptions = [
  { value: "kawaguchi-memorial-hall", label: "川口メモリアルホール" },
  { value: "megurinomori", label: "川口市めぐりの森" },
  { value: "toda-sousaijo", label: "戸田葬祭場" },
  { value: "yatsuka-saijo", label: "谷塚斎場" },
  { value: "undecided", label: "未定 / 相談したい" },
];

const placementOptions = [
  { value: "home", label: "ご自宅" },
  { value: "hall", label: "ホール安置" },
  { value: "other", label: "その他 / 相談したい" },
];

const religionOptions = [
  { value: "needed", label: "必要" },
  { value: "none", label: "不要" },
  { value: "undecided", label: "未定 / 相談したい" },
];

const yesNoUndecided = [
  { value: "needed", label: "必要" },
  { value: "none", label: "不要" },
  { value: "undecided", label: "未定" },
];

const flowerOptions = [
  { value: "standard", label: "標準" },
  { value: "upgrade", label: "グレードアップ" },
  { value: "none", label: "不要" },
];

const citizenOptions = [
  { value: "yes", label: "川口市民" },
  { value: "no", label: "市外" },
  { value: "unknown", label: "わからない" },
];

const contactOptions = [
  { value: "phone", label: "電話" },
  { value: "email", label: "メール" },
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

type Option = { value: string; label: string };

function RadioCard({
  name,
  options,
  error,
}: {
  name: string;
  options: Option[];
  error?: string;
}) {
  return (
    <>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-base font-semibold text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:checked]:text-brand-deep"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              required
              className="h-4 w-4 accent-brand"
            />
            {opt.label}
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </>
  );
}

function RadioPill({
  name,
  options,
  error,
}: {
  name: string;
  options: Option[];
  error?: string;
}) {
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:checked]:text-brand-deep md:text-base"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              required
              className="h-4 w-4 accent-brand"
            />
            {opt.label}
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </>
  );
}

export function EstimateForm() {
  const [state, formAction, pending] = useActionState<
    EstimateFormState,
    FormData
  >(submitEstimate, null);

  useEffect(() => {
    if (state?.ok) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [state?.ok]);

  if (state?.ok && state.summary) {
    const s = state.summary;
    return (
      <section
        aria-labelledby="estimate-success-heading"
        className="rounded-lg border-2 border-brand bg-white p-6 shadow-sm md:p-10"
      >
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
          Received
        </p>
        <h2
          id="estimate-success-heading"
          className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl"
        >
          概算のご依頼を受け付けました。
        </h2>
        <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
          {state.message}
        </p>

        <div className="mt-7 rounded-lg border border-line-soft bg-paper p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
            ご入力内容
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-sm md:grid-cols-2">
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">葬儀形式</dt>
              <dd className="font-semibold text-ink-deep">{s.format}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">参列人数</dt>
              <dd className="font-semibold text-ink-deep">{s.people}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">斎場</dt>
              <dd className="font-semibold text-ink-deep">{s.hall}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">安置場所</dt>
              <dd className="font-semibold text-ink-deep">{s.placement}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">宗教者</dt>
              <dd className="font-semibold text-ink-deep">{s.religion}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">お料理</dt>
              <dd className="font-semibold text-ink-deep">{s.meals}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">返礼品</dt>
              <dd className="font-semibold text-ink-deep">{s.gifts}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">お花</dt>
              <dd className="font-semibold text-ink-deep">{s.flowers}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 text-ink-soft">市民区分</dt>
              <dd className="font-semibold text-ink-deep">{s.citizen}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 rounded-lg border border-line-soft bg-cool px-5 py-4 text-sm leading-7 text-ink-mid">
          ※ 概算金額は、安置日数、火葬場、式場使用料、料理、返礼品、宗教者、搬送距離などにより変動します。正式なお見積りはご担当者より個別にご案内します。
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
          <a
            href="tel:0120-963-765"
            className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
          >
            <span aria-hidden className="text-2xl">
              ☎
            </span>
            <span className="text-left">
              <span className="block text-base font-bold leading-tight">
                電話で詳しく相談する
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-white/90">
                24時間365日 受付
              </span>
            </span>
          </a>
          <a
            href="/contact/"
            className="rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep transition hover:bg-cool"
          >
            事前相談フォームへ
          </a>
        </div>
      </section>
    );
  }

  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-10"
    >
      {state?.message && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-emergency bg-emergency/5 px-5 py-4 text-sm font-semibold text-emergency-deep"
        >
          {state.message}
        </div>
      )}

      <div className="space-y-8">
        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            葬儀形式<Required />
          </legend>
          <RadioCard
            name="format"
            options={formatOptions}
            error={errors.format}
          />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            参列人数の目安<Required />
          </legend>
          <RadioPill
            name="people"
            options={peopleOptions}
            error={errors.people}
          />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            ご希望の斎場<Required />
          </legend>
          <RadioCard
            name="hall"
            options={hallOptions}
            error={errors.hall}
          />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            ご安置場所<Required />
          </legend>
          <RadioPill
            name="placement"
            options={placementOptions}
            error={errors.placement}
          />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            宗教者の有無<Required />
          </legend>
          <RadioPill
            name="religion"
            options={religionOptions}
            error={errors.religion}
          />
        </fieldset>

        <div className="grid gap-6 md:grid-cols-2">
          <fieldset>
            <legend className="text-sm font-bold text-ink-deep">
              お料理
            </legend>
            <RadioPill name="meals" options={yesNoUndecided} />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-ink-deep">
              返礼品
            </legend>
            <RadioPill name="gifts" options={yesNoUndecided} />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-ink-deep">
              お花の希望
            </legend>
            <RadioPill name="flowers" options={flowerOptions} />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-ink-deep">
              川口市民かどうか
            </legend>
            <RadioPill name="citizen" options={citizenOptions} />
          </fieldset>
        </div>

        <hr className="border-line-soft" />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="estimate-name" className="block">
              <span className="text-sm font-bold text-ink-deep">
                お名前<Required />
              </span>
            </label>
            <input
              id="estimate-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              className={`mt-2 ${inputBase} ${
                errors.name ? "border-emergency" : "border-line"
              }`}
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <label htmlFor="estimate-phone" className="block">
              <span className="text-sm font-bold text-ink-deep">
                電話番号<Required />
              </span>
            </label>
            <input
              id="estimate-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              placeholder="例: 090-1234-5678"
              className={`mt-2 ${inputBase} ${
                errors.phone ? "border-emergency" : "border-line"
              }`}
            />
            <FieldError message={errors.phone} />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="estimate-email" className="block">
              <span className="text-sm font-bold text-ink-deep">
                メールアドレス
                <span className="ml-2 text-xs font-semibold text-ink-soft">
                  (任意)
                </span>
              </span>
            </label>
            <input
              id="estimate-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              placeholder="例: yamada@example.com"
              className={`mt-2 ${inputBase} ${
                errors.email ? "border-emergency" : "border-line"
              }`}
            />
            <FieldError message={errors.email} />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            ご希望の連絡方法<Required />
          </legend>
          <RadioPill
            name="preferredContact"
            options={contactOptions}
            error={errors.preferredContact}
          />
        </fieldset>

        <div>
          <label htmlFor="estimate-note" className="block">
            <span className="text-sm font-bold text-ink-deep">
              その他ご希望・ご質問
              <span className="ml-2 text-xs font-semibold text-ink-soft">
                (任意)
              </span>
            </span>
          </label>
          <textarea
            id="estimate-note"
            name="note"
            rows={4}
            placeholder="気になる項目、特別なご希望、ご家族の状況などがあればお書きください。"
            className={`mt-2 resize-y ${inputBase} border-line`}
          />
        </div>

        <div className="rounded-lg border border-line-soft bg-cool p-5">
          <label className="flex items-start gap-3 text-sm leading-7 text-ink-deep">
            <input
              type="checkbox"
              name="consent"
              value="agreed"
              required
              aria-invalid={Boolean(errors.consent)}
              className="mt-1 h-5 w-5 accent-brand"
            />
            <span>
              <a
                href="/privacy/"
                className="font-bold text-brand hover:underline"
              >
                プライバシーポリシー
              </a>
              に同意のうえ、概算のご依頼を送信します。<Required />
            </span>
          </label>
          <FieldError message={errors.consent} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-ink-soft sm:max-w-md">
          ※ ご入力内容は正式な見積りではありません。ご担当者より概算金額をご連絡します。
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "送信中..." : "この内容で概算を依頼する"}
          {!pending && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
