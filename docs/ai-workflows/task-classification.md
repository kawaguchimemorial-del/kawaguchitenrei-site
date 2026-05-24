# 作業分類: Prompt / Skill / Agent / MCP / Hook / Human Approval / AI化しない

川口典礼サイトの AI 関連作業は、着手前に以下のいずれかに分類してから進めます。
分類することで「使い捨て」「再利用すべき」「人間承認必須」を切り分け、知見の流出と事故を防ぎます。

## 分類フローチャート（簡易）

1. 一度限り・低リスク → **Prompt で十分**
2. 同じ手順を何度も繰り返す → **Skill 化すべき**
3. 複数ステップ・自律判断が必要 → **Agent 化候補**
4. 外部システム連携が必要 → **MCP / Tool 接続が必要**
5. ローカルで自動チェックしたい → **Hook 化候補**
6. 不可逆・本番影響・個人情報 → **Human Approval 必須**
7. 法的判断・顧客対応・実在判断 → **AI 化しない方がよい**

## Prompt で十分

単発の使い切り。再利用価値が低いか、毎回内容が変わるもの。

- 単発の文言修正案（既存セクションの言い回し改善）
- 個別ページの metaDescription 案
- 個別ページの FAQ 1〜2 問の追加案
- Claude Code へ渡す一回限りのプロンプト作成
- 小さな typo 修正・表記揺れ修正
- 既存 docs の要約

**運用**: 再利用すると判断した時点で `docs/prompts/claude-code-prompts.md` に転記し、繰り返し性が高くなったら Skill 化を検討。

## Skill 化すべき

手順が確立されており、何度も同じパターンで使う作業。

| Skill | 目的 |
|---|---|
| area-page-addition | 新規エリアページ追加（lib/areas.ts、page.tsx、sitemap、AreasSection、relatedLinks の整合） |
| area-image-management | エリアごとの hero 画像リネーム・配置・alt/caption 設計 |
| search-console-operation-log | Search Console 作業の記録テンプレ作成・更新 |
| structured-data-check | BreadcrumbList / FAQPage / FuneralHome / Review の検証 |
| privacy-review-jp | フォーム / Webhook / GAS / 施工事例 / 口コミ / 画像の個人情報チェック |
| production-verification | push 後の本番 HTTP / canonical / 画像 / Related リンクの確認 |
| completion-record | 実装完了レポート docs の作成（`docs/eval/records/`） |
| ai-code-review-6-stages | コードレビューを 6 段階（型/lint/build/構造化データ/Privacy/トーン）で実行 |

詳細は `skill-backlog.md` 参照。

## Agent 化候補

複数ステップを自律的に進め、最後に人間が確認するパターン。

- **SEO/AIO 改善提案 Agent** — 現状の metaTitle / metaDescription / FAQ / 構造化データを横断的に評価し、改善案を出す
- **documentation-agent** — 完了記録・運用ログ・設計メモを各 docs フォルダの規約に従って整える
- **privacy-reviewer** — 変更ファイルのうちフォーム/Webhook/GAS/公開画像/施工事例/口コミ関連を抽出し、Privacy Review を実施
- **Search Console 記録 Agent** — Search Console 上の手動作業を聞き取り、`docs/operations/search-console/` にテンプレ通り記録
- **content-review-agent** — 葬儀サイトとして不適切な表現（煽り・断定・最安・追加費用なし等）を全文走査
- **image-management-agent** — `public/images/tmp/` を検出して正式配置へ移動、`lib/areas.ts` の heroImage 設定もガイド

**前提**: いずれの Agent も最終承認は人間。Agent が勝手に push / フォーム送信 / 顧客対応はしない。

## MCP / Tool 接続が必要

外部システムとのデータ連携が必要な作業。接続前に **権限・ログ・人間承認ルール**を整備すること。

| 接続先 | 用途 | 接続前の要確認事項 |
|---|---|---|
| Google Search Console | sitemap 状況・カバレッジ・検索クエリ取得 | 不可逆操作（URL 削除等）は人間承認 |
| Google Analytics (GA4) | 流入分析・コンバージョン確認 | 個人特定 ID を含むデータの扱い |
| Gmail / Google Sheets / Google Calendar | スプレッドシート連携・スケジュール | 顧客メール・予約情報の取り扱い |
| GitHub | issue / PR / Actions 連携 | 自動コミット・自動 push は禁止 |
| Vercel | デプロイ状況・ログ確認 | 環境変数の表示・編集は禁止 |
| Notion / Obsidian | ナレッジ蓄積 | 個人情報・機密の混入チェック |

**運用ルール**: MCP 接続するときは、別途 `docs/ai-workflows/mcp-connections.md` を作成して、接続経緯・権限スコープ・人間承認境界を記録する（このフォルダで管理）。

## Hook 化候補

Claude Code の hooks 機能で、Claude が動かなくても自動的に走らせたい安全チェック。

| Hook | 役割 | 発火タイミング |
|---|---|---|
| `.env` 読み取り禁止 | Read/Edit ツールから `.env*` をブロック | tool 呼び出し前 |
| `git diff --check` | コミット前に空白問題を検出 | コミット直前 |
| build 前後のログ保存 | `npm run build` の出力を `.cc-logs/` 等に保存 | build コマンド前後 |
| 個人情報らしき文字列検出 | 氏名 / 電話 / メール / 住所っぽい文字列を warning | Write / Edit 前 |
| `package.json` 変更時の警告 | 依存追加・スクリプト変更時に確認を促す | Edit / Write 前 |
| フォーム/Webhook 関連ファイル変更時 | Privacy Review 要求を表示 | `components/**/contact*`、`app/api/**` の変更時 |
| 本番公開前チェックリスト表示 | push 直前にチェック項目を表示 | git push 前 |

`update-config` Skill での settings.json 編集が必要なものが多いので、別タスクで段階的に導入する。

## Human Approval 必須

AI が単独で判断せず、必ず人間の承認を取るべき作業。

- `git push`（特に `main` / 本番反映）
- 本番影響のある変更（Header / Footer / MobileBottomCTA / next.config.ts / package.json）
- 問い合わせフォーム / Webhook / GAS / 環境変数まわりの変更
- 顧客情報 / 口コミ / 施工事例 / 画像の公開・差し替え
- 価格表記の新規追加・変更（`CLAUDE.md §9` の正本以外は禁止）
- Search Console の URL 削除・noindex 設定・除外などの不可逆操作
- 顧客へのメール送信・電話・フォーム送信・通知系の発信
- `git reset --hard` / `git push --force` / `rm -rf` / リネーム / 依存削除等の破壊的操作

**承認の取り方**: 着手前に「これから X を行います、進めてよいですか？」と短い実装計画を出してから合意を取る（`CLAUDE.md §6` の作業ルールに従う）。

## AI 化しない方がよい

AI に任せると逆に危険、または効率が悪い領域。

- 実在顧客の状況・葬儀進行についての具体的な判断
- 法的判断の断定（特商法・葬祭関連法・個人情報保護法の解釈）
- 葬儀費用の断定（実際の見積もりは現場の人間が行う）
- 顧客への無承認連絡（メール / 電話 / フォーム返信を AI が単独で送らない）
- 本番 DB / 顧客データ / 個人情報の無承認処理
- 「絶対」「必ず」「最安」「追加費用なし」「総額確定」など断定的な表現を AI が生成して本番に出すこと
- 競合他社の優劣の断定・誹謗中傷

## 分類例（実例）

| 過去の作業 | 該当分類 |
|---|---|
| P1 Batch 1 のエリアページ 5 ページ追加 | Skill 化すべき（area-page-addition） |
| Search Console の sitemap 再送信記録 | Skill 化すべき（search-console-operation-log） |
| 既存 3 エリアの relatedLinks に新規 5 エリアを追加 | Skill 化すべき（area-page-addition の付随処理） |
| Batch 2 の slug・画像配置の事前確定 | Skill 化すべき（area-image-management の前段） |
| 個別ページの metaDescription 案 1 件 | Prompt で十分 |
| 6 エリア分の Area データ草稿作成 | Prompt で十分（ただし完成時に Skill 化検討） |
| push 前の git status / diff 確認 | Hook 化候補 |
| push そのもの | Human Approval 必須 |
| `.env` の中身を見たい | AI 化しない方がよい（読まない） |
