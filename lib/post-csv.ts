// 封筒宛名印刷（/post/）用の CSV 読み込みユーティリティ。
//
// 個人情報（宛名・住所）を扱うため、ここでの処理はすべてブラウザ内で完結させる。
// サーバへの送信・ログ出力は行わない（CLAUDE.md §12）。

export type RecipientType = "individual" | "company";

export type EnvelopeData = {
  postal: string;
  address1: string; // 都道府県・市区町村（郵便番号から自動入力）
  address2: string; // 番地
  address3: string; // 建物名・部屋番号（任意）
  recipientType: RecipientType;
  name: string; // 個人名 または 会社名
  contactName: string; // 会社の担当者名（任意）
};

/**
 * 配布用テンプレート（1行目＝見出し、2行目以降＝記入例）。
 * 画面の「テンプレートCSVをダウンロード」から出力するものと同じ内容。
 */
export const CSV_TEMPLATE = [
  "種別,郵便番号,住所1,住所2,住所3,宛名,担当者名",
  "個人,3340062,埼玉県川口市榛松,2-8-3,,川口 太郎,",
  "会社,3400028,埼玉県草加市谷塚,1丁目2番43号,205号室,株式会社○○,川口 花子",
  "会社,3330831,埼玉県川口市木曽呂,1298,,○○商店,",
].join("\r\n");

/**
 * CSV ファイルの文字コードを判定してテキスト化する。
 * Excel（日本語版）は既定で CP932 保存になるため、UTF-8 と両対応にする。
 */
export function decodeCsvBuffer(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  // UTF-8 BOM
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return new TextDecoder("utf-8").decode(bytes.subarray(3));
  }
  // BOM 無し。UTF-8 として厳密デコードできれば UTF-8、失敗したら CP932 とみなす。
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    try {
      return new TextDecoder("shift_jis").decode(bytes);
    } catch {
      // shift_jis 非対応環境では諦めて UTF-8 の非厳密デコード
      return new TextDecoder("utf-8").decode(bytes);
    }
  }
}

/** ダブルクォート・改行入りセルに対応した最小限の CSV パーサ。 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  row.push(cell);
  rows.push(row);

  // 完全な空行は落とす
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/** 列名のゆらぎを吸収するための別名表。先に書いたものを優先する。 */
const ALIASES: Record<string, string[]> = {
  type: ["種別", "宛先種別", "個人法人", "区分"],
  postal: ["郵便番号", "〒", "郵便", "zip", "postal"],
  address1: ["住所1", "住所１", "住所"],
  pref: ["都道府県", "県名"],
  city: ["市区町村", "市町村"],
  address2: ["番地", "住所2", "住所２", "丁目番地"],
  address3: ["建物名など", "建物名", "住所3", "住所３", "建物", "ビル名"],
  company: ["会社名", "法人名", "団体名"],
  person: ["氏名", "お名前", "名前"],
  generic: ["宛名", "請求先名", "領収名", "注文者（会社名）", "注文者"],
  contact: ["担当者名", "担当者", "ご担当者", "ご担当者名"],
};

function normalizeHeader(h: string): string {
  return h.replace(/^﻿/, "").replace(/\s|　/g, "").trim();
}

/**
 * ヘッダー行から「論理名 → 列インデックスの候補配列」の対応を作る。
 * 同じ論理名に複数の列が該当することがある（例：請求書フォーマットは
 * 「宛名」と「請求先名」の両方を持ち、宛名が空で請求先名に値が入る）。
 * 候補は別名表の並び順＝優先順で保持し、行ごとに最初の非空セルを採用する。
 */
function mapColumns(header: string[]): Record<string, number[]> {
  const norm = header.map(normalizeHeader);
  const map: Record<string, number[]> = {};
  for (const [key, names] of Object.entries(ALIASES)) {
    const found: number[] = [];
    for (const n of names) {
      const target = normalizeHeader(n);
      norm.forEach((h, i) => {
        if (h === target && !found.includes(i)) found.push(i);
      });
    }
    if (found.length > 0) map[key] = found;
  }
  return map;
}

// 住所欄に「〒110-0004」のように郵便番号が含まれる一覧表への対応。
const POSTAL_IN_TEXT = /〒?\s*(\d{3})\s*[-‐－ー―]?\s*(\d{4})/;

// 会社・団体と判断する語。種別列が無い CSV のときだけ使う推定。
const COMPANY_HINT =
  /(株式会社|有限会社|合同会社|合資会社|\(株\)|（株）|\(有\)|（有）|会社|センター|商店|商事|工業|産業|建設|工務店|不動産|事務所|病院|医院|クリニック|組合|協会|財団|社団|法人|学校|大学|銀行|信用金庫|支店|営業所|グループ|ホール|ワークス)/;

function guessType(name: string, raw: string | undefined): RecipientType {
  const v = (raw ?? "").trim();
  if (v) {
    if (/会社|法人|団体|企業/.test(v)) return "company";
    if (/個人/.test(v)) return "individual";
  }
  return COMPANY_HINT.test(name) ? "company" : "individual";
}

function digits7(s: string): string {
  return s
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "")
    .slice(0, 7);
}

export type ParseResult = {
  items: EnvelopeData[];
  /** 宛名が空などで取り込めなかった行の説明（行番号は CSV の見た目に合わせて1始まり） */
  skipped: string[];
  /** 見出し行が想定と合わない場合の警告 */
  warning?: string;
};

/**
 * CSV テキストを封筒データの配列に変換する。
 * 1行目をヘッダーとして扱い、列名で対応付ける（列順には依存しない）。
 */
export function parseEnvelopeCsv(text: string): ParseResult {
  const rows = parseCsv(text);
  if (rows.length === 0) return { items: [], skipped: [], warning: "CSVが空です。" };

  const header = rows[0];
  const col = mapColumns(header);

  const hasName =
    col.company !== undefined ||
    col.person !== undefined ||
    col.generic !== undefined;
  if (!hasName) {
    return {
      items: [],
      skipped: [],
      warning:
        "宛名の列が見つかりませんでした。1行目に「宛名」「会社名」「氏名」「請求先名」のいずれかの見出しが必要です。",
    };
  }

  const items: EnvelopeData[] = [];
  const skipped: string[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    // 該当列の候補を優先順に見て、最初に値が入っているものを採用する
    const get = (key: string): string => {
      for (const i of col[key] ?? []) {
        const v = (cells[i] ?? "").trim();
        if (v) return v;
      }
      return "";
    };

    const company = get("company");
    const person = get("person");
    const generic = get("generic");
    // 会社名と担当者名が別列で揃っているときは会社宛として扱う
    const contact = get("contact");
    const name = company || person || generic;

    if (!name) {
      skipped.push(`${r + 1}行目：宛名が空のため取り込みませんでした。`);
      continue;
    }

    const recipientType: RecipientType = company
      ? "company"
      : person
        ? "individual"
        : guessType(name, get("type"));

    // 住所1は「住所1」列を優先し、無ければ都道府県＋市区町村を結合する
    let address1 = get("address1") || `${get("pref")}${get("city")}`.trim();

    // 郵便番号列が無い／空の一覧表では、住所欄の先頭にある「〒110-0004」を拾って
    // 郵便番号として切り出し、住所側からは取り除く。
    let postalValue = digits7(get("postal"));
    if (!postalValue) {
      const m = address1.match(POSTAL_IN_TEXT);
      if (m) {
        postalValue = `${m[1]}${m[2]}`;
        address1 = address1.replace(m[0], "").trim();
      }
    }

    items.push({
      postal: postalValue,
      address1,
      address2: get("address2"),
      address3: get("address3"),
      recipientType,
      name,
      contactName: recipientType === "company" ? contact : "",
    });
  }

  return { items, skipped };
}
