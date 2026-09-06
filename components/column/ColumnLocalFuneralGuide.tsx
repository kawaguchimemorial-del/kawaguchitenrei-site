import { ArrowRightIcon } from "@/components/common/icons";

// コラム記事下の「地域密着・川口市の葬儀（形式別）」導線。
// 情報系コラムの流入を、川口市×葬儀形式のサービス相談へ自然に接続する。
// 価格は表示しない方針（形式名＋1行説明のみ）。

type LocalPlanLink = {
  label: string;
  description: string;
  href: string;
};

// 施設・エリアへの導線。コラム群から斎場・火葬場・エリアハブへ内部リンクを通す。
const LOCAL_FACILITY_LINKS: { label: string; href: string }[] = [
  { label: "川口市めぐりの森（火葬場）", href: "/saijo/megurinomori/" },
  { label: "川口市・近隣の葬儀場一覧", href: "/saijo/" },
  { label: "川口市の葬儀ガイド", href: "/area/kawaguchi/" },
];

const LOCAL_PLAN_LINKS: LocalPlanLink[] = [
  {
    label: "家族葬プランの料金と内容",
    description: "ご家族や親しい方を中心に、ゆっくりお別れする葬儀",
    href: "/plan/family-funeral/",
  },
  {
    label: "川口市の一日葬",
    description: "通夜を行わず、告別式と火葬を1日で執り行う形式",
    href: "/plan/oneday-funeral/",
  },
  {
    label: "川口市の火葬式",
    description: "通夜・告別式を行わないお別れのご相談",
    href: "/plan/cremation/",
  },
  {
    label: "川口市の直葬",
    description: "火葬を中心とした、シンプルなお見送り",
    href: "/plan/direct-funeral/",
  },
  {
    label: "川口市の市民葬",
    description: "川口市民の方の市民葬制度に対応",
    href: "/plan/kawaguchi-shimin/",
  },
];

export function ColumnLocalFuneralGuide() {
  return (
    <section className="mt-12 rounded-lg border border-line bg-paper px-5 py-7 md:px-8 md:py-9">
      <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
        Local
      </p>
      <p className="mt-2 text-sm font-semibold text-ink-mid">川口市の葬儀</p>
      <h2 className="font-serif-jp mt-3 text-xl font-medium leading-[1.5] text-ink-deep md:text-2xl">
        川口市で葬儀をお考えのご家族へ
      </h2>
      <p className="mt-4 text-sm leading-[1.95] text-ink-mid md:text-base md:leading-[2.05]">
        川口典礼は、川口市西新井宿の自社式場「川口メモリアルホール」を拠点に、川口市めぐりの森まで車で約5分の立地で、地域に密着してお手伝いしています。ご家族の状況に合わせて、川口市での葬儀を形式別にご案内します。
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {LOCAL_PLAN_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group flex h-full flex-col rounded-lg border border-line bg-white p-4 transition hover:border-brand hover:shadow-sm md:p-5"
            >
              <p className="font-serif-jp text-base font-medium text-ink-deep group-hover:text-brand">
                {link.label}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-ink-mid">
                {link.description}
              </p>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-line-soft pt-5">
        <p className="text-xs font-semibold text-ink-mid">
          施設・エリアのご案内
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {LOCAL_FACILITY_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
              >
                {link.label}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
