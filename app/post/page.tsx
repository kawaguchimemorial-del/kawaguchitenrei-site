"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type RecipientType = "individual" | "company";
export type EnvelopeData = {
  postal: string;
  address1: string;
  address2: string;
  recipientType: RecipientType;
  name: string; // 個人名 または 会社名
  contactName: string; // 会社の担当者名（任意）
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
  const [recipientType, setRecipientType] =
    useState<RecipientType>("individual");
  const [contactName, setContactName] = useState("");
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

    // 1) zipaddress.net（CORS 対応の通常 fetch）を第1候補にする。
    try {
      const res = await fetch(`https://api.zipaddress.net/?zipcode=${zip}`);
      const json = (await res.json()) as {
        code?: number;
        data?: { fullAddress?: string };
      };
      if (json?.code === 200 && json.data?.fullAddress) {
        setAddress1(json.data.fullAddress);
        setLookupState("idle");
        return;
      }
    } catch {
      // 続けて zipcloud を試す
    }

    // 2) 予備: zipcloud（JSONP）
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
      recipientType,
      name: name.trim(),
      contactName: recipientType === "company" ? contactName.trim() : "",
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

        {/* 宛先種別（個人/会社）＋ 宛名/会社名 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700"
          >
            {recipientType === "company" ? "会社名" : "宛名（お名前）"}
          </label>
          <div className="mt-1 flex items-center gap-2">
            <select
              aria-label="宛先の種別"
              value={recipientType}
              onChange={(e) =>
                setRecipientType(e.target.value as RecipientType)
              }
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            >
              <option value="individual">個人</option>
              <option value="company">会社</option>
            </select>
            <input
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                recipientType === "company" ? "株式会社○○" : "川口 太郎"
              }
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            {recipientType === "company"
              ? "会社宛です。担当者名が空欄なら会社名に「御中」が付きます。"
              : "個人宛です。印刷では「様」が付きます。"}
          </p>
        </div>

        {/* 担当者名（会社のときのみ） */}
        {recipientType === "company" && (
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-medium text-neutral-700"
            >
              担当者名
              <span className="ml-1 text-xs font-normal text-neutral-400">
                任意
              </span>
            </label>
            <input
              id="contactName"
              autoComplete="off"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="川口 花子"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-neutral-500">
              入力すると担当者名に「様」が付き、会社名と2列で印刷されます。
            </p>
          </div>
        )}

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
