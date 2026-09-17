# 広告の着地先を `/lp/` へ切替：2026-09-21 に決定

作成日: 2026-09-17 / 松澤 / NEXT UP と合意

## 決定

- **2026-09-21（月）から広告の着地先を `kawaguchi-memorial-hall.com` → `https://kawaguchitenrei.com/lp/` に切り替える**
- 前提はすべて完了：GTM v9 公開（電話タップCV・フォーム入力完了・`/lp/` 限定）、`#lp-contact-complete`、プラン詳細・式場・声の LP 内完結、`lp_*` は gtag 直送で GA4 受信確認済み
- 切替の3営業日前までに入稿（先方運用）

## 切替後の計測・分析（継続タスク）

分析の軸は「**旧LP（8月実績：セッション3,556・フォーム送信0・CV57件のほとんどが電話タップ）と比べて、新LPはどうか**」。

### 取得元

| 内容 | 取得方法 |
|---|---|
| LP のセッション・入口・`lp_*` イベント・generate_lead・click_tel | `node --env-file=.env.local scripts/ad-lp-report.mjs --start YYYY-MM-DD --end YYYY-MM-DD`（読み取り専用） |
| 離脱・スクロール・セクション到達 | GA4 の `lp_view` / `lp_plan_open` / `lp_contact_open` / `lp_form_start` / `lp_generate_lead` / `lp_click_tel`（placement 別）を段階として並べる（ファネル）。エンゲージメント率・平均エンゲージメント時間も併記 |
| 広告側 CV（電話タップCV・フォーム入力完了） | NEXT UP のレポート（Google 広告）。GA4 の `lp_click_tel` / `lp_generate_lead` と突き合わせて乖離を見る |
| 実通話 | `docs/operations/call-tracking`（AdSiP ライト導入後は計測番号） |
| 実問い合わせ | GAS `lp_contact` シート |
| 本サイト側への影響 | GSC「川口メモリアルホール」表示・`/hall/` クリック（旧LPドメインの noindex 後に戻るか） |

### ファネルの定義（GA4 `lp_*`・placement 別）

1. `lp_view`（着地）
2. `lp_plan_open`（プランを開いた）／ `lp_contact_open`（相談ボタン）
3. `lp_form_start`（フォーム入力開始）
4. `lp_generate_lead`（送信完了）／ `lp_click_tel`（電話タップ・placement: hero / sticky / hall / hall_other / plan / contact_success など）

「離脱」は 1→2 の落ち（LP を開いてどこも触らずに出た割合）と、3→4 の落ち（入力を始めて送らなかった割合）で見る。旧LPの「フォーム入力開始6・送信0」（8月）が比較対象。

### 記録の頻度

- **切替翌日（9/22）**：着地しているか・`lp_view` が入っているか・広告CVが入っているかの疎通確認のみ
- **1週間後（9/28 頃）**：初回レポート（`docs/ad-lp/2026-09-28-lp-first-week.md`）。母数が小さいので傾向だけ
- **1か月後（10/21 頃）**：旧LP 8月実績との本比較。バナー差し替え・ディスプレイ停止（9/11）の影響と混ざるため、期間を分けて見る
- 以後、月次。記録は `docs/ad-lp/` に日付付きで残し、`docs/reports/index.html` からリンク

### 切替後にやること（当社側）

1. 旧LP `kawaguchi-memorial-hall.com` を noindex（切替が安定してから。ホール名の検索表示減の回復を GSC で追う）
2. `?analytics=off` の徹底（社内の確認は必ず除外して行う）
3. 直接流入（direct）の `/lp/` イベントは社内分の疑いがあるので、レポートでは `google / cpc` 入口のセッションだけを主指標にする
