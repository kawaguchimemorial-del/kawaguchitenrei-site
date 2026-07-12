"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

const STORAGE_KEY = "post-print-envelope";

export default function PostPage() {
  const router = useRouter();
  const [postal, setPostal] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [name, setName] = useState("");
  const [recipientType, setRecipientType] =
    useState<RecipientType>("individual");
  const [contactName, setContactName] = useState("");
  const [lookupState, setLookupState] = useState<
    "idle" | "loading" | "notfound" | "error"
  >("idle");
  const [reverseState, setReverseState] = useState<
    "idle" | "loading" | "notfound" | "error"
  >("idle");

  // 郵便番号 → 住所。ブラウザから外部APIを直接叩くと CORS 等で失敗するため、
  // 同一オリジンのサーバAPI(/api/postal/lookup)経由で取得する。
  async function lookupPostal() {
    const zip = postal.replace(/[^0-9]/g, "");
    if (zip.length !== 7) {
      setLookupState("notfound");
      return;
    }
    setLookupState("loading");
    try {
      const res = await fetch(`/api/postal/lookup?zip=${zip}`);
      const json = (await res.json()) as
        | { ok: true; address: string }
        | { ok: false; reason: string };
      if (json.ok && json.address) {
        setAddress1(json.address);
        setLookupState("idle");
      } else {
        setLookupState("notfound");
      }
    } catch {
      setLookupState("error");
    }
  }

  // 住所 → 郵便番号（逆引き）。入力済みの住所から郵便番号を推定して補完する。
  async function reverseLookup() {
    const q = address1.trim();
    if (q.length < 4) {
      setReverseState("notfound");
      return;
    }
    setReverseState("loading");
    try {
      const res = await fetch(
        `/api/postal/reverse?q=${encodeURIComponent(q)}`,
      );
      const json = (await res.json()) as
        | { ok: true; zip: string }
        | { ok: false; reason: string };
      if (json.ok && json.zip) {
        setPostal(json.zip.replace(/[^0-9]/g, "").slice(0, 7));
        setReverseState("idle");
      } else {
        setReverseState("notfound");
      }
    } catch {
      setReverseState("error");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: EnvelopeData = {
      postal: postal.replace(/[^0-9]/g, ""),
      address1: address1.trim(),
      address2: address2.trim(),
      address3: address3.trim(),
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
              maxLength={8}
              onChange={(e) => {
                // 数字のみ・最大7桁に制限（全角数字は半角化）
                const digits = e.target.value
                  .replace(/[０-９]/g, (c) =>
                    String.fromCharCode(c.charCodeAt(0) - 0xfee0),
                  )
                  .replace(/[^0-9]/g, "")
                  .slice(0, 7);
                setPostal(digits);
              }}
              onBlur={() => {
                if (postal.replace(/[^0-9]/g, "").length === 7) lookupPostal();
              }}
              placeholder="1000001（ハイフンなし7桁）"
              className="w-40 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={lookupPostal}
              className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              住所を自動入力
            </button>
            <button
              type="button"
              onClick={reverseLookup}
              title="下の住所欄から郵便番号を逆引きします"
              className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              住所→郵便番号
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
          {reverseState === "loading" && (
            <p className="mt-1 text-xs text-neutral-500">
              郵便番号を逆引き中…
            </p>
          )}
          {reverseState === "notfound" && (
            <p className="mt-1 text-xs text-amber-600">
              郵便番号が特定できませんでした。下の住所欄に「都道府県＋市区町村＋町名」まで入力してお試しください。
            </p>
          )}
          {reverseState === "error" && (
            <p className="mt-1 text-xs text-amber-600">
              郵便番号の逆引きに失敗しました。時間をおいてお試しください。
            </p>
          )}
        </div>

        {/* 住所1（都道府県・市区町村） */}
        <div>
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-neutral-700"
          >
            住所1（都道府県・市区町村）
          </label>
          <input
            id="address1"
            autoComplete="off"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="埼玉県川口市西新井宿"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            郵便番号から町域まで自動入力されます。逆に、住所1を入力して「住所→郵便番号」を押すと郵便番号を補完できます。
          </p>
        </div>

        {/* 住所2（番地） */}
        <div>
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-neutral-700"
          >
            住所2（番地）
          </label>
          <input
            id="address2"
            autoComplete="off"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="440-1"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </div>

        {/* 住所3（建物名・部屋番号） */}
        <div>
          <label
            htmlFor="address3"
            className="block text-sm font-medium text-neutral-700"
          >
            住所3（建物名・部屋番号）
            <span className="ml-1 text-xs font-normal text-neutral-400">
              任意
            </span>
          </label>
          <input
            id="address3"
            autoComplete="off"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
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
