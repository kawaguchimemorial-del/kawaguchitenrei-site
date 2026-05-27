"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomCTA } from "@/components/layout/MobileBottomCTA";

function isAdminPath(pathname: string | null): boolean {
  return pathname?.startsWith("/admin") ?? false;
}

export function HeaderSlot() {
  if (isAdminPath(usePathname())) return null;
  return <Header />;
}

export function FooterSlot() {
  if (isAdminPath(usePathname())) return null;
  return <Footer />;
}

export function MobileBottomCTASlot() {
  if (isAdminPath(usePathname())) return null;
  return <MobileBottomCTA />;
}
