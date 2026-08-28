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
    // 広告LPの事前相談フォーム。
    //
    // 【重要】Server Action の送信先は「フォームが置かれているページのURL」になる。
    // LpContactForm は /lp/contact/ だけでなく /lp/ にも埋め込んでいるため、
    // 両方を登録する必要がある。
    // 登録し忘れるとクライアント側の BotID トークンが発行されず、
    // checkBotId() が bot と判定し、画面上は「受け付けました」と出たまま
    // 送信されない（2026-08-28 に /lp/ 側で発生）。
    { path: "/lp", method: "POST" },
    { path: "/lp/", method: "POST" },
    { path: "/lp/contact", method: "POST" },
    { path: "/lp/contact/", method: "POST" },
  ],
});
