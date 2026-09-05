import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "./lp-constants";
import s from "./lp.module.css";
export function LpStickyCta() {
  return (
    <aside className={s.sticky} aria-label="ご相談窓口">
      <div>
        <p className={s.stickyLabel}>
          まだ決まっていなくても、大丈夫です。
          <strong>お迎え・ご安置からご相談ください。</strong>
        </p>
        <a
          href={PHONE_HREF}
          className={s.stickyCall}
          data-lp-event="lp_click_tel"
          data-lp-placement="sticky"
        >
          <span>
            電話で相談
            <br />
            24時間365日
          </span>
          <strong>{PHONE_DISPLAY}</strong>
        </a>
        <Link
          href="/lp/contact/"
          className={s.stickyForm}
          data-lp-event="lp_contact_open"
          data-lp-placement="sticky"
        >
          事前のご相談 →
        </Link>
      </div>
    </aside>
  );
}
