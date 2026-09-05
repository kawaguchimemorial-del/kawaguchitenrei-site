# Codex → Claude Code 引き継ぎ

作成日: 2026-09-06（日本時間） / 担当: Codex / 対象: 川口典礼サイト

## 最初に読む資料

**同日の追加作業：広告LPを再設計した。** 最新のLP実装・公開結果は [LP再設計記録](../ad-lp/2026-09-06-lp-redesign-and-measurement.md)、別集計の方法は [LP計測運用](../ad-lp/2026-09-06-lp-measurement-runbook.md)。以下の98500bfはSEO改善時点のコミットであり、サイト全体の最新HEADを意味しない。広告配信先はまだ切り替えていない。

本資料は、チャット履歴がないClaude Codeが作業を再開するための索引。業務ルール・料金の正本は [CLAUDE.md](../../CLAUDE.md)、共通の入口は [AGENTS.md](../../AGENTS.md)。双方の相互参照を再帰的に読み込まない。

| 目的 | 資料 |
|---|---|
| 改善前の状態と実測 | [9月5日 SEO・MEO・AIO監査](../seo-research/2026-09-05-search-console-seo-meo-aio-audit.md) |
| 実装と公開結果 | [9月6日 改善レポート](../reports/2026-09-06-seo-meo-aio-improvements.html) |
| サイト全体・Vercel・制約 | [サイト分析と引き継ぎ基準](../seo-research/2026-09-05-site-baseline-and-codex-handoff.md) |
| GSC・GA4の再接続と読解 | [既存認証の読み取り手順](search-console/codex-readonly-access.md) |
| Googleに実施した操作 | [サイトマップ・3 URLの登録リクエスト記録](search-console/2026-09-seo-improvements-url-inspection-log.md) |
| テスト時の計測除外 | [内部・テスト計測の除外方法](2026-09-06-analytics-exclusion.md) |
| 全レポート | [レポート一覧](../reports/index.html) |

## 完了した作業と公開位置

ユーザーからサイト・Google側の対策とpush・デプロイを明示依頼され、以下を実施した。本資料の追記依頼は、Claude Codeへ戻った際に困らないよう記録を整えるためのもの。

| コミット | 内容 | 確認した結果 |
|---|---|---|
| d3fc44b | サイト改善、計測除外、9月5日監査と接続資料 | mainへpush、Vercel success、本番129 URL検証成功 |
| 98500bf | 公開結果・Googleの登録リクエスト結果の記録 | mainへpush、Vercel success（最終確認済み） |
| 38f85c3 | 広告LP再設計、LP専用イベント、GA4分離集計と引き継ぎ資料 | mainへpush、Vercel success。本番LP42,515 bytes・sitemap129 URL。広告配信先は未切替 |

本番は [kawaguchitenrei.com](https://kawaguchitenrei.com/)。ソースは `kawaguchimemorial-del/kawaguchitenrei-site` のmain。確認済みデプロイは [サイト改善](https://vercel.com/kawaguchitenrei-s-projects/kawaguchitenrei-site/7bUfvGtDmhG6PVM6UDdwfWC4qJ4U) と [記録追記](https://vercel.com/kawaguchitenrei-s-projects/kawaguchitenrei-site/DxMsg8ZCviR9X7EY5xdqrKFCSiW6)。URLの閲覧にはVercel権限が必要な場合がある。将来の作業では現在のHEAD・remote・本番状態を再確認する。

## サイトで変更したこと

- トップ・家族葬・一日葬の検索用情報を整理。火葬式には、直葬との違い、具体的なプランへのリンク、料金・面会の条件を追加。
- 一日葬コラムは日程の決め方と事前確認を中心に整理し、プラン・施設へリンク。変更対象は `lib/plans.ts`、`lib/columns.ts`、プラン関連コンポーネント等。詳細と差分は `git show d3fc44b` で確認できる。
- OG画像不足51ページを補完。声30ページの題名をh1に変更。既存の口コミ本文・評価値は変更していない。
- プラン・事例・声の構造化データから共通事業者の `@id` を参照。構文検証の成功を、星表示・AI引用の保証と扱わない。
- `lib/seo.ts` に共通OG画像と実更新日を管理。sitemap全件をビルド日時に更新する処理を撤去。更新日が不明なページはlastModifiedを省略する。
- トップの事例・声は各最新6件。一覧は全件を保持。元の全件マーキーへ戻す場合はHTML量への影響を確認する。
- 内部・テスト計測を除外。変更対象はroot layout、GTM、Vercel Analytics、フォーム完了イベントの送信判定。フォームの保存・通知処理は変更していない。

## Googleで変更したこと

- GBPの商品「一日葬プラン」の通常価格を469,000円から496,000円（税込）へ訂正。会員価格396,000円（税込）、別途費用、公式一日葬プランURLを追加。管理画面の反映待ちを経て、Google検索の商品欄に496,000円が表示されたことを確認済み。
- GSCのsitemap.xmlを再送信。送信日・最終読み込み日2026/09/06、成功、検出129 URLを管理画面で確認。
- `/plan/cremation/`、`/column/ichinichi-sou/`、`/voice/20250912/` のライブテストで登録可能と表示。3 URLとも「インデックス登録をリクエスト済み」「優先クロール キューに追加」を確認。
- 登録リクエストは受付完了。Googleへの実登録は未確認。次担当者が同じ依頼をすぐ再送信する必要はない。
- GA4管理画面にIPフィルタは追加していない。サイト側の除外を実装したもので、過去のGA4データは変更・削除していない。

## 接続と再確認の手順

- 作業開始時に `git status --short`、`git log -3 --oneline` を確認し、現在のユーザー依頼を読む。過去の公開許可を将来の無関係な変更へ拡張しない。
- 既存認証を使った疎通確認: `node --env-file=.env.local scripts/search-console-audit.mjs --probe`。
- 3 URLの登録状態と検索データを再取得: `node --env-file=.env.local scripts/search-console-audit.mjs --inspect`。GA4を含めるときは `--with-ga4` を追加する。
- 全129 URLの登録検査は必要なときだけ `--inspect-all` を使う。読み取りスクリプトは登録リクエスト・sitemap送信を行わない。
- `.env.local` の値を開く・表示する・ログへ書くことはしない。Nodeのenv-fileでプロセス内だけに渡す。取得JSONはGit除外のtmpへ保存される。引き継ぎの必須情報はtmpに依存させない。
- GSCの読み取りは成功したが、sitemap送信APIは403だった。既存ブラウザの対象プロパティで送信できた。読み取り権限と変更権限を区別し、認証再発行を反射的に行わない。
- GBPのAPIは割り当て0で利用できなかった。管理者として接続済みのブラウザから閲覧・商品編集を実施した。次担当者のブラウザセッションが同じとは限らないため、対象事業者と権限を確認する。
- 社内・テストの本番閲覧は `https://kawaguchitenrei.com/?analytics=off` を最初に開く。同じブラウザに除外が保存される。解除時だけ `?analytics=on`。localStorage削除・別端末・別ブラウザでは再設定する。
- 計測ポリシー検証は `node scripts/test-analytics-policy.mjs`。サイトコード変更後は同梱Next.jsドキュメントを読み、`npm run build` を実行する。

## 検証できた範囲と限界

- ビルド成功、静的生成140/140。本番sitemapは129 URL。数え方が異なるため一致させない。
- 本番129 URLでHTTP 200、title・description・h1・OG画像・自己参照canonical・JSON-LD構文・計測ポリシーの存在を確認。これで全文の事実性や全端末の表示を保証したとは扱わない。
- ローカル生成トップHTMLは1,322,921→544,470 bytes（58.8%減）。本番改善後は578,401 bytes。圧縮後転送量、LCP、実ユーザーの速度改善率とは異なる。
- 変更ファイルのlintはエラー0、既存未使用型importの警告2。全体lintには既存の内部リンク・Reactルール違反が残る。全体lint合格と報告しない。
- ローカルのトップ・火葬式画面を確認。全端末の表示検査、フォーム実送信、実通話、実問い合わせ件数の照合は未実施。
- 計測除外はロジックテスト済み。本番のGA4受信状況・内部アクセス減少は後日のデータで確認する。GTMのnoscript iframeは除外判定を通らないため撤去した。

## 次に確認すること

| 目安日 | 内容 | 判定の注意 |
|---|---|---|
| 2026-09-09 | 未登録3 URLの登録状態 | 受付済みと実登録を区別する |
| 2026-09-13 | 検索表示・GA4内部ページ混入 | 新しい確定データを取得し、過去分を混ぜない |
| 2026-09-20〜10-04 | 家族葬・一日葬・火葬式のクエリ×ページ、クリックと順位 | title変更直後の短期変動だけで受け皿を再変更しない |
| 2026-10-18〜11-01 | CTR・問い合わせへの影響 | 電話タップを実通話や施行件数と扱わない |

上記は推奨確認日。自動実行・リマインダーは設定していない。日付を過ぎて再開した場合は、現在のデータで再確認する。

残課題はGoogle口コミの現行件数と7月時点の他媒体込み集計の照合、声2ページの重複title、全体lint、速度指標の実測。口コミ・声の内容を創作して解消しない。GBP説明文の面会条件など、今回の商品訂正以外のプロフィール文言は未修正として扱う。

## 作業ツリーと引き継ぎ資料の維持

- 本資料作成開始時、追跡ファイルは変更なし。利用者の未追跡画像フォルダ `public/images/GMOサジェスト/` と `public/images/NTT/` が存在した。今回のサイト公開に含めていない。削除・一括stageしない。
- package.json・lockfile、料金正本、Header・Footer・MobileBottomCTA、環境変数、フォーム通知先を変更していない。
- 重要な変更は日本語HTMLレポートと一覧へ残し、接続手順や共通入口から参照できるようにする。秘密情報・顧客情報は複写しない。確認時点と未確認事項を分ける。
- 戻す必要が生じたら、現在の差分とユーザー指示を確認してから対象変更をrevertする。Google商品・GSC操作はgit revertでは戻らない。
