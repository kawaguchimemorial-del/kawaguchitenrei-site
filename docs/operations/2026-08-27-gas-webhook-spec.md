# Google Apps Script Webhook 仕様と更新手順（2026-08-27）

広告LPの事前相談フォーム（`formType: "lp_contact"`）を追加したことに伴い、
GAS 側で新しい項目を受け取れるようにする。

- **対象**：フォーム送信を受けている Google Apps Script プロジェクト
- **依頼元**：`app/lp/contact/actions.ts`（サイト側は対応済み・本番稼働中）
- **サイト側の変更**：完了。GAS 側が未対応でも送信は成功するが、**新しい項目が記録されない**

> **秘密情報について**
> Webhook URL と `FORM_WEBHOOK_SECRET` の値はこの文書に書かない。
> GAS 側では**スクリプトプロパティ**に保存し、コードに直書きしない（`docs/04-privacy-review.md` §4）。

---

## 1. サイトから送られてくるデータ

すべて `POST` / `Content-Type: application/json`。
本文のトップレベルに `formType` と `secret` が必ず入る。

```json
{
  "formType": "lp_contact",
  "secret": "（環境変数の値）",
  "name": "…",
  "...": "…"
}
```

### formType 別の項目

| # | formType | 送信元 | 用途 |
|---|---|---|---|
| 1 | `contact` | `/contact/`（本サイト） | 総合問い合わせ |
| 2 | `estimate` | `/estimate/`（本サイト） | 概算見積り |
| 3 | **`lp_contact`** | **`/lp/contact/`（広告LP）** | **事前相談（今回追加）** |
| 4 | `customer_survey` | アンケート | — |

#### `lp_contact`（今回の追加分）

| キー | 内容 | 例 | 備考 |
|---|---|---|---|
| `name` | お名前 | 川口 太郎 | 必須 |
| `phone` | 電話番号 | 090-0000-0000 | 必須 |
| `email` | メールアドレス | | 任意 |
| **`purpose`** | **ご相談内容** | `費用の目安を知りたい／式場を見学したい` | **必須・複数選択を `／` で連結** |
| **`timing`** | **ご相談の時期** | `差し迫った状況にある` | **任意・単一選択** |
| **`preferredContact`** | **ご希望の連絡方法** | `電話` | **任意・単一選択** |
| `message` | ご質問・ご希望 | | 任意 |
| `submittedAt` | 送信日時 | ISO8601（UTC） | |
| `botFlagged` / `botReasons` | bot 判定 | | 迷惑送信対策 |
| `spamScore` / `spamFlagged` / `spamReasons` | スパム判定 | | 同上 |

> `purpose` の選択肢：費用の目安を知りたい／式場を見学したい／葬儀の流れを知りたい／川口市民葬について知りたい／その他
> `timing` の選択肢：具体的な予定はないが、備えておきたい／近いうちに必要になるかもしれない／**差し迫った状況にある**
> `preferredContact` の選択肢：電話／メール／どちらでも

> **`timing` は緊急度の把握のために置いている。**
> 病状・余命そのものは尋ねていない（要配慮個人情報を収集しないため）。
> 「差し迫った状況にある」が選ばれた場合は、**優先して折り返す**運用としたい。

#### 既存の `contact`

`name` / `nameKana` / `phone` / `email` / `purpose` / `preferredContact` / `preferredTime` / `message` / `submittedAt` ＋ bot・spam 判定

#### 既存の `estimate`

`rawFormat` / `rawHall` / `name` / `phone` / `email` / `preferredContact` / `note` / `submittedAt` ＋ bot・spam 判定

---

## 2. GAS 側でやること

1. **`lp_contact` を受け付ける**（未対応だと新項目が落ちる）
2. **件名に `【広告LP】` を付ける**（スマホの通知一覧で判別するため）
3. **シートに流入元の列を追加**（月次で広告経由の相談件数を数えるため）
4. **`timing` が「差し迫った状況にある」の場合、件名に `【至急】` を付ける**

---

## 3. 貼り付け用コード

> **既存のコードを丸ごと置き換えないこと。**
> 現行の `doPost` がすでに動いているため、下記は
> **`lp_contact` の分岐とヘッダー定義を足す形**で反映する。

```javascript
/** 秘密情報はスクリプトプロパティから読む（コードに直書きしない） */
function getSecret_() {
  return PropertiesService.getScriptProperties().getProperty('FORM_WEBHOOK_SECRET');
}

/** formType ごとの、シートに書き出す列の順番 */
var FIELDS_BY_TYPE = {
  lp_contact: [
    'submittedAt', 'source', 'name', 'phone', 'email',
    'purpose', 'timing', 'preferredContact', 'message',
    'botFlagged', 'botReasons', 'spamScore', 'spamFlagged', 'spamReasons'
  ],
  contact: [
    'submittedAt', 'source', 'name', 'nameKana', 'phone', 'email',
    'purpose', 'preferredContact', 'preferredTime', 'message',
    'botFlagged', 'botReasons', 'spamScore', 'spamFlagged', 'spamReasons'
  ],
  estimate: [
    'submittedAt', 'source', 'name', 'phone', 'email',
    'rawFormat', 'rawHall', 'preferredContact', 'note',
    'botFlagged', 'botReasons', 'spamScore', 'spamFlagged', 'spamReasons'
  ]
};

/** 流入元の表示名。シートの「source」列と件名に使う */
var SOURCE_LABEL = {
  lp_contact: '広告LP',
  contact: '本サイト',
  estimate: '本サイト(概算)',
  customer_survey: 'アンケート'
};

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid json' });
  }

  // 秘密の照合。合わない場合は中身を一切扱わない
  if (!body.secret || body.secret !== getSecret_()) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  var formType = String(body.formType || 'contact');
  var source = SOURCE_LABEL[formType] || formType;

  try {
    writeRow_(formType, source, body);
    sendMail_(formType, source, body);
  } catch (err) {
    // 個人情報はログに出さない。formType と種別だけ残す
    console.error('failed: ' + formType + ' / ' + err.name);
    return json_({ ok: false, error: 'internal' });
  }

  return json_({ ok: true });
}

/** シートに1行追記。シートが無ければ作り、1行目に見出しを入れる */
function writeRow_(formType, source, body) {
  var fields = FIELDS_BY_TYPE[formType];
  if (!fields) return; // 定義がない formType はシートに書かない

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(formType);
  if (!sheet) {
    sheet = ss.insertSheet(formType);
    sheet.appendRow(fields);
    sheet.setFrozenRows(1);
  }

  var row = fields.map(function (key) {
    if (key === 'source') return source;
    var v = body[key];
    if (v === undefined || v === null) return '';
    if (Object.prototype.toString.call(v) === '[object Array]') return v.join('／');
    return v;
  });
  sheet.appendRow(row);
}

/** 通知メール。件名で流入元と緊急度が分かるようにする */
function sendMail_(formType, source, body) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_TO');
  if (!to) return;

  var urgent = body.timing === '差し迫った状況にある';
  var subject =
    (urgent ? '【至急】' : '') +
    '【' + source + '】' +
    (formType === 'lp_contact' ? '事前相談' : 'お問い合わせ') +
    '／' + (body.name || '');

  var lines = [];
  lines.push('流入元：' + source);
  if (urgent) lines.push('※「差し迫った状況にある」が選ばれています。優先してご連絡ください。');
  lines.push('');
  lines.push('お名前：' + (body.name || ''));
  lines.push('電話番号：' + (body.phone || ''));
  lines.push('メール：' + (body.email || ''));

  if (formType === 'lp_contact') {
    lines.push('ご相談内容：' + (body.purpose || ''));
    lines.push('ご相談の時期：' + (body.timing || '（未選択）'));
    lines.push('ご希望の連絡方法：' + (body.preferredContact || '（未選択）'));
  }

  lines.push('');
  lines.push('ご質問・ご希望：');
  lines.push(body.message || body.note || '（記載なし）');
  lines.push('');
  lines.push('送信日時：' + formatJst_(body.submittedAt));

  if (body.spamFlagged || body.botFlagged) {
    lines.push('');
    lines.push('※ 迷惑送信の可能性ありと判定されています。内容をご確認ください。');
  }

  MailApp.sendEmail(to, subject, lines.join('\n'));
}

/** ISO8601(UTC) を日本時間の表記に直す */
function formatJst_(iso) {
  if (!iso) return '';
  try {
    return Utilities.formatDate(new Date(iso), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
  } catch (err) {
    return String(iso);
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 4. 設定手順

| # | 作業 | 場所 |
|---|---|---|
| 1 | スクリプトプロパティに `FORM_WEBHOOK_SECRET` を登録（Vercel 環境変数と同じ値） | GAS ＞ プロジェクトの設定 ＞ スクリプト プロパティ |
| 2 | スクリプトプロパティに `NOTIFY_TO` を登録（通知先メールアドレス） | 同上 |
| 3 | 上記コードを反映 | GAS エディタ |
| 4 | **デプロイ ＞ 新しいデプロイ**（ウェブアプリ／アクセスできるユーザー：全員） | GAS |
| 5 | デプロイURLが変わった場合は Vercel の `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` を更新 | Vercel |

> **既存デプロイのURLを変えたくない場合**は「デプロイを管理 ＞ 編集 ＞ バージョン：新バージョン」で更新する。
> URLが変わると、URLを更新するまでフォームが送信エラーになる。

---

## 5. 反映後の確認

1. `https://www.kawaguchitenrei.com/lp/contact/` から**テスト送信**する
   - ご相談内容に2つチェック、ご相談の時期に「差し迫った状況にある」を選ぶ
   - ご質問欄に「テスト」と記入する
2. 確認すること
   - [ ] 件名が **`【至急】【広告LP】事前相談／…`** になっている
   - [ ] 本文に**ご相談内容が2つとも**出ている（`／` 区切り）
   - [ ] 本文に**ご相談の時期・ご希望の連絡方法**が出ている
   - [ ] シート `lp_contact` に1行増え、**`source` 列が「広告LP」**になっている
   - [ ] 送信日時が**日本時間**で表示されている
3. `/contact/`（本サイト）からも1件送り、**従来どおり届くこと**を確認する

---

## 6. これで解決すること

`docs/ad-lp/README.md` §5 の宿題4「**広告経由の相談件数・受注件数**が取得できていない」が、
シートの `source` 列で月次集計できるようになる。

広告のコンバージョン（週15件・小数を含む推定値）と、
実際の相談件数を突き合わせる材料になる。
