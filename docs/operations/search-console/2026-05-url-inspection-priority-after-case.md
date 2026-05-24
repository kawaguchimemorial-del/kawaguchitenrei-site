# Search Console 後日対応 URL 優先順位（/case/ 強化後）

## 作成目的

`/case/` 施行事例一覧ページの SEO/AIO 強化を行ったため、後日 Search Console で URL 検査・公開 URL テスト・インデックス登録リクエスト・表示回数観測を行う優先順位を整理する。

## Search Console では今回は操作しない

- 本ドキュメントは **計画と優先順位の整理のみ**
- Search Console の画面操作（sitemap 送信、URL 検査、インデックス登録リクエスト、URL 削除、検索パフォーマンスのフィルタ設定など）は一切行わない
- 後日、人間が手動で Search Console にログインして実施する

## 優先順位

### Priority 1（最優先 / 直近の SEO/AIO 強化対象）

| URL | 理由 |
|---|---|
| `/case/` | **本日 2026-05-25 強化済み**。title / metaDescription / 結論ボックス / FAQPage / Related 追加。URL 検査で再インデックス促進、新 title での再評価を促す |

### Priority 2（最近強化した主要プラン）

すべて 2026-05-24〜2026-05-25 に強化済み。順位:

| # | URL | 強化日 | 強化内容 |
|---|---|---|---|
| 2-1 | `/plan/kawaguchi-shimin/` | 2026-05-24 | 川口市の制度ページ、競合多くキーワード集中 |
| 2-2 | `/plan/non-religious-funeral/` | 2026-05-24 | 新設ページ、ランキング 0 → 順位上昇期待大 |
| 2-3 | `/plan/family-funeral/` | 2026-05-24 | featured プラン、検索ボリューム最大 |
| 2-4 | `/plan/direct-funeral/` | 2026-05-24 | 直葬で competitor 多 |
| 2-5 | `/plan/cremation/` | 2026-05-24 | 火葬式（直葬と同義）、一覧未掲載の隠れページ |
| 2-6 | `/plan/oneday-funeral/` | 2026-05-24 | 一日葬、検索ボリューム中 |

### Priority 3（未完了エリア URL / Search Console 割り当て制限により後日対応）

P1 Batch 2 で公開済みだが、Search Console での URL 検査が割り当て制限により未送信:

| URL | 理由 |
|---|---|
| `/area/angyo/` | 安行地区。戸塚安行駅と住み分けで重要 |
| `/area/kamiaoki/` | 上青木地区。青木と住み分け |
| `/area/aoki/` | 青木地区。上青木と住み分け |

### Priority 4（内部リンク強化後の確認）

`/case/` への内部リンク追加（コミット `046cbb9`）に伴い、内部リンク元ページのインデックス再評価:

| URL | 理由 |
|---|---|
| `/case/` | 内部リンクの増加で被リンク強化 |
| `/plan/family-funeral/` | Related で `/case/` 追加 |
| `/area/kawaguchi/` | Related で `/case/` 追加 |
| `/area/araijuku/` | Related で `/case/` 追加 |
| `/area/hatogaya/` | Related で `/case/` 追加 |

## 各 URL の優先順位の理由

- **Priority 1**: 本日 push 完了 / Vercel 本番反映後すぐに URL 検査で再インデックス促進したい
- **Priority 2**: 直近 2 日で連続強化したため、まとめて検査することで「強化前と強化後」の比較がしやすい
- **Priority 3**: 公開からの経過日数が他より長く、自然インデックスを待ちつつ、必要に応じて URL 検査
- **Priority 4**: 既存ページの再インデックスは緊急性低、月次の検索パフォーマンス確認時にあわせて実施

## 実施時の注意

### URL 検査の割り当て制限

- Search Console の URL 検査・インデックス登録リクエストには 1 日あたりの上限がある（Google 公表値: 数十件程度、実運用ではさらに少ない）
- 短期間に同一 URL を繰り返しリクエストしない（Google のガイドライン違反）
- 公開後の反映待ちは「数時間〜数日」の幅がある

### 触らない操作

- **noindex 設定の変更**: 行わない（`/plan/cremation/` の隠れページ扱いは設計通り）
- **robots.txt の変更**: 行わない
- **canonical の変更**: 行わない
- **sitemap.xml の構成変更**: 行わない（自動生成で `plans.map` / `areas.map`）
- **URL 削除リクエスト**: 行わない
- **検索パフォーマンスのフィルタ設定**: 観測時のみ一時的に設定し、永続化はしない

### URL 検査時の手順（参考）

1. Search Console のプロパティを選択（`https://kawaguchitenrei.com/`）
2. 「URL 検査」ツールで対象 URL を入力
3. 公開 URL テストを実行
4. インデックス登録をリクエスト
5. 結果（送信済み / エラー / 既にインデックス済み）を `docs/operations/search-console/` 配下にテンプレ通り記録

## 観測キーワード候補

`/case/` 強化の効果測定 + 既存プラン強化の継続観測:

### /case/ 関連
- 川口市 施行事例
- 川口 葬儀 事例
- 川口市 家族葬 事例
- 川口 一日葬 事例
- 川口 直葬 事例

### プラン関連（強化済み）
- 川口市 家族葬 / 川口 家族葬
- 川口市 一日葬 / 川口 一日葬
- 川口市 直葬 / 川口 直葬
- 川口市 火葬式 / 川口 火葬式
- 川口市 火葬 / 川口 火葬
- 川口市 市民葬 / 川口 市民葬
- 川口市 無宗教葬 / 川口 無宗教葬

### エリア関連（P1 Batch 1〜2 観測）
- 川口市 葬儀
- 川口 葬儀
- 川口市 家族葬
- 川口メモリアルホール
- 川口市めぐりの森

## 観測のタイミング

| 期間 | 観測対象 | 期待 |
|---|---|---|
| **2026-05-25 push 翌日** | `/case/` の title 反映確認 | 新 title「川口市の施行事例 \| …」が Google の SERP に出始める |
| **push 後 3 日** | インデックス登録状況 | 「ページのインデックス登録」で `/case/` が「登録済み」になっているか |
| **push 後 1 週間** | 表示回数の変化 | 「川口市 施行事例」「川口 葬儀 事例」の表示回数増加 |
| **push 後 2〜4 週間** | 平均掲載順位 | 主要キーワードの順位変化を計測 |
| **push 後 6〜8 週間** | クリック率（CTR） | 新 title / description で CTR が改善しているか |

## 次回作業メモ

- 本ドキュメントを参照しつつ、Search Console で **Priority 1 から順番に** URL 検査を実施
- 実施後は `docs/operations/search-console/YYYY-MM-DD-<件名>.md` のテンプレで記録
- 割り当て制限に達した場合は翌日以降に持ち越し
- 検索パフォーマンスは月次でスナップショットを `docs/eval/records/` に残す方針を検討

## 関連ドキュメント

- `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`（本日 2026-05-25 強化記録）
- `docs/eval/records/2026-05-case-index-internal-link-improvement.md`（2026-05-24 内部リンク強化）
- 既存 Search Console 作業ログ:
  - `docs/operations/search-console/README.md`
  - `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`
  - `docs/operations/search-console/2026-05-24-p1-batch2-area-pages.md`
