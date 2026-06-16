import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ChevronRightIcon } from "@/components/common/icons";
import { plans } from "@/lib/plans";
import { cases } from "@/lib/cases";
import { voices } from "@/lib/voices";
import { columns } from "@/lib/columns";
import { halls } from "@/lib/halls";
import { saijoList } from "@/lib/saijo";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: "サイトマップ | 川口典礼",
  description:
    "川口典礼サイト内のページ一覧です。葬儀プラン、施行事例、お客様の声、コラム、斎場・対応エリア、お問い合わせなど、目的のページを探しやすくご案内します。",
  alternates: { canonical: "/sitemap/" },
};

type Link = { label: string; href: string };
type Group = { title: string; links: Link[] };

const mainPages: Link[] = [
  { label: "ホーム", href: "/" },
  { label: "葬儀プラン一覧", href: "/plan/" },
  { label: "施行事例一覧", href: "/case/" },
  { label: "お客様の声一覧", href: "/voice/" },
  { label: "コラム一覧", href: "/column/" },
  { label: "自社ホール 川口メモリアルホール", href: "/hall/kawaguchi-memorial-hall/" },
  { label: "斎場 川口市めぐりの森", href: "/saijo/megurinomori/" },
  { label: "対応エリア 川口市", href: "/area/kawaguchi/" },
  { label: "アクセス", href: "/access/" },
  { label: "会社案内", href: "/company/" },
  { label: "よくある質問", href: "/faq/" },
  { label: "ペット火葬のご相談", href: "/pet/" },
];

const contactPages: Link[] = [
  { label: "事前相談・お問い合わせ", href: "/contact/" },
  { label: "概算見積り", href: "/estimate/" },
];

const legalPages: Link[] = [
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "特定商取引法に基づく表記", href: "/tokushoho/" },
  { label: "サイトマップ", href: "/sitemap/" },
];

const planLinks: Link[] = plans.map((p) => ({
  label: p.name,
  href: `/plan/${p.slug}/`,
}));

const caseLinks: Link[] = [...cases]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .map((c) => ({ label: c.title, href: `/case/${c.slug}/` }));

const voiceLinks: Link[] = [...voices]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .map((v) => ({ label: `「${v.title}」`, href: `/voice/${v.slug}/` }));

const columnLinks: Link[] = [...columns]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .map((c) => ({ label: c.title, href: `/column/${c.slug}/` }));

const hallLinks: Link[] = halls.map((h) => ({
  label: h.name,
  href: `/hall/${h.slug}/`,
}));

const saijoLinks: Link[] = saijoList.map((s) => ({
  label: s.name,
  href: `/saijo/${s.slug}/`,
}));

const areaLinks: Link[] = areas.map((a) => ({
  label: a.name,
  href: `/area/${a.slug}/`,
}));

const groups: Group[] = [
  { title: "メインページ", links: mainPages },
  { title: "葬儀プラン", links: planLinks },
  { title: "施行事例", links: caseLinks },
  { title: "お客様の声", links: voiceLinks },
  { title: "コラム", links: columnLinks },
  { title: "斎場・ホール", links: [...hallLinks, ...saijoLinks] },
  { title: "対応エリア", links: areaLinks },
  { title: "お問い合わせ・お見積り", links: contactPages },
  { title: "サイト情報", links: legalPages },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        subLabel="サイトマップ"
        title={<>サイト内のページ一覧。</>}
        description={
          <p>
            川口典礼サイト内のページをカテゴリ別にご案内します。お探しの情報がある方は、こちらから目的のページへお進みください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サイトマップ" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="space-y-12">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="font-serif-jp text-2xl font-medium leading-[1.4] text-ink-deep md:text-3xl">
                  {group.title}
                </h2>
                {group.links.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-soft">
                    現在、公開中のページはありません。
                  </p>
                ) : (
                  <ul className="mt-5 grid gap-2 md:grid-cols-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-base leading-7 text-ink hover:text-brand md:text-lg"
                        >
                          <ChevronRightIcon className="h-3.5 w-3.5 text-ink-soft" />
                          <span className="underline-offset-4 hover:underline">
                            {link.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
