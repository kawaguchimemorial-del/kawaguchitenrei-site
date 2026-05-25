# Search Console URL 検査・インデックス登録リクエスト作業ログ（/saijo/）

## 作業名

/saijo/ URL 検査・インデックス登録リクエスト

## 実施日

2026-05-25

## 対象 URL

- https://kawaguchitenrei.com/saijo/

## 実施結果

| 手順 | 結果 |
|---|---|
| 1. Search Console プロパティ選択（`https://kawaguchitenrei.com/`） | ✅ 完了 |
| 2. URL 検査ツールで `/saijo/` を入力 | ✅ 完了 |
| 3. 公開 URL テストを実行 | ✅ 完了（エラーなし） |
| 4. インデックス登録をリクエスト | ✅ 送信済み |
| 割り当て制限 | ✅ 到達せず |

## 関連する直近施策

`/saijo/` ページの「川口市 寺院会館・民営式場でのお見送り。」セクションを以下の通り強化（2026-05-25）:

| 項目 | 内容 |
|---|---|
| 掲載施設数 | 7 件 → **16 件**（既存7 + 新規9） |
| エリアグループ化 | 単一カード並列 → **7 エリアグループ**（id 付きでアンカー対応） |
| 火葬場と式場の役割整理 | セクション冒頭に専用ボックスを新設（川口市めぐりの森 = 火葬場 / 寺院会館・民営式場 = 式場） |
| FAQ | 6 問 → **9 問**（新規 3 問 + 既存 1 問を統合更新） |
| FAQPage JSON-LD | **9 問に自動反映**（Question: 9 / Answer: 9） |
| metaDescription | エリアキーワード散らしの軽調整（朝日・本町・上青木・安行・南鳩ヶ谷・新郷） |
| カード表示項目 | 駐車場・規模・使用料の目安の 3 項目に簡素化（スマホ可読性優先） |
| 注意書き | 末尾を 2 段化（金額目安・利用条件 + 宗派確認） |

関連コミット:
- `d71a507` Expand temple hall section by area with 16 venues
- `fd36299` Document temple hall section expansion

完了記録:
- `docs/eval/records/2026-05-saijo-temple-hall-expansion.md`

## 注意事項

- **noindex / robots.txt / canonical / sitemap.xml の変更は一切行っていない**
- **削除系操作（URL 削除リクエスト・除外設定等）は行っていない**
- **インデックス登録リクエスト = Google に検査を依頼した状態**であり、「インデックス登録完了」ではない（実際の反映は Google 側の処理待ち、数時間〜数日かかる場合あり）
- 同一 URL への短期間の繰り返しリクエストは Google のガイドライン違反のため、本日中の再送信は行わない

## 今後の観測候補キーワード

Search Console「検索パフォーマンス」で表示回数・平均掲載順位・クリック数の継続観測対象:

### サイト全体・葬儀場・斎場
- 川口市 葬儀場
- 川口市 斎場

### 寺院会館・民営式場関連
- 川口 寺院会館 葬儀
- 川口 民営式場 葬儀
- 川口市 家族葬 式場

### エリア × 葬儀場
- 朝日 葬儀場
- 本町 葬儀場
- 上青木 葬儀場
- 安行 葬儀場
- 南鳩ヶ谷 葬儀場
- 新郷 葬儀場

## 次回確認目安

| 期間 | 観測内容 |
|---|---|
| **2〜3 日後（〜2026-05-28）** | `/saijo/` の「ページのインデックス登録」ステータス確認（「インデックス登録済み」になっているか） |
| **1 週間後（2026-06-01 頃）** | 主要キーワードの表示回数増加 |
| **2〜4 週間後（2026-06-08〜2026-06-22 頃）** | 平均掲載順位・クリック数の変化、検索パフォーマンス全体のスナップショット |
| **6〜8 週間後（2026-07-06〜2026-07-20 頃）** | 新 metaDescription / セクション強化による CTR や問い合わせ導線への影響確認 |

確認結果は、必要に応じて `docs/operations/search-console/` 配下に新規ログとして記録する。

## 関連ドキュメント

- /saijo/ 強化記録: `docs/eval/records/2026-05-saijo-temple-hall-expansion.md`
- 直前の Search Console 作業ログ: `docs/operations/search-console/2026-05-case-and-plan-url-inspection-log.md`
- Search Console 作業ログ運用ルール: `docs/operations/search-console/README.md`
- 過去の作業ログ:
  - `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
  - `docs/operations/search-console/2026-05-24-p1-batch2-area-pages.md`
  - `docs/operations/search-console/2026-05-case-and-plan-url-inspection-log.md`
