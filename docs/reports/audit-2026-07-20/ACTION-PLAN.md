# アクションプラン（kawaguchitenrei.com SEO監査 2026-07-20）

優先度は「効果 ÷ 工数」で並べた。**Phase 1 は全て1〜2ファイルの修正で終わる**。

---

## Phase 1: 今週（CTR改善に直結・低工数）

| # | 施策 | 対象ファイル | 工数 | push区分 |
|---|---|---|---|---|
| 1 | **口コミ30ページの h1 復旧** | `components/voice/VoiceDetailIntro.tsx`（1ファイル） | 15分 | 自走可 |
| 2 | **トップの title/description 短縮** | `app/page.tsx` | 30分 | 自走可 |
| 3 | **プラン7ページの title/description 短縮** | `lib/plans.ts` | 1時間 | 自走可 |
| 4 | **エリア15ページの title 短縮** | `lib/areas.ts` | 1時間 | 自走可 |
| 5 | 重複title解消（voice 2ページ） | `lib/voices.ts` | 10分 | 自走可 |

**Phase 1 の狙い**: 現在「地域商用KWで上位表示されているのに CTR ほぼ0%」という状態。順位は既に取れているので、**SERP での見え方を直すだけでクリックが増える可能性が最も高い**。新規コンテンツ制作より先にこれをやる。

**効果測定**: 実施2週間後に `tmp/seo-analysis-*/fetch_gsc.mjs` を再実行し、「川口市 葬儀」「川口市 葬儀社」「川口市 家族葬」の CTR を比較。

---

## Phase 2: 2〜3週目（構造の是正）

| # | 施策 | 対象 | push区分 |
|---|---|---|---|
| 6 | コラム44本の title 短縮（45〜54字 → 30字以内） | `lib/columns.ts` | 自走可 |
| 7 | `getFuneralHomeRef()` を `lib/company.ts` に追加 | `lib/company.ts` | 自走可 |
| 8 | `@id` 参照への置換（`/plan/[slug]/` 10件から段階的に） | `app/plan/**` | 自走可 |
| 9 | 同上（`/area/*` 16件 → `/voice/[slug]/` 30件） | `app/area/**` `app/voice/**` | voiceはReview含むため**要承認** |
| 10 | LocalBusiness に `geo` 追加 | `lib/company.ts` | 自走可 |
| 11 | `/privacy/` `/tokushoho/` `/sitemap/` に WebPage+Breadcrumb | 各 `page.tsx` | 自走可 |
| 12 | `/contact/` `/estimate/` に ContactPage+Breadcrumb | `app/contact/**` `app/estimate/**` | **要承認**（§19.2） |

---

## Phase 3: 1ヶ月目（コンテンツとE-E-A-T）

| # | 施策 | 内容 |
|---|---|---|
| 13 | **エリアページの一次情報化** | まず3〜5エリアで試験。地区固有の寺院名・実測所要時間・駅からの実距離を追加。`primarySaijoSlugs` をエリアごとに地理的に見直す |
| 14 | **監修者情報の追加** | 葬祭ディレクター等の資格保有者を `Person` として明示。コラムに監修者欄を設置 |
| 15 | **制度解説記事に出典リンク** | `/column/hojokin/` `/column/sousai-fujo/` `/column/kenan/` に厚労省・埼玉県・川口市の公式ページへの外部リンク |
| 16 | **コラム→プランの導線強化** | CV近い14本から該当プランページへの文脈内部リンク。`/column/fuhou/`（表示の主因）から「自分が喪主になったら」導線を1本 |
| 17 | セキュリティヘッダー4種の追加 | `next.config.ts`（**要承認**） |

### コラム44本の分類（Phase 3-16 の対象選定用）

| 区分 | 本数 | 代表URL | アクション |
|---|---|---|---|
| **CV近い** | 約14本 | `/column/hiyou/` `/column/kazokusou/` `/column/ichinichi-sou/` `/column/jiyusou/` `/column/sougi_nattoku/` | プランページへの内部リンク強化・CTA文脈適合 |
| **中間**（制度・手続き） | 約16本 | `/column/hojokin/` `/column/sousaihi/` `/column/sougi_flow/` `/column/mosyu/` `/column/hansou/` | 記事末尾から該当プラン・エリアへ導線追加 |
| **遠い**（マナー・雑学） | 約14本 | `/column/fuhou/` `/column/obon/` `/column/butumetu/` `/column/souzoku/` | CV施策不要。`fuhou` のみ間接導線を1本 |

---

## Phase 4: 継続（off-page — 本監査の対象外だが最大の伸び代）

サイト内の改善は Phase 1〜3 でほぼ打ち止めになる。**それ以降の伸び代は site の外にある。**

| # | 施策 | 備考 |
|---|---|---|
| 18 | **GBP 最適化の実行** | チェックリスト（`docs/operations/gbp/2026-07-05-offpage-checklist.md`）は策定済みで**未実行**。広告費を1円も使わずに地域検索の一等地を取れる唯一の手段 |
| 19 | **外部ポータルの誤価格訂正** | 安心葬儀「火葬式8.8万円」、いい葬儀「葬儀費用13万円〜」。正本は直葬139,000円/189,000円。**実害レベル** |
| 20 | **口コミ運用の仕組み化** | 27件 vs 競合3,000〜3,600件。件数では追いつけない前提で「返信率・鮮度・内容の質」で勝つ設計 |
| 21 | サイテーション NAP 統一 | Yahoo!ロコ / Bing / Apple マップ。法人名表記（株式会社の有無）をGBP正式名称欄と揃える |

---

## 効果測定のサイクル

```
Phase 1 実施 → 2週間後に fetch_gsc.mjs 再実行 → CTR比較
Phase 2 実施 → Rich Results Test + URL検査で @id 統一を確認
Phase 3 実施 → 4週間後にエリアページの表示回数・順位を比較
```

`docs/operations/2026-06-26-offpage-action-plan.md` §6 の規定通り、GSC/GA4 の取得は **2〜4週ごと**。

---

## 併せて検証すべき既知の懸念（本監査の範囲外）

直近28日で**表示+101%・セッション+60%に対し CV は実数で減少**している。

| イベント | 前28日 → 直近28日 |
|---|---|
| `form_start` | 19 → **41**（+116%） |
| `generate_lead` | 16 → **11**（-31%） |
| `click_tel` | 29 → **13**（-55%） |

`form_start` が倍増して `generate_lead` が減る乖離、および流入増と矛盾する `click_tel` 55%減は、**フォーム離脱の悪化か GA4 計測実装の不備か**の切り分けが必要。これは SEO 施策より優先度が高い可能性がある。
