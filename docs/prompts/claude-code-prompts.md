# Claude Code 用プロンプト集

このファイルは、kawaguchitenrei.com の改修作業で繰り返し使う Claude Code 用
プロンプトをまとめたもの。**そのまま貼って使える形** で保管する。

使い方：
1. 該当プロンプトをコピー
2. Claude Code に貼り付け
3. 必要なプレースホルダ（`<...>`）を埋める
4. Claude Code は `CLAUDE.md` と `docs/` を読んでから実行する想定

各プロンプトは独立して動くように、前提（読むべきファイル）を明記している。

---

## 1. SEO / AIO 監査プロンプト

```
川口典礼サイトの <対象ページパス> を SEO / AIO の観点で監査してください。

前提として以下を読んでください:
- CLAUDE.md
- docs/01-seo-aio-policy.md
- docs/05-content-guidelines.md
- docs/eval/seo-aio-checklist.md

監査内容:
1. title / description / h1 / h2 階層の評価
2. 重要キーワード（docs/01-seo-aio-policy.md §3）の自然な含有
3. 結論ボックス・基本情報表・FAQ の有無
4. 構造化データ（JSON-LD）の現状
5. 内部リンクの過不足
6. AIO で抽出されやすいかの所感

報告は markdown 表で。実装はまだしない。
NG 表現（断定・煽り・最上級）が含まれていれば指摘してください。
```

---

## 2. トップ FV 改善プロンプト

```
トップページ (app/page.tsx) の FV（Hero セクション）を改善してください。

前提として以下を読んでください:
- CLAUDE.md
- docs/01-seo-aio-policy.md
- docs/03-improvement-roadmap.md（P0-2）
- docs/05-content-guidelines.md

要件:
- 川口市・新井宿の地域密着、自社式場（川口メモリアルホール）、めぐりの森近接（車約5分）を 1 画面で伝える
- スマホ実機での見え方を最優先
- 既存デザイントーン（落ち着き・上品・余白重視）を踏襲
- CTA は「電話」「事前相談」の 2 本（既存ポリシー）
- 「最安」「絶対」「必ず」「今すぐ」などの断定・煽り表現は禁止

実装前に短い計画を提示し、合意を取ってから 1 ファイルだけ編集してください。
完了後は変更ファイル一覧と確認 URL を提示。commit はしない。
```

---

## 3. スマホ CTA 改善プロンプト

```
スマホ下部固定 CTA (components/layout/MobileBottomCTA.tsx) の状態を確認し、
必要であれば改善案を提示してください。

前提:
- CLAUDE.md（特に §4 と §5：MobileBottomCTA は明示指示なしでは変更しない）
- docs/03-improvement-roadmap.md（P0-3）

確認内容:
- iOS Safari の safe-area-inset 対応
- フォームページ（/contact/, /estimate/）と干渉していないか
- LINE 導線が含まれていないか（含まれていれば指摘）
- ボタン文言が煽っていないか

変更が必要な場合は、まず改善提案だけ markdown で出してください。
実装は別チャットで合意を取ってから。
```

---

## 4. めぐりの森導線改善プロンプト

```
川口市めぐりの森 関連の内部導線を強化してください。

前提:
- CLAUDE.md（特に §10：SEO 中心軸、めぐりの森近接の訴求軸）
- docs/01-seo-aio-policy.md §4.6
- docs/03-improvement-roadmap.md（P0-5）
- docs/05-content-guidelines.md（外部斎場の表記ルール）

対象ページ（自然な箇所に /saijo/megurinomori/ への内部リンクを足す）:
- / （HallSection 付近）
- /hall/kawaguchi-memorial-hall/
- /saijo/
- 各 /plan/<slug>/
- /area/kawaguchi/

要件:
- めぐりの森は川口市営の火葬場であり、川口典礼の運営施設ではないことを明記
- 川口典礼で火葬・葬儀の相談・手配に対応している旨を明確化
- 「車で約 5 分」を主要ページに自然に配置
- リンク文言にキーワードを含める（「川口市めぐりの森の葬儀案内」など）

実装前に追加箇所を一覧化し、確認を取ってから編集。commit はしない。
```

---

## 5. エリアページ追加プロンプト

```
川口市内の新規エリアページを追加してください。

対象 slug: <例: nishikawaguchi>
対象タイトル: <例: 西川口 葬儀・家族葬 / 川口典礼>

前提:
- CLAUDE.md
- docs/01-seo-aio-policy.md §4.7
- docs/03-improvement-roadmap.md（P1-4）
- docs/05-content-guidelines.md

既存の /area/kawaguchi/ /area/araijuku/ /area/hatogaya/ の構造を踏襲してください。
新規ファイル:
- app/area/<slug>/page.tsx
- lib/areas.ts に <slug> エリアのデータ追加
- app/sitemap.ts に URL 追加

要件:
- 地域特性（駅・周辺斎場・寺院・地域文化）を 1〜2 段落
- プラン・斎場・流れ・FAQ・CTA をテンプレに沿って
- title / description / h1 / h2 はキーワードを自然に含める
- 構造化データ: BreadcrumbList + 必要なら FAQPage

実装前に lib/areas.ts に入れるデータ案を提示し、合意を取ってから実装。
commit はしない。
```

---

## 6. 施工事例 SEO 強化プロンプト

```
施工事例 (/case/, /case/<slug>/) の表形式と SEO を強化してください。

前提:
- CLAUDE.md
- docs/01-seo-aio-policy.md §4.8
- docs/03-improvement-roadmap.md（P1-5）
- docs/04-privacy-review.md §7（個人情報保護）
- docs/05-content-guidelines.md §8

要件:
- 一覧 (/case/) で「人数 / 日数 / 形式 / 斎場 / 概算費用」が表で見える
- 各事例ページに「結論ボックス」を冒頭に配置
- 構造化データ: Article（author は法人）
- 故人名・喪主名・番地は出さない
- 既存事例データ（lib/cases.ts）に個人情報が含まれていないか確認

実装前に変更ファイル候補と差分要約を提示。commit はしない。
```

---

## 7. 口コミページ強化プロンプト

```
口コミ一覧 (/voice/) と個別ページ (/voice/<slug>/) の表現と分類を強化してください。

前提:
- CLAUDE.md
- docs/01-seo-aio-policy.md §4.9
- docs/03-improvement-roadmap.md（P1-6）
- docs/04-privacy-review.md §7
- docs/05-content-guidelines.md §9

要件:
- 形式（家族葬・直葬等）・価格帯・印象でフィルタ可能に
- 喪主名・故人名は出さない（イニシャル + 年代 + 地域町名まで）
- 構造化データ: Review（itemReviewed は法人またはホール）
- 創作はしない。既存テキストの整理に留める

実装前に変更案を markdown で提示。commit はしない。
```

---

## 8. FAQ 追加プロンプト

```
FAQ を追加してください。

対象ページ:
- /faq/（全体 FAQ）
- 必要に応じて各下層ページ（プラン・斎場・エリア）の FAQ ブロック

前提:
- CLAUDE.md
- docs/01-seo-aio-policy.md §4.10
- docs/03-improvement-roadmap.md（P1-7）
- docs/05-content-guidelines.md §7

追加候補（例。実装前に内容確認）:
- 川口市の家族葬の費用はいくらですか？
- 川口市めぐりの森で葬儀はできますか？
- 戸田葬祭場や谷塚斎場でも手配できますか？
- 川口市の市民葬とは何ですか？
- 事前相談すると何が変わりますか？
- 深夜・早朝の連絡でも対応してもらえますか？
- 川口典礼以外の式場でも葬儀をお願いできますか？

要件:
- 質問は検索クエリ風
- 回答は結論先出し → 補足 → 確認導線
- 構造化データ: FAQPage
- 重複・矛盾の解消

実装前に追加案 5〜10 件をリスト化し、確認を取る。commit はしない。
```

---

## 9. 構造化データ確認プロンプト

```
構造化データ（JSON-LD）の現状を確認し、不足箇所を洗い出してください。

前提:
- CLAUDE.md
- docs/01-seo-aio-policy.md §7
- docs/03-improvement-roadmap.md（P0-6）

確認対象:
- /（FuneralHome / BreadcrumbList）
- /hall/kawaguchi-memorial-hall/（FuneralHome / BreadcrumbList / FAQPage）
- /saijo/（BreadcrumbList / FAQPage）
- /saijo/<slug>/（Place / BreadcrumbList / FAQPage）
- /plan/（BreadcrumbList）
- /plan/<slug>/（Service or Offer / BreadcrumbList / FAQPage）
- /area/<slug>/（BreadcrumbList / FAQPage）
- /case/<slug>/（Article / BreadcrumbList）
- /voice/<slug>/（Review）

報告:
- ページごとに「現状の JSON-LD」「不足タイプ」「修正案」を表で
- @id の統一状況も確認

実装はまだしない。報告のみ。
```

---

## 10. Privacy Review プロンプト

```
フォーム・Webhook・個人情報まわりの改修を行います。
実装前に Privacy Review を実施してください。

対象作業: <ここに改修内容を 1 行で>

前提として必ず読んでください:
- CLAUDE.md（§12）
- docs/04-privacy-review.md（全項目）

実行内容:
1. docs/04-privacy-review.md §2 のチェックリストを 1 項目ずつ評価
2. .env / FORM_WEBHOOK_SECRET を読んでいないことを確認
3. ログ・エラー出力に個人情報が含まれないか確認
4. 改修案の中で「人間確認が必須な箇所」を洗い出す

レビュー結果を markdown で報告。
チェックがすべて通ったら実装計画を提示し、合意を取ってから着手。
.env の値は絶対に出力しない。
```

---

## 11. 画像追加・alt 改善プロンプト

```
画像の追加または alt 改善を行ってください。

対象画像: <パス または 説明>
対象ページ: <ページパス>

前提:
- CLAUDE.md（§13 画像取り扱いルール）
- docs/04-privacy-review.md §7.2
- docs/05-content-guidelines.md §12

要件:
- 既存画像のファイル名・配置は変更しない（リネーム禁止）
- Next/Image を使う
- alt は具体的に（個人特定情報は入れない）
- 遺影・名札・会葬礼状が映る場合は人間確認が完了済みであることを確認
- 装飾画像は alt="" または aria-hidden

実装前に変更ファイル一覧を提示。commit はしない。
```

---

## 12. 改修後チェックプロンプト

```
直前の改修について、改修後チェックを実施してください。

前提:
- CLAUDE.md
- docs/eval/seo-aio-checklist.md

実行内容:
1. npm run build を実行し、エラー・警告がないことを確認
2. git status / git diff --stat で変更ファイルを確認
3. docs/eval/seo-aio-checklist.md の該当項目を OK / NG / メモ で評価
4. スマホ表示の確認手順を提示
5. 確認 URL（http://localhost:3000/<path>）を提示

報告は短く:
- 変更したファイル一覧
- ビルド結果
- チェックリスト結果（表）
- 次のアクション

commit / push は明示指示があるときだけ実行。
```

---

## プロンプト追加・更新ルール

- 既存プロンプトを変更するときは、文末に「（更新：YYYY-MM-DD）」を付ける
- 新規プロンプトは末尾に追加
- 「動作確認済み」「未確認」のメモを付けてもよい
- このファイル自体が膨らんだら、カテゴリで分割：
  - `docs/prompts/seo-aio.md`
  - `docs/prompts/content.md`
  - `docs/prompts/privacy.md`
