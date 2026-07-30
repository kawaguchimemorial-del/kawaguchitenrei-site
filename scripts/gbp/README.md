# GBP（Google ビジネスプロフィール）操作スクリプト

`docs/operations/gbp/2026-07-27-gbp-full-setup-playbook.md` の内容を API 経由で適用・検証するためのスクリプト群。

**現時点では動きません。** Google の Business Profile API アクセス申請が承認されるまで、
API の割り当てが 0 のため全スクリプトが 403 で失敗する。承認後に使い始める。

---

## 事前準備（松澤さん側）

### 1. Google Cloud で API を有効化

**いま有効化できる 7 つ**

```
My Business Account Management API
My Business Business Information API
My Business Q&A API
My Business Place Actions API
My Business Notifications API
My Business Verifications API
My Business Lodging API
```

**承認後に有効化する 1 つ**

```
Google My Business API
```

> ⚠️ `Google My Business API` は**アクセス申請が承認されるまで Console に表示されない**
> （公式: *"only visible in the Google API Console to users who submit and receive approval"*）。
> 見つからないまま申請へ進んでよい。なお本スクリプト群が使うのは 7 つの側の API のみ。

### 2. アクセス申請を提出（審査あり・数日〜数週間）

申請要件（公式）:
- 検証済みかつ 60 日以上アクティブなビジネスプロフィールを管理している → **充足**
- ウェブサイトを保有している → **充足**

### 3. refresh_token を取り直す

既存のトークンは Search Console スコープのみ。GBP スコープを含めて再取得する。

```bash
node --env-file=.env.local scripts/get-refresh-token.mjs --scope=all
```

`--scope` は `gsc` / `gbp` / `all`（既定 `all`）。`all` なら 1 本のトークンで
Search Console と GBP の両方を扱える。表示された URL をブラウザで開いて承認するだけ。
取得値は `tmp/refresh-token.txt` に一時保存されるので、`.env.local` の
`GOOGLE_OAUTH_REFRESH_TOKEN` に転記してファイルを削除する。

---

## 使い方（承認後）

必ず **dump → diff → apply** の順で進める。

```bash
# 1. 現在値をすべて読み取る（書き込みなし。差し戻し用バックアップにもなる）
node scripts/gbp/dump.mjs

# 2. 期待値（desired.mjs）との差分を確認する（書き込みなし）
node scripts/gbp/diff.mjs

# 3. 送信内容を確認する（dry-run。1バイトも送信しない）
node scripts/gbp/apply.mjs

# 4. 内容に納得したら書き込む
node scripts/gbp/apply.mjs --confirm --qanda

# 項目を絞りたいとき
node scripts/gbp/apply.mjs --confirm --only=profile

# 月次計測（読み取り専用）
node scripts/gbp/performance.mjs --from=2026-08-01 --to=2026-08-31
```

---

## ファイル構成

| ファイル | 役割 |
|---|---|
| `auth.mjs` | OAuth 認証・API クライアント生成・エラー説明。**秘密情報は一切ログ出力しない** |
| `desired.mjs` | 「こう設定したい」期待値のデータ化。プレイブックの確定文言・§9 正本価格 |
| `guard.mjs` | 書き込み前チェック。違反が 1 件でもあれば中止 |
| `dump.mjs` | 現在値の全取得（読み取り専用） |
| `diff.mjs` | 現在値 vs 期待値の差分表示（読み取り専用） |
| `apply.mjs` | 書き込み。**既定は dry-run**、`--confirm` で実行 |
| `performance.mjs` | パフォーマンス指標の取得（読み取り専用） |

---

## 安全設計

1. **`--confirm` がなければ 1 バイトも送信しない**
2. **送信前に `guard.mjs` を通す**。違反があれば例外で中止する
   - 名称を「川口典礼」以外に変更しようとしたら停止
   - 「火葬場」「墓地」系カテゴリを設定しようとしたら停止（めぐりの森は川口市営）
   - CLAUDE.md §9 正本以外の価格が文章に入っていたら停止
   - 禁止表現（最安 / 必ず / 絶対 / 追加費用なし / 総額確定 など）が入っていたら停止
   - 説明文が 750 文字を超えていたら停止
   - 電話番号が NAP 正本と違っていたら停止
3. **送信前に現在値を `tmp/gbp/backup-before-apply.json` に保存**（dry-run でも保存）
4. **カテゴリは categoryId の解決に成功した場合のみ送る**（推測で送らない）

`tmp/` は `.gitignore` 対象。取得した事業データは commit されない。

---

## 対象外（承認後に可否を確認する）

以下は旧 v4 系エンドポイントで、`googleapis` の生成クライアントに含まれていない。
**「API でできる」と確定していないため、本スクリプトでは扱わない。**

- 写真のアップロード
- 投稿（最新情報）
- 口コミへの返信

いずれも管理画面での作業が現実的な範囲。承認が下りた時点で現在の仕様を調べ、
API 経由が可能なら別スクリプトとして追加する。

---

## 運用ルール

- `desired.mjs` を変更したら、**プレイブック（人間が読む方）も同時に更新する**
- 書き込み後は管理画面で目視確認する（API の成功レスポンス＝反映の保証ではない）
- GBP は公開情報。書き込みは外向きの操作にあたるため、**実行前に必ず人間の承認を得る**
