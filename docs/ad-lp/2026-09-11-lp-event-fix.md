# `lp_*` イベントが GA4 に届かない問題の修正（2026-09-11）

> # ⚠ 2026-09-12 訂正：この文書の結論は誤っていた
>
> **「GA4 へ届けるには GTM に転送タグが1つ必要」は誤り。** 実際に作って公開したところ、
> **すべての `lp_*` が2件ずつ記録される二重計上**になった。タグを削除して元に戻してある。
>
> **本番で動いているのは、この文書が「届かない」と断じた gtag コマンド形式のままである。**
> 本番JSを取得して `transport_type` / `send_to` の存在を確認した（`lib/lp-analytics.ts` の
> 書き換えはコミットもデプロイもされていなかった）。**その形式で GA4 に届いている。**
>
> **なぜ誤ったか。** 下の §1 は「直近90日」の合計を見ている。実データを日別で見ると、
>
> | 日付 | `/lp/` 表示 | `lp_view` | 備考 |
> |---|---|---|---|
> | 2026-08-26 | 33 | なし | LP公開直後 |
> | 2026-08-27 | 14 | なし | |
> | 2026-08-28 | 12 | なし | **`generate_lead` 8件はこの日だけ** |
> | 2026-09-01 | 2 | なし | |
> | **2026-09-06** | 4 | **3** | **デザイン差し戻しの日。ここから記録され始めた** |
> | 2026-09-09 | 1 | 1 | |
> | 2026-09-12 | 2 | 2 | |
>
> §1 が根拠にした「`generate_lead` は届くのに `lp_generate_lead` は0」という比較は、
> **すべて 2026-08-28 の1日分**だった。その時点では実際に不具合があったが、
> **9/06 の差し戻し以降は正常に動いていた。** 90日の合計が古い不具合に引きずられていただけで、
> 直近を確認していれば「送出方法が原因」という結論には至らなかった。
>
> もう一つの見落としは母数である。`/lp/` は **8/26以降の合計で表示70件**しかない。
> 広告はいまも旧LPに着地しているため、`/lp/` にはほぼ人が来ていない。
> **この母数で「0件だから壊れている」と判断すべきではなかった。**
>
> **2026-09-12 の実測（本番・タグ削除後）**：電話ボタンを1回タップ →
> `lp_view` 1件・`lp_click_tel` 1件。正しく届いている。
>
> 以下の §1 以降は、誤った推論の記録として残す。**手順としては使わないこと。**


- 背景：2026-09-11 の会議で、広告の着地先を `kawaguchitenrei.com/lp/` へ移すことが決定した
- 問題：**`/lp/` のイベントが GA4 にほぼ記録されていない。**直さずに切り替えると、切替の瞬間から
  電話タップ・フォーム開始・CTAクリックが一切測れない
- 関連：`docs/ad-lp/2026-09-11-lp-migration-preparation.md` §0、`docs/ad-lp/2026-09-11-ga4-key-events-inventory.md`

---

## 1. 何が起きていたか

### 実測（直近90日・GA4 プロパティ 538451141）

| イベント | 発生数 |
|---|---:|
| `lp_view` | **4** |
| `lp_click_tel` | **0** |
| `lp_contact_open` | **0** |
| `lp_plan_open` | **0** |
| `lp_form_start` | **0** |
| `lp_generate_lead` | **0** |
| `lp_directions` | **0** |

対して、同じ `/lp/contact/` で**同時に発火する** `generate_lead` は記録されている。

| `generate_lead` のページ | 件数 |
|---|---:|
| `/contact/` | 26 |
| **`/lp/`** | **6** |
| `/estimate/` | 5 |
| **`/lp/contact/`** | **2** |

`/lp/contact/` のフォーム成功時、コードは次の2つを続けて呼んでいる（`app/lp/contact/LpContactForm.tsx`）。

```ts
pushGenerateLead("lp_contact");          // → 届いている
trackLpEvent("lp_generate_lead", ...);   // → 届いていない
```

**同じページ・同じセッション・同じ除外判定を通りながら、片方だけが届いていない。**
除外設定（`window.kawaguchiAnalyticsAllowed()`）は両方が同じものを通るため、原因ではない。

### 原因：送出の形式が違った

| 実装 | 送出の形式 | 結果 |
|---|---|---|
| `pushGenerateLead`（`lib/analytics.ts`） | `dataLayer.push({ event: "generate_lead", ... })`<br>＝ **data layer イベント形式** | ✅ 届く |
| `trackLpEvent`（`lib/lp-analytics.ts`・修正前） | `dataLayer.push(arguments)`<br>＝ **gtag コマンドキュー形式** `("event", name, params)` | ❌ 届かない |

### 本番 GTM コンテナの実地確認（2026-09-11）

`https://www.googletagmanager.com/gtm.js?id=GTM-TJWKD4WB` を取得して中身を確認した。

| 確認項目 | 結果 |
|---|---|
| コンテナ内に存在するイベント名 | `generate_lead` / `click_tel` / `click_contact_cta` / `click_estimate_cta` |
| `lp_*` のイベント名 | **1つも存在しない** |
| GA4 測定ID | `G-44Z38F3J1P`（コード側 `lib/analytics-policy.ts` の値と一致） |

**つまりこのコンテナでは「data layer イベント → GTM トリガー → GA4」が実際に機能している経路であり、
`lp_*` にはその経路が用意されていない。**

> 測定IDの不一致は否定された（コード・コンテナとも `G-44Z38F3J1P`）。

---

## 2. 当社側で直したこと（コード）

`lib/lp-analytics.ts` の `trackLpEvent` を、**`generate_lead` と同じ data layer イベント形式**に揃えた。

```ts
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event,                                   // lp_view / lp_click_tel / ...
  site_area: "ad_lp",
  lp_variant: LP_VARIANT,                  // 2026-09-consultation-v2
  cta_placement: safe(placement),          // hero / header / sticky / bottom / contact_form ...
  ...(plan ? { plan_slug: safe(plan) } : {}),
  page_location: window.location.origin + window.location.pathname,  // クエリは送らない
  page_path: window.location.pathname,
  ga4_measurement_id: GA4_MEASUREMENT_ID,
});
```

**変えていないもの**（そのまま維持）

- 除外判定（`window.kawaguchiAnalyticsAllowed()`／`?analytics=off`）
- `/lp/` 配下でしか発火しないガード
- パラメータの検証（`^[a-z0-9_-]{1,45}$` 以外は `unknown` に置換）
- **クエリ文字列を送らない**／フォームの入力値・氏名・連絡先・相談内容を送らない（`CLAUDE.md` §12）
- `generate_lead` 側の実装（一切触っていない）

### 検証

| 項目 | 結果 |
|---|---|
| `npm run build` | ✅ 成功・静的生成 140/140（基準どおり） |
| `npm run lint` | ✅ `lib/lp-analytics.ts` にエラー・警告なし |
| `node scripts/test-lp-output.mjs` | ✅ `/lp/` brotli 21,649 bytes ／ `/lp/contact/` 5,202 bytes（上限 51,200）<br>`noindexAndCrawlPolicy: passed`／sitemap 129 URL |

---

## 3. NEXT UP に依頼する GTM 設定（これがないと届かない）

**GTM にタグが1つ必要。** 以下をそのまま渡せる。

### 3-1. 変数（データレイヤー変数）を6つ作成

| 変数名（任意） | データレイヤー変数名 |
|---|---|
| DLV - site_area | `site_area` |
| DLV - lp_variant | `lp_variant` |
| DLV - cta_placement | `cta_placement` |
| DLV - plan_slug | `plan_slug` |
| DLV - page_location | `page_location` |
| DLV - page_path | `page_path` |

### 3-2. トリガーを1つ作成

| 項目 | 設定 |
|---|---|
| 種類 | **カスタムイベント** |
| イベント名 | `lp_.*` |
| 「正規表現一致を使用」 | **オン** |
| 発生場所 | すべてのカスタムイベント |

### 3-3. タグを1つ作成

| 項目 | 設定 |
|---|---|
| 種類 | **Google アナリティクス: GA4 イベント** |
| 測定ID | `G-44Z38F3J1P`（既存の Google タグを参照する形でも可） |
| イベント名 | `{{Event}}` ← 組み込み変数。data layer の `event` の値がそのまま入る |
| イベントパラメータ | `site_area` = `{{DLV - site_area}}`<br>`lp_variant` = `{{DLV - lp_variant}}`<br>`cta_placement` = `{{DLV - cta_placement}}`<br>`plan_slug` = `{{DLV - plan_slug}}`<br>`page_location` = `{{DLV - page_location}}`<br>`page_path` = `{{DLV - page_path}}` |
| トリガー | 3-2 で作成したもの |

### 3-4. これが「重複実装」にならない理由

`CLAUDE.md` §21 には「LPイベントは既存タグへ直接送出し、**GTMで重複実装しない**」とある。

- コンテナ内に **`lp_*` を送るタグは1つも存在しない**（2026-09-11 実地確認）
- したがってこのタグは**既存タグの重複ではなく、唯一の送出経路**になる
- `generate_lead` `click_tel` など既存イベントのタグには**一切触らない**

> ⚠ **`lp_*` を Google 広告のコンバージョンとしてインポートしない。**
> 主要コンバージョンの設計は `docs/ad-lp/2026-09-11-ga4-key-events-inventory.md` §7・§8 に従う。
> とくに `lp_generate_lead` は `generate_lead` と同じ行動なので、**両方をCVにすると二重計上**になる。

---

## 4. 設定後の確認手順

1. **GTM のプレビューモード**で `https://kawaguchitenrei.com/lp/?analytics=on` を開く
   - `lp_view` が data layer に入り、タグが発火することを確認
   - 電話ボタン・事前相談ボタンを押して `lp_click_tel` `lp_contact_open` を確認
2. **GA4 の DebugView / リアルタイム**に、同じイベント名が届くことを確認
   - パラメータ（`cta_placement` など）が入っていることも見る
3. 確認が終わったら **`?analytics=off` に戻す**（除外フラグは同じブラウザに保存される）
4. 翌日、`node --env-file=.env.local scripts/ad-lp-report.mjs --start <日> --end <日>` で
   通常レポートへの反映を確認する

**フォームの実送信はしない。**する場合は、通知先と削除・除外の方法を先に決める（手順書の指示）。

---

## 5. 切替前の残り

| # | 内容 | 担当 |
|---|---|---|
| 1 | ~~`lp_*` の送出形式の修正~~ | ✅ **完了（当社・本ファイル §2）** |
| 2 | GTM に転送タグを1つ追加（§3） | **NEXT UP** |
| 3 | 実機で送信と受信を確認（§4） | 当社＋NEXT UP |
| 4 | `/lp/` の主要コンバージョンを1つに決める | 当社＋NEXT UP |
| 5 | 広告のリンク先URLを `/lp/` へ差し替え | NEXT UP |

**2 と 3 が終わるまで、広告の切替日を確定しない。**

> 補足：**フォーム送信の成功（`generate_lead`）は、GTM 設定を待たずに今も動いている。**
> `/lp/contact/` からの送信は `pagePath` で識別できるため、
> 最重要のコンバージョンだけは切替直後から測れる状態にある。
> `lp_*` は補助・観測の指標であり、GTM 設定が遅れても致命傷にはならないが、
> **「LPのどこが押されたか」が分からないままになる。**
