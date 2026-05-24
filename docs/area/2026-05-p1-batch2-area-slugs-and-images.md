# P1 Batch 2 エリアページ設計準備: 地名・slug・画像の固定

## 目的

P1 Batch 2 として追加する6エリアの **地名表記・読み・slug・URL・Area 定数名・hero 画像** を、ページ実装に着手する前に確定する。
- 後工程（`lib/areas.ts` への追加、`app/area/<slug>/page.tsx` 作成、`sitemap.ts` 追加、`AreasSection.tsx` 追加、Search Console 送信）で迷わない
- 既存slugとの衝突や、URL・フォルダ名の表記揺れを防ぐ
- 画像を先に正式配置に置いておくことで、実装フェーズで「画像が無い／パスが違う」問題を起こさない

このフェーズではページ本体・Areaデータ・sitemap・コンポーネントは **触らない**。

## 固定した地名表記・読み・slug・URL・定数名

| 表記 | 読み | slug | URL | フォルダ | Area 定数名 |
|---|---|---|---|---|---|
| 神根 | かみね | `kamine` | `/area/kamine/` | `app/area/kamine/` | `areaKamine` |
| 新郷 | しんごう | `shingo` | `/area/shingo/` | `app/area/shingo/` | `areaShingo` |
| 芝 | しば | `shiba` | `/area/shiba/` | `app/area/shiba/` | `areaShiba` |
| 安行 | あんぎょう | `angyo` | `/area/angyo/` | `app/area/angyo/` | `areaAngyo` |
| 上青木 | かみあおき | `kamiaoki` | `/area/kamiaoki/` | `app/area/kamiaoki/` | `areaKamiaoki` |
| 青木 | あおき | `aoki` | `/area/aoki/` | `app/area/aoki/` | `areaAoki` |

### 表記ルール

- URL/フォルダ/slug は **英数字小文字のみ**（今回はハイフン不使用）
- trailingSlash あり版で統一（既存規則と同じ）
- 既存 8 slug（kawaguchi / araijuku / hatogaya / nishikawaguchi / higashikawaguchi / kawaguchi-motogo / minami-hatogaya / tozuka-angyo）と完全一致なし
- 「新郷（しんごう）」「安行（あんぎょう）」の長音は slug で省略（既存方針と整合）

## 画像移動前 → 移動後

すべて既存命名規則 `public/images/area/{slug}/station.png` に準拠して配置。

| 移動前 | 移動後 |
|---|---|
| `public/images/tmp/神根.png` | `public/images/area/kamine/station.png` |
| `public/images/tmp/新郷.png` | `public/images/area/shingo/station.png` |
| `public/images/tmp/芝.png` | `public/images/area/shiba/station.png` |
| `public/images/tmp/安行.png` | `public/images/area/angyo/station.png` |
| `public/images/tmp/上青木.png` | `public/images/area/kamiaoki/station.png` |
| `public/images/tmp/青木.png` | `public/images/area/aoki/station.png` |

- 移動後、`public/images/tmp/` フォルダは空になったため削除済み
- 既存7エリア（araijuku / hatogaya / nishikawaguchi / higashikawaguchi / kawaguchi-motogo / minami-hatogaya / tozuka-angyo）の画像は **未変更**

## alt 案（次フェーズでの `lib/areas.ts` 設定値）

| エリア | alt |
|---|---|
| 神根 | 神根周辺の葬儀・家族葬に対応する川口典礼 |
| 新郷 | 新郷周辺の葬儀・家族葬に対応する川口典礼 |
| 芝 | 芝周辺の葬儀・家族葬に対応する川口典礼 |
| 安行 | 安行周辺の葬儀・家族葬に対応する川口典礼 |
| 上青木 | 上青木周辺の葬儀・家族葬に対応する川口典礼 |
| 青木 | 青木周辺の葬儀・家族葬に対応する川口典礼 |

## caption 案（次フェーズでの `lib/areas.ts` 設定値）

| エリア | caption |
|---|---|
| 神根 | 川口市神根周辺からのご相談に対応しています。 |
| 新郷 | 川口市新郷周辺からのご相談に対応しています。 |
| 芝 | 川口市芝周辺からのご相談に対応しています。 |
| 安行 | 川口市安行周辺からのご相談に対応しています。 |
| 上青木 | 川口市上青木周辺からのご相談に対応しています。 |
| 青木 | 川口市青木周辺からのご相談に対応しています。 |

> Batch 1 は「JR京浜東北線『西川口駅』周辺〜」のように路線名・駅名を入れたが、Batch 2 は地区名（地名）が単位のためシンプルに「川口市○○周辺からのご相談に対応しています。」とする。

## 設計上の住み分け（確定済み方針）

### 1. `/area/angyo/` と既存 `/area/tozuka-angyo/`

- `/area/tozuka-angyo/`（既存）：**戸塚安行駅周辺**として記述（駅名 SEO）
- `/area/angyo/`（新規）：**安行地区全体**として記述（地名 SEO、戸塚安行駅周辺・安行植木の里・安行原・安行領家など広域）
- 内容が重なりすぎないようにする
- 将来的に Related で相互リンク（`angyo` ⇔ `tozuka-angyo`）

### 2. `/area/aoki/`（青木）と `/area/kamiaoki/`（上青木）

- `/area/aoki/`：青木地区（青木町・青木〜丁目）
- `/area/kamiaoki/`：上青木地区（上青木〜丁目・上青木西〜丁目）
- 住所・検索意図が異なるため独立ページとして扱う
- 将来的に Related で相互リンク（`aoki` ⇔ `kamiaoki`）

### 3. `shingo` の slug 方針

- 表記: 新郷 / 読み: しんごう / slug: `shingo`
- `shingou`（ヘボン式厳密）・`shin-go`（ハイフン区切り）は採用しない
- 当サイトの既存 slug（`nishikawaguchi` / `higashikawaguchi` / `tozuka-angyo` / `minami-hatogaya`）と整合的な「長音省略」ルールに沿う

## 次フェーズでやること（このコミットでは触らない）

実装着手時のチェックリスト。

1. **`lib/areas.ts` へ Area データ追加**
   - 6つの `areaKamine` / `areaShingo` / `areaShiba` / `areaAngyo` / `areaKamiaoki` / `areaAoki` を export
   - `heroImage` は上記 src / alt / caption を使う
   - 既存 `Area` 型に合わせて `slug` / `name` / `shortName` / `heroTitle` / `heroLead` / `heroDescription` / `features` / `primaryHallSlug` / `primarySaijoSlugs` / `reasons` / `faqs` / `metaTitle` / `metaDescription` を設定
   - `areas` 配列の末尾に追記
2. **`app/area/<slug>/page.tsx` 作成 × 6**
   - 既存 Batch 1 の構造（`AreaDetailIntro` / `AreaPrimaryHall` / `AreaFeatures` / `AreaPlans` / `AreaSaijo` / `AreaReasons` / `AreaFlow` / `AreaFaq` / Related / `AreaDetailCta`）に揃える
   - `breadcrumbJsonLd` / `faqJsonLd` / `funeralHomeJsonLd` を含める
   - `relatedLinks` を各ページ用にローカル定数で設計
3. **`sitemap.ts` または `app/sitemap.ts` に 6 URL を追加**
   - URL は `/area/{slug}/`（trailingSlash あり）で統一
4. **`AreasSection.tsx`（または対応するトップ・対応エリア一覧コンポーネント）に 6 エリアを追加**
   - 既存エリアと並びを整える
5. **関連リンク設計**
   - 各新規6ページの `relatedLinks` を、近隣・路線・既存エリアとの関係から設計
   - 既存3エリア（kawaguchi / araijuku / hatogaya）と Batch 1 の 5エリアからも、必要に応じて Batch 2 エリアへの導線を追加（過剰にならない範囲で）
   - 住み分け方針（`angyo`⇔`tozuka-angyo` / `aoki`⇔`kamiaoki`）を反映
6. **本番反映後の Search Console 送信**
   - `sitemap.xml` 再送信
   - 新規6 URL の URL 検査・公開URLテスト・インデックス登録リクエスト
   - 作業ログを `docs/operations/search-console/YYYY-MM-DD-p1-batch2-area-pages.md` として残す

## 関連ドキュメント

- Batch 1 実装完了レポート: `docs/eval/records/2026-05-p1-batch1-area-pages.md`
- Batch 1.5 内部リンク強化・hero画像完了レポート: `docs/eval/records/2026-05-p1-batch1-5-internal-links-hero-images.md`
- Batch 1 Search Console 作業ログ: `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
- 改修ロードマップ: `docs/03-improvement-roadmap.md`
- SEO/AIO 方針: `docs/01-seo-aio-policy.md`
