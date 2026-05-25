# Skill: Search Console 作業ログ記録手順

## 目的

Search Console で URL 検査・公開 URL テスト・インデックス登録リクエストを実施したあと、その結果を docs に記録するための標準手順。

## 適用範囲

- Search Console「URL 検査」ツールの実施記録
- 公開 URL テスト（ライブテスト）の実施記録
- インデックス登録リクエストの送信記録
- 割り当て制限到達の記録
- 表示回数 / 平均掲載順位 / クリック数の継続観測ログ

**適用外**:
- Search Console での削除系操作（URL 削除リクエスト・除外設定）→ **本 Skill ではカバーしない**。削除系操作が必要な場合は別途人間承認。
- noindex / robots.txt / canonical / sitemap の変更 → **本 Skill では行わない**。これらの変更は別 Skill / 別判断。

---

## 標準 5 ステップ

### Step 1: 事前確認

- 対象 URL が本番で HTTP 200 を返すこと（`curl -s -o /dev/null -w "%{http_code}\n" -L <URL>`）
- 直近の実装変更が Vercel に反映済みであること
- 同一 URL への直近の Search Console リクエストがないこと（重複防止）

### Step 2: Search Console 実施（人間が GUI で操作）

各 URL について:

1. Search Console プロパティ選択（`https://kawaguchitenrei.com/`）
2. URL 検査ツールに対象 URL を入力
3. 公開 URL テストを実行（エラーなしを確認）
4. インデックス登録をリクエスト（送信済みステータスを確認）

割り当て制限に到達した場合は、その時点で停止し、未完了 URL リストを残す。

### Step 3: docs 作成

新規 docs:
- パス: `docs/operations/search-console/<YYYY-MM>-<件名>-url-inspection-log.md`
- テンプレ:

```md
# Search Console URL 検査・インデックス登録リクエスト作業ログ

## 作業名
## 実施日
## 対象 URL
## 完了 URL
## 未完了 URL
## 実施内容（手順）
## 関連する直近施策（コミット hash も併記）
## 注意事項
- noindex / robots.txt / canonical / sitemap は変更していない
- 削除系操作は行っていない
- インデックス登録リクエスト = Google に検査を依頼した状態であり、「インデックス登録完了」ではない
## 今後の観測候補キーワード
## 次回確認目安
## 関連ドキュメント
```

### Step 4: commit & push

- 自動 push 範囲（CLAUDE.md §19.1）に該当するため、docs のみの変更であれば commit → push まで実施
- commit message: `Document Search Console <件名>`
- 変更ファイルが docs/operations/search-console/ 配下のみであることを確認

### Step 5: 観測スケジュール記録

docs に以下のスケジュールを明記:

| 期間 | 確認内容 |
|---|---|
| 2〜3 日後 | 対象 URL の「ページのインデックス登録」ステータス確認 |
| 1 週間後 | 主要キーワードの表示回数増加 |
| 2〜4 週間後 | 平均掲載順位の変化、クリック数 |
| 6〜8 週間後 | 新 title / description の CTR 改善、問い合わせ導線への影響 |

---

## チェックリスト

| 項目 | 確認 |
|---|---|
| 対象 URL が HTTP 200 | ☐ |
| 直近の実装変更が反映済み | ☐ |
| 完了 URL / 未完了 URL を分けて記録 | ☐ |
| 割り当て制限到達時の停止記録 | ☐ |
| 関連する直近施策のコミット hash を併記 | ☐ |
| noindex / robots / canonical / sitemap 未変更を明記 | ☐ |
| 削除系操作なしを明記 | ☐ |
| 観測キーワードを列挙 | ☐ |
| 次回確認目安を明記 | ☐ |
| 変更ファイルが docs/operations/search-console/ のみ | ☐ |

---

## 停止条件

- noindex / robots.txt / canonical / sitemap への変更が紛れ込んだ場合 → push 前に削除
- コード本体（app / components / lib / public）に差分が出ている場合 → push 前に削除
- 削除系操作（URL 削除リクエスト）が必要な可能性 → 人間承認を求める
- 個人情報を含む URL や対象 → 即停止、人間に確認

---

## 関連 Skill / Agent / docs

- 上位 Agent: `agents/documentation-agent.md`
- 関連 Skill: `skills/seo-page-improvement/SKILL.md`（実装後の push の流れで連携）
- 参照 docs: `docs/operations/search-console/README.md`

---

## 過去の適用例

- `docs/operations/search-console/2026-05-saijo-url-inspection-log.md`（/saijo/ 強化後の URL 検査）
- `docs/operations/search-console/2026-05-case-and-plan-url-inspection-log.md`（/case/ と主要プランの URL 検査）
- `docs/operations/search-console/2026-05-24-p1-batch1-area-pages.md`（P1 Batch1 エリアページ）
- `docs/operations/search-console/2026-05-24-p1-batch2-area-pages.md`（P1 Batch2 エリアページ）
