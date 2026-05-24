# 斎場ページCTA・Related導線改善 完了記録

## 概要
- 実施日: 2026-05-24
- 対象コミット: b5ac6b6 Improve saijo page CTAs and related links
- 対象ページ:
  - /saijo/megurinomori/
  - /saijo/toda-sousaijyo/
  - /saijo/yatsuka-saijo/

## 目的
- 斎場ページから問い合わせにつながる導線を強化
- スマホでもページ内CTAが見えるようにする
- ページ中間で相談導線を出す
- 斎場ページからホール・エリア・プランページへの内部リンクを強化
- めぐりの森利用者に「式はどこで行えるか」を明確に伝える

## 変更内容
- `SaijoCta` のモバイル表示有効化（`hidden md:grid` → `grid`、PCの横並びレイアウトは維持）
- `SaijoMidCta` の追加（components/saijo/SaijoDetailExtras.tsx に新規エクスポート）
- 3斎場ページへの Related セクション追加（page.tsx 内の `relatedLinks` 定数 + JSX）
- /saijo/megurinomori/ への川口メモリアルホール導線セクション追加（`SaijoImportantNotice` の直後）
- BreadcrumbList 名称の軽微統一（megurinomori「斎場・火葬場」→「斎場・ホール」で toda/yatsuka と統一）

## 本番確認結果

### URL HTTP / リダイレクト / canonical

| URL | HTTP（末尾あり） | リダイレクト（末尾なし） | canonical |
|---|---|---|---|
| /saijo/megurinomori/ | ✅ 200 | ✅ 308 → /saijo/megurinomori/ | ✅ 一致 |
| /saijo/toda-sousaijyo/ | ✅ 200 | ✅ 308 → /saijo/toda-sousaijyo/ | ✅ 一致 |
| /saijo/yatsuka-saijo/ | ✅ 200 | ✅ 308 → /saijo/yatsuka-saijo/ | ✅ 一致 |

### CTA 確認

- ✅ `SaijoMidCta` の見出し「{shortName}でのご葬儀・火葬をご検討の方へ。」が3ページとも表示される
- ✅ 中間CTAに電話導線（`tel:0120-963-765`）と事前相談導線（`/contact/`）が含まれる
- ✅ 末尾 `SaijoCta` のクラスから `hidden gap-3 md:grid` が消えており（出現数 0）、モバイルでもCTAが表示される
- ✅ `MobileBottomCTA` は変更されていない（共通レイアウト未変更）
- 各ページの `tel:0120-963-765` 出現数: 14 / `/contact/` 出現数: 4（Header / MidCta / Access / 末尾CTA / MobileBottomCTA の組み合わせとして妥当）

### /saijo/megurinomori/ のホール導線

- ✅ 「通夜・告別式・家族でのお別れは、川口メモリアルホールなどで。」のセクションが表示される
- ✅ /hall/kawaguchi-memorial-hall/ への CTA リンクが含まれる
- ✅ 「川口市めぐりの森は火葬を行う施設のため、通夜・告別式を行う式場は併設されていません」の趣旨が維持されている
- ✅ 「川口典礼が運営する川口市めぐりの森」等の運営誤認表現は HTML 内に存在しない（grep 0件）

## Relatedリンク一覧

### /saijo/megurinomori/（9件）
- /hall/kawaguchi-memorial-hall/
- /area/araijuku/
- /area/kamine/
- /area/angyo/
- /area/kawaguchi/
- /plan/family-funeral/
- /plan/oneday-funeral/
- /plan/direct-funeral/
- /plan/kawaguchi-shimin/

### /saijo/toda-sousaijyo/（6件）
- /hall/kawaguchi-memorial-hall/
- /area/kawaguchi/
- /area/nishikawaguchi/
- /plan/family-funeral/
- /plan/oneday-funeral/
- /plan/direct-funeral/

### /saijo/yatsuka-saijo/（7件）
- /hall/kawaguchi-memorial-hall/
- /area/kawaguchi/
- /area/tozuka-angyo/
- /area/higashikawaguchi/
- /plan/family-funeral/
- /plan/oneday-funeral/
- /plan/direct-funeral/

すべてのリンク先は本番で 200 OK 既存ページ。

## 安全確認結果

| 項目 | 結果 |
|---|---|
| 「最安」「必ず」「絶対」「追加費用なし」「総額確定」 | ❌ 3ページとも 0 件 |
| 新規料金追加 | ❌ なし（Related の家族葬・一日葬・直葬プランの説明文は既存値のみ流用） |
| 料金表記の変更 | ❌ なし（lib/saijo.ts の feeTables / cremationFees は未編集） |
| 未確認の距離・所要時間の新規追加 | ❌ なし（既存「車で約5分」は事実確認済み既存表現、新規追加分なし） |
| 個人名・故人名・喪主名・顧客特定情報 | ❌ なし |
| 川口典礼が他施設を運営しているような誤認表現 | ❌ なし。megurinomori は「火葬場」前提を維持、toda/yatsuka は既存 `importantNotice`（運営は別法人）を維持 |
| 競合比較・誹謗中傷 | ❌ なし |

## 触っていないファイル

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/MobileBottomCTA.tsx`
- `package.json` / `next.config.ts` / `funeral-system/`
- `.env*`（読まず・表示せず・編集せず）
- 問い合わせフォーム / Webhook / GAS / `app/api/**`
- `lib/saijo.ts`（FAQ・料金の事実確認は次フェーズ）
- `public/images/saijo/toda-sousaijyo/**/*.txt`（次フェーズで棚卸し）

## 関連コミット履歴

- b5ac6b6 Improve saijo page CTAs and related links（今回の本実装）
- 直前: 12315c8 Update Search Console log for partial P1 Batch 2 submission
- 直前: c939945 Document P1 Batch 2 area page completion

## 次アクション

- **斎場 FAQ 追加**: 料金・利用条件・予約条件・公営/民営区分の事実確認後に検討
  - めぐりの森の予約手順・市民/市外区分の補足
  - 戸田葬祭場の区民葬適用条件
  - 谷塚斎場の区民葬・草加市民葬適用条件
- **`public/images/saijo/toda-sousaijyo/**/*.txt`** の公開状態の棚卸し（中身確認 → 削除 or `docs/` 配下へ移動の判断）
- **`/saijo/` 一覧ページ**の導線強化（カード説明・絞り込みハブとしての役割）
- **Search Console / GA** での斎場ページのクリック率・問い合わせ転換確認
- **`docs/area/` および本記録の `eval-metrics.md`** の指標（CTA 表示有無・関連リンク到達率）への反映可否検討

## 関連ドキュメント
- 直前の Search Console 作業ログ: docs/operations/search-console/2026-05-24-p1-batch2-area-pages.md
- AI ワークフロー: docs/ai-workflows/skill-backlog.md（structured-data-check / production-verification）
- 評価指標: docs/ai-workflows/eval-metrics.md
- ガードレール: docs/ai-workflows/guardrails-and-approval.md（自動 push 範囲のポリシーに準拠）
