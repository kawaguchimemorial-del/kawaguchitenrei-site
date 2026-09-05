<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 川口典礼サイト — Codex / 共通エージェントの作業入口

引き継ぎ確認日: 2026-09-05。上の Next.js 注意書きは保持する。

## 最初に読むもの

1. `CLAUDE.md` の本文を読む。名称は Claude 用だが、このサイトの既存の業務ルール・料金正本・変更制約として引き継ぐ。冒頭の `@AGENTS.md` は本ファイルへの参照なので、相互参照を再帰的に展開しない。
2. `docs/00-project-policy.md`、`docs/01-seo-aio-policy.md`、`docs/05-content-guidelines.md` を読む。
3. 現状と既知の不整合は `docs/seo-research/2026-09-05-site-baseline-and-codex-handoff.md` を参照する。計測値・外部サービスの状態は確認日付きの記録であり、将来の現状として扱わない。
4. 対象に応じて `skills/`、`docs/operations/`、最新の `docs/reports/` を読む。古い提案や過去の実行許可を、今回の変更・公開の許可として扱わない。

Claude Codeへ戻る場合も、`docs/operations/2026-09-06-claude-code-handoff.md` を作業再開の索引として使う。チャット履歴やCodex専用メモリがなくても確認できるよう、公開結果・接続・未完了事項はリポジトリ内に残す。

2026-09-05の実測更新は `docs/seo-research/2026-09-05-search-console-seo-meo-aio-audit.md`。GSC全129 URL検査、GA4流入・イベント、GBPブラウザ管理画面の実績を確認済み。GBPはAPI割り当て0でも既存ブラウザから閲覧できる。2026-09-06にサイト改善・Google商品価格訂正・公開を依頼され対応。最新状況は `docs/seo-research/2026-09-06-seo-meo-aio-improvements.md` を参照する。

ユーザーの現在の依頼範囲を基準に作業する。既存文書と実装が違う場合は、現行コード・日付付きの変更記録・公式仕様を照合し、不一致を記録する。分析依頼からサイト改修・外部送信・デプロイを推測しない。

## 事業・表現・導線

- 埼玉県川口市の葬儀社「川口典礼」の公式サイト。自社式場は「川口メモリアルホール」。目的は検索流入、AIによる参照、相談・問い合わせへの接続。
- 判断は、ご遺族への配慮 → 信頼感・地域密着 → 問い合わせ導線 → SEO/MEO/AIO → 実装の順。落ち着いた文体、余白、既存の色・書体、スマホファーストを維持する。
- 地域、自社式場、川口市めぐりの森への近接性、葬儀形式、対応実績が訴求軸。実績・設備・年数は `lib/company.ts` と承認済み記録を確認し、推測で更新しない。
- めぐりの森は川口市営の火葬場。自社施設や通夜・告別式を行える式場のように表現しない。他社斎場・寺院会館も運営主体、利用条件、手配の立場を区別する。
- 料金・プラン名の業務上の正本は `CLAUDE.md` §9、実装データは `lib/plans.ts`。会員価格・通常価格・市民葬価格・追加費用を混同しない。不一致は独断で解消しない。
- スマホ下部の固定CTAは電話と事前相談の2つ。LINEを追加しない。ペット面会とペット葬儀の導線を混ぜない。
- 写真・事例・口コミを創作しない。既存画像の改名・移動、全体デザインの刷新を依頼外で行わない。

## 構成とデータの参照先

| 対象 | 主なファイル |
|---|---|
| 技術・URL転送 | `package.json`、`next.config.ts`、`proxy.ts` |
| 共通メタ情報・計測・レイアウト | `app/layout.tsx`、`app/_layout-slots.tsx`、`components/analytics/GoogleTagManager.tsx` |
| 会社情報・店舗エンティティ | `lib/company.ts` |
| プラン | `lib/plans.ts`、`app/plan/[slug]/page.tsx` |
| 地域と地域ガイド | `lib/areas.ts`、`lib/area-local-guide.ts`、`app/area/*/page.tsx` |
| 自社ホール・外部斎場 | `lib/halls.ts`、`lib/saijo.ts`、`lib/temple-halls.ts` |
| 施行事例・声・コラム・FAQ | `lib/cases.ts`、`lib/voices.ts`、`lib/columns.ts`、`lib/faqs.ts` |
| 口コミ集計表示 | `lib/reviews.ts`（構造化データ側の数値は `lib/company.ts` にもある） |
| クロール・サイトマップ | `app/robots.ts`、`app/sitemap.ts` |
| 問い合わせ | `app/contact/`、`app/estimate/`、`app/lp/contact/`、`lib/forms/` |
| SEO管理 | `app/admin/seo/`、`lib/search-console/`、`docs/operations/seo-dashboard/README.md` |
| MEO / GBP | `scripts/gbp/README.md`、`scripts/gbp/`、`docs/operations/gbp/` |

Next.js App Router + TypeScript + Tailwind CSS。確認時の Next.js は 16.2.6、React は 19.2.4。更新時は `package.json` / lockfile と同梱ドキュメントを再確認する。

## SEO・MEO・AIOで守ること

- URLは `https://kawaguchitenrei.com/` を本番の基準とし、`trailingSlash: true` を維持する。ページの自己参照canonicalと「キーワードの主対象ページ」は別概念。カニバリ対策として無関係なページへcanonicalを向けない。
- 地域ページ・斎場ページ・プラン・事例・FAQを自然な内部リンクで結ぶ。結論先出し、地域固有情報、基本情報表、料金の条件、根拠のあるFAQを重視する。
- title、description、h1、canonical、OG画像、本文とJSON-LDの一致、sitemap、旧URL転送を対象ページの出力で確認する。ネストした `openGraph` は浅いマージなので、親の画像が自動で残ると仮定しない。
- `FuneralHome` / `Organization` / `WebSite` の共通エンティティは `lib/company.ts` を参照。`@id`、事業者名・住所・電話の表記を照合する。存在しない支店を地域ページのために作らない。
- `Review` / `aggregateRating` の編集は `CLAUDE.md` の制約を守る。構文が正しいことと、Googleの星表示対象になることは別。自社評価を自社サイトへ載せれば星が出る、と説明しない。
- FAQの本文は維持・改善の対象だが、FAQリッチリザルトやAI引用を保証しない。2026-09-05の公式確認ではFAQリッチリザルトは2026-05-07から表示終了。施策判断時に公式仕様を再確認する。
- `llms.txt` や専用スキーマをAIOの必須条件と決めつけない。AIへの言及、出典リンク、流入、問い合わせは別々に測る。
- MEOはサイト側の情報整合とGBP側の運用を分ける。APIスクリプトが存在するだけで承認済み・運用中としない。`apply.mjs --confirm` は公開情報を書き換える操作なので、分析タスクで実行しない。
- 古いSEO資料には現行title・対象ページと異なる記述がある。変更前に最新のGSC「クエリ×ページ」データと変更履歴を確認し、受け皿変更や地域ページの追加を反射的に行わない。

## Vercel・フォーム・計測

- 本番はVercelで配信。2026-09-05に公開URLの `Server: Vercel` と `x-vercel-id` を確認した。
- Git remoteは `kawaguchimemorial-del/kawaguchitenrei-site`。過去記録は `main` へのpush後にVercelへ反映する運用。現在のProduction Branch、Project ID、権限、環境変数の登録状態はVercel管理画面で確認する。ローカルに `vercel.json` / `.vercel/project.json` がなくても、Vercel未使用とは判断しない。
- `@vercel/analytics` は共通レイアウトに実装。GTMは `NEXT_PUBLIC_GTM_ID` で読み込み、フォーム完了イベントは `lib/analytics.ts`。実際のGA4設定・除外条件・イベント受信は外部側で別途確認する。
- フォームはServer Actions → `lib/forms/sendWebhook.ts` → Google Apps Script。BotID、honeypot等の既存対策を把握してから触る。実送信は通知や保存を起こすため、単なる表示確認として行わない。
- GASの仕様は `docs/operations/2026-08-27-gas-webhook-spec.md`、本体の写しは `docs/operations/gas/form-webhook.gs`。写しの変更とGoogle側のデプロイは別。送信項目を変える場合は両側を同期する。
- `click_tel` は電話タップであり、実通話・施行件数ではない。`docs/operations/2026-09-04-call-tracking.md` を参照する。
- **Codexの計測接続（2026-09-05確認）**: ユーザーの依頼に基づき、既存認証によるGSC・GA4の読み取りが成功した。`docs/operations/search-console/codex-readonly-access.md` と `scripts/search-console-audit.mjs` を参照。`node --env-file=.env.local` で既存値をプロセス内に渡し、値を表示・会話へ読み込まずに利用する。GBPは同日API割り当て0。接続済み認証をむやみに再発行しない。URL Inspectionは登録済みデータの読み取りであり、ライブテスト・登録リクエストではない。

## 変更制約と広告LP

- 明示的な依頼がない限り `package.json`、`components/layout/Header.tsx`、`Footer.tsx`、`MobileBottomCTA.tsx`、`funeral-system/` を変更しない（最後のディレクトリは確認時のチェックアウトには存在しない）。
- `.env*` と秘密情報の値は読まない・表示しない・編集しない・記録しない。参照資料には変数名と用途だけを書く。顧客情報、故人名、喪主名、相談内容をレポートやログに残さない。
- `public/images/tmp/tmp.txt` に触らない。作業開始時の未追跡・変更済みファイルを利用者の作業として扱い、上書きや削除をしない。
- `app/lp/**` は広告用。デザイン・構造の特例は `CLAUDE.md` §21に従う。`noindex`、sitemap除外、通常サイトからの誘導禁止を維持し、robotsのDisallowには加えない。言葉遣い・価格・個人情報の規律は共通。
- `app/admin/**`、`app/post/**`、`app/voice/survey/` は一般集客ページとは異なる用途。`noindex` / robots制御は認証の代わりではない。

## 検証と記録

- 開始前に `git status --short` と対象ファイルを確認し、短い作業方針を伝える。
- コード変更後は `npm run build`。必要に応じ `npm run lint` と `npm run dev` で対象画面・導線を確認する。
- 2026-09-05の基準はbuild成功、静的生成の進捗表示 `140/140`、本番sitemap `129 URL`。両者は数え方が違う。古い「131ページ」などを固定の正解にせず、対象ルートの意図しない減少を確認する。
- サイト変更・重要分析の記録は `skills/work-report/SKILL.md` に従い、`docs/reports/` に日本語HTMLと `index.html` のリンクを残す。Web公開ディレクトリには置かない。
- コミット・push・本番反映は今回の明示指示があるときだけ。完了時は変更ファイル、実行した検証と結果、未確認事項を簡潔に示す。

## 2026-09-06の運用更新

- 広告LPの現行実装は `docs/ad-lp/2026-09-06-lp-design-restore.md`、計測は `docs/ad-lp/2026-09-06-lp-measurement-runbook.md`。Codex の再設計記録 `2026-09-06-lp-redesign-and-measurement.md` は差し戻し済みの経緯として読む。広告配信先の切替は次回会議で決定するため未実施。古い外部LPの変更不可という前提を新LPへ適用しない。
- **LPは 2026-08-27 版の構成に差し戻し済み（2026-09-06）。** `app/lp/page.tsx` と `LpPlanTable` / `LpHalls` / `LpPreneed` / `LpPhoneBox` / `LpCtaBand` / `LpTopBar` / `LpStickyCta` を Tailwind で構成する。`LpContent.tsx` と `lp.module.css` は削除済み。6プランは会員価格・通常価格を併記した表で見せる。電話相談を主導線とする点、専用フォーム `/lp/contact/` を持つ点は変わらない。
- 変更後は `node scripts/test-lp-output.mjs` を実行する。ページ重量は**brotli 圧縮後 50KB 以下**で判定する（CLAUDE.md §21.2・2026-09-06 松澤判断）。非圧縮のバイト数は記録するだけで基準にしない。
- LPと本サイトは同じGA4の入口セッションで分離する。`scripts/ad-lp-report.mjs` は読み取り専用。既存SEO監査のGA4全体値が自動で分離されたわけではない。`lp_*` は既存Googleタグへ直接送出するので同名のGTMタグを重ねない。`generate_lead` と `lp_generate_lead`、`click_tel` と `lp_click_tel` を合算しない。

- 内部・テスト計測の除外は `docs/operations/2026-09-06-analytics-exclusion.md`。テスト時は本番URLに `?analytics=off` を付け、解除時のみ `?analytics=on` を使う。
- 共通OG画像と実更新日の管理は `lib/seo.ts`。sitemapのlastModifiedをビルド日時へ戻さない。
- トップの事例・声は最新6件。一覧には全件を維持する。
- 既存GSC認証は読み取り成功でも、2026-09-06のsitemap送信APIは403。接続済みブラウザでは送信成功。認証の再発行を前提にせず、読み取りと変更の権限を区別する。
