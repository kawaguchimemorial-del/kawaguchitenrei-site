# 施行事例一覧ページ /case/ の SEO/AIO 強化 完了記録

## 作業名

施行事例一覧ページ `/case/` の SEO/AIO 強化

## 概要

- **実施日**: 2026-05-25
- **対象URL**: `/case/`
- **本番URL**: https://kawaguchitenrei.com/case/
- **実装コミット**: `9655addab96a4504ecaa24976c3b443cc1baccc4`（Improve case index page SEO and AIO）

## 本番確認結果

- **本番反映未確認**（push 直後に確認したが、Vercel デプロイがまだ完了しておらず旧 title「施行事例一覧 | 川口典礼」が返る状態）
- 通常 Vercel デプロイは push から 1〜2 分で完了
- サマリー作成時または翌朝の再確認推奨

### 期待される本番表示（push 後 Vercel デプロイ完了後）

- title: 「川口市の施行事例 | 川口典礼の家族葬・一日葬・直葬の実例 | 川口典礼」
- description: 「川口市で施行した葬儀事例をご紹介しています。家族葬・一日葬・直葬・火葬式の形式別に、参列人数・式場・内容・総額の例を掲載。事例の総額は内容・人数・式場・火葬場・料理・返礼品等により変わるため、事前のご相談で個別にお見積りをご案内します。」
- canonical: `https://kawaguchitenrei.com/case/`（変化なし）

## 実施内容

- **metaTitle 強化**: 「施行事例一覧 | 川口典礼」→ 「川口市の施行事例 | 川口典礼の家族葬・一日葬・直葬の実例 | 川口典礼」
- **metaDescription 強化**: 川口市キーワード直入、家族葬/一日葬/直葬/火葬式の形式別に整理、誤認注意文言を含めた新文言
- **結論ボックス追加**: `PageHero` 直後に「川口市の施行事例について。」見出し + intro + 5 ポイント（家族葬〜無宗教葬まで対応 / 総額は一例 / 川口メモリアルホール〜めぐりの森 / 個人特定情報を伏せて掲載 / 事前相談歓迎）
- **総額誤認防止の注意書き追加**: 事例グリッド直上に `border-brand/40` 枠で強調表示
- **FAQ 7 問追加**: 施行事例とは / 同じ金額になるか / 同じ内容でできるか / 含まれるもの / 別途必要 / 事例にない形式 / 事前相談
- **FAQPage JSON-LD 追加**: FAQ 7 問に対応
- **Related 8 件追加**: 家族葬 / 一日葬 / 直葬 / 火葬式 / 市民葬 / 無宗教葬 / 川口メモリアルホール / 川口市の葬儀・家族葬
- **末尾 CTA のスマホ表示化**: `hidden md:grid` → `grid`

### 変更ファイル

`app/case/page.tsx` の 1 ファイルのみ（+235 行 / -3 行）

## 維持したもの

- 既存 `BreadcrumbList` JSON-LD
- 既存 `ItemList` JSON-LD（11 件、url + name）
- 既存個別事例データ（`lib/cases.ts` 未変更）
- 既存総額表示（各事例カードの `c.total`）
- 既存画像（`public/images/cases/**` 未変更）
- `lib/cases.ts` / `lib/voices.ts` / `app/case/[slug]/page.tsx`
- 既存「事例の掲載について」セクション

## 追加しなかったもの

- Review 構造化データ
- aggregateRating 構造化データ
- ratingValue
- `/voice/` への新規リンク
- `/case/[slug]/` への固定 deep Related リンク（カードグリッドの動的リンクは既存維持）
- お客様の声引用
- 個別総額の引用・標準価格化
- 新規価格
- 既存価格の変更

## 安全確認

| 項目 | 結果 |
|---|---|
| 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定 / 同じ金額でできます / この金額でできます / 標準価格 / 家族葬なら必ず安い / 川口典礼が運営する川口市めぐりの森） | ✅ 0 件 |
| 価格変更 | ✅ なし |
| 個人情報変更 | ✅ なし |
| 画像変更 | ✅ なし |
| `public/images/tmp/tmp.txt` 接触 | ✅ なし（untracked のまま） |
| `lib/cases.ts` / `lib/voices.ts` / `app/case/[slug]/page.tsx` 変更 | ✅ なし |
| `app/api/**` / `app/contact/**` / `app/estimate/**` / Header / Footer / MobileBottomCTA / package.json / next.config.ts / funeral-system / `.env*` 変更 | ✅ なし |
| Review / aggregateRating / ratingValue 追加 | ✅ なし |
| `/voice/` リンク追加 | ✅ なし |
| `/case/[slug]/` 新規固定 Related リンク追加 | ✅ なし |

## build 結果

- ✅ `npm run build` 成功
- ✅ Compiled successfully in 2.9s
- ✅ TypeScript pass（Finished TypeScript in 3.6s）
- ✅ **131/131 static pages** 生成

## 関連コミット履歴

- `9655add` Improve case index page SEO and AIO（今回の本実装）
- 直前: `1765a15` Add overnight work summary
- 直前: `1837e92` Document voice privacy review analysis
- 直前: `e2d29f1` Document case index internal link improvement

## 次の候補

- 「施工事例 / 施行事例」表記ゆれ判断（別タスクで現状分析を実施）
- `/voice/` の Privacy Review 継続（画像目視 30 枚 / 本文 30 件）
- Search Console URL 検査（割り当て制限と相談）
- `/case/` 公開後の表示回数観測（2〜4 週間後、検索キーワード: 川口市 施行事例 / 川口 葬儀 事例 等）
- 本タスクの本番反映確認のフォローアップ

## 関連ドキュメント

- 第 1 段階の内部リンク追加: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- voice Privacy Review: `docs/seo-research/2026-05-voice-privacy-review-analysis.md`
- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
