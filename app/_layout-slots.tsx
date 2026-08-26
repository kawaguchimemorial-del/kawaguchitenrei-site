"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomCTA } from "@/components/layout/MobileBottomCTA";

// ヘッダー・フッター・下部固定CTAを出さないパス。
// - /admin : 管理画面
// - /lp    : 広告LP専用ページ（CLAUDE.md §21）。LP側で専用の固定CTAを持つ
const CHROMELESS_PREFIXES = ["/admin", "/lp"];

function isChromelessPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return CHROMELESS_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function HeaderSlot() {
  if (isChromelessPath(usePathname())) return null;
  return <Header />;
}

export function FooterSlot() {
  if (isChromelessPath(usePathname())) return null;
  return <Footer />;
}

export function MobileBottomCTASlot() {
  if (isChromelessPath(usePathname())) return null;
  return <MobileBottomCTA />;
}

function RevealController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const markVisible = (el: Element) => {
      if (!el.hasAttribute("data-visible")) {
        el.setAttribute("data-visible", "");
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      document.querySelectorAll("[data-reveal]").forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-visible])")
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

export function RevealOnScrollSlot() {
  if (isChromelessPath(usePathname())) return null;
  return <RevealController />;
}
