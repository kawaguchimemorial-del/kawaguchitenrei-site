const footerColumns = [
  {
    title: "葬儀について",
    items: [
      { label: "葬儀プラン一覧", href: "/plan/" },
      { label: "家族葬", href: "/plan/family-funeral/" },
      { label: "一日葬", href: "/plan/oneday-funeral/" },
      { label: "火葬式", href: "/plan/cremation/" },
      { label: "直葬", href: "/plan/direct-funeral/" },
      { label: "よくある質問", href: "/faq/" },
    ],
  },
  {
    title: "施設・事例",
    items: [
      { label: "川口メモリアルホール", href: "/hall/kawaguchi-memorial-hall/" },
      { label: "川口市めぐりの森", href: "/saijo/megurinomori/" },
      { label: "施行事例", href: "/case/" },
      { label: "お客様の声", href: "/voice/" },
    ],
  },
  {
    title: "対応エリア",
    items: [
      { label: "川口市", href: "/area/kawaguchi/" },
    ],
  },
];

const policyLinks = [
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "特定商取引法に基づく表記", href: "/tokushoho/" },
  { label: "サイトマップ", href: "/sitemap/" },
];

export function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-10 md:px-8 md:py-20">
        <div>
          <p className="font-serif-jp text-2xl font-medium tracking-[0.04em]">
            川口典礼
          </p>
          <p className="mt-1 text-sm font-semibold text-white/80">
            川口メモリアルホール
          </p>

          <div className="mt-6 space-y-1 text-sm leading-7 text-white/85">
            <p>〒333-0833</p>
            <p>埼玉県川口市西新井宿440-1</p>
          </div>

          <div className="mt-6 rounded-lg border border-white/15 bg-white/5 p-4">
            <p className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">
              24時間365日 受付
            </p>
            <a
              href="tel:0120-963-765"
              className="font-serif-jp mt-1 block text-2xl font-medium text-white hover:underline"
            >
              0120-963-765
            </a>
            <p className="mt-2 text-xs leading-6 text-white/70">
              深夜・早朝のご相談、病院・施設・ご自宅へのお迎えにも対応します。
            </p>
          </div>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-bold tracking-wide text-white">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {col.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition hover:text-white hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 text-xs text-white/65 md:flex-row md:items-center md:justify-between md:px-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="tracking-wide">
            © {new Date().getFullYear()} Kawaguchi Tenrei. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
