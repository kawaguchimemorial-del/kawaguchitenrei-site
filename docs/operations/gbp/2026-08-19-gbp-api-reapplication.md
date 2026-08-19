# Google Business Profile API 再申請 手順書（却下対応）

作成日: 2026-08-19
操作者: 松澤（Google アカウントでの作業）
所要: 是正作業 1〜2時間 ／ 申請 15分 ／ その後 Google の審査待ち

前提となる記録: `docs/operations/gbp/2026-07-30-gbp-api-access-request.html`（7/30・8/17 の申請記録）
関連: `scripts/gbp/README.md` ／ `docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md`

---

## 1. 却下の事実

| 項目 | 内容 |
|---|---|
| 却下日 | **2026-08-18** |
| 差出人 | googlebusinessprofile-support@google.com |
| ケース ID | **`2-9362000041843`** |
| 対象と思われる申請 | 2026-08-17 提出分（ケース ID `2-1581000041699`）※下の注記参照 |

却下メール原文（該当部分）:

> We will not be able to move forward with your application to use the GBP API as your account
> did not pass our internal quality checks ( **No approved project. The listing ID is associated
> with a different website** ).
>
> We recommend reviewing our eligibility criteria and ensuring that your Business Profile and
> your company's official website are fully up to date before reapplying in the future.

> **注記（ケース ID の不一致）**
> 8/17 の申請画面で発行された受付番号は `2-1581000041699`、却下メールの件名は `2-9362000041843`。
> Gmail 全文検索では `2-1581000041699` を含むメールは 1 通も存在しない。
> 却下が 8/17 申請の翌日である点から、**8/17 申請に対する回答**と判断する。
> Google 側は受付番号とサポートケース番号を別体系で発行することがあるため、ID 不一致だけを根拠に
> 「別件だ」とは判断しない。

---

## 2. 却下理由の分解

Google が挙げた不合格点は 2 つ。**両方を直さないと再申請しても同じ結果になる。**

### 理由 A: No approved project（承認済みプロジェクトがない）

Google Cloud 側のプロジェクトが、GBP API の利用主体として審査に耐える状態になっていない。
API を有効化しただけでは足りず、**OAuth 同意画面のアプリ情報が実在の公式サイトと結び付いている**
必要がある。

### 理由 B: The listing ID is associated with a different website（リスティングが別サイトに紐づく）

GBP に登録されているウェブサイト URL と、申請時に「公式サイト」として申告したドメインが
一致していない。当社は**ブランドサイトが 3 ドメインに分散**しているため、ここが直撃していると考えられる。

| ドメイン | 位置づけ | 想定される問題 |
|---|---|---|
| `kawaguchitenrei.com` | 公式サイト（本体） | 本来ここに統一すべき |
| `kawaguchi-memorial-hall.com` | 広告 LP | GBP のウェブサイト欄がここを指している可能性 |
| `www.kawaguchi-tenrei.com` | 旧サイト | 生きていると同一実体の別サイトと見なされる |

この分散は SEO 面でも未解決の課題（「川口メモリアルホール」3.55位→12.88位の下落要因）。
**GBP API の却下対応と SEO 対策が同じ打ち手に収束している。**

---

## 3. 再申請の前にやること（是正チェックリスト）

**順番どおりに進める。飛ばして申請すると再び却下される。**

### STEP 1. 現状の事実確認（まず見るだけ・変更しない）

- [ ] GBP 管理画面 → 「編集」→「ウェブサイト」欄の URL を確認し、**そのまま書き写す**
- [ ] 上記が `kawaguchitenrei.com` 以外なら、理由 B の直接原因が確定
- [ ] `www.kawaguchi-tenrei.com` が現在も表示されるか確認（生きているか / リダイレクトか）
- [ ] `kawaguchi-memorial-hall.com` の noindex 有無を確認
- [ ] GBP の「オーナー・管理者」に kawaguchi.memorial@gmail.com が**オーナー**として入っているか確認

### STEP 2. GBP 側の是正

- [ ] GBP のウェブサイト欄を **`https://kawaguchitenrei.com/`** に変更
- [ ] 店舗名・住所・電話番号が公式サイトの表記と一字一句そろっているか確認（NAP 一致）
- [ ] 営業時間・カテゴリ・説明文が最新か確認
- [ ] 変更後、GBP 側の反映に **数日かかる**。反映を見てから次へ進む

### STEP 3. ドメイン分散の整理

- [ ] `www.kawaguchi-tenrei.com`（旧サイト）を `kawaguchitenrei.com` へ 301 リダイレクト、または閉鎖
- [ ] `kawaguchi-memorial-hall.com`（広告 LP）に `noindex` を入れる
      ※ LP の広告運用そのものは止めない。検索インデックスから外すだけ
- [ ] 公式サイトの会社情報ページに、正式社名・住所・電話・代表者が明記されているか確認

> **注意**：広告 LP の扱いは広告運用側にも影響する。実施前に運用状況を確認すること。
> LP は「逝去後の緊急層を刈る」役割で、検索流入を前提にしていないため noindex 化は成立する見込み。

### STEP 4. Google Cloud プロジェクト側の是正（理由 A）

- [ ] 対象プロジェクト: **`487251905710`**（`.env.local` の OAuth クライアントが属する）
- [ ] OAuth 同意画面 →「アプリ情報」の**アプリ名**を実在のサービス名にする
- [ ] **アプリのホームページ**に `https://kawaguchitenrei.com/` を設定
- [ ] **プライバシーポリシーの URL**に公式サイトのプライバシーポリシーページを設定
- [ ] **承認済みドメイン**に `kawaguchitenrei.com` を登録
- [ ] 必要な API が有効化されたままか確認（`scripts/gbp/README.md` 参照）

### STEP 5. 再申請

- [ ] 申請フォーム: https://support.google.com/business/contact/api_default
- [ ] 申請アカウント: kawaguchi.memorial@gmail.com（**GBP のオーナー権限があること**）
- [ ] プロジェクト番号欄: `487251905710`
- [ ] ウェブサイト欄: `https://kawaguchitenrei.com/`（**GBP のウェブサイト欄と完全一致させる**）
- [ ] **発行されたケース ID を必ずこの文書に追記する**

### 申請フォームに書く内容（下書き）

用途説明欄に貼る文面の下書き:

```
当社は埼玉県川口市で葬儀式場「川口メモリアルホール」を運営する葬儀社です。
自社の Google ビジネス プロフィール（1拠点）について、営業時間・サービス内容・
写真・投稿の更新を、社内の運用スクリプトから安全に反映することを目的として
API アクセスを申請します。

利用範囲は当社が所有する自社リスティングのみで、第三者のリスティングを
取り扱う予定はありません。第三者向けの管理ツールの提供や再販も行いません。

公式サイト: https://kawaguchitenrei.com/
```

> 上記はそのまま送らず、申請時点の実態に合わせて確認してから使うこと。

---

## 4. 申請後の確認手順

承認状況の確認:

```
node scripts/gbp/dump.mjs
```

| 結果 | 意味 |
|---|---|
| アカウント情報が返る | ✅ 承認済み。`diff.mjs` → `apply.mjs --confirm` に進む |
| `429 Quota exceeded ... Requests per minute` | 🔴 まだ未承認（割り当て 0 QPM） |
| `has not been used in project ... or it is disabled` | ⚠️ プロジェクト取り違え。再確認 |

メール側の確認:

```
node --env-file=.env.local scripts/gmail-search.mjs --preset=gbp
```

Google Cloud Console 側:「割り当てとシステム上限」→ My Business Business Information API の QPM
（**0 = 未承認 / 300 = 承認済み**）

---

## 5. やってはいけないこと

- **是正せずに連続で再申請する**。同じ内容の再提出は品質チェックで同じ結果になるだけでなく、
  アカウント評価を下げるおそれがある
- **ケース ID を控えずに申請する**。7/30 の申請は記録が無く、送信されたかどうかすら確認できなかった
- GBP の店舗名にキーワードを足すなどのガイドライン違反の変更（審査に直接響く）

---

## 6. 承認までの運用

API 承認は再申請から**さらに 7〜10 営業日**かかる見込み。それまでは
`docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md` の手作業運用を継続する。
手作業で入れた内容は、承認後に `diff.mjs` で突き合わせられるため無駄にならない。

なお **GBP API の利用は無料**（公式に "available to registered users at no charge"）。
請求先アカウントの登録も不要。

---

## 7. 再申請の記録欄（申請したらここに追記）

| 項目 | 内容 |
|---|---|
| 申請日 | （未申請） |
| ケース ID | （未申請） |
| プロジェクト番号 | 487251905710 |
| GBP ウェブサイト欄の設定値 | （記入） |
| 承認確認の目安 | 申請日 + 7〜10 営業日 |
| 結果 | （未確認） |
