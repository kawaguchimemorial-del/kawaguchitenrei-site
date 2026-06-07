// フォームの迷惑送信対策（contact / estimate 共通）。
// 方針（CLAUDE.md §8 ご遺族への配慮を最優先）:
// - bot 対策：ハニーポット項目 ＋ 送信時間トラップ。実ユーザーには完全に無害。
// - 営業/勧誘（人間の手送り）対策：文面ヒューリスティクスで「ブロックせずフラグ付け」。
//   ご遺族の本物の問い合わせを取りこぼさないため、自動破棄はしない（Webhook には送り、フラグだけ付ける）。

export const HONEYPOT_FIELD = "company_url";
export const ELAPSED_FIELD = "elapsedSec";

// JS で計測した滞在秒数がこれ未満なら bot とみなす（実ユーザーが全必須項目を
// これ未満で埋めるのは非現実的）。値が無い（JS 無効等）場合は時間では弾かない。
const MIN_ELAPSED_SEC = 3;

export function isBotSubmission(formData: FormData): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (honeypot && String(honeypot).trim() !== "") return true;

  const rawElapsed = formData.get(ELAPSED_FIELD);
  if (rawElapsed !== null && String(rawElapsed).trim() !== "") {
    const sec = Number(rawElapsed);
    if (Number.isFinite(sec) && sec < MIN_ELAPSED_SEC) return true;
  }
  return false;
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
