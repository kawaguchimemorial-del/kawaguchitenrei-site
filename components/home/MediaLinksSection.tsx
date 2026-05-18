type MediaLink = {
  site: string;
  label: string;
  href: string;
};

const mediaLinks: MediaLink[] = [
  {
    site: "あんしん葬儀",
    label: "あんしん葬儀 インタビュー記事",
    href: "https://ansinsougi.jp/s-1435/interview",
  },
  {
    site: "葬儀の口コミ",
    label: "葬儀の口コミで川口典礼のクチコミをチェックする",
    href: "https://soogi.jp/saitama/kawaguchi/1098634",
  },
  {
    site: "いい葬儀",
    label: "いい葬儀 インタビュー記事が公開されました",
    href: "https://www.e-sogi.com/guide/59039/",
  },
];

export function MediaLinksSection() {
  return (
    <section
      aria-labelledby="media-heading"
      className="border-t border-line-soft bg-paper py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase">
            Media
          </p>
          <h2
            id="media-heading"
            className="font-serif-jp mt-2 text-lg font-medium text-ink-deep md:text-xl"
          >
            掲載・紹介メディア
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink-mid">
            川口典礼をご紹介いただいている外部サイトです。各サイトへ移動します。
          </p>
        </div>

        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {mediaLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label}(外部サイト・新規タブで開く)`}
                className="flex h-full items-start justify-between gap-3 rounded-lg border border-line-soft bg-white px-4 py-4 text-sm leading-6 text-ink transition hover:border-line hover:text-ink-deep"
              >
                <span className="flex-1">
                  <span className="block text-xs font-semibold text-ink-soft">
                    {link.site}
                  </span>
                  <span className="mt-1 block">{link.label}</span>
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-base text-ink-soft"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
