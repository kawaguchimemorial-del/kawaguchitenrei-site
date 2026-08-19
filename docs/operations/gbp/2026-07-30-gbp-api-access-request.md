# Google Business Profile API アクセス申請 手順書

作成日: 2026-07-30
操作者: 松澤（Google アカウントでの作業）
所要: 実作業 30〜45分 ／ その後 Google の審査待ち

目的: GBP をスクリプトから操作できるようにする。
関連: `scripts/gbp/README.md`（承認後に使うスクリプト群）／`docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md`

---

> ⛔ **この申請は 2026-08-18 に却下されました。**
> 現在有効な手順書は `docs/operations/gbp/2026-08-19-gbp-api-reapplication.md`（再申請手順書）です。
> 本ファイルは 7/30・8/17 の申請経緯の記録として残しています。


## ✅ 再申請の記録（2026-08-17）── 現在有効な申請はこちら

| 項目 | 内容 |
|---|---|
| **申請日** | **2026-08-17** |
| **ケース ID** | **`2-1581000041699`** ← Google が画面で発行した受付番号 |
| **プロジェクト番号** | **`487251905710`**（`.env.local` の OAuth クライアントが属するプロジェクト） |
| 申請アカウント | kawaguchi.memorial@gmail.com |
| 申請種類 | Application for Basic API Access |
| Google 側の案内 | **審査に 7〜10 営業日**（許可リスト登録リクエストが多数のため） |
| **承認確認の目安** | **2026-08-26（水）〜 2026-08-31（月）** |
| API 有効化 | ✅ プロジェクト 487251905710 で有効化済み（8/17 に 429 応答で確認） |
| トークン | ✅ 8/17 に `--scope=all+gmail` で取得済み。**承認後の再取得は不要** |

> **前回（7/30）との決定的な違い**：今回は**画面上でケース ID が発行された**。
> 7/30 の申請にはケース ID の記録が無く、Gmail 全検索でも受付確認メールが 1 通も存在しなかった。
> これが「7/30 の申請は送信されていなかった」と判断した根拠。
> **今後は、申請時に必ずケース ID を控えること。**

### 承認確認の手順（2026-08-26 以降）

```
node scripts/gbp/dump.mjs
```

| 結果 | 意味 |
|---|---|
| アカウント情報が返る | ✅ **承認済み**。`diff.mjs` → `apply.mjs` に進む |
| `429 Quota exceeded ... Requests per minute` | 🔴 まだ未承認（割り当て 0） |
| `has not been used in project ... or it is disabled` | ⚠️ プロジェクト取り違え。再確認が必要 |

Gmail 側の確認（承認・却下メール）は次で行える：

```
node --env-file=.env.local scripts/gmail-search.mjs --preset=gbp
```

---

## 旧申請の記録（2026-07-30）── 送信されていなかった可能性が高い

| 項目 | 内容 |
|---|---|
| **申請日** | **2026-07-30** |
| 申請者 | 松澤（GBP オーナー/管理者アカウント） |
| 申請種類 | Application for Basic API Access |
| 申請フォーム | https://support.google.com/business/contact/api_default |
| 「フォームを知った経路」欄 | Google Business Profile API 公式ドキュメント（Prerequisites ページ） |
| STEP 1 プロジェクト作成 | ✅ 完了 |
| STEP 2 API 有効化（7つ） | ✅ 完了 |
| STEP 3 申請提出 | ✅ **完了（2026-07-30）** |
| STEP 4 承認確認 | 🔴 **2026-08-17 に確認 → 0 QPM（未承認）** |
| STEP 5 トークン再取得 | 未着手（承認後） |

### 確認記録：2026-08-17（申請から18日経過）

| 確認項目 | 結果 |
|---|---|
| My Business Account Management API のステータス | **有効**（API有効化は完了している） |
| **割り当て `Requests per minute`** | 🔴 **0 = 未承認** |
| `scripts/gbp/dump.mjs` の実行 | 403 `Request had insufficient authentication scopes`（※トークンに `business.manage` スコープが無いため。承認可否とは無関係） |
| Cloud の無料トライアル | バナー表示あり。**ただし GBP API は無料・請求先アカウント不要のため無関係。アップグレードはしない** |

---

## 🔴 原因判明（2026-08-17）── 待っても永久に承認されない状態だった

同日、Gmail API と GBP API を実際に叩いて調査した結果、**2つの問題が確定した。**

### 問題1：申請の受付確認メールが1通も存在しない

Gmail を読み取り権限で検索（迷惑メール・ゴミ箱を含む）した結果：

| 検索クエリ | 結果 |
|---|---|
| `"Business Profile API"` | **該当なし** |
| `"Google My Business"` | **該当なし** |
| `subject:(API AND (access OR approved OR denied OR rejected))` | **該当なし** |
| `api_default OR "support.google.com/business"` | **該当なし** |
| `"Basic API Access" OR "API access"` | **該当なし** |
| `after:2026/07/28 before:2026/08/05`（全40件を目視） | 申請関連なし |
| `from:google.com (...)` | GBPの定期通知（実績レポート・口コミ・営業時間）のみ |

→ **2026-07-30 の申請は、実際には送信されていなかった可能性が高い。**
（承認・却下・追加情報依頼のいずれも届いておらず、受付控えも無い）

### 問題2：🔴 プロジェクトが食い違っている（これが決定的）

`scripts/gbp/dump.mjs` を **business.manage スコープ付きのトークン**で実行した結果：

```
My Business Account Management API has not been used in
project 487251905710 before or it is disabled.
```

| 項目 | 所属プロジェクト |
|---|---|
| `.env.local` の OAuth クライアント（GSC・GBP・Gmail 共通で使用） | **487251905710** |
| GBP 系 API を有効化したプロジェクト（8/17 のスクショで「有効」だった方） | **別プロジェクト** |

**割り当て（クォータ）はプロジェクト単位で付与される。**
そのため、たとえ申請が承認されても、**今の OAuth クライアントからは永久に呼び出せない。**

> つまり 8/17 に確認した「割り当て 0」は、
> **「審査待ちだから 0」ではなく「そもそも別のプロジェクトを見ていた」**可能性がある。

---

## 次のアクション（2026-08-17 以降）— 再申請が必要

### STEP A. プロジェクト 487251905710 で GBP 系 API を有効化する

以下のリンクはプロジェクト番号を指定済み。開いて「有効にする」を押すだけ。

| API | 有効化リンク |
|---|---|
| My Business Account Management | `https://console.developers.google.com/apis/api/mybusinessaccountmanagement.googleapis.com/overview?project=487251905710` |
| My Business Business Information | `https://console.developers.google.com/apis/api/mybusinessbusinessinformation.googleapis.com/overview?project=487251905710` |
| My Business Q&A | `https://console.developers.google.com/apis/api/mybusinessqanda.googleapis.com/overview?project=487251905710` |
| Business Profile Performance | `https://console.developers.google.com/apis/api/businessprofileperformance.googleapis.com/overview?project=487251905710` |

※ `scripts/gbp/` が使うのはこの 4 つ。他（Lodging / Notifications / Place Actions / Verifications）は不要。

### STEP B. **プロジェクト番号 487251905710** で申請し直す

- フォーム：https://support.google.com/business/contact/api_default
- 申請種類：Application for Basic API Access
- **プロジェクト番号欄に必ず `487251905710` を入力する**（ここが今回の失敗要因）
- 申請アカウント：GBP のオーナー/管理者である `kawaguchi.memorial@gmail.com`
- **送信後、受付確認メールが届くかを必ず確認する**（届かなければ送信できていない）

### STEP C. 承認後

1. `node scripts/gbp/dump.mjs` で読み取り確認（トークンは 8/17 に `all+gmail` で取得済み・再取得不要）
2. `diff.mjs` で差分確認 → `apply.mjs`

### 補足：不要な作業

- ❌ **Cloud の有料アカウントへのアップグレードは不要**（GBP API は無料・請求先アカウント登録不要）
- ❌ 認証情報の作り直しは不要（OAuth クライアントは正常に動作している）
- ❌ トークンの再取得は不要（2026-08-17 に `--scope=all+gmail` で取得済み）

---

### 参考：当初の予定（2026-08-09 頃）

1. **承認確認**（Google Cloud Console）
   - 「API とサービス」→「割り当てとシステム上限」→ **My Business Business Information API**
   - **0 QPM = 未承認 ／ 300 QPM = 承認済み**
2. 承認メール（フォローアップ）の受信を確認する
3. **承認されていた場合**
   - `Google My Business API` を Console で検索して有効化（この時点で初めて表示される）
   - `node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all` でトークン再取得
   - `node scripts/gbp/dump.mjs` で読み取り確認 → `diff.mjs` で差分確認
4. **未承認のままの場合**
   - フォローアップメールの有無を確認
   - 却下されていた場合は、申請メールアドレスが GBP のオーナー/管理者かを再確認して再申請

> 自動スケジュールは運用していないため、**この確認は手動で行う**。
> 2026-08-09 を過ぎても連絡がない場合は、さらに1週間ほど待って再確認する
> （審査期間は公式に明記されていない）。

### 審査を待つ間

プレイブック `docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.html` の Day 1〜2 を手作業で進める。
API 承認後に `diff.mjs` で突き合わせられるため、手作業は無駄にならない。

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
| メールアドレス | `kawaguchi.memorial@gmail.com`（GBP のオーナー/管理者アカウント） |
| 申請種類 | ドロップダウンから **「Application for Basic API Access」** を選択 |
| **プロジェクト番号** | 🔴 **`487251905710`** ← 2026-08-17 に確定。<br>`.env.local` の OAuth クライアントが属するプロジェクト。**ここを間違えると承認されても使えない** |
| 会社名 | 株式会社 川口典礼 |
| ウェブサイト | https://kawaguchitenrei.com/ |
| 管理するプロフィール数 | 1 |

> **プロジェクト番号の根拠（2026-08-17 実測）**：`scripts/gbp/dump.mjs` の実行時に Google が返した
> `for consumer 'project_number:487251905710'` から確定。推測ではない。

### 記述式の2項目（2026-08-17 追記）

#### 「この API アクセス フォームをどのようにして知りましたか」

```
Google Business Profile API の公式ドキュメント（Prerequisites ページ）に記載されていたリンクから
```
英語欄の場合：`From the official Google Business Profile API documentation (Prerequisites page).`

#### 「アクセスを希望される主な理由をお聞かせください」

```
自社で運営する葬儀式場1拠点のビジネスプロフィールを、自社ウェブサイトの情報と
一致させて正確に維持するためです。

具体的には、
1. 営業時間・カテゴリ・説明文・サービス項目を自社サイトと同じ内容に保つこと
2. よくあるご質問（Q&A）を投稿・回答し、料金やサービス内容の正確な情報を
   お客様に届けること
3. 通話数・ルート検索数・表示回数などのパフォーマンス指標を取得し、
   月次の社内レポートに使うこと

対象は自社の1拠点のみです。第三者のプロフィール管理は行わず、
データの再販・再配布も行いません。
```

> **ドロップダウン（選択式）だった場合**は「自社のビジネス情報を管理するため」系を選ぶ。
> 「代理店として」「アプリを開発して提供するため」は選ばない（自社1店舗のみの管理のため、
> 審査が不必要に厳しくなる）。

### 審査で見られる3点（上記文面はすべて満たしている）

| 観点 | 文面での対応 |
|---|---|
| 自社の拠点か、第三者管理か | 「自社の1拠点のみ」「第三者のプロフィール管理は行わない」と明記 |
| 用途が具体的か | 3項目に分けて具体的に記載 |
| データの再販意図がないか | 「再販・再配布も行いません」と明記 |

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
