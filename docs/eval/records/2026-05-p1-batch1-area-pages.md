# P1 Batch 1 — 5 エリアページ追加 完了記録（2026-05）

`docs/eval/seo-aio-checklist.md` の運用ルールに沿った、P1 Batch 1 エリアページ追加の実装・検証記録。

---

## 1. 概要

| 項目 | 内容 |
|---|---|
| 実施日 | 2026-05-23 |
| commit hash | `e588b2a0313534a1f6541a6f80a6cfc680a08375`（短縮：`e588b2a`） |
| コミットメッセージ | `Add 5 new area pages for P1 Batch 1` |
| 対象フェーズ | P1（`docs/03-improvement-roadmap.md` P1-4 エリアページ追加 / Batch 1） |
| 実装方式 | 既存 `/area/araijuku/` `/area/hatogaya/` パターンを踏襲した個別 `app/area/<slug>/page.tsx` 作成 |
| 変更規模 | 8 files changed, 1,625 insertions(+), 1 deletion(-) |

---

## 2. 追加した 5 エリア

| エリア | slug | 主要駅 | 路線 |
|---|---|---|---|
| 西川口 | `nishikawaguchi` | 西川口駅 | JR京浜東北線 |
| 東川口 | `higashikawaguchi` | 東川口駅 | JR武蔵野線・埼玉高速鉄道 |
| 川口元郷 | `kawaguchi-motogo` | 川口元郷駅 | 埼玉高速鉄道 |
| 南鳩ヶ谷 | `minami-hatogaya` | 南鳩ヶ谷駅 | 埼玉高速鉄道 |
| 戸塚安行 | `tozuka-angyo` | 戸塚安行駅 | 埼玉高速鉄道 |

---

## 3. 追加 URL

- `https://kawaguchitenrei.com/area/nishikawaguchi/`
- `https://kawaguchitenrei.com/area/higashikawaguchi/`
- `https://kawaguchitenrei.com/area/kawaguchi-motogo/`
- `https://kawaguchitenrei.com/area/minami-hatogaya/`
- `https://kawaguchitenrei.com/area/tozuka-angyo/`

---

## 4. 変更ファイル

### 既存ファイル（modified）

| ファイル | 変更内容 |
|---|---|
| `lib/areas.ts` | +505 行（`areaNishikawaguchi` / `areaHigashikawaguchi` / `areaKawaguchiMotogo` / `areaMinamiHatogaya` / `areaTozukaAngyo` の 5 定数追加 + `areas` 配列拡張） |
| `app/sitemap.ts` | +30 行（5 URL を `staticPages` に追加、priority 0.8、changeFrequency monthly） |
| `components/home/AreasSection.tsx` | +5 行（`kawaguchiAreas` を 3 件 → 8 件に拡張） |

### 新規ファイル（new）

- `app/area/nishikawaguchi/page.tsx`
- `app/area/higashikawaguchi/page.tsx`
- `app/area/kawaguchi-motogo/page.tsx`
- `app/area/minami-hatogaya/page.tsx`
- `app/area/tozuka-angyo/page.tsx`

### 触っていないファイル

- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx`
- `package.json`
- `.env*`
- `next.config.ts`
- `funeral-system/`

---

## 5. build 結果

```
✓ Compiled successfully in 2.9s
```

- エラー・警告ゼロ
- `.next/server/app/area/` 配下に 8 件の HTML（既存 3 + 新規 5）が prerender
- lint：新規・修正ファイルへのエラーゼロ（既存 `tmp/` 配下スクリプトの警告は gitignore 対象）

---

## 6. 本番反映確認結果

### HTTP ステータス

| URL | trailingSlash あり | trailingSlash なし |
|---|---|---|
| `/area/nishikawaguchi/` | ✅ 200 OK | ✅ 308 → `/area/nishikawaguchi/` |
| `/area/higashikawaguchi/` | ✅ 200 OK | ✅ 308 → `/area/higashikawaguchi/` |
| `/area/kawaguchi-motogo/` | ✅ 200 OK | ✅ 308 → `/area/kawaguchi-motogo/` |
| `/area/minami-hatogaya/` | ✅ 200 OK | ✅ 308 → `/area/minami-hatogaya/` |
| `/area/tozuka-angyo/` | ✅ 200 OK | ✅ 308 → `/area/tozuka-angyo/` |

すべて HTTP 200 で取得可能、`X-Vercel-Cache: HIT`、Vercel デプロイ反映済。

### canonical

全 5 URL で canonical が末尾スラッシュ付き形式と完全一致：

```
<link rel="canonical" href="https://kawaguchitenrei.com/area/<slug>/"/>
```

### sitemap.xml 反映

- HTTP 200、20,757 bytes
- 新規 5 URL がすべて `<loc>` として含まれている
- 各 URL の `<priority>0.8</priority>`、`<changefreq>monthly</changefreq>` を確認

---

## 7. JSON-LD 確認結果

各 5 ページの本番 HTML を `grep` で検証：

| 種類 | 出現数（全 5 ページ共通） |
|---|---|
| `BreadcrumbList` | 1 |
| `FAQPage` | 1 |
| `FuneralHome` | 1 |
| `AdministrativeArea` | 1（`areaServed` 内） |
| `PostalAddress` | 1（FuneralHome の住所） |
| `ListItem` | 3（BreadcrumbList の 3 階層） |
| `Question` | **6** |
| `Answer` | **6** |

全 5 エリアで構造化データのパターンが完全に一致。既存 `/area/araijuku/` `/area/hatogaya/` `/area/kawaguchi/` と同等の構成。

---

## 8. 表示・導線確認結果

各 5 ページの本番 HTML に以下を検出：

| 要素 | 状態（全 5 ページ） |
|---|---|
| `<h1>` タグ | ✅ 1 件 |
| 電話 CTA `0120-963-765` | ✅ 存在 |
| 事前相談 CTA `/contact/` | ✅ 存在 |
| 川口メモリアルホール導線 `/hall/kawaguchi-memorial-hall/` | ✅ 存在 |
| 川口市めぐりの森導線 `/saijo/megurinomori/` | ✅ 存在 |
| 家族葬プラン `/plan/family-funeral/` | ✅ 存在 |
| 一日葬プラン `/plan/oneday-funeral/` | ✅ 存在 |
| 直葬プラン `/plan/direct-funeral/` | ✅ 存在 |
| 関連リンク（Related セクション） | ✅ 存在 |

---

## 9. 安全確認結果

各 5 ページの本番 HTML を `grep` で検証：

| 検査項目 | 結果（全 5 ページ） |
|---|---|
| 「絶対」出現 | **0 件** ✅ |
| 「必ず」出現 | **0 件** ✅ |
| 「最安」出現 | **0 件** ✅ |
| 「追加費用なし」出現 | **0 件** ✅ |
| 「総額確定」出現 | **0 件** ✅ |
| 「車で約 N 分」（新規エリアの未確認距離） | **0 件** ✅ |
| 価格表記 | プラン正本（CLAUDE.md §9）と完全一致：528,000円(税込) / 396,000円(税込) / 139,000円(税込) |
| 個人名・故人名・喪主名・顧客特定情報 | データ・本文に含まれない ✅ |

`.env*` / `FORM_WEBHOOK_SECRET` は一切読まず・触らず・出力していません。

---

## 10. 次フェーズ候補

### 推奨フォローアップ

1. **Search Console での sitemap.xml 再送信**：新規 5 URL のクロールを促進
2. **Search Console URL Inspection**：5 URL の「公開 URL をテスト」で構造化データ認識を確認
3. **Google Rich Results Test**：5 URL × 3 種類（BreadcrumbList / FAQPage / FuneralHome）の妥当性検証

### 次の開発フェーズ

- **Batch 2**：神根・新郷・芝・安行・上青木・青木 の 6 エリア追加
  - slug: `kanne` / `shingo` / `shiba` / `angyo` / `kamiaoki` / `aoki`
  - 同じパターンで実装可能、データ草稿の追加作成が必要
- **既存エリアページから新規 5 エリアへの相互リンク追加**
  - `areaKawaguchi` / `areaAraijuku` / `areaHatogaya` の `relatedLinks` 拡張
  - araijuku/hatogaya の page.tsx 内 `relatedLinks` 配列を編集
- **`docs/03-improvement-roadmap.md` の P1-4 を「Batch 1 完了」状態に更新**

### 後回しタスク（P0-6 残タスク）

- `@id` のサイト全体統一（`lib/company.ts` の `getLocalBusinessJsonLd()` ヘルパー集約）
- Search Console / Rich Results Test の継続実行と記録蓄積

---

## 11. 関連ドキュメント

- `CLAUDE.md` — Claude Code 常時ルール
- `docs/01-seo-aio-policy.md` — SEO / AIO 方針
- `docs/03-improvement-roadmap.md` — 改修ロードマップ（P1-4 該当）
- `docs/05-content-guidelines.md` — コンテンツガイドライン
- `docs/eval/seo-aio-checklist.md` — 評価チェックリスト
- `docs/eval/records/2026-05-p0-seo-aio-completion.md` — P0 完了サマリー
