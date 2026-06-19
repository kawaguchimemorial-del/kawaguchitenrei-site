# 2026-06-19 重要キーワードSEO/AIO改善レポート

## 目的

Search Console比較で順位悪化・評価分散が見えていた以下キーワードについて、サイト内部でできる受け皿明確化、内部リンク集約、構造化データ、redirect/canonical点検を実施した。

- 川口典礼
- 川口 葬儀
- 川口市 葬儀
- 川口 家族葬
- 川口市 家族葬

## Search Console所見

`public/images/tmp/searchconsole/` 配下の元データは分析に利用したが、GSC元データはcommitしない方針のため `.gitignore` に追加して除外した。

- 「川口典礼」は平均3位台で推移しているが、ブランド指名としてはトップページと会社情報の同一性強化が必要。
- 「川口 葬儀」「川口市 葬儀」は `/area/kawaguchi/` に主受け皿を寄せる必要がある。
- 「川口 家族葬」「川口市 家族葬」は `/kazoku_sou`、`/plan/family-funeral/`、家族葬系コラムに評価が分散している可能性がある。
- 旧URL `/kazoku_sou` は `/plan/family-funeral/` に転送済み。`/QA/kazokusou_4` は `/column/fuhou/` 転送だが、旧内容が手元で確定できないため要確認とした。

## 実施内容

### `/plan/family-funeral/`

- H1を `川口市の家族葬プラン` として出せるよう `heroTitle` を追加。
- 冒頭説明を「川口市で家族葬を検討している方」向けに変更。
- 結論ボックスを、式場・火葬場・参列人数・別途費用を先に整理する内容に調整。
- 既存の価格プラン表・価格水準は変更せず、断定的な総額表現も追加していない。
- sitemap上で `/plan/family-funeral/` のpriorityを主受け皿相当に調整。

### `/area/kawaguchi/`

- H1を `川口市で葬儀をお考えの方へ` に寄せ、家族葬だけでなく葬儀全般の地域ガイドとして明確化。
- title / metaDescription に `川口市の葬儀`、`川口で葬儀` が自然に入るよう調整。
- AIO向け結論ブロックの見出し・本文を「川口・川口市で葬儀を探す人」向けに調整。
- 家族葬への導線は `/plan/family-funeral/` に明確化し、ページ役割の分散を抑制。

### トップページ / 会社情報

- トップページのFuneralHome JSON-LDを会社情報ページと同じ `getLocalBusinessJsonLd()` に統一。
- JSON-LDに `url`、`image`、`logo`、`email`、`priceRange`、`contactPoint` を追加。
- `name` は `川口典礼`、住所・電話・自社式場情報は `lib/company.ts` のNAPに統一。
- `aggregateRating`、`sameAs` は確認根拠がないため追加していない。

## 内部リンク整理

以下の内部リンクアンカーを主受け皿へ寄せた。

- `/area/kawaguchi/` への主なアンカー: `川口市の葬儀ガイド`
- `/plan/family-funeral/` への主なアンカー: `川口市の家族葬`、`川口市の家族葬プランを見る`

反映対象:

- トップページのエリア導線・プラン導線
- フッター
- プラン一覧・プラン詳細関連リンク
- 川口市内の地域別ページ群
- 斎場一覧・主要斎場ページ
- 施行事例一覧
- コラム下部の地域密着導線
- 家族葬系コラムCTA

## redirect / canonical 点検

- `/kazoku_sou`、`/kazoku_sou/` は `/plan/family-funeral/` へ恒久redirect済み。
- `/kawaguchishi-megurinomori` は `/saijo/megurinomori/` へredirect済み。
- `/kawaguchi_hall` は `/hall/kawaguchi-memorial-hall/` へredirect済み。
- `/Column_list/:slug*` のcatch-allにより、`/Column_list/kawaguchi_kazokusou` は `/column/kawaguchi_kazokusou/` へ流れる設計を確認済み。
- `/QA/kazokusou_4` は `/column/fuhou/` へ転送されているが、旧URL内容が未確定のためコード変更せず「人間確認が必要」とした。
- `/`、`/area/kawaguchi/`、`/plan/family-funeral/`、`/company/`、コラム詳細は自己参照canonicalを確認済み。
- noindexは管理系・アンケート系に限定され、主要ページには設定されていない。
- robots.txtは主要URLをブロックしておらず、sitemap.xmlを指定済み。

## build結果

- `npm run build` 成功。
- Next.js 16.2.6 / Turbopack。
- 静的生成ページ数: `135/135`。

## 残タスク

### コードで対応済み

- 主受け皿ページのH1 / metadata / 冒頭文脈調整。
- AIO向け結論ボックスの主題調整。
- 内部リンクアンカーの主受け皿集約。
- 家族葬系コラムから `/plan/family-funeral/` への導線整理。
- LocalBusiness JSON-LDの同一性強化。
- sitemapで家族葬ページの重要度調整。
- GSC元データのcommit除外。

### 人間確認が必要

- `/QA/kazokusou_4` の旧内容。家族葬Q&Aなら `/column/kazokusou/` または `/plan/family-funeral/` へ寄せる余地があるが、旧内容未確認のため今回は変更しない。
- Googleビジネスプロフィールの社名・住所・電話・カテゴリ・公式サイトURL・投稿/サービス表記の一致確認。
- 外部媒体やSNS URLをJSON-LD `sameAs` に入れる場合は、公式管理下のURL確認が必要。

### GSCで後日確認

- `川口 葬儀`、`川口市 葬儀` のランディングが `/area/kawaguchi/` に寄っているか。
- `川口 家族葬`、`川口市 家族葬` のランディングが `/plan/family-funeral/` に寄っているか。
- `/kazoku_sou` の表示回数が新URL側に移行していくか。
- ブランド名 `川口典礼` の平均順位・CTRが改善するか。
