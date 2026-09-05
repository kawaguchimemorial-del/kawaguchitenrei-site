"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";

import { pushGenerateLead } from "@/lib/analytics";
import { trackLpEvent } from "@/lib/lp-analytics";
import { SpamGuardFields } from "@/components/forms/SpamGuardFields";
import { PHONE_DISPLAY, PHONE_HREF } from "../lp-constants";
import { submitLpContact, type LpContactFormState } from "./actions";

/**
 * 事前のご相談フォーム。
 *
 * ご逝去後のお急ぎのご依頼は電話でしか間に合わないため、このフォームは
 * 事前相談の受け皿に限定する（2026-08-27 松澤指示）。
 *
 * 「ご危篤」「余命」といった病状そのものは尋ねない。
 * 要配慮個人情報を集めないため、差し迫り具合だけを任意でうかがう（§12）。
 */

const PURPOSE_OPTIONS = [
  "費用の目安を知りたい",
  "式場を見学したい",
  "葬儀の流れを知りたい",
  "川口市民葬について知りたい",
  "その他",
];

const TIMING_OPTIONS = [
  "具体的な予定はないが、備えておきたい",
  "近いうちに必要になるかもしれない",
  "差し迫った状況にある",
];

const CONTACT_OPTIONS = ["電話", "メール", "どちらでも"];

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
      trackLpEvent("lp_generate_lead", "contact_form");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [state?.ok]);

  if (state?.ok) {
    return (
      <div className="rounded-lg border-2 border-brand bg-white p-6">
        <p className="text-xl font-black text-ink-deep">
          ご相談を受け付けました
        </p>
        <p className="mt-3 text-[15px] font-medium leading-7 text-ink">
          {state.message}
        </p>
        <a
          href={PHONE_HREF}
          data-lp-event="lp_click_tel"
          data-lp-placement="contact_success"
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
    <form action={formAction} data-lp-form className="space-y-5">
      <SpamGuardFields />

      {state?.message && (
        <p className="rounded-lg bg-emergency/10 px-4 py-3 text-sm font-semibold text-emergency">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="lp-name" className="block text-sm font-bold">
          お名前
          <Required />
        </label>
        <input
          id="lp-name"
          name="name"
          required
          type="text"
          autoComplete="name"
          className={`mt-2 ${inputBase}`}
        />
        <FieldError message={state?.errors?.name} />
      </div>

      <div>
        <label htmlFor="lp-phone" className="block text-sm font-bold">
          電話番号
          <Required />
        </label>
        <input
          id="lp-phone"
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={`mt-2 ${inputBase}`}
        />
        <FieldError message={state?.errors?.phone} />
      </div>

      <div>
        <label htmlFor="lp-email" className="block text-sm font-bold">
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

      <fieldset>
        <legend className="text-sm font-bold">
          ご相談内容
          <Required />
          <span className="ml-2 text-xs font-normal text-ink-soft">
            いくつでも
          </span>
        </legend>
        <div className="mt-2 space-y-2">
          {PURPOSE_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-[15px]"
            >
              <input type="checkbox" name="purpose" value={option} />
              {option}
            </label>
          ))}
        </div>
        <FieldError message={state?.errors?.purpose} />
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold">
          ご相談の時期
          <span className="ml-2 text-xs font-normal text-ink-soft">任意</span>
        </legend>
        <div className="mt-2 space-y-2">
          {TIMING_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-[15px]"
            >
              <input type="radio" name="timing" value={option} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold">
          ご希望の連絡方法
          <span className="ml-2 text-xs font-normal text-ink-soft">任意</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONTACT_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-[15px]"
            >
              <input type="radio" name="preferredContact" value={option} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="lp-message" className="block text-sm font-bold">
          ご質問・ご希望
          <span className="ml-2 text-xs font-normal text-ink-soft">任意</span>
        </label>
        <textarea
          id="lp-message"
          name="message"
          rows={4}
          className={`mt-2 ${inputBase}`}
        />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
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
        {pending ? "送信中..." : "この内容で相談する"}
      </button>

      <p className="text-center text-[13px] leading-6 text-ink-mid">
        ご逝去後のお急ぎのご依頼は、
        <a
          href={PHONE_HREF}
          data-lp-event="lp_click_tel"
          data-lp-placement="contact_form"
          className="font-bold text-emergency underline"
        >
          {PHONE_DISPLAY}
        </a>
        までお電話ください。
      </p>
    </form>
  );
}
