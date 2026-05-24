# AI 運用ロードマップ（今後 3 か月）

川口典礼サイトでの AI 活用を、3 か月の枠で段階的に整備するロードマップ。
コード変更ではなく、**運用ルールと Skill の整備** を中心とする。

各 Phase の目安は約 1 か月。実装フェーズと並行して進めるため、無理のないペースで進む。

---

## Phase 1（〜2026-06）— 基盤整備

このフェーズは「**AI 活用の土台を作る**」フェーズ。本格的な Skill 化・Agent 化に進む前に、ルールと記録を整える。

### 1.1 docs/ai-workflows/ 整備（本タスクで完了）

- [x] `README.md`
- [x] `task-classification.md`
- [x] `skill-backlog.md`
- [x] `guardrails-and-approval.md`
- [x] `eval-metrics.md`
- [x] `ai-operations-roadmap.md`（本ファイル）

### 1.2 既存 CLAUDE.md との差分確認

- `CLAUDE.md` の §5（触らないもの）、§6（作業の進め方）、§9（料金正本）、§12（個人情報）、§14（価格表記）、§16（作業後の確認）と、`docs/ai-workflows/guardrails-and-approval.md` の内容が矛盾していないか確認
- 矛盾がある場合は **より厳しい方** を採用し、`guardrails-and-approval.md` 側に注記
- `CLAUDE.md` への反映は、まずは最小限の 1〜3 行追記（`docs/ai-workflows/README.md` の「CLAUDE.md へ将来反映したい項目」参照）。実施可否は別タスクで判断

### 1.3 Search Console ログ運用の定着

- `docs/operations/search-console/` のテンプレで、Batch 単位での記録を必ず行う
- 「インデックス登録リクエスト送信済み」と「インデックス登録完了」を区別する運用を徹底
- 数日後のインデックス状況再確認を必ず追記する
- `skill-backlog.md` の `search-console-operation-log` Skill の設計と運用が一致しているか確認

### 1.4 area-page-addition Skill の設計

- `skill-backlog.md` の `area-page-addition` Skill を、Batch 2 着手前に設計
- 実装方式の選定:
  - Claude Code の `.claude/skills/` 機能を使うか
  - `docs/prompts/` 配下の再利用プロンプトとして整備するか
- Batch 2 の本実装に間に合うタイミングで形にする

### Phase 1 完了の判断基準

- docs/ai-workflows/ の 6 ファイルが揃っている
- Search Console 作業が記録テンプレに沿って残っている
- area-page-addition の設計案が確定している（実装はまだでも可）

---

## Phase 2（〜2026-07）— 主要 Skill の整備

Phase 1 で土台ができたら、優先度 A の Skill を順次整備する。

### 2.1 Privacy Review Skill 作成

- `skill-backlog.md` の `privacy-review-jp` Skill を実装
- `docs/04-privacy-review.md` のチェックリストを Skill 化
- フォーム / Webhook / GAS / 公開画像 / 施工事例 / 口コミの変更時に自動的に呼び出される運用を検討
- 「本当に Privacy Review が必要なケース」と「不要なケース」の境界を明文化

### 2.2 構造化データチェック Skill 作成

- `skill-backlog.md` の `structured-data-check` Skill を実装
- BreadcrumbList / FAQPage / FuneralHome / Review の検証を統一手順化
- Rich Results Test / Schema Markup Validator の URL を結果に含める
- エリアページ・斎場ページ・プランページ・施工事例・口コミの追加時に必ず実行する運用へ

### 2.3 完了記録 docs 作成 Skill 作成

- `skill-backlog.md` の `completion-record` Skill を実装
- `docs/eval/records/` の既存ファイルから共通フォーマットを抽出
- 「実施日 / 対象コミット / 目的 / 変更内容 / 本番確認結果 / 安全確認結果 / 次回確認予定」を必須項目に
- 施策完了時の最終ステップとして必ず呼び出される運用へ

### 2.4 AI コードレビュー 6 段階チェック導入

- `skill-backlog.md` の `ai-code-review-6-stages` Skill を実装
- 大きめの差分が出るタイミング（バッチ単位の機能追加・改修）で実行
- 6 段階:
  1. 型・lint
  2. build
  3. 構造化データ
  4. Privacy
  5. トーン
  6. 既存ルール整合

### Phase 2 完了の判断基準

- 優先度 A の Skill のうち 4 つが利用可能
- 主要施策で `completion-record` が必ず使われる
- 大きめの変更で 6 段階レビューが定着

---

## Phase 3（〜2026-08）— ナレッジ蓄積と Agent 化検討

Skill が整ったら、知見の蓄積と外部システム連携の検討に進む。

### 3.1 Obsidian または docs/wiki へのナレッジ蓄積

- 蓄積対象:
  - 検索クエリと CTR の関係
  - 効果のあった metaDescription パターン
  - 効果のあった FAQ パターン
  - 効果のあった内部リンク設計
  - 失敗例（やってみて効果がなかった改修）
- 形式:
  - リポジトリ内に残すなら `docs/wiki/` 配下に `.md`
  - リポジトリ外で管理するなら Obsidian Vault（同期方式は別途検討）
- 個人情報・顧客特定情報は **絶対に含めない**

### 3.2 AI 投稿分析・SEO 調査の再利用化

- 検索クエリ調査・上位ページ分析・競合 FV 分析を、Skill / プロンプトテンプレ化
- `skill-backlog.md` の優先度 B の Skill（local-business-seo-research / competitor-fv-analysis）を整備
- 過去の調査結果が次回の調査で再利用される運用へ

### 3.3 Search Console / GA / Vercel 連携候補の整理

- MCP / Tool 接続の検討（`task-classification.md` の MCP 節参照）
- 接続前の必要事項を整理:
  - 権限スコープ
  - ログ保存先
  - 人間承認境界
  - 顧客 / 個人情報の扱い
- 接続するかしないかは、整理結果を見て別途判断（無理に接続しない）

### 3.4 Agent 化候補の検討

- `task-classification.md` の Agent 候補から、最初に作るべき 1〜2 個を選定
- 候補:
  - **content-review-agent**（葬儀サイトトーンの全文走査）
  - **image-management-agent**（tmp → 正式配置 → heroImage 設定までを誘導）
  - **documentation-agent**（完了記録・運用ログの整え）
- Agent は **最終承認は人間** という前提で設計

### Phase 3 完了の判断基準

- ナレッジ蓄積の場所と運用が決まっている
- 優先度 B Skill のうち 2〜3 個が利用可能
- MCP 接続の方針が決まっている（接続する／しないを含む）
- Agent 化候補の 1〜2 個が試行されている

---

## 横断的な原則（Phase 1〜3 共通）

### 触らないものは触らない

- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts`
- `funeral-system/` 配下
- `.env*`

### Privacy / 個人情報を最優先

- 顧客・故人・喪主の特定情報を残さない
- フォーム / Webhook / GAS 連携の変更は Privacy Review 必須

### push と本番反映は人間承認

- 自動 push しない
- 不可逆操作は再確認

### 知見は使い捨てにしない

- 一度作ったプロンプト・Skill・docs は再利用する
- 同じ作業を 2 回手作業でしない（2 回目は Skill 化を検討）

### 数値だけを追わない

- `eval-metrics.md` の指標は「事故を防ぐ」「改善を続ける」ための道具
- 数字のために本来の目的（ご遺族への配慮）を見失わない

---

## このロードマップの位置づけ

- このロードマップは **絶対のスケジュール表ではない**
- 実装フェーズ（Batch 2、Batch 3）の進捗と並走するため、優先度は柔軟に動かす
- Phase が進まなくても、Phase 1 の「事故を防ぐ最小ルール」だけは維持する
- 3 か月後にこのファイル自体を見直す（`docs/eval/records/YYYY-MM-monthly-review.md` で振り返り）

---

## 関連ドキュメント

- 作業分類: `docs/ai-workflows/task-classification.md`
- Skill バックログ: `docs/ai-workflows/skill-backlog.md`
- ガードレールと承認: `docs/ai-workflows/guardrails-and-approval.md`
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- プロジェクト全体方針: `docs/00-project-policy.md`
- SEO / AIO 方針: `docs/01-seo-aio-policy.md`
- 改修ロードマップ（サイト改修側）: `docs/03-improvement-roadmap.md`
- Privacy Review: `docs/04-privacy-review.md`
