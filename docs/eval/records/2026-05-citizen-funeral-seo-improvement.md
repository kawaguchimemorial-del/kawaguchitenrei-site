# 川口市民葬ページ SEO/AIO再調整 完了記録

## 概要

- **実施日**: 2026-05-24
- **対象コミット**: `c629724 Improve Kawaguchi citizen funeral page SEO`
- **対象URL**: `/plan/kawaguchi-shimin/`

## 目的

- 「川口 市民葬」「川口市 市民葬」検索への対応強化
- 市民葬ページの title / H1 / AIO 回答ブロックを改善
- 川口市公式情報との整合を明示
- FAQ と Related 導線を強化
- 問い合わせ導線を改善

## 変更内容

- **H1 / name 変更**: 「市民葬プラン」→ 「川口市民葬プラン」
- **subtitle 変更**: 「川口市民の方向け」→ 「川口市民の方が利用できる、川口市の葬祭事業」
- **meta title 変更**: 「川口市民葬プラン | 川口市の葬祭事業 | 川口典礼」
- **meta description 変更**: 「川口市民葬(葬祭事業)は、川口市民の方が川口市めぐりの森で火葬を行う場合に利用できる制度です。仕様1・仕様2の違いや別途必要になる費用、申請手続きまで川口典礼がご相談を承ります。」
- **結論ボックス追加**（冒頭、AIO 向け）
- **出典リンク追加**: 川口市「葬祭事業」(2026-04-01 更新確認)
- **FAQ 5 問追加**（既存 5 問 → 計 10 問）
- **中間 CTA 追加**（OurSupport と FAQ の間）
- **Related リンク 7 件追加**（ページ末尾）
- **Service JSON-LD の offers 配列化**: 仕様1（231,000円）+ 仕様2（143,000円）の 2 つを掲載
- `Plan` 型に `metaTitle?: string` を追加（横断的影響）

## 既存価格・条件の取り扱い

既存 `kawaguchi-shimin` の価格・補助額・利用条件・含まれる項目・別途費用項目は、**川口市公式（2026-04-01 更新）と完全一致**していることを WebFetch で確認済み。**数値は一切変更していない**。

## 本番確認結果（2026-05-24）

### URL HTTP / リダイレクト / canonical

| 項目 | 結果 |
|---|---|
| `/plan/kawaguchi-shimin/`（trailingSlash あり） | ✅ 200 OK |
| `/plan/kawaguchi-shimin`（trailingSlash なし） | ✅ 308 → `/plan/kawaguchi-shimin/` |
| canonical | ✅ `https://kawaguchitenrei.com/plan/kawaguchi-shimin/` |

### title / meta description

| 項目 | 本番 HTML 確認結果 |
|---|---|
| `<title>` | ✅ 「川口市民葬プラン | 川口市の葬祭事業 | 川口典礼」 |
| `<meta name="description">` | ✅ 「川口市民葬(葬祭事業)は、川口市民の方が川口市めぐりの森で火葬を行う場合に利用できる制度です。仕様1・仕様2の違いや別途必要になる費用、申請手続きまで川口典礼がご相談を承ります。」 |

### 表示確認（出現回数）

| 要素 | 期待 | 実測 |
|---|---|---|
| 「川口市民葬プラン」（表示名・H1） | 表示 | **25 件** ✅ |
| 「川口市民の方が利用できる、川口市の葬祭事業」（subtitle） | 表示 | **2 件** ✅ |
| 「川口市民葬(葬祭事業)とは。」（結論ボックス見出し） | 表示 | **2 件** ✅ |
| 「市が40,000円を葬祭業者へ補助」（仕様1） | 表示 | **8 件** ✅ |
| 「市が20,000円を葬祭業者へ補助」（仕様2） | 表示 | **8 件** ✅ |
| 「川口市民葬の利用条件や費用が」（中間 CTA 見出し） | 表示 | **2 件** ✅ |
| 「制度情報の確認元」（出典カード見出し） | 表示 | **2 件** ✅ |
| 川口市公式 URL | 表示 | **4 件**（結論ボックス + 出典カード + 関連箇所） ✅ |

### FAQ 10 問表示確認

既存 5 問:
1. ✅ 市民葬は誰でも利用できますか？
2. ✅ 仕様1と仕様2の違いは何ですか？
3. ✅ 231,000円以外に費用はかかりますか？
4. ✅ 市から現金がもらえる制度ですか？
5. ✅ 川口典礼で市民葬の相談はできますか？

追加 5 問:
6. ✅ 川口市民葬で家族葬や一日葬の形式は選べますか？
7. ✅ 川口メモリアルホールで川口市民葬を行えますか？
8. ✅ 市民葬と直葬・一日葬・家族葬はどう違いますか？
9. ✅ 申請手続きは自分で市役所に行く必要がありますか？
10. ✅ 事前相談だけでもできますか？

### Related リンク 7 件

| href | 出現数 |
|---|---|
| `/saijo/megurinomori/` | ✅ 2 件 |
| `/hall/kawaguchi-memorial-hall/` | ✅ 2 件 |
| `/plan/direct-funeral/` | ✅ 2 件 |
| `/plan/oneday-funeral/` | ✅ 2 件 |
| `/plan/family-funeral/` | ✅ 2 件 |
| `/area/kawaguchi/` | ✅ 2 件 |
| `/area/araijuku/` | ✅ 1 件 |

すべての Related 先が本番 HTML 内に存在することを確認。

### JSON-LD 構造化データ

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer`（offers 配列内） | 2（仕様1・仕様2） | **2** ✅ |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 10 | **10** ✅ |
| `Answer` | 10 | **10** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue`（文字列） | 0 | **0** ✅ |

### Offer の内容

- `"price":231000` ✅（仕様1）
- `"price":143000` ✅（仕様2）
- `"name":"川口市民葬プラン 通夜・告別式等を行う方"` ✅
- `"name":"川口市民葬プラン 火葬のみを行う方"` ✅

## 安全確認結果

| 項目 | 結果 |
|---|---|
| 「最安」 | ✅ 0 件 |
| 「必ず」 | ✅ 0 件 |
| 「絶対」 | ✅ 0 件 |
| 「追加費用なし」 | ✅ 0 件 |
| 「総額確定」 | ✅ 0 件 |
| 公式情報と異なる条件 | ✅ なし（2026-04-01 公式と完全一致） |
| 価格の新規追加 | ✅ なし（既存値のみ） |
| 施工事例・口コミ・個人情報 | ✅ なし（指示通り別タスク） |
| 問い合わせフォーム / Webhook / GAS / `app/api/**` 変更 | ✅ なし |
| Review / ratingValue 追加 | ✅ なし |

## 触っていないファイル

- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`（読まず・表示せず・編集せず）
- 問い合わせフォーム / Webhook 関連 (`components/**/contact*`、`app/api/**`、`app/contact/`、`app/estimate/`、GAS 連携)
- 施工事例（`app/case/`）/ お客様の声（`app/voice/`）
- `public/images/tmp/tmp.txt`（untracked のまま、コミット対象外）

## 関連コミット履歴

- `c629724` Improve Kawaguchi citizen funeral page SEO（今回の本実装）
- 直前: `599cc63` Add target keyword competitor analysis
- 直前: `c8b6e67` Document saijo CTA and related link improvements
- 直前: `b5ac6b6` Improve saijo page CTAs and related links

## 次アクション

- **Search Console で `/plan/kawaguchi-shimin/` の URL 検査・インデックス登録リクエストを検討**（割り当て制限と相談しながら）
- **2〜4 週間後**に「川口 市民葬」「川口市 市民葬」の表示回数・平均掲載順位を Search Console「検索パフォーマンス」で確認
- 公式制度情報（2026-04-01 更新）が改定された場合、`citizenFuneralInfo` データを更新（次の更新日を出典カードに反映）
- **次施策**: 無宗教葬ページ新設（`docs/seo-research/2026-05-target-keyword-competitor-analysis.md` § 7 §11 参照、評価 4.0/10 のため早期効果が見込める）

## 関連ドキュメント

- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- AI ワークフロー: `docs/ai-workflows/skill-backlog.md`（completion-record / structured-data-check / production-verification）
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`（価格・公式整合・自動 push 範囲に準拠）
