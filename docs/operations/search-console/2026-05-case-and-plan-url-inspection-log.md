# Search Console URL 検査・インデックス登録リクエスト作業ログ

## 作業名

Search Console URL 検査・インデックス登録リクエスト（/case/ と主要プラン・未完了エリア）

## 実施日

2026-05-25

## 対象 URL 一覧

`docs/operations/search-console/2026-05-url-inspection-priority-after-case.md` の優先順位に基づき、以下 10 URL を対象に実施。

### Priority 1: 直近強化対象
- https://kawaguchitenrei.com/case/

### Priority 2: 最近強化した主要プラン（2026-05-24〜2026-05-25 強化済み）
- https://kawaguchitenrei.com/plan/family-funeral/
- https://kawaguchitenrei.com/plan/oneday-funeral/
- https://kawaguchitenrei.com/plan/direct-funeral/
- https://kawaguchitenrei.com/plan/cremation/
- https://kawaguchitenrei.com/plan/kawaguchi-shimin/
- https://kawaguchitenrei.com/plan/non-religious-funeral/

### Priority 3: 未完了エリア URL（P1 Batch 2 で公開済みだが Search Console 未送信だった）
- https://kawaguchitenrei.com/area/angyo/
- https://kawaguchitenrei.com/area/kamiaoki/
- https://kawaguchitenrei.com/area/aoki/

## 完了 URL（URL 検査 + 公開 URL テスト + インデックス登録リクエスト完了）

すべて完了:

| # | URL | 結果 |
|---|---|---|
| 1 | https://kawaguchitenrei.com/case/ | ✅ インデックス登録リクエスト送信済み |
| 2 | https://kawaguchitenrei.com/plan/family-funeral/ | ✅ インデックス登録リクエスト送信済み |
| 3 | https://kawaguchitenrei.com/plan/oneday-funeral/ | ✅ インデックス登録リクエスト送信済み |
| 4 | https://kawaguchitenrei.com/plan/direct-funeral/ | ✅ インデックス登録リクエスト送信済み |
| 5 | https://kawaguchitenrei.com/plan/cremation/ | ✅ インデックス登録リクエスト送信済み |
| 6 | https://kawaguchitenrei.com/plan/kawaguchi-shimin/ | ✅ インデックス登録リクエスト送信済み |
| 7 | https://kawaguchitenrei.com/plan/non-religious-funeral/ | ✅ インデックス登録リクエスト送信済み |
| 8 | https://kawaguchitenrei.com/area/angyo/ | ✅ インデックス登録リクエスト送信済み |
| 9 | https://kawaguchitenrei.com/area/kamiaoki/ | ✅ インデックス登録リクエスト送信済み |
| 10 | https://kawaguchitenrei.com/area/aoki/ | ✅ インデックス登録リクエスト送信済み |

## 未完了 URL

なし（10/10 完了）

## 実施内容

各 URL に対して以下の手順で実施:

1. **Search Console プロパティ選択**: `https://kawaguchitenrei.com/`
2. **URL 検査ツール**で対象 URL を入力
3. **公開 URL テスト**を実行 → エラーなしを確認
4. **インデックス登録をリクエスト** → 送信済みステータスを確認

割り当て制限には今回到達せず、対象 10 URL すべて完了した。

## 注意事項

- **noindex / robots.txt / canonical / sitemap.xml の変更は一切行っていない**
- **削除系操作（URL 削除リクエスト等）は行っていない**
- **インデックス登録リクエスト = Google に検査を依頼した状態**であり、「インデックス登録完了」ではない（実際の反映は Google 側の処理待ち、数時間〜数日かかる場合あり）
- 同一 URL への短期間の繰り返しリクエストは Google のガイドライン違反のため、本日中に再送信は行わない

## 関連する直近施策

| 施策 | 完了日 | 関連コミット |
|---|---|---|
| `/case/` 施行事例一覧ページの SEO/AIO 強化 | 2026-05-25 | `9655add` |
| 施工事例 / 施行事例の表記統一 | 2026-05-25 | `519e146` |
| `/case/` への内部リンク追加（プラン 6 / エリア 3） | 2026-05-24 | `046cbb9` |
| 家族葬ページの川口市向け強化 | 2026-05-24 | `1c94bca` |
| 一日葬ページの川口市向け強化 | 2026-05-24 | `bd2f0cf` |
| 直葬・火葬式ページの川口市向け強化 | 2026-05-24 | `74be7db` |
| 無宗教葬ページ新設 | 2026-05-24 | `b1e7272` |
| 川口市民葬ページの SEO/AIO 再調整 | 2026-05-24 | `c629724` |
| P1 Batch 2 エリアページ追加（神根/新郷/芝/安行/上青木/青木） | 2026-05-24 | `5c18ecc` |

## 今後の観測候補キーワード

Search Console「検索パフォーマンス」で表示回数・平均掲載順位・クリック数の継続観測対象:

### 主要プラン関連
- 川口市 葬儀
- 川口市 家族葬 / 川口 家族葬
- 川口市 直葬 / 川口 直葬
- 川口市 一日葬 / 川口 一日葬
- 川口市 火葬式 / 川口 火葬式
- 川口市 火葬 / 川口 火葬
- 川口市 市民葬 / 川口 市民葬
- 川口市 無宗教葬 / 川口 無宗教葬

### /case/ 関連
- 川口市 施行事例
- 川口 葬儀 事例
- 川口市 家族葬 事例
- 川口 一日葬 事例
- 川口 直葬 事例

### エリア関連
- 川口市 安行 葬儀
- 川口市 青木 葬儀
- 川口市 上青木 葬儀
- 川口市 神根 葬儀
- 川口市 新郷 葬儀
- 川口市 芝 葬儀

### ホール / 火葬場関連
- 川口メモリアルホール
- 川口市めぐりの森
- 川口メモリアルホール 家族葬
- 川口市めぐりの森 火葬

## 次回確認目安

| 期間 | 観測内容 |
|---|---|
| **2〜3 日後（〜2026-05-28）** | 対象 10 URL の「ページのインデックス登録」ステータス確認（「インデックス登録済み」になっているか） |
| **1 週間後（2026-06-01 頃）** | 主要キーワードの表示回数増加 |
| **2〜4 週間後（2026-06-08〜2026-06-22 頃）** | 平均掲載順位の変化、検索パフォーマンス全体のスナップショット |
| **6〜8 週間後** | 新 title / description の CTR 改善 |

確認結果は、必要に応じて `docs/operations/search-console/` 配下に新規ログとして記録する。

## 関連ドキュメント

- 優先順位整理: `docs/operations/search-console/2026-05-url-inspection-priority-after-case.md`
- /case/ 強化記録: `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`
- 表記統一記録: `docs/eval/records/2026-05-case-terminology-normalization.md`
- 1 時間作業サマリー: `docs/operations/2026-05-case-index-one-hour-work-summary.md`
- Search Console 作業ログ運用ルール: `docs/operations/search-console/README.md`
- 過去の作業ログ:
  - `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
  - `docs/operations/search-console/2026-05-24-p1-batch2-area-pages.md`
