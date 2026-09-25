"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LP_EVENTS, trackLpEvent, type LpEvent } from "@/lib/lp-analytics";

export function LpAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    trackLpEvent(
      "lp_view",
      /^\/lp\/contact\/?$/.test(pathname) ? "contact" : "landing",
    );
    let formStarted = false;
    const click = (event: MouseEvent) => {
      const el =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-lp-event]")
          : null;
      const name = el?.dataset.lpEvent as LpEvent | undefined;
      if (name && LP_EVENTS.includes(name))
        trackLpEvent(name, el?.dataset.lpPlacement, el?.dataset.lpPlan);
    };
    const start = (event: FocusEvent) => {
      if (
        formStarted ||
        !(event.target instanceof Element) ||
        !event.target.closest("form[data-lp-form]")
      )
        return;
      formStarted = true;
      trackLpEvent("lp_form_start", "contact_form");
    };
    // 区画ごとの到達（2026-09-25）。区画が画面の縦中央の線にかかったら「到達」とし、
    // ページ表示ごとに1回だけ送る。面積比で判定すると、料金表のような縦に長い区画が
    // いつまでも基準に届かないため、中央の細い帯（rootMargin）との交差で判定する。
    const seen = new Set<string>();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const name = (entry.target as HTMLElement).dataset.lpSection;
                if (!name || seen.has(name) || !entry.isIntersecting) continue;
                seen.add(name);
                trackLpEvent("lp_section_view", name);
                observer?.unobserve(entry.target);
              }
            },
            { rootMargin: "-50% 0px -49% 0px", threshold: 0 },
          );
    document
      .querySelectorAll<HTMLElement>("[data-lp-section]")
      .forEach((el) => observer?.observe(el));
    document.addEventListener("click", click);
    document.addEventListener("focusin", start);
    return () => {
      observer?.disconnect();
      document.removeEventListener("click", click);
      document.removeEventListener("focusin", start);
    };
  }, [pathname]);
  return null;
}
