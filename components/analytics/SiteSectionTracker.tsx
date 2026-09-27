"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackSiteSection } from "@/lib/site-analytics";

// 本サイトの区画到達（2026-09-27）。data-section の付いた要素が画面の縦中央の線に
// かかったら、ページ表示ごとに1回送る（LP の lp_section_view と同じ判定）。
// data-section-progress の付いた要素（コラム本文）には、50% と末尾の位置に
// 目に見えない目印を差し込み、「本文の半分」「本文の最後」まで読まれたかも測る。
export function SiteSectionTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (/^\/(lp|admin|post)(\/|$)/.test(pathname)) return;
    const added: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-section-progress]").forEach((el) => {
      const name = el.dataset.sectionProgress;
      if (!name) return;
      // 目印は幅1px・高さ25vh。高さ1pxだと速いスクロールで中央の線を飛び越えて記録されないため、
      // 縦に幅を持たせる。末尾の目印は本文の下端に収まるよう、高さ分だけ上から置く。
      for (const [suffix, top] of [
        ["50", "50%"],
        ["end", "calc(100% - 25vh)"],
      ] as const) {
        const marker = document.createElement("div");
        marker.setAttribute("aria-hidden", "true");
        marker.dataset.section = `${name}_${suffix}`;
        marker.style.cssText = `position:absolute;left:0;top:${top};width:1px;height:25vh;pointer-events:none;`;
        el.appendChild(marker);
        added.push(marker);
      }
    });
    const seen = new Set<string>();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const name = (entry.target as HTMLElement).dataset.section;
                if (!name || seen.has(name) || !entry.isIntersecting) continue;
                seen.add(name);
                trackSiteSection(name);
                observer?.unobserve(entry.target);
              }
            },
            { rootMargin: "-50% 0px -49% 0px", threshold: 0 },
          );
    document
      .querySelectorAll<HTMLElement>("[data-section]")
      .forEach((el) => observer?.observe(el));
    return () => {
      observer?.disconnect();
      added.forEach((marker) => marker.remove());
    };
  }, [pathname]);
  return null;
}
