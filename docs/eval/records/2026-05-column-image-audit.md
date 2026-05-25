# コラム画像 棚卸し記録（2026-05-25）

## 1. 作業目的

`/column/` 配下 44 記事の画像設定状況を棚卸しし、画像なし・画像パス切れ・alt 不足・OGP 不足の記事を洗い出す。

本記録は分析結果の保存版。実装そのものは別タスクで段階的に行う（フェーズ A → B → C）。

## 2. 確認対象

- データ層: `lib/columns.ts`（6029 行、44 記事）
- 一覧ページ: `app/column/page.tsx`
- 詳細ページ: `app/column/[slug]/page.tsx`
- 画像配置先: `public/images/column/<slug>/`

## 3. コラム記事の完全リスト（44 件）と heroImage 設定状況

awk による完全突合の結果:

### heroImage 設定済み（36 件）

| # | slug | カバー画像 |
|---|---|---|
| 1 | `kouden_souba` | `/images/column/kouden_souba/cover.jpg` |
| 2 | `yonaka` | `/images/column/yonaka/cover.png` |
| 3 | `meguri` | `/images/column/meguri/cover.jpg` |
| 4 | `kawaguchi_kazokusou` | `/images/column/kawaguchi_kazokusou/cover.jpg` |
| 5 | `hansou` | `/images/column/hansou/cover.png` |
| 6 | `sougisya` | `/images/column/sougisya/cover.png` |
| 7 | `hojokin` | `/images/column/hojokin/cover.png` |
| 8 | `mosyu` | `/images/column/mosyu/cover.png` |
| 9 | `sougi_flow` | `/images/column/sougi_flow/cover.jpg` |
| 10 | `kazokusou` | `/images/column/kazokusou/cover.jpg` |
| 11 | `Nofuneral` | `/images/column/Nofuneral/cover.jpg` |
| 12 | `Byouinchou` | `/images/column/Byouinchou/cover.png` |
| 13 | `miaaou` | `/images/column/miaaou/cover.png` |
| 14 | `souzoku` | `/images/column/souzoku/cover.jpg` |
| 15 | `syuuha` | `/images/column/syuuha/cover.jpg` |
| 16 | `yukan` | `/images/column/yukan/cover.jpg` |
| 17 | `sousaihi` | `/images/column/sousaihi/cover.jpg` |
| 18 | `jitaku_sou` | `/images/column/jitaku_sou/cover.jpg` |
| 19 | `shinsiki` | `/images/column/shinsiki/cover.jpg` |
| 20 | `fuhou` | `/images/column/fuhou/cover.jpg` |
| 21 | `jiyusou` | `/images/column/jiyusou/cover.png` |
| 22 | `hiyou` | `/images/column/hiyou/cover.png` |
| 23 | `syuukatu` | `/images/column/syuukatu/cover.png` |
| 24 | `seshu-moshu` | `/images/column/seshu-moshu/cover.png` |
| 25 | `chokusou-fukusou` | `/images/column/chokusou-fukusou/cover.png` |
| 26 | `ichinichi-sou` | `/images/column/ichinichi-sou/cover.png` |
| 27 | `butumetu` | `/images/column/butumetu/cover.png` |
| 28 | `fukusouhin` | `/images/column/fukusouhin/cover.png` |
| 29 | `mushukyo-sou` | `/images/column/mushukyo-sou/cover.png` |
| 30 | `jitakusou-merit` | `/images/column/jitakusou-merit/cover.png` |
| 31 | `sousai-fujo` | `/images/column/sousai-fujo/cover.png` |
| 32 | `kenan` | `/images/column/kenan/cover.png` |
| 33 | `kenshi-nagare` | `/images/column/kenshi-nagare/cover.png` |
| 34 | `2026s_sougi` | `/images/column/2026s_sougi/cover.png` |
| 35 | `nenmastu` | `/images/column/nenmastu/cover.png` |
| 36 | `sougi_nattoku` | `/images/column/sougi_nattoku/cover.png` |

### heroImage 未設定（8 件）

| # | slug | 画像ディレクトリ | 備考 |
|---|---|---|---|
| 1 | `sougidai` | ⚠ 存在（`image-02.png` / `image-03.jpg` のみ、`cover.*` なし） | body 内画像はあるが Hero 用 cover 未配置 |
| 2 | `obon` | ❌ なし | 完全未配置 |
| 3 | `bukkyou-shuha-13` | ❌ なし | 完全未配置 |
| 4 | `shibou-todoke` | ❌ なし | 完全未配置 |
| 5 | `yujinso-sokagakkai` | ❌ なし | 完全未配置 |
| 6 | `kazokusou-missou` | ❌ なし | **家族葬プラン直結キーワード** |
| 7 | `saidan-kazokusou` | ❌ なし | **家族葬プラン関連** |
| 8 | `gojokai-kaiyaku` | ❌ なし | 完全未配置 |

> 前回の現状分析で「9 件」と記載したが、awk による完全突合の結果、正しくは **8 件**。

## 4. 問題分類

| 分類 | 件数 | 詳細 |
|---|---|---|
| A: 画像あり・問題なし | 36 | heroImage 設定済み・画像ファイル実在 |
| B: 画像なし | 8 | 上記 8 件 |
| C: 画像パス切れ | 0 | heroImage 指定の 36 件はすべて画像ファイル実在 |
| D: alt 不足 | 0 | 36 件すべて alt あり（ただし汎用的、改善余地） |
| E: OGP 不足 | **全 44** | `generateMetadata` に `openGraph.images` 未設定（フェーズ A で対応） |
| F: 内容ミスマッチ | 個別目視未実施 | 別タスク |
| G: 個人情報・権利リスク | 個別 Privacy Review 未実施 | 別タスク |
| H: 画像サイズ重い | 未検証 | 別タスク |

## 5. 既存 OGP 設定（フェーズ A 対応前の現状）

`app/column/[slug]/page.tsx` の `generateMetadata`:

```ts
openGraph: {
  title: `${article.title} | 川口典礼 コラム`,
  description,
  url: `/column/${article.slug}/`,
  type: "article",
  publishedTime: article.publishedAt,
  modifiedTime: article.updatedAt,
  // openGraph.images が指定されていない
}
```

- `BlogPosting` JSON-LD には `heroImage.src` が `image` / `thumbnailUrl` として反映済み
- HTML `<meta property="og:image">` には反映されていない
- SNS 共有時の表示が貧弱

## 6. 実装フェーズ計画

### フェーズ A: OGP 画像転用（本タスクで実施）

| 項目 | 内容 |
|---|---|
| 対象 | `app/column/[slug]/page.tsx` の `generateMetadata` 1 ファイル |
| 改修 | `article.heroImage` がある場合のみ `openGraph.images` を設定 |
| heroImage なし 8 件 | OG image も未設定のまま（無理に設定しない） |
| 影響範囲 | 36 記事の OGP 強化、8 記事は現状維持 |
| 副作用 | なし（既存 alt / canonical / description は維持） |

### フェーズ B: 画像なし 8 件への画像追加（別タスク）

| 項目 | 内容 |
|---|---|
| 必要なもの | 8 件の cover 画像（人間側で用意 or AI 生成、Privacy Review 通過） |
| 改修対象 | `public/images/column/<slug>/cover.*` 配置 + `lib/columns.ts` に heroImage 追加 |
| 優先候補 | `kazokusou-missou` / `saidan-kazokusou`（家族葬プラン直結） |

### フェーズ C: alt 具体化（別タスク、優先度中）

36 件の alt を「○○に関する記事イメージ」→ 具体的な画像内容に書き換え。AIO 観点で効果あり。

## 7. 安全確認

| 項目 | 結果 |
|---|---|
| 個人情報リスク（既存 36 画像の目視） | ⚠ 別タスク（Privacy Review 必要） |
| 画像サイズ最適化 | 別タスク |
| 内容ミスマッチ | 別タスク |
| AI 生成画像の品位確認 | フェーズ B 実施時に対応 |

## 8. 関連ドキュメント

- 実装記録（フェーズ A）: `docs/eval/records/2026-05-column-ogp-implementation.md`（フェーズ A 実装と同コミットで作成予定 or 別途）
- SEO/AIO 改善 Skill: `skills/seo-page-improvement/SKILL.md`
- Privacy Review Skill: `skills/privacy-review-jp/SKILL.md`
- CLAUDE.md §13（画像取り扱い）

## 9. 関連コミット履歴

- 本記録の保存と同コミットで `app/column/[slug]/page.tsx` のフェーズ A 改修を実施
