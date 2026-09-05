# Search Console URL検査・登録リクエスト作業ログ

## 作業名・実施日

SEO・MEO・AIO改善後のGoogleへの再確認依頼。2026-09-06（日本時間）。担当Codex。ユーザーがサイト・Google設定変更とpush・デプロイを明示依頼。

## 関連する公開

- ソースコミット: `d3fc44b`（main）。
- Vercel: Deployment has completed / success を確認。
- 本番129 URLはすべてHTTP 200。title・description・h1・OG画像・自己参照canonical・JSON-LD構文・計測ポリシーを検証し、問題0。

## サイトマップ

既存API認証での送信は403。既存認証を変更せず、接続済みブラウザの対象プロパティから `sitemap.xml` を再送信した。

管理画面で「サイトマップを送信しました」、送信日・最終読み込み日2026/09/06、ステータス「成功しました」、検出されたページ129を確認。

## 対象URLと結果

| URL | 事前の状態 | 公開URLテスト | 登録リクエスト |
|---|---|---|---|
| https://kawaguchitenrei.com/plan/cremation/ | 検出 - インデックス未登録 | 登録可能 | リクエスト済み |
| https://kawaguchitenrei.com/column/ichinichi-sou/ | クロール済み - インデックス未登録 | 登録可能 | リクエスト済み |
| https://kawaguchitenrei.com/voice/20250912/ | 検出 - インデックス未登録 | 登録可能 | リクエスト済み |

3 URLすべて、公開URLテストの「URL は Google に登録できます」と、送信後の「インデックス登録をリクエスト済み」「優先クロール キューに追加」を確認。未完了URLなし。

## 注意事項

登録リクエストは優先クロールキューへの追加であり、インデックス登録完了ではない。同じURLへ繰り返し送信しない。削除系操作なし。

今回のサイト側変更ではsitemapのlastModifiedを実更新日へ整理した。canonical・robotsの方針とnoindex対象は維持している。既存ログ雛形の「sitemap未変更」は今回のサイト改修には適用しない。

## 次回確認の目安

- 2026-09-09: 3 URLの登録状態。
- 2026-09-13: 表示回数、GA4内部ページの混入。
- 2026-09-20〜10-04: 川口市 家族葬、一日葬、火葬式のクエリ×ページ、クリックと順位。
- 2026-10-18〜11-01: title変更後のCTRと問い合わせへの影響。

確認日程は推奨であり、定期実行は設定していない。

関連: [作業レポート](../../reports/2026-09-06-seo-meo-aio-improvements.html)
