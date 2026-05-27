# SEO 簡易ダッシュボード 運用ガイド

`/admin/seo/` で Google Search Console（GSC）の Search Analytics データを読み取り専用で表示するための管理画面。

このページは **管理者専用** で、HTTP Basic Auth で保護される。`robots.txt` の `Disallow: /admin/` と各ページの `metadata.robots = { index: false, follow: false }` でクローラからも除外している。

---

## 1. 公開サイトへの影響

- 公開サイト本体（`/`、`/area/*`、`/saijo/*` など）への変更は **なし**
- `app/layout.tsx` は `app/_layout-slots.tsx`（`"use client"` の薄いラッパー）経由で Header / Footer / MobileBottomCTA を呼ぶ形に変更。`usePathname()` が `/admin` で始まる場合は `null` を返すため、admin 画面ではこれら 3 つは表示されない
- `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx` 本体は **無変更**
- GA4 / GTM の発火対象に `/admin/*` は含めない方針

---

## 2. 認証の仕組み

- Next.js 16 から `middleware` は `proxy` にリネームされたため、本プロジェクトはルートの `proxy.ts` を使用
- `proxy.ts` の `matcher` は `/admin/:path*` と `/api/admin/:path*` のみ
- HTTP Basic Auth（環境変数 `SEO_DASHBOARD_USER` / `SEO_DASHBOARD_PASSWORD` で照合）
- 認証情報は **timing-safe 比較**でリーク耐性を持たせている

---

## 3. データ取得（OAuth2 refresh_token 方式）

- Search Console API（`searchanalytics.query`）を **OAuth2 refresh_token** 経由で呼び出す
- スコープ: `https://www.googleapis.com/auth/webmasters.readonly`（読み取り専用）
- 認証主体は **通常の Google アカウント**（Search Console 管理権限を持つアカウント）
- スクレイピングは行わない（GSC 公式 API のみ）
- 取得項目：クエリ / ページ / デバイス、クリック数・表示回数・CTR・平均掲載順位

> **過去の経緯**：当初はサービスアカウント方式（`GOOGLE_CLIENT_EMAIL` / `GOOGLE_PRIVATE_KEY`）を想定したが、Search Console 側でサービスアカウントのメールアドレスを「ユーザーを追加」しようとした際に「メールアドレスが見つからない」と弾かれ、ドメインプロパティ / URL プレフィックスプロパティの双方で API が 403 を返したため、OAuth2 refresh_token 方式に切り替えた。

### キャッシュ

- `next/cache` の `unstable_cache` で **6 時間 (21600 秒)** キャッシュ
- キャッシュキーは `["search-console-dashboard:v3", range, device]`
- **失敗時はキャッシュしない**（成功時のみキャッシュ）
- 3 セクションを `Promise.allSettled` で独立処理し、全 reject 時のみ throw

### 期間

- 過去 7 日 / 過去 28 日（デフォルト） / 過去 3 か月
- 終了日は **3 日前**（GSC のデータ確定遅延に対応）

### デバイス

- 全体 / モバイル / PC / タブレット
- `?device=MOBILE` 等のクエリで切り替え

### エラー時の表示

- API 失敗時のみ「データを取得できませんでした」を表示
- API 成功・データ 0 件 → 表ヘッダー + 「データがありません」または「—」
- 1〜2 セクション失敗 → 失敗セクションは空、成功セクションは表示

---

## 4. 必要な環境変数

`.env.local`（ローカル）と Vercel の Project Environment Variables（Production / Preview / Development）の両方に設定する。

| 変数名 | 用途 |
|---|---|
| `GOOGLE_OAUTH_CLIENT_ID` | Google Cloud で作成した OAuth 2.0 クライアント ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | 同 クライアントシークレット |
| `GOOGLE_OAUTH_REFRESH_TOKEN` | `scripts/get-refresh-token.mjs` で取得した refresh_token |
| `SEARCH_CONSOLE_SITE_URL` | GSC プロパティの URL。ドメインプロパティなら `sc-domain:kawaguchitenrei.com`、URL プレフィックスなら `https://kawaguchitenrei.com/` |
| `SEO_DASHBOARD_USER` | Basic Auth ユーザー名 |
| `SEO_DASHBOARD_PASSWORD` | Basic Auth パスワード（十分に長いランダム文字列） |

**絶対に守ること**：
- `.env.local` をコミットしない
- `refresh_token` / `client_secret` をログ・docs・コミットに残さない
- スクリプトもファイル書き込みしない設計

---

## 5. Google Cloud 側の準備

### 5.1 OAuth 同意画面の設定

1. https://console.cloud.google.com/apis/credentials/consent を開く
2. アプリ名・サポートメール・デベロッパー連絡先を入力
3. スコープに `.../auth/webmasters.readonly` を追加
4. **テストユーザー**として、Search Console を閲覧できる Google アカウントを追加
   - 「テスト中」公開ステータスなら、テストユーザーのみが利用可（個人運用なら十分）
   - 「本番」公開ステータスにする場合は審査が必要（個人利用なら推奨しない）

### 5.2 OAuth 2.0 クライアント ID の作成

1. https://console.cloud.google.com/apis/credentials を開く
2. 「認証情報を作成」→「OAuth クライアント ID」
3. アプリケーションの種類：**「ウェブ アプリケーション」**
4. 名前：任意（例：`Kawaguchitenrei SEO Dashboard`）
5. **承認済みのリダイレクト URI** に以下を追加：
   - `http://localhost:4321/oauth-callback`（refresh_token 取得スクリプト用）
6. 「作成」
7. ダイアログに表示される **クライアント ID** と **クライアント シークレット** を控える
8. `.env.local` に転記：
   ```
   GOOGLE_OAUTH_CLIENT_ID=<クライアント ID>
   GOOGLE_OAUTH_CLIENT_SECRET=<クライアント シークレット>
   ```
   ※ クォートは付けない

### 5.3 Search Console API の有効化

すでに有効化済みのはずですが、未有効なら：
1. https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
2. 「有効にする」

---

## 6. refresh_token の取得（一時スクリプト）

`.env.local` に `GOOGLE_OAUTH_CLIENT_ID` と `GOOGLE_OAUTH_CLIENT_SECRET` を設定した状態で：

```powershell
node --env-file=.env.local scripts/get-refresh-token.mjs
```

1. 認証 URL は `tmp/auth-url.txt` に書き出される（ターミナルには表示しない設計）
2. `type tmp\auth-url.txt` で URL を確認し、ブラウザで開く
3. Search Console を閲覧できる Google アカウントでサインインして「許可」
4. ブラウザが `http://localhost:4321/oauth-callback` に戻り、成功画面が表示される
5. refresh_token は `tmp/refresh-token.txt` に書き出される（`tmp/` は `.gitignore` 除外済み）
6. `type tmp\refresh-token.txt` で値を確認
7. `.env.local` の `GOOGLE_OAUTH_REFRESH_TOKEN=` に転記
8. Vercel ダッシュボードの環境変数にも同じ値を手動で設定
9. `del tmp\auth-url.txt` と `del tmp\refresh-token.txt` でファイルを削除

### refresh_token が返ってこない場合

「`refresh_token` が返されませんでした」と表示された場合、既に過去にこのアプリを承認済みのため Google が再発行しません。
1. https://myaccount.google.com/permissions を開く
2. 該当アプリを探して「アクセス権を削除」
3. もう一度スクリプトを実行

---

## 7. Search Console 側の準備

OAuth2 方式では、認証主体が **Google アカウント本人**なので、そのアカウントが Search Console プロパティの**閲覧権限を持っていれば追加作業は不要**です。

念のため確認：
1. https://search.google.com/search-console を開く
2. 認証に使う Google アカウントでサインインしている状態で、`kawaguchitenrei.com` プロパティが見えるか確認
3. 見える＝そのアカウントに権限がある = API も同じ権限で動作

サービスアカウント方式と異なり、「ユーザーを追加」する必要はありません。

---

## 8. Vercel 側の準備

1. Project → Settings → Environment Variables
2. 上記 6 つの変数を **Production / Preview / Development 全部** に追加
3. 設定後に再デプロイで反映

⚠ Vercel に設定する `GOOGLE_OAUTH_REFRESH_TOKEN` は、ローカルと同じ値で OK（refresh_token はアカウントに紐づくので、環境ごとに分ける必要なし）。

---

## 9. ローカル動作確認

```powershell
npm run dev
```

ブラウザで `http://localhost:3000/admin/seo/` を開く → Basic Auth プロンプト → `SEO_DASHBOARD_USER` / `SEO_DASHBOARD_PASSWORD` を入力。

環境変数が未設定の状態でアクセスした場合：
- `SEO_DASHBOARD_USER` / `SEO_DASHBOARD_PASSWORD` 未設定 → 500（プロキシ層）
- `GOOGLE_OAUTH_*` 未設定 → 認証は通るが「データを取得できませんでした」表示

---

## 10. 注意点

- GSC データは **2〜3 日の遅延**あり。直近日付は数値が未確定の場合がある
- 表示閾値に満たない重要キーワードは「—」表示になる（GSC 仕様）
- API クォータは 1 分 1200 リクエスト程度。キャッシュで十分回避できる
- 重要キーワードは `lib/search-console/keywords.ts` の配列で管理
- 期間切替・デバイス切替は URL クエリ（`?range=...&device=...`）で行う
- refresh_token は無期限（ただし、Google 側で取り消されたり、6 か月以上未使用で失効する場合あり）
- 失効時は `scripts/get-refresh-token.mjs` を再度実行して新しい refresh_token を取得

---

## 11. トラブルシュート

| 症状 | 確認ポイント |
|---|---|
| 401 が返る | Basic Auth 認証情報、Vercel 環境変数 |
| 「データを取得できませんでした」 | dev サーバログの `[search-console] *failed:` 行で原因を確認 |
| `User does not have sufficient permission` (403) | 認証に使った Google アカウントが Search Console プロパティの権限を持っていない。プロパティのユーザー一覧を確認 |
| `Request contains an invalid argument` (400) | `SEARCH_CONSOLE_SITE_URL` の形式違反。`sc-domain:...` または `https://....../`（末尾スラッシュ）で指定 |
| `invalid_grant` | refresh_token 失効。スクリプトで再取得 |
| 一部キーワードが「—」 | GSC のプライバシー閾値未満（正常） |
| データが古い | キャッシュ 6時間。手動再取得は再デプロイで反映、または `revalidateTag("search-console")` |

---

## 12. ファイル構成

```
app/
  admin/
    layout.tsx                   # admin 専用 layout（noindex）
    seo/
      page.tsx                   # ダッシュボード本体
      components/
        RangeSwitch.tsx
        DeviceSwitch.tsx
        MetricsTable.tsx
  _layout-slots.tsx              # Header/Footer/MobileBottomCTA を /admin で抑制
lib/
  search-console/
    client.ts                    # OAuth2 クライアント + siteUrl
    queries.ts                   # データ取得 + キャッシュ
    keywords.ts                  # 重要キーワード 20 件
    types.ts
scripts/
  get-refresh-token.mjs          # refresh_token 取得スクリプト（一時）
proxy.ts                         # Basic Auth (Next.js 16 proxy)
app/robots.ts                    # /admin Disallow
```
