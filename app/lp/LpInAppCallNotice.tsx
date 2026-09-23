"use client";

import { useEffect, useState } from "react";

import { PHONE_DISPLAY } from "./lp-data";

// アプリ内ブラウザ（Android の WebView、LINE・Instagram・Facebook のアプリ内表示）では、
// 電話ボタンを押しても発信画面が開かないことがある。2026-09-21〜23 の GA4 で、
// Android WebView だけ1人あたりのタップ回数が突出していた（同じ端末が15分で12回など）。
// 該当する環境のときだけ、番号のコピーと直接発信の案内を出す。
// サーバー描画では何も出さない（UA 判定はブラウザでのみ行う）。
const IN_APP_UA = /; wv\)|Line\/|FBAN|FBAV|Instagram/i;

export function LpInAppCallNotice({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [inApp, setInApp] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // UA はブラウザでしか読めないため、描画後に一度だけ判定する。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInApp(IN_APP_UA.test(navigator.userAgent));
  }, []);

  if (!inApp) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY.replaceAll("-", ""));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const dark = tone === "dark";
  return (
    <div
      className={`mt-3 rounded-lg border px-3 py-2.5 text-left text-[13px] leading-6 ${
        dark ? "border-white/40 text-white" : "border-line bg-white text-ink"
      }`}
    >
      <p>
        アプリの中で開いた画面では、ボタンから発信できないことがあります。つながらない場合は、番号をコピーして電話アプリからおかけください。
      </p>
      <button
        type="button"
        onClick={copy}
        className={`mt-2 w-full rounded-md border-2 px-3 py-2 text-sm font-bold ${
          dark ? "border-white/70" : "border-brand text-brand"
        }`}
      >
        {copied ? "コピーしました" : "番号をコピーする"}
      </button>
    </div>
  );
}
