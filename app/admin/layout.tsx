import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs text-ink-soft">川口典礼 — 管理画面</p>
            <h1 className="font-serif-jp text-lg text-ink-deep md:text-xl">
              SEO ダッシュボード（読み取り専用）
            </h1>
          </div>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink-mid">
            noindex
          </span>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
