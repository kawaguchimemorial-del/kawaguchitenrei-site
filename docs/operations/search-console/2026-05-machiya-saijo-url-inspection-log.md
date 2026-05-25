# 町屋斎場ページ公開後 Search Console URL 検査・インデックス登録リクエスト作業ログ

## 1. 作業名

町屋斎場ページ公開後の Search Console URL 検査・インデックス登録リクエスト

## 2. 実施日

2026-05-25

## 3. 対象 URL

- https://kawaguchitenrei.com/saijo/machiya-saijo/（新規ページ）
- https://kawaguchitenrei.com/saijo/（publicSaijo に町屋斎場カード追加）
- https://kawaguchitenrei.com/saijo/toda-sousaijyo/（relatedLinks に町屋斎場追加）
- https://kawaguchitenrei.com/saijo/yatsuka-saijo/（relatedLinks に町屋斎場追加）

## 4. 実施結果

| URL | URL 検査 | 公開 URL テスト | インデックス登録リクエスト | 結果 | 備考 |
|---|---|---|---|---|---|
| https://kawaguchitenrei.com/saijo/machiya-saijo/ | ✅ 実施 | ✅ 実施 | ✅ 送信済み | 問題なし | 新規ページ。最優先で実施 |
| https://kawaguchitenrei.com/saijo/ | ✅ 実施 | ✅ 実施 | ✅ 送信済み | 問題なし | publicSaijo に 4 件目（町屋斎場）追加 |
| https://kawaguchitenrei.com/saijo/toda-sousaijyo/ | ✅ 実施 | ✅ 実施 | ✅ 送信済み | 問題なし | relatedLinks に町屋斎場を追加 |
| https://kawaguchitenrei.com/saijo/yatsuka-saijo/ | ✅ 実施 | ✅ 実施 | ✅ 送信済み | 問題なし | relatedLinks に町屋斎場を追加 |

ユーザー報告: **「問題なく終わりました」**（エラーなし、ユーザー報告では問題なし）

## 5. 関連する直近施策

| 施策 | コミット |
|---|---|
| 町屋斎場ページ用画像 2 枚を `public/images/saijo/machiya-saijo/` に配置（人間側で個人情報保護のため加工済み） | `2080375` Add Machiya Saijo ceremony images |
| `/saijo/machiya-saijo/` 新規作成（既存戸田・谷塚と同じ火葬場併設型構成、料金表 4 表掲載、FAQ 8 問、Place / BreadcrumbList / FAQPage JSON-LD） | `5ed9008` Add Machiya Saijo detail page |
| `/saijo/` 一覧に町屋斎場カード追加（publicSaijo 4 件目） | 同上 |
| `/saijo/toda-sousaijyo/` の Related Links に町屋斎場リンク追加 | 同上 |
| `/saijo/yatsuka-saijo/` の Related Links に町屋斎場リンク追加 | 同上 |
| `app/sitemap.ts` に `/saijo/machiya-saijo/`（priority 0.7）を追加 | 同上 |
| 本番 URL HTTP 200 確認済み | デプロイ後検証 |
| title / metaDescription / canonical / JSON-LD（Place / BreadcrumbList / FAQPage）反映確認済み | デプロイ後検証 |
| Review / aggregateRating / ratingValue 未追加（grep 0 件確認済み） | 同上 |

## 6. 注意事項

- **インデックス登録リクエスト = Google に検査・登録を依頼した状態**であり、「インデックス登録完了」を保証するものではない（実際の反映は Google 側の処理待ち、数時間〜数日かかる場合あり）
- 同一 URL への短期間の繰り返しリクエストは Google のガイドライン違反のリスクがあるため**行わない**
- **noindex / robots.txt / canonical / sitemap.xml の削除系・除外系変更は行っていない**
- **Search Console の URL 削除リクエストは行っていない**
- **料金・式場利用可否・空き状況・宗派条件の変更は行っていない**（公開済みの料金は東京博善公式料金に基づく目安として既にページに掲載され、注意書きも併記済み）

## 7. 今後の観測キーワード

### 主軸（必ず観測）

- 町屋斎場 葬儀
- 町屋斎場 家族葬
- 町屋斎場 料金
- 町屋斎場 火葬
- 川口市 町屋斎場

### 副軸（自然に観測。主軸がぼやけないよう注意）

- 荒川区 葬儀
- 足立区 家族葬
- 北区 葬儀

## 8. 次回確認目安

| 期間 | 観測内容 |
|---|---|
| **2〜3 日後（〜2026-05-28）** | `/saijo/machiya-saijo/` の「ページのインデックス登録」ステータス確認（「インデックス登録済み」になっているか） |
| **1 週間後（2026-06-01 頃）** | Search Console「リンク」レポートで `/saijo/` 一覧および関連斎場ページ（戸田・谷塚）からの内部リンク反映確認 |
| **2〜4 週間後（2026-06-08 〜 2026-06-22 頃）** | 表示回数・平均掲載順位・クリック数の変化を観測。主軸キーワード（町屋斎場 葬儀 / 家族葬 / 料金 / 火葬 / 川口市 町屋斎場）について Before/After 比較 |
| **6〜8 週間後（2026-07-06 〜 2026-07-20 頃）** | CTR・問い合わせ導線への影響確認。新 metaDescription「東京博善が運営する荒川区の火葬場併設斎場でのお見送り」の魅力度を CTR で評価 |

確認結果は、必要に応じて `docs/operations/search-console/` 配下に新規ログとして記録する。

## 9. 関連ドキュメント

- 画像配置記録: `docs/eval/records/2026-05-machiya-saijo-image-placement.md`
- 町屋斎場ページ実装記録: `docs/eval/records/2026-05-machiya-saijo-page-implementation.md`
- /saijo/ 強化後の URL 検査ログ: `docs/operations/search-console/2026-05-saijo-url-inspection-log.md`
- /saijo/ 強化 + エリア内部リンク観測チェックリスト: `docs/operations/search-console/2026-05-saijo-area-link-observation-checklist.md`
- Search Console 作業ログ運用ルール: `skills/search-console-log/SKILL.md`
- 出典（参考、本作業時には変更なし）:
  - https://www.tokyohakuzen.co.jp/funeral-hall/machiya/
  - https://www.tokyohakuzen.co.jp/guide/ryokin/
