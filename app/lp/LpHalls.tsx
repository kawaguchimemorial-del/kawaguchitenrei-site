import Image from "next/image";
import Link from "next/link";

import { templeHallAreas } from "@/lib/temple-halls";
import { PHONE_DISPLAY, PHONE_HREF } from "./lp-data";

/**
 * 「川口市でご利用いただける式場」
 *
 * 設計（2026-08-27 討議）：
 *  ・自社式場を最上位に、写真2枚＋選ばれる理由つきで大きく置く
 *  ・寺院会館・民営式場は名称・住所・駐車場・規模だけの簡易カードにする
 *  ・写真の有無と情報量で差をつけ、選択肢は見せつつ自社式場に寄せる
 *    （競合 ososhiki.kinpoudou.co.jp も自社式場のみ写真2枚＋理由つき、
 *      他施設は写真1枚とグレー枠で扱いを分けている：2026-08-27 実測）
 *  ・掲載施設は当社が運営する施設ではないため、注記を必ず添える
 *  ・式場使用料は施設ごとに異なるため、他施設の金額はLPに出さない（/saijo/ へ誘導）
 *  ・自社式場の「式場使用料無料」は 2026-08-27 松澤判断で掲載。
 *    lib/plans.ts の「式場使用料（外部斎場を利用する場合）」と整合する
 */

const OWN_HALL_REASONS = [
  "式場使用料が無料。外部の斎場を借りる場合に必要な費用がかかりません",
  "川口市めぐりの森まで車で約5分。ご移動の負担を抑えられます",
  "駐車場70台・敷地内で無料。お車の参列者が多くても安心です",
  "貸式場ではなく自社の式場。時間に追われずお別れいただけます",
];

export function LpHalls() {
  const totalHalls = templeHallAreas.reduce(
    (count, area) => count + area.halls.length,
    0
  );

  return (
    <section id="halls" className="scroll-mt-24 bg-paper px-5 py-10">
      <div className="mx-auto max-w-2xl md:max-w-5xl">
        <p className="text-center text-xs tracking-[0.16em] text-brand-soft">
          HALL
        </p>
        <h2 className="mt-1 text-center text-[24px] font-black text-ink-deep md:text-[38px]">
          川口市でご利用いただける式場
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium leading-7 text-ink md:text-base md:leading-8">
          自社式場「川口メモリアルホール」のほか、川口市内の寺院会館・民営式場でのご葬儀にも対応しています。
          ご希望の地域・ご参列の人数・菩提寺とのお付き合いに合わせてお選びいただけます。
        </p>

        {/* 自社式場（最上位） */}
        <div className="mt-7 overflow-hidden rounded-2xl border-2 border-brand bg-white shadow-md">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="relative h-40 w-full md:h-56">
              <Image
                src="/images/home/hero/hall-exterior-hero.jpg"
                alt="川口メモリアルホールの外観"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 480px, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-40 w-full md:h-56">
              <Image
                src="/images/home/hall/hall-ceremony-room.jpg"
                alt="川口メモリアルホールの式場"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 480px, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-brand px-2.5 py-1 text-[12px] font-bold text-white">
                自社式場
              </span>
              <span className="rounded bg-emergency px-2.5 py-1 text-[12px] font-bold text-white">
                式場使用料 無料
              </span>
              <span className="rounded border border-emergency px-2 py-0.5 text-[11px] font-bold text-emergency">
                式場見学できます
              </span>
              <span className="rounded border border-emergency px-2 py-0.5 text-[11px] font-bold text-emergency">
                24時間ご相談
              </span>
            </div>

            <p className="mt-2 text-[26px] font-black leading-tight text-brand-deep md:text-3xl">
              川口メモリアルホール
            </p>
            <p className="mt-1.5 text-[14px] font-medium leading-6 text-ink">
              埼玉県川口市西新井宿440-1
              <br />
              埼玉高速鉄道「新井宿」駅 徒歩約10分／首都高「新井宿出入口」約5分
            </p>

            <div className="mt-4 rounded-lg border border-line bg-paper p-4">
              <p className="text-[14px] font-bold text-ink-deep">
                この式場が選ばれる理由
              </p>
              <ol className="mt-2 space-y-1.5">
                {OWN_HALL_REASONS.map((reason, index) => (
                  <li
                    key={reason}
                    className="flex gap-2 text-[14px] font-medium leading-6 text-ink"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    {reason}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[13px] leading-6 text-ink-mid">
                ※
                式場使用料が無料になるのは、自社式場「川口メモリアルホール」をご利用の場合です。
                <strong className="font-bold text-ink-deep">
                  外部の斎場をご利用の場合は、その施設の式場使用料が別途必要
                </strong>
                になります。火葬料・お料理・返礼品・宗教者へのお礼などは、いずれの場合も別途申し受けます。
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={PHONE_HREF}
                className="flex flex-col items-center rounded-lg bg-emergency px-4 py-3 text-white transition hover:bg-emergency-deep"
              >
                <span className="text-[11px] font-bold">
                  24時間365日・通話無料
                </span>
                <span className="text-xl font-bold tracking-wide">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <Link
                href="/hall/kawaguchi-memorial-hall/"
                className="flex items-center justify-center rounded-lg border-2 border-brand bg-white px-4 py-3 text-[15px] font-bold text-brand"
              >
                式場の詳細を見る
              </Link>
            </div>
          </div>
        </div>

        {/* 寺院会館・民営式場 */}
        <div className="mt-9">
          <h3 className="text-[19px] font-black text-ink-deep md:text-2xl">
            川口市内の寺院会館・民営式場（{totalHalls}会場）
          </h3>
          <p className="mt-1.5 text-[14px] font-medium leading-6 text-ink-mid">
            菩提寺とのお付き合いを大切にされたい方、ご自宅や参列者が集まりやすい地域でお別れをご希望の方の選択肢です。
          </p>

          <div className="mt-4 space-y-5">
            {templeHallAreas.map((area) => (
              <div key={area.id}>
                <p className="rounded bg-brand-tint px-3 py-1.5 text-[14px] font-bold text-brand-deep">
                  {area.groupName}
                </p>
                <ul className="mt-2 grid gap-2 md:grid-cols-3">
                  {area.halls.map((hall) => (
                    <li
                      key={hall.name}
                      className="rounded-lg border border-line bg-white p-3"
                    >
                      <p className="text-[15px] font-bold text-ink-deep">
                        {hall.name}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-5 text-ink-mid">
                        {hall.address}
                      </p>
                      <p className="mt-1 text-[12px] leading-5 text-ink-soft">
                        駐車場 {hall.parking}／{hall.capacity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-line bg-white p-4">
            <p className="text-[13px] leading-6 text-ink-mid">
              ※
              掲載している寺院会館・民営式場は、川口典礼が運営する施設ではありません。川口典礼で葬儀のご相談・手配に対応している式場としてご案内しています。
              <strong className="font-bold text-ink-deep">
                式場使用料・空き状況・利用条件は施設ごとに異なり、変更となる場合があります。
              </strong>
              最新の状況は川口典礼で確認のうえご案内します。
            </p>
            <p className="mt-3 text-[14px]">
              <Link
                href="/saijo/"
                className="font-bold text-brand underline underline-offset-4"
              >
                各式場の詳細・使用料の目安を見る
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
