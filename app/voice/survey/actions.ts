"use server";

import { headers } from "next/headers";
import { sendWebhook } from "@/lib/forms/sendWebhook";

export type SurveyFormState = {
  ok?: boolean;
  errors?: Record<string, string>;
  message?: string;
} | null;

const FUNERAL_PLANS = [
  "direct",
  "cremation",
  "oneday",
  "family",
  "general",
  "citizen",
  "other",
] as const;

const HALLS = [
  "kawaguchi-memorial-hall",
  "megurinomori",
  "toda",
  "yatsuka",
  "other",
] as const;

const TOTAL_COST_RANGES = [
  "under-10",
  "10-20",
  "20-30",
  "30-50",
  "50-80",
  "80-100",
  "100-150",
  "150-200",
  "over-200",
  "no-answer",
] as const;

const COST_EXPLANATION_RATINGS = [
  "very-clear",
  "clear",
  "neutral",
  "slightly-unclear",
  "unclear",
] as const;

const STAR_RATINGS = ["5", "4", "3", "2", "1"] as const;

const PUBLISH_PERMISSIONS = ["anonymous-ok", "review-then-ok", "no"] as const;

const COST_PUBLISH_PERMISSIONS = [
  "publish-ok",
  "publish-mask",
  "no",
] as const;

function inSet<T extends readonly string[]>(
  set: T,
  value: unknown
): value is T[number] {
  return typeof value === "string" && (set as readonly string[]).includes(value);
}

const REQUIRED_LABELS: Record<string, string> = {
  funeralPlan: "ご利用いただいた葬儀内容",
  hall: "ご利用斎場",
  totalCostRange: "葬儀費用の総額",
  costExplanationRating: "費用説明のわかりやすさ",
  staffRating: "スタッフ対応",
  ceremonyRating: "葬儀の進行",
  overallRating: "総合満足度",
  goodPoints: "よかった点",
  improvementPoints: "改善してほしい点",
  publishPermission: "サイト掲載可否",
  costPublishPermission: "費用に関する感想の掲載可否",
};

const TEXT_MAX = 4000;

function tooLong(value: unknown, max = TEXT_MAX): boolean {
  return typeof value === "string" && value.length > max;
}

export async function submitSurvey(
  _prevState: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  const errors: Record<string, string> = {};

  const funeralPlan = formData.get("funeralPlan");
  if (!inSet(FUNERAL_PLANS, funeralPlan)) {
    errors.funeralPlan = `${REQUIRED_LABELS.funeralPlan}を選択してください`;
  }

  const hall = formData.get("hall");
  if (!inSet(HALLS, hall)) {
    errors.hall = `${REQUIRED_LABELS.hall}を選択してください`;
  }

  const totalCostRange = formData.get("totalCostRange");
  if (!inSet(TOTAL_COST_RANGES, totalCostRange)) {
    errors.totalCostRange = `${REQUIRED_LABELS.totalCostRange}を選択してください`;
  }

  const costExplanationRating = formData.get("costExplanationRating");
  if (!inSet(COST_EXPLANATION_RATINGS, costExplanationRating)) {
    errors.costExplanationRating = `${REQUIRED_LABELS.costExplanationRating}を選択してください`;
  }

  const staffRating = formData.get("staffRating");
  if (!inSet(STAR_RATINGS, staffRating)) {
    errors.staffRating = `${REQUIRED_LABELS.staffRating}を選択してください`;
  }

  const ceremonyRating = formData.get("ceremonyRating");
  if (!inSet(STAR_RATINGS, ceremonyRating)) {
    errors.ceremonyRating = `${REQUIRED_LABELS.ceremonyRating}を選択してください`;
  }

  const overallRating = formData.get("overallRating");
  if (!inSet(STAR_RATINGS, overallRating)) {
    errors.overallRating = `${REQUIRED_LABELS.overallRating}を選択してください`;
  }

  const goodPoints = formData.get("goodPoints");
  if (!goodPoints || String(goodPoints).trim() === "") {
    errors.goodPoints = `${REQUIRED_LABELS.goodPoints}をご記入ください`;
  } else if (tooLong(goodPoints)) {
    errors.goodPoints = "文字数が上限を超えています";
  }

  const improvementPoints = formData.get("improvementPoints");
  if (!improvementPoints || String(improvementPoints).trim() === "") {
    errors.improvementPoints = `${REQUIRED_LABELS.improvementPoints}をご記入ください`;
  } else if (tooLong(improvementPoints)) {
    errors.improvementPoints = "文字数が上限を超えています";
  }

  const publishPermission = formData.get("publishPermission");
  if (!inSet(PUBLISH_PERMISSIONS, publishPermission)) {
    errors.publishPermission = `${REQUIRED_LABELS.publishPermission}を選択してください`;
  }

  const costPublishPermission = formData.get("costPublishPermission");
  if (!inSet(COST_PUBLISH_PERMISSIONS, costPublishPermission)) {
    errors.costPublishPermission = `${REQUIRED_LABELS.costPublishPermission}を選択してください`;
  }

  const costComment = formData.get("costComment");
  if (tooLong(costComment)) {
    errors.costComment = "文字数が上限を超えています";
  }

  const otherComment = formData.get("otherComment");
  if (tooLong(otherComment)) {
    errors.otherComment = "文字数が上限を超えています";
  }

  const name = formData.get("name");
  if (tooLong(name, 200)) {
    errors.name = "文字数が上限を超えています";
  }

  const contact = formData.get("contact");
  if (tooLong(contact, 200)) {
    errors.contact = "文字数が上限を超えています";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "入力内容をご確認ください。",
    };
  }

  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "";

  const payload = {
    funeralPlan: String(funeralPlan),
    hall: String(hall),
    totalCostRange: String(totalCostRange),
    costExplanationRating: String(costExplanationRating),
    staffRating: String(staffRating),
    ceremonyRating: String(ceremonyRating),
    overallRating: String(overallRating),
    goodPoints: String(goodPoints).trim(),
    improvementPoints: String(improvementPoints).trim(),
    costComment: costComment ? String(costComment).trim() : "",
    publishPermission: String(publishPermission),
    costPublishPermission: String(costPublishPermission),
    name: name ? String(name).trim() : "",
    contact: contact ? String(contact).trim() : "",
    otherComment: otherComment ? String(otherComment).trim() : "",
    userAgent,
    pagePath: "/voice/survey/",
    submittedAt: new Date().toISOString(),
  };

  const result = await sendWebhook("customer_survey", payload);
  if (!result.ok) {
    return {
      errors: { _form: "送信に失敗しました" },
      message:
        "送信できませんでした。時間をおいて再度お試しください。お急ぎの場合は 0120-963-765 までお電話ください。",
    };
  }

  return { ok: true };
}
