"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type EnvelopeData = {
  postal: string;
  address1: string;
  address2: string;
  name: string;
  honorific: "様" | "御中";
};

const STORAGE_KEY = "post-print-envelope";

type ZipcloudResult = {
  address1: string;
  address2: string;
  address3: string;
};
type ZipcloudResponse = { results: ZipcloudResult[] | null };

// zipcloud は通常の fetch を CORS 許可しないため JSONP（script タグ）で呼び出す。
function jsonpZipcloud(zip: string): Promise<ZipcloudResponse> {
  return new Promise((resolve, reject) => {
    const cb = `__zipcloud_cb_${Math.floor(Math.random() * 1e9)}`;
    const script = document.createElement("script");
    let done = false;
    const cleanup = () => {
      done = true;
      delete (window as unknown as Record<string, unknown>)[cb];
      script.remove();
      clearTimeout(timer);
    };
    const timer = setTimeout(() => {
      if (!done) {
        cleanup();
        reject(new Error("timeout"));
      }
    }, 8000);
    (window as unknown as Record<string, unknown>)[cb] = (
      data: ZipcloudResponse,
    ) => {
      if (done) return;
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      if (done) return;
      cleanup();
      reject(new Error("script error"));
    };
    script.src = `https://zipcloud.acknowledge.jp/api/search?zipcode=${zip}&callback=${cb}`;
    document.body.appendChild(script);
  });
}

export default function PostPage() {
  const router = useRouter();
  const [postal, setPostal] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [name, setName] = useState("");
  const [honorific, setHonorific] = useState<"様" | "御中">("様");
  const [lookupState, setLookupState] = useState<
    "idle" | "loading" | "notfound" | "error"
  >("idle");

  // 郵便番号から住所（都道府県+市区町村+町域）を自動入力する。番地・建物は手入力。
  async function lookupPostal() {
    const zip = postal.replace(/[^0-9]/g, "");
    if (zip.length !== 7) {
      setLookupState("notfound");
      return;
    }
    setLookupState("loading");
    try {
      const json = await jsonpZipcloud(zip);
      const r = json?.results?.[0];
      if (r) {
        setAddress1(`${r.address1}${r.address2}${r.address3}`);
        setLookupState("idle");
      } else {
        setLookupState("notfound");
      }
    } catch {
      setLookupState("error");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: EnvelopeData = {
      postal: postal.replace(/[^0-9]/g, ""),
      address1: address1.trim(),
      address2: address2.trim(),
      name: name.trim(),
      honorific,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    router.push("/post/print/");
  }

  const canPrint = name.trim().length > 0;

  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <header className="mb-8">
        <p className="text-xs tracking-widest text-neutral-500">社内用ツール</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-neutral-800">
          封筒宛名印刷（長形3号）
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          宛先を入力し「印刷確定」を押すと、長形3号（120×235mm）の印刷ページへ移動します。
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 郵便番号 */}
        <div>
          <label
            htmlFor="postal"
            className="block text-sm font-medium text-neutral-700"
          >
            郵便番号
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="postal"
              inputMode="numeric"
              autoComplete="off"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              onBlur={() => {
                if (postal.replace(/[^0-9]/g, "").length === 7) lookupPostal();
              }}
              placeholder="1000001（ハイフンなし可）"
              className="w-40 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={lookupPostal}
              className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              住所を自動入力
            </button>
          </div>
          {lookupState === "loading" && (
            <p className="mt-1 text-xs text-neutral-500">住所を検索中…</p>
          )}
          {lookupState === "notfound" && (
            <p className="mt-1 text-xs text-amber-600">
              該当する住所が見つかりませんでした。7桁の郵便番号をご確認ください。
            </p>
          )}
          {lookupState === "error" && (
            <p className="mt-1 text-xs text-amber-600">
              住所の取得に失敗しました。住所を手入力してください。
            </p>
          )}
        </div>

        {/* 住所 */}
        <div>
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-neutral-700"
          >
            住所（都道府県・市区町村・番地）
          </label>
          <input
            id="address1"
            autoComplete="off"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="埼玉県川口市西新井宿440-1"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            郵便番号から町域まで自動入力されます。番地はご入力ください。
          </p>
        </div>

        {/* 住所2 */}
        <div>
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-neutral-700"
          >
            住所2（建物名・部屋番号）
            <span className="ml-1 text-xs font-normal text-neutral-400">
              任意
            </span>
          </label>
          <input
            id="address2"
            autoComplete="off"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="○○マンション 101号室"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>

        {/* 宛名 + 敬称 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700"
          >
            宛名
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="川口 太郎 / 株式会社○○"
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
            <select
              aria-label="敬称"
              value={honorific}
              onChange={(e) =>
                setHonorific(e.target.value as "様" | "御中")
              }
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            >
              <option value="様">様</option>
              <option value="御中">御中</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            会社・部署宛は「御中」、個人宛は「様」を選択してください。
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!canPrint}
            className="rounded-md bg-neutral-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            印刷確定
          </button>
          {!canPrint && (
            <span className="ml-3 text-xs text-neutral-400">
              宛名を入力してください
            </span>
          )}
        </div>
      </form>
    </main>
  );
}
