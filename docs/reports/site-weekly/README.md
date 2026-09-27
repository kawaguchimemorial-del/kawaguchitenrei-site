# 本サイト 週次チェック

2026-09-27 松澤依頼：**本サイト（/lp/ 以外）のどこで離脱しているかを、週1回監視して記録を積み上げる。**
本サイトは自然検索などからの来訪が1日30件前後と少なく、日次では数字が揺れすぎるため週次にする。LP は `docs/ad-lp/daily/` で日次。

## 手順
1. 月曜〜日曜の7日分を集計（GA4 は直近約48時間が未確定なので、**火曜以降**に前週分を取る）
   `node --env-file=.env.local scripts/site-weekly-check.mjs YYYY-MM-DD YYYY-MM-DD > tmp/site-weekly/YYYY-MM-DD.json`
2. `site-weekly-log.md` に週の見出しで追記：最初に開いたページ別の来訪・成果、ページ別の区画到達、成果につながる操作
3. 定期SEOチェック（Search Console・GBP）の数字と並べて読む

## 区画の到達（`site_section_view`）
- 2026-09-27 導入。区画が画面の縦中央の線にかかったら、ページ表示ごとに1回。区画名は `cta_placement`、ページは `pagePath`
- 前の区画との人数差が、その区画での離脱
- 対象ページと区画（上から順）
  - トップ：home_hero → home_review → home_advance → home_strengths → home_emergency → home_cost → home_plans → home_family → home_hall → home_meguri → home_cases → home_voices → home_media → home_faq → home_areas → home_access → home_final_cta
  - プラン一覧：plan_list_hero → compare → cards → guide → saijo → nonreligious → cost → before_request → contact
  - プラン詳細：plan_intro → conclusion → format → inclusions → (simple_alt) → flow → additional → cost → halls → faq → related → plan_cta（夕暮れ・無宗教・市民葬は本文の区画が異なる）
  - ホール：hall_intro → features → gallery → visitation → equipment → plans → access → faq → hall_cta
  - コラム（全記事）：column_body_start → column_body_50 → column_body_end → column_local_guide → column_cta

## 読み方の注意
- 電話タップ（click_tel）は押された回数で、着信数ではない。PC からの電話は記録されない
- 区画の到達は計測を許可したブラウザのみ（`?analytics=off` の社内端末は含まない）
