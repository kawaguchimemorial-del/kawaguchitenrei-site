"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EnvelopeData } from "../page";

const STORAGE_KEY = "post-print-envelope";

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

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as EnvelopeData);
    } catch {
      setData(null);
    }
    setLoaded(true);
  }, []);

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

  return (
    <>
      {/* 印刷時は封筒(#envelope)以外を隠し、用紙サイズを長形3号にする */}
      <style>{`
        @media print {
          @page { size: 120mm 235mm; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; }
          body { visibility: hidden; }
          #envelope, #envelope * { visibility: visible; }
          #envelope {
            position: absolute; top: 0; left: 0;
            box-shadow: none !important; border: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* 画面用の操作バー（印刷されない） */}
      <div className="no-print mx-auto flex max-w-2xl flex-wrap items-center gap-3 px-5 py-6">
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
          長形3号（120×235mm）。プリンタの用紙を「長形3号（手差し）」に設定してください。
        </span>
      </div>

      {/* 長形3号の封筒レイアウト */}
      <div className="flex justify-center px-5 pb-16">
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
          {/* 郵便番号（上部・横並び。封筒の郵便番号枠に合わせる想定） */}
          {postal && (
            <div
              style={{
                position: "absolute",
                top: "12mm",
                right: "17mm",
                fontSize: "14pt",
                letterSpacing: "0.42em",
              }}
            >
              {postal}
            </div>
          )}

          {vertical ? (
            <>
              {/* 住所（右側に縦書き。2列目=建物名は一段下げる） */}
              <div
                style={{
                  position: "absolute",
                  top: "30mm",
                  right: "13mm",
                  maxHeight: "150mm",
                  writingMode: "vertical-rl",
                  fontSize: "13.5pt",
                  lineHeight: 1.55,
                }}
              >
                <div>{data && toZenkaku(data.address1)}</div>
                {data?.address2 && (
                  <div style={{ paddingTop: "8mm" }}>
                    {toZenkaku(data.address2)}
                  </div>
                )}
              </div>

              {/* 宛名（中央に大きく縦書き）＋敬称 */}
              <div
                style={{
                  position: "absolute",
                  top: "60mm",
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    writingMode: "vertical-rl",
                    fontSize: "30pt",
                    letterSpacing: "0.12em",
                  }}
                >
                  {data?.name}
                  {data?.name && (
                    <span style={{ marginTop: "0.6em", display: "inline" }}>
                      　{data.honorific}
                    </span>
                  )}
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
                <div>{data?.address1}</div>
                {data?.address2 && <div>{data.address2}</div>}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "120mm",
                  left: "10mm",
                  right: "10mm",
                  textAlign: "center",
                  fontSize: "24pt",
                  letterSpacing: "0.14em",
                }}
              >
                <span>{data?.name}</span>
                {data?.name && (
                  <span style={{ marginLeft: "0.4em" }}>{data.honorific}</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
