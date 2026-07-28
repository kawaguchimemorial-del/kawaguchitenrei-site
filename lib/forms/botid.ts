import { checkBotId } from "botid/server";

// Vercel BotID のサーバー側判定ラッパー。
// 【重要】判定に失敗した場合は必ず false（＝人間扱い）を返す fail-open 設計にする。
// BotID 側の障害・未設定でご遺族の問い合わせを取りこぼす方が損失が大きいため（§8）。
export async function isBotSubmission(): Promise<boolean> {
  try {
    const verification = await checkBotId();
    // 検索エンジン等の verified bot は誤爆させない（そもそも送信してこない）。
    if (verification.isVerifiedBot) return false;
    return verification.isBot;
  } catch (e) {
    console.error(
      `[botid] check failed: ${e instanceof Error ? e.message : String(e)}`
    );
    return false;
  }
}
