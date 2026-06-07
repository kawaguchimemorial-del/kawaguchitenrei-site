"use server";

import { sendWebhook } from "@/lib/forms/sendWebhook";
import { assessSpam, isBotSubmission } from "@/lib/forms/antispam";

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
  { name: "phone", label: "電話番号" },
  { name: "email", label: "メールアドレス" },
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
  // bot（ハニーポット混入 / 即時送信）は静かに破棄する。
  // 成功画面は通常どおり返し、Webhook には送らない（bot に気づかせない）。
  if (isBotSubmission(formData)) {
    return { ok: true, message: CONTACT_SUCCESS_MESSAGE };
  }

  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field.name);
    if (!value || String(value).trim() === "") {
      errors[field.name] = `${field.label}を入力してください`;
    }
  }

  const email = formData.get("email");
  if (email && !isEmail(String(email))) {
    errors.email = "メールアドレスの形式を確認してください";
  }

  const phone = formData.get("phone");
  if (phone && !isPhone(String(phone))) {
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

  // 営業/勧誘らしさを採点（ブロックはせず、フラグだけ付けて運用側で仕分け）。
  const spam = assessSpam({
    name: formData.get("name"),
    message: formData.get("message"),
  });

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
