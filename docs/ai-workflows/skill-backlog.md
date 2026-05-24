# Skill バックログ

川口典礼サイトで作るべき Skill 候補のバックログ。優先度 A から順に整備する。

各 Skill は、以下のフォーマットで設計：

```
目的 / 使う場面 / 入力 / 出力 / 必ず読むファイル / 禁止事項 / 人間確認が必要な条件
```

---

## 優先度 A（早めに作る）

### 1. `area-page-addition` Skill

- **目的**: 新規エリアページを既存パターンと整合させて追加する
- **使う場面**: P1 Batch 2、Batch 3 以降のエリアページ追加時
- **入力**: 対象エリアの slug / name / 読み / 駅・地名情報 / hero 画像パス / 隣接エリア
- **出力**:
  - `lib/areas.ts` への Area データ追加（`areaXxx` 定数、`areas` 配列末尾に追記）
  - `app/area/<slug>/page.tsx` 新規作成（JSON-LD 3 種 + Related 含む）
  - `app/sitemap.ts` に URL 追加
  - `components/home/AreasSection.tsx` に追加
  - 既存エリアの relatedLinks への相互リンク提案
- **必ず読むファイル**:
  - `CLAUDE.md`（特に §5 触らないもの、§14 価格、§11 トーン）
  - `docs/01-seo-aio-policy.md`
  - `docs/05-content-guidelines.md`
  - 既存の `app/area/nishikawaguchi/page.tsx` を雛形参照
  - `docs/area/<該当バッチ>.md`（slug/画像確定メモ）
- **禁止事項**:
  - 未確認の距離・所要時間（「車で約N分」「徒歩N分」）を追加しない
  - 「最安」「必ず」「絶対」「追加費用なし」「総額確定」を含めない
  - 個人名・故人名・喪主名を含めない
  - 既存プラン正本（`CLAUDE.md §9`）以外の価格を追加しない
- **人間確認が必要な条件**:
  - `lib/areas.ts` への追加内容（特に metaTitle / metaDescription / FAQ）
  - 既存ページの relatedLinks への影響範囲
  - push 前

### 2. `area-image-management` Skill

- **目的**: エリアごとの hero 画像のリネーム・配置・heroImage 設定を統一手順で行う
- **使う場面**: バッチ単位で hero 画像が `public/images/tmp/` に置かれた時
- **入力**: 元ファイル名（日本語可）と対応する slug の対応表
- **出力**:
  - `public/images/area/{slug}/station.png` への移動
  - `lib/areas.ts` の `heroImage` 設定（src / alt / caption）
  - `docs/area/YYYY-MM-<batch>-area-slugs-and-images.md` への記録
- **必ず読むファイル**:
  - 既存 `lib/areas.ts` の `areaAraijuku.heroImage` / `areaHatogaya.heroImage`
  - `docs/area/2026-05-p1-batch2-area-slugs-and-images.md` (フォーマット参照)
- **禁止事項**:
  - 既存画像のリネーム・上書き
  - `public/images/tmp/` 配下で日本語ファイル名を残したまま参照しない
  - 顧客・故人・喪主が写った画像の公開
- **人間確認が必要な条件**:
  - 移動先の slug 命名の妥当性
  - alt / caption に駅名や地区名を含める場合は事実確認

### 3. `search-console-operation-log` Skill

- **目的**: Search Console 上の手動作業（sitemap 送信・URL 検査・インデックス登録）を統一フォーマットで記録
- **使う場面**: バッチ公開後・カバレッジ確認時・対応中の不具合確認時
- **入力**: 対象施策 / 関連コミット / 対象 URL / 作業目的
- **出力**:
  - `docs/operations/search-console/YYYY-MM-DD-<件名>.md` 新規作成
  - 実施前チェックリスト + 結果欄
  - 「インデックス登録リクエスト送信済み」と「インデックス登録完了」を区別する
- **必ず読むファイル**:
  - `docs/operations/README.md`
  - `docs/operations/search-console/README.md`
  - 既存の `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
- **禁止事項**:
  - 「インデックス登録完了」と書く（Google 側の処理結果を断定）
  - 同一 URL への短期間の連続リクエストを推奨する
- **人間確認が必要な条件**:
  - URL 削除・noindex・除外などの不可逆操作

### 4. `privacy-review-jp` Skill

- **目的**: 日本向け葬儀サイトの観点での Privacy Review（フォーム / Webhook / GAS / 公開画像 / 施工事例 / 口コミ / 個人情報リスク）
- **使う場面**:
  - `components/**/contact*`、`app/api/**`、`app/contact/`、`app/case/`、`app/voice/` の変更時
  - 画像・口コミ・施工事例の追加・差し替え時
- **入力**: 変更ファイル一覧、変更差分
- **出力**:
  - チェックリスト形式の Privacy Review レポート
  - 必要に応じて修正提案
- **必ず読むファイル**:
  - `docs/04-privacy-review.md`
  - `CLAUDE.md §12`（個人情報・フォーム・Webhook ルール）
- **禁止事項**:
  - `.env*` の中身を読む・表示する・編集する
  - `FORM_WEBHOOK_SECRET` / Webhook URL / API キーをログ・コードに出す
  - 氏名・電話・メール・住所・故人情報・葬儀日程をログ出力する
- **人間確認が必要な条件**:
  - フォーム / Webhook / GAS 連携の改修すべて
  - 施工事例・口コミ・遺影・名札・会葬礼状が写る画像の公開

### 5. `structured-data-check` Skill

- **目的**: 各ページの JSON-LD（BreadcrumbList / FAQPage / FuneralHome / Review）の整合性チェック
- **使う場面**: エリアページ・斎場ページ・プランページ・施工事例・口コミの追加時、本番反映後
- **入力**: 対象 URL または HTML
- **出力**:
  - JSON-LD パース結果と妥当性チェック
  - Rich Results Test / Schema Markup Validator URL の提示
  - 不整合・欠損の指摘
- **必ず読むファイル**:
  - `docs/01-seo-aio-policy.md` の構造化データ方針
  - `docs/eval/seo-aio-checklist.md`
- **禁止事項**:
  - 偽の `aggregateRating` / `Review` を追加する
  - `areaServed` を実在しない地域に設定する
- **人間確認が必要な条件**:
  - 構造化データの新規追加・大幅変更

### 6. `production-verification` Skill

- **目的**: push 後の本番確認を統一手順で行う
- **使う場面**: 主要変更を push し Vercel デプロイ完了後
- **入力**: 対象 URL リスト、期待される画像パス・canonical・Related リンク
- **出力**:
  - HTTP ステータス一覧（curl で取得）
  - 画像 URL / Content-Type / 404 の有無
  - canonical 整合チェック
  - 期待される画像参照が HTML に含まれているか
  - 禁止表現の本番混入チェック
- **必ず読むファイル**:
  - `docs/eval/seo-aio-checklist.md`
- **禁止事項**:
  - `.env*` を読まない、Vercel 環境変数を表示しない
- **人間確認が必要な条件**:
  - 404 や canonical 不整合が見つかった場合の修正方針

### 7. `completion-record` Skill

- **目的**: 実装完了レポート docs を統一フォーマットで作成
- **使う場面**: 一連の施策が本番反映され、本番確認も完了したタイミング
- **入力**: 対象コミット / 目的 / 変更内容 / 本番確認結果
- **出力**:
  - `docs/eval/records/YYYY-MM-<件名>.md` 新規作成
- **必ず読むファイル**:
  - 既存の `docs/eval/records/2026-05-p1-batch1-area-pages.md`
  - `docs/eval/records/2026-05-p1-batch1-5-internal-links-hero-images.md`
- **禁止事項**:
  - 本番確認していない結果を「確認済み」と書く
  - 個人情報・顧客特定情報を残す
- **人間確認が必要な条件**:
  - 完了とする線引きの判断

### 8. `ai-code-review-6-stages` Skill

- **目的**: コードレビューを 6 段階で実行し、見落としを減らす
- **使う場面**: 大きめの変更・施策単位の差分レビュー
- **入力**: ブランチ差分 / PR
- **出力**: 6 段階それぞれの所見と修正提案
- **6 段階**:
  1. **型・lint**（tsc / eslint）
  2. **build**（`npm run build`）
  3. **構造化データ**（JSON-LD の整合性）
  4. **Privacy**（個人情報・Webhook・環境変数の混入チェック）
  5. **トーン**（煽り・断定・最安・追加費用なし・必ず・絶対などの禁止表現）
  6. **既存ルール整合**（CLAUDE.md / 触らないファイル / 価格正本 / トーン）
- **必ず読むファイル**:
  - `CLAUDE.md`
  - `docs/01-seo-aio-policy.md`
  - `docs/05-content-guidelines.md`
  - `docs/04-privacy-review.md`
- **禁止事項**:
  - 6 段階のうち一部しか実行せずに完了と報告する
- **人間確認が必要な条件**:
  - 不適合が見つかったときの修正実装着手前

---

## 優先度 B（順次整備）

### 9. `local-business-seo-research` Skill

- **目的**: 地域名 × 葬儀ジャンルキーワードの検索意図・上位ページ傾向を整理
- **使う場面**: 新規エリアバッチ着手前
- **入力**: 対象キーワード / 地域名
- **出力**: 検索意図・既存上位ページの構造・コンテンツ深さ・FAQ 候補
- **必ず読むファイル**: `docs/01-seo-aio-policy.md`、`docs/02-competitor-analysis-summary.md`
- **禁止事項**: 競合他社の固有名詞による優劣の断定
- **人間確認が必要な条件**: 採用するキーワード方針

### 10. `competitor-fv-analysis` Skill

- **目的**: 競合のファーストビュー・主要訴求を整理し、トーン暴走防止に使う
- **使う場面**: 大きめのデザイン議論前
- **入力**: 競合 URL リスト
- **出力**: 競合 FV の傾向と、川口典礼が **真似してはいけない要素** の整理
- **必ず読むファイル**: `docs/02-competitor-analysis-summary.md`、`CLAUDE.md §3`
- **禁止事項**: 競合の優劣を断定する記述、競合誹謗
- **人間確認が必要な条件**: 川口典礼への適用判断

### 11. `funeral-content-safety-review` Skill

- **目的**: 葬儀サイトとしてのトーン安全性チェック
- **使う場面**: コンテンツ追加・改修すべて
- **入力**: 対象テキスト
- **出力**: 煽り / 断定 / 不安喚起 / 押し売り / 競合誹謗の検出と修正提案
- **必ず読むファイル**: `docs/05-content-guidelines.md`、`CLAUDE.md §11 §14`
- **禁止事項**: 「絶対」「必ず」「最安」「追加費用なし」「総額確定」を残す
- **人間確認が必要な条件**: トーン判断が分かれる箇所

### 12. `faq-generation` Skill

- **目的**: エリア / プラン / 斎場 / コラムページの FAQ を統一フォーマットで生成
- **使う場面**: 各ページ FAQ セクション追加時
- **入力**: 対象ページの主題 / 想定読者
- **出力**: 6〜10 問の FAQ 案
- **必ず読むファイル**: 既存ページの FAQ 例（araijuku 等）
- **禁止事項**: 価格断定、推測の事実、競合言及
- **人間確認が必要な条件**: 採用判断

### 13. `voice-case-privacy-review` Skill

- **目的**: 施工事例（`/case/`）・口コミ（`/voice/`）の個人情報・特定情報チェック
- **使う場面**: 施工事例・口コミの追加・差し替え時
- **入力**: 対象ファイルの差分
- **出力**: 個人情報リスクの指摘と修正案
- **必ず読むファイル**: `docs/04-privacy-review.md`、`CLAUDE.md §12 §13`
- **禁止事項**: 故人名・喪主名・顧客特定情報の公開
- **人間確認が必要な条件**: 全件（公開前に人間チェック必須）

### 14. `html-report` Skill

- **目的**: 施策の振り返り・本番確認結果を HTML レポート形式で出力
- **使う場面**: 月次まとめ・大規模施策の事後レポート
- **入力**: 期間 / 対象施策
- **出力**: 静的 HTML レポート
- **必ず読むファイル**: 該当期間の `docs/eval/records/` と `docs/operations/`
- **禁止事項**: 個人情報の混入
- **人間確認が必要な条件**: 配布先・公開可否

### 15. `ai-workflow-documentation` Skill

- **目的**: AI 作業の知見を `docs/ai-workflows/` に整理する作業自体を半自動化
- **使う場面**: 新たな再利用パターンが見えたとき
- **入力**: 対象パターン / 経緯
- **出力**: `docs/ai-workflows/` 配下の該当ファイル更新
- **必ず読むファイル**: `docs/ai-workflows/README.md`、`task-classification.md`
- **禁止事項**: 個人情報・機密の記録
- **人間確認が必要な条件**: 追加・大幅更新時

---

## 整備順の目安

1. **まず A グループの 1〜3**（area-page-addition / area-image-management / search-console-operation-log）を整える
   - 直近の Batch 2 着手で恩恵が大きい
2. 次に **A グループの 4〜8**（privacy-review-jp / structured-data-check / production-verification / completion-record / ai-code-review-6-stages）
3. B グループは Phase 2 以降（`ai-operations-roadmap.md` 参照）

各 Skill の実装は、Claude Code の skills 機能（`.claude/skills/`）または `docs/prompts/` 配下の再利用プロンプトとして整備する。実装方式の選定は別タスクで判断する。
