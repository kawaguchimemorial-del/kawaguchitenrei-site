# Skill / Agent / Prompt / Hook / Human Approval 分類

このファイルは、川口典礼サイトの作業で **どの作業にどのナレッジを参照すべきか** を一覧化した索引。
CLAUDE.md が「憲法」、本ファイルが「索引」、`skills/*/SKILL.md` と `agents/*.md` が「具体手順・役割」。

最終更新: 2026-05-25

---

## 1. 用語の定義

| 名称 | 役割 | 配置 |
|---|---|---|
| **CLAUDE.md** | 入口・憲法。最重要ルール・触らないファイル・自動 push 範囲。 | リポジトリルート |
| **AGENTS.md** | Next.js のドキュメント参照ルール（訓練データ差分対策）。 | リポジトリルート |
| **Skill** | 「ある作業を行うときの標準手順」。チェックリスト形式。手順の再利用。 | `skills/<slug>/SKILL.md` |
| **Agent** | 「特定タスクに特化したエージェントの役割定義」。使う Skill・停止条件・人間承認条件。 | `agents/<slug>.md` |
| **Prompt** | 「過去に成功した依頼文の雛形」。再依頼時のテンプレ。 | `docs/prompts/claude-code-prompts.md` |
| **Hook** | 「ある操作の前後で必ず実行する処理」。今は人間ルール（後日 git pre-commit hook 化検討）。 | （将来）`.husky/`・`.git/hooks/` |
| **Human Approval** | 「人間承認が必須」。push 前・公開前に停止して確認を求める範囲。 | CLAUDE.md §19・各 Skill / Agent の停止条件 |

---

## 2. 作業 × 参照先 マトリクス

| 作業 | 主に参照する Skill | 主に参照する Agent | 主に参照する docs |
|---|---|---|---|
| **新規エリアページ追加** | seo-page-improvement | research-agent / documentation-agent | `docs/03-improvement-roadmap.md`・`docs/01-seo-aio-policy.md` |
| **既存ページの SEO/AIO 改善**（title・FAQ・JSON-LD・Related） | seo-page-improvement | research-agent / review-agent | `docs/01-seo-aio-policy.md`・`docs/eval/seo-aio-checklist.md` |
| **斎場・寺院会館ページ強化** | seo-page-improvement / privacy-review-jp | research-agent / review-agent | `docs/01-seo-aio-policy.md` |
| **Search Console 作業ログ作成** | search-console-log | documentation-agent | `docs/operations/search-console/README.md` |
| **施工事例 / 施行事例の追加・確認** | privacy-review-jp / seo-page-improvement | privacy-reviewer / review-agent | `docs/04-privacy-review.md` |
| **/voice/ お客様の声の追加・公開** | privacy-review-jp | privacy-reviewer | `docs/04-privacy-review.md` |
| **画像の追加** | privacy-review-jp | privacy-reviewer | `docs/04-privacy-review.md`・CLAUDE.md §13 |
| **フォーム改修** | privacy-review-jp / code-review-6-stages | privacy-reviewer / review-agent | `docs/04-privacy-review.md` |
| **コードレビュー全般** | code-review-6-stages | review-agent | CLAUDE.md §16 |
| **docs / ナレッジ整備** | （該当 Skill なし） | documentation-agent / memory-curator | `docs/ai-workflows/memory-management.md` |
| **チャット情報のメモリ振り分け** | （該当 Skill なし） | memory-curator | `docs/ai-workflows/memory-management.md` |

---

## 3. 自動化レベル分類

| レベル | 内容 | 例 |
|---|---|---|
| **L0: 人間のみ** | AI が自動で行わない。人間が判断・実行する。 | 寺院公式情報の電話確認 / 寺院との利用条件交渉 / 価格改定 / 顧客個人情報の取り扱い決定 |
| **L1: AI 提案 → 人間承認 → AI 実装** | AI が分析・案出し、人間が承認、AI が実装。push まで AI が進める。 | 通常の SEO/AIO 改善 / 既存エリアページ強化 / docs 整備 |
| **L2: AI 提案 → 人間承認 → AI 実装 → push 前再確認** | L1 と同様だが、push 前に人間が再度承認する。 | フォーム改修 / 価格表記の変更 / 寺院会館の利用条件記載追加 / Header / Footer 変更 |
| **L3: AI 自走** | 明示指示があれば AI が分析〜push まで一気通貫で実施。 | docs 追加（記録系）/ Search Console 作業ログ追加 / build 成功済みの軽微な SEO 改善 |

CLAUDE.md §19 の「自動 push してよい」範囲 = L1 / L3 相当、「push 前確認必須」範囲 = L2 相当、「停止条件」発動時 = L0 への昇格を意味する。

---

## 4. Skill / Agent 一覧（現状）

### Skills

| Skill | 用途 | レベル |
|---|---|---|
| `skills/seo-page-improvement/SKILL.md` | SEO/AIO 向けページ改善の標準 7 ステップ | L1 / L3 |
| `skills/search-console-log/SKILL.md` | URL 検査・公開 URL テスト後の docs 記録手順 | L3 |
| `skills/privacy-review-jp/SKILL.md` | 日本向け個人情報保護レビュー | L0 / L2 |
| `skills/code-review-6-stages/SKILL.md` | Format / Lint / Style / Logic / Design / Architecture の 6 段階レビュー | L1 |

### Agents

| Agent | 用途 | 主に使う Skill |
|---|---|---|
| `agents/research-agent.md` | 既存コード調査・本番取得・差分前検証 | seo-page-improvement の §1 |
| `agents/review-agent.md` | 実装後のコードレビュー・本番反映確認 | code-review-6-stages |
| `agents/documentation-agent.md` | 実装後の docs 記録・Search Console ログ作成 | search-console-log |
| `agents/privacy-reviewer.md` | 画像・本文の個人特定リスク確認 | privacy-review-jp |
| `agents/memory-curator.md` | チャット情報の保存先振り分け・古い記録の整理 | （memory-management docs） |

---

## 5. 今後追加候補（backlog）

詳細は `docs/ai-workflows/skill-backlog.md` を参照。

- `skills/content-tone-jp/SKILL.md`（葬儀社トーンの自動チェック）
- `skills/structured-data-validation/SKILL.md`（JSON-LD の Schema.org 妥当性確認）
- `skills/internal-link-audit/SKILL.md`（内部リンク網の整合性確認）
- `agents/keyword-tracking-agent.md`（Search Console 表示回数の継続観測）

新規追加時のテンプレ:

```md
# <Skill 名 / Agent 名>

## 目的
## 適用範囲
## 手順 / 役割
## 停止条件 / 人間承認条件
## 関連 Skill / Agent / docs
```

---

## 6. このファイル自身の運用ルール

- **Skill / Agent を新規追加したら、本ファイルの §4 表に必ず追記する**
- **使われなくなった Skill / Agent は、削除ではなく Deprecated マークを付ける**（過去経緯を辿れるようにする）
- **重複した手順を見つけたら統合する**（プロジェクトの最大の敵は分散したナレッジ）
- 更新時は `最終更新` の日付を更新する
