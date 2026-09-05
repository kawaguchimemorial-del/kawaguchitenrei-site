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
    document.addEventListener("click", click);
    document.addEventListener("focusin", start);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("focusin", start);
    };
  }, [pathname]);
  return null;
}
