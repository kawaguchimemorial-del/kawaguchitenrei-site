# Search Console URL 検査・インデックス登録リクエスト作業ログ

## 作業名

2026-06-05 サイト全体改善バッチ（弱点監査 A〜N）後の URL 検査・インデックス登録リクエスト

## 実施日

- ログ作成：2026-06-05
- Search Console 送信：（GSCはユーザーが実施。送信後に下のチェック欄に記入）

## 事前確認（Step 1）

- 本番 HTTP ステータス：対象URLすべて **200**（2026-06-05 時点、`curl -L` で確認）
- 直近の実装変更が Vercel に反映済み：**確認済み**（`/area/`・`/area/kawaguchi-ekimae/`・`/pet/`・`/saijo/`・`/company/`・`/voice/`・`/column/` を実機確認）
- 重複防止：本バッチの対象URLについて直近の Search Console リクエストなし

## 対象 URL（優先度順・GSCで「URL検査→公開URLテスト→インデックス登録をリクエスト」）

優先度高（新規ページ＝最優先）

| 送信 | URL | 種別 | 関連施策（commit） |
|---|---|---|---|
| ☐ | https://kawaguchitenrei.com/area/ | 新規（対応エリア索引ハブ） | e917051 |
| ☐ | https://kawaguchitenrei.com/area/kawaguchi-ekimae/ | 新規（川口駅周辺エリア） | 7d20433 |

優先度中（重要変更ページ）

| 送信 | URL | 種別 | 関連施策（commit） |
|---|---|---|---|
| ☐ | https://kawaguchitenrei.com/pet/ | title/h1/description 改善（CTR0%対策）＋内部リンク開通 | 74b1cad / 7c6ce16(Footer) |
| ☐ | https://kawaguchitenrei.com/saijo/ | 「斎場」語補強＋ItemList追加 | 04a2458 / 67cf945 |
| ☐ | https://kawaguchitenrei.com/company/ | title補強＋BreadcrumbList | 6c5b6fd / 67cf945 |
| ☐ | https://kawaguchitenrei.com/voice/ | title/description/OG補強 | 6c5b6fd / c68d124 |
| ☐ | https://kawaguchitenrei.com/column/ | JSON-LD（Breadcrumb/ItemList）＋OG | 3048100 |

優先度低（OG/構造化のみ・必要に応じて）

| 送信 | URL | 種別 | 関連施策（commit） |
|---|---|---|---|
| ☐ | https://kawaguchitenrei.com/plan/ | 固有OG付与 | c68d124 |
| ☐ | https://kawaguchitenrei.com/case/ | 固有OG付与 | c68d124 |

## 完了 URL

- （GSCで送信した URL をここに記入）

## 未完了 URL

- （割り当て制限などで送信できなかった URL をここに記入）

## 実施内容（手順）

1. Search Console プロパティ `https://kawaguchitenrei.com/` を選択
2. 各 URL を「URL 検査」に入力
3. 「公開 URL をテスト」でエラーなしを確認
4. 「インデックス登録をリクエスト」を送信
5. 割り当て制限に達したら停止し、未完了 URL を記録

あわせて、sitemap（`/sitemap.xml`）に `/area/` と `/area/kawaguchi-ekimae/` が含まれることを確認（コミット e917051 / 7d20433 で追加済み）。Search Console の「サイトマップ」で再送信は任意。

## 関連する直近施策（commit hash）

- `74b1cad` /pet title・h1・description 補強＋HTMLサイトマップ追加
- `baa6a9a` voice 個別 Review JSON-LD
- `7c6ce16` Footer 導線拡充＋MobileBottomCTA フォールバック
- `7d20433` 新規エリア「川口駅周辺」
- `7b77106` ColumnCard を next/image 化
- `c68d124` hanaire metaTitle／plan・case・voice 固有OG／column href 修正
- `67cf945` saijo ItemList／company・access BreadcrumbList
- `6c5b6fd` company・voice の title/description 補強
- `04a2458` /saijo「斎場」語補強
- `3048100` column JSON-LD ＋ layout OG既定
- `e917051` /area 索引ページ新設＋sitemap
- `c5eec4a` ヒーロー画像 priority 修正

## 注意事項

- noindex / robots.txt / canonical / sitemap の方針は変更していない（sitemap は新規ページの「追加」のみ）
- 削除系操作（URL 削除リクエスト・除外）は行っていない
- 「インデックス登録リクエスト」= Google に検査を依頼した状態であり、「インデックス登録完了」ではない
- voice の Review 構造化は、Google の自社サイト上の自社レビュー方針により**星リッチリザルトが表示されない可能性**がある。リッチリザルト テスト／手動による対策の有無も併せて観測する

## 今後の観測候補キーワード

- ペット火葬 川口市 / ペット葬儀 川口市（/pet/ の CTR 改善）
- 川口 斎場 / 川口市 葬儀場（/saijo/）
- 川口 葬儀社（/company/）
- 川口 家族葬 口コミ（/voice/）
- 川口駅 葬儀 / 本町 葬儀 / 栄町 葬儀（新規エリア）
- めぐりの森 葬儀 / めぐりの森 家族葬（コラム→めぐりの森 内部リンク開通の効果）
- 神式葬儀 香典袋 / 友人葬とは（コラム強化・JSON-LD）

## 次回確認目安

| 期間 | 確認内容 |
|---|---|
| 2〜3 日後 | 新規 `/area/`・`/area/kawaguchi-ekimae/` の「ページのインデックス登録」ステータス |
| 1 週間後 | ペット系・斎場・新規エリアの表示回数増加 |
| 2〜4 週間後（〜2026-06-26 目安） | 平均掲載順位の変化、めぐりの森系の表示獲得、地域×形式の着地ページ移行 |
| 6〜8 週間後 | /pet/・company・voice の新 title/OG の CTR 改善、問い合わせ導線への影響、voice Review のリッチリザルト/手動対策有無 |

## 関連ドキュメント

- `docs/reports/2026-06-05-current-state-and-fix-prompts.html`（現状分析＆修正プロンプト集／改善台帳）
- `docs/reports/index.html`（本バッチの作業レポート一覧）
- `skills/search-console-log/SKILL.md`（本手順）
