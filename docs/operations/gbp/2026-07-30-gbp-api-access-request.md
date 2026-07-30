# Google Business Profile API アクセス申請 手順書

作成日: 2026-07-30
操作者: 松澤（Google アカウントでの作業）
所要: 実作業 30〜45分 ／ その後 Google の審査待ち

目的: GBP をスクリプトから操作できるようにする。
関連: `scripts/gbp/README.md`（承認後に使うスクリプト群）／`docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md`

---

## 0. 事前に確認すること

| 要件（Google 公式） | 川口典礼の状況 |
|---|---|
| 検証済みかつ **60日以上アクティブ**なビジネスプロフィールを管理している | ✅ 長期運用中 |
| ビジネスプロフィールに登録された**ウェブサイトを保有**している | ✅ https://kawaguchitenrei.com/ |

**作業に使う Google アカウント**：GBP のオーナーまたは管理者として登録されているアカウント。
申請フォームでも「GBP のオーナー/管理者として登録されているメールアドレス」を使うよう指定されています。
別アカウントで申請すると却下されるため、ここを間違えないでください。

> 💡 API は**無料**です（公式：*"The Google My Business API is available to registered users at no charge."*）。
> 請求先アカウントの登録は不要です。

---

## STEP 1. Google Cloud プロジェクトを作る（10分）

1. https://console.cloud.google.com/ を開く
2. 画面上部の**プロジェクト選択メニュー**（現在のプロジェクト名が出ている部分）をクリック
3. 右上の **「新しいプロジェクト」** をクリック
4. 次のように入力して「作成」

   | 項目 | 入力値 |
   |---|---|
   | プロジェクト名 | `kawaguchitenrei-gbp` |
   | 組織 / 場所 | 既定のまま（組織なしで問題ありません） |

5. 作成完了後、**プロジェクト選択メニューで作ったプロジェクトに切り替える**

### ⚠️ ここで必ずメモすること

ダッシュボード（Console のトップ）の **「プロジェクト情報」カード**に表示される **プロジェクト番号**を控えてください。

```
プロジェクト番号: 123456789012   ← 12桁の数字。申請フォームで必要
プロジェクト ID : kawaguchitenrei-gbp-xxxxx
```

**プロジェクト番号（数字）** と **プロジェクト ID（文字列）** は別物です。申請フォームで求められるのは**番号**の方です。

> 既存のプロジェクト（Search Console 用に作ったもの）を流用しても構いません。
> その場合は新規作成をスキップし、そのプロジェクトの番号を控えてください。

---

## STEP 2. API を有効化する（15分）

プロジェクトを選択した状態で、以下を1つずつ有効化します。

**やり方（各APIで同じ）**
1. 画面上部の検索窓に API 名を入力
2. 検索結果の「Marketplace」または「API とサービス」に出てきた項目をクリック
3. **「有効にする」** ボタンをクリック
4. 有効化されたら、次の API へ

**いま有効化できる7つ**

- [ ] My Business Account Management API
- [ ] My Business Business Information API
- [ ] My Business Q&A API
- [ ] My Business Place Actions API
- [ ] My Business Notifications API
- [ ] My Business Verifications API
- [ ] My Business Lodging API

**承認後に有効化する1つ**

- [ ] Google My Business API ← **承認されるまで Console に表示されません（後述）**

> ⚠️ **「Google My Business API」が検索しても出てこないのは正常です。**
> 公式ドキュメントに次のとおり明記されています。
>
> > "The Google My Business API is only visible in the Google API Console to users who
> > submit and receive approval for their Google Account through the access request form."
>
> このAPIは**アクセス申請が承認されたアカウントにだけ表示される**仕様です。
> 見つからないまま STEP 3 の申請に進んでください。承認メールが届いたあとに検索すると表示されます。

> 「Lodging（宿泊）」は葬儀業には関係ありませんが、公式ドキュメントで有効化が指示されているため、
> 指示どおり有効化してください。有効化しただけで費用は発生しません。

### 確認方法

「API とサービス」→「有効な API とサービス」を開き、上記7つが一覧に並んでいればOKです。

### スクリプトとの関係

`scripts/gbp/` のスクリプトが使うのは**7つの側にある API だけ**です。

| スクリプト | 使う API | 7つに含まれるか |
|---|---|---|
| `dump.mjs` / `diff.mjs` / `apply.mjs` | Account Management / Business Information / Q&A | ✅ |
| `performance.mjs` | Business Profile Performance | ✅ |

8つ目の `Google My Business API`（旧 v4）は写真・投稿・口コミ返信を扱う古い API で、
現在のスクリプトでは使っていません。**有効化が承認後になっても当面の作業に影響はありません。**

---

## STEP 3. アクセス申請を出す（10分）★ここが本番

申請フォーム：**https://support.google.com/business/contact/api_default**

### 入力内容

| 項目 | 入力値 |
|---|---|
| メールアドレス | **GBP のオーナー/管理者として登録されているアドレス**（kawaguchi.memorial@gmail.com など） |
| 申請種類 | ドロップダウンから **「Application for Basic API Access」** を選択 |
| プロジェクト番号 | STEP 1 で控えた**12桁の数字** |
| 会社名 | 株式会社 川口典礼 |
| ウェブサイト | https://kawaguchitenrei.com/ |
| 管理するプロフィール数 | 1 |

### 用途の説明（英語欄がある場合はこちらを貼り付け）

```
We operate a single funeral home in Kawaguchi City, Saitama, Japan
(Kawaguchi Tenrei / Kawaguchi Memorial Hall), and we manage one
verified Google Business Profile for it.

We would like API access for our own single location only, in order to:

1. Keep our business information consistent with our website
   (categories, business hours, description, service items).
2. Post and answer frequently asked questions (Q&A) so that customers
   can find accurate information about our services and pricing.
3. Retrieve performance metrics (calls, direction requests, impressions)
   for our monthly internal reporting.

We do not manage profiles for third parties and we do not intend to
resell or redistribute any data. All updates are for our own business
listing only.

Our website: https://kawaguchitenrei.com/
```

### 用途の説明（日本語欄の場合）

```
埼玉県川口市で葬儀社（株式会社川口典礼／川口メモリアルホール）を1店舗運営しており、
自社の検証済みビジネスプロフィールを1件管理しています。

自社の1拠点のみを対象に、以下の用途で API 利用を希望します。

1. 基本情報（カテゴリ・営業時間・説明文・サービス項目）を自社サイトと一致させ、
   表記の揺れをなくすため
2. よくあるご質問（Q&A）を投稿・回答し、料金やサービス内容の正確な情報を
   お客様に届けるため
3. パフォーマンス指標（通話数・ルート検索数・表示回数）を取得し、
   月次の社内レポートに使うため

第三者のプロフィール管理は行いません。データの再販・再配布も行いません。
更新対象は自社のビジネスプロフィールのみです。

自社サイト: https://kawaguchitenrei.com/
```

### 申請時の注意

- **「代理店として複数店舗を管理する」と書かないこと。** 自社1拠点のみと明記した方が承認されやすいです
- データの再販・再配布をしないことを明記する
- 送信後、**確認メールが届きます**。審査結果も同じアドレスに届きます

---

## STEP 4. 承認されたかを確認する

Google Cloud Console で確認できます。

1. 「API とサービス」→「割り当てとシステム上限」（Quotas）
2. **My Business Business Information API** を選択
3. QPM（1分あたりのリクエスト数）を見る

| 表示 | 意味 |
|---|---|
| **0 QPM** | ❌ **未承認**（この状態ではスクリプトは動きません） |
| **300 QPM** | ✅ **承認済み**（使えます） |

審査期間は公式に明記されていません。数日〜数週間を見ておいてください。
**「レビュー後にフォローアップのメールを送る」**とだけ案内されています。

---

## STEP 5. 承認後：OAuth 認証情報の準備

### 5-1. OAuth クライアントの確認

Search Console 用の OAuth クライアント（`GOOGLE_OAUTH_CLIENT_ID`）が既に `.env.local` にあります。

- **同じ Cloud プロジェクトに OAuth クライアントがある場合** → そのまま流用できます。5-2 へ
- **別プロジェクトの場合** → GBP を有効化したプロジェクトで OAuth クライアントを新規作成します

**新規作成する場合**
1. 「API とサービス」→「認証情報」→「＋ 認証情報を作成」→「OAuth クライアント ID」
2. アプリケーションの種類：**デスクトップアプリ**
3. 名前：`kawaguchitenrei-gbp-local`
4. 作成後に表示される**クライアント ID とクライアントシークレット**を控える
5. 「OAuth 同意画面」で、テストユーザーに GBP 管理者のアドレスを追加

> ⚠️ クライアントシークレットはチャットに貼らないでください。`.env.local` にだけ保存します。

### 5-2. refresh_token を取り直す

現在のトークンは Search Console スコープのみです。GBP スコープを含めて再取得します。

```bash
node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all
```

1. ターミナルの案内どおり `tmp/auth-url.txt` の URL をブラウザで開く
2. **GBP の管理者アカウント**でログインして承認
3. `tmp/refresh-token.txt` に書き出された値を `.env.local` の
   `GOOGLE_OAUTH_REFRESH_TOKEN=` に転記
4. `tmp/refresh-token.txt` と `tmp/auth-url.txt` を削除

> 既に承認済みのアプリでは refresh_token が再発行されません。その場合は
> https://myaccount.google.com/permissions で対象アプリのアクセスを取り消してから再実行してください
> （スクリプトが同じ案内を表示します）。

### 5-3. 動作確認

```bash
node scripts/gbp/dump.mjs
```

現在の設定が読み取れれば成功です。**このスクリプトは読み取りのみで、何も書き換えません。**

403 エラーが出た場合は、スクリプトが原因の候補（API未有効化／未承認／スコープ不足）を表示します。

---

## 審査を待つ間にやること

審査完了を待つ理由はありません。**プレイブックの Day 1〜2 を手作業で進めてください。**

`docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.html` をブラウザで開くと、
貼り付け用のコピーボタン付きで作業できます。

| 優先 | 作業 | 所要 |
|---|---|---|
| 1 | カテゴリ（「火葬場」を選ばない）・営業時間・属性 | 30分 |
| 2 | ビジネス説明文（コピーボタンあり） | 10分 |
| 3 | サービス8件（夕暮れ家族葬を含む） | 60分 |
| 4 | Q&A 10問 | 40分 |

API が通った後は、手作業で入れた内容と `scripts/gbp/desired.mjs` の期待値を
`diff.mjs` で突き合わせられます。**手作業が無駄になることはありません。**

---

## 困ったときの切り分け

| 症状 | 原因の候補 |
|---|---|
| 「Google My Business API」が検索に出てこない | **正常。**承認済みアカウントにのみ表示される仕様。7つを有効化して申請へ進む |
| 申請フォームで種類を選べない | ドロップダウンで「Application for Basic API Access」を探す。無い場合は別の入口のフォームを開いている |
| 却下された | 申請メールアドレスが GBP のオーナー/管理者でない可能性が高い。確認して再申請 |
| Quota が 0 のまま | 未承認。フォローアップメールを確認 |
| `dump.mjs` が 403 | スクリプトが候補を表示します。7API有効化 → 承認 → スコープの順に確認 |
| `dump.mjs` が 401 | refresh_token の再取得が必要 |

---

## 注意事項

- クライアントシークレット・refresh_token は**チャットに貼らない**でください。`.env.local`（git 追跡外）にのみ保存します
- 承認後も、実際の書き込みは `apply.mjs --confirm` を実行するまで発生しません
- 書き込み前には必ず差分を提示し、承認を得てから実行します（GBP は公開情報のため）
