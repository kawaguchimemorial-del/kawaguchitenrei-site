# 00. プロジェクト方針

このファイルは、川口典礼サイト（kawaguchitenrei.com）の Next.js / Vercel 運用および
SEO / AIO 改善プロジェクト全体の方針をまとめる。

個別の SEO / AIO 詳細・競合分析・ロードマップ・Privacy Review・文言ルール・プロンプト・
評価チェックリストは、それぞれ別ファイルにある。本書はそれらの「上位方針」を定める。

---

## 1. プロジェクトの目的

埼玉県川口市の葬儀社「川口典礼」の公式サイトを、

- **検索される**（SEO）
- **AI に引用される**（AIO）
- **問い合わせにつながる**（CV）

の 3 軸で改善し続け、ご家族が「葬儀社を検討する最初の接点」として
安心して読めるサイトに育てる。

派手な訴求・煽り・断定ではなく、**信頼感・地域密着・誠実さ** で勝つ。

---

## 2. 公開後の改善方針

サイトはすでに本番公開済み。今後の改修は次の順序で進める。

1. **基盤整備**（CLAUDE.md / docs / Privacy Review）
2. **ハイインパクト箇所の改善**（トップ FV、CTA、めぐりの森導線、構造化データ）
3. **コンテンツ拡張**（エリアページ、施工事例、口コミ、FAQ、比較検討コラム）
4. **運用最適化**（速度、画像、GBP 連携、事前相談コンテンツ）

各フェーズは `docs/03-improvement-roadmap.md` の P0 / P1 / P2 に対応する。

---

## 3. 何を優先するか

| 優先 | 内容 | 理由 |
|---|---|---|
| 最優先 | ご遺族への配慮（言い回し・ビジュアル・煽らない） | 葬儀社サイトの存在理由 |
| 高 | 信頼感・地域密着 | 差別化の核 |
| 高 | スマホ表示 | 訪問者の多くがスマホ |
| 高 | 問い合わせ動線のなめらかさ | サイトの目的 |
| 中 | SEO / AIO | 集客の核だが、信頼感より下位 |
| 中 | 構造化データ・内部リンク | AIO で効く |
| 低 | デザインの新しさ・流行 | トーン統一を崩してまでやらない |

---

## 4. 何を後回しにするか

- 派手な UI 刷新（既存トーン統一を崩す変更）
- `funeral-system/`（自動見積もりシステム）の完全統合
- LINE 導線（指示があるまで実装しない）
- legal pages（利用規約・プライバシーポリシーの文面磨き）
- マイクロアニメーション・装飾の追加

---

## 5. Prompt / Skill / Agent / Guardrails / Eval を川口典礼用に置き換える

Claude Code / Claude Agent SDK 由来の概念を、本プロジェクト向けに対応づける。

| 一般概念 | 川口典礼サイトでの意味 |
|---|---|
| **Prompt** | `docs/prompts/claude-code-prompts.md` に整備した作業指示テンプレ |
| **Skill** | 「エリアページ追加」「FAQ追加」「構造化データ確認」など作業単位のレシピ |
| **Agent** | Claude Code 本体。指示プロンプトを読み、ファイル編集まで担当する |
| **Guardrails** | `CLAUDE.md` / `docs/04-privacy-review.md` / `docs/05-content-guidelines.md` の制約群（やってはいけないこと） |
| **Eval** | `docs/eval/seo-aio-checklist.md` のチェック項目で改修後の品質を判定 |

ポイント：

- Guardrails は「禁止リスト」だけでなく「葬儀社サイトとしての品格」を含む
- Eval は SEO / AIO 指標だけでなく「ご遺族への配慮」を必ず含める
- Prompt は使い捨てではなく、改善しながらリポジトリに残す

---

## 6. ナレッジ置き場の方針

- **正本はリポジトリ内 `docs/`**：GitHub に残る Markdown を信頼源とする
- **Obsidian は補助**：必要に応じて Obsidian で `docs/` フォルダを開いて読み書きしてよいが、Obsidian 専用記法やプラグイン依存は避ける
- **Obsidian 主役にしない**：プロジェクトに参加した他の人・将来の自分・Claude Code が、GitHub 上の docs だけで全体を理解できる状態を保つ
- Wikilink（`[[...]]`）よりも標準 Markdown リンク（`[label](path)`）を優先する

理由：
- Obsidian がない環境（CI、Vercel、GitHub Web UI、Claude Code）からも読める
- 検索・参照・引用が標準ツールで完結する
- バージョン管理が効く

---

## 7. ファイル構成（docs 配下）

```
docs/
├─ 00-project-policy.md            ← このファイル
├─ 01-seo-aio-policy.md            ← SEO / AIO 方針
├─ 02-competitor-analysis-summary.md  ← 競合分析要約
├─ 03-improvement-roadmap.md       ← P0 / P1 / P2 ロードマップ
├─ 04-privacy-review.md            ← 個人情報・フォーム・Webhook
├─ 05-content-guidelines.md        ← 文言・トーン・表現ルール
├─ prompts/
│  └─ claude-code-prompts.md       ← 作業用プロンプト集
└─ eval/
   └─ seo-aio-checklist.md         ← 改修後チェックリスト
```

新規ドキュメントを追加するときは番号順を維持。
番号が枯渇しそうな領域は `docs/<area>/` のサブディレクトリを切ってよい。

---

## 8. 関連ファイル

| ファイル | 役割 |
|---|---|
| `CLAUDE.md` | Claude Code 常時ルール |
| `AGENTS.md` | Next.js バージョン差分の注意喚起 |
| `README.md` | Next.js デフォルト（必要なら別途整備） |

`CLAUDE.md` 末尾に各 docs へのインデックスがある。

### 2026-09-05 追記: Codexへの引き継ぎ

`AGENTS.md` はNext.jsの注意書きを保持したうえで、Codex / 共通エージェントの入口へ拡張した。
業務ルール・料金の正本は引き続き `CLAUDE.md` と既存ポリシーを参照し、二重に更新しない。
現状分析とVercel・SEO/MEO/AIOの確認範囲は
`docs/seo-research/2026-09-05-site-baseline-and-codex-handoff.md` に記録した。
