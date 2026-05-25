# Skill: SEO/AIO ページ改善の標準手順

## 目的

川口典礼サイトの既存ページ・新規ページに対して、SEO（検索流入）と AIO（AI 回答への引用されやすさ）の両方を改善するための標準手順。

## 適用範囲

- `app/area/*` / `app/plan/*` / `app/saijo/*` / `app/hall/*` / `app/case/*` / `app/voice/*` のページ改善
- title / metaDescription / canonical / Open Graph の調整
- 結論ボックス・FAQ・Related・JSON-LD（BreadcrumbList / FAQPage / FuneralHome / Article / ItemList / Service / Offer）の追加・拡張
- 内部リンク導線の整理

**適用外**:
- フォーム改修（→ privacy-review-jp + code-review-6-stages）
- 寺院会館・民営式場の利用可否・宗派・檀家条件の新規断定
- 価格データの変更（→ CLAUDE.md §9 プラン正本のみ正本）
- Header / Footer / MobileBottomCTA の変更

---

## 標準 7 ステップ

### Step 1: 現状分析

- 対象ファイルを Read（特に metadata・JSON-LD・FAQ 配列・既存 relatedLinks）
- 本番 URL を curl で取得（HTTP status / 現行 title / metaDescription / 既存 JSON-LD type）
- 関連ファイル（`lib/areas.ts`・`lib/plans.ts`・`lib/cases.ts` など）の対応データを確認
- 既存トーン・既存セクション順を把握

### Step 2: 方針確認

- 改善ポイントを 3〜5 個に絞る
- CLAUDE.md §10（中心軸 5 柱・重要キーワード・3 軸判断基準）に照らす
- 重要な選択肢は **AskUserQuestion で人間に確認**（title 案・新セクション設置可否・既存削除の可否など）
- 「ついでに直す」誘惑を抑え、指示されたファイルだけに集中（CLAUDE.md §6）

### Step 3: 実装計画

- 数行で計画を提示（何を / どこで / どう変えるか）
- 「触らないファイル」をすべて列挙
- 変更対象ファイル一覧を出し、ユーザー承認後に進む
- 自動 push 範囲（CLAUDE.md §19.1）に該当するなら、push まで進める旨を明示

### Step 4: 実装

- Edit を優先（Write は新規作成のみ）
- 既存トーン・既存セクション順を維持
- 価格・式場利用可否・空き状況・宗派条件・檀家条件は推測しない
- 「川口市めぐりの森」は **川口市営の火葬場**と明記、川口典礼の運営施設のように書かない
- 寺院会館・民営式場・公営斎場も同様に「川口典礼が運営する施設ではありません」を担保
- 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定 / 標準価格 / いつでも利用 / 空きがあります / 確実に手配）を入れない
- **Review / aggregateRating / ratingValue は原則追加しない**（追加要望時は人間承認）

### Step 5: build

- `npm run build` 実行
- TypeScript pass / 131 ページ（または該当ページ追加分）静的生成成功を確認
- エラー時は **commit / push しない**。原因調査して修正

### Step 6: 安全確認

実装直後に grep で以下を確認:

- 禁止表現 0 件
- `aggregateRating` / `ratingValue` / `"@type":"Review"` 0 件（追加していないこと）
- `川口典礼が運営する川口市めぐりの森`・`川口典礼が運営する寺院` 0 件
- 個人名・故人名・喪主名 0 件（該当領域の場合）
- `public/images/tmp/tmp.txt` 未接触
- `git diff --stat` で想定ファイルのみ変更されている

### Step 7: 本番確認 & docs 記録

push 後（自動 push 範囲なら自動、push 前確認範囲なら人間承認後）:

- Vercel デプロイ完了を待ち、`curl -fsSL <URL>` で取得
- HTTP 200 / title / metaDescription / 主要見出し / JSON-LD type / FAQ 件数 を確認
- `docs/eval/records/<YYYY-MM>-<件名>.md` に完了記録を作成
- 必要なら `docs/operations/search-console/` に URL 検査候補を追記

---

## チェックリスト（実装時に通す）

| 項目 | 確認 |
|---|---|
| title に「川口」「川口市」または地域名が含まれる | ☐ |
| metaDescription に主要キーワード 2〜3 個が自然に含まれる | ☐ |
| 結論ボックス（h2 直後の 3〜5 行サマリー）がある | ☐ |
| FAQ が最低 5 問ある（理想は 8〜11 問） | ☐ |
| FAQPage JSON-LD が FAQ 件数と一致 | ☐ |
| BreadcrumbList JSON-LD がある | ☐ |
| Related セクションがある（最低 5 件、理想は 7〜13 件） | ☐ |
| 内部リンクで関連エリア / プラン / 主要施設に繋がる | ☐ |
| 川口市めぐりの森 = 川口市営の火葬場と明記 | ☐ |
| 寺院会館・民営式場 = 川口典礼の運営施設ではないと明記（該当領域の場合） | ☐ |
| 価格は §9 正本以外推測していない | ☐ |
| 禁止表現 0 件 | ☐ |
| Review / aggregateRating / ratingValue を追加していない | ☐ |
| build 成功（131/131 static pages） | ☐ |
| 想定外の差分なし | ☐ |

---

## 停止条件

以下のいずれかに該当したら、commit / push 前に停止して人間に確認を求める:

- 価格データの新規追加・変更が含まれる
- 寺院会館・民営式場・公営斎場の利用可否・空き状況・宗派条件・檀家条件を新規に断定している
- 川口市めぐりの森を川口典礼の運営施設のように書いている
- Header / Footer / MobileBottomCTA に手を入れている
- 想定外のファイル（指示外のファイル）に差分が出ている
- build が失敗した
- 静的生成ページ数が減った
- 個人情報（個人名・故人名・喪主名）を含む可能性がある

---

## 関連 Skill / Agent / docs

- 上位 Skill / Agent:
  - `agents/research-agent.md`（Step 1 を委譲できる）
  - `agents/review-agent.md`（Step 6 を委譲できる）
  - `agents/documentation-agent.md`（Step 7 を委譲できる）
- 隣接 Skill:
  - `skills/privacy-review-jp/SKILL.md`（個人情報を含む可能性がある場合に併用）
  - `skills/search-console-log/SKILL.md`（push 後の URL 検査記録）
  - `skills/code-review-6-stages/SKILL.md`（実装後の最終確認）
- 参照 docs:
  - `CLAUDE.md` §6・§9・§10・§11・§14・§19
  - `docs/01-seo-aio-policy.md`
  - `docs/03-improvement-roadmap.md`
  - `docs/05-content-guidelines.md`
  - `docs/eval/seo-aio-checklist.md`

---

## 過去の適用例

- `docs/eval/records/2026-05-saijo-temple-hall-expansion.md`（7 → 16 施設・7 エリアグループ化）
- `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`（/case/ 一覧 SEO/AIO 強化）
- `docs/eval/records/2026-05-case-terminology-normalization.md`（施工事例 → 施行事例の表記統一）
