# 施工事例 / 施行事例の表記統一 完了記録

## 作業名

施工事例 / 施行事例の表記統一

## 目的

葬儀文脈に合わせて、サイト内のコード側（プラン詳細・主要エリアの Related ラベル等）の表示テキストを **「施行事例」** へ統一する。

## 背景

直近の `/case/` 一覧への内部リンク強化作業（コミット `046cbb9`）で各プラン・主要エリアの `relatedLinks` に追加した label / description が **「施工事例」**（建築・工事業界寄りの表記）となっており、サイトの主要シグナル（Header / Footer / `/case/` ページ本体・個別事例ページ・トップ `CasesSection`）の **「施行事例」**（葬儀業界の標準表記）と表記が混在していた。

分析: `docs/seo-research/2026-05-case-terminology-review.md`

## 実装コミット

- **`519e1468461e768b3d325eb6ba3a195be8a85e77`**（Normalize case terminology to funeral usage）

## 変更ファイル一覧

| ファイル | 変更箇所 | 差分 |
|---|---|---|
| `lib/plans.ts` | 通常プラン 4 件 + non-religious-funeral の `relatedLinks`（label / description） | +10 / -10 |
| `components/plan/PlanDetailBody.tsx` | `citizenFuneralRelatedLinks`（label / description） | +2 / -2 |
| `app/area/kawaguchi/page.tsx` | Related の label / description | +2 / -2 |
| `app/area/araijuku/page.tsx` | Related の label / description | +2 / -2 |
| `app/area/hatogaya/page.tsx` | Related の label / description | +2 / -2 |

**合計**: 5 ファイル / +18 / -18 行

## 変更内容

すべての変更は単純な文字列置換のみ:

- `label: "施工事例"` → `label: "施行事例"`
- `description: "川口典礼でお手伝いした葬儀の施工事例を一覧でご覧いただけます。"` → `description: "川口典礼でお手伝いした葬儀の施行事例を一覧でご覧いただけます。"`
- `description: "川口典礼でお手伝いした葬儀の施工事例を確認できます。"` → `description: "川口典礼でお手伝いした葬儀の施行事例を確認できます。"`

## 変更しなかったもの

- URL（`/case/`）
- slug（`lib/cases.ts` 内の各事例の slug）
- ファイル名（`app/case/` ディレクトリ、画像ファイル名）
- import 名・component 名・型名（`CaseRecord` / `CaseDetailIntro` 等）
- `lib/cases.ts` の事例データ（title / summary / requirements / implementation 等）
- 既存価格・既存事例の総額
- 既存画像（`public/images/cases/**`）
- `lib/voices.ts`（指示通り未変更）
- sitemap / canonical / robots / noindex
- `package.json` / `next.config.ts`
- Review / aggregateRating / ratingValue（追加なし、既存非設定を維持）
- 既存の JSON-LD 構造（BreadcrumbList / ItemList / FAQPage）
- ナビゲーション・ヘッダー・フッターの既存「施行事例」ラベル（既に正しい表記のため）
- `/case/` ページ本体（`app/case/page.tsx`）— 既に「施行事例」で統一済み
- 個別事例ページ（`app/case/[slug]/page.tsx`）— 既に「施行事例」で統一済み
- `docs/**` の既存記述（プロジェクト方針・ガイドライン・過去の完了記録に含まれる「施工事例」表記） — **別タスクで判断**

## docs の表記揺らぎについて

`grep -rn "施工事例"` で確認したところ、`docs/**` 配下にはなお「施工事例」表記が残っている（CLAUDE.md / docs/01-seo-aio-policy.md / docs/04-privacy-review.md / docs/ai-workflows/** / 過去の完了記録 docs など）。

これらは:
- ユーザー指示で「変更してよいもの = サイト表示テキスト中心」と限定された
- プロジェクト方針・ガイドライン文書はサイト訪問者には見えない
- 修正対象が広範（10 以上のファイル）になるため、本タスクのスコープを超える

→ **別タスクで判断**（docs の表記統一を行うかどうかも合わせて判断推奨）

## build 結果

- ✅ `npm run build` 成功
- ✅ Compiled successfully in 3.1s
- ✅ TypeScript pass（Finished TypeScript in 3.4s）
- ✅ **131/131 static pages** 生成（ページ数変化なし）

## 安全確認

| 項目 | 結果 |
|---|---|
| URL / slug / ファイル名変更 | ✅ なし |
| `app/case/page.tsx` の構造破壊 | ✅ なし（変更なし） |
| `lib/cases.ts` の事例データ変更 | ✅ なし |
| `lib/voices.ts` 変更 | ✅ なし |
| 価格データ変更 | ✅ なし |
| Review / aggregateRating / ratingValue 追加 | ✅ なし |
| `/voice/` への新規リンク追加 | ✅ なし |
| `public/images/tmp/tmp.txt` 接触 | ✅ なし |
| Header / Footer / MobileBottomCTA / package.json / next.config.ts / funeral-system / `.env*` / `app/api/**` / `app/contact/**` / `app/estimate/**` 変更 | ✅ なし |
| 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定 / 標準価格） | ✅ 0 件 |
| コード側の「施工事例」残存 | ✅ 0 件（`grep -rn "施工事例" app/ components/ lib/` で 0 ヒット） |

## 関連コミット履歴

- `519e146` Normalize case terminology to funeral usage（今回の本実装）
- 直前: `5874ff4` Add case index one hour work summary
- 直前: `8f6f94a` Document Search Console priority after case update
- 直前: `ef29c8d` Document case terminology review（分析）

## 次の候補

- **`/voice/` Privacy Review**（手書きアンケート画像 30 枚目視 / 本文 30 件のスタッフ実名・故人状況詳細レビュー）
- **Search Console URL 検査**（`docs/operations/search-console/2026-05-url-inspection-priority-after-case.md` 参照、Priority 1 から）
- **表示回数観測**（2〜4 週間後、対象キーワード: 川口市 施行事例 / 川口 葬儀 事例 等）
- docs の「施工事例」表記統一（プロジェクト方針文書 / ガイドライン / 過去完了記録）の別タスク検討

## 関連ドキュメント

- 分析: `docs/seo-research/2026-05-case-terminology-review.md`
- /case/ SEO/AIO 強化: `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`
- 内部リンク強化（表記揺らぎの原因となった作業）: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- 1 時間作業サマリー: `docs/operations/2026-05-case-index-one-hour-work-summary.md`
- ガードレール: `docs/ai-workflows/guardrails-and-approval.md`
