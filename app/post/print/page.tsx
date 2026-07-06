"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EnvelopeData } from "../page";

const STORAGE_KEY = "post-print-envelope";

function formatPostal(postal: string): string {
  const z = postal.replace(/[^0-9]/g, "");
  if (z.length === 7) return `${z.slice(0, 3)}-${z.slice(3)}`;
  return postal;
}

export default function PostPrintPage() {
  const [data, setData] = useState<EnvelopeData | null>(null);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <>
      {/* 印刷時は封筒(#envelope)以外を隠し、用紙サイズを長形3号にする */}
      <style>{`
        @media print {
          @page { size: 120mm 235mm; margin: 0; }
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
      <div className="no-print mx-auto flex max-w-2xl items-center gap-3 px-5 py-6">
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
        <span className="text-xs text-neutral-400">
          長形3号（120×235mm）。プレビューを確認して印刷してください。
        </span>
      </div>

      {/* 長形3号の封筒レイアウト（横書き） */}
      <div className="no-print-wrap flex justify-center px-5 pb-16">
        <div
          id="envelope"
          style={{
            position: "relative",
            width: "120mm",
            height: "235mm",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            fontFamily:
              '"Yu Mincho","Hiragino Mincho ProN",serif',
            color: "#111",
            overflow: "hidden",
          }}
        >
          {/* 郵便番号 */}
          {data?.postal && (
            <div
              style={{
                position: "absolute",
                top: "14mm",
                left: "16mm",
                fontSize: "13pt",
                letterSpacing: "2px",
              }}
            >
              〒 {formatPostal(data.postal)}
            </div>
          )}

          {/* 住所 */}
          <div
            style={{
              position: "absolute",
              top: "26mm",
              left: "15mm",
              right: "12mm",
              fontSize: "11.5pt",
              lineHeight: 1.7,
            }}
          >
            <div>{data?.address1}</div>
            {data?.address2 && <div>{data.address2}</div>}
          </div>

          {/* 宛名 + 敬称 */}
          <div
            style={{
              position: "absolute",
              top: "115mm",
              left: "10mm",
              right: "10mm",
              textAlign: "center",
              fontSize: "24pt",
              letterSpacing: "6px",
            }}
          >
            <span>{data?.name}</span>
            {data?.name && (
              <span style={{ marginLeft: "10px" }}>{data.honorific}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
