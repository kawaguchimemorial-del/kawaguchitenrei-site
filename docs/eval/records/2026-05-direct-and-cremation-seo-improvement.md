# 直葬・火葬式ページ 川口市向け強化 完了記録

## 概要

- **実施日**: 2026-05-24
- **対象コミット**: `74be7db Improve direct funeral and cremation pages for Kawaguchi`
- **対象URL**:
  - `/plan/direct-funeral/`
  - `/plan/cremation/`

## 目的

- 「川口 直葬」「川口市 直葬」検索への対応強化
- 「川口 火葬式」「川口市 火葬式」「川口 火葬」検索への対応強化
- 川口市めぐりの森での火葬までの流れを明確化
- 川口メモリアルホールでの安置・面会・お別れ導線を強化
- 直葬・火葬式ページから関連プラン・斎場・エリアへの内部リンクを強化

## 変更内容

- `metaTitle` / `metaDescription` 更新
- 結論ボックス追加（通常プラン用に `PlanConclusionBox` 新規追加 + データ）
- Related セクション追加（通常プラン用に `PlanRelated` 新規追加 + データ）
- Plan 型に `conclusionBox?` / `relatedLinks?` の汎用 optional フィールド追加
- FAQ 拡張
  - direct-funeral: 既存 3 + 追加 8 = **11 問**
  - cremation: 既存 3 + 追加 7 = **10 問**
- direct-funeral / cremation 相互リンクで「直葬」「火葬式」の異同を補完
- direct-funeral は既存 Offer（price 139000）維持
- cremation は Offer なし維持（pricing 未設定のため自動的に Offer 不生成）

## 本番確認結果（2026-05-24、デプロイ `74be7db`）

### URL HTTP / リダイレクト / canonical

| URL | HTTP | リダイレクト | canonical |
|---|---|---|---|
| `/plan/direct-funeral/` | ✅ 200 | ✅ 308 → 末尾スラッシュあり | ✅ 一致 |
| `/plan/cremation/` | ✅ 200 | ✅ 308 → 末尾スラッシュあり | ✅ 一致 |

### title / metaDescription

#### /plan/direct-funeral/
- title: ✅ 「川口市の直葬 | 川口市めぐりの森での火葬まで | 川口典礼」
- metaDescription: ✅ 「川口市で直葬をご検討の方へ。川口典礼では、ご搬送・ご安置・打ち合わせから、川口市めぐりの森での火葬まで一貫してご相談いただけます。事前相談会員価格139,000円(税込)〜。24時間365日対応。」

#### /plan/cremation/
- title: ✅ 「川口市の火葬式 | 通夜・告別式を行わないお別れのご相談 | 川口典礼」
- metaDescription: ✅ 「川口市で火葬式をご検討の方へ。通夜・告別式を行わず、火葬を中心にお見送りする形のご相談を承ります。川口メモリアルホールでのお別れ・面会、川口市めぐりの森での火葬まで川口典礼がサポートします。」

### 結論ボックス表示確認

- direct-funeral 「川口市の直葬について。」: ✅ 2 件
  - 「ご搬送から川口市めぐりの森での火葬まで」: 3 件
  - 「シンプル直葬プラン」: 7 件（既存 simpleAlternative + 結論ボックスでの言及）
- cremation 「川口市の火葬式について。」: ✅ 2 件
  - 「火葬場の運営は川口市」: 3 件（運営主体の明示）
  - 「後日、お別れ会や偲ぶ会」: 7 件（既存 FAQ + 結論ボックスでの言及）
- 「川口典礼が運営する川口市めぐりの森」「当社が運営する川口市めぐりの森」: ❌ 両ページとも 0 件 ✅

### FAQ 表示確認

#### direct-funeral（11 問すべて表示）

| # | 質問 | 表示 |
|---|---|---|
| 1 | 火葬式との違いは何ですか？ | ✅ |
| 2 | ご親族の理解は得られますか？ | ✅ |
| 3 | 後日、宗教者にお願いすることは可能ですか？ | ✅ |
| 4 | 川口市で直葬を行う場合、どこで火葬しますか？ | ✅ |
| 5 | 川口市めぐりの森の予約は誰が行いますか？ | ✅ |
| 6 | 火葬前にお別れの時間は取れますか？ | ✅ |
| 7 | 病院や施設から直接火葬場へ行きますか？ | ✅ |
| 8 | 川口メモリアルホールで安置・面会はできますか？ | ✅ |
| 9 | 直葬と一日葬・家族葬の違いは何ですか？ | ✅ |
| 10 | 別途必要になる費用はありますか？ | ✅ |
| 11 | 深夜・早朝の搬送にも対応できますか？ | ✅ |

#### cremation（10 問すべて表示）

| # | 質問 | 表示 |
|---|---|---|
| 1 | 宗教者のお勤めはありますか？ | ✅ |
| 2 | 親族以外の方の参列は可能ですか？ | ✅ |
| 3 | 後日、お別れの機会を設けることはできますか？ | ✅ |
| 4 | 火葬式と直葬は同じですか？ | ✅ |
| 5 | 川口市で火葬式を行う場合、どこで火葬しますか？ | ✅ |
| 6 | 川口市めぐりの森を利用できますか？ | ✅ |
| 7 | 火葬前にお別れの時間は取れますか？ | ✅ |
| 8 | 川口メモリアルホールで安置・面会はできますか？ | ✅ |
| 9 | 費用には何が含まれますか？ | ✅ |
| 10 | 事前相談だけでもできますか？ | ✅ |

### Related リンク

#### direct-funeral（8 件、すべて検出）
- /saijo/megurinomori/（3 件 = 本文＋Related＋他）
- /hall/kawaguchi-memorial-hall/（2 件）
- /plan/cremation/（1 件）
- /plan/oneday-funeral/（2 件）
- /plan/family-funeral/（2 件）
- /plan/kawaguchi-shimin/（2 件）
- /plan/non-religious-funeral/（1 件）
- /area/kawaguchi/（2 件）

#### cremation（7 件、すべて検出）
- /saijo/megurinomori/（3 件）
- /hall/kawaguchi-memorial-hall/（2 件）
- /plan/direct-funeral/（2 件）
- /plan/oneday-funeral/（2 件）
- /plan/family-funeral/（2 件）
- /plan/non-religious-funeral/（1 件）
- /area/kawaguchi/（2 件）

### JSON-LD

#### direct-funeral

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer` | 1 | **1** ✅（price 139000） |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 11 | **11** ✅ |
| `Answer` | 11 | **11** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue` | 0 | **0** ✅ |

#### cremation

| @type | 期待 | 実測 |
|---|---|---|
| `BreadcrumbList` | 1 | **1** ✅ |
| `Service` | 1 | **1** ✅ |
| `Offer` | 0 | **0** ✅（pricing 未設定のため不生成） |
| `FAQPage` | 1 | **1** ✅ |
| `Question` | 10 | **10** ✅ |
| `Answer` | 10 | **10** ✅ |
| `Review` | 0 | **0** ✅ |
| `aggregateRating` | 0 | **0** ✅ |
| `ratingValue` | 0 | **0** ✅ |
| `price`（HTML 内全体） | 0 | **0** ✅ |

## 安全確認結果

| 項目 | direct-funeral | cremation |
|---|---|---|
| 「最安」 | ✅ 0 件 | ✅ 0 件 |
| 「必ず」 | ✅ 0 件 | ✅ 0 件 |
| 「絶対」 | ✅ 0 件 | ✅ 0 件 |
| 「追加費用なし」 | ✅ 0 件 | ✅ 0 件 |
| 「総額確定」 | ✅ 0 件 | ✅ 0 件 |
| 「火葬だけなら必ず安い」 | ✅ 0 件 | ✅ 0 件 |
| 「川口典礼が運営する川口市めぐりの森」 | ✅ 0 件 | ✅ 0 件 |
| 川口市めぐりの森の運営主体明示 | ✅「川口市営の火葬場」「運営は川口市」と明示 | 同左 |
| 価格の新規追加 | ✅ なし（既存 139,000 円のみ） | ✅ なし（pricing なし維持） |
| 既存価格の変更 | ✅ なし | ✅ なし |
| 個人名・故人名・喪主名 | ✅ なし | ✅ なし |
| 競合比較・誹謗中傷 | ✅ なし | ✅ なし |

## 触っていないファイル

- `app/plan/page.tsx`（プラン一覧構成は変えない）
- `app/sitemap.ts`
- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`
- 問い合わせフォーム / Webhook / GAS / `app/api/**` / `app/contact/**` / `app/estimate/**`
- 既存 `citizenFuneralInfo` / `nonReligiousInfo` を持つプランのデータ
- direct-funeral の **既存 price / pricing / image / inclusions / flow / additional / simpleAlternative**
- cremation の **既存価格・項目・compatibleHalls**
- 既存 family-funeral / oneday-funeral / hanaire-owakare（`conclusionBox` / `relatedLinks` 未設定のため表示変化なし）
- `public/images/tmp/tmp.txt`

## 関連コミット履歴

- `74be7db` Improve direct funeral and cremation pages for Kawaguchi（今回の本実装）
- 直前: `0e3e667` Document non religious funeral page launch
- 直前: `b1e7272` Add non religious funeral page
- 直前: `e6a49c5` Reduce external source link prominence on citizen funeral page

## 次アクション

- **Search Console で /plan/direct-funeral/ と /plan/cremation/ の URL 検査・インデックス登録リクエスト**（割り当て制限と相談）
- **2〜4 週間後**に「川口 直葬」「川口市 直葬」「川口 火葬式」「川口市 火葬式」「川口 火葬」「川口市 火葬」の表示回数・平均掲載順位を Search Console「検索パフォーマンス」で確認
- **次施策**: ロードマップ §11 に従い「一日葬ページの川口市向け強化」へ
- その後、家族葬ページの川口市向け強化、施工事例・お客様の声との内部リンク強化

## 関連ドキュメント

- 競合分析: `docs/seo-research/2026-05-target-keyword-competitor-analysis.md`
- 直前完了記録: `docs/eval/records/2026-05-non-religious-funeral-page.md`
- AI ワークフロー: `docs/ai-workflows/skill-backlog.md`
- 評価指標: `docs/ai-workflows/eval-metrics.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`（自動 push 範囲・価格未推測・めぐりの森の運営主体明示ルールに準拠）
