# Search Console URL 検査・インデックス登録リクエスト作業ログ

## 作業名

移行リカバリ — GSC 突合で判明した「未表示の受け皿ページ」のうち SEO 中核 7 件のインデックス登録リクエスト

## 実施日

2026-06-09

## 背景

GSC のインデックスエクスポート（検出-インデックス未登録 80 / クロール済み-インデックス未登録 19）と、
パフォーマンス「ページ」CSV（2026/04/27–05/18 と 2026/05/19–06/08 の比較）を、サイト側の受け皿ページ全量（128 件）と突合。
**直近 2 期間とも表示回数 0 の受け皿ページが 81 件**あり、GSC の「検出-インデックス未登録 80」とほぼ一致した。

canonical は対象ページすべて自己参照（`/area/{slug}/`・`/plan/{slug}/`・`/saijo/{slug}/`）で正常、sitemap.ts にも全件掲載済み。
→ 未インデックスは canonical / sitemap のバグ由来ではなく、移行直後のクロール待ち（freshness）と判断。

そのうち CLAUDE.md §7（area > saijo 優先）・§10（鳩ヶ谷 / 新井宿 / 火葬式 / 花入れ等の中核キーワード）に直結する 7 件を最優先として登録リクエストを実施した。

## 対象 URL（最優先 7 件）

| # | URL | 選定理由 |
|---|---|---|
| 1 | https://kawaguchitenrei.com/area/hatogaya/ | 鳩ヶ谷 葬儀（§10 中核 KW） |
| 2 | https://kawaguchitenrei.com/area/kawaguchi-ekimae/ | 川口駅前エリア |
| 3 | https://kawaguchitenrei.com/area/araijuku/ | 新井宿（§10 中核 KW） |
| 4 | https://kawaguchitenrei.com/area/shiba/ | 芝エリア |
| 5 | https://kawaguchitenrei.com/plan/cremation/ | 火葬式（§10 中核 KW・正本プラン） |
| 6 | https://kawaguchitenrei.com/plan/hanaire-owakare/ | 花入れお別れ（§9 正本プラン） |
| 7 | https://kawaguchitenrei.com/saijo/toda-sousaijyo/ | 戸田葬祭場（旧 `/toda-sousaijyo` は表示実績あり＝需要確認済み） |

## 完了 URL

上記 7 件すべて、URL 検査 → 公開 URL テスト → インデックス登録リクエストを送信済み（人間が GUI で実施、2026-06-09）。
事前確認として 7 件すべて本番 HTTP 200 を確認済み。

## 未完了 URL

なし（割り当て制限到達なし）。

## 実施内容（手順）

1. 事前確認: 7 件すべて `curl -L` で HTTP 200 を確認
2. Search Console プロパティ（`https://kawaguchitenrei.com/`）で各 URL を URL 検査
3. 公開 URL テストを実行（エラーなしを確認）
4. インデックス登録をリクエスト（送信済みステータスを確認）

## 残りの未表示受け皿ページ（後回し・自然インデックス待ち）

今回の 7 件を除く未表示 74 件（自然クロール待ち、必要に応じ次バッチで対応）:

- column 31 件（kouden_souba / yonaka / kawaguchi_kazokusou / hansou / sougisya / sougidai / hojokin / sougi_flow / Nofuneral / Byouinchou / miaaou / souzoku / syuuha / sousaihi / jitaku_sou / obon / jiyusou / syuukatu / seshu-moshu / ichinichi-sou / bukkyou-shuha-13 / butumetu / fukusouhin / mushukyo-sou / jitakusou-merit / sousai-fujo / kenan / 2026s_sougi / nenmastu / sougi_nattoku / kazokusou-missou）
- case 9 件
- voice 28 件
- legal / 補助系: /privacy/ /tokushoho/ /sitemap/ /faq/ /estimate/ /voice/

## 関連する直近施策（コミット hash も併記）

- `e4eb3b4` Make legacy case redirects 1:1 to relevant plan pages（移行リカバリ task B）
- `22b41aa` Funnel link equity to canonical pages for core keywords（移行リカバリ task A）

旧 URL（`/Column_list/*`・`/QA/*` 等）からの 301 リダイレクト（GSC「ページにリダイレクトがあります」47 件）は上記施策で意図したもの。

## 注意事項

- noindex / robots.txt / canonical / sitemap は変更していない
- 削除系操作は行っていない
- インデックス登録リクエスト = Google に検査を依頼した状態であり、「インデックス登録完了」ではない

## 今後の観測候補キーワード

- 鳩ヶ谷 葬儀 / 鳩ヶ谷 家族葬
- 新井宿 葬儀 / 新井宿 家族葬
- 川口 火葬式 / 川口市 火葬式
- 川口 花入れ / 花入れお別れ
- 戸田葬祭場 / 戸田 火葬

## 次回確認目安

| 期間 | 確認内容 |
|---|---|
| 2〜3 日後（〜2026-06-12） | 7 URL の「ページのインデックス登録」ステータス確認 |
| 1 週間後（〜2026-06-16） | 上記キーワードの表示回数増加 |
| 2〜4 週間後（〜2026-07-07） | 平均掲載順位の変化、クリック数 |
| 6〜8 週間後（〜2026-08-04） | 受け皿ページ全体の未インデックス件数（81 件）の減少傾向、問い合わせ導線への影響 |

## 関連ドキュメント

- `docs/operations/search-console/README.md`
- `docs/operations/search-console/2026-06-05-sitewide-improvement-url-inspection-log.md`
- `skills/search-console-log/SKILL.md`
