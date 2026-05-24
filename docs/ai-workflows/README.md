# AI 活用ルール・再利用知見の集約 (ai-workflows)

このフォルダは、川口典礼サイト運用における **AI 活用ルール・再利用プロンプト・Skill 候補・Agent 候補・安全設計・評価指標** をまとめる場所です。

AI に聞いて終わりではなく、成果物を保存・整理・再利用するための運用ナレッジを集約します。

## docs 内の役割分担

| フォルダ | 目的 |
|---|---|
| `docs/eval/records/` | **実装完了レポート**（コード変更を含む施策の完了記録） |
| `docs/operations/` | **手動運用ログ**（Search Console など、リポジトリ外のツール操作の履歴） |
| `docs/ai-workflows/`（本フォルダ） | **AI 活用方針・再利用手順・改善案** |
| `docs/area/` | エリアページ実装前の **設計メモ**（slug・画像配置などの確定情報） |
| `docs/prompts/` | Claude Code に渡す **再利用プロンプト** |
| `docs/00〜05` | プロジェクト全体方針・SEO/AIO・競合分析・Privacy Review・コンテンツ方針 |

## このフォルダのファイル

| ファイル | 内容 |
|---|---|
| `README.md`（本ファイル） | 全体方針・他フォルダとの役割分担 |
| `task-classification.md` | 作業を Prompt / Skill / Agent / MCP / Hook / Human Approval / AI化しない に分類 |
| `skill-backlog.md` | 作るべき Skill 候補のバックログ（優先度 A / B） |
| `guardrails-and-approval.md` | プロジェクト固有の安全設計と人間承認ルール |
| `eval-metrics.md` | AI 作業の品質評価指標 |
| `ai-operations-roadmap.md` | 今後3か月の AI 運用ロードマップ |

## 川口典礼サイトでの AI 活用の主な対象

- **SEO / AIO 改善**（タイトル・metaDescription・FAQ・構造化データ・地域キーワード）
- **エリアページ追加**（Batch 単位の地域 SEO 拡張）
- **画像管理**（hero 画像のリネーム・配置・alt/caption 設計）
- **Search Console 運用**（sitemap 再送信・URL 検査・インデックス登録・記録）
- **構造化データ**（BreadcrumbList / FAQPage / FuneralHome / Review）
- **問い合わせフォーム** / **Webhook**（GAS 連携・バリデーション・エラー表示の改修と Privacy Review）
- **個人情報保護**（施工事例・口コミ・画像・問い合わせデータの取り扱い）
- **本番確認** / **完了記録**（push 後の HTTP / canonical / 構造化データ / Related リンクの本番チェック）

## 基本ルール（このサイト固有）

1. **成果物は捨てない**：Claude Code に質問・依頼したものは、再利用できる形で本フォルダ／関連 docs に残す
2. **作業の種類を分類してから着手**：Prompt で十分か、Skill 化すべきか、Agent 候補か、Hook 化候補か、人間承認必須か（→ `task-classification.md`）
3. **個人情報・機密情報はリポジトリに残さない**：`.env*` / `FORM_WEBHOOK_SECRET` / Webhook URL / API キー / 顧客・故人・喪主の特定情報
4. **Privacy Review と人間承認を優先**：フォーム・Webhook・GAS・公開画像・施工事例・口コミの変更は必ず人間承認
5. **既存ルールを壊さない**：`CLAUDE.md` / `AGENTS.md` / `docs/00〜05` / `docs/eval/seo-aio-checklist.md` は本フォルダの上位ルール

## CLAUDE.md へ将来反映したい項目

現状の `CLAUDE.md` は P0 時点で整理されており、構造が安定しているため **今は直接編集しません**。
ただし以下を将来反映する候補として記録します。実際に追記するかは、運用が安定してから別タスクで判断します。

- AI 作業成果物は `docs/eval/records/` / `docs/operations/` / `docs/ai-workflows/` に保存して再利用する
- 作業着手前に **Prompt / Skill / Agent / Hook / Human Approval** のどれに該当するか意識する
- **Privacy Review と人間承認ルール**を最優先にする（フォーム・Webhook・GAS・公開画像・施工事例・口コミ・価格表記・Search Console の不可逆操作）
- 再利用可能と判断した知見は `docs/ai-workflows/` に追加する

短い追記で済むため、後日 1〜3 行で `CLAUDE.md` の末尾に「AI 運用補足」セクションを追加する形が現実的。

## 関連ドキュメント

- プロジェクト全体方針: `docs/00-project-policy.md`
- SEO / AIO 方針: `docs/01-seo-aio-policy.md`
- 競合分析: `docs/02-competitor-analysis-summary.md`
- 改修ロードマップ: `docs/03-improvement-roadmap.md`
- Privacy Review: `docs/04-privacy-review.md`
- 文言・コンテンツ方針: `docs/05-content-guidelines.md`
- SEO/AIO 評価チェックリスト: `docs/eval/seo-aio-checklist.md`
- 作業用プロンプト集: `docs/prompts/claude-code-prompts.md`
