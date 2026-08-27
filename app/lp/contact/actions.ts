"use server";

import { sendWebhook } from "@/lib/forms/sendWebhook";
import { assessBot, assessSpam, shouldDiscard } from "@/lib/forms/antispam";
import { isBotSubmission } from "@/lib/forms/botid";

// 広告LP専用の「事前のご相談」フォーム。
// ご逝去後のお急ぎのご依頼は電話でしか間に合わないため、このフォームは
// 事前相談（ご危篤・ご高齢のご家族がいる・備えておきたい）の受け皿に限定する
// （2026-08-27 松澤指示）。
//
// 送信先の Webhook は共通で、振り分け（件名の【広告LP】付与・シートの流入元列）は
// Google Apps Script 側で formType: "lp_contact" を見て行う。
const LP_CONTACT_SUCCESS_MESSAGE =
  "ご相談を受け付けました。担当者より折り返しご連絡いたします。お急ぎの場合は 0120-963-765 までお電話ください。";

export type LpContactFormState = {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
} | null;

// 必須は3項目まで。事前相談なので、何を聞きたいかを選べるようにする。
const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "name", label: "お名前" },
  { name: "phone", label: "電話番号" },
  { name: "purpose", label: "ご相談内容" },
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
    // ご相談内容（複数選択）と、差し迫り具合。
    // 病状そのものは尋ねない（要配慮個人情報を集めないため）。
    purpose: formData.getAll("purpose").join("／"),
    timing: formData.get("timing"),
    preferredContact: formData.get("preferredContact"),
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
