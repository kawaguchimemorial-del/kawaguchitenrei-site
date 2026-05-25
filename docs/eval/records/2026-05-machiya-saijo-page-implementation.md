# 町屋斎場ページ実装 完了記録（push 前停止状態）

## 作業目的

東京博善が運営する**町屋斎場**（東京都荒川区町屋）について、川口典礼でのご葬儀相談・手配の受け皿となるページを `/saijo/machiya-saijo/` として新設する。

既存の戸田葬祭場（`/saijo/toda-sousaijyo/`）・谷塚斎場（`/saijo/yatsuka-saijo/`）と同じ「火葬場併設型」斎場詳細ページとして実装し、川口市・荒川区・足立区・北区方面からのご相談に対応する旨を明示する。

## 追加ページ URL

- **`/saijo/machiya-saijo/`**
- 本番予定 URL: https://kawaguchitenrei.com/saijo/machiya-saijo/

## 変更ファイル一覧（6 ファイル / +327 行）

| # | ファイル | 変更内容 | 差分 |
|---|---|---|---|
| 1 | `lib/saijo.ts` | `saijoMachiya: Saijo` const 新規追加 + `saijoList` 配列に追加 | +297 行 |
| 2 | `app/saijo/machiya-saijo/page.tsx`（新規） | 町屋斎場詳細ページ本体（Place / BreadcrumbList / FAQPage JSON-LD + 既存共通コンポーネント呼び出し + Related Links 8 件） | 新規 217 行 |
| 3 | `app/saijo/page.tsx` | `publicSaijo` 配列に町屋斎場カード追加（4 件目） | +12 行 |
| 4 | `app/sitemap.ts` | `/saijo/machiya-saijo/` priority 0.7 で追加 | +6 行 |
| 5 | `app/saijo/toda-sousaijyo/page.tsx` | `relatedLinks` に町屋斎場リンク追加（相互内部リンク） | +6 行 |
| 6 | `app/saijo/yatsuka-saijo/page.tsx` | `relatedLinks` に町屋斎場リンク追加（相互内部リンク） | +6 行 |

## 東京博善公式情報の参照

| 項目 | 出典 URL |
|---|---|
| 町屋斎場 施設情報（所在地・アクセス・式場・火葬炉・控室・設備） | https://www.tokyohakuzen.co.jp/funeral-hall/machiya/ |
| 料金情報（火葬料金・式場使用料・控室料金・保棺料金） | https://www.tokyohakuzen.co.jp/guide/ryokin/ |
| 参照日 | 2026-05-25 |

公式情報の扱い:
- **丸写しせず要約**して使用
- 公式画像は **使用せず**、配置済み加工画像 2 枚のみを使用
- 料金は **「東京博善公式料金に基づく目安(2026-05-25時点)」**として表で掲載
- 各料金表の footnotes に「料金は変更される可能性があるため、最新の料金は川口典礼で確認のうえご案内します」を明記
- `importantNotice` に「最新の料金・利用条件・空き状況は変更となる場合があるため、川口典礼で確認のうえご案内します」を明記
- `feeTablesNote` にも同等の注意書きを記載
- **区民葬については本文・料金表で触れず**（既に取扱終了済みのため）

## 料金表記の内容

`lib/saijo.ts` の `saijoMachiya.feeTables` に以下 4 表を掲載:

### 火葬料金一覧
| 区分 | 大人 | 小人 |
|---|---|---|
| 特別殯館(2炉) | 160,000円 | 88,000円 |
| 特別室(2炉) | 123,000円 | 63,500円 |
| 普通炉(8炉) | 87,000円 | 50,000円 |
| 減額・公費(普通炉のみ) | 39,000円 | 21,000円 |

### 式場使用料一覧（税込）
| 式場種別 | 料金 |
|---|---|
| 一体型式場「旅」(2室) | 209,000円 |
| 一体型式場「雪」(3室) | 242,000円 |
| 専用控室有り式場「雪」(10室) | 286,000円 |

### 控室料金一覧（税込）
| 部屋名 | 料金 |
|---|---|
| 鶴の間 | 74,800円 |
| 星の間 | 40,700円 |
| 月の間 | 34,100円 |
| 梅の間 | 19,800円 |

### 保棺料金一覧（税込）
| 種別 | 一般 | 減額・公費 |
|---|---|---|
| 冷蔵保棺 | 9,900円 | 5,830円 |
| 一般保棺 | 6,600円 | 2,750円 |

すべて公式料金に基づく目安として明記。最新確認前提。

## 画像使用箇所と画像表現

### 配置済み画像 2 枚（commit `2080375` で配置済み）

| ファイル | 使用箇所 | alt | キャプション |
|---|---|---|---|
| `/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-02.png`（遠景・式場全体） | (1) Hero aside（`SaijoDetailIntro`）/ (2) OpenGraph image / (3) Place JSON-LD image / (4) /saijo/ 一覧カード / (5) `SaijoGallery` の 1 枚目 | 町屋斎場の式場内(椅子配置と祭壇) | 町屋斎場での施行写真をもとに、個人情報保護のため加工した画像です。 |
| `/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-01.png`（近景・祭壇） | `SaijoGallery` の 2 枚目 | 町屋斎場の式場内の祭壇と供花(個人情報保護のため加工済み) | 町屋斎場での施行写真をもとに、個人情報保護のため加工した画像です。 |

### 画像表現方針

- **「実際の施行写真」とは断定しない**
- **「AI 生成画像」とも断定しない**
- 統一文言: **「町屋斎場での施行写真をもとに、個人情報保護のため加工した画像です」**
- `photosLead` でも「町屋斎場での川口典礼の施行実績をもとに、個人情報保護のため加工した画像を掲載しています」と明記

### push 前確認待ち

画像表現の確定（実際の施行写真として扱うか / 加工済み画像として扱うか）は、本コミットでは「**加工済み画像**」表現で実装している。**push 前に人間確認を求める**ため、本実装の停止理由の一つとして報告。

## 安全確認

| 項目 | 結果 |
|---|---|
| 禁止表現（必ず利用 / 空きがあります / 追加費用なし / 総額確定 / 最安 / 宗派問わず必ず） | ✅ **0 件**（grep 確認） |
| 「川口典礼の運営施設」grep 検出 | ⚠ 2 件検出だが、いずれも「**川口典礼の運営施設ではありません**」と**否定文脈**での出現。誤認させる表現ではない |
| `aggregateRating` / `ratingValue` / `"@type":"Review"` | ✅ **0 件**（追加なし） |
| 東京博善公式画像の流用 | ✅ なし（配置済み 2 画像のみ使用） |
| 配置済み画像以外の画像参照 | ✅ なし |
| `app/api/**` / `app/contact/**` / `app/estimate/**` 差分 | ✅ なし |
| `.env*` / Webhook / secrets / credentials | ✅ 未接触 |
| `package.json` / lockfile / `next.config.ts` 差分 | ✅ なし |
| `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx` 差分 | ✅ なし |
| `funeral-system/` 差分 | ✅ なし |
| `public/images/tmp/tmp.txt` 接触 | ✅ 未接触 |
| 個人名・故人名・喪主名の本文記載 | ✅ なし |
| 区民葬についての本文記載 | ✅ なし（既に取扱終了済みのため触れず） |

## build 結果

```
✓ Compiled successfully in 3.5s
  Finished TypeScript in 4.1s ...
✓ Generating static pages using 23 workers (132/132) in 668ms
```

- ✅ TypeScript pass
- ✅ **131 → 132/132 static pages**（町屋斎場ページ 1 ページ追加で予定通り）
- ✅ エラー・警告なし

## 静的生成ページ数の変化

| Before | After | 差分 |
|---|---|---|
| 131 | 132 | +1（`/saijo/machiya-saijo/`） |

## 採用したセクション構成

| # | セクション | 採用 |
|---|---|---|
| 1 | SaijoDetailIntro（Hero + aside 画像） | ✅ |
| 2 | SaijoImportantNotice（運営主体明示） | ✅ |
| 3 | SaijoGallery（画像 2 枚） | ✅ |
| 4 | SaijoFeatures | ✅ |
| 5 | SaijoCremationFurnaces（火葬炉一覧） | ❌ 省略（火葬炉個別画像なし） |
| 6 | SaijoHallRooms（式場一覧） | ❌ 省略（式場個別画像なし） |
| 7 | SaijoCremationWaitingRooms（控室一覧） | ❌ 省略（控室個別画像なし） |
| 8 | SaijoFlow | ✅ |
| 9 | SaijoMidCta | ✅ |
| 10 | SaijoOurSupport | ✅ |
| 11 | SaijoAvailablePlans | ✅ |
| 12 | SaijoFacilityInfo（火葬炉・控室・式場の文字情報を網羅） | ✅ |
| 13 | SaijoFeeTables（4 表：火葬・式場・控室・保棺） | ✅ |
| 14 | SaijoAccess | ✅ |
| 15 | SaijoFaq（8 問） | ✅ |
| 16 | Related Links（8 件） | ✅ |
| 17 | SaijoCta | ✅ |

**省略理由**: 火葬炉・式場・控室の個別画像が配置されていないため、`SaijoCremationFurnaces` / `SaijoHallRooms` / `SaijoCremationWaitingRooms` は呼ばず、その代わりに `SaijoFeatures` / `SaijoFacilityInfo` で網羅した。`SaijoFeeTables` で詳細料金は表として掲載。

## /saijo/ 一覧カード追加

`app/saijo/page.tsx` の `publicSaijo` 配列に **4 件目**として町屋斎場を追加。

| name | href | badge | summary |
|---|---|---|---|
| 町屋斎場 | `/saijo/machiya-saijo/` | 式場・火葬場併設 | 荒川区町屋にある東京博善運営の火葬場併設斎場。町屋斎場でのお見送りについてもご相談いただけます。 |

カード画像は配置済み `/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-02.png` を使用。alt は「町屋斎場の式場内(椅子配置と祭壇)」。

## 戸田葬祭場・谷塚斎場からの Related 追加

| 追加先 | 追加リンク |
|---|---|
| `app/saijo/toda-sousaijyo/page.tsx` | label「町屋斎場」/ description「荒川区町屋の火葬場併設斎場。町屋斎場でのお見送りもご相談いただけます。」/ href `/saijo/machiya-saijo/` |
| `app/saijo/yatsuka-saijo/page.tsx` | 同上 |

挿入位置: 「川口メモリアルホール」リンクの直後（自社式場 → 他斎場の自然な並び）。

## Search Console 登録候補

push 後、Vercel デプロイ完了確認後に以下を Search Console URL 検査ツールに登録:

| URL | 優先度 |
|---|---|
| https://kawaguchitenrei.com/saijo/machiya-saijo/ | 高（新規ページ） |
| https://kawaguchitenrei.com/saijo/ | 中（publicSaijo 更新による） |
| https://kawaguchitenrei.com/saijo/toda-sousaijyo/ | 低（relatedLinks 更新による） |
| https://kawaguchitenrei.com/saijo/yatsuka-saijo/ | 低（relatedLinks 更新による） |

観測候補キーワード:
- 町屋斎場 葬儀
- 町屋斎場 家族葬
- 町屋斎場 料金
- 町屋斎場 火葬
- 川口市 町屋斎場
- 荒川区 葬儀（副軸）
- 足立区 家族葬（副軸）
- 北区 葬儀（副軸）

## push 前停止理由（複合）

以下 2 つの判断のため、commit までで停止し **push は行わない**:

1. **料金表掲載**: 公式料金に基づくとはいえ、サイトに金額表を初出で掲載するため、CLAUDE.md §19.2「価格データの新規追加」に該当 → 人間承認必須
2. **画像表現の最終判断**: 「町屋斎場での施行写真をもとに、個人情報保護のため加工した画像」表現を採用したが、本表現が町屋斎場ページとして適切か（「実際の施行写真」とすべきか、「イメージ画像」とすべきか）を人間に確認

## 関連コミット履歴

- `2080375` Add Machiya Saijo ceremony images（画像配置）
- `1a5e03e` Add saijo area link observation checklist
- `e8cdc70` Add area links to saijo venue anchors
- `fd36299` Document temple hall section expansion
- `d71a507` Expand temple hall section by area with 16 venues

## 関連ドキュメント

- 画像配置記録: `docs/eval/records/2026-05-machiya-saijo-image-placement.md`
- /saijo/ 強化記録: `docs/eval/records/2026-05-saijo-temple-hall-expansion.md`
- 観測チェックリスト: `docs/operations/search-console/2026-05-saijo-area-link-observation-checklist.md`
- SEO/AIO 改善 Skill: `skills/seo-page-improvement/SKILL.md`
- Privacy Review Skill: `skills/privacy-review-jp/SKILL.md`
- 出典: 東京博善公式 https://www.tokyohakuzen.co.jp/funeral-hall/machiya/ / https://www.tokyohakuzen.co.jp/guide/ryokin/
