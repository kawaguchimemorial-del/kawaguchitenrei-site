# /voice/（お客様の声）Privacy Review 分析

## 分析目的

今後 `/voice/` を主要ページから内部リンクで強化できるかを判断するため、現在の `/voice/` 配下にある個人情報・表現リスクを整理する。

本タスクは **分析のみ**。`lib/voices.ts` の修正・画像加工・内部リンク追加は一切行わない。

## 確認対象

- `/voice/`（一覧ページ）
- `/voice/[slug]/`（個別お客様の声、30 件）
- `lib/voices.ts`（データ定義、477 行）
- `public/images/voices/`（jpg 形式 5 枚）
- `public/images/voice/{slug}/questionnaire.webp`（webp 形式 25 枚）

## 現状の /voice/ 構造

| 項目 | 値 |
|---|---|
| 個別ページ数 | **30 件** |
| データファイル | `lib/voices.ts` |
| Voice 型フィールド | slug / title / family / **rating: number (1-5)** / **comment（実物のお声テキスト）** / **surveyImage（手書きアンケート画像）** / publishedAt / metaDescription |
| 一覧ページ | `/voice/` |
| 個別ページ JSON-LD | BreadcrumbList + Article のみ |
| **Review / AggregateRating / ratingValue 構造化データ** | **JSON-LD 未出力**（本番 HTML 内 0 件） ✅ |
| rating の分布 | rating: 5 が 25 件 / rating: 4 が 5 件 |
| 画像 | 計 30 枚（jpg 5 + webp 25） |
| slug 命名パターン | 日付＋イニシャル系 23 件 / 意味的命名 7 件 |

## リスク分類

### Voice 全体: **中〜高リスク**

内部リンクで誘導を強化すると、現状本番公開済みではあるものの、到達経路が増える＝個人情報拡散リスクが上がる領域。

### 個別リスク要素の分類

| リスク要素 | レベル | 件数の目安 | 影響範囲 |
|---|---|---|---|
| **スタッフ実名（本文内）** | 高 | 数件 | 該当 voice 個別ページの comment テキスト内 |
| **故人状況詳細（続柄・死亡経緯・病歴・介護状況等）** | 中〜高 | 多数 | comment テキスト内（「父の葬儀」「介護20年経過後に入院」等の自然な記述） |
| **手書きアンケート画像** | **未確認・要目視** | **30 枚** | 各個別ページの surveyImage で表示 |
| **rating フィールド（表示・JSON-LD）** | 低（既に対策済み） | 30 件すべて | 表示はされる可能性があるが JSON-LD には未出力（Review として出していない）✅ |
| **競合への暗黙的言及** | 中 | 約 4 件 | comment テキスト内（「前に依頼した葬儀会社に不満があり」等） |
| **slug 命名パターン**（日付＋イニシャル） | 中 | 23 件 | URL から個人特定の手がかり |
| **「JA」「親子関係」など個別事情** | 中 | 数件 | comment テキスト内 |

## Review / aggregateRating / ratingValue の状況

- `lib/voices.ts` には `rating: number (1-5)` フィールドが各 voice に存在
- ただし `app/voice/[slug]/page.tsx` の JSON-LD では **Article のみ**生成しており、Review / AggregateRating として構造化データには **出していない**
- 本番 HTML スキャンでも該当 0 件確認 ✅
- Google の Review 構造化データガイドラインに抵触するリスクは現状ない
- **本タスクでも追加しない**

## 手書きアンケート画像のリスク（要目視確認）

30 枚の `questionnaire.webp` / `voice-XX.jpg` は、**手書きの実物アンケート**を画像化したもの。以下が含まれる可能性があるが、本タスクでは画像内容を目視確認していない:

- 筆跡
- ご本人の署名・氏名
- 住所・電話番号
- 故人名・喪主名
- スタッフ名の手書き記載
- その他個人特定要素

→ **画像 30 枚を 1 枚ずつ目視確認するレビューが、内部リンク強化の前提として必要**。

## 内部リンクを強化した場合のリスク

| 強化方法 | リスク |
|---|---|
| 一覧 `/voice/` への誘導追加 | 中 — 一覧ページからは個別 30 件すべてに到達可能。個人情報拡散リスクの拡大 |
| 個別 `/voice/[slug]/` への deep link 追加 | **高** — スタッフ実名・故人状況詳細・競合言及などが特定 slug で直接強調される |
| 引用（comment 本文の埋め込み） | **極めて高** — 引用箇所で個人情報が再露出。引用範囲の判断・出典明示が複雑 |
| Review 構造化データ追加 | **極めて高** — Google ガイドライン違反・景表法上の「優良誤認」リスク |

## どの状態になれば /voice/ への一覧リンクを安全に追加できるか

以下のすべてが完了してから、再度判断する想定:

### Phase A: 画像目視確認

- 30 枚のアンケート画像を 1 枚ずつ確認
- 個人特定要素（署名・住所・電話番号・故人名）がないかを確認
- 該当箇所があれば、画像内マスク（白塗り）処理を行うか、画像を削除するか判断

### Phase B: 本文の Privacy Review

- 30 件の comment テキストを 1 件ずつ確認
- スタッフ実名の扱いをご本人・社内で再同意取得 → 必要なら匿名化（「ご担当の方」「スタッフの方」等）
- 故人状況詳細の表現を、ご家族の同意範囲で必要に応じて省略・抽象化
- 競合言及（「前に依頼した葬儀会社に不満」等）の取扱い判断

### Phase C: slug 命名の判断

- 日付＋イニシャル系の slug 23 件を、意味的命名 or 連番に変える判断
- ただし既存 URL の変更はリダイレクトの設計が必要

### Phase D: rating の扱い判断

- 表示の継続可否（rating: 5 が 25 件など）
- JSON-LD として Review を **追加しない** 方針の継続確認

## 推奨方針

- **現時点では `/voice/` への内部リンク強化は見送り** ✅
- 主要プラン・主要エリアからは引き続き `/case/` 一覧リンクのみで運用
- まず Phase A〜B（画像・本文の Privacy Review）を別タスクで実施
- Phase A〜B 完了後に、改めて `/voice/` 一覧への内部リンク強化を再評価
- **Review / AggregateRating / ratingValue 構造化データは引き続き追加しない**
- `lib/voices.ts` / `lib/cases.ts` / 既存画像は本タスクでは触らない

## 次のアクション候補

1. **画像目視確認タスク**（Phase A）の計画
   - 30 枚を順次確認する手順を decide
   - マスク処理は webp の再生成が必要（既存画像加工は本タスク禁止）
2. **本文 Privacy Review タスク**（Phase B）の計画
   - スタッフ実名の社内確認
   - ご本人同意の再取得方針
3. 上記が困難な場合の代替案
   - 既存の voice は **現状維持**（本番公開済み）
   - **新規の内部リンク強化は保留**
   - 別タスクで /case/ 一覧の SEO/AIO 強化を進める

## 関連ドキュメント

- 第 1 段階完了記録: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
- Privacy Review 指針: `docs/04-privacy-review.md`
- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
