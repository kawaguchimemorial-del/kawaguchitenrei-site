# P1 Batch 1.5 完了記録: 内部リンク強化 & 新規5エリア hero 画像追加

## 実施日

- 2026-05-24

## 対象コミット

- `873c65a` Add internal links to new area pages
- `f1f6168` Add hero images for P1 Batch 1 area pages

push 後、本番反映を確認。

## 目的

1. P1 Batch 1 で追加した新規5エリアページを、サイト内から見つけやすくする
   - 既存3エリアページ（川口市・新井宿・鳩ヶ谷）からの内部リンクを追加
   - Google に新規ページの関連性を伝えやすくする
2. 新規5エリアページの地域感・視認性向上
   - 各駅周辺画像を hero に設定し、ユーザーに「自分のエリアに対応している」と直感的に伝える

## 変更内容

### 1. 既存3エリアページの関連リンク強化（`873c65a`）

| ページ | 変更前 | 変更後 | 主な追加 |
|---|---|---|---|
| `/area/kawaguchi/` | Related セクションなし | **新規追加 12件** | 新規5エリア + 既存2エリア + ホール/めぐりの森 + 家族葬/一日葬/直葬 |
| `/area/araijuku/` | 7件 | 10件 | 鳩ヶ谷 / 南鳩ヶ谷 / 東川口 / 戸塚安行（コラム削除） |
| `/area/hatogaya/` | 8件 | 10件 | 南鳩ヶ谷 / 川口元郷 / 戸塚安行（コラム削除） |

- 新規5エリアページ側の `relatedLinks` は既存構成が自然だったため**変更なし**
- 既存の重要導線（川口メモリアルホール／めぐりの森／家族葬／一日葬／直葬）は維持
- `/area/kawaguchi/` は中心ハブとして 12件まで許容し、リード文で「対応エリア＋主要サービス」と性質を明示

### 2. 新規5エリアの hero 画像追加（`f1f6168`）

- 画像5枚を `public/images/tmp/` から `public/images/area/{slug}/station.png` へ移動（既存命名規則 `araijuku/hatogaya` に準拠）
- `public/images/tmp/` フォルダは空になったため削除
- `lib/areas.ts` の新規5エリア定義に `heroImage` を追加

## 画像パス一覧（移動後の本番パス）

| エリア | 画像パス |
|---|---|
| 西川口 | `/images/area/nishikawaguchi/station.png` |
| 東川口 | `/images/area/higashikawaguchi/station.png` |
| 川口元郷 | `/images/area/kawaguchi-motogo/station.png` |
| 南鳩ヶ谷 | `/images/area/minami-hatogaya/station.png` |
| 戸塚安行 | `/images/area/tozuka-angyo/station.png` |

## 各エリアの heroImage 設定

| エリア | alt | caption |
|---|---|---|
| 西川口 | 西川口駅周辺の葬儀・家族葬に対応する川口典礼 | JR京浜東北線「西川口駅」周辺からのご相談に対応しています。 |
| 東川口 | 東川口駅周辺の葬儀・家族葬に対応する川口典礼 | JR武蔵野線・埼玉高速鉄道「東川口駅」周辺からのご相談に対応しています。 |
| 川口元郷 | 川口元郷駅周辺の葬儀・家族葬に対応する川口典礼 | 埼玉高速鉄道「川口元郷駅」周辺からのご相談に対応しています。 |
| 南鳩ヶ谷 | 南鳩ヶ谷駅周辺の葬儀・家族葬に対応する川口典礼 | 埼玉高速鉄道「南鳩ヶ谷駅」周辺からのご相談に対応しています。 |
| 戸塚安行 | 戸塚安行駅周辺の葬儀・家族葬に対応する川口典礼 | 埼玉高速鉄道「戸塚安行駅」周辺からのご相談に対応しています。 |

## 本番確認結果（2026-05-24）

### URL HTTP ステータス

| URL | HTTP | canonical |
|---|---|---|
| `/area/nishikawaguchi/` | 200 | `https://kawaguchitenrei.com/area/nishikawaguchi/` |
| `/area/higashikawaguchi/` | 200 | `https://kawaguchitenrei.com/area/higashikawaguchi/` |
| `/area/kawaguchi-motogo/` | 200 | `https://kawaguchitenrei.com/area/kawaguchi-motogo/` |
| `/area/minami-hatogaya/` | 200 | `https://kawaguchitenrei.com/area/minami-hatogaya/` |
| `/area/tozuka-angyo/` | 200 | `https://kawaguchitenrei.com/area/tozuka-angyo/` |
| `/area/kawaguchi/` | 200 | `https://kawaguchitenrei.com/area/kawaguchi/` |
| `/area/araijuku/` | 200 | `https://kawaguchitenrei.com/area/araijuku/` |
| `/area/hatogaya/` | 200 | `https://kawaguchitenrei.com/area/hatogaya/` |

- 全 8 URL が 200 OK
- canonical はすべて trailingSlash あり版で、リクエスト URL と一致

### 画像 URL 確認結果

| URL | HTTP | Content-Type |
|---|---|---|
| `/images/area/nishikawaguchi/station.png` | 200 | image/png |
| `/images/area/higashikawaguchi/station.png` | 200 | image/png |
| `/images/area/kawaguchi-motogo/station.png` | 200 | image/png |
| `/images/area/minami-hatogaya/station.png` | 200 | image/png |
| `/images/area/tozuka-angyo/station.png` | 200 | image/png |

- 全画像が 200 OK / image/png で配信されている（404 なし）

### hero 画像が本番 HTML に含まれているか

| ページ | 期待画像 | HTML 内検出 |
|---|---|---|
| `/area/nishikawaguchi/` | `/images/area/nishikawaguchi/station.png` | ✅ |
| `/area/higashikawaguchi/` | `/images/area/higashikawaguchi/station.png` | ✅ |
| `/area/kawaguchi-motogo/` | `/images/area/kawaguchi-motogo/station.png` | ✅ |
| `/area/minami-hatogaya/` | `/images/area/minami-hatogaya/station.png` | ✅ |
| `/area/tozuka-angyo/` | `/images/area/tozuka-angyo/station.png` | ✅ |

### alt / caption 一致確認（新規5エリア）

| エリア | alt | caption |
|---|---|---|
| 西川口 | ✅ 一致 | ✅「西川口駅」周辺からのご相談に対応しています |
| 東川口 | ✅ 一致 | ✅「東川口駅」周辺からのご相談に対応しています |
| 川口元郷 | ✅ 一致 | ✅「川口元郷駅」周辺からのご相談に対応しています |
| 南鳩ヶ谷 | ✅ 一致 | ✅「南鳩ヶ谷駅」周辺からのご相談に対応しています |
| 戸塚安行 | ✅ 一致 | ✅「戸塚安行駅」周辺からのご相談に対応しています |

### 関連リンク確認結果

**`/area/kawaguchi/`** — Related セクションに以下が含まれる:

- `/area/araijuku/` ✅（既存）
- `/area/hatogaya/` ✅（既存）
- `/area/nishikawaguchi/` ✅（新規）
- `/area/higashikawaguchi/` ✅（新規）
- `/area/kawaguchi-motogo/` ✅（新規）
- `/area/minami-hatogaya/` ✅（新規）
- `/area/tozuka-angyo/` ✅（新規）

**`/area/araijuku/`** — 期待される新規リンクが含まれる:

- `/area/hatogaya/` ✅
- `/area/minami-hatogaya/` ✅
- `/area/higashikawaguchi/` ✅
- `/area/tozuka-angyo/` ✅

**`/area/hatogaya/`** — 期待される新規リンクが含まれる:

- `/area/minami-hatogaya/` ✅
- `/area/kawaguchi-motogo/` ✅
- `/area/tozuka-angyo/` ✅

## 安全確認結果（本番 HTML スキャン）

### 禁止表現

| 表現 | 出現 |
|---|---|
| 最安 | なし ✅ |
| 必ず | なし ✅ |
| 絶対 | なし ✅ |
| 追加費用なし | なし ✅ |
| 総額確定 | なし ✅ |

### 未確認の距離・所要時間表現（新規5ページ）

- 「車で約N分」「駅から徒歩N分」のような未確認の距離・所要時間表現は新規5ページに**追加していない**
- 既存ページの「車で約5分」（めぐりの森まで）は事実として確定済みの既存表現で、今回追加・変更なし

### 個人情報

- 個人名・故人名・喪主名・顧客特定情報の追加なし
- 画像は駅周辺の風景で、人物の特定はできない

### 触っていないファイル

- `components/layout/Header.tsx` ✅
- `components/layout/Footer.tsx` ✅
- `components/layout/MobileBottomCTA.tsx` ✅
- `package.json` ✅
- `next.config.ts` ✅
- `.env*` ✅
- `funeral-system/` 配下 ✅

## 次回確認予定

- 数日後（目安：3〜7 日後）に Search Console の「ページのインデックス登録」または URL 検査で、新規5エリアのインデックス状況を再確認
  - 反映確認後、`docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md` に追記
- 既存エリアページの表示順や Related の件数バランスは、実際のユーザー動向（Search Console の検索クエリ、GA の遷移率など）を見て必要に応じて調整
  - とくに `/area/kawaguchi/` の 12件は多めなので、表示テスト結果次第で 8〜10件への絞り込みを検討
- 次は **P1 Batch 2 エリアページ設計** へ進む（対象エリアは別途検討）

## 関連ドキュメント

- 実装本体: `docs/eval/records/2026-05-p1-batch1-area-pages.md`
- Search Console 作業記録: `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
- 改修ロードマップ: `docs/03-improvement-roadmap.md`
