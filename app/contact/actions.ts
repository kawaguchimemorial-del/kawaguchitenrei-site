"use server";

import { sendWebhook } from "@/lib/forms/sendWebhook";
import { assessBot, assessSpam, shouldDiscard } from "@/lib/forms/antispam";
import { isBotSubmission } from "@/lib/forms/botid";

const CONTACT_SUCCESS_MESSAGE =
  "通常2営業日以内にご担当者よりご連絡します。お急ぎの場合は 0120-963-765 までお電話ください。";

export type ContactFormState = {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
  echo?: Record<string, FormDataEntryValue | null>;
} | null;

const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "name", label: "お名前" },
  { name: "purpose", label: "お問い合わせ種別" },
  { name: "preferredContact", label: "ご希望連絡方法" },
  { name: "message", label: "お問い合わせ内容" },
];

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  return /^[0-9\-+()\s]{7,}$/.test(value);
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field.name);
    if (!value || String(value).trim() === "") {
      errors[field.name] = `${field.label}を入力してください`;
    }
  }

  const email = formData.get("email");
  const phone = formData.get("phone");
  const hasEmail = Boolean(email && String(email).trim() !== "");
  const hasPhone = Boolean(phone && String(phone).trim() !== "");

  if (!hasPhone && !hasEmail) {
    const contactMethodMessage =
      "電話番号またはメールアドレスのいずれかをご入力ください";
    errors.phone = contactMethodMessage;
    errors.email = contactMethodMessage;
  }

  if (hasEmail && !isEmail(String(email))) {
    errors.email = "メールアドレスの形式を確認してください";
  }

  if (hasPhone && !isPhone(String(phone))) {
    errors.phone = "電話番号の形式を確認してください";
  }

  const consent = formData.get("consent");
  if (!consent) {
    errors.consent = "プライバシーポリシーへのご同意が必要です";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "入力内容をご確認ください。",
    };
  }

  // bot/営業らしさを評価。原則はフラグ付けのみで必ず送信するが、
  // bot 確定の signal（ハニーポット・ランダム文字列）だけは Webhook に送らず破棄する。
  const bot = assessBot(formData);
  const spam = assessSpam({
    name: formData.get("name"),
    nameKana: formData.get("nameKana"),
    preferredTime: formData.get("preferredTime"),
    message: formData.get("message"),
  });

  // bot に「弾かれた」と気付かせないため、画面上は通常の完了表示を返す。
  const botLike = await isBotSubmission();
  if (shouldDiscard(spam) || botLike) {
    // 個人情報は出さない。どちらの判定で止めたかだけ残す。
    // これが無いと「成功画面が出るのに届かない」原因を追えない（2026-08-28）。
    console.warn(
      `[contact] discarded: gibberish=${spam.gibberishHits > 0} botid=${botLike}`
    );
    return { ok: true, message: CONTACT_SUCCESS_MESSAGE };
  }

  const payload = {
    name: formData.get("name"),
    nameKana: formData.get("nameKana"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    purpose: formData.get("purpose"),
    preferredContact: formData.get("preferredContact"),
    preferredTime: formData.get("preferredTime"),
    message: formData.get("message"),
    submittedAt: new Date().toISOString(),
    ...bot,
    ...spam,
  };

  const result = await sendWebhook("contact", payload);
  if (!result.ok) {
    return {
      errors: { _form: "送信に失敗しました" },
      message:
        "申し訳ありません。送信処理でエラーが発生しました。お急ぎの方は 0120-963-765 までお電話ください。",
    };
  }

  return {
    ok: true,
    message: CONTACT_SUCCESS_MESSAGE,
  };
}
