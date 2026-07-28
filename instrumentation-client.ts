import { initBotId } from "botid/client/core";

// Vercel BotID（invisible bot 検知）のクライアント初期化。
// 保護対象は問い合わせ系フォームの Server Action 送信先（＝フォームが置かれたページ）のみ。
// trailingSlash: true のため、末尾スラッシュ有無の両方を登録する。
initBotId({
  protect: [
    { path: "/contact", method: "POST" },
    { path: "/contact/", method: "POST" },
    { path: "/estimate", method: "POST" },
    { path: "/estimate/", method: "POST" },
  ],
});
