# CodexからSearch Console・GA4を読み取る手順

接続確認日: 2026-09-05 / 既存のClaude Code運用で使用していた認証を利用。

## 接続済みの範囲

- Search Console: 既存プロパティへのアクセス成功。検索実績・サイトマップ状態・URL Inspection APIの読み取りが可能。
- GA4: 既存プロパティへのアクセス成功。流入元、ランディングページ、電話タップ・フォーム完了イベントを集計できる。
- GBP API: 2026-09-05の試行はHTTP 429、API割り当て0。再申請や再認証は実行していない。
- GBPブラウザ: 同日、既存ログインのEdgeで対象プロフィールの管理者パネル・パフォーマンスを閲覧できた。APIとは別経路で月別実績と公開情報を確認済み。

Webの管理画面は `https://kawaguchitenrei.com/admin/seo/`。既存Basic Authで保護される。
今回整備したスクリプトはGoogleの公式APIから直接取得するため、管理画面の6時間キャッシュを経由しない。
既存画面・認証方式・Vercel設定は変更していない。

## 実行方法

プロジェクトルートで、まず接続だけを確認する。

```powershell
node --env-file=.env.local scripts/search-console-audit.mjs --probe
```

検索実績の前後比較と主要15 URLの登録状態、GBP疎通、GA4集計を取得する。

```powershell
node --env-file=.env.local scripts/search-console-audit.mjs --inspect --with-gbp --with-ga4
```

サイトマップ全URLの登録状態まで確認する場合は、`--inspect` の代わりに `--inspect-all` を使う。

```powershell
node --env-file=.env.local scripts/search-console-audit.mjs --inspect-all --with-gbp --with-ga4
```

全URL検査は数分かかる。APIクォータを使うため、同じ分析で何度も繰り返さない。
`--inspect-all` は本番sitemapの同一オリジンURLだけを対象とし、500 URLを超える場合は停止する。

## 認証と秘密情報の扱い

ユーザーは2026-09-05に、Codexでも既存接続を使ってSearch Consoleを確認・分析できるようにすることを依頼した。
この手順ではNodeの `--env-file` が既存の設定をプロセス内へ読み込み、Google認証ライブラリだけが値を使用する。
エージェントが `.env.local` の内容を表示・会話へ読み込む操作は行わない。

- `.env*` の内容・トークン・秘密鍵・認証ヘッダーを表示しない。
- 接続できる既存認証がある場合、新規OAuth同意、トークン再発行、権限変更を行わない。
- スクリプトのエラー出力はHTTPステータスと分類だけ。Googleの生エラーオブジェクトには認証情報が含まれ得るため、`console.log(error)` を追加しない。
- Search Consoleの認証主体が所有者権限でも、このスクリプトが呼ぶのは読み取り用メソッドのみ。
- 通信制限で失敗した場合、認証情報を変更する前に、承認されたネットワーク実行環境で読み取りを再試行する。

必要な変数名:

| 対象 | 変数名 |
|---|---|
| GSC / GBP OAuth | `GOOGLE_OAUTH_CLIENT_ID`、`GOOGLE_OAUTH_CLIENT_SECRET`、`GOOGLE_OAUTH_REFRESH_TOKEN` |
| GSCプロパティ | `SEARCH_CONSOLE_SITE_URL` |
| GA4 | `GA4_PROPERTY_ID` |
| GA4の既存サービスアカウント認証 | `GOOGLE_CLIENT_EMAIL`、`GOOGLE_PRIVATE_KEY`。未設定なら既存OAuthを試す |

## 取得内容

- Search Console Web検索・`dataState: final`。日別データから最新の確定日を検出する。
- 直近28日 / その前28日、直近7日 / その前7日。期間は両端を含む。
- 全体、クエリ、ページ、デバイス、クエリ×ページ。ページングは最大100,000行で停止し、上限到達を記録する。
- 90日の日別推移、sitemapの警告・エラー・最終取得日。
- URL InspectionはGoogleが保持する登録状態・canonical・最終クロール時刻。公開URLライブテストや登録リクエストではない。
- GA4は同じ日付ラベルの前後28日について、流入元、ランディング、`click_tel` / `generate_lead` のイベント回数を取得する。
- GBPは読み取りの疎通と対象事業者の基本設定の要約だけ。写真投稿・口コミ返信・プロフィール更新は行わない。

## 保存先と読解上の注意

GBPをブラウザから確認する場合は、[対象のGoogleマップ](https://www.google.com/maps?cid=8136740303180194415)から「ビジネス プロフィールを管理」→「パフォーマンス」を開く。
既存の対象事業者の管理者セッションであること、選択期間、指標名を確認する。2026-09-05は4月〜9月の月別行を取得した。
「通話」はボタンのクリック、ルートは経路検索であり、顧客数として扱わない。GBPパフォーマンスには広告経由も含まれる。
APIの取得結果とブラウザ観測は取得経路を分けて記録する。画面全体や口コミ本文・投稿者名・ログイン情報を資料へ転記しない。
プロフィール・商品・投稿・口コミ返信の編集は読み取り分析に含めない。

2026-09-05の実測は[SEO・MEO・AIO監査](../../seo-research/2026-09-05-search-console-seo-meo-aio-audit.md)を参照。

取得結果は `tmp/search-console-audit-<UTC日時>.json` に保存する。`tmp/` はGit除外。
全文を公開レポートへ複写しない。人間向け資料には必要な集計と確認済みの対象URLを選んで記載する。

1. クエリを含む表には匿名化された検索語が含まれず、APIは全行を保証しない。「行なし」を検索需要0や厳密な表示0と断定しない。
2. サイト単位とページ単位の集計は異なる。ページ別の表示回数を足してサイト全体の表示回数と比較しない。
3. sitemap APIの `contents[].indexed` は廃止フィールド。0でも「全ページ未登録」と判定しない。スクリプトの保存対象からも除外した。
4. GSCの日付は太平洋時間、GA4の日付はプロパティのタイムゾーン。セッションとクリックも別指標のため、完全一致を期待しない。
5. 電話タップは実通話件数ではなく、フォームイベントは実際の問い合わせ人数・施行数ではない。テストや重複操作も確認する。
6. 管理画面・宛名印刷・LPテストを含む可能性がある。除外前の数値を顧客獲得成果として扱わない。
7. `ok: false` は取得失敗であり0件ではない。GBPの429はAPI側の状態であり、Googleマップ掲載自体が停止している証拠ではない。

## 禁止する副作用

本スクリプトは、サイト・GTM/GA4設定・Vercel・環境変数・GBPを変更しない。
GSCのsitemap送信・削除、URL削除、インデックス登録リクエストも行わない。
認証付きPOSTを使用するSearch Analytics / URL Inspection / GA4 runReportも、処理の意味は読み取りである。

## 参照

- [分析用スクリプト](../../../scripts/search-console-audit.mjs)
- [既存SEOダッシュボード](../seo-dashboard/README.md)
- [電話記録運用](../2026-09-04-call-tracking.md)
- [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [sitemap APIの廃止フィールド](https://developers.google.com/webmaster-tools/v1/sitemaps)
