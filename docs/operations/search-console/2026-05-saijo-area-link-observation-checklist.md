# /saijo/ 強化 + エリアページ内部リンク追加 観測チェックリスト

## 1. 目的

直近の 2 施策（`/saijo/` 寺院会館・民営式場セクション強化 + エリアページ 14 件から `/saijo/` への内部リンク追加）の効果を Search Console で継続観測する。観測対象:

- `/saijo/` 強化後の **インデックス状況確認**
- エリアページ 14 件から `/saijo/` への **内部リンク反映確認**
- 主要キーワードの **検索パフォーマンスの推移確認**
- 強化後の **問い合わせ導線への影響確認**

## 関連施策コミット

| commit | 内容 | 日付 |
|---|---|---|
| `d71a507` | Expand temple hall section by area with 16 venues | 2026-05-25 |
| `fd36299` | Document temple hall section expansion | 2026-05-25 |
| `75ee21a` | Document Search Console inspection for saijo page | 2026-05-25 |
| `e8cdc70` | Add area links to saijo venue anchors | 2026-05-25 |

---

## 2. 観測対象 URL

### Primary（直接強化対象）

- https://kawaguchitenrei.com/saijo/

### Secondary（/saijo/ への内部リンク追加元）

| エリア | URL | 追加した /saijo/ 導線 |
|---|---|---|
| kawaguchi（市全体） | https://kawaguchitenrei.com/area/kawaguchi/ | `/saijo/` 一覧トップ |
| araijuku | https://kawaguchitenrei.com/area/araijuku/ | `/saijo/` 一覧トップ |
| hatogaya | https://kawaguchitenrei.com/area/hatogaya/ | `/saijo/#asahi-minami-hatogaya` |
| minami-hatogaya | https://kawaguchitenrei.com/area/minami-hatogaya/ | `/saijo/#asahi-minami-hatogaya` |
| higashikawaguchi | https://kawaguchitenrei.com/area/higashikawaguchi/ | `/saijo/#angyo-tozuka-angyo` |
| nishikawaguchi | https://kawaguchitenrei.com/area/nishikawaguchi/ | `/saijo/` 一覧トップ |
| kawaguchi-motogo | https://kawaguchitenrei.com/area/kawaguchi-motogo/ | `/saijo/#motogo-ryoke` |
| kamine | https://kawaguchitenrei.com/area/kamine/ | `/saijo/#edobukuro-shinbori` |
| shingo | https://kawaguchitenrei.com/area/shingo/ | `/saijo/#hagimatsu-shingo-sashima` |
| shiba | https://kawaguchitenrei.com/area/shiba/ | `/saijo/` 一覧トップ |
| angyo | https://kawaguchitenrei.com/area/angyo/ | `/saijo/#angyo-tozuka-angyo` |
| kamiaoki | https://kawaguchitenrei.com/area/kamiaoki/ | `/saijo/#kamiaoki-aoki` |
| aoki | https://kawaguchitenrei.com/area/aoki/ | `/saijo/#kamiaoki-aoki` |
| tozuka-angyo | https://kawaguchitenrei.com/area/tozuka-angyo/ | `/saijo/#angyo-tozuka-angyo` |

---

## 3. 観測スケジュール

| 期間 | 観測タイミング | 確認内容 |
|---|---|---|
| **2〜3 日後** | 2026-05-27 〜 2026-05-28 | `/saijo/` のインデックス登録状況確認（URL 検査ツール）。「ページのインデックス登録」で「インデックス登録済み」か確認 |
| **1 週間後** | 2026-06-01 頃 | Search Console「リンク」レポートで `/saijo/` への内部リンク数が 0 → 14 程度に増えているか確認。エリアページのクロール状況も確認 |
| **2〜4 週間後** | 2026-06-08 〜 2026-06-22 | 検索パフォーマンス（表示回数・平均掲載順位・クリック数・CTR）の変化を観測。§5 観測キーワードについて、Before/After を比較 |
| **6〜8 週間後** | 2026-07-06 〜 2026-07-20 | 新 metaDescription / セクション強化による CTR の改善、問い合わせ導線への影響（コンバージョン）確認 |

---

## 4. Search Console で見る画面

| 画面 | 用途 | 主に見るタイミング |
|---|---|---|
| **URL 検査** | 個別 URL のインデックス状況確認 | 2〜3 日後 |
| **ページのインデックス登録** | 全 URL のインデックス状況一覧 | 1 週間後 |
| **検索パフォーマンス** | キーワード別 / ページ別の表示回数・順位 | 2〜4 週間後 |
| **リンク** | 内部リンク・外部リンクの被リンク状況 | 1 週間後（内部リンク数の確認） |
| **ページ別パフォーマンス** | URL ごとの表示回数・CTR | 2〜4 週間後、6〜8 週間後 |

---

## 5. 観測キーワード

### サイト全体・葬儀場・斎場

- 川口市 葬儀場
- 川口市 斎場

### 寺院会館・民営式場関連

- 川口 寺院会館 葬儀
- 川口 民営式場 葬儀
- 川口市 家族葬 式場

### エリア × 葬儀場

- 安行 葬儀場
- 上青木 葬儀場
- 青木 葬儀場
- 南鳩ヶ谷 葬儀場
- 朝日 葬儀場
- 新郷 葬儀場
- 本町 葬儀場
- 元郷 葬儀場

---

## 6. 記録テンプレート

各確認時に、以下の表を `docs/operations/search-console/` 配下に新規ログとして追加（または本ファイル末尾に追記）して記録する。

```md
### 確認ログ <YYYY-MM-DD>

| 項目 | 値 |
|---|---|
| 確認日 | 2026-MM-DD |
| 確認者 | （氏名 / 役職） |
| Search Console 画面 | URL 検査 / インデックス登録 / 検索パフォーマンス / リンク / ページ別パフォーマンス |
| 対象 URL | https://kawaguchitenrei.com/<path>/ |
| インデックス状態 | 登録済み / 未登録 / 検出 - 未登録 / クロール済み - 未登録 |
| 表示回数 | <数値>（前回比 +/- <数値>） |
| クリック数 | <数値>（前回比 +/- <数値>） |
| 平均掲載順位 | <数値>（前回比 +/- <数値>） |
| CTR | <%>（前回比 +/- <%>） |
| 内部リンク数 | <数値>（前回比 +/- <数値>） |
| 気づき | （自由記述：表示回数増加の傾向、特定キーワードの順位変動、CTR の傾向など） |
| 次アクション | （自由記述：追加観測、追加施策、再 URL 検査など） |
```

複数 URL を一度に観測する場合は、`対象 URL` 行を増やして対応する。

---

## 7. 判断基準

### 7.1 未インデックスの場合の対応

| ケース | 対応 |
|---|---|
| 「検出 - インデックス未登録」 | 1〜2 週間待つ。改善しなければ URL 検査で再リクエスト（**前回リクエストから最低 1 週間以上空ける**） |
| 「クロール済み - インデックス未登録」 | 内容が薄いと判定された可能性。ページの本文・構造化データを見直す候補に。**ただし価格・式場利用可否・宗派条件を勝手に変更しない** |
| 「ページにリダイレクトがあります」 | canonical / リダイレクトの設定を確認（ただし sitemap / robots / canonical / noindex の変更は今回 Skill では行わない） |
| 「重複しています」 | 類似ページの統合検討（人間判断、CLAUDE.md §19.2 該当） |

### 7.2 内部リンク未反映の場合の対応

| ケース | 対応 |
|---|---|
| Search Console「リンク」レポートの内部リンク数が 1 週間後でも増えていない | エリアページのクロールがまだ反映されていない可能性。各エリアページの URL 検査を順次実施（割り当て制限に注意） |
| 内部リンクは認識されているが `/saijo/` の被リンク数が増えていない | アンカー部分（`#asahi-minami-hatogaya` など）は Search Console 上では `/saijo/` への内部リンクとしてカウントされる想定。実態を確認 |

### 7.3 表示回数増加・クリックなしの場合の対応

| ケース | 対応 |
|---|---|
| 表示回数が増えているが CTR が低い | metaDescription / title の魅力度を見直す候補に。**ただし、まず 4 週間程度継続観測**してから判断 |
| 特定キーワードで CTR が極端に低い（< 0.5%） | 検索意図と内容のミスマッチの可能性。**人間判断で記事構成見直しの候補に** |

### 7.4 順位変動がない場合の対応

| ケース | 対応 |
|---|---|
| 2 週間以内に順位変動なし | **追加実装はしない**（Search Console の反映遅延・Google アルゴリズムの定期更新待ち） |
| 4 週間後も全く変動なし | 競合分析の再実施、コンテンツ強化の検討（人間判断、CLAUDE.md §19.2 該当） |
| 順位が下がった | まず原因分析（コンテンツ削除はしない）。`docs/seo-research/` に分析ログを残す |

### 7.5 問い合わせ導線に変化がない場合の対応

| ケース | 対応 |
|---|---|
| 表示回数・クリック数は増えたが、問い合わせが増えない | フォーム改修は **app/api / 問い合わせフォームに触れる範囲**のため CLAUDE.md §19.2 該当、人間承認後に Privacy Review 経由で対応 |
| 特定エリアからの流入は増えたが問い合わせが少ない | エリアページ → CTA の動線を見直す候補（ただし MobileBottomCTA / Header / Footer には触らない） |

---

## 8. 注意事項

| 項目 | 内容 |
|---|---|
| **反映遅延** | Search Console の反映には数時間〜数週間の遅延がある。短期間（< 2 週間）の変動だけで判断しない |
| **リクエスト頻度** | 同一 URL へのインデックス登録リクエストを **短期間で繰り返さない**（Google ガイドライン違反のリスク） |
| **早計な追加実装** | 2 週間以内の順位変動だけで追加実装しない。**最低 4 週間**の観測を経てから判断 |
| **データ駆動の罠** | 観測結果から **価格・式場利用可否・空き状況・宗派条件を勝手に変更しない**。これらは CLAUDE.md §9・§14・§19.2 に従って人間承認必須 |
| **実装改善のフロー** | 実装改善が必要な場合は、必ず **現状分析 → 方針確認 → 実装** の順（`skills/seo-page-improvement/SKILL.md` の 7 ステップを踏襲） |
| **削除系操作** | Search Console での URL 削除リクエスト・除外設定は **本観測の範囲外**。必要時は別途人間承認 |
| **noindex / robots / canonical / sitemap** | 本観測の結果から **これらを変更しない**。変更が必要と判断された場合は別 Skill / 別判断で対応 |

---

## 9. 関連ドキュメント

- `docs/operations/search-console/2026-05-saijo-url-inspection-log.md` — /saijo/ URL 検査の作業ログ（本観測の起点）
- `docs/operations/search-console/2026-05-case-and-plan-url-inspection-log.md` — 直近の URL 検査作業ログ（10 URL 実施）
- `docs/eval/records/2026-05-saijo-temple-hall-expansion.md` — /saijo/ 強化の完了記録（commit `d71a507`）
- `docs/eval/records/2026-05-area-to-saijo-anchor-links.md` — エリアページ内部リンク追加の完了記録（commit `e8cdc70`）
- `skills/search-console-log/SKILL.md` — Search Console 作業ログの標準手順
- `skills/seo-page-improvement/SKILL.md` — SEO/AIO ページ改善の標準 7 ステップ
- `CLAUDE.md` §10（SEO/AIO 中心軸）・§19（自動 push / push 前確認 / 停止条件）
- `docs/01-seo-aio-policy.md`
- `docs/eval/seo-aio-checklist.md`

---

## 10. 観測ログ（今後追記）

> 各確認時に §6 のテンプレートを使って以下に追記する。または新規ファイル `docs/operations/search-console/2026-MM-DD-saijo-area-observation-log.md` として独立記録する（4 週間後・8 週間後など節目では独立ファイル推奨）。

### 確認ログ（テンプレ）

| 項目 | 値 |
|---|---|
| 確認日 | 2026-MM-DD |
| 確認者 | |
| Search Console 画面 | |
| 対象 URL | |
| インデックス状態 | |
| 表示回数 | |
| クリック数 | |
| 平均掲載順位 | |
| CTR | |
| 内部リンク数 | |
| 気づき | |
| 次アクション | |

（観測実施後、本セクションに追記してください）
