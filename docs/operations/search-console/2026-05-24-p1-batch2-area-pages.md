# Search Console 作業記録: P1 Batch 2 エリアページ

## 概要
- 対象施策: P1 Batch 2 エリアページ追加
- 関連コミット: 5c18ecc Add P1 Batch 2 area pages
- 関連docs: docs/eval/records/2026-05-p1-batch2-area-pages.md
- 作業目的:
  - sitemap.xml の再送信
  - 新規6URLのURL検査
  - 公開URLテスト
  - インデックス登録リクエスト

## 対象サイトマップ
- https://kawaguchitenrei.com/sitemap.xml

## 対象URL
- https://kawaguchitenrei.com/area/kamine/
- https://kawaguchitenrei.com/area/shingo/
- https://kawaguchitenrei.com/area/shiba/
- https://kawaguchitenrei.com/area/angyo/
- https://kawaguchitenrei.com/area/kamiaoki/
- https://kawaguchitenrei.com/area/aoki/

## 作業チェックリスト

### sitemap.xml 再送信
- [x] Search Consoleでプロパティを確認
- [x] サイトマップ画面を開く
- [x] sitemap.xml を送信
- [x] ステータスを確認
- 結果:
  - 完了（2026-05-24 実施）
  - メモ: エラーなし。Search Console 上で sitemap.xml を再送信済み。

### URL検査: 神根
- URL: https://kawaguchitenrei.com/area/kamine/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 新郷
- URL: https://kawaguchitenrei.com/area/shingo/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 芝
- URL: https://kawaguchitenrei.com/area/shiba/
- [x] URL検査
- [x] 公開URLをテスト
- [x] インデックス登録をリクエスト
- 結果:
  - インデックス登録リクエスト送信済み（2026-05-24 実施）
  - メモ: 公開URLテストでエラーなし。インデックス反映は Google 側の処理待ち。

### URL検査: 安行
- URL: https://kawaguchitenrei.com/area/angyo/
- [ ] URL検査
- [ ] 公開URLをテスト
- [ ] インデックス登録をリクエスト
- 結果:
  - 未実施（Search Console の割り当て制限により後日対応）
  - メモ: 制限解除後に URL検査・公開URLテスト・インデックス登録リクエストを実施予定。

### URL検査: 上青木
- URL: https://kawaguchitenrei.com/area/kamiaoki/
- [ ] URL検査
- [ ] 公開URLをテスト
- [ ] インデックス登録をリクエスト
- 結果:
  - 未実施（Search Console の割り当て制限により後日対応）
  - メモ: 制限解除後に URL検査・公開URLテスト・インデックス登録リクエストを実施予定。

### URL検査: 青木
- URL: https://kawaguchitenrei.com/area/aoki/
- [ ] URL検査
- [ ] 公開URLをテスト
- [ ] インデックス登録をリクエスト
- 結果:
  - 未実施（Search Console の割り当て制限により後日対応）
  - メモ: 制限解除後に URL検査・公開URLテスト・インデックス登録リクエストを実施予定。

## 作業後の確認予定
- [ ] 安行・上青木・青木のURL検査を実施
- [ ] 安行・上青木・青木の公開URLテストを実施
- [ ] 安行・上青木・青木のインデックス登録リクエストを送信
- [ ] 数日後にSearch Consoleの「ページのインデックス登録」を確認
- [ ] 必要に応じてURL検査で登録状況を再確認
- [ ] インデックス済みになったURLを追記
- [ ] エラーが出た場合は原因と対応を追記

## 注意事項
- Search Consoleの画面操作は手動作業
- 同じURLへのインデックス登録リクエストを短期間に何度も行わない
- sitemap.xml は本番反映後に送信する
- noindex / canonical / redirect の異常がある場合は、先にサイト側を修正する
- 「インデックス登録リクエスト送信済み」と「インデックス登録完了」は別物として記録する

## 補足（2026-05-24 時点）
- sitemap.xml の再送信は完了
- 新規6URLのうち、神根・新郷・芝の3URLは URL検査・公開URLテスト・インデックス登録リクエストまで完了
- 安行・上青木・青木の3URLは Search Console の割り当て制限に到達したため、後日対応
- 現時点では「インデックス登録リクエスト送信済み」であり、「インデックス登録完了」ではない
- 同一URLへ短期間に繰り返しリクエストしない
- 制限解除後に残り3URLを実施し、同ファイルへ追記する
