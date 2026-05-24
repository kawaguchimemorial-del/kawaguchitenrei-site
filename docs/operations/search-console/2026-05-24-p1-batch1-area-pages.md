# Search Console 作業記録: P1 Batch 1 エリアページ

## 概要
- 対象施策: P1 Batch 1 エリアページ追加
- 関連コミット: e588b2a Add 5 new area pages for P1 Batch 1
- 関連docs: docs/eval/records/2026-05-p1-batch1-area-pages.md
- 作業目的:
  - sitemap.xml の再送信
  - 新規5URLのURL検査
  - 公開URLテスト
  - インデックス登録リクエスト

## 対象サイトマップ
- https://kawaguchitenrei.com/sitemap.xml

## 対象URL
- https://kawaguchitenrei.com/area/nishikawaguchi/
- https://kawaguchitenrei.com/area/higashikawaguchi/
- https://kawaguchitenrei.com/area/kawaguchi-motogo/
- https://kawaguchitenrei.com/area/minami-hatogaya/
- https://kawaguchitenrei.com/area/tozuka-angyo/

## 作業チェックリスト

### sitemap.xml 再送信
- [x] Search Consoleでプロパティを確認
- [x] サイトマップ画面を開く
- [x] sitemap.xml を送信
- [x] ステータスを確認
- 結果:
  - 完了（2026-05-24 実施）
  - メモ: エラーなし。Search Console 上で sitemap.xml を再送信済み。

### URL検査: 西川口
- URL: https://kawaguchitenrei.com/area/nishikawaguchi/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 東川口
- URL: https://kawaguchitenrei.com/area/higashikawaguchi/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 川口元郷
- URL: https://kawaguchitenrei.com/area/kawaguchi-motogo/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 南鳩ヶ谷
- URL: https://kawaguchitenrei.com/area/minami-hatogaya/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 戸塚安行
- URL: https://kawaguchitenrei.com/area/tozuka-angyo/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

## 作業後の確認予定
- [ ] 数日後に Search Console の「ページのインデックス登録」を確認
- [ ] 必要に応じてURL検査で登録状況を再確認
- [ ] インデックス済みになったURLを追記
- [ ] エラーが出た場合は原因と対応を追記

## 注意事項
- Search Consoleの画面操作は手動作業
- 同じURLへのインデックス登録リクエストを短期間に何度も行わない
- sitemap.xml は本番反映後に送信する
- noindex / canonical / redirect の異常がある場合は、先にサイト側を修正する

## 補足（2026-05-24 時点）
- URL 検査・公開URLテスト・インデックス登録リクエストはすべて完了済み
- ただし、これは **「Google にインデックス登録リクエストを送信した」状態** であり、実際のインデックス反映は Google 側の処理待ち
- 「インデックス登録完了」とは別物。検索結果への反映は数時間〜数日かかることがある
- 同一URLへ短期間に再リクエストしない（Google のガイドラインに反する）
- 数日後に Search Console の「ページのインデックス登録」または URL 検査で登録状況を再確認する
