"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "./actions";

const purposeOptions = [
  { value: "preconsult", label: "事前相談" },
  { value: "hall-visit", label: "ホール見学" },
  { value: "cost", label: "費用のご相談" },
  { value: "other", label: "その他" },
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

export function ContactForm() {
  const [state, formAction, pending] = useActionState<
    ContactFormState,
    FormData
  >(submitContact, null);

  if (state?.ok) {
    return (
      <section
        aria-labelledby="contact-success-heading"
        className="rounded-lg border-2 border-brand bg-white p-8 shadow-sm md:p-10"
      >
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
          Received
        </p>
        <h2
          id="contact-success-heading"
          className="font-serif-jp mt-3 text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl"
        >
          お問い合わせを受け付けました。
        </h2>
        <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
          {state.message}
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
                電話で確認する
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-white/90">
                24時間365日 受付
              </span>
            </span>
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

      <fieldset className="space-y-6">
        <legend className="sr-only">お客様情報</legend>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block">
              <span className="text-sm font-bold text-ink-deep">
                お名前<Required />
              </span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`mt-2 ${inputBase} ${
                errors.name ? "border-emergency" : "border-line"
              }`}
            />
            {errors.name && (
              <p id="name-error">
                <FieldError message={errors.name} />
              </p>
            )}
          </div>

          <div>
            <label htmlFor="nameKana" className="block">
              <span className="text-sm font-bold text-ink-deep">
                フリガナ
                <span className="ml-2 text-xs font-semibold text-ink-soft">
                  (任意)
                </span>
              </span>
            </label>
            <input
              id="nameKana"
              name="nameKana"
              type="text"
              className={`mt-2 ${inputBase} border-line`}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block">
              <span className="text-sm font-bold text-ink-deep">
                電話番号<Required />
              </span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="例: 090-1234-5678"
              className={`mt-2 ${inputBase} ${
                errors.phone ? "border-emergency" : "border-line"
              }`}
            />
            {errors.phone && (
              <p id="phone-error">
                <FieldError message={errors.phone} />
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block">
              <span className="text-sm font-bold text-ink-deep">
                メールアドレス<Required />
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="例: yamada@example.com"
              className={`mt-2 ${inputBase} ${
                errors.email ? "border-emergency" : "border-line"
              }`}
            />
            {errors.email && (
              <p id="email-error">
                <FieldError message={errors.email} />
              </p>
            )}
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            お問い合わせ種別<Required />
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {purposeOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-base font-semibold text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:checked]:text-brand-deep"
              >
                <input
                  type="radio"
                  name="purpose"
                  value={opt.value}
                  required
                  className="h-4 w-4 accent-brand"
                />
                {opt.label}
              </label>
            ))}
          </div>
          <FieldError message={errors.purpose} />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-ink-deep">
            ご希望の連絡方法<Required />
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {contactOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-base font-semibold text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:checked]:text-brand-deep"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={opt.value}
                  required
                  className="h-4 w-4 accent-brand"
                />
                {opt.label}
              </label>
            ))}
          </div>
          <FieldError message={errors.preferredContact} />
        </fieldset>

        <div>
          <label htmlFor="preferredTime" className="block">
            <span className="text-sm font-bold text-ink-deep">
              ご希望の連絡日時
              <span className="ml-2 text-xs font-semibold text-ink-soft">
                (任意)
              </span>
            </span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="例: 平日10:00〜17:00、◯月◯日午後など"
            className={`mt-2 ${inputBase} border-line`}
          />
        </div>

        <div>
          <label htmlFor="message" className="block">
            <span className="text-sm font-bold text-ink-deep">
              お問い合わせ内容<Required />
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="ご相談内容、ご質問、ご家族の状況などをお書きください。"
            className={`mt-2 resize-y ${inputBase} ${
              errors.message ? "border-emergency" : "border-line"
            }`}
          />
          {errors.message && (
            <p id="message-error">
              <FieldError message={errors.message} />
            </p>
          )}
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
              に同意のうえ、お問い合わせ内容を送信します。<Required />
            </span>
          </label>
          <FieldError message={errors.consent} />
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-ink-soft sm:max-w-md">
          ※ お急ぎの場合はフォームではなくお電話ください。フォームのご返信には数営業日いただく場合があります。
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "送信中..." : "この内容で送信する"}
          {!pending && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
