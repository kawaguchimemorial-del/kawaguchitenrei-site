"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, StarIcon } from "@/components/common/icons";
import { voices, voiceTags, voiceMatchesTag, type Voice } from "@/lib/voices";

const sortedVoices = [...voices].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1
);

// マッチが1件以上あるタグだけを、件数つきで表示する
const tagsWithCount = voiceTags
  .map((tag) => ({
    tag,
    count: sortedVoices.filter((v) => voiceMatchesTag(v, tag)).length,
  }))
  .filter((t) => t.count > 0);

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}/${m}/${d}`;
}

function StarRating({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p aria-label={`5段階中${r}の評価`} className="flex items-center gap-2">
      <span aria-hidden className="flex items-center gap-0.5 text-gold">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            filled={i < r}
            className={i < r ? "h-4 w-4" : "h-4 w-4 text-gold/35"}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-ink-soft">5段階中 {r}</span>
    </p>
  );
}

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <a
      href={`/voice/${voice.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md"
    >
      {voice.surveyImage && (
        <div className="relative aspect-[4/3] bg-warm">
          <Image
            src={voice.surveyImage.src}
            alt={voice.surveyImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <p className="text-xs text-ink-soft">
          {formatDate(voice.publishedAt)} 公開
        </p>
        <p className="font-serif-jp text-xl font-medium leading-[1.55] text-ink-deep group-hover:text-brand md:text-2xl">
          「{voice.title}」
        </p>
        <StarRating rating={voice.rating} />
        <blockquote className="border-l-2 border-brand pl-4 text-sm leading-8 text-ink-mid md:text-base">
          {voice.comment}
        </blockquote>
        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="text-ink-soft">{voice.family}</span>
          <span className="inline-flex items-center gap-1 font-bold text-brand group-hover:underline">
            詳しく見る
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function VoiceFilterList() {
  const [active, setActive] = useState<string | null>(null);

  const activeTag = active
    ? voiceTags.find((t) => t.label === active) ?? null
    : null;
  const filtered = activeTag
    ? sortedVoices.filter((v) => voiceMatchesTag(v, activeTag))
    : sortedVoices;

  const chipClass = (on: boolean) =>
    `inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-bold transition ${
      on
        ? "border-brand bg-brand text-white"
        : "border-line bg-paper text-ink-deep hover:border-brand hover:text-brand"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            All Voices
          </p>
          <p className="mt-2 font-serif-jp text-2xl font-medium text-ink-deep md:text-3xl">
            {active ? `「${active}」のお声 ${filtered.length}件` : `公開中のお声 ${sortedVoices.length}件`}
          </p>
        </div>
        <p className="text-sm text-ink-soft">公開日が新しい順に表示しています</p>
      </div>

      {/* 気になる言葉でしぼり込み（クライアント側・URLは変えない） */}
      <div className="mt-6">
        <p className="text-xs font-bold tracking-[0.12em] text-ink-soft">
          気になる言葉でしぼり込む
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={chipClass(active === null)}
          >
            すべて
            <span
              className={
                active === null ? "font-normal text-white/80" : "font-normal text-ink-soft"
              }
            >
              （{sortedVoices.length}）
            </span>
          </button>
          {tagsWithCount.map(({ tag, count }) => {
            const on = active === tag.label;
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => setActive(on ? null : tag.label)}
                aria-pressed={on}
                className={chipClass(on)}
              >
                {tag.label}
                <span
                  className={
                    on ? "font-normal text-white/80" : "font-normal text-ink-soft"
                  }
                >
                  （{count}）
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.map((voice) => (
          <li key={voice.slug}>
            <VoiceCard voice={voice} />
          </li>
        ))}
      </ul>
    </div>
  );
}
