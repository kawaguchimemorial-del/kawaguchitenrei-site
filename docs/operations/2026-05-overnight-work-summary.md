# 退社後 継続作業サマリー（2026-05-24）

明日の朝、ChatGPT に貼って判断するための総合サマリー。

## 実施したタスク一覧

| # | タスク | 結果 |
|---|---|---|
| 1 | 施工事例一覧 `/case/` 内部リンク追加の commit / push | ✅ 完了 |
| 2 | /case/ 内部リンク追加の本番確認 | ✅ 完了 |
| 3 | /case/ 内部リンク追加の完了記録 docs 作成 | ✅ 完了 |
| 4 | /voice/ お客様の声の Privacy Review 分析 | ✅ 完了 |
| 5 | 本サマリー作成 | ✅ 完了 |

## 各タスクの結果

### Task 1: /case/ 内部リンク追加の commit / push

- 差分: 5 ファイル / +45 行 / -0 行
- すべて指定範囲内（`lib/plans.ts` / `components/plan/PlanDetailBody.tsx` / `app/area/{kawaguchi,araijuku,hatogaya}/page.tsx`）
- commit hash: **`046cbb91829a6196bb27526ad9fd9dc302ba8aa5`**
- push: ✅ 成功

### Task 2: /case/ 内部リンク追加の本番確認

対象 9 URL すべて HTTP 200 / `/case/` リンク 1 件ずつ反映確認 ✅

| URL | 結果 |
|---|---|
| /plan/family-funeral/ | ✅ 200 / /case/ 反映 |
| /plan/oneday-funeral/ | ✅ 200 / /case/ 反映 |
| /plan/direct-funeral/ | ✅ 200 / /case/ 反映 |
| /plan/cremation/ | ✅ 200 / /case/ 反映 |
| /plan/kawaguchi-shimin/ | ✅ 200 / /case/ 反映 |
| /plan/non-religious-funeral/ | ✅ 200 / /case/ 反映 |
| /area/kawaguchi/ | ✅ 200 / /case/ 反映 |
| /area/araijuku/ | ✅ 200 / /case/ 反映 |
| /area/hatogaya/ | ✅ 200 / /case/ 反映 |

安全確認も全件クリア:
- `/voice/[slug]/` 個別 deep link 新規 0 件
- `/case/[slug]/` 個別 deep link 新規 0 件
- Review / AggregateRating / ratingValue 新規 0 件
- 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定）0 件
- title・canonical 維持

### Task 3: /case/ 内部リンク追加の完了記録 docs 作成

- 新規ファイル: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`（146 行）
- commit hash: **`e2d29f114832304c81eb93a03e096e827f5a5a4a`**
- push: ✅ 成功

### Task 4: /voice/ お客様の声の Privacy Review 分析

- 新規ファイル: `docs/seo-research/2026-05-voice-privacy-review-analysis.md`（133 行）
- commit hash: **`1837e92d477c76b79ee1d1a5721814abff528551`**
- push: ✅ 成功
- `lib/voices.ts` / 画像未変更
- 個人名・故人詳細は docs に転載していない（分類のみ）

主な分析結果:
- voice 全 30 件 / rating: 5 が 25 件、rating: 4 が 5 件
- 手書きアンケート画像 30 枚（jpg 5 + webp 25）→ **未目視**
- Review / AggregateRating / ratingValue は **JSON-LD 未出力**（安全 ✅）
- スタッフ実名・故人状況詳細・競合言及が一部 comment 内に存在
- slug 命名: 日付＋イニシャル系 23 件 / 意味的命名 7 件
- **/voice/ への内部リンク強化は現時点では見送り推奨**

## commit hash 一覧

| # | commit | 説明 |
|---|---|---|
| 1 | `046cbb91829a6196bb27526ad9fd9dc302ba8aa5` | Improve internal links to case index |
| 2 | `e2d29f114832304c81eb93a03e096e827f5a5a4a` | Document case index internal link improvement |
| 3 | `1837e92d477c76b79ee1d1a5721814abff528551` | Document voice privacy review analysis |
| 4 | （本サマリー）| Add overnight work summary |

## push 済みかどうか

- ✅ Task 1〜4 すべて push 済み
- ✅ 本サマリー（Task 5）も最後に commit + push 予定

## 本番確認結果

- ✅ デプロイ `046cbb9` で対象 9 URL すべて反映確認
- ✅ HTTP 200 / リンク追加 / 安全表現 / JSON-LD 構造維持

## build 結果

- ✅ Task 1 着手前に npm run build 成功（前ターンで確認済み）
- ✅ Compiled successfully / TypeScript pass / 131/131 static pages

## 安全確認結果

| 項目 | 結果 |
|---|---|
| `/voice/` への新規リンク追加 | ❌ なし |
| `/case/[slug]/` `/voice/[slug]/` 個別 deep link | ❌ なし |
| Review / aggregateRating / ratingValue 追加 | ❌ なし |
| `lib/cases.ts` / `lib/voices.ts` 変更 | ❌ なし |
| 既存画像加工・削除・移動 | ❌ なし |
| 既存価格データ変更 | ❌ なし |
| .env / 環境変数ファイルへのアクセス | ❌ なし |
| Header / Footer / MobileBottomCTA / package.json / next.config.ts / funeral-system / app/api / app/contact / app/estimate 変更 | ❌ なし |
| 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定）追加 | ❌ なし |
| 川口市めぐりの森を自社運営施設と誤認させる表現 | ❌ なし |
| public/images/tmp/tmp.txt への接触 | ❌ なし（untracked のまま放置） |

## 未完了・保留事項

| 項目 | 状態 | 備考 |
|---|---|---|
| `/voice/` 内部リンク強化 | 保留 | Privacy Review 完了後に再評価 |
| 手書きアンケート画像 30 枚の目視確認 | 未実施 | Phase A として別タスク |
| voice 本文の Privacy Review（スタッフ実名・故人状況詳細・競合言及） | 未実施 | Phase B として別タスク |
| voice slug 命名の見直し（日付＋イニシャル 23 件） | 未実施 | Phase C として別タスク |
| `/case/` 一覧ページ自体の SEO/AIO 強化 | 未実施 | 別タスク候補 |
| Search Console URL 検査 | 未実施 | 割り当て制限のため後日 |
| 対象キーワード（家族葬 / 直葬 / 火葬式 / 一日葬 / 市民葬 / 無宗教葬）の表示回数観測 | 未実施 | 2〜4 週間後に Search Console で確認 |
| `public/images/tmp/tmp.txt` の整理判断 | 保留 | 別タスク |

## 危険条件に該当したものがあるか

**該当なし** ✅

- build 失敗: なし
- 指定外ファイル差分: なし
- 価格データ差分: なし
- 禁止ファイル変更: なし
- Review 系構造化データ追加必要性: なし
- /voice/ リンク追加必要性: なし（推奨方針として見送りに集約）
- 個別 deep link 追加必要性: なし
- 個人情報・スタッフ実名・故人情報の本文修正必要性: なし（分析のみで完了）
- `public/images/tmp/tmp.txt` への接触: なし

## 次に ChatGPT へ判断してほしい論点

### 論点 A: `/voice/` 内部リンク強化を行うか / どの順番で進めるか

- A-1) 先に画像目視確認（Phase A、30 枚）を進める
- A-2) 先に本文 Privacy Review（Phase B）を進める
- A-3) 既存の voice は現状維持で、内部リンク強化は保留にする
- A-4) `/voice/` 全体を一旦 noindex にする選択肢の検討

### 論点 B: `/voice/` の本文・画像マスクを先に行うか

- B-1) スタッフ実名（数件）のみ匿名化する小規模対応
- B-2) 故人状況詳細を含めた本文全体の見直し（範囲広）
- B-3) 手書きアンケート画像のマスク処理を別タスクで進める

### 論点 C: 施工事例一覧ページ `/case/` 自体の SEO/AIO 強化を行うか

- C-1) `/case/` 一覧の title / metaDescription / 結論ボックスを強化
- C-2) `/case/` から逆方向（プラン・エリア）への内部リンクの確認・補強
- C-3) 個別事例 `/case/[slug]/` ページの個別改善（総額表記の補足など）

### 論点 D: Search Console の URL 検査・表示回数観測を行うか

- D-1) 制限解除のタイミングで複数 URL を順次検査
- D-2) 2〜4 週間後の検索パフォーマンス確認
- D-3) 対象キーワード（家族葬 / 直葬 / 火葬式 / 一日葬 / 市民葬 / 無宗教葬）の順位継続観測

### 論点 E: `public/images/tmp/tmp.txt` の整理

- E-1) 別途確認の上で削除 / 移動
- E-2) `.gitignore` 追加
- E-3) 現状維持

## git status（本サマリー commit 前）

```
On branch main
Your branch is up to date with 'origin/main'.
Untracked files:
	docs/operations/2026-05-overnight-work-summary.md（本ファイル）
	public/images/tmp/（既知の untracked、未変更）
nothing to commit, working tree clean
```

最新 push 済みコミット: `1837e92d477c76b79ee1d1a5721814abff528551`

## public/images/tmp/ の扱い

- 現状: **既知の untracked のまま放置**
- 中身: `tmp.txt` 1 ファイル（過去の SEO 調査 URL リスト）
- 本タスクでは **一切触れていない** ✅
- 本番公開状態: 未 push のため本番には存在しない（直接の漏洩リスクなし）
- 推奨: 別タスクで `.gitignore` 追加 + 削除 or `docs/research/` への移動を判断

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
- `lib/cases.ts`（既存施工事例データ）
- `lib/voices.ts`（既存お客様の声データ）
- 既存画像（`public/images/cases/` / `public/images/voices/` / `public/images/voice/`）
- 既存価格データ
- `public/images/tmp/tmp.txt`

### 斎場ページ（今回の内部リンク強化対象外）
- `app/saijo/megurinomori/page.tsx`
- `app/saijo/toda-sousaijyo/page.tsx`
- `app/saijo/yatsuka-saijo/page.tsx`

### Batch 1.5 / Batch 2 全 11 エリア（主要 3 エリア以外）
- `app/area/{nishikawaguchi,higashikawaguchi,kawaguchi-motogo,minami-hatogaya,tozuka-angyo,kamine,shingo,shiba,angyo,kamiaoki,aoki}/page.tsx`

## 関連 docs

- 完了記録: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- 分析: `docs/seo-research/2026-05-voice-privacy-review-analysis.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- Privacy Review 指針: `docs/04-privacy-review.md`
