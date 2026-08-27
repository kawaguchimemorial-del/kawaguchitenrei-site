"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";

import { pushGenerateLead } from "@/lib/analytics";
import { SpamGuardFields } from "@/components/forms/SpamGuardFields";
import { PHONE_DISPLAY, PHONE_HREF } from "../lp-data";
import { submitLpContact, type LpContactFormState } from "./actions";

const inputBase =
  "block w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-ink-deep transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

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

export function LpContactForm() {
  const [state, formAction, pending] = useActionState<
    LpContactFormState,
    FormData
  >(submitLpContact, null);

  useEffect(() => {
    if (state?.ok) {
      pushGenerateLead("lp_contact");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [state?.ok]);

  if (state?.ok) {
    return (
      <div className="rounded-lg border-2 border-brand bg-white p-6">
        <p className="text-xl font-black text-ink-deep">
          お問い合わせを受け付けました
        </p>
        <p className="mt-3 text-[15px] font-medium leading-7 text-ink">{state.message}</p>
        <a
          href={PHONE_HREF}
          className="mt-5 flex flex-col items-center rounded-lg bg-emergency px-4 py-3 text-white"
        >
          <span className="text-xs font-semibold">24時間365日・年中無休</span>
          <span className="text-2xl font-bold tracking-wider">
            {PHONE_DISPLAY}
          </span>
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <SpamGuardFields />

      {state?.message && (
        <p className="rounded-lg bg-emergency/10 px-4 py-3 text-sm font-semibold text-emergency">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="lp-name" className="block text-sm font-semibold">
          お名前
          <Required />
        </label>
        <input
          id="lp-name"
          name="name"
          type="text"
          autoComplete="name"
          className={`mt-2 ${inputBase}`}
        />
        <FieldError message={state?.errors?.name} />
      </div>

      <div>
        <label htmlFor="lp-phone" className="block text-sm font-semibold">
          電話番号
          <Required />
        </label>
        <input
          id="lp-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={`mt-2 ${inputBase}`}
        />
        <FieldError message={state?.errors?.phone} />
      </div>

      <div>
        <label htmlFor="lp-email" className="block text-sm font-semibold">
          メールアドレス
          <span className="ml-2 text-xs font-normal text-ink-soft">任意</span>
        </label>
        <input
          id="lp-email"
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-2 ${inputBase}`}
        />
      </div>

      <div>
        <label htmlFor="lp-message" className="block text-sm font-semibold">
          ご状況
          <Required />
        </label>
        <p className="mt-1 text-xs leading-6 text-ink-soft">
          「病院からお迎えをお願いしたい」「費用を知りたい」など、ひとことで構いません。
        </p>
        <textarea
          id="lp-message"
          name="message"
          rows={4}
          className={`mt-2 ${inputBase}`}
        />
        <FieldError message={state?.errors?.message} />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            value="agreed"
            className="mt-1"
          />
          <span>
            <Link
              href="/privacy/"
              className="text-brand underline underline-offset-2"
            >
              プライバシーポリシー
            </Link>
            に同意します
            <Required />
          </span>
        </label>
        <FieldError message={state?.errors?.consent} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand px-5 py-4 text-base font-bold text-white transition hover:bg-brand-deep disabled:opacity-60"
      >
        {pending ? "送信中..." : "この内容で送信する"}
      </button>
    </form>
  );
}
