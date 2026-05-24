# 家族葬ページ 川口市向けSEO/AIO強化 完了記録

## 作業名

家族葬ページの川口市向け SEO/AIO 強化

## 概要

- **実施日**: 2026-05-24
- **対象URL**: `/plan/family-funeral/`
- **実装コミット**: `1c94bca52ccdac82b81a6fbfe85d4163ce846d34`（Improve family funeral page for Kawaguchi）
- **本番確認URL**: https://kawaguchitenrei.com/plan/family-funeral/

## 実施内容

- **metaTitle 強化**: 「家族葬プラン | 川口典礼の葬儀プラン」→「**川口市の家族葬 | 川口メモリアルホールでの少人数葬 | 川口典礼**」
- **metaDescription 強化**: 「1 日 1 組貸切の川口メモリアルホール」「川口市めぐりの森での火葬」「事前相談会員価格 528,000 円(税込)〜」を含む川口市向け文言に
- **conclusionBox 追加**: 「川口市の家族葬について。」見出し + intro + 5 ポイント（メモリアルホール / 参列人数の幅 / 総額の考え方 / めぐりの森の運営主体 / 他プランとの比較）
- **FAQ 拡張**: 既存 3 問 → **11 問**（家族葬の定義 / 火葬場 / メモリアルホール / めぐりの森 / 一日葬との違い / 直葬との違い / 親族・一般参列の判断 / 別途費用）
- **relatedLinks 追加**: 8 件（ホール / めぐりの森 / 一日葬 / 直葬 / 火葬式 / 市民葬 / 無宗教葬 / 川口市エリア）

## 維持した項目（意図せざる変更なし）

- `plan.name`: **家族葬プラン**
- `featured`: **true**
- `price`: **528,000円（税込）〜**
- `pricing`: `member-regular`（member **528000** / regular **628000**）
- Service JSON-LD `Offer.price`: **528000** 維持
- `inclusions` / `flow` / `additional` / `compatibleHalls` / `image` / `people` / `days` / `forWhom` / `long` / `short` / `subtitle`: すべて未変更

## 追加しなかったもの

- Review schema
- aggregateRating
- ratingValue
- 施工事例
- お客様の声
- 個人情報（氏名・故人名・喪主名・顧客特定情報）
- 新規価格
- 競合比較・誹謗中傷

## 安全確認

- ✅ 禁止表現「最安」「必ず」「絶対」「追加費用なし」「総額確定」「家族葬なら必ず安い」: すべて **0 件**
- ✅ 「川口典礼が運営する川口市めぐりの森」等の運営誤認表現: **0 件**
- ✅ 川口市めぐりの森は「川口市営の火葬場」「運営は川口市」と明示（本番 HTML 内 13 件出現）
- ✅ 空き状況・利用可否の断定なし（「事前相談時にご案内」のトーン）
- ✅ 価格の新規追加なし（既存 528,000 円のみ使用）

## 本番確認結果（2026-05-24、デプロイ `1c94bca`）

### URL HTTP / canonical

| 項目 | 結果 |
|---|---|
| `/plan/family-funeral/` HTTP | ✅ **200 OK** |
| canonical | ✅ `https://kawaguchitenrei.com/plan/family-funeral/` |

### title / metaDescription 確認

- ✅ title: 「川口市の家族葬 | 川口メモリアルホールでの少人数葬 | 川口典礼」
- ✅ description: 期待文言を完全反映（528,000 円・川口メモリアルホール 1 日 1 組貸切・川口市めぐりの森を含む）

### 結論ボックス表示確認

| 要素 | 結果 |
|---|---|
| 結論ボックス見出し「川口市の家族葬について。」 | ✅ 2 件 |
| 「1 日 1 組貸切」言及 | ✅ 15 件出現 |
| 「川口市営の火葬場」（運営主体明示） | ✅ 13 件出現 |
| 「ご家族のみで進める形、親族・親しい方を含める形」（人数の幅） | ✅ 3 件 |

### FAQ 11 問

既存 3 問 + 追加 8 問 = 計 11 問、**全件表示確認** ✅

| # | 質問 | 表示 |
|---|---|---|
| 1 | 何人くらいまで対応できますか？ | ✅ |
| 2 | 宗教者は紹介してもらえますか？ | ✅ |
| 3 | 事前見学はできますか？ | ✅ |
| 4 | 家族葬とは何ですか？ | ✅ |
| 5 | 川口市で家族葬を行う場合、どこで火葬しますか？ | ✅ |
| 6 | 川口メモリアルホールで家族葬はできますか？ | ✅ |
| 7 | 川口市めぐりの森を利用できますか？ | ✅ |
| 8 | 家族葬と一日葬の違いは何ですか？ | ✅ |
| 9 | 家族葬と直葬の違いは何ですか？ | ✅ |
| 10 | 親族や一般の方を呼ぶか迷っています。 | ✅ |
| 11 | 別途必要になる費用はありますか？ | ✅ |

### Related リンク 8 件

すべて本番 HTML 内に検出 ✅

| href | 出現数 |
|---|---|
| `/hall/kawaguchi-memorial-hall/` | 3 件 |
| `/saijo/megurinomori/` | 3 件 |
| `/plan/oneday-funeral/` | 2 件 |
| `/plan/direct-funeral/` | 2 件 |
| `/plan/cremation/` | 1 件 |
| `/plan/kawaguchi-shimin/` | 2 件 |
| `/plan/non-religious-funeral/` | 1 件 |
| `/area/kawaguchi/` | 2 件 |

### JSON-LD 確認

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer` | 1 | **1** ✅（**price 528000** 維持） |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 11 | **11** ✅ |
| `Answer` | 11 | **11** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue`（文字列） | 0 | **0** ✅ |

## Search Console

- **今回は割り当て制限のため URL 検査未実施**
- 後日候補: `/plan/family-funeral/`
- 検査時は、過去のプラン強化（kawaguchi-shimin / non-religious-funeral / direct-funeral / cremation / oneday-funeral / family-funeral）とまとめて優先度を再整理予定

## 触っていないファイル

- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`（読まず・表示せず・編集せず）
- `app/api/**` / `app/contact/**` / `app/estimate/**`
- `components/plan/PlanDetailBody.tsx`（前タスクで `PlanConclusionBox` / `PlanRelated` 追加済み、変更不要）
- `app/plan/[slug]/page.tsx`（前タスクで分岐組み込み済み、変更不要）
- `app/plan/page.tsx`（プラン一覧構成は変えない）
- `app/sitemap.ts`
- 既存価格データ / 既存 inclusions / flow / additional / compatibleHalls / featured フラグ
- 他プラン（oneday / direct / cremation / hanaire / kawaguchi-shimin / non-religious-funeral）データ
- 施工事例・お客様の声
- `public/images/tmp/tmp.txt`

## 関連コミット履歴

- `1c94bca` Improve family funeral page for Kawaguchi（今回の本実装）
- 直前: `10091a5` Document one day funeral SEO improvement
- 直前: `bd2f0cf` Improve one day funeral page for Kawaguchi
- 直前: `ff991f9` Document direct funeral and cremation SEO improvement

## 次の候補

- **施工事例・お客様の声との内部リンク強化**（Privacy Review 後）
- Search Console で対象キーワード（「川口 家族葬」「川口市 家族葬」「川口 家族葬 費用」「川口 小規模葬」「川口メモリアルホール 家族葬」）の表示回数・平均掲載順位を継続観測
- 2〜4 週間後に Search Console「検索パフォーマンス」で順位確認
- 既存ページ（エリア / 斎場 / ホール）から各プランへの内部リンクをより丁寧に整理する別タスクを検討

## ロードマップ進捗

`docs/seo-research/2026-05-target-keyword-competitor-analysis.md` §11 のロードマップ進捗:

1. ✅ 市民葬ページの SEO/AIO 再調整（2026-05-24 完了）
2. ✅ 無宗教葬ページ新設（2026-05-24 完了）
3. ✅ 直葬・火葬式ページの川口市向け強化（2026-05-24 完了）
4. ✅ 一日葬ページの川口市向け強化（2026-05-24 完了）
5. ✅ **家族葬ページの川口市向け強化**（本タスク完了）
6. 施工事例・お客様の声との内部リンク強化
7. Search Console で対象キーワードの表示回数を継続観測

**プラン主要 6 ページ**（家族葬 / 一日葬 / 直葬 / 火葬式 / 市民葬 / 無宗教葬）の SEO/AIO 強化がすべて完了しました。

## 関連ドキュメント

- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- 直前完了記録: `docs/eval/records/2026-05-oneday-funeral-seo-improvement.md`
- 各プラン強化記録:
  - `docs/eval/records/2026-05-citizen-funeral-seo-improvement.md`
  - `docs/eval/records/2026-05-non-religious-funeral-page.md`
  - `docs/eval/records/2026-05-direct-and-cremation-seo-improvement.md`
  - `docs/eval/records/2026-05-oneday-funeral-seo-improvement.md`
- AI ワークフロー: `docs/ai-workflows/skill-backlog.md`
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`（自動 push 範囲・価格未推測・めぐりの森の運営主体明示ルールに準拠）
