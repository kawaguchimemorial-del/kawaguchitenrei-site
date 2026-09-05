# 広告LPのデザイン差し戻し（2026-09-06・現行）

- **対象**：`https://kawaguchitenrei.com/lp/` と `/lp/contact/`
- **判断**：松澤（2026-09-06）
- **経緯**：同日に Codex が再設計したが、デザインが意図と異なったため、2026-08-27 版へ戻した
- **関連**：[Codex の再設計記録（差し戻し済み）](2026-09-06-lp-redesign-and-measurement.md) ／ [計測運用手順](2026-09-06-lp-measurement-runbook.md)

---

## 1. 現行の構成

`app/lp/page.tsx` を中心とした Tailwind の構成。CSS Modules は使わない。

| ファイル | 役割 |
|---|---|
| `app/lp/page.tsx` | LP 本体。ヒーロー、入口分岐、緊急セクション、選ばれる理由、プラン、式場、お客様の声、FAQ、フォーム |
| `app/lp/LpTopBar.tsx` | 上部固定バー（電話・相談・お急ぎの方） |
| `app/lp/LpPhoneBox.tsx` | ヒーロー直下の電話ボックス |
| `app/lp/LpPlanTable.tsx` | 6プランの表（会員価格・通常価格を併記） |
| `app/lp/LpHalls.tsx` | 川口メモリアルホールと外部式場 |
| `app/lp/LpPreneed.tsx` | 事前相談セクション |
| `app/lp/LpCtaBand.tsx` | 中間の CTA 帯 |
| `app/lp/LpStickyCta.tsx` | 下部固定 CTA（電話・事前相談） |
| `app/lp/LpStars.tsx` | 評価の星表示 |
| `app/lp/contact/` | 専用フォーム（`LpContactForm.tsx` は Server Actions） |
| `app/lp/layout.tsx` | `noindex` の付与と `LpAnalytics` の設置 |

**削除したファイル**：`app/lp/LpContent.tsx`、`app/lp/lp.module.css`（Codex 版で追加されたもの。差し戻しにより未使用）

---

## 2. Codex 版から引き継いだもの

デザインは戻したが、以下は素直に良い改善なのでそのまま使っている。

| 引き継いだもの | 実装 | 理由 |
|---|---|---|
| LP専用の7イベント計測 | `lib/lp-analytics.ts` / `app/lp/LpAnalytics.tsx` | `data-lp-event` 属性で動く設計のため、デザインを変えても機能する |
| 入口によるセッション分離の集計 | `scripts/ad-lp-report.mjs` | LP入口と本サイト入口を排他的に集計する。触っていない |
| フォームの必須指定 | `app/lp/contact/LpContactForm.tsx` の `required` | 未入力送信の抑止 |
| 自己参照 canonical と LP専用 title | `page.tsx` / `contact/page.tsx` の `metadata` | noindex なので順位には効かないが、広告の審査クローラと社内確認で「このURLが正」と分かる |
| 出力の自動検証 | `scripts/test-lp-output.mjs` | 現構成に合わせて検査内容を更新（下記 §4） |
| お客様の声を絞る判断 | `page.tsx` の `lpVoices` を4件に | Codex は2件。Next/Image の srcset が1件あたり約1.4KB効くため |

### 計測イベントの設置箇所（差し戻し後）

`data-lp-event` / `data-lp-placement` を付け直した。

| イベント | 箇所 | placement |
|---|---|---|
| `lp_click_tel` | 上部固定バー | `header` |
| | ヒーロー直下の電話ボックス | `hero` |
| | 緊急セクション末尾 | `urgent` |
| | CTA帯 | `band` |
| | 式場セクション | `hall` |
| | 事前相談セクション | `preneed` |
| | 下部固定CTA | `sticky` |
| | 最終CTA | `footer` |
| | 専用フォームページ | `contact_page` / `contact_form` / `contact_success` |
| `lp_contact_open` | 上部固定バー・ヒーロー・事前相談・下部固定CTA・CTA帯 | 各所 |
| `lp_form_start` | フォームへの最初のフォーカス | `contact_form` |
| `lp_generate_lead` | フォーム送信成功 | `contact_form` |
| `lp_view` | ページ表示 | `landing` / `contact` |

`click_tel` と `lp_click_tel`、`generate_lead` と `lp_generate_lead` は同じ操作で二重に発火しうる。**合算しない。**

---

## 3. ページ重量の判定基準を変更した

CLAUDE.md §21.2 の「HTML 50KB 以下」は単位が明記されておらず、Codex は非圧縮バイト数で解釈していた。**2026-09-06 の松澤判断により、転送量（brotli 圧縮後）で判定する**ことにした。

| | 非圧縮 | gzip | brotli（判定に使う） |
|---|---|---|---|
| `/lp/` | 276,950 | 37,717 | **21,687** |
| `/lp/contact/` | 28,617 | 6,398 | **5,200** |

非圧縮の HTML には Next.js の RSC ペイロード（約142KB）と Next/Image の srcset（画像43枚で約69KB）が含まれる。これらは転送時に圧縮され、実際の表示速度とは乖離する。ご遺族の体感に効くのは転送量と描画であるため、判定基準を転送量に統一した。

---

## 4. 検証

`npm run build` の後に実行する。

```
node scripts/test-lp-output.mjs
node scripts/test-lp-analytics.mjs
```

`test-lp-output.mjs` が確認すること：

- 転送量（brotli）が 50KB 以下
- `noindex` が出力されている
- 自己参照 canonical がある
- `<h1>` がページに1つ
- **電話リンクがすべて計測対象**（`data-lp-event` と `data-lp-placement` の両方）
- 6プランの会員価格・通常価格12種がすべて表示されている
- シンプル直葬プランの 88,000円は**出していない**（価格で選ぶ層は広告で追わない方針）
- `/lp/` にフォームが1つある（2026-08-27 版の構成）
- `/lp/contact/` の name・phone・consent に `required` がある
- sitemap に `/lp` が入っていない
- robots で `/lp` を Disallow していない

---

## 5. やっていないこと

- **広告の配信先の切り替え**：次回会議で決定するため未実施。現在の広告は引き続き `kawaguchi-memorial-hall.com` に着地している
- **本サイト側のデザイン変更**：`app/lp/**` の外は触っていない
- **画像の追加・改名・移動**：していない
- **価格・プラン名の変更**：していない（CLAUDE.md §9 が正本）
