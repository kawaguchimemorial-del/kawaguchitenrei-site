import Link from "next/link";
import type { Metadata } from "next";
import { LpStickyCta } from "../LpStickyCta";
import { LpTopBar } from "../LpTopBar";
import { PHONE_DISPLAY, PHONE_HREF } from "../lp-constants";
import { LpContactForm } from "./LpContactForm";
import s from "../lp.module.css";
export const metadata: Metadata = {
  title: "事前のご相談｜川口典礼",
  alternates: { canonical: "https://kawaguchitenrei.com/lp/contact/" },
};
export default function LpContactPage() {
  return (
    <>
      <LpTopBar />
      <div className={s.contactPage}>
        <p className={s.eyebrow}>ご相談・お見積り無料</p>
        <h1>事前のご相談</h1>
        <p className={s.contactPageIntro}>
          費用のこと、葬儀の流れ、式場見学。
          <br />
          気になることから、お聞かせください。
        </p>
        <p className={s.note}>
          ご逝去後のお急ぎのご依頼は、フォームではなくお電話でお願いします。
        </p>
        <a
          href={PHONE_HREF}
          className={s.textLink}
          data-lp-event="lp_click_tel"
          data-lp-placement="contact_header"
        >
          24時間受付 {PHONE_DISPLAY}
        </a>
        <div className={s.contactFormBox}>
          <LpContactForm />
        </div>
        <p className={s.note}>
          送信後、担当者より折り返しご連絡します。フォームは即時のお迎え受付ではありません。
        </p>
        <Link href="/lp/" className={s.textLink}>
          ← ご葬儀のご案内へ戻る
        </Link>
      </div>
      <LpStickyCta />
    </>
  );
}
