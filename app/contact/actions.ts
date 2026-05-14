"use server";

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
  };

  // TODO: 実メール送信の連携
  // 例: Resend / SendGrid / SES などへの API 呼び出しをここに追加
  // 送信先メールアドレスは環境変数 (CONTACT_EMAIL_TO) などで管理する想定
  // 受付完了の自動返信メールも別途送信する
  console.info("[contact] submitted", payload);

  return {
    ok: true,
    message:
      "通常2営業日以内にご担当者よりご連絡します。お急ぎの場合は 0120-963-765 までお電話ください。",
  };
}
