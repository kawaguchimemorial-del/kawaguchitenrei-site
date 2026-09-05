"use client";
// SSR is retained; one small prop payload avoids repeating the full LP element tree in Flight.
import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "./lp-constants";
import { LpTopBar } from "./LpTopBar";
import { LpStickyCta } from "./LpStickyCta";
import s from "./lp.module.css";
import type { LpPlan } from "./lp-data";
type DisplayPlan = Pick<
  LpPlan,
  | "slug"
  | "name"
  | "people"
  | "days"
  | "mainAmount"
  | "mainSuffix"
  | "mainPrice"
  | "memberPrice"
  | "href"
  | "lead"
>;
type Props = {
  featured: DisplayPlan[];
  otherPlans: DisplayPlan[];
  quotes: { slug: string; comment: string }[];
  company: { yearsInBusiness: number; address: string };
};
const faqs = [
  [
    "深夜・早朝でも相談できますか？",
    "24時間365日、お電話を受け付けています。病院・施設からのお迎えや、ご安置場所についても、ご状況をうかがってご案内します。",
  ],
  [
    "電話をしたら、すぐ契約になりますか？",
    "ご相談の段階で葬儀の内容を決める必要はありません。ご希望とご予算をうかがい、お見積りをご確認いただいてからお決めいただけます。",
  ],
  [
    "表示価格以外に、どのような費用がかかりますか？",
    "火葬料、お料理、返礼品、宗教者へのお礼などは別途必要です。ご安置日数や搬送距離、外部式場の利用によっても変わります。総額の目安をお見積りでご説明します。",
  ],
  [
    "安置中に面会できますか？",
    "面会をご希望の方はお申し付けください。ご利用のプランやご安置場所により条件が異なります。シンプル直葬では、お預かり中の面会を行いません。",
  ],
  [
    "まだ先のことですが、相談できますか？",
    "事前のご相談・お見積り・式場見学も承ります。お電話または事前相談フォームをご利用ください。見学はご予約のうえご案内します。",
  ],
];
function Phone({
  placement,
  compact = false,
}: {
  placement: string;
  compact?: boolean;
}) {
  return (
    <a
      className={compact ? s.phoneCompact : s.phone}
      href={PHONE_HREF}
      data-lp-event="lp_click_tel"
      data-lp-placement={placement}
    >
      <span>
        {compact ? "電話で相談する" : "お迎え・ご安置のご相談も、こちらへ"}
      </span>
      <strong>{PHONE_DISPLAY}</strong>
      <small>通話無料 · 24時間365日受付</small>
    </a>
  );
}
export function LpContent({ featured, otherPlans, quotes, company }: Props) {
  return (
    <>
      <LpTopBar />
      <section className={s.hero} aria-labelledby="lp-title">
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>
            川口市・新井宿の葬儀社 ／ 自社式場でのお見送り
          </p>
          <h1 id="lp-title">
            大切なお別れを、
            <br />
            <em>いつもの街で。</em>
          </h1>
          <p className={s.heroService}>川口市の家族葬・一日葬・直葬</p>
          <p className={s.heroLead}>
            まだ何も決まっていなくて、大丈夫です。
            <br />
            お迎え、ご安置、費用のこと。
            <br />
            いま必要なことから、一緒に整理します。
          </p>
          <Phone placement="hero" />
          <Link className={s.textLink} href="#price">
            まずは費用の目安を知りたい <span aria-hidden>↓</span>
          </Link>
        </div>
        <figure className={s.heroPhoto}>
          <Image
            src="/images/home/hero/hall-exterior-hero.jpg"
            alt="川口典礼の自社式場・川口メモリアルホールの外観"
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
            preload
            className={s.cover}
          />
          <figcaption>
            <span>ご家族をお迎えする、私たちの式場</span>
            <strong>川口メモリアルホール</strong>
            <small>埼玉県川口市西新井宿440-1</small>
          </figcaption>
        </figure>
      </section>
      <div className={s.facts} aria-label="川口典礼の基本情報">
        <p>
          川口市で<strong>創業{company.yearsInBusiness}年</strong>
        </p>
        <p>
          めぐりの森まで<strong>車で約5分</strong>
        </p>
        <p>
          敷地内・無料<strong>駐車場70台</strong>
        </p>
      </div>
      <section id="urgent" className={`${s.section} ${s.urgent}`}>
        <div>
          <p className={s.eyebrow}>急なことで、お困りの方へ</p>
          <h2>
            「何から始めればいいか」
            <br />
            そのご相談から承ります。
          </h2>
        </div>
        <div>
          <p>
            病院から移動をお願いされた、ご自宅に安置する場所がない。深夜・早朝も、まずご状況をお聞かせください。
          </p>
          <ol className={s.steps}>
            <li>
              <b>1</b>
              <span>いまいらっしゃる場所</span>
            </li>
            <li>
              <b>2</b>
              <span>お迎え・ご安置のご希望</span>
            </li>
            <li>
              <b>3</b>
              <span>ご不安なこと、費用のこと</span>
            </li>
          </ol>
          <p className={s.note}>
            わかる範囲で構いません。ご相談の段階でプランを決める必要はありません。
          </p>
        </div>
      </section>
      <section id="price" className={`${s.section} ${s.priceSection}`}>
        <p className={s.eyebrow}>ご希望に合わせたお見送り</p>
        <h2>
          費用と内容を、
          <br className={s.mobileBreak} />
          わかりやすく。
        </h2>
        <p className={s.sectionLead}>
          ご逝去後にご相談の方にもわかるよう、<strong>通常価格・税込</strong>
          でご案内します。
          <br />
          表示はプラン料金です。火葬料などの別途費用を含む総額は、お見積りでご確認ください。
        </p>
        <div className={s.plans}>
          {featured.map((p, i) => (
            <article key={p.slug} className={s.plan}>
              <p className={s.planIndex}>
                0{i + 1}
                <span>{p.lead}</span>
              </p>
              <h3>{p.name}</h3>
              <p className={s.planPeople}>
                {p.people} · {p.days}
              </p>
              <p className={s.price}>
                <small>通常価格</small>
                <strong>{p.mainAmount}</strong>
                <span>{p.mainSuffix}</span>
              </p>
              <p className={s.member}>事前相談会員価格 {p.memberPrice}</p>
              <p className={s.planFlow}>
                {p.slug === "direct-funeral"
                  ? "お迎え・ご安置 → ご火葬"
                  : p.slug === "oneday-funeral"
                    ? "お迎え・ご安置 → 告別式 → ご火葬"
                    : "お迎え・ご安置 → 通夜 → 告別式 → ご火葬"}
              </p>
              <Link
                href={p.href}
                data-lp-event="lp_plan_open"
                data-lp-placement="price"
                data-lp-plan={p.slug}
                className={s.planLink}
              >
                含まれる内容を確認する <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>
        <details className={s.morePlans}>
          <summary>
            花入れお別れ・夕暮れ家族葬・川口市民葬もご案内しています{" "}
            <span aria-hidden>＋</span>
          </summary>
          <div>
            {otherPlans.map((p) => (
              <p key={p.slug}>
                <Link
                  href={p.href}
                  data-lp-event="lp_plan_open"
                  data-lp-placement="other_plans"
                  data-lp-plan={p.slug}
                >
                  {p.name} ↗
                </Link>
                <strong>{p.mainPrice}</strong>
                <small>
                  {p.lead}
                  {p.memberPrice
                    ? ` ／ 事前相談会員価格 ${p.memberPrice}`
                    : " ／ 適用条件はご相談ください"}
                </small>
              </p>
            ))}
          </div>
        </details>
        <div className={s.costNote}>
          <h3>お見積りで、ここまで確認します。</h3>
          <p>
            プランの内容、ご安置の日数、搬送距離、火葬料、お料理・返礼品、宗教者へのお礼。必要なものと別途費用を分けてご説明します。
          </p>
          <p className={s.note}>
            自社式場をご利用の場合は式場使用料がプランに含まれます。外部式場では、その施設の使用料が別途必要です。事前相談会員価格は生前にご相談いただいた方が対象です。
          </p>
        </div>
      </section>
      <section id="hall" className={`${s.section} ${s.hall}`}>
        <div className={s.hallPhotos}>
          <Image
            src="/images/home/hall/hall-ceremony-room.jpg"
            alt="川口メモリアルホールの式場"
            width={760}
            height={570}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <Image
            src="/images/home/hall/hall-family-waiting-room.jpg"
            alt="川口メモリアルホールのご親族控室"
            width={360}
            height={255}
            sizes="(max-width: 760px) 45vw, 240px"
          />
        </div>
        <div>
          <p className={s.eyebrow}>川口典礼の自社式場</p>
          <h2>
            ご家族が、
            <br />
            落ち着いて過ごせる場所。
          </h2>
          <p className={s.sectionLead}>
            川口メモリアルホールは、川口市・新井宿にある自社式場です。お見送りの時間も、お待ちいただく時間も、ご家族のご希望をうかがいながらご案内します。
          </p>
          <dl className={s.hallData}>
            <div>
              <dt>所在地</dt>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt>アクセス</dt>
              <dd>
                「新井宿」駅 徒歩約10分
                <br />
                敷地内駐車場70台・無料
              </dd>
            </div>
            <div>
              <dt>火葬場</dt>
              <dd>川口市めぐりの森まで車で約5分</dd>
            </div>
          </dl>
          <p className={s.note}>
            川口市めぐりの森は川口市営の火葬場です。川口典礼の運営施設ではなく、通夜・告別式の式場はありません。
          </p>
          <a
            className={s.textLink}
            href="https://www.google.com/maps/search/?api=1&query=川口メモリアルホール+川口市西新井宿440-1"
            target="_blank"
            rel="noopener noreferrer"
            data-lp-event="lp_directions"
            data-lp-placement="hall"
          >
            場所・駐車場を確認する ↗
          </a>
        </div>
      </section>
      <section className={`${s.section} ${s.voiceSection}`}>
        <p className={s.eyebrow}>ご葬儀後のアンケートより</p>
        <h2>ご家族から、いただいた声。</h2>
        <div className={s.quotes}>
          {quotes.map((v) => (
            <figure key={v.slug}>
              <blockquote>{v.comment}</blockquote>
              <figcaption>
                お客様アンケートより{" "}
                <Link href={`/voice/${v.slug}/`}>原文・アンケートを見る ↗</Link>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={s.note}>
          掲載許可をいただいたご感想です。感じ方には個人差があります。
        </p>
      </section>
      <section className={`${s.section} ${s.faq}`}>
        <p className={s.eyebrow}>ご相談の前に</p>
        <h2>よくあるご質問</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden>＋</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section id="contact" className={s.finalCta}>
        <div>
          <p className={s.eyebrow}>
            決まっていないことがあっても、大丈夫です。
          </p>
          <h2>
            まずは、お話を
            <br className={s.mobileBreak} />
            聞かせてください。
          </h2>
          <div className={s.contactChoices}>
            <div>
              <h3>お急ぎのご相談・お迎えのご依頼</h3>
              <Phone placement="bottom" compact />
            </div>
            <div>
              <h3>これからに備える事前のご相談</h3>
              <p>
                費用のお見積りや式場見学も承ります。
                <br />
                ご相談・お見積りは無料です。
              </p>
              <Link
                href="/lp/contact/"
                className={s.formLink}
                data-lp-event="lp_contact_open"
                data-lp-placement="bottom"
              >
                事前相談フォームへ <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className={s.footer}>
        <p>
          <strong>川口典礼</strong>川口メモリアルホール
          <br />
          {company.address}
        </p>
        <div>
          <Link href="/company/">運営会社</Link>
          <Link href="/privacy/">プライバシーポリシー</Link>
          <Link href="/tokushoho/">特定商取引法に基づく表記</Link>
        </div>
        <small>© {new Date().getFullYear()} 川口典礼</small>
      </footer>
      <LpStickyCta />
    </>
  );
}
