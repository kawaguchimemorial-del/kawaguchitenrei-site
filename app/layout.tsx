import type { Metadata } from "next";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";
import {
  FooterSlot,
  HeaderSlot,
  MobileBottomCTASlot,
  RevealOnScrollSlot,
} from "./_layout-slots";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kawaguchitenrei.com"),
  title: "川口典礼 | 川口市・新井宿の葬儀・家族葬 | めぐりの森まで車5分・駐車場70台",
  description:
    "川口市・新井宿の地域密着葬儀社。川口市めぐりの森まで車5分・駐車場70台の川口メモリアルホールで、家族葬から最大200名の一般葬まで対応。創業20年・年間約260件の施行実績。24時間365日受付。",
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
      <GoogleTagManager />
      <body className="min-h-full bg-paper pb-[calc(6rem+env(safe-area-inset-bottom))] text-ink md:pb-0">
        <GoogleTagManagerNoscript />
        <HeaderSlot />
        <main>{children}</main>
        <FooterSlot />
        <MobileBottomCTASlot />
        <RevealOnScrollSlot />
      </body>
    </html>
  );
}
