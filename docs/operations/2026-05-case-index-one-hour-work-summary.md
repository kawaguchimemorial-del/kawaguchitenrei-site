# 1 時間作業サマリー（/case/ SEO/AIO 強化）

実施日: 2026-05-25

## 実施したタスク一覧

| # | タスク | 結果 |
|---|---|---|
| 1 | /case/ SEO/AIO 強化差分の最終確認 → commit / push | ✅ 完了 |
| 2 | /case/ 本番反映確認 | ✅ 完了（push 直後は未反映、サマリー作成前に再確認で反映確認） |
| 3 | /case/ SEO/AIO 強化の完了記録 docs 作成 → commit / push | ✅ 完了 |
| 4 | 「施工事例 / 施行事例」表記ゆれの現状分析 docs 作成 → commit / push | ✅ 完了 |
| 5 | Search Console 後日対応 URL 優先順位 docs 作成 → commit / push | ✅ 完了 |
| 6 | 本サマリー作成 | ✅ 完了 |

## 各タスクの結果

### Task 1: /case/ SEO/AIO 強化差分の最終確認 → commit / push

- リポジトリ確認: ✅ `kawaguchimemorial-del/kawaguchitenrei-site` / `main` ブランチ
- 差分: `app/case/page.tsx` の 1 ファイル / +235 行 / -3 行
- build: ✅ Compiled successfully / TypeScript pass / 131/131 static pages
- commit hash: **`9655addab96a4504ecaa24976c3b443cc1baccc4`**
- push: ✅ 成功

### Task 2: /case/ 本番反映確認

push 直後（Task 2 実施時刻）には Vercel デプロイがまだ完了しておらず旧 title が返ったが、サマリー作成前（Task 6 着手時）の再確認で **全項目反映確認** ✅

| 項目 | 結果 |
|---|---|
| HTTP | ✅ 200 |
| title 反映 | ✅「川口市の施行事例 \| 川口典礼の家族葬・一日葬・直葬の実例 \| 川口典礼」 |
| description 反映 | ✅ 新文言 |
| canonical | ✅ `https://kawaguchitenrei.com/case/` 維持 |
| 「川口市の施行事例について。」結論ボックス | ✅ 2 件出現 |
| 総額誤認注意書き | ✅ 表示 |
| FAQ 7 問 | ✅ 全件表示 |
| FAQPage JSON-LD | ✅ Question×7 / Answer×7 |
| ItemList JSON-LD | ✅ 維持 |
| BreadcrumbList JSON-LD | ✅ 維持 |
| Review / AggregateRating / ratingValue | ✅ 0 件 |
| Related 8 件 | ✅ 全件検出 |
| 末尾 CTA スマホ表示化 | ✅ 反映 |

### Task 3: 完了記録 docs 作成

- 新規ファイル: `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`（105 行）
- commit hash: **`7769af3ed6da1fe20ebac76475a55a73d4586dc0`**
- push: ✅

### Task 4: 表記ゆれ分析 docs 作成

- 新規ファイル: `docs/seo-research/2026-05-case-terminology-review.md`（133 行）
- **主な発見**: 「施工事例」は 6 ファイル / 約 16 箇所、「施行事例」は 8 ファイル / 多数。今回 `/case/` への内部リンク強化作業で追加した Related ラベルが「施工事例」となっており、本来は葬儀文脈の標準である「施行事例」に統一すべき
- 推奨: 別タスクで `lib/plans.ts` / `PlanDetailBody.tsx` / `app/area/{kawaguchi,araijuku,hatogaya}/page.tsx` の 5 ファイル / 約 15 箇所を統一
- commit hash: **`ef29c8db71a575683503e80fe212c09de5933986`**
- push: ✅

### Task 5: Search Console 優先順位 docs 作成

- 新規ファイル: `docs/operations/search-console/2026-05-url-inspection-priority-after-case.md`（139 行）
- Priority 1: `/case/` / Priority 2: 強化済みプラン 6 件 / Priority 3: 未完了エリア 3 件 / Priority 4: 内部リンク元
- Search Console 画面操作は本タスクでは行わず、人間による後日実施用の計画書
- commit hash: **`8f6f94abd2e951a4d0bc9e0c682c68ec1b0bb5e5`**
- push: ✅

### Task 6: 本サマリー作成

- 新規ファイル: `docs/operations/2026-05-case-index-one-hour-work-summary.md`（本ファイル）
- 最後に commit / push 予定

## 作成・変更したファイル一覧

| ファイル | 種別 |
|---|---|
| `app/case/page.tsx` | 修正（+235 / -3） |
| `docs/eval/records/2026-05-case-index-seo-aio-improvement.md` | 新規 |
| `docs/seo-research/2026-05-case-terminology-review.md` | 新規 |
| `docs/operations/search-console/2026-05-url-inspection-priority-after-case.md` | 新規 |
| `docs/operations/2026-05-case-index-one-hour-work-summary.md` | 新規（本ファイル） |

## commit hash 一覧

| # | commit | 説明 |
|---|---|---|
| 1 | `9655addab96a4504ecaa24976c3b443cc1baccc4` | Improve case index page SEO and AIO |
| 2 | `7769af3ed6da1fe20ebac76475a55a73d4586dc0` | Document case index SEO and AIO improvement |
| 3 | `ef29c8db71a575683503e80fe212c09de5933986` | Document case terminology review |
| 4 | `8f6f94abd2e951a4d0bc9e0c682c68ec1b0bb5e5` | Document Search Console priority after case update |
| 5 | （本サマリー）| Add case index one hour work summary |

## push 済みかどうか

✅ Task 1〜5 すべて push 済み。本サマリー（Task 6）も最後に commit + push 予定。

## 本番確認結果

- ✅ 全項目反映確認（サマリー作成前、Vercel デプロイ完了後）
- title / description / 結論ボックス / 注意書き / FAQ / JSON-LD / Related / 末尾 CTA、すべて期待通り

## build 結果

- ✅ Task 1 で `npm run build` 成功（Compiled successfully in 2.9s / TypeScript pass / 131/131 static pages）

## 安全確認結果

| 項目 | 結果 |
|---|---|
| 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定 / 同じ金額でできます / この金額でできます / 標準価格 / 家族葬なら必ず安い / 川口典礼が運営する川口市めぐりの森） | ✅ 0 件 |
| Review / aggregateRating / ratingValue 追加 | ✅ なし |
| 価格データ変更 | ✅ なし |
| `lib/cases.ts` / `lib/voices.ts` / `app/case/[slug]/page.tsx` 変更 | ✅ なし |
| 既存画像加工・削除・移動 | ✅ なし |
| Header / Footer / MobileBottomCTA / package.json / next.config.ts / funeral-system / `.env*` / `app/api/**` / `app/contact/**` / `app/estimate/**` 変更 | ✅ なし |
| `/voice/` リンク追加 | ✅ なし |
| `/case/[slug]/` への新規固定 Related リンク | ✅ なし |
| `public/images/tmp/tmp.txt` 接触 | ✅ なし |

## 未完了・保留事項

| 項目 | 状態 |
|---|---|
| 「施工事例 / 施行事例」表記統一の実装 | 分析のみ完了、別タスクで判断 |
| `/voice/` 内部リンク強化（Privacy Review 後） | 保留 |
| 手書きアンケート画像 30 枚の目視確認（Phase A） | 未実施 |
| voice 本文の Privacy Review（Phase B） | 未実施 |
| voice slug 命名の見直し | 未実施 |
| Search Console URL 検査・インデックス登録リクエスト | 後日（割り当て制限の都合） |
| 対象キーワードの表示回数観測 | 2〜4 週間後 |
| `public/images/tmp/tmp.txt` の整理判断 | 保留 |

## 次に判断すべきこと（ChatGPT へ貼る論点候補）

### 論点 A: 「施工事例 / 施行事例」表記統一を実装するか

- A-1) **今すぐ統一する**（5 ファイル / 約 15 箇所、リスク低）
- A-2) 別タスクで段階的に統一
- A-3) 現状の混在を許容（検索流入は両表記でカバーされている）

### 論点 B: `/voice/` Privacy Review を続けるか

- B-1) Phase A（画像 30 枚目視確認）から着手
- B-2) Phase B（本文 30 件の Privacy Review）から着手
- B-3) 別タスクで本格的に進める計画を立てる
- B-4) 既存の voice は現状維持で、新規内部リンク強化のみ保留

### 論点 C: Search Console URL 検査を行うか

- C-1) 翌日に Priority 1（`/case/`）から実施
- C-2) 割り当て上限を見ながら Priority 1〜2 を順次実施
- C-3) 2〜4 週間の自然インデックス後にまとめて検査

### 論点 D: `/case/` の本番反映後の表示回数をいつ見るか

- D-1) push 後 1 週間（短期効果）
- D-2) push 後 2〜4 週間（中期効果、推奨）
- D-3) push 後 6〜8 週間（CTR 改善まで含めて評価）

### 論点 E: 次の SEO/AIO 強化対象

主要プラン 6 ページ + `/case/` 一覧は完了。次の候補:
- E-1) /voice/ Privacy Review → 内部リンク強化
- E-2) ホール（/hall/kawaguchi-memorial-hall/）の強化
- E-3) 斎場ページ（megurinomori 等）の追加強化
- E-4) コラム（/column/）の SEO/AIO 強化
- E-5) トップページ（/）の追加強化

## git status（本サマリー commit 前）

```
On branch main
Your branch is up to date with 'origin/main'.
Untracked files:
	docs/operations/2026-05-case-index-one-hour-work-summary.md（本ファイル）
	public/images/tmp/（既知の untracked、未変更）
nothing to commit, working tree clean
```

最新 push 済みコミット: `8f6f94abd2e951a4d0bc9e0c682c68ec1b0bb5e5`

## public/images/tmp/ の扱い

- 既知の untracked のまま放置 ✅
- `tmp.txt` 1 ファイル（過去の SEO 調査 URL リスト）
- 本タスクでは一切触れていない
- 本番には未 push のため漏洩リスクなし
- 推奨: 別タスクで `.gitignore` 追加 / `docs/research/` 移動 / 削除のいずれかを判断

## 触っていない重要ファイル一覧

### 環境・設定系
- `.env` / `.env.local` / その他 `.env*`
- `FORM_WEBHOOK_SECRET` / Webhook URL / API キー
- `package.json` / lockfile
- `next.config.ts`

### 共通レイアウト
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/MobileBottomCTA.tsx`

### 機能領域
- `app/api/**`
- `app/contact/**`
- `app/estimate/**`
- `funeral-system/`

### コンテンツデータ
- `lib/cases.ts`（既存施行事例データ）
- `lib/voices.ts`（既存お客様の声データ）
- `app/case/[slug]/page.tsx`（個別事例ページ）
- 既存画像（`public/images/cases/` / `voices/` / `voice/`）
- 既存価格データ
- `public/images/tmp/tmp.txt`

## 危険条件に該当して停止したものがあるか

**該当なし** ✅

- build 失敗: なし
- 指示外ファイル差分: なし
- 価格差分: なし
- 禁止ファイル変更: なし
- Review 系追加: なし
- /voice/ リンク追加: なし
- 個別 deep link 追加: なし
- public/images/tmp/tmp.txt 接触: なし
- 別リポジトリでの作業: なし（`kawaguchimemorial-del/kawaguchitenrei-site` 確認済み）

## 関連ドキュメント

- 本タスク実装記録: `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`
- 第 1 段階内部リンク強化: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- 表記ゆれ分析: `docs/seo-research/2026-05-case-terminology-review.md`
- Search Console 優先順位: `docs/operations/search-console/2026-05-url-inspection-priority-after-case.md`
- voice Privacy Review: `docs/seo-research/2026-05-voice-privacy-review-analysis.md`
- 前日サマリー: `docs/operations/2026-05-overnight-work-summary.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
