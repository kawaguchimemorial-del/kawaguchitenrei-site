import type { Metadata } from "next";

import { LpAnalytics } from "./LpAnalytics";

// 広告LP専用（CLAUDE.md §21）。
// 検索結果には一切出さない。sitemap.ts にも追加しない。
// robots.txt の Disallow には入れない（入れると noindex が読まれず、広告の審査クローラも通れない）。
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function LpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // LpAnalytics は lp_* イベント（電話タップ・プラン展開・フォーム開始等）を
  // 既存の Google タグへ直接送る。本サイト側のイベントとは合算しない。
  return (
    <>
      {children}
      <LpAnalytics />
    </>
  );
}
