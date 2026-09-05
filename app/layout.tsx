import type { Metadata } from "next";
import Script from "next/script";
import { analyticsPolicyScript } from "@/lib/analytics-policy";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import {
  GoogleTagManager,
} from "@/components/analytics/GoogleTagManager";
import {
  FooterSlot,
  HeaderSlot,
  MobileBottomCTASlot,
  RevealOnScrollSlot,
} from "./_layout-slots";
import "./globals.css";

const SITE_NAME = "川口典礼";
const SITE_TITLE =
  "川口典礼 | 川口市・新井宿の葬儀・家族葬 | めぐりの森まで車5分・駐車場70台";
const SITE_DESCRIPTION =
  "川口市・新井宿の地域密着葬儀社。川口市めぐりの森まで車5分・駐車場70台の川口メモリアルホールで、家族葬から最大200名の一般葬まで対応。創業20年・年間約260件の施行実績。24時間365日受付。";

export const metadata: Metadata = {
  metadataBase: new URL("https://kawaguchitenrei.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // OG 既定。openGraph を自前で定義していないページ（各種一覧・規約・会社情報等）は
  // この既定を継承する（Next の metadata は openGraph を浅くマージ＝未定義時は親を丸ごと継承）。
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    url: "https://kawaguchitenrei.com/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/home/hall/hall-exterior.jpg",
        width: 1200,
        height: 800,
        alt: "川口メモリアルホールの外観",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="h-full scroll-smooth antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-paper pb-[calc(6rem+env(safe-area-inset-bottom))] text-ink md:pb-0">
        <Script id="analytics-policy" strategy="beforeInteractive">{analyticsPolicyScript}</Script>
        <GoogleTagManager />
        <HeaderSlot />
        <main>{children}</main>
        <FooterSlot />
        <MobileBottomCTASlot />
        <RevealOnScrollSlot />
        {/* Vercel Web Analytics（ページビュー計測のみ・カスタムイベントなし） */}
        <SiteAnalytics />
      </body>
    </html>
  );
}
