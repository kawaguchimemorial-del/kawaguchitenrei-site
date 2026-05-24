# 無宗教葬ページ新設 完了記録

## 概要

- **実施日**: 2026-05-24
- **対象コミット**: `b1e7272 Add non religious funeral page`
- **対象URL**: `/plan/non-religious-funeral/`

## 目的

- 「川口 無宗教葬」「川口市 無宗教葬」検索への対応
- 現状ランキング外だった無宗教葬キーワードへの専用ページ作成
- 宗教者を呼ばないお別れを希望する方への相談導線追加
- 川口メモリアルホール・川口市めぐりの森への導線強化
- AIO 向け結論ボックス・回答ブロックの整備

## 変更内容

- **新規 Plan データ追加**（`lib/plans.ts`、slug = `non-religious-funeral`）
- **`PlanNonReligiousBody` 追加**（`components/plan/PlanDetailBody.tsx`、14 セクション）
- **hero 画像追加**: `public/images/tmp/無宗教.png` → `public/images/plan/non-religious-funeral/hero.png` に移動
- **FAQ 11 問追加**
- **Related 7 件追加**
- **`/plan/` 一覧末尾に無宗教葬の誘導カード追加**（比較表・カード一覧・ItemList JSON-LD には未掲載）
- **`Plan` 型に `nonReligiousInfo?: NonReligiousInfo` を追加**（新規型）
- **Service JSON-LD あり / Offer なし（新規価格を出さないため）**
- **Review / aggregateRating / ratingValue なし**

## 本番確認結果（2026-05-24、デプロイ `b1e7272`）

### URL HTTP / リダイレクト / canonical

| 項目 | 結果 |
|---|---|
| `/plan/non-religious-funeral/`（trailingSlash あり） | ✅ 200 OK |
| `/plan/non-religious-funeral`（trailingSlash なし） | ✅ 308 → `/plan/non-religious-funeral/` |
| canonical | ✅ `https://kawaguchitenrei.com/plan/non-religious-funeral/` 一致 |

### 画像

| 画像 | HTTP | Content-Type |
|---|---|---|
| `/images/plan/non-religious-funeral/hero.png` | ✅ 200 | ✅ image/png |

- hero 画像が本番 HTML に含まれる: ✅ 1 件
- alt 属性: ✅ 「川口市で無宗教葬をお考えの方へ」
- caption: ✅ 「宗教形式にこだわらない、ご家族らしいお別れのご相談に対応しています。」（2 件出現）

### title / meta description

| 項目 | 本番 HTML 確認結果 |
|---|---|
| `<title>` | ✅ 「川口市の無宗教葬 \| 宗教者を呼ばないお別れのご相談 \| 川口典礼」 |
| `<meta name="description">` | ✅ 「川口市で無宗教葬をご検討の方へ。川口典礼では、献花・黙祷・思い出の紹介など、ご家族らしいお別れの形をご相談いただけます。川口メモリアルホールでのお別れから、川口市めぐりの森での火葬までサポートします。」 |

### 主要セクション表示確認

| セクション | 結果 |
|---|---|
| 表示名「川口市の無宗教葬」 | ✅ 23 件出現 |
| subtitle「宗教者を呼ばないお別れのご相談」 | ✅ 8 件出現 |
| 結論ボックス「川口市の無宗教葬について」 | ✅ 表示 |
| 「無宗教葬とは」 | ✅ 表示 |
| 「仏式葬儀との違い」 | ✅ 表示 |
| 「無宗教葬でできるお別れの例」 | ✅ 表示 |
| 「川口メモリアルホールでできること」 | ✅ 表示 |
| 「川口市めぐりの森での火葬まで」 | ✅ 表示 |
| 「無宗教葬の流れ」 | ✅ 表示 |
| 「無宗教葬を選ぶ前に確認したいこと」（注意点） | ✅ 表示 |
| 「費用の考え方」 | ✅ 表示 |
| 中間 CTA「無宗教葬の進め方や費用が気になる方へ」 | ✅ 表示 |
| 補足「川口典礼の考え方」 | ✅ 表示 |
| Related セクション | ✅ 表示 |

### FAQ 11 問

| # | 質問 | 表示 |
|---|---|---|
| 1 | 無宗教葬とは何ですか？ | ✅ |
| 2 | 宗教者を呼ばない葬儀はできますか？ | ✅ |
| 3 | 無宗教葬では具体的に何を行いますか？ | ✅ |
| 4 | 献花や黙祷を取り入れられますか？ | ✅ |
| 5 | 音楽や思い出の写真を使えますか？ | ✅ |
| 6 | 菩提寺がある場合でも無宗教葬にできますか？ | ✅ |
| 7 | 親族にどう説明すればよいですか？ | ✅ |
| 8 | 川口メモリアルホールで無宗教葬はできますか？ | ✅ |
| 9 | 川口市めぐりの森で火葬できますか？ | ✅ |
| 10 | 費用はどのように考えればよいですか？ | ✅ |
| 11 | 事前相談だけでもできますか？ | ✅ |

### Related リンク 7 件

すべて本番 HTML 内に検出 ✅
- `/hall/kawaguchi-memorial-hall/`（3 件 = Related + 本文内 CTA × 2）
- `/saijo/megurinomori/`（3 件 = Related + 本文内 CTA × 2）
- `/plan/family-funeral/`（2 件）
- `/plan/oneday-funeral/`（2 件）
- `/plan/direct-funeral/`（2 件）
- `/area/kawaguchi/`（2 件）
- `/area/araijuku/`（1 件）

### `/plan/` 一覧側の誘導カード

| 項目 | 結果 |
|---|---|
| 「ご家族らしい形でお別れしたい方へ。」見出し | ✅ 表示 |
| 「無宗教葬の相談を見る」CTA | ✅ 表示 |
| `/plan/non-religious-funeral/` リンク | ✅ 1 件（CTA） |
| ItemList JSON-LD への無宗教葬掲載 | ❌ **なし**（A 案通り、ItemList の Service name は 既存 5 プランのみ：直葬 / 花入れお別れ / 一日葬 / 家族葬 / 市民葬） |
| `"name":"川口市の無宗教葬"` の `/plan/` 内出現 | 0 件 ✅ |

### sitemap 反映

| URL | 検出 |
|---|---|
| `https://kawaguchitenrei.com/plan/non-religious-funeral/` | ✅ 1 件（sitemap.xml に含まれる） |

### JSON-LD 構造化データ

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer` | 0 | **0** ✅（新規価格を出さない方針通り） |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 11 | **11** ✅ |
| `Answer` | 11 | **11** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue`（文字列） | 0 | **0** ✅ |

## 安全確認結果

| 項目 | 結果 |
|---|---|
| 「最安」 | ✅ 0 件 |
| 「必ず」 | ✅ 0 件 |
| 「絶対」 | ✅ 0 件 |
| 「追加費用なし」 | ✅ 0 件 |
| 「総額確定」 | ✅ 0 件 |
| 「宗教者は不要」 | ✅ 0 件 |
| 「お坊さんはいらない」 | ✅ 0 件 |
| 価格の新規追加 | ✅ なし（「内容により異なります」のみ、Offer 非生成） |
| 個人名・故人名・喪主名・顧客特定情報 | ✅ なし |
| 競合比較・誹謗中傷 | ✅ なし |
| 宗教を否定する表現 | ✅ なし（「宗教を否定するものではなく」と本文で明示） |
| フォーム / Webhook / GAS / `app/api/**` 変更 | ✅ なし |

## 触っていないファイル

- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`（読まず・表示せず・編集せず）
- 問い合わせフォーム / Webhook / GAS / `app/api/**` / `app/contact/**` / `app/estimate/**`
- 施工事例（`app/case/`）/ お客様の声（`app/voice/`）
- 既存エリア / 斎場 / ホールページ（別タスクで内部リンク検討）
- `app/sitemap.ts`（自動掲載のため編集不要）
- `public/images/tmp/tmp.txt`（指示通り未編集、untracked のまま）

## 関連コミット履歴

- `b1e7272` Add non religious funeral page（今回の本実装）
- 直前: `e6a49c5` Reduce external source link prominence on citizen funeral page
- 直前: `c63d0a6` Document citizen funeral SEO improvement
- 直前: `c629724` Improve Kawaguchi citizen funeral page SEO

## 次アクション

- **Search Console で `/plan/non-religious-funeral/` の URL 検査・公開URLテスト・インデックス登録リクエスト**（割り当て制限と相談しながら）
- **既存エリアページ・斎場ページ・ホールページから無宗教葬ページへの内部リンク追加を検討**（別タスク）
  - 各エリア FAQ「宗教者を呼ばないお別れも相談できますか？」の回答内リンク
  - `/saijo/megurinomori/` / `/hall/kawaguchi-memorial-hall/` の Related に追加
- **2〜4 週間後**に「川口 無宗教葬」「川口市 無宗教葬」の表示回数・平均掲載順位を Search Console「検索パフォーマンス」で確認
- **次施策**: ロードマップ §11 に従い「直葬・火葬式ページの川口市向け強化」へ

## 関連ドキュメント

- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`（無宗教葬: 4.0/10、ランキング外、新設効果大と評価）
- 前タスク完了記録: `docs/eval/records/2026-05-citizen-funeral-seo-improvement.md`
- AI ワークフロー: `docs/ai-workflows/skill-backlog.md`
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`（自動 push 範囲・宗教中立・価格未推測ルールに準拠）
