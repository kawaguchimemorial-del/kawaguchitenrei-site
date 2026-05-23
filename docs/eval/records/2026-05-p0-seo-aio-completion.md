# P0 改善 完了サマリー（2026-05）

`docs/eval/seo-aio-checklist.md` の運用ルールに沿った、P0 改善フェーズ一区切りの記録。

---

## 1. 概要

| 項目 | 内容 |
|---|---|
| 対象サイト | kawaguchitenrei.com（川口典礼 公式サイト） |
| 対象期間 | P0 改善フェーズ（2026 年 5 月） |
| 主な目的 | SEO / AIO 基盤の強化、問い合わせ導線の改善、構造化データ整備、価格・費用説明の明確化、めぐりの森導線の誤認防止、URL 正規化、今後の AI 作業ルール整備 |
| 実装方針 | サイト本文・デザインの大幅変更を避け、既存トーン（落ち着き・上品・余白重視）を維持。最小変更で SEO/AIO 効果を最大化 |
| ガイドライン | `CLAUDE.md` / `docs/01-seo-aio-policy.md` / `docs/04-privacy-review.md` / `docs/05-content-guidelines.md` に準拠 |

---

## 2. 実施済み項目一覧

| 区分 | 実施内容 | 対象ファイル | コミット | 目的 | 状態 |
|---|---|---|---|---|---|
| 基盤 | AI 作業ルール / docs 整備（CLAUDE.md §10〜18 追加、`docs/` 8 ファイル新設） | `CLAUDE.md` / `docs/**` | `27109c2` | 今後の改修を一貫して安全に進めるための共通ルール整備 | ✅ 完了 |
| 基盤 | `.claude/settings.local.json` を gitignore | `.gitignore` | `6c15e3b` | Claude Code per-user 設定を共有しない | ✅ 完了 |
| 構造化データ | `/area/kawaguchi/` BreadcrumbList + FAQPage + FuneralHome 追加 | `app/area/kawaguchi/page.tsx` | `f0bf205` | araijuku / hatogaya と同等の JSON-LD で一貫性確保 | ✅ 完了 |
| 構造化データ | `/plan/`・`/plan/[slug]/` BreadcrumbList + ItemList + Service + Offer + FAQPage | `app/plan/page.tsx` / `app/plan/[slug]/page.tsx` | `24f51e7` | プラン正本データに基づく Service / Offer を全プランに | ✅ 完了 |
| コンテンツ | プラン詳細「費用の考え方」セクション追加（PlanCostGuide） | `components/plan/PlanDetailBody.tsx` / `app/plan/[slug]/page.tsx` | `22571cf` | 結論ボックス + 含む/別途比較 + 確認優先順 + CTA。火葬料・式場使用料の数値レンジは未追加（正本データ整備が必要） | ✅ 完了 |
| FV / UI | トップ FV 改善（スマホ FV に「→ プラン・費用の目安を見る」テキストリンク追加、h1 句点統一、trustPoints スマホ 3 / PC 4 に整合） | `components/home/Hero.tsx` | `b7e9c6c` | 比較検討ユーザー向け第 3 動線確保 + スマホ/PC 整合 | ✅ 完了 |
| コンテンツ | ホーム MeguriSection に「川口市営の火葬場 / 式場併設なし / 川口典礼の運営施設ではない」結論ボックス追加 | `components/home/MeguriSection.tsx` | `8f363f5` | めぐりの森の運営誤認防止 + 葬儀社の役割明示 | ✅ 完了 |
| 構造化データ | トップページ FAQPage JSON-LD 追加（`getHomeFaqs()` の 6 件） | `app/page.tsx` | `a91cf09` | ホーム FAQ の AIO 抽出向上、表示 FAQ と完全一致 | ✅ 完了 |
| 運用 | P0 完了状況をロードマップに記録 | `docs/03-improvement-roadmap.md` | `081c7b5` | 完了済みタスクの誤認防止 | ✅ 完了 |
| URL 正規化 | trailingSlash / canonical / sitemap 整合（`trailingSlash: true` + 5 件の destinations にスラッシュ付与） | `next.config.ts` | `d509211` | canonical = 実 URL の一致、本番リダイレクト解消 | ✅ 完了 |
| 構造化データ | `/case/`・`/voice/` JSON-LD 追加（BreadcrumbList + ItemList + Article） | `app/case/page.tsx` / `app/case/[slug]/page.tsx` / `app/voice/page.tsx` / `app/voice/[slug]/page.tsx` | `e03df99` | 施工事例・口コミの AIO 強化。Review schema 未採用、surveyImage 未使用の安全設計 | ✅ 完了 |
| 運用 | case / voice 構造化データ完了をロードマップに反映 | `docs/03-improvement-roadmap.md` | `d59d315` | 残タスクの整理 | ✅ 完了 |

合計 **12 コミット**、`origin/main` に全 push 済み。

---

## 3. SEO / AIO 上の改善点

### トップページ `/`

- ✅ `FuneralHome` JSON-LD 維持（既存）
- ✅ `FAQPage` JSON-LD 新規追加（`getHomeFaqs()` の 6 件、表示 FAQ と完全一致）
- ✅ FV に「→ プラン・費用の目安を見る」テキストリンク追加（スマホ第 3 動線）
- ✅ FV h1「家族葬・直葬をお考えの方へ。」句点統一
- ✅ trustPoints 整合（スマホ 3 個 / PC 4 個、「川口市めぐりの森まで車で約5分」「駐車場70台の自社式場」「直葬〜一般葬まで対応」+ PC のみ「創業20年・年間約260件」）
- ✅ MeguriSection に結論ボックス（火葬場・式場併設なし・運営施設ではない）
- ✅ BreadcrumbList は意図的に非設置（Google 推奨「トップは Breadcrumb 不要」に従う）

### プラン `/plan/`・`/plan/[slug]/`

- ✅ `/plan/` に `BreadcrumbList` + `ItemList`（表示中 5 プランすべて、各 ListItem に Service + Offer + FuneralHome 埋め込み）
- ✅ `/plan/[slug]/` に `BreadcrumbList` + `Service` + `Offer`（cremation 除く）+ `FAQPage`
- ✅ 「費用の考え方（PlanCostGuide）」セクション追加（5 プラン、cremation は数値示唆なし版、kawaguchi-shimin は既存 `PlanCitizenFuneralBody` 維持）
- ✅ Offer description に「別途、火葬料・式場使用料・宗教者へのお礼などが必要になる場合があります」明記
- ✅ 価格は `lib/plans.ts` のプラン正本データのみ使用（新規数値は推測で追加せず）

### エリア `/area/kawaguchi/`

- ✅ `BreadcrumbList` + `FAQPage` + `FuneralHome`（araijuku / hatogaya と同等の構成）
- ✅ `areaServed` は `City: 埼玉県川口市`（araijuku/hatogaya の `AdministrativeArea` と区別）
- ✅ 可視パンくずと JSON-LD のラベルが完全一致（「川口市」）

### 斎場・めぐりの森

- ✅ ホーム MeguriSection に結論ボックス：「川口市営の火葬場」「式場併設なし」「川口典礼の運営施設ではない」「相談・手配に対応」を明記
- ✅ `/saijo/megurinomori/` の既存 JSON-LD（Place + BreadcrumbList + FAQPage）と整合
- ✅ 既存 `SaijoImportantNotice` / `SaijoFlow`（4 ステップ）/ `SaijoCremationFees` / `SaijoFaq` は維持

### 施工事例 `/case/`・`/case/[slug]/`

- ✅ `/case/` に `BreadcrumbList` + `ItemList`（11 件、各 ListItem は URL + name のみ）
- ✅ `/case/[slug]/` に `BreadcrumbList`（3 階層）+ `Article`（author / publisher = `Organization` 川口典礼）
- ✅ Article.image は `case.photo` がある場合のみ絶対 URL で出力
- ✅ `articleSection: "施行事例"`、`about: case.format`
- ✅ 個人情報（故人名・喪主名）一切なし

### 口コミ `/voice/`・`/voice/[slug]/`

- ✅ `/voice/` に `BreadcrumbList` + `ItemList`（30 件、URL + name のみ）
- ✅ `/voice/[slug]/` に `BreadcrumbList`（3 階層）+ `Article`
- ✅ **Review schema は意図的に非採用**（Google の self-promotional review フィルタ回避 + 個人情報配慮）
- ✅ `ratingValue` 未出力
- ✅ `surveyImage`（手書きアンケート画像）を Article の `image` プロパティに含めない
- ✅ author は `Organization` 川口典礼（個人名なし）
- ✅ `articleSection: "お客様の声"`、`about: "葬儀のお客様アンケート"`

### URL 正規化

- ✅ `next.config.ts` に `trailingSlash: true` 追加
- ✅ `/path/` URL が直接 200 で返る（修正前は 308 → `/path`）
- ✅ `/path`（無スラッシュ）→ 308 → `/path/` の逆向き正規化
- ✅ canonical / sitemap / 内部リンク 76 件 / JSON-LD 内 URL がすべて末尾スラッシュ付きで整合
- ✅ `redirects()` の destinations 5 件にも末尾スラッシュを追加（二段リダイレクト最適化）

---

## 4. 本番確認結果

| 確認項目 | 結果 |
|---|---|
| Vercel 本番反映確認済み（直近 push 含めて全 12 コミット） | ✅ |
| 主要 URL（`/`、`/plan/`、`/plan/[slug]/`、`/area/kawaguchi/`、`/saijo/megurinomori/`、`/hall/kawaguchi-memorial-hall/`、`/case/`、`/case/[slug]/`、`/voice/`、`/voice/[slug]/`）が HTTP 200 で取得可能 | ✅ |
| canonical と実 URL の一致（trailingSlash 整合後） | ✅ |
| sitemap URL（25 件以上）が直接 200 で返る | ✅ |
| `/case/`・`/voice/` JSON-LD 出力を本番 HTML で検証 | ✅ |
| Review schema / ratingValue / surveyImage が JSON-LD に出ていないことを本番 HTML で確認 | ✅ |
| 308 リダイレクトチェーン：すべて 5 hop 以内で最終 URL に到達 | ✅ |
| Google Search Console での sitemap 再送信・URL Inspection | ⏳ 未実施（推奨フォローアップ） |
| Google Rich Results Test | ⏳ 未実施（推奨フォローアップ） |
| `git status` clean、ローカル = `origin/main` | ✅ |

---

## 5. 安全上の配慮

| 配慮事項 | 状態 |
|---|---|
| `.env*` ファイル | ✅ 一切読まず・触らず・コミットせず（P0 全期間） |
| `FORM_WEBHOOK_SECRET` / Webhook URL | ✅ コードにもログにも一切出力していない |
| フォーム処理（`/contact/`・`/estimate/` actions / Google Apps Script Webhook） | ✅ P0 期間中ほぼ未変更（GA4 lead イベントの一部修正のみ、Privacy Review チェック通過済） |
| 個人情報（故人名・喪主名・実名・電話・メール・住所町名以下） | ✅ JSON-LD に一切含めず |
| voice の Review schema / ratingValue / surveyImage | ✅ JSON-LD に出力せず（設計判断） |
| 価格の新規数値・火葬料・式場使用料・宗教者へのお礼の具体額 | ✅ 推測で追加せず。`lib/plans.ts` の正本データのみ使用 |
| 市民葬・cremation の特殊扱い | ✅ kawaguchi-shimin は `PlanCitizenFuneralBody` で専用説明維持、cremation は `pricing` なし版を Offer 出力対象外で扱う |
| 寺院会館・民営式場の所在地 | ✅ 推測で書かず、確認済データのみ掲載 |
| ペット同伴の文言 | ✅ 個室面会室の文脈に留め、ペット葬儀（`/pet/`）への導線は意図的に入れない |
| `funeral-system/` 配下 | ✅ 一切変更せず |
| `package.json` | ✅ 一切変更せず |
| `components/layout/{Header,Footer,MobileBottomCTA}.tsx` | ✅ 一切変更せず（CLAUDE.md §5 遵守） |

---

## 6. 残タスク

| 優先度 | タスク | カテゴリ | メモ |
|---|---|---|---|
| 高 | Google Rich Results Test での検証 | 検証 | 主要 6〜10 URL を投入、警告ゼロを確認 |
| 高 | Search Console URL Inspection の継続確認 | 検証 | 「公開 URL をテスト」で構造化データの認識を確認、sitemap.xml を再送信 |
| 中 | `docs/eval/records/` の継続運用 | 運用 | 本ファイルをサンプルとして、今後の改修ごとに記録を蓄積 |
| 中 | P1 エリアページ追加（西川口・東川口・川口元郷・南鳩ヶ谷・戸塚安行など） | コンテンツ | `docs/03-improvement-roadmap.md` P1-4 参照。slug 11 候補あり |
| 中 | 施工事例の表形式強化（`/case/`・`/case/[slug]/`） | コンテンツ | P1-5、「人数・日数・形式・斎場・概算費用」の一覧表 |
| 中 | 口コミ分類・強化（`/voice/`） | コンテンツ | P1-6、形式・価格帯・印象でフィルタ可能化 |
| 低 | `lib/company.ts` の `getLocalBusinessJsonLd()` への集約 + `@id` サイト全体統一 | リファクタ | 既存ヘルパー未使用、P1 後半 / P2 で一括対応推奨 |
| 低 | `MobileBottomCTA` の `#consultation` 動作確認・必要なら `/contact/` 直リンク化 | UI | `CLAUDE.md` §5 で明示指示なしでは変更しない対象。別チャットで合意取得後 |
| 低 | Header nav の `/#hall` → `/hall/kawaguchi-memorial-hall/` 直リンク化検討 | UI | 同上 |

---

## 7. 次にやるべきこと（推奨順）

1. **Google Rich Results Test**：今回追加した構造化データ（Article / ItemList / Service / Offer / FAQPage / BreadcrumbList / FuneralHome / Place）の妥当性を主要 URL で検証
2. **Search Console での sitemap 再送信 + URL Inspection**：trailingSlash 対応後の再クロールを促進、構造化データ認識を確認
3. **P1 エリアページ追加の設計確認**：西川口・東川口・川口元郷・南鳩ヶ谷・戸塚安行などの優先順位決め
4. **P1 施工事例・口コミの強化**：表形式・分類フィルタの実装設計
5. **`Header` / `MobileBottomCTA` の改善は別途合意後に対応**：`CLAUDE.md` §5 遵守、設計監査と承認を経てから着手
6. **`@id` 統一は P1 後半または P2 で一括対応**：`lib/company.ts` の `getLocalBusinessJsonLd()` 集約と合わせて広範囲リファクタとして実施

---

## 8. 自己評価（10 点満点）

| 観点 | 評価 | コメント |
|---|---|---|
| SEO 基盤 | 9 / 10 | title / description / h1 / canonical / sitemap / 内部リンク / 構造化データ整備が一通り完了。URL 正規化も解消。残課題は `@id` 統一と `getLocalBusinessJsonLd()` 集約のみ |
| AIO 基盤 | 9 / 10 | 主要 9 種類の構造化データ（FuneralHome / BreadcrumbList / FAQPage / ItemList / Service / Offer / Article / Place / Organization）を網羅。AI 検索で抽出されやすい結論ボックス + 表 + FAQ のページ構造に整合 |
| CV 導線 | 8 / 10 | FV 第 3 動線、めぐりの森結論、費用の考え方セクションを追加。スマホ FV の縦長化は最小限。`MobileBottomCTA` の `#consultation` 動作は別途合意後の改善余地あり |
| 安全性 | 10 / 10 | `.env*` / Webhook / 個人情報 / 故人名 / Review schema / ratingValue / surveyImage の取り扱いを徹底配慮。推測値・断定表現の混入なし。`docs/04-privacy-review.md` 完全遵守 |
| 保守性 | 9 / 10 | 全ての作業を 12 コミットに分割、各コミット 1 タスク・小規模差分・明確なメッセージ。`docs/03-improvement-roadmap.md` に完了状態を反映済。本サマリーで引き継ぎ可能 |
| 残課題 | 7 / 10 | Google Rich Results Test / Search Console の検証、`@id` 統一、UI 系（Header / MobileBottomCTA）の改善、P1 コンテンツ拡張が残る。緊急性は低い |
| **総合** | **8.7 / 10** | P0 として十分に基盤整備が完了。次フェーズ（P1 コンテンツ拡張 + 検証フォローアップ）への移行準備が整った |

---

## 9. git status

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

本サマリー作成時点（P0 完了直後）の状態。

---

## 関連ドキュメント

- `CLAUDE.md` — Claude Code 常時ルール
- `docs/00-project-policy.md` — プロジェクト方針
- `docs/01-seo-aio-policy.md` — SEO / AIO 方針
- `docs/02-competitor-analysis-summary.md` — 競合分析要約
- `docs/03-improvement-roadmap.md` — 改修ロードマップ（P0 完了状況反映済）
- `docs/04-privacy-review.md` — Privacy Review
- `docs/05-content-guidelines.md` — コンテンツガイドライン
- `docs/prompts/claude-code-prompts.md` — 作業用プロンプト集
- `docs/eval/seo-aio-checklist.md` — 評価チェックリスト
