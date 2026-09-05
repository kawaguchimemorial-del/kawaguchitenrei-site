# SEO・MEO・AIO改善と公開記録

作成日: 2026-09-06 / 担当: Codex / 根拠: 2026-09-05監査と今回の公開指示

## 対応状況

- 完了: SEO/AIOのページ情報・構造化データ・料金条件・内部リンクを改善。
- 完了: Googleビジネスプロフィールの一日葬商品を通常価格496,000円へ訂正し、会員価格396,000円・税込・別途費用の説明と公式プランURLを追加。公開申請後に反映され、Google検索の商品欄で496,000円の表示を確認。
- 完了: 社内利用・開発環境・テスト用ブラウザの計測除外を実装。
- 完了: mainへpushし、Vercel本番デプロイ成功。本番129 URLを検証。Search Consoleサイトマップ再送信と未登録3 URLの登録リクエストが成功。

## 背景と変更内容

9月5日の監査で、検索対象129 URLのうち51ページにOG画像不足、30ページにh1不足があった。非指名検索からのクリックが少なく、火葬式と一日葬コラム等3 URLは未登録だった。Google商品欄と料金正本の不整合、内部ページがGA4へ混入する問題も確認した。

| 対象 | 変更 | 主なファイル |
|---|---|---|
| 検索用情報 | トップ・家族葬・一日葬のtitle/descriptionで地域・自社式場・条件を整理 | app/page.tsx、lib/plans.ts |
| 火葬式 | 直葬との違い、具体的なプラン価格、面会条件、火葬場との関係を追加 | CremationPlanGuide.tsx、PlanDetailBody.tsx、lib/plans.ts |
| 一日葬コラム | 日程の決め方と事前確認に焦点を合わせ、プラン・施設へのリンクを追加 | lib/columns.ts |
| OG画像 | プラン・事例・声・ペット・斎場一覧に画像を補完 | 各page.tsx、lib/seo.ts |
| 見出し・事業者参照 | 声の本文題名をh1にし、プラン等のJSON-LDから共通事業者IDを参照 | VoiceDetailIntro.tsx、各page.tsx |
| sitemap | ビルド日時を全URLの更新日とする処理を撤去。判明した実更新日だけ出力 | app/sitemap.ts、lib/seo.ts |
| トップ軽量化 | 事例・声を各最新6件に整理。一覧には全件を維持 | CasesSection.tsx、VoicesSection.tsx |
| 計測 | 本番限定、内部ページ除外、テストブラウザの永続除外 | lib/analytics-policy.ts、GTM、SiteAnalytics、lib/analytics.ts |

料金はCLAUDE.mdの正本とlib/plans.tsを照合。Googleに登録した一日葬の通常価格は496,000円（税込）。会員価格396,000円（税込）とは区別し、総額が固定であると表示しない。新しい口コミや実績は追加していない。

## 検証結果

- `npm run build`: 成功、静的生成140/140。ページ削除なし。
- sitemap: 129 URLを維持。実更新日を出したURLは48。
- 検索対象129ページ: title・description・自己参照canonical・OG画像・h1各1件を確認。JSON-LD構文エラー0。Next内部のエラー画面は検索対象から分離して評価。
- OG画像不足51→0、h1不足30→0。
- ローカルの生成HTML比較: トップ1,322,921→544,470 bytes（58.8%減）。通信圧縮後の転送量・LCP・実ユーザー速度の測定値ではない。
- 計測ポリシーテスト: 本番・LP・社内パス・preview・除外保存/解除・ストレージ拒否・SPA遷移が成功。
- 変更ファイルのESLint: エラー0。斎場一覧の既存未使用型importの警告2件。
- app/components全体のlintでは既存の内部リンクとReactルール違反を検出。今回触れたトップの内部リンクは修正。全リポジトリのlintが成功したとは扱わない。
- ローカル本番サーバーで火葬式・トップの表示とリンクを確認。問い合わせ実送信は未実施。

## Google・Vercel公開記録

- コミット `d3fc44b` をmainへpush。VercelのDeployment has completed / successを確認。
- [本番サイト](https://kawaguchitenrei.com/) の新titleと計測ポリシーを確認。本番129 URLすべてHTTP 200、メタ情報・h1・JSON-LD等の検査に問題なし。
- 本番トップの非圧縮HTMLは578,401 bytes。ローカルとの環境差があるため、上記58.8%はローカル同士の比較として扱う。
- Search Consoleサイトマップ再送信成功。送信日・最終読み込み日2026/09/06、検出129 URL。APIは403のため、既存ブラウザ認証で送信した。
- [URL検査・登録リクエスト記録](../operations/search-console/2026-09-seo-improvements-url-inspection-log.md) に各URLの結果を記録。3 URLすべて公開URLテストを通過し、登録リクエストの受付を確認。
- GBP一日葬商品は、公開後のGoogle検索結果側でも496,000円へ反映された。

## 残る課題と観測

- Google商品の訂正反映は確認済み。GSCリクエスト後の実登録・順位・AI引用は別の結果として観測する。
- 2026-09-09を目安に未登録3 URLの状態、2026-09-13に検索表示と内部計測混入、2026-09-20〜10-04にクリック・順位を再比較する。これは推奨確認日であり、自動実行の予約ではない。
- Google口コミは現在値と7月時点の集計値に差がある。他媒体を含む総評価を未照合で変更しない。
- 声の既存2ページは同じ本文題名のためtitleも重複している。内容を創作して差別化せず、今後の編集で扱う。
- GA4の過去データは変わらない。電話タップと実通話・施行件数は区別して評価する。
- Vercel環境変数、料金正本、共通ヘッダー/フッター/固定CTA、フォーム保存・通知処理は変更していない。

## 参照と運用

- [内部計測除外の設定方法](../operations/2026-09-06-analytics-exclusion.md)
- [前日の実測監査](2026-09-05-search-console-seo-meo-aio-audit.md)
- [Google sitemap更新日の仕様](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google計測無効化の仕様](https://developers.google.com/tag-platform/security/guides/privacy)

公開後に異常があれば、対象コミットをrevertして通常のmain→Vercel経路で戻す。Google商品の変更はサイトのrevertと連動しないため、個別に正本へ照合する。
