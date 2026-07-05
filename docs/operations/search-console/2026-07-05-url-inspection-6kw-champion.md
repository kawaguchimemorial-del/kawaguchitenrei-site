# Phase 0 手順書：6クエリの代表URL（champion）確定 — GSC URL検査

作成日: 2026-07-05
目的: 「川口/川口市 葬儀・家族葬・市民葬」について **Google がどのURLを代表（canonical）に選んでいるか** を実測し、受け皿一本化（Phase 2）の前提を確定する。
根拠: `docs/reports/2026-07-05-six-kw-seo-aio-llmo-8expert-roadmap.html` Phase 0。

> これが終わるまで Phase 2（16エリアの家族葬デターゲティング・area/kawaguchi 減量）に着手しない。未確定下の減量は既存表示を削る自己損傷になるため。

---

## A. GSC「検索結果のパフォーマンス」で実着地URLを確認（5分）

1. Search Console → 検索パフォーマンス → 「検索キーワード」タブ。
2. 期間を「過去3か月」に。
3. 各クエリでフィルタ（完全一致）し、「ページ」タブに切替え、表示回数の多い順に**実際に表示されているURL**を記録する。
   - 対象クエリ: `川口 葬儀` / `川口市 葬儀` / `川口 家族葬` / `川口市 家族葬` / `川口 市民葬` / `川口市 市民葬`
4. 下表に「主表示URL」と「2番手URL」を書き込む。

| クエリ | 主表示URL | 表示回数 | 2番手URL | 平均順位 |
|---|---|---|---|---|
| 川口 葬儀 | | | | |
| 川口市 葬儀 | | | | |
| 川口 家族葬 | | | | |
| 川口市 家族葬 | | | | |
| 川口 市民葬 | | | | |
| 川口市 市民葬 | | | | |

## B. URL検査で Google-selected canonical を確認（各1〜2分）

各ファミリーの候補URLを GSC 上部の「URL検査」に入力し、結果の
**「ユーザーが指定した正規URL」** と **「Google が選択した正規URL」** を記録する。

検査する候補URL:
- 家族葬: `https://kawaguchitenrei.com/`（トップ） と `https://kawaguchitenrei.com/plan/family-funeral/`
- 市民葬: `https://kawaguchitenrei.com/plan/kawaguchi-shimin/` と `https://kawaguchitenrei.com/area/kawaguchi/`
- 葬儀: `https://kawaguchitenrei.com/`（トップ）

| 検査URL | ユーザー指定canonical | Google選択canonical | 重複判定の有無 |
|---|---|---|---|
| /（トップ） | | | |
| /plan/family-funeral/ | | | |
| /plan/kawaguchi-shimin/ | | | |
| /area/kawaguchi/ | | | |

「Google が選択した正規URL」が検査URLと**異なる**場合＝そのページは重複/代替扱いで、評価が別URLに寄せられている。

## C. champion 決定ルール（AＢの結果から）

- **家族葬**：Aで主表示がトップ、Bでトップが自己canonical → **champion=トップ**。専用ページは「川口メモリアルホールの家族葬・費用/実例」に差別化して補完。
  - もし専用ページが主表示かつ自己canonical → **champion=専用ページ**。この場合のみ 2026-07-05 のトップtitle「家族葬」を弱める。
- **葬儀**：ほぼ確実にトップ（実測7.4/10.0位）。**champion=トップ**、area/kawaguchi は補助。
- **市民葬**：需要極小。専用 `/plan/kawaguchi-shimin/` を代表にし、area/kawaguchi の市民葬記述は要約＋リンクに縮小（Bで area が選択canonicalでないことを確認してから）。

## D. 結果の連絡

上表を埋めて「家族葬champion＝トップ／専用」を一言で伝えてください。
→ 確定後、こちらで Phase 2（16エリアのカニバリ解消・ハブ&スポーク内部リンク集約）を実装します。

---
※このファイルは社内手順。秘密情報・個人情報は記載しない。
