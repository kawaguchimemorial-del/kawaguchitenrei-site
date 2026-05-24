# 施工事例一覧 /case/ への内部リンク強化 完了記録

## 作業名

施工事例一覧への内部リンク強化（第 1 段階）

## 概要

- **実施日**: 2026-05-24
- **対象**: 主要プラン 6 ページ + 主要エリア 3 ページ
- **追加リンク**: `/case/`（施工事例一覧）のみ
- **実装コミット**: `046cbb91829a6196bb27526ad9fd9dc302ba8aa5`（Improve internal links to case index）

## 対象

### 主要プラン 6 ページ

- `/plan/family-funeral/`
- `/plan/oneday-funeral/`
- `/plan/direct-funeral/`
- `/plan/cremation/`
- `/plan/kawaguchi-shimin/`
- `/plan/non-religious-funeral/`

### 主要エリア 3 ページ

- `/area/kawaguchi/`
- `/area/araijuku/`
- `/area/hatogaya/`

## 実施内容

- 主要プラン 6 ページの `relatedLinks`（または専用ボディ配列）末尾に `/case/` 一覧リンクを追加
- 主要エリア 3 ページの `relatedLinks` 末尾に `/case/` 一覧リンクを追加
- すべて「一覧ページへの誘導のみ」で、個別事例 `/case/[slug]/` へのディープリンクは追加していない
- 計 9 箇所のリンク追加、+45 行 / -0 行

## 追加した内容

### プラン用文言

```
label: "施工事例"
description: "川口典礼でお手伝いした葬儀の施工事例を一覧でご覧いただけます。"
href: "/case/"
```

### エリア用文言

```
label: "施工事例"
description: "川口典礼でお手伝いした葬儀の施工事例を確認できます。"
href: "/case/"
```

ニュートラルな表現で、「このプランの事例」「このエリアで行った事例」といった断定表現は使用していない。

## 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `lib/plans.ts` | 通常プラン 4 件（family / oneday / cremation / direct）の `relatedLinks` 末尾 + non-religious-funeral の `nonReligiousInfo.relatedLinks` 末尾、計 5 箇所に `/case/` リンク追加（+25 行） |
| `components/plan/PlanDetailBody.tsx` | kawaguchi-shimin 用の `citizenFuneralRelatedLinks` 配列末尾に `/case/` リンク追加（+5 行） |
| `app/area/kawaguchi/page.tsx` | `relatedLinks` 末尾に `/case/` リンク追加（+5 行） |
| `app/area/araijuku/page.tsx` | `relatedLinks` 末尾に `/case/` リンク追加（+5 行） |
| `app/area/hatogaya/page.tsx` | `relatedLinks` 末尾に `/case/` リンク追加（+5 行） |

## 追加しなかったもの

- `/voice/` 一覧へのリンク（Privacy Review 後、別タスクで扱う）
- `/case/[slug]/` 個別事例へのディープリンク
- `/voice/[slug]/` 個別お客様の声へのディープリンク
- Review 構造化データ
- aggregateRating 構造化データ
- ratingValue
- 口コミ引用
- お客様の声の本文引用
- 手書きアンケート画像の表示追加
- 個別総額の引用
- 新規価格
- 既存価格の変更

## 安全確認

- ✅ `/case/` 一覧リンクのみ追加（9 箇所すべて）
- ✅ `/voice/` への新規リンク追加 0 件
- ✅ `/case/[slug]/` 個別 deep link 0 件
- ✅ `/voice/[slug]/` 個別 deep link 0 件
- ✅ Review / aggregateRating / ratingValue 追加 0 件
- ✅ `lib/cases.ts` / `lib/voices.ts` 未変更
- ✅ 既存価格データ未変更
- ✅ 斎場ページ（`/saijo/megurinomori/` / `toda-sousaijyo/` / `yatsuka-saijo/`）未変更
- ✅ 既存画像（`public/images/cases/` / `voices/` / `voice/`）未変更
- ✅ 主要 3 エリアのみ（Batch 1.5 / Batch 2 全 11 エリアには未追加）
- ✅ 断定表現「このプランの事例」「同じ金額でできる」「標準価格」等なし
- ✅ 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定）追加 0 件

## 本番確認結果（2026-05-24、デプロイ `046cbb9`）

### URL HTTP

| URL | HTTP |
|---|---|
| /plan/family-funeral/ | ✅ 200 |
| /plan/oneday-funeral/ | ✅ 200 |
| /plan/direct-funeral/ | ✅ 200 |
| /plan/cremation/ | ✅ 200 |
| /plan/kawaguchi-shimin/ | ✅ 200 |
| /plan/non-religious-funeral/ | ✅ 200 |
| /area/kawaguchi/ | ✅ 200 |
| /area/araijuku/ | ✅ 200 |
| /area/hatogaya/ | ✅ 200 |

### `/case/` リンク反映確認

9 ページすべてに `/case/` 一覧リンクが **1 件ずつ反映** ✅

### 安全表現確認

| 項目 | 結果 |
|---|---|
| `/voice/[slug]/` 個別 deep link 新規発生 | ❌ 9 ページとも 0 件 |
| `/case/[slug]/` 個別 deep link 新規発生 | ❌ 9 ページとも 0 件 |
| Review / AggregateRating / ratingValue 新規追加 | ❌ 9 ページとも 0 件 |
| 「最安」「必ず」「絶対」「追加費用なし」「総額確定」 | ❌ 9 ページとも 0 件 |
| title 維持 | ✅ 全 9 ページで既存 title 維持 |
| canonical 維持 | ✅ 全 9 ページで既存 canonical 維持 |

## 次の候補

- **`/voice/` の Privacy Review**（スタッフ実名・故人状況詳細・手書きアンケート画像の中身確認）
- 施工事例一覧ページ `/case/` 自体の SEO/AIO 強化（title・metaDescription・結論ボックス・絞り込み導線）
- Search Console で対象キーワード（「川口 家族葬」「川口市 直葬」等）の表示回数を継続観測
- /case/ 一覧ページから各プラン・各エリアへの逆リンク状況確認

## 関連コミット履歴

- `046cbb9` Improve internal links to case index（今回の本実装）
- 直前: `6f2d694` Document family funeral SEO improvement
- 直前: `1c94bca` Improve family funeral page for Kawaguchi

## 関連ドキュメント

- 直前完了記録: `docs/eval/records/2026-05-family-funeral-seo-improvement.md`
- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
