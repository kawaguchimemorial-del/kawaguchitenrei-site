# セキュリティヘッダー強化 — 引き継ぎ（2026-09-20）

別セッションで kawaguchitenrei.com の外部セキュリティ診断と、
「川口市 葬儀」検索上位 7 サイトとの比較を実施した。その結果と、
このプロジェクトで対応してほしい作業をまとめる。

## 1. 診断結果（本番 https://kawaguchitenrei.com、2026-09-20 時点）

### 問題なし
- HTTP → HTTPS 308 リダイレクト、HSTS `max-age=63072000`
- TLS 1.3、Let's Encrypt（期限 2026-10-19、Vercel 自動更新）
- `/.env` `/.git/config` 404、`/wp-login.php` `/xmlrpc.php` 403、`/admin/` は Basic 認証（proxy.ts）
- HTML 内に API キー・JWT・service_role 等の漏えいなし

### 改善が必要
| # | 項目 | 現状 |
|---|---|---|
| 1 | `X-Frame-Options` / `frame-ancestors` | 未設定（クリックジャッキング対策なし） |
| 2 | `X-Content-Type-Options: nosniff` | 未設定 |
| 3 | `Referrer-Policy` | 未設定 |
| 4 | `Permissions-Policy` | 未設定 |
| 5 | `Content-Security-Policy` | 未設定 |
| 6 | `Access-Control-Allow-Origin: *` | トップページに付与されている。API ルートに同じ設定が及んでいないか要確認 |
| 7 | トップページ HTML 588KB | セキュリティではなく性能。別タスクとして認識のみ |

### 競合比較（同基準）
| サイト | HSTS | XFO/nosniff | CSP | 備考 |
|---|---|---|---|---|
| **kawaguchitenrei.com** | ✅ | ❌ | ❌ | Vercel/Next.js、攻撃面が最小 |
| e-sogi.com | ❌ | ✅ | ❌ | |
| aeonlife.jp | ❌ | ✅ | ❌ | |
| soogi.jp | ❌ | ✅ | ❌ | nginx バージョン露出 |
| kinpoudou.co.jp | ❌ | ❌ | ❌ | WP、wp-login 露出 |
| sagamitenrei.com | ❌ | ❌ | ❌ | WP |
| musubisu-osoushiki.jp | ❌ | ❌ | ❌ | WP |
| manaka-net.com | ❌ | ❌ | ❌ | WP、wp-login 200 |

HSTS を持つのは自サイトのみ。#1〜#4 を入れれば大手 3 社に並び、
#5 まで入れれば比較対象で唯一のフル装備になる。

## 2. 依頼する作業

### Step 1: 基本ヘッダー追加（低リスク・即実施可）

`next.config.ts` に `headers()` を追加する（既存の `redirects()` と並べる。`withBotId` ラップは維持）。

```ts
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
        },
      ],
    },
  ];
},
```

- `geolocation=()` は、現在地から斎場検索などで `navigator.geolocation` を使っていれば `geolocation=(self)` にする。事前に `grep -rn geolocation app components lib` で確認。
- `/admin` `/api/admin` は proxy.ts の Basic 認証があるため、そのままで問題なし。

### Step 2: CSP（中リスク・Report-Only から開始）

いきなり enforce すると GTM/GA・Google Maps・外部 API が壊れる可能性が高いので、
まず `Content-Security-Policy-Report-Only` で 1〜2 週間観察してから enforce に切り替える。

コード内で確認できた外部ドメイン（`grep` 結果）:
- `https://www.googletagmanager.com`（GTM / GA4）
- `https://www.google.com`（reCAPTCHA or Maps embed の可能性）
- `https://api.zipaddress.net`、`https://geoapi.heartrails.com`（住所 API — `connect-src`）
- `botid`（Vercel BotID — `/_vercel/*` 系、`connect-src 'self'` で足りるはず）
- Vercel Analytics / Speed Insights を使っていれば `https://va.vercel-scripts.com` 等

たたき台:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https:;
connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://api.zipaddress.net https://geoapi.heartrails.com;
frame-src https://www.google.com https://www.googletagmanager.com;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
```

- Next.js App Router のインライン script があるため、当面 `script-src 'unsafe-inline'` は許容。
  nonce 方式（`proxy.ts` で nonce 生成 → `headers` に埋め込み）は次フェーズ。
- `frame-src` は実際に埋め込んでいるもの（Google Maps なら `https://www.google.com/maps/embed`、YouTube なら `https://www.youtube.com`）に合わせて調整。
- 観察には `report-to` / `report-uri` を設定するか、Vercel の Log Drains・ブラウザ DevTools のコンソールで違反を確認する。

### Step 3: CORS の確認

`Access-Control-Allow-Origin: *` がどこで付いているか特定する。

- `next.config.ts` には無い → Vercel ダッシュボードのプロジェクト設定、`vercel.json`、または Next.js のデフォルト挙動を確認。
- `app/api/**/route.ts` で意図せず `*` を返しているものが無いか `grep -rn "Access-Control" app` で確認。
- 公開して問題ない読み取り専用 API 以外は `*` を外すか、`https://kawaguchitenrei.com` に限定する。

### Step 4: （任意）`public/.well-known/security.txt`

```
Contact: mailto:<連絡先>
Expires: 2027-09-20T00:00:00.000Z
Preferred-Languages: ja, en
```

## 3. 検証方法

デプロイ後（Preview でも可）:

```bash
curl -sI https://kawaguchitenrei.com/ | grep -iE 'x-frame|x-content-type|referrer|permissions|content-security|strict-transport'
```

すべて出れば OK。CSP はブラウザ DevTools のコンソールで違反ログが出ないことをトップ・斎場詳細・お問い合わせ・見積フォームの 4 ページで確認する。

## 4. やらないこと

- `/admin` 認証方式の変更（現状の proxy.ts で十分）
- HTML サイズ削減（別タスク）
- HSTS preload 申請（効果はあるが取り消しが難しいので、判断はオーナーに委ねる）
