// =============================================================
// 川口典礼 問い合わせ・見積り・お客様アンケートフォーム Webhook
// Google Apps Script - Web App
// =============================================================
// スクリプトプロパティに以下を設定すること:
//   SPREADSHEET_ID        : 保存先スプレッドシートのID
//   ADMIN_EMAIL           : 通知メール送信先
//   FORM_WEBHOOK_SECRET   : Vercel側と共有する秘密トークン
// =============================================================
// 【このファイルについて】
// GAS 側の実物の写し。GAS で編集したら、必ずこのファイルも更新すること。
// 逆に、このファイルを直しただけでは本番には反映されない（GAS への貼り付けが必要）。
// 手順は docs/operations/2026-08-27-gas-webhook-spec.md
// =============================================================
// 【2026-08-27 の変更】
//   広告LPの事前相談フォーム（formType: "lp_contact"）に対応した。
//   既存の contact / estimate / customer_survey の動作は変更していない。
// =============================================================

const PROPS = PropertiesService.getScriptProperties();

const SHEET_CONTACT = "contact";
const SHEET_ESTIMATE = "estimate";
const SHEET_CUSTOMER_SURVEY = "CustomerSurvey";
const SHEET_LP_CONTACT = "lp_contact"; // 2026-08-27 追加

const CONTACT_HEADERS = [
  "受信日時",
  "対応状況",
  "担当者",
  "フォーム種別",
  "氏名",
  "フリガナ",
  "電話",
  "メール",
  "お問い合わせ種別",
  "希望連絡方法",
  "希望連絡時間帯",
  "内容",
  "対応メモ",
  "最終更新日",
];

const ESTIMATE_HEADERS = [
  "受信日時",
  "対応状況",
  "担当者",
  "フォーム種別",
  "氏名",
  "電話",
  "メール",
  "希望連絡方法",
  "葬儀形式",
  "参列人数",
  "ご希望斎場",
  "ご安置場所",
  "宗教者",
  "お料理",
  "返礼品",
  "生花",
  "川口市民",
  "備考",
  "対応メモ",
  "最終更新日",
];

// 2026-08-27 追加。広告LPからの事前相談。
// 既存シートの列構成は変えていない（列を足すと既存行とずれるため）。
// 流入元は、このシートに入っていること自体で「広告LP」と判別できる。
const LP_CONTACT_HEADERS = [
  "受信日時",
  "対応状況",
  "担当者",
  "フォーム種別",
  "流入元",
  "氏名",
  "電話",
  "メール",
  "ご相談内容",
  "ご相談の時期",
  "希望連絡方法",
  "ご質問・ご希望",
  "迷惑判定",
  "対応メモ",
  "最終更新日",
];

const CUSTOMER_SURVEY_HEADERS = [
  "timestamp",
  "formType",
  "funeralPlan",
  "hall",
  "totalCostRange",
  "costExplanationRating",
  "staffRating",
  "ceremonyRating",
  "overallRating",
  "goodPoints",
  "improvementPoints",
  "costComment",
  "publishPermission",
  "costPublishPermission",
  "name",
  "contact",
  "otherComment",
  "userAgent",
  "pagePath",
];

// 「ご相談の時期」でこれが選ばれていたら、件名に【至急】を付ける
const LP_URGENT_TIMING = "差し迫った状況にある";

// --------------------------------------------------------------
// エントリーポイント
// --------------------------------------------------------------

function doPost(e) {
  try {
    const config = loadConfig();
    if (!config.ok) {
      return jsonResponse({ ok: false, error: config.error });
    }

    const parsed = parseBody(e);
    if (!parsed.ok) {
      return jsonResponse({ ok: false, error: parsed.error });
    }

    const data = parsed.data;

    if (data.secret !== config.secret) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    const ss = SpreadsheetApp.openById(config.spreadsheetId);

    if (data.formType === "contact") {
      saveContact(ss, data);
      sendContactMail(config.adminEmail, ss.getUrl(), data);
      return jsonResponse({ ok: true });
    }

    if (data.formType === "estimate") {
      saveEstimate(ss, data);
      sendEstimateMail(config.adminEmail, ss.getUrl(), data);
      return jsonResponse({ ok: true });
    }

    // 2026-08-27 追加：広告LPの事前相談
    if (data.formType === "lp_contact") {
      saveLpContact(ss, data);
      sendLpContactMail(config.adminEmail, ss.getUrl(), data);
      return jsonResponse({ ok: true });
    }

    if (data.formType === "customer_survey") {
      saveCustomerSurvey(ss, data);
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: "unknown formType" });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, hint: "POST only" });
}

// --------------------------------------------------------------
// 設定読み込み
// --------------------------------------------------------------

function loadConfig() {
  const spreadsheetId = PROPS.getProperty("SPREADSHEET_ID");
  const adminEmail = PROPS.getProperty("ADMIN_EMAIL");
  const secret = PROPS.getProperty("FORM_WEBHOOK_SECRET");

  if (!spreadsheetId || !adminEmail || !secret) {
    return { ok: false, error: "script properties not configured" };
  }

  return { ok: true, spreadsheetId, adminEmail, secret };
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return { ok: false, error: "empty body" };
  }

  try {
    return { ok: true, data: JSON.parse(e.postData.contents) };
  } catch (err) {
    return { ok: false, error: "invalid json" };
  }
}

// --------------------------------------------------------------
// シート操作
// --------------------------------------------------------------

function ensureSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    return sheet;
  }

  // 既存シートが空の場合のみヘッダーを追加
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }

  return sheet;
}

function saveContact(ss, b) {
  const sheet = ensureSheet(ss, SHEET_CONTACT, CONTACT_HEADERS);

  sheet.appendRow([
    new Date(),
    "未対応",
    "",
    "contact",
    b.name || "",
    b.nameKana || "",
    b.phone || "",
    b.email || "",
    b.purpose || "",
    b.preferredContact || "",
    b.preferredTime || "",
    b.message || "",
    "",
    "",
  ]);
}

function saveEstimate(ss, b) {
  const sheet = ensureSheet(ss, SHEET_ESTIMATE, ESTIMATE_HEADERS);

  sheet.appendRow([
    new Date(),
    "未対応",
    "",
    "estimate",
    b.name || "",
    b.phone || "",
    b.email || "",
    b.preferredContact || "",
    b.format || "",
    b.people || "",
    b.hall || "",
    b.placement || "",
    b.religion || "",
    b.meals || "",
    b.gifts || "",
    b.flowers || "",
    b.citizen || "",
    b.note || "",
    "",
    "",
  ]);
}

// 2026-08-27 追加
function saveLpContact(ss, b) {
  const sheet = ensureSheet(ss, SHEET_LP_CONTACT, LP_CONTACT_HEADERS);

  sheet.appendRow([
    new Date(),
    "未対応",
    "",
    "lp_contact",
    "広告LP",
    b.name || "",
    b.phone || "",
    b.email || "",
    b.purpose || "", // 複数選択が「／」で連結されて届く
    b.timing || "",
    b.preferredContact || "",
    b.message || "",
    spamNote(b),
    "",
    "",
  ]);
}

function saveCustomerSurvey(ss, b) {
  const sheet = ensureSheet(
    ss,
    SHEET_CUSTOMER_SURVEY,
    CUSTOMER_SURVEY_HEADERS
  );

  sheet.appendRow([
    toDateOrNow(b.timestamp),
    "customer_survey",
    b.funeralPlan || "",
    b.hall || "",
    b.totalCostRange || "",
    b.costExplanationRating || "",
    b.staffRating || "",
    b.ceremonyRating || "",
    b.overallRating || "",
    b.goodPoints || "",
    b.improvementPoints || "",
    b.costComment || "",
    b.publishPermission || "",
    b.costPublishPermission || "",
    b.name || "",
    b.contact || "",
    b.otherComment || "",
    b.userAgent || "",
    b.pagePath || "",
  ]);
}

// --------------------------------------------------------------
// メール通知
// --------------------------------------------------------------

function sendContactMail(to, sheetUrl, b) {
  const subject = `【川口典礼】事前相談・お問い合わせ - ${b.name || ""}様`;

  const body = [
    "事前相談・お問い合わせを受け付けました。",
    "",
    `受信日時: ${formatJst(new Date())}`,
    `お名前: ${b.name || ""}`,
    `フリガナ: ${b.nameKana || ""}`,
    `電話: ${b.phone || ""}`,
    `メール: ${b.email || ""}`,
    `お問い合わせ種別: ${b.purpose || ""}`,
    `希望連絡方法: ${b.preferredContact || ""}`,
    `希望連絡時間帯: ${b.preferredTime || ""}`,
    "",
    "お問い合わせ内容:",
    b.message || "",
    "",
    `スプレッドシート: ${sheetUrl}`,
  ].join("\n");

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
  });
}

function sendEstimateMail(to, sheetUrl, b) {
  const subject = `【川口典礼】概算見積もり依頼 - ${b.name || ""}様`;

  const body = [
    "概算見積もりのご依頼を受け付けました。",
    "",
    `受信日時: ${formatJst(new Date())}`,
    `お名前: ${b.name || ""}`,
    `電話: ${b.phone || ""}`,
    `メール: ${b.email || ""}`,
    `希望連絡方法: ${b.preferredContact || ""}`,
    "",
    `葬儀形式: ${b.format || ""}`,
    `参列人数: ${b.people || ""}`,
    `ご希望斎場: ${b.hall || ""}`,
    `ご安置場所: ${b.placement || ""}`,
    `宗教者: ${b.religion || ""}`,
    `お料理: ${b.meals || ""}`,
    `返礼品: ${b.gifts || ""}`,
    `生花: ${b.flowers || ""}`,
    `川口市民: ${b.citizen || ""}`,
    "",
    "備考:",
    b.note || "",
    "",
    `スプレッドシート: ${sheetUrl}`,
  ].join("\n");

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
  });
}

// 2026-08-27 追加
// 件名で「広告LPから来たか」「急ぎか」が一目で分かるようにする。
function sendLpContactMail(to, sheetUrl, b) {
  const urgent = b.timing === LP_URGENT_TIMING;

  const subject =
    (urgent ? "【至急】" : "") +
    `【川口典礼】【広告LP】事前相談 - ${b.name || ""}様`;

  const lines = [
    "広告LPの事前相談フォームからお申し込みがありました。",
  ];

  if (urgent) {
    lines.push("");
    lines.push("※「差し迫った状況にある」が選ばれています。優先してご連絡ください。");
  }

  lines.push("");
  lines.push(`受信日時: ${formatJst(new Date())}`);
  lines.push(`お名前: ${b.name || ""}`);
  lines.push(`電話: ${b.phone || ""}`);
  lines.push(`メール: ${b.email || ""}`);
  lines.push("");
  lines.push(`ご相談内容: ${b.purpose || ""}`);
  lines.push(`ご相談の時期: ${b.timing || "（未選択）"}`);
  lines.push(`希望連絡方法: ${b.preferredContact || "（未選択）"}`);
  lines.push("");
  lines.push("ご質問・ご希望:");
  lines.push(b.message || "（記載なし）");

  const note = spamNote(b);
  if (note) {
    lines.push("");
    lines.push(`※ ${note}`);
  }

  lines.push("");
  lines.push(`スプレッドシート: ${sheetUrl}`);

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: lines.join("\n"),
  });
}

// --------------------------------------------------------------
// ユーティリティ
// --------------------------------------------------------------

// サイト側の迷惑送信判定の結果を、1つの文字列にまとめる
function spamNote(b) {
  const notes = [];
  if (b.botFlagged) notes.push("bot判定あり");
  if (b.spamFlagged) notes.push("迷惑送信の可能性あり");
  if (notes.length === 0) return "";
  return notes.join(" / ") + "（内容をご確認ください）";
}

function formatJst(d) {
  return Utilities.formatDate(d, "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
}

function toDateOrNow(value) {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// --------------------------------------------------------------
// GAS エディタからの簡易テスト用関数
// 関数を選択して testContact / testEstimate / testLpContact / testCustomerSurvey を実行できます
// --------------------------------------------------------------

function testContact() {
  const secret = PROPS.getProperty("FORM_WEBHOOK_SECRET");

  const e = {
    postData: {
      contents: JSON.stringify({
        secret: secret,
        formType: "contact",
        name: "テスト太郎",
        nameKana: "テストタロウ",
        phone: "090-1234-5678",
        email: "test@example.com",
        purpose: "事前相談",
        preferredContact: "電話",
        preferredTime: "平日10:00〜17:00",
        message: "テスト送信です。\n事前相談を希望します。",
      }),
    },
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}

function testEstimate() {
  const secret = PROPS.getProperty("FORM_WEBHOOK_SECRET");

  const e = {
    postData: {
      contents: JSON.stringify({
        secret: secret,
        formType: "estimate",
        name: "テスト花子",
        phone: "090-9876-5432",
        email: "hanako@example.com",
        preferredContact: "メール",
        format: "家族葬",
        people: "11〜30名",
        hall: "川口メモリアルホール",
        placement: "ホール安置",
        religion: "必要",
        meals: "必要",
        gifts: "必要",
        flowers: "標準",
        citizen: "川口市民",
        note: "テスト送信です。",
      }),
    },
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}

// 2026-08-27 追加
function testLpContact() {
  const secret = PROPS.getProperty("FORM_WEBHOOK_SECRET");

  const e = {
    postData: {
      contents: JSON.stringify({
        secret: secret,
        formType: "lp_contact",
        name: "テスト一郎",
        phone: "090-1111-2222",
        email: "ichiro@example.com",
        purpose: "費用の目安を知りたい／式場を見学したい",
        timing: "差し迫った状況にある",
        preferredContact: "電話",
        message: "テスト送信です。",
        submittedAt: new Date().toISOString(),
        botFlagged: false,
        spamFlagged: false,
      }),
    },
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}

function testCustomerSurvey() {
  const secret = PROPS.getProperty("FORM_WEBHOOK_SECRET");

  const e = {
    postData: {
      contents: JSON.stringify({
        secret: secret,
        formType: "customer_survey",
        timestamp: new Date().toISOString(),
        funeralPlan: "家族葬",
        hall: "川口メモリアルホール",
        totalCostRange: "50万円〜80万円未満",
        costExplanationRating: "わかりやすかった",
        staffRating: "5 とても満足",
        ceremonyRating: "5 とても満足",
        overallRating: "5 とても満足",
        goodPoints: "テスト送信です。",
        improvementPoints: "特になし",
        costComment: "テスト送信です。",
        publishPermission: "掲載しない",
        costPublishPermission: "掲載しない",
        name: "テスト",
        contact: "",
        otherComment: "",
        userAgent: "GAS test",
        pagePath: "/voice/survey/",
      }),
    },
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
