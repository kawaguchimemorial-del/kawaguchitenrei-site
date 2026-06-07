// フォームの迷惑送信対策（contact / estimate 共通）。
// 方針（CLAUDE.md §8 ご遺族への配慮を最優先）:
// - bot 対策：ハニーポット項目 ＋ 送信時間トラップ。実ユーザーには完全に無害。
// - 営業/勧誘（人間の手送り）対策：文面ヒューリスティクスで「ブロックせずフラグ付け」。
//   ご遺族の本物の問い合わせを取りこぼさないため、自動破棄はしない（Webhook には送り、フラグだけ付ける）。

// 自動入力（autofill）に拾われにくいフィールド名にする。
// （"company"/"url" 等の autofill トークンを避ける。誤検知＝誤フラグの低減）
export const HONEYPOT_FIELD = "contact_reference";
export const ELAPSED_FIELD = "elapsedSec";

// JS で計測した滞在秒数がこれ未満なら「速すぎる送信」としてフラグする。
const MIN_ELAPSED_SEC = 3;

export type BotAssessment = { botFlagged: boolean; botReasons: string[] };

// bot らしさを評価する。
// 【重要】判定しても送信は絶対に破棄しない。必ず Webhook へ届けたうえで
// フラグだけ付ける（ご遺族の本物の問い合わせを失わないため／§8）。
// 仕分け（通知の出し分け・別シート移動など）は GAS / スプレッドシート側で行う。
export function assessBot(formData: FormData): BotAssessment {
  const reasons: string[] = [];

  const honeypot = formData.get(HONEYPOT_FIELD);
  if (honeypot && String(honeypot).trim() !== "") reasons.push("honeypot");

  const rawElapsed = formData.get(ELAPSED_FIELD);
  if (rawElapsed !== null && String(rawElapsed).trim() !== "") {
    const sec = Number(rawElapsed);
    if (Number.isFinite(sec) && sec < MIN_ELAPSED_SEC) {
      reasons.push(`too-fast:${sec}`);
    }
  }

  return { botFlagged: reasons.length > 0, botReasons: reasons };
}

const SALES_KEYWORDS = [
  "seo",
  "被リンク",
  "集客",
  "上位表示",
  "アクセス数",
  "外注",
  "格安",
  "広告運用",
  "マーケティング",
  "制作いたします",
  "ホームページ制作",
  "副業",
  "投資",
  "出会い",
  "暗号資産",
  "仮想通貨",
  "backlink",
  "ranking",
  "guest post",
  "crypto",
  "casino",
  "viagra",
];

export type SpamAssessment = {
  spamScore: number;
  spamFlagged: boolean;
  spamReasons: string[];
};

// 営業/勧誘らしさを採点する。ブロックはしない（フラグのみ）。
export function assessSpam(input: {
  name?: FormDataEntryValue | null;
  message?: FormDataEntryValue | null;
}): SpamAssessment {
  const name = String(input.name ?? "");
  const message = String(input.message ?? "");
  const haystack = `${name} ${message}`.toLowerCase();

  let score = 0;
  const reasons: string[] = [];

  const urlMatches = message.match(/https?:\/\/|www\./gi) ?? [];
  if (urlMatches.length > 0) {
    score += Math.min(urlMatches.length, 2) + 1;
    reasons.push(`url:${urlMatches.length}`);
  }

  let keywordHits = 0;
  for (const keyword of SALES_KEYWORDS) {
    if (haystack.includes(keyword)) keywordHits += 1;
  }
  if (keywordHits > 0) {
    score += keywordHits;
    reasons.push(`keyword:${keywordHits}`);
  }

  const hasJapanese = /[ぁ-んァ-ン一-龥]/.test(message);
  if (!hasJapanese && message.length > 20) {
    score += 2;
    reasons.push("no-japanese");
  }

  if (/\[url=|\[link=|<a\s/i.test(message)) {
    score += 2;
    reasons.push("link-markup");
  }

  return { spamScore: score, spamFlagged: score >= 2, spamReasons: reasons };
}
