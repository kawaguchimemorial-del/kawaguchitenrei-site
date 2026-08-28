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
    // 広告LPの事前相談フォーム。ここを登録し忘れると、クライアント側の
    // BotID トークンが発行されず checkBotId() が bot と判定し、
    // 画面上は「受け付けました」と出たまま送信されない（2026-08-28 に発生）。
    { path: "/lp/contact", method: "POST" },
    { path: "/lp/contact/", method: "POST" },
  ],
});
