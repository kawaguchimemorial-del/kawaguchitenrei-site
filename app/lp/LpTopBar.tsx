import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "./lp-constants";
import s from "./lp.module.css";
export function LpTopBar() {
  return (
    <header className={s.topbar}>
      <Link href="/lp/" className={s.logo} aria-label="川口典礼 ご葬儀のご案内">
        <b>川口典礼</b>
        <small>
          川口メモリアルホール
          <br />
          川口市・新井宿
        </small>
      </Link>
      <nav aria-label="LP内メニュー">
        <Link href="/lp/#price">費用</Link>
        <Link href="/lp/#hall">式場・アクセス</Link>
        <Link href="/lp/#urgent">お急ぎの方へ</Link>
      </nav>
      <a
        href={PHONE_HREF}
        className={s.topPhone}
        data-lp-event="lp_click_tel"
        data-lp-placement="header"
      >
        <small>24時間365日受付・通話無料</small>
        <strong>{PHONE_DISPLAY}</strong>
      </a>
    </header>
  );
}
