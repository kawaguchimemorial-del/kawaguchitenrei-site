import type { Metadata } from "next";

// 社内専用ツール。検索エンジン・Google 検索に出さない（noindex,nofollow）。
// robots.ts でも /post を disallow して二重に除外している。
export const metadata: Metadata = {
  title: "封筒宛名印刷（社内用）",
  description: "社内用の封筒（長形3号）宛名印刷ツール",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
