# Search Console「ページがインデックスに登録されない新しい要因」対応ログ（リダイレクトエラー / 404）

## 1. 作業名

Search Console から通知された「ページがインデックスに登録されない新しい要因」のうち、
「ページにリダイレクトがあります」「リダイレクト エラー」「見つかりませんでした（404）」への調査・分類・対応。

## 2. 実施日

2026-05-25 〜 2026-05-26

## 3. 背景

Search Console Team から「ページがインデックスに登録されない新しい要因」の通知が届いた。
対象要因は以下の3つを中心に、未登録カテゴリを併せて確認した。

| 要因 | 件数 |
|---|---|
| 見つかりませんでした（404） | 7 |
| ページにリダイレクトがあります | 6 |
| リダイレクト エラー | 5 |
| noindex タグによって除外されました | 3 |
| 重複しています。ユーザーにより、正規ページとして選択されていません | 1 |
| 検出 - インデックス未登録 | 94 |
| クロール済み - インデックス未登録 | 23 |

本ログは「リダイレクト エラー」と「404」を中心に、調査結果・判断・対応・観測計画を記録する。
「noindex」「重複」「検出/クロール済み未登録」の各カテゴリは別タスクで個別調査予定。

## 4. 「リダイレクト エラー」側の調査結果

### 4.1 対象 URL（5 件）

- https://kawaguchitenrei.com/voice/
- https://kawaguchitenrei.com/contact/
- https://kawaguchitenrei.com/estimate/
- https://kawaguchitenrei.com/column/
- https://kawaguchitenrei.com/plan/

### 4.2 本番 curl 確認結果

| URL | HTTP | リダイレクト段数 | 最終到達 URL | 判定 |
|---|---|---|---|---|
| /voice/ | **200** | 0 | /voice/ | 正規・正常 |
| /contact/ | **200** | 0 | /contact/ | 正規・正常 |
| /estimate/ | **200** | 0 | /estimate/ | 正規・正常 |
| /column/ | **200** | 0 | /column/ | 正規・正常 |
| /plan/ | **200** | 0 | /plan/ | 正規・正常 |
| /voice（末尾なし） | 200 | 1 | /voice/ | trailingSlash 由来 1 段 308・正常 |
| /plan（末尾なし） | 200 | 1 | /plan/ | trailingSlash 由来 1 段 308・正常 |

### 4.3 コード側確認

- `next.config.ts` の `trailingSlash: true` 設定済み
- `app/sitemap.ts` のすべての URL が末尾スラッシュ付きで統一
- `alternates.canonical` がすべて末尾スラッシュ付き
  - `/voice/` `/contact/` `/estimate/` `/column/` `/plan/` すべて確認済み
- 内部リンク（`href="/voice/"` 等）も末尾スラッシュ付きで統一済み、末尾なし版は 0 件
- `redirects()` の destination もすべて末尾スラッシュ付きで統一

### 4.4 判断

- 5 URL とも**現行サイトの正規 URL**であり、リダイレクト先側
- 本番でリダイレクトループ・異常チェーンなし
- **コード側に直すべき問題はない**
- Search Console 側の古いクロール情報・キャッシュ由来（過去の旧 URL `/koe → /voice/`、`/chokusou → /plan/`、`/questionnaire → /column/` 等の連鎖の名残）の可能性が高い

## 5. 「見つかりませんでした（404）」側の調査結果

### 5.1 対象 URL（7 件）と分類

| URL | 現状 | 分類 | 対応 |
|---|---|---|---|
| https://kawaguchitenrei.com/cases | 404 | 旧 URL・301 リダイレクト候補 | **今回追加** → /case/ |
| https://kawaguchitenrei.com/★このページのスラッグ | 404 | 不正 URL・テンプレート残骸 | **放置**（404 のまま） |
| https://kawaguchitenrei.com/kawaguchi/main | 既存 301 | 既存対応済み | Search Console 側「修正を検証」 |
| https://kawaguchitenrei.com/case/hanairo-owakarekai | 404 | 旧 URL・301 リダイレクト候補 | **今回追加** → /case/ |
| https://kawaguchitenrei.com/hall | 404 | 旧 URL・301 リダイレクト候補 | **今回追加** → /hall/kawaguchi-memorial-hall/ |
| https://kawaguchitenrei.com/plank | 404 | 旧 URL or typo・外部参照確度低 | **保留** |
| https://kawaguchitenrei.com/our-business | 404 | 旧 URL・外部参照確度低 | **保留** |

### 5.2 既存リダイレクト確認（参考）

- `/kawaguchi/main` は `next.config.ts:498-505` に **既に 301 設定済み**（destination: `/area/kawaguchi/`）
- 本番 curl で `/kawaguchi/main` → `/area/kawaguchi/` への 301 を確認済み
- → Search Console のキャッシュが古いだけ。SC 側で「修正を検証」を押下することで解消見込み

### 5.3 「放置」「保留」の理由

- **`/★このページのスラッグ`**: コード・docs・public いずれにも該当文字列なし。旧 CMS（Wix / Jimdo 等）のテンプレートプレースホルダがクロールされた残骸と推定。不正 URL のため 404 のままが正解
- **`/plank` `/our-business`**: 現コードに該当なし。外部参照（旧サイト・名刺・SNS・第三者リンク）の確度が不明のため、本対応では追加しない。今後 SC のリンク元レポートで外部参照が確認できた場合は別タスクで個別追加判断

## 6. 実装内容（commit `310cfe8`）

### 6.1 追加した 301 リダイレクト

`next.config.ts` の `redirects()` 配列末尾に 6 エントリを追加。

| source | destination | 種別 |
|---|---|---|
| /cases | /case/ | permanent |
| /cases/ | /case/ | permanent |
| /case/hanairo-owakarekai | /case/ | permanent |
| /case/hanairo-owakarekai/ | /case/ | permanent |
| /hall | /hall/kawaguchi-memorial-hall/ | permanent |
| /hall/ | /hall/kawaguchi-memorial-hall/ | permanent |

### 6.2 commit 情報

- commit hash（full）: `310cfe84ee58a512b9d6f65946aacbbc198d908b`
- commit hash（short）: `310cfe8`
- commit message: `Add redirects for legacy Search Console 404 URLs`
- 変更ファイル: `next.config.ts`（+30 行 / -0 行）
- ブランチ: `main`
- リモート: `origin/main` push 済み

### 6.3 実装時の安全確認

| 項目 | 結果 |
|---|---|
| `npm run build` | ✅ 成功 |
| TypeScript エラー | ✅ なし |
| 静的生成ページ数 | ✅ 132 / 132 維持 |
| 変更ファイル | ✅ `next.config.ts` のみ |
| 差分行数 | ✅ +30 / -0 |
| `.env` / `.env.local` / 環境変数 | ✅ 未接触 |
| `app/api` / Webhook / GAS | ✅ 未接触 |
| `Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx` | ✅ 未接触 |
| `package.json` / lockfile | ✅ 未接触 |
| `noindex` / `robots.txt` / `canonical` / `sitemap` | ✅ 未変更 |
| 既存リダイレクトの上書き | ✅ なし（純粋な追加のみ） |

### 6.4 本番反映後の curl 確認

| URL | HTTP | 段数 | 最終 URL | 判定 |
|---|---|---|---|---|
| /cases | 200 | 2 | /case/ | ✅ |
| /cases/ | 200 | 1 | /case/ | ✅ |
| /case/hanairo-owakarekai | 200 | 2 | /case/ | ✅ |
| /case/hanairo-owakarekai/ | 200 | 1 | /case/ | ✅ |
| /hall | 200 | 2 | /hall/kawaguchi-memorial-hall/ | ✅ |
| /hall/ | 200 | 1 | /hall/kawaguchi-memorial-hall/ | ✅ |

末尾スラッシュなし版が 2 段なのは「trailingSlash で `/` 付与（308）→ 301 本体」の正常パターン。
Google 推奨の 3 段以下に収まっており、ループ・異常なし。

既存正規 URL（/voice/ /contact/ /estimate/ /column/ /plan/）はリグレッションなし、全て 200 / 0 redirects を維持。

## 7. Search Console で次に行う確認

### 7.1 「修正を検証」を実施

404 として出ていた URL について、追加リダイレクト・既存リダイレクトが効いていることを Google に再評価してもらう。

URL 検査 → 「公開 URL をテスト」→ 問題なければ「修正を検証」を実行。

- https://kawaguchitenrei.com/cases
- https://kawaguchitenrei.com/cases/
- https://kawaguchitenrei.com/case/hanairo-owakarekai
- https://kawaguchitenrei.com/case/hanairo-owakarekai/
- https://kawaguchitenrei.com/hall
- https://kawaguchitenrei.com/hall/
- https://kawaguchitenrei.com/kawaguchi/main（既存リダイレクト済み）

### 7.2 「リダイレクト エラー」5 URL の対応

5 URL は現行の正規 URL（200 / 0 redirects）のため、コード変更は不要。
Search Console 側で「公開 URL をテスト」→ 問題なければ「インデックス登録をリクエスト」で再クロール促進。

- https://kawaguchitenrei.com/voice/
- https://kawaguchitenrei.com/contact/
- https://kawaguchitenrei.com/estimate/
- https://kawaguchitenrei.com/column/
- https://kawaguchitenrei.com/plan/

### 7.3 「ページにリダイレクトがあります」6 URL の対応

「リダイレクトされてインデックス未登録」のカテゴリは正常動作（旧 URL → 新 URL の 301）であり、
リダイレクト元 URL がインデックスされないこと自体は SEO 上の問題ではない。
本ログでは個別対応せず、観測対象として保持。

## 8. 今後の観測

| 時期 | 観測項目 |
|---|---|
| 数日後（2026-05-28 頃） | Search Console 上で 404 件数・リダイレクトエラー件数の減少傾向 |
| 1〜2 週間後（2026-06 上旬） | 「検出 - インデックス未登録」「クロール済み - インデックス未登録」の URL 内容を再確認。コンテンツ品質・内部リンク・サイト構造の観点で別タスク化が必要か判断 |
| 2〜4 週間後（2026-06 中旬〜下旬） | 主要正規 URL のインデックス登録状況・表示回数・クリック数の変化を確認 |

## 9. 別タスク候補（本ログでは対応しない）

- 「noindex タグによって除外されました」3 件の URL 特定と意図確認
- 「重複しています。ユーザーにより、正規ページとして選択されていません」1 件の canonical 設計確認
- 「検出 - インデックス未登録」94 件のサンプリング調査（コンテンツ品質・サイト構造の影響評価）
- 「クロール済み - インデックス未登録」23 件のサンプリング調査
- `/plank` `/our-business` の外部参照確度確認（SC のリンク元レポート活用）
- Search Console の表示回数増加に向けた、エリアページ・斎場ページ・施行事例ページの SEO/AIO 強化（既存ロードマップ通り継続）

## 10. 注意事項

- **インデックス登録リクエスト = Google に検査・登録を依頼した状態**であり、「インデックス登録完了」を保証するものではない（実際の反映は Google 側の処理待ち、数時間〜数日かかる場合あり）
- 同一 URL への短期間の繰り返しリクエストは Google のガイドライン違反のリスクがあるため**行わない**
- **noindex / robots.txt / canonical / sitemap.xml の削除系・除外系変更は行っていない**
- **Search Console の URL 削除リクエストは行っていない**
- **`/plank` `/our-business` のリダイレクトは今回追加していない**（外部参照確度を別タスクで確認してから判断）
- **`/★このページのスラッグ` のリダイレクトは追加しない**（不正 URL は 404 のまま正解）

## 11. 関連ファイル・リンク

- 実装コミット: `310cfe8 Add redirects for legacy Search Console 404 URLs`
- 変更ファイル: `next.config.ts`
- 関連 docs:
  - `docs/operations/search-console/README.md`（SC 作業ログ全体目次）
  - `docs/operations/search-console/2026-05-saijo-url-inspection-log.md`
  - `docs/operations/search-console/2026-05-case-and-plan-url-inspection-log.md`
  - `docs/operations/search-console/2026-05-url-inspection-priority-after-case.md`
- 関連 skill: `skills/search-console-log/SKILL.md`
