// 郵便番号 → 住所（サーバ側で外部APIを呼ぶ Route Handler）。
// ブラウザから外部APIを直接叩くと CORS / 断続的な失敗 / 広告ブロック等で
// 取得できないことがあるため、同一オリジンのサーバ側で代理取得する。
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LookupOk = {
  ok: true;
  pref: string;
  city: string;
  town: string;
  address: string;
};
type LookupNg = { ok: false; reason: "invalid" | "notfound" | "error" };

// 全角数字→半角、数字以外を除去して7桁の郵便番号を得る
function normalizeZip(raw: string): string {
  return raw
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "");
}

async function fetchJson(url: string, timeoutMs = 6000): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "kawaguchitenrei-postal/1.0" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// 1) zipaddress.net
async function viaZipaddress(zip: string): Promise<LookupOk | null> {
  const json = (await fetchJson(
    `https://api.zipaddress.net/?zipcode=${zip}`,
  )) as {
    code?: number;
    data?: { pref?: string; city?: string; town?: string; fullAddress?: string };
  } | null;
  if (json?.code === 200 && json.data?.fullAddress) {
    return {
      ok: true,
      pref: json.data.pref ?? "",
      city: json.data.city ?? "",
      town: json.data.town ?? "",
      address: json.data.fullAddress,
    };
  }
  return null;
}

// 2) HeartRails（予備）
async function viaHeartRails(zip: string): Promise<LookupOk | null> {
  const json = (await fetchJson(
    `https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${zip}`,
  )) as {
    response?: {
      location?: { prefecture?: string; city?: string; town?: string }[];
      error?: string;
    };
  } | null;
  const loc = json?.response?.location?.[0];
  if (loc?.prefecture && loc.city) {
    const pref = loc.prefecture;
    const city = loc.city;
    const town = loc.town ?? "";
    return { ok: true, pref, city, town, address: `${pref}${city}${town}` };
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = normalizeZip(searchParams.get("zip") ?? "");
  if (zip.length !== 7) {
    return NextResponse.json<LookupNg>({ ok: false, reason: "invalid" });
  }

  try {
    const result = (await viaZipaddress(zip)) ?? (await viaHeartRails(zip));
    if (result) return NextResponse.json<LookupOk>(result);
    return NextResponse.json<LookupNg>({ ok: false, reason: "notfound" });
  } catch {
    return NextResponse.json<LookupNg>({ ok: false, reason: "error" });
  }
}
