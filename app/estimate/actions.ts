"use server";

import { sendWebhook } from "@/lib/forms/sendWebhook";
import { assessSpam, isBotSubmission } from "@/lib/forms/antispam";

const ESTIMATE_SUCCESS_MESSAGE =
  "ご入力いただいた内容をもとに、ご担当者より概算金額をご連絡します。お急ぎの場合は 0120-963-765 までお電話ください。";

export type EstimateFormState = {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
  summary?: {
    format: string;
    people: string;
    hall: string;
    placement: string;
    religion: string;
    meals: string;
    gifts: string;
    flowers: string;
    citizen: string;
  };
} | null;

const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "format", label: "葬儀形式" },
  { name: "people", label: "参列人数" },
  { name: "hall", label: "ご希望の斎場" },
  { name: "placement", label: "ご安置場所" },
  { name: "religion", label: "宗教者の有無" },
  { name: "name", label: "お名前" },
  { name: "phone", label: "電話番号" },
  { name: "preferredContact", label: "ご希望の連絡方法" },
];

const VALUE_LABELS: Record<string, Record<string, string>> = {
  format: {
    "direct-funeral": "直葬",
    "hanaire-owakare": "花入れお別れ",
    "oneday-funeral": "一日葬",
    "family-funeral": "家族葬",
    "kawaguchi-shimin": "川口市民葬",
  },
  people: {
    "1-5": "5名まで",
    "6-10": "6〜10名",
    "11-30": "11〜30名",
    "31-50": "31〜50名",
    "51+": "51名以上",
  },
  hall: {
    "kawaguchi-memorial-hall": "川口メモリアルホール",
    megurinomori: "川口市めぐりの森",
    "toda-sousaijo": "戸田葬祭場",
    "yatsuka-saijo": "谷塚斎場",
    undecided: "未定 / 相談したい",
  },
  placement: {
    home: "ご自宅",
    hall: "ホール安置",
    other: "その他 / 相談したい",
  },
  religion: {
    needed: "必要",
    none: "不要",
    undecided: "未定 / 相談したい",
  },
  meals: {
    needed: "必要",
    none: "不要",
    undecided: "未定",
  },
  gifts: {
    needed: "必要",
    none: "不要",
    undecided: "未定",
  },
  flowers: {
    standard: "標準",
    upgrade: "グレードアップ",
    none: "不要",
  },
  citizen: {
    yes: "川口市民",
    no: "川口市民ではない",
    unknown: "わからない",
  },
  preferredContact: {
    phone: "電話",
    email: "メール",
  },
};

function valueToLabel(group: string, value: FormDataEntryValue | null): string {
  if (!value) return "未選択";
  const map = VALUE_LABELS[group];
  if (!map) return String(value);
  return map[String(value)] ?? String(value);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  return /^[0-9\-+()\s]{7,}$/.test(value);
}

export async function submitEstimate(
  _prevState: EstimateFormState,
  formData: FormData
): Promise<EstimateFormState> {
  const summary = {
    format: valueToLabel("format", formData.get("format")),
    people: valueToLabel("people", formData.get("people")),
    hall: valueToLabel("hall", formData.get("hall")),
    placement: valueToLabel("placement", formData.get("placement")),
    religion: valueToLabel("religion", formData.get("religion")),
    meals: valueToLabel("meals", formData.get("meals")),
    gifts: valueToLabel("gifts", formData.get("gifts")),
    flowers: valueToLabel("flowers", formData.get("flowers")),
    citizen: valueToLabel("citizen", formData.get("citizen")),
  };

  // bot（ハニーポット混入 / 即時送信）は静かに破棄する。
  // 成功画面は通常どおり返し、Webhook には送らない。
  if (isBotSubmission(formData)) {
    return { ok: true, summary, message: ESTIMATE_SUCCESS_MESSAGE };
  }

  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field.name);
    if (!value || String(value).trim() === "") {
      errors[field.name] = `${field.label}をお選びください`;
    }
  }

  const phone = formData.get("phone");
  if (phone && !isPhone(String(phone))) {
    errors.phone = "電話番号の形式を確認してください";
  }

  const email = formData.get("email");
  if (email && String(email).trim() !== "" && !isEmail(String(email))) {
    errors.email = "メールアドレスの形式を確認してください";
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
    message: formData.get("note"),
  });

  const payload = {
    ...summary,
    rawFormat: formData.get("format"),
    rawHall: formData.get("hall"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    preferredContact: formData.get("preferredContact"),
    note: formData.get("note"),
    submittedAt: new Date().toISOString(),
    ...spam,
  };

  const result = await sendWebhook("estimate", payload);
  if (!result.ok) {
    return {
      errors: { _form: "送信に失敗しました" },
      message:
        "申し訳ありません。送信処理でエラーが発生しました。お急ぎの方は 0120-963-765 までお電話ください。",
    };
  }

  return {
    ok: true,
    summary,
    message: ESTIMATE_SUCCESS_MESSAGE,
  };
}
