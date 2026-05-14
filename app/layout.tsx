import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomCTA } from "@/components/layout/MobileBottomCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: "川口典礼 | 川口市・新井宿の葬儀・家族葬",
  description:
    "川口市・新井宿で葬儀・家族葬をご検討の方へ。川口メモリアルホールを拠点に、24時間365日対応します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-paper pb-[calc(6rem+env(safe-area-inset-bottom))] text-ink md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBottomCTA />
      </body>
    </html>
  );
}
