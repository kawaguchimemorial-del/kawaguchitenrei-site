# 一日葬ページ 川口市向け強化 完了記録

## 概要

- **実施日**: 2026-05-24
- **対象コミット**: `bd2f0cf Improve one day funeral page for Kawaguchi`
- **対象URL**:
  - `/plan/oneday-funeral/`

## 目的

- 「川口 一日葬」「川口市 一日葬」検索への対応強化
- 通夜を行わない葬儀の検索意図に対応
- 川口メモリアルホールでのお別れから、川口市めぐりの森での火葬までの流れを明確化
- 一日葬と直葬・家族葬との違いを説明
- 関連プラン・斎場・エリアへの内部リンクを強化

## 変更内容

- `metaTitle` 新規追加 / `metaDescription` 川口市向けに更新
- 結論ボックス追加（前タスクで構築済みの `PlanConclusionBox` を利用、データのみ追加）
- FAQ 拡張: 既存 3 + 追加 8 = **11 問**
- Related リンク追加: 8 件（前タスクで構築済みの `PlanRelated` を利用、データのみ追加）
- JSON-LD `FAQPage` は plan.faqs に追加するだけで自動的に 11 問へ拡張
- 既存 Offer（price 396000）維持
- 既存 inclusions / flow / additional / compatibleHalls / simpleAlternative / plan.name は変更なし
- 変更ファイルは `lib/plans.ts` の **1 ファイルのみ**

## 本番確認結果（2026-05-24、デプロイ `bd2f0cf`）

### URL HTTP / リダイレクト / canonical

| 項目 | 結果 |
|---|---|
| `/plan/oneday-funeral/` HTTP | ✅ 200 OK |
| `/plan/oneday-funeral` リダイレクト | ✅ 308 → `/plan/oneday-funeral/` |
| canonical | ✅ `https://kawaguchitenrei.com/plan/oneday-funeral/` 一致 |

### title / metaDescription

- title: ✅ 「川口市の一日葬 | 通夜を行わない葬儀のご相談 | 川口典礼」
- metaDescription: ✅ 「川口市で一日葬をご検討の方へ。川口典礼では、通夜を行わず告別式と火葬を1日で執り行う形のご相談を承ります。川口メモリアルホールでのお別れから、川口市めぐりの森での火葬まで一貫してサポート。事前相談会員価格396,000円(税込)〜。24時間365日対応。」

### 結論ボックス表示確認

| 要素 | 結果 |
|---|---|
| 結論ボックス見出し「川口市の一日葬について。」 | ✅ 2 件出現 |
| めぐりの森の運営主体表現「川口市営の火葬場」 | ✅ 13 件出現（本文・FAQ・Related で多数言及） |
| 「通夜を行わない分、参列者の負担を抑えやすい」 | ✅ 3 件 |
| 「事前のお見積りで概算」 | ✅ 3 件 |
| 「川口典礼が運営する川口市めぐりの森」 | ❌ 0 件 ✅（運営誤認なし） |
| 「当社が運営する川口市めぐりの森」 | ❌ 0 件 ✅ |

### FAQ 11 問表示確認

既存 3 問:
| # | 質問 | 表示 |
|---|---|---|
| 1 | 家族葬との違いは何ですか？ | ✅ |
| 2 | 宗教者のお勤めはお願いできますか？ | ✅ |
| 3 | 費用はどれくらい違いますか？ | ✅ |

追加 8 問:
| # | 質問 | 表示 |
|---|---|---|
| 4 | 一日葬とは何ですか？ | ✅ |
| 5 | 一日葬と直葬の違いは何ですか？ | ✅ |
| 6 | 川口市で一日葬を行う場合、どこで火葬しますか？ | ✅ |
| 7 | 川口メモリアルホールで一日葬はできますか？ | ✅ |
| 8 | 川口市めぐりの森を利用できますか？ | ✅ |
| 9 | 親族に一日葬を説明する時の注意点はありますか？ | ✅ |
| 10 | 別途必要になる費用はありますか？ | ✅ |
| 11 | 事前相談だけでもできますか？ | ✅ |

### Related リンク 8 件

すべて本番 HTML 内に検出 ✅
- `/hall/kawaguchi-memorial-hall/`（3 件）
- `/saijo/megurinomori/`（3 件）
- `/plan/family-funeral/`（2 件）
- `/plan/direct-funeral/`（2 件）
- `/plan/cremation/`（1 件）
- `/plan/kawaguchi-shimin/`（2 件）
- `/plan/non-religious-funeral/`（1 件）
- `/area/kawaguchi/`（2 件）

### JSON-LD

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer` | 1 | **1** ✅（price 396000） |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 11 | **11** ✅ |
| `Answer` | 11 | **11** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue` | 0 | **0** ✅ |

## 安全確認結果

| 項目 | 結果 |
|---|---|
| 「最安」 | ✅ 0 件 |
| 「必ず」 | ✅ 0 件 |
| 「絶対」 | ✅ 0 件 |
| 「追加費用なし」 | ✅ 0 件 |
| 「総額確定」 | ✅ 0 件 |
| 「一日葬なら必ず安い」 | ✅ 0 件 |
| 「川口典礼が運営する川口市めぐりの森」 | ✅ 0 件 |
| 川口市めぐりの森を「川口市営の火葬場」「運営は川口市」と明示 | ✅ 本文・FAQ で繰り返し明示 |
| 価格の新規追加 | ✅ なし（既存 396,000 円のみ） |
| 既存価格の変更 | ✅ なし |
| 個人名・故人名・喪主名・顧客特定情報 | ✅ なし |
| 競合比較・誹謗中傷 | ✅ なし |
| 空き状況・利用可否の断定 | ✅ なし（「空き状況・利用条件は時期により異なるため、事前相談時にご案内」のトーン） |
| 「一日葬なら必ず安い」等の誤認表現 | ✅ なし（「家族葬よりも費用を抑えやすい傾向」「向き不向きがあります」と慎重に表現） |
| Review / ratingValue 追加 | ✅ なし |
| フォーム / Webhook / `app/api/**` 変更 | ✅ なし |

## 触っていないファイル

- `components/plan/PlanDetailBody.tsx`（前タスクで `PlanConclusionBox` / `PlanRelated` 追加済み）
- `app/plan/[slug]/page.tsx`（前タスクで通常プラン分岐に組み込み済み）
- `app/plan/page.tsx`（プラン一覧構成は変えない）
- `app/sitemap.ts`
- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`（読まず・表示せず・編集せず）
- 問い合わせフォーム / Webhook / GAS / `app/api/**` / `app/contact/**` / `app/estimate/**`
- 既存 oneday-funeral の **price / pricing / image / inclusions / flow / additional / compatibleHalls**
- 他プラン（family / direct / cremation / hanaire / kawaguchi-shimin / non-religious-funeral）
- 施工事例・お客様の声
- `public/images/tmp/tmp.txt`

## 関連コミット履歴

- `bd2f0cf` Improve one day funeral page for Kawaguchi（今回の本実装）
- 直前: `ff991f9` Document direct funeral and cremation SEO improvement
- 直前: `74be7db` Improve direct funeral and cremation pages for Kawaguchi
- 直前: `0e3e667` Document non religious funeral page launch

## 次アクション

- **Search Console で `/plan/oneday-funeral/` の URL 検査・インデックス登録リクエスト**（割り当て制限と相談しながら）
- **2〜4 週間後**に「川口 一日葬」「川口市 一日葬」の表示回数・平均掲載順位を Search Console「検索パフォーマンス」で確認
- **次施策**: ロードマップ §11 に従い「家族葬ページの川口市向け強化」へ
- その後、施工事例・お客様の声との内部リンク強化

## 関連ドキュメント

- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- 直前完了記録: `docs/eval/records/2026-05-direct-and-cremation-seo-improvement.md`
- AI ワークフロー: `docs/ai-workflows/skill-backlog.md`
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`（自動 push 範囲・価格未推測・めぐりの森の運営主体明示ルールに準拠）
