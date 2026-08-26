"use server";

import { sendWebhook } from "@/lib/forms/sendWebhook";
import { assessBot, assessSpam, shouldDiscard } from "@/lib/forms/antispam";
import { isBotSubmission } from "@/lib/forms/botid";

// 広告LP専用の問い合わせ。本サイトの /contact/ とは formType だけが異なる。
// 送信先の Webhook は共通で、振り分け（件名の【広告LP】付与・シートの流入元列）は
// Google Apps Script 側で formType: "lp_contact" を見て行う。
const LP_CONTACT_SUCCESS_MESSAGE =
  "お問い合わせを受け付けました。折り返しご連絡いたします。お急ぎの場合は 0120-963-765 までお電話ください。";

export type LpContactFormState = {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
} | null;

// 緊急層向けのため必須は3項目のみ（2026-08-26 15名討議の合議）。
const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "name", label: "お名前" },
  { name: "phone", label: "電話番号" },
  { name: "message", label: "ご状況" },
];

function isPhone(value: string): boolean {
  return /^[0-9\-+()\s]{7,}$/.test(value);
}

export async function submitLpContact(
  _prevState: LpContactFormState,
  formData: FormData
): Promise<LpContactFormState> {
  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field.name);
    if (!value || String(value).trim() === "") {
      errors[field.name] = `${field.label}を入力してください`;
    }
  }

  const phone = formData.get("phone");
  if (phone && String(phone).trim() !== "" && !isPhone(String(phone))) {
    errors.phone = "電話番号の形式を確認してください";
  }

  if (!formData.get("consent")) {
    errors.consent = "プライバシーポリシーへのご同意が必要です";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, message: "入力内容をご確認ください。" };
  }

  const bot = assessBot(formData);
  const spam = assessSpam({
    name: formData.get("name"),
    nameKana: null,
    preferredTime: null,
    message: formData.get("message"),
  });

  // bot に気付かせないため、破棄時も画面上は通常の完了表示を返す。
  if (shouldDiscard(spam) || (await isBotSubmission())) {
    return { ok: true, message: LP_CONTACT_SUCCESS_MESSAGE };
  }

  const result = await sendWebhook("lp_contact", {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    submittedAt: new Date().toISOString(),
    ...bot,
    ...spam,
  });

  if (!result.ok) {
    return {
      errors: { _form: "送信に失敗しました" },
      message:
        "申し訳ありません。送信処理でエラーが発生しました。お急ぎの方は 0120-963-765 までお電話ください。",
    };
  }

  return { ok: true, message: LP_CONTACT_SUCCESS_MESSAGE };
}
