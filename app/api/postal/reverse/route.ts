// 住所 → 郵便番号（逆引き）の Route Handler。
// 住所文字列を「都道府県 + 市区町村 + 町域」に分解し、HeartRails Geo API の
// getTowns（都道府県+市区町村ごとの町域一覧＝郵便番号つき）から町域を照合する。
// 逆引きは住所表記の揺れがあるためベストエフォート（順引きが主・逆引きは補助）。
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ReverseOk = { ok: true; zip: string; matched: string; city: string };
type ReverseNg = { ok: false; reason: "invalid" | "notfound" | "error" };

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

// 全角英数・記号の軽い正規化（ハイフン類の統一など）
function normalize(raw: string): string {
  return raw
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0xfee0),
    )
    .replace(/[‐‑‒–—―ー－]/g, "-")
    .replace(/\s+/g, "")
    .trim();
}

// 市区町村トークンを抽出。政令市の区、東京特別区、郡+町村に対応。
// HeartRails の city 表記に合わせるため、郡は落として「町/村」名を返す。
function parseCity(rest: string): string | null {
  // 郡 → 町/村（例: 入間郡三芳町 → 三芳町）
  const gun = rest.match(/^.+?郡(.+?[町村])/);
  if (gun) return gun[1];
  // 政令市の区（例: さいたま市見沼区）
  const seirei = rest.match(/^(.+?市.+?区)/);
  if (seirei) return seirei[1];
  // 一般の市区町村（例: 川口市 / 千代田区 / 〇〇町 / 〇〇村）
  const normal = rest.match(/^(.+?[市区町村])/);
  if (normal) return normal[1];
  return null;
}

async function getTowns(
  prefecture: string,
  city: string,
): Promise<{ town: string; postal: string }[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const url = `https://geoapi.heartrails.com/api/json?method=getTowns&prefecture=${encodeURIComponent(
      prefecture,
    )}&city=${encodeURIComponent(city)}`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "kawaguchitenrei-postal/1.0" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      response?: {
        location?: { town?: string; postal?: string }[];
        error?: string;
      };
    };
    const locs = json.response?.location ?? [];
    return locs
      .filter((l) => l.town && l.postal)
      .map((l) => ({ town: l.town as string, postal: l.postal as string }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function formatZip(digits: string): string {
  const d = digits.replace(/[^0-9]/g, "");
  return d.length === 7 ? `${d.slice(0, 3)}-${d.slice(3)}` : d;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = normalize(searchParams.get("q") ?? "");
  if (q.length < 4) {
    return NextResponse.json<ReverseNg>({ ok: false, reason: "invalid" });
  }

  try {
    const pref = PREFECTURES.find((p) => q.startsWith(p));
    // 都道府県が省略されていても市区町村から推定できるよう、pref無しも許容
    const rest = pref ? q.slice(pref.length) : q;
    const city = parseCity(rest);
    if (!city) {
      return NextResponse.json<ReverseNg>({ ok: false, reason: "notfound" });
    }
    const townPart = rest.slice(rest.indexOf(city) + city.length);

    // 都道府県が判れば1回、判らなければ候補県で順に試す（負荷を抑えるため、
    // 判らない場合でも実運用の主対象＝埼玉県周辺を優先）
    const prefsToTry = pref
      ? [pref]
      : ["埼玉県", "東京都", "千葉県", "神奈川県"];

    for (const p of prefsToTry) {
      const towns = await getTowns(p, city);
      if (towns.length === 0) continue;
      // townPart の先頭に一致する町域のうち、最長一致を採用
      let best: { town: string; postal: string } | null = null;
      for (const t of towns) {
        if (townPart.startsWith(t.town)) {
          if (!best || t.town.length > best.town.length) best = t;
        }
      }
      // 町域まで特定できなくても、市区町村内で町域が1件だけなら確定
      if (!best && towns.length === 1) best = towns[0];
      if (best) {
        return NextResponse.json<ReverseOk>({
          ok: true,
          zip: formatZip(best.postal),
          matched: `${p}${city}${best.town}`,
          city,
        });
      }
    }
    return NextResponse.json<ReverseNg>({ ok: false, reason: "notfound" });
  } catch {
    return NextResponse.json<ReverseNg>({ ok: false, reason: "error" });
  }
}
