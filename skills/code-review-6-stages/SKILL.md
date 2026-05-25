# Skill: 6 段階コードレビュー

## 目的

実装したコードを Format / Lint / Style / Logic / Design / Architecture の 6 段階で確認することで、build エラー・品質低下・設計乖離を防ぐ。
AI が見落としやすい Logic・Architecture は人間確認を前提とする。

## 適用範囲

- すべての TypeScript / React / Next.js コード変更
- 新規ファイル作成・既存ファイル編集
- リファクタリング（影響範囲が大きい場合）
- データ追加・型定義変更

**適用外**:
- docs / Markdown のみの変更（→ documentation-agent のレビューで十分）
- 画像追加（→ privacy-review-jp）

---

## 6 段階の定義と確認方法

### Stage 1: Format（書式）

**AI 単独で確認可能**

| 確認項目 | 方法 |
|---|---|
| インデント（スペース 2 個） | Edit 時に既存スタイル踏襲 |
| 改行コード（プロジェクト統一: LF / Windows なら自動 CRLF 変換警告許容） | git warning でチェック |
| 末尾改行 | 既存ファイルの状態に合わせる |
| Tailwind クラスの並び順（hover: / md: / lg: の順） | 既存パターン踏襲 |

### Stage 2: Lint（静的解析）

**AI 単独で確認可能**

| 確認項目 | 方法 |
|---|---|
| TypeScript エラー | `npm run build` の TypeScript pass を確認 |
| ESLint 警告 | `npm run build` の警告ゼロを確認 |
| 未使用 import / 変数 | TypeScript エラーで検出 |
| `any` 型の濫用 | 既存ファイルに合わせ、新規追加なら避ける |

### Stage 3: Style（スタイル）

**AI 単独で確認可能、ただし既存トーンとの整合性は要注意**

| 確認項目 | 方法 |
|---|---|
| 既存コンポーネントのデザイン言語踏襲 | 既存カード・ボタン・見出しのクラスを参照 |
| 色（brand / brand-deep / ink-deep / ink-mid / line-soft / paper など）の用法 | `tailwind.config.ts` で定義済みカラーのみ使用 |
| フォント（serif-jp の見出し / sans の本文）の使い分け | 既存パターン踏襲 |
| レスポンシブ（モバイルファースト → md: で広がる） | CLAUDE.md §2 |

### Stage 4: Logic（ロジック）

**AI が見落としやすい領域 — 人間確認を強く推奨**

| 確認項目 | 方法 |
|---|---|
| 入力境界条件（空配列・undefined・null） | コード読解 + テスト |
| 計算ロジックの正しさ | 仕様照らし合わせ |
| FAQ 件数と JSON-LD 件数の一致 | grep でカウント比較 |
| `lib/*` のデータと表示の整合 | 該当データを Read で確認 |
| 内部リンクの href が正しい | grep + 既存 slug 突合 |
| 価格計算が §9 正本と一致 | CLAUDE.md §9 と突合 |

### Stage 5: Design（設計）

**AI 単独では判断が難しい — 人間確認を強く推奨**

| 確認項目 | 方法 |
|---|---|
| データ構造の妥当性（型・命名・関係） | 既存型と整合するか |
| コンポーネント分割の粒度 | 過度な分割 / 過小な分割を避ける |
| プロパティの API（optional vs required） | 後方互換性を考慮 |
| 表示順序（FV → 結論 → 詳細 → FAQ → CTA など）の整合 | 既存ページの流れを踏襲 |
| 同一情報の重複表示を避ける | 構造を見直す |

### Stage 6: Architecture（アーキテクチャ）

**AI 単独では判断が難しい — 人間確認を必須**

| 確認項目 | 方法 |
|---|---|
| 触ってはいけないファイルへの侵入 | CLAUDE.md §5・§19 |
| 共通コンポーネント（layout / common）の変更が他ページに波及しないか | grep で利用箇所確認 |
| データ層（lib/*）と表示層（app/* / components/*）の責務分離 | 設計原則 |
| 新規ディレクトリ・新規 slug 命名規則の一貫性 | 既存 slug を確認 |
| ルーティング変更の他ページ・sitemap への波及 | sitemap.ts と整合 |
| パフォーマンス（不要な server / client 切り替え） | 既存パターン踏襲 |

---

## 実施フロー

```
Stage 1 → Stage 2 → Stage 3 → Stage 4 → Stage 5 → Stage 6

各 Stage で:
  - AI 単独で OK の場合: 次の Stage へ
  - 人間確認推奨/必須の場合: ユーザーに報告 → 承認後に次の Stage へ
  - 問題発見: 修正 → 該当 Stage を再実施
```

---

## チェックリスト

### Stage 1〜3（AI 単独）

| 項目 | 確認 |
|---|---|
| インデント・改行が既存ファイルと整合 | ☐ |
| TypeScript エラー 0 件 | ☐ |
| ESLint 警告 0 件 | ☐ |
| 未使用 import / 変数なし | ☐ |
| 既存デザイン言語踏襲 | ☐ |
| Tailwind クラスが定義済みカラーのみ使用 | ☐ |

### Stage 4〜6（人間確認推奨/必須）

| 項目 | 確認 | 確認者 |
|---|---|---|
| 入力境界条件の処理が妥当 | ☐ | AI + 人間 |
| FAQ 件数と JSON-LD 件数が一致 | ☐ | AI |
| 価格が §9 正本と一致 | ☐ | AI + 人間 |
| 内部リンク href の正しさ | ☐ | AI |
| データ構造・コンポーネント分割の妥当性 | ☐ | 人間 |
| 表示順序の整合 | ☐ | 人間 |
| 触ってはいけないファイル不侵入 | ☐ | AI（自動 grep） + 人間 |
| 共通コンポーネント変更の波及調査 | ☐ | AI（grep） + 人間 |

---

## 停止条件

- build 失敗 / TypeScript エラー → **commit / push しない**、修正
- 静的生成ページ数の予想外の減少 → 停止、人間に報告
- 触ってはいけないファイルへの侵入 → 停止、人間承認
- 価格・式場利用可否・宗派条件の新規断定 → 停止、人間承認
- Stage 4〜6 で確信が持てない判断 → 人間に確認

---

## 関連 Skill / Agent / docs

- 上位 Agent: `agents/review-agent.md`
- 関連 Skill: `skills/seo-page-improvement/SKILL.md`（Step 5・Step 6 を本 Skill で詳細化）
- 参照 docs:
  - `CLAUDE.md` §5・§6・§16・§19
  - `AGENTS.md`（Next.js 訓練データ差分）

---

## 過去の適用例

- すべての実装変更で適用（明示記録なしでも実施）
- 特に build 失敗時の原因調査・型定義変更時に有効
