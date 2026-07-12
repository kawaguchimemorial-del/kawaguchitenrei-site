"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EnvelopeData } from "../page";

const STORAGE_KEY = "post-print-envelope";
const CAL_KEY = "post-print-postal-calib-cho3-v2";

// 郵便番号の位置合わせ（キャリブレーション）
// 規格由来のジオメトリ(firstCenter/pitch/midGap/boxTop)＋機体依存の並進(offsetX/offsetY)を分離。
// mm はプリンタの不定オフセットで物理mmと1:1にならないため、機体ごとに一度合わせて localStorage に保存する。
type PostalCalib = {
  offsetX: number; // 機体ズレ補正（右+/左-）mm
  offsetY: number; // 機体ズレ補正（下+/上-）mm
  firstCenter: number; // 1枠目中心の左端からの距離 mm
  pitch: number; // 枠ピッチ mm
  midGap: number; // 3桁目と4桁目の間の追加間隔 mm
  boxTop: number; // 枠の上端 top mm
  fontSize: number; // 文字サイズ pt
};

const DEFAULT_CALIB: PostalCalib = {
  offsetX: 0,
  offsetY: 0,
  firstCenter: 65,
  pitch: 7.6,
  midGap: 2.2,
  boxTop: 34.2,
  fontSize: 15,
};

function clamp(v: number, min: number, max: number): number {
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}
function round1(v: number): number {
  return Math.round(v * 10) / 10;
}
function sanitizeCalib(input: unknown): PostalCalib {
  const o = (input ?? {}) as Record<string, unknown>;
  const num = (k: keyof PostalCalib, def: number) =>
    Number.isFinite(o[k]) ? (o[k] as number) : def;
  return {
    offsetX: clamp(num("offsetX", 0), -20, 20),
    offsetY: clamp(num("offsetY", 0), -30, 30),
    firstCenter: clamp(num("firstCenter", 65), 55, 80),
    pitch: clamp(num("pitch", 7.6), 6.5, 8.5),
    midGap: clamp(num("midGap", 2.2), 0, 5),
    boxTop: clamp(num("boxTop", 34.2), 0, 60),
    fontSize: clamp(num("fontSize", 15), 10, 20),
  };
}

function formatPostalDigits(postal: string): string {
  return postal.replace(/[^0-9]/g, "").slice(0, 7);
}

// 縦書きで数字・ハイフンが横倒しにならないよう全角へ変換して正立させる。
function toZenkaku(s: string): string {
  return s
    .replace(/[0-9]/g, (d) => String.fromCharCode(d.charCodeAt(0) + 0xfee0))
    .replace(/-/g, "－");
}

export default function PostPrintPage() {
  const [data, setData] = useState<EnvelopeData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical",
  );
  const [calib, setCalib] = useState<PostalCalib>(DEFAULT_CALIB);
  const [showGuide, setShowGuide] = useState(false);
  const [importText, setImportText] = useState("");
  // 宛名(縦書き)の自動縮小: 長い会社名でも下ロゴ帯(上175mm)を侵さないよう
  // 実測ベースでフォントサイズを決める。既定30pt、収まらないときだけ縮小。
  const nameRef = useRef<HTMLDivElement>(null);
  const nameBandRef = useRef<HTMLDivElement>(null);
  const [nameFontPt, setNameFontPt] = useState(30);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as EnvelopeData);
    } catch {
      setData(null);
    }
    // 保存済みのキャリブレーション値を読む
    try {
      if (typeof window !== "undefined") {
        const c = localStorage.getItem(CAL_KEY);
        if (c) setCalib(sanitizeCalib(JSON.parse(c)));
      }
    } catch {
      /* 既定値のまま */
    }
    setLoaded(true);
  }, []);

  // 変更のたび保存
  useEffect(() => {
    if (!loaded) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CAL_KEY, JSON.stringify(calib));
      }
    } catch {
      /* 保存失敗は無視 */
    }
  }, [calib, loaded]);

  // 宛名の自動縮小（縦書き時）。参照フォント30ptで実測し、
  // 収まらなければ利用可能高さに比例して縮小する（最小13pt、以降はクリップ）。
  // フォント確定後(fonts.ready)と印刷直前(beforeprint)にも再測定して、
  // Web フォント遅延ロードや Ctrl+P 印刷でのズレを防ぐ。
  useEffect(() => {
    const MAX = 30;
    const MIN = 13;
    const measure = () => {
      const el = nameRef.current;
      const container = nameBandRef.current;
      if (!el || !container || orientation !== "vertical" || !data?.name) {
        setNameFontPt(MAX);
        return;
      }
      const prev = el.style.fontSize;
      el.style.fontSize = `${MAX}pt`;
      // 縦書きでは行(列)が物理的な「高さ」方向に伸びるため scrollHeight を測る
      const content = el.scrollHeight;
      const avail = container.clientHeight;
      el.style.fontSize = prev;
      if (!avail || !content || content <= avail) {
        setNameFontPt(MAX);
        return;
      }
      const scaled = MAX * (avail / content);
      // 端数と測定誤差の安全マージンとして 0.3pt 引く
      setNameFontPt(Math.max(MIN, Math.floor(scaled * 10) / 10 - 0.3));
    };

    measure();
    let cancelled = false;
    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } })
      .fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    const onBeforePrint = () => measure();
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      cancelled = true;
      window.removeEventListener("beforeprint", onBeforePrint);
    };
  }, [data?.name, data?.contactName, data?.recipientType, orientation]);

  if (loaded && !data) {
    return (
      <main className="mx-auto max-w-xl px-5 py-10">
        <p className="text-sm text-neutral-600">
          印刷する宛先データがありません。入力ページからやり直してください。
        </p>
        <Link
          href="/post/"
          className="mt-4 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
        >
          入力ページへ戻る
        </Link>
      </main>
    );
  }

  const postal = data ? formatPostalDigits(data.postal) : "";
  const vertical = orientation === "vertical";

  // 住所フォント: 大きめ(17pt)を基準に、入りきらないときだけ字数に応じて縮小。
  // 住所は文字構成が安定しているため字数ベースで十分（最小10pt）。
  const ADDR_MAX = 17;
  const ADDR_MIN = 10;
  const ADDR_AVAIL_MM = 118; // top50mm + 125mm = 175mm(ロゴ帯上端)に収める余裕
  // 主住所＝住所1(都道府県・市区町村)＋住所2(番地) を1列、住所3(建物名)を2列目に。
  const addrMain = data ? `${data.address1}${data.address2 ?? ""}` : "";
  const addrBuilding = data?.address3 ?? "";
  const addrChars = data
    ? Math.max(
        [...addrMain].length,
        addrBuilding ? [...addrBuilding].length + 2 : 0,
      )
    : 0;
  const addressFontPt =
    addrChars > 0
      ? Math.min(
          ADDR_MAX,
          Math.max(ADDR_MIN, Math.floor(ADDR_AVAIL_MM / (addrChars * 0.37))),
        )
      : ADDR_MAX;

  // 宛先種別に応じた主宛名・敬称・会社名2列表示の決定。
  const isCompany = data?.recipientType === "company";
  const contactName = (data?.contactName ?? "").trim();
  const hasContact = isCompany && contactName.length > 0;
  // 主宛名（中央・大きく）: 個人→氏名 / 会社(担当者あり)→担当者名 / 会社(担当者なし)→会社名
  const mainName = isCompany
    ? hasContact
      ? contactName
      : (data?.name ?? "")
    : (data?.name ?? "");
  // 敬称: 個人→様 / 会社(担当者あり)→担当者に様 / 会社(担当者なし)→会社名に御中
  const honorific = isCompany ? (hasContact ? "様" : "御中") : "様";
  // 2列表示する会社名（担当者ありのとき・右側）。
  // 会社名は担当者名と同等〜やや大きめに揃える。長い社名は列の高さ(120mm)に
  // 収まる上限で頭打ちにする（字数ベースの実測近似）。
  const companyChars = hasContact ? [...(data?.name ?? "")].length : 0;
  const companyPt =
    companyChars > 0
      ? Math.min(30, Math.max(13, Math.floor(120 / (companyChars * 0.4))))
      : 16;
  // 担当者名の表示サイズ。担当者ありのときは会社名よりわずかに小さく揃える
  // （＝会社名がやや大きめ）。単独表示（個人/会社御中）のときは従来の自動縮小。
  const contactPt = hasContact
    ? Math.max(13, Math.min(nameFontPt, companyPt - 1))
    : nameFontPt;

  const setField = (k: keyof PostalCalib, v: number) =>
    setCalib((c) => ({ ...c, [k]: v }));
  const nudge = (k: "offsetX" | "offsetY", delta: number) =>
    setCalib((c) => ({
      ...c,
      [k]: clamp(round1(c[k] + delta), k === "offsetY" ? -30 : -20, k === "offsetY" ? 30 : 20),
    }));

  // 各桁の中心X(mm)。3+4分割なので index2 と 3 の間に midGap。
  const cx = (i: number) =>
    calib.firstCenter + i * calib.pitch + (i >= 3 ? calib.midGap : 0);

  const nudgeBtn =
    "rounded border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50";
  const numInput =
    "w-20 rounded border border-neutral-300 px-2 py-1 text-sm";

  return (
    <>
      <style>{`
        @media print {
          @page { size: 120mm 235mm; margin: 0; }
          /* 共通レイアウト(Header/Footer/MobileBottomCTA/本文下パディング)は
             visibility:hidden でも高さを残し、余剰ページを生む。用紙実寸に
             物理クランプして必ず1ページに収める。 */
          html, body {
            width: 120mm !important; height: 235mm !important;
            margin: 0 !important; padding: 0 !important; overflow: hidden !important;
          }
          /* 共通レイアウト(Header/Footer/MobileBottomCTA 等)は main の外の兄弟。
             visibility:hidden では高さが残り2枚目を生むため、印刷時は display:none で
             フローから完全に除去する（封筒は main の中なので影響しない）。 */
          body > *:not(main) { display: none !important; }
          body { visibility: hidden; }
          #envelope, #envelope * { visibility: visible; }
          /* fixed は印刷時に各ページへ複製描画されるため absolute にする。
             祖先(html/body/main)に position/transform が無いので用紙原点に固定される。 */
          #envelope {
            position: absolute !important; top: 0 !important; left: 0 !important;
            margin: 0 !important;
            box-shadow: none !important; border: none !important;
          }
          /* 封筒の外側ラッパの余白(pb-16 等)が用紙高を超えて追加ページを生むのを防ぐ */
          .envelope-wrap {
            padding: 0 !important; margin: 0 !important; display: block !important;
          }
          .no-print { display: none !important; }
          .postal-cell { outline: none !important; }
        }
        /* 画面プレビュー用: 郵便番号セルの当たりを薄く表示（印刷はされない） */
        .postal-cell { outline: 0.2mm dashed rgba(200,0,0,0.35); }
      `}</style>

      {/* 画面用の操作バー（印刷されない） */}
      <div className="no-print mx-auto max-w-2xl px-5 py-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            印刷する
          </button>
          <Link
            href="/post/"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            入力に戻る
          </Link>
          <div className="inline-flex overflow-hidden rounded-md border border-neutral-300">
            <button
              type="button"
              onClick={() => setOrientation("vertical")}
              className={`px-4 py-2 text-sm ${
                vertical
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              縦書き
            </button>
            <button
              type="button"
              onClick={() => setOrientation("horizontal")}
              className={`px-4 py-2 text-sm ${
                !vertical
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              横書き
            </button>
          </div>
          <span className="w-full text-xs text-neutral-400 sm:w-auto">
            長形3号（120×235mm）。用紙は「長形3号（手差し）」に設定。
          </span>
        </div>

        {/* 郵便番号の位置合わせ（キャリブレーション） */}
        <details className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-4">
          <summary className="cursor-pointer text-sm font-medium text-neutral-700">
            郵便番号の位置合わせ
          </summary>

          <p className="mt-3 text-xs text-red-600">
            印刷は「倍率100%・用紙に合わせるOFF・ブラウザズーム100%」で。最終確認は無地紙に1枚テスト印刷し、封筒に重ねて透かして矢印で合わせ、保存してください（保存はこの端末に残ります）。
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">左右</span>
              <button type="button" className={nudgeBtn} onClick={() => nudge("offsetX", -0.5)}>
                ◀ 左へ
              </button>
              <span className="w-16 text-center text-sm tabular-nums">
                X {calib.offsetX > 0 ? "+" : ""}
                {calib.offsetX.toFixed(1)}mm
              </span>
              <button type="button" className={nudgeBtn} onClick={() => nudge("offsetX", 0.5)}>
                右へ ▶
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">上下</span>
              <button type="button" className={nudgeBtn} onClick={() => nudge("offsetY", -0.5)}>
                ▲ 上へ
              </button>
              <span className="w-16 text-center text-sm tabular-nums">
                Y {calib.offsetY > 0 ? "+" : ""}
                {calib.offsetY.toFixed(1)}mm
              </span>
              <button type="button" className={nudgeBtn} onClick={() => nudge("offsetY", 0.5)}>
                下へ ▼
              </button>
            </div>
            <button
              type="button"
              className={nudgeBtn}
              onClick={() => setCalib((c) => ({ ...c, offsetX: 0, offsetY: 0 }))}
            >
              位置を既定に戻す
            </button>
            <label className="flex items-center gap-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                checked={showGuide}
                onChange={(e) => setShowGuide(e.target.checked)}
              />
              ガイド枠を印字（枠が無い封筒用）
            </label>
          </div>

          {/* 詳細設定（初回のみ） */}
          <details className="mt-4">
            <summary className="cursor-pointer text-xs text-neutral-500">
              詳細設定（初回のみ・枠のピッチ等）
            </summary>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <label className="text-xs text-neutral-600">
                1枠目中心(mm)
                <input
                  type="number"
                  step={0.5}
                  value={calib.firstCenter}
                  onChange={(e) => setField("firstCenter", clamp(parseFloat(e.target.value), 55, 80))}
                  className={numInput}
                />
              </label>
              <label className="text-xs text-neutral-600">
                枠ピッチ(mm)
                <input
                  type="number"
                  step={0.1}
                  value={calib.pitch}
                  onChange={(e) => setField("pitch", clamp(parseFloat(e.target.value), 6.5, 8.5))}
                  className={numInput}
                />
              </label>
              <label className="text-xs text-neutral-600">
                中央間隔(mm)
                <input
                  type="number"
                  step={0.1}
                  value={calib.midGap}
                  onChange={(e) => setField("midGap", clamp(parseFloat(e.target.value), 0, 5))}
                  className={numInput}
                />
              </label>
              <label className="text-xs text-neutral-600">
                枠上端(mm)
                <input
                  type="number"
                  step={0.5}
                  value={calib.boxTop}
                  onChange={(e) => setField("boxTop", clamp(parseFloat(e.target.value), 0, 60))}
                  className={numInput}
                />
              </label>
              <label className="text-xs text-neutral-600">
                文字サイズ(pt)
                <input
                  type="number"
                  step={1}
                  value={calib.fontSize}
                  onChange={(e) => setField("fontSize", clamp(parseFloat(e.target.value), 10, 20))}
                  className={numInput}
                />
              </label>
            </div>

            <div className="mt-4">
              <p className="text-xs text-neutral-500">
                設定値（別端末へ引き継ぐ場合はコピー / 貼り付けて「適用」）
              </p>
              <textarea
                readOnly
                value={JSON.stringify(calib)}
                rows={2}
                className="mt-1 w-full rounded border border-neutral-300 p-2 text-xs"
              />
              <div className="mt-2 flex gap-2">
                <textarea
                  placeholder="ここに設定JSONを貼り付け"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows={2}
                  className="flex-1 rounded border border-neutral-300 p-2 text-xs"
                />
                <button
                  type="button"
                  className={nudgeBtn}
                  onClick={() => {
                    try {
                      setCalib(sanitizeCalib(JSON.parse(importText)));
                    } catch {
                      /* 無効なJSONは無視 */
                    }
                  }}
                >
                  適用
                </button>
              </div>
              <button
                type="button"
                className={`${nudgeBtn} mt-2`}
                onClick={() => setCalib(DEFAULT_CALIB)}
              >
                すべて既定値に戻す
              </button>
            </div>
          </details>
        </details>
      </div>

      {/* 長形3号の封筒レイアウト */}
      <div className="envelope-wrap flex justify-center px-5 pb-16">
        <div
          id="envelope"
          style={{
            position: "relative",
            width: "120mm",
            height: "235mm",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            fontFamily: '"Yu Mincho","Hiragino Mincho ProN",serif',
            color: "#111",
            overflow: "hidden",
          }}
        >
          {/* 下60mm=ロゴ帯の目安（画面のみ・印刷されない） */}
          <div
            className="no-print"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "60mm",
              backgroundColor: "rgba(0,0,0,0.04)",
              borderTop: "1px dashed #bbb",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: "2mm",
              fontSize: "9pt",
              color: "#999",
            }}
          >
            ロゴ帯（この範囲には印刷しません）
          </div>

          {/* 郵便番号：左端原点の各桁絶対配置＋ラッパで機体オフセット補正 */}
          {postal && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${calib.offsetX}mm, ${calib.offsetY}mm)`,
              }}
            >
              {postal.split("").map((d, i) => (
                <div
                  key={i}
                  className="postal-cell"
                  style={{
                    position: "absolute",
                    left: `${cx(i)}mm`,
                    top: `${calib.boxTop}mm`,
                    transform: "translateX(-50%)",
                    width: `${calib.pitch}mm`,
                    height: "8mm",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: `${calib.fontSize}pt`,
                    fontFamily:
                      'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
                    fontVariantNumeric: "tabular-nums",
                    // 枠が無い封筒のときだけ実印字するガイド枠
                    border: showGuide ? "0.3mm solid #888" : undefined,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          )}

          {vertical ? (
            <>
              {/* 住所（右側に縦書き。2列目=建物名は一段下げる） */}
              <div
                style={{
                  position: "absolute",
                  top: "50mm",
                  right: "13mm",
                  // 下60mm(ロゴ帯)を避け、上175mm以内に収める（50+125=175）
                  maxHeight: "125mm",
                  overflow: "hidden",
                  writingMode: "vertical-rl",
                  fontSize: `${addressFontPt}pt`,
                  lineHeight: 1.55,
                }}
              >
                <div>{toZenkaku(addrMain)}</div>
                {addrBuilding && (
                  <div style={{ paddingTop: "8mm" }}>
                    {toZenkaku(addrBuilding)}
                  </div>
                )}
              </div>

              {/* 宛名（中央）。会社+担当者は2列（会社名=右・小、担当者+様=中央・大）。
                  会社(担当者なし)は会社名+御中、個人は氏名+様。下60mm(ロゴ帯)を避け 55〜175mm に中央寄せ */}
              <div
                ref={nameBandRef}
                style={{
                  position: "absolute",
                  top: "55mm",
                  left: 0,
                  right: 0,
                  height: "120mm",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                    gap: "3mm",
                  }}
                >
                  {/* 会社名（担当者ありのときのみ・右側・担当者名と同等〜やや大きめ） */}
                  {hasContact && (
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        fontSize: `${companyPt}pt`,
                        letterSpacing: "0.08em",
                        maxHeight: "120mm",
                        overflow: "hidden",
                      }}
                    >
                      {data?.name}
                    </div>
                  )}
                  {/* 主宛名＋敬称（担当者ありのときは会社名とバランスを揃える） */}
                  <div
                    ref={nameRef}
                    style={{
                      writingMode: "vertical-rl",
                      fontSize: `${contactPt}pt`,
                      letterSpacing: "0.12em",
                      maxHeight: "120mm",
                      // 単列固定＋クリップ。自動縮小が効くので通常は切れないが最終保険。
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {mainName}
                    {mainName && (
                      <span style={{ marginTop: "0.6em", display: "inline" }}>
                        　{honorific}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 横書きレイアウト（社内簡易用） */}
              <div
                style={{
                  position: "absolute",
                  top: "30mm",
                  left: "15mm",
                  right: "12mm",
                  fontSize: "12pt",
                  lineHeight: 1.7,
                }}
              >
                <div>{addrMain}</div>
                {addrBuilding && <div>{addrBuilding}</div>}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "120mm",
                  left: "10mm",
                  right: "10mm",
                  textAlign: "center",
                }}
              >
                {hasContact && (
                  <div style={{ fontSize: "14pt", marginBottom: "2mm" }}>
                    {data?.name}
                  </div>
                )}
                <div style={{ fontSize: "24pt", letterSpacing: "0.14em" }}>
                  <span>{mainName}</span>
                  {mainName && (
                    <span style={{ marginLeft: "0.4em" }}>{honorific}</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
