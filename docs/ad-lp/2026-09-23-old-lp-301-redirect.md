# 旧LP kawaguchi-memorial-hall.com を本サイトへ301転送（2026-09-23）

## 経緯
- 2026-09-21 に広告の着地先を `/lp/` へ切替済み。旧LPは検索に出る状態（noindex・canonical なし）のまま公開されていた
- 松澤がXserverの情報を保有していたため、当社側で対応
- 広告から旧LPへのリンクが残っていないことは松澤が確認済み

## 実施内容
1. サーバーの `public_html` を丸ごとバックアップ（7,199ファイル）→ **リポジトリ外** `F:\202608NEW_web\kawaguchitenrei\旧LPバックアップ\kawaguchi-memorial-hall.com\` に保管
   - `wp-config.php`（DB認証情報）・フォーム記録 `contact.csv` を含むため、`public/` やリポジトリに置かない
2. サーバー上のファイルを全削除（旧WordPress `BK20260127/` のログイン画面が公開状態だった問題も解消）
3. `public_html/.htaccess` のみ配置：
   ```
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^(www\.)?kawaguchi-memorial-hall\.com$ [NC]
   RewriteRule ^ https://kawaguchitenrei.com/hall/kawaguchi-memorial-hall/ [R=301,L]
   ```
   転送先を `/lp/` にしないのは、`/lp/` が noindex の広告専用ページで、検索から来る人にはホールのページが合うため

## 確認結果（2026-09-23）
トップ・`/contact`・`/mitsumori/`・`www`・`http`・`?gclid=` 付き・`/BK20260127/wp-login.php`・`robots.txt`・CSS のすべてが 301 → `https://kawaguchitenrei.com/hall/kawaguchi-memorial-hall/`（200）。クエリは引き継がれる。

## 今後
- ドメイン契約（XServer・期限 2027-03-31）は継続。手放すとドロップキャッチの恐れ
- 2026-10-21 頃の定期チェックで、GSC「川口メモリアルホール」の表示・クリックと `/hall/` の回復を確認
- 旧LPのGTM（`GTM-N2J5GBXL`）・GA4 は発火しなくなる。代理店の計測整理として共有
