const navItems = [
  { label: "葬儀プラン", href: "/#plans" },
  { label: "ホール", href: "/#hall" },
  { label: "施行事例", href: "/#cases" },
  { label: "お客様の声", href: "/#voices" },
  { label: "よくある質問", href: "/#faq" },
  { label: "アクセス", href: "/#access" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a
          href="/"
          className="flex flex-col gap-0.5"
          aria-label="川口典礼 ホーム"
        >
          <span className="font-serif-jp text-[1.4rem] font-medium leading-none tracking-[0.04em] text-ink-deep md:text-2xl">
            川口典礼
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-ink-mid md:text-xs">
            川口メモリアルホール / 川口市西新井宿
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold text-ink-deep lg:flex"
          aria-label="サイト内ナビゲーション"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex flex-col items-end leading-tight">
            <span className="text-[10px] font-semibold tracking-widest text-ink-soft uppercase">
              24h365日 受付
            </span>
            <a
              href="tel:0120-963-765"
              className="font-serif-jp text-xl font-medium text-emergency hover:underline"
            >
              0120-963-765
            </a>
          </div>
          <a
            href="tel:0120-963-765"
            className="inline-flex items-center gap-2 rounded-lg bg-emergency px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emergency-deep md:px-5"
          >
            <span aria-hidden>☎</span>
            電話する
          </a>
        </div>
      </div>
    </header>
  );
}
