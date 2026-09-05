# 川口典礼サイトの現状分析とCodex引き継ぎ

作成日: 2026-09-05（JST） / 担当: Codex / 公開HTTP確認: 15:50 JST

## 1. 結論と確認範囲

**SEO・MEO・AIOを意識して設計・運用されている葬儀社サイトであることを確認した。** ページやメタ情報だけでなく、地域コンテンツ、構造化データ、旧URL転送、Search Console管理画面、GBP運用スクリプト、効果測定の記録まである。本番配信はVercel。次の担当が最初から設計をやり直す状況ではなく、既存方針・実装・計測履歴を引き継ぐことが適切。

- 完了: `CLAUDE.md`、主要ポリシー、運用資料、最近のSEO記録、実装とデータを照合した。
- 完了: 公開サイトの主要7ページと広告LP、robots、sitemap、未認証の管理画面をGETで確認した。
- 完了: `npm run build` 成功。TypeScript検査成功、静的生成進捗 `140/140`。
- 完了: `AGENTS.md` にCodex用の入口、既存制約、参照先、Vercel・SEO/MEO/AIOの注意点を追記した。
- 提案・未着手: 下記の改善候補。サイトのソース、料金、フォーム、外部設定は変更していない。

今回の「実測」はローカルコード・ビルドと公開HTTP応答。「過去記録」は既存レポートの数字。「未確認」は管理画面や現在の計測データを必要とする事項として区別する。GSC・GA4・GBPの認証付きAPI再取得、Googleマップ順位の地点別測定、AI各社への定点質問、Vercel管理画面、フォーム実送信、スマホ実機・Core Web Vitals測定は行っていない。全URLの本文品質や法的記述を監査したものではない。

## 2. 事業・サイト設計

地域密着の「川口典礼」と自社式場「川口メモリアルホール」が軸。めぐりの森までの近さ、駐車場、葬儀形式、実績、24時間受付を、事前相談と急ぎの相談の双方へつなぐ構成になっている。

葬儀形式は、トップでは6種類を案内し、詳細には火葬式と無宗教葬の情報ページを含む8ルートがある。シンプル直葬は別ページではなく直葬内の代替プラン。料金は `CLAUDE.md` §9と `lib/plans.ts` を照合し、この引き継ぎ資料に別の価格正本を作らない。

自社式場と外部施設を明確に区別している。めぐりの森ページは `Place` を使い、市営火葬場であり通夜・告別式の式場を併設しないことを説明する。これは、地域情報の正確さとAIによる誤認防止の双方で維持すべき点。

主な導線は、トップ → プラン・式場・地域・事例・声・FAQ → 電話・事前相談・概算依頼。コラムは情報検索の入口を担い、地域・商用ページへ接続する。広告用 `/lp/` は通常サイトと別の表示設計を持つ。

## 3. 技術構成とページ資産

| 項目 | 確認できた内容 | 根拠 |
|---|---|---|
| フレームワーク | Next.js 16.2.6、App Router、React 19.2.4 | `package.json`、今回のbuild |
| 言語・CSS | TypeScript、Tailwind CSS 4系 | `package.json`、`app/globals.css` |
| コンテンツ管理 | 主に `lib/*.ts` の型付きデータとTSX。CMS連携を主とする構成ではない | `lib/`、`app/` |
| 詳細ルート | プラン・事例・声・コラムは `[slug]` と `generateStaticParams` | 各 `app/*/[slug]/page.tsx` |
| 動的機能 | Server Actions、郵便番号関連API、SEO管理画面、認証Proxy | `app/`、`proxy.ts` |
| 共通UI | Header / Footer / MobileBottomCTAをslot経由で表示 | `app/_layout-slots.tsx` |
| URLルール | 末尾スラッシュあり。恒久転送定義195件 | `next.config.ts`。定義数であり転送先の異なるURL数ではない |
| ソースのページファイル | `page.tsx` は46ファイル | `app/` のファイル集計 |

| データ種別 | 件数 | 主な正本 |
|---|---:|---|
| プラン・葬儀形式の詳細 | 8 | `lib/plans.ts` |
| エリア詳細 | 15 | `lib/areas.ts` |
| 自社ホール | 1 | `lib/halls.ts` |
| 外部斎場の詳細 | 4 | `lib/saijo.ts`。寺院会館一覧情報は別途 `lib/temple-halls.ts` |
| 施行事例 | 11 | `lib/cases.ts` |
| お客様の声 | 30 | `lib/voices.ts` |
| コラム | 44 | `lib/columns.ts` |

本番sitemapは129 URL、重複0。buildの `140/140` とは、管理用途、noindexページ、メタデータルートなどを含む範囲・集計が異なるため同一視しない。古い作業ルールの「131ページ」は現在の基準値ではない。

## 4. SEOの実装評価

| 対策 | 状態 | 評価・根拠 |
|---|---|---|
| ページ別title / description | 実装・主要ページの本番出力確認済み | 会社・地域・形式・検索意図を組み合わせた設計 |
| canonical | 主要7ページで自己参照URLを確認 | `metadataBase` は本番ドメイン、各ページは固有URLを指定 |
| h1 | 主要7ページとLPで各1個を確認 | 全ページの見出し階層を網羅監査したものではない |
| 地域SEO | 15エリアと地域ガイドを実装 | `lib/area-local-guide.ts`、`components/area/AreaLocalGuide.tsx` |
| 内部リンク | プラン・式場・地域・事例・コラム間の導線あり | 主要テンプレートとトップの構成で確認 |
| 構造化データ | 主要7ページでJSON解析エラー0 | 下記AIO欄を参照。検索機能の表示適格性とは別 |
| クロール制御 | robots、sitemap、用途別noindexあり | LP・管理画面・宛名印刷はsitemap外 |
| 旧サイト移行 | 多数の恒久転送定義あり | 旧記事・旧口コミなどを現行URLへ接続。全195定義のHTTP検証は未実施 |
| 計測 | GSCダッシュボードと過去の継続レポートあり | 最新値は今回再取得していない |

2026-09-02の既存記録では、GSCの8/24–8/30の7日間は79クリック、10,673表示、CTR 0.74%。「川口市 葬儀」の平均順位8.53、「川口市 家族葬」16.52と記録されている。これは2026-09-05の最新実測ではない。また、平均順位を特定の検索画面の固定順位・ページ位置として説明しない。

同記録では地域ガイド追加前後にエリアの表示が180→256へ増えた一方、クリックは0のまま。コンテンツが存在することと、集客できていることを区別する必要がある。短期比較だけで施策効果や下落原因を確定できない。

参照: [9月2日のSEO詳細記録](../reports/2026-09-02-seo-check-deep.html)。

## 5. MEO / Googleビジネスプロフィール

サイト側には、事業者名・住所・電話（NAP）のデータ、Googleマップのリンク・地図、`sameAs`、営業時間、対応エリア、口コミへの導線がある。`lib/company.ts` が中心だが、プラン・エリア・ホールのJSON-LDにも情報が直接記述されており、全箇所が一元管理されているわけではない。

GBP側には期待値 `desired.mjs`、読み取り `dump.mjs`、差分 `diff.mjs`、反映 `apply.mjs`、ガード `guard.mjs`、計測 `performance.mjs` がある。反映は既定dry-runで、`--confirm` を付けると公開情報を書き換える。今回実行していない。

**過去記録上の最新状況は、2026-09-02時点でAPI未承認。** 8/21の再申請後もAPIが429・割り当て0だったと報告されている。READMEにある403という初期状態だけを現在の判定として使わず、日付の新しい記録を確認する。2026-09-05時点の承認状態は未確認。既存レポートには次回確認目安として9/09前後が記載されているが、今回自動監視は設定していない。

APIが未承認でも、Googleマップへの掲載や手動でのGBP運用まで未実施とは限らない。MEO全体を「未対応」とするのは不適切。登録内容の最新性、写真、カテゴリ、口コミ対応、マップ上の露出はGBP側の実物確認が必要。

Googleはローカル順位の主要因を関連性・距離・知名度として説明している。サイトの地域ページやスキーマだけで順位が確定するものではない。[Google公式のローカル順位ガイド](https://support.google.com/business/answer/7091?hl=en)。

参照: [GBPスクリプトの説明](../../scripts/gbp/README.md)、[再申請の運用記録](../operations/gbp/2026-08-19-gbp-api-reapplication.md)。

## 6. AIO / LLMOの実装と評価の限界

| 要素 | 現行実装 |
|---|---|
| 結論先出し | プランのConclusion、地域ガイド、斎場説明など |
| 情報抽出しやすい構成 | 基本情報表、料金条件、FAQ、見出し、関連ページ |
| 店舗と法人の結び付け | トップで `FuneralHome` / `LocalBusiness`、`Organization`、`WebSite` を `@graph` と `@id` で接続 |
| ページに応じた型 | プランは `Service` / `Offer`、外部斎場は `Place`、コラムは `BlogPosting`、事例は `Article`、声は `Article` / `Review` |
| 参照・実績 | 自社ホール・施行事例・利用者の声、公開日・更新日、法人著者 |
| 観測の運用 | 固定7質問と4AIへの定点観測手順、過去の観測記録 |

構造化データと読みやすい本文は実装されている。ただし全ページで共通 `@id` が使われているわけではない。確認したプラン・エリア・ホールは独自の事業者オブジェクトを持ち、トップのIDへリンクしていなかった。今後の名寄せ整備の候補になる。

GoogleのAI検索向けガイドでは、通常のSEO、クロール可能性、本文、内部リンク、構造化データと表示内容の一致が基礎とされ、専用のAIテキストファイルや特別なschemaは必須ではない。`llms.txt` の有無だけでAIOの完成度を判定しない。[Google公式のAI機能ガイド](https://developers.google.com/search/docs/appearance/ai-features)、[生成AI向け最適化ガイド](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)。

2026-09-04の電話計測資料には、8月の `click_tel` の参照元に `chatgpt.com` が含まれた記録がある。これは過去の流入・タップの記録であり、現在のAI回答への掲載率、出典としての引用率、実通話・受注の証明ではない。AIでの言及、出典リンク、サイト訪問、問い合わせを別々に評価する。

参照: [LLMO測定手順](../eval/llmo-seo-measurement-playbook.md)、[電話記録運用](../operations/2026-09-04-call-tracking.md)。古い測定手順の「手取得のみ」は、現在のGSC API管理画面や最近のAPI取得記録と読み分ける。

## 7. Vercelと周辺サービス

| 項目 | 確認結果 |
|---|---|
| 本番ドメイン | `https://kawaguchitenrei.com/` |
| Vercelの実利用 | 今回の公開HTTP応答で `Server: Vercel`、`x-vercel-id` あり。主要ページの多くが `x-vercel-cache: HIT` |
| Git連携元 | ローカルremoteは `https://github.com/kawaguchimemorial-del/kawaguchitenrei-site.git`、確認時ブランチは `main` |
| 反映の運用 | 過去記録に `main` へのpush後、Vercelデプロイ・本番確認を行った履歴あり |
| 設定ファイル | このチェックアウトに `vercel.json` と `.vercel/project.json` は存在しない。管理画面側の設定内容は推測しない |
| Vercel Web Analytics | 依存と `app/layout.tsx` の `<Analytics />`、2026-06-08導入記録あり。現在の受信状況・有効化状態は管理画面未確認 |
| BotID | `withBotId`、`instrumentation-client.ts`、`lib/forms/botid.ts` を確認。問い合わせ関連POSTを保護 |
| 認証 | `/admin/seo/` は未認証GETでHTTP 401。ローカルは `proxy.ts` のBasic Auth |
| 公開以外の機能 | 問い合わせ、概算、アンケート、郵便番号API、宛名印刷ツール、SEO管理画面 |

`README.md` はcreate-next-appの雛形のままで、Vercel運用の実態は `CLAUDE.md`、`docs/operations/`、`docs/reports/` とコードに分散している。今回その入口を `AGENTS.md` に集約した。

外部連携は、ブラウザ → Next.jsのServer Action → GAS Webhook → スプレッドシートへの保存・通知という設計。Google側にあるGAS本体はGitから直接反映されない。写しだけ直して完了にしない。BotIDが例外を返す場合は問い合わせを取りこぼさない設計になっているため、障害時の動作を理解してから変更する。

| 環境変数名のみ | 用途 |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | GTM読込 |
| `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`、`FORM_WEBHOOK_SECRET` | GASへの送信先と共有検証 |
| `GOOGLE_OAUTH_CLIENT_ID`、`GOOGLE_OAUTH_CLIENT_SECRET`、`GOOGLE_OAUTH_REFRESH_TOKEN` | Google API認証 |
| `SEARCH_CONSOLE_SITE_URL` | GSCプロパティ |
| `SEO_DASHBOARD_USER`、`SEO_DASHBOARD_PASSWORD` | 管理画面認証 |

秘密情報の値と `.env*` の内容は読取・記載していない。buildは既存Next.jsの標準動作として環境設定をロードしている。VercelのProject ID、Team、Production Branchの現在値、Node設定、ビルド設定、DNS、環境変数の登録状態、最新デプロイとこのcommitの一致は未確認。コードと過去の運用記録だけで断定しない。

旧広告ドメイン `kawaguchi-memorial-hall.com` は既存資料ではXserver側の別管理。公式サイト内の `/lp/` は実装・公開済みだが、広告配信先の切替完了は今回未確認。[広告LP統合計画](../ad-lp/2026-08-26-brand-budget-and-lp-integration.md)。

## 8. 今回確認した本番出力

| URLパス | HTTP | canonical / 用途 | JSON-LDブロック | OG画像 |
|---|---:|---|---:|---|
| `/` | 200 | 自己参照 | 2 | あり |
| `/plan/family-funeral/` | 200 | 自己参照 | 3 | なし |
| `/plan/direct-funeral/` | 200 | 自己参照 | 3 | なし |
| `/area/kawaguchi/` | 200 | 自己参照 | 3 | あり |
| `/area/nishikawaguchi/` | 200 | 自己参照 | 3 | あり |
| `/hall/kawaguchi-memorial-hall/` | 200 | 自己参照 | 3 | あり |
| `/saijo/megurinomori/` | 200 | 自己参照 | 3 | あり |
| `/lp/` | 200 | noindex、canonicalなし | 0 | あり |
| `/robots.txt` | 200 | 全体Allow、admin / postをDisallow。LPはDisallowなし | — | — |
| `/sitemap.xml` | 200 | 129 URL、重複0、lp / admin / postなし | — | — |
| `/admin/seo/` | 401 | 未認証アクセスが拒否されることを確認 | — | — |

通常の主要7ページにnoindex指定は見つからず、JSON-LDは全20ブロックでJSONとして解析できた。Googleのリッチリザルトテストや全schemaプロパティの検証結果ではない。Vercel Analyticsはクライアントで読み込むため、生HTMLの文字列検出だけで稼働・未稼働を判定していない。

## 9. 優先して扱う改善候補

以下は分析結果であり、サイトの改修は未実施。

| 優先 | 課題・根拠 | 次の対応 |
|---|---|---|
| 高 | GBP APIは最新の9/02記録でも未承認。MEO運用の自動化が待機中 | 現在の承認状況を読み取り確認し、手動運用の実施状況も分けて記録する |
| 高 | キーワードの主対象ページの資料が古い。6/09表は「川口 葬儀→area」だが7/14以降トップに葬儀・葬儀社のtitleを保持。9/02記録でも検索の実際の掲載先が想定と異なる | 最新のクエリ×ページ実績を取得後、現行方針として整理する。canonicalを横断変更して解決しない |
| 高 | FAQリッチリザルトとレビューの扱いは現行Google仕様との区別が必要 | FAQ本文は読者向けに活用。星表示を目標に自社Reviewを増やさず、構造化データの目的と適格性を確認する |
| 中 | 家族葬・直葬の本番OG画像が0。プランテンプレートの `openGraph` に `images` がない | 親のOG設定を上書きするNext.jsの浅いマージを踏まえ、対象テンプレートを改修する候補 |
| 中 | トップの展開後HTMLは1,414,243 bytes（約1.41 MB）。LPは336,863 bytes（約337 KB） | 重複表示・シリアライズデータ等の内訳、圧縮転送量、実機LCP/INPを測定する。HTML量だけでCWV不合格と断定しない |
| 中 | `CLAUDE.md` §21のLP「HTML 50KB以下」と実際の展開後HTMLに開きがある。基準の測定方法が未定義 | 50KBが何を指すかを揃え、LP側の重量を測る。広告LPのデザイン特例は維持する |
| 中 | トップ以外の事業者JSON-LDに共通 `@id` がなく、会社情報とレビュー数値も複数ファイルに存在 | 表示・JSON-LD・GBPの整合、更新元と確認日を整理する |
| 中 | sitemapのコラム以外は `new Date()` を更新日に使う | 実際の主要内容更新日を保持する設計の候補。ビルド日時を内容更新日と混同しない |
| 中 | 古い文書はJSON-LDの `dangerouslySetInnerHTML` を禁止する一方、実装とNext.js同梱ガイドはそれを使う | 形式的に書き換えず、信頼できるデータ源と安全なシリアライズを方針化する。外部入力追加前に `<` のエスケープなどを確認する |
| 中 | GA4の電話タップ、実着信、施行が別指標。管理画面の計測除外もコードだけでは確認できない | 電話記録運用を継続し、GTM/GA4側の条件・テスト送信の除外を確認する |

Googleの更新履歴では、FAQリッチリザルトは2026-05-07から表示終了とされる。FAQPageを設置すれば検索結果にFAQ枠が出る、という説明は採用しない。[Google公式更新履歴](https://developers.google.com/search/updates)。

また、Googleのレビュー構造化データ規則では、自社が管理する自社のLocalBusiness / Organizationレビューは星表示の対象外で、他サイトの評価の集約も制限される。トップにあるGoogle評価由来の `aggregateRating` は、構文の正しさと星表示の適格性を分けて判断する。実在の口コミの通常表示を禁止する説明ではない。[Google公式レビュー規則](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)。

## 10. 引き継ぎで変更したファイルと検証

| ファイル | 内容 |
|---|---|
| `AGENTS.md` | 既存Next.js注意書きを保持し、Codex用入口・参照先・運用制約・技術上の注意を追加 |
| `docs/00-project-policy.md` | AGENTSの役割拡張を日付付きで追記 |
| `docs/ai-workflows/memory-management.md` | 保存先分類に、今回のAGENTSの役割拡張を日付付きで追記 |
| `docs/seo-research/2026-09-05-site-baseline-and-codex-handoff.md` | 本資料 |
| `docs/reports/2026-09-05-site-baseline-and-codex-handoff.html` | 人間向けHTML版 |
| `docs/reports/index.html` | レポートのリンクを追加 |

`npm run build` はソースを変更していない状態で実行し成功。最適化コンパイルとTypeScript検査が完了し、静的生成は140/140。今回の成果物は文書のみなので、その後の同一コードのbuild再実行は省略。`npm run dev`、フォーム送信、lintは今回未実行。公開HTTPは前述の11対象を検査した。

既存の未追跡画像ディレクトリ `public/images/GMOサジェスト/` と `public/images/NTT/` は未変更。分析用の一時スクリプト・抽出結果はGit除外の `tmp/` 内。秘密情報や顧客情報を資料に複写していない。コミット・push・デプロイ・GBP反映・外部へのメッセージ送信は未実施。

## 11. 参照資料

- [既存業務ルール](../../CLAUDE.md)、[Codexの入口](../../AGENTS.md)
- [全体方針](../00-project-policy.md)、[SEO/AIO方針](../01-seo-aio-policy.md)、[文言方針](../05-content-guidelines.md)、[Privacy Review](../04-privacy-review.md)
- [旧キーワード対応表](2026-06-09-keyword-canonical-mapping.md)、[7/14のtitle変更記録](../reports/2026-07-14-seo-cannibalization-10expert-fix.html)
- [最新のSEO詳細記録](../reports/2026-09-02-seo-check-deep.html)、[GBPスクリプト](../../scripts/gbp/README.md)
- [Vercel Analytics導入記録](../reports/2026-06-08-vercel-web-analytics.html)、[SEO管理画面の運用](../operations/seo-dashboard/README.md)
- [GAS仕様](../operations/2026-08-27-gas-webhook-spec.md)、[電話記録運用](../operations/2026-09-04-call-tracking.md)
- [Next.js同梱JSON-LDガイド](../../node_modules/next/dist/docs/01-app/02-guides/json-ld.md)、[Metadata APIのマージ規則](../../node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md)

この資料は2026-09-05の基準記録。次の改修では、まず対象課題の最新値とユーザーの依頼範囲を確認し、ここに記載した未着手項目を実施済みとして扱わない。
