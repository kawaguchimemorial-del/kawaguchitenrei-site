# 川口典礼 重要検索キーワード・競合分析

## 1. 概要

- **実施日**: 2026-05-24
- **対象サイト**: kawaguchitenrei.com
- **分析対象キーワード**: 川口典礼の主要 SEO/AIO ターゲットとなる「川口 ◯◯」「川口市 ◯◯」系 12 種
- **分析目的**:
  - 検索ワードごとの競合傾向を整理
  - 川口典礼サイトで不足している SEO / AIO 対策を明確化
  - 今後作る・改善するページのロードマップに反映
  - 競合の真似ではなく、川口典礼の強みを活かした改善方針へ落とし込む
- **参照した情報**:
  - ユーザー貼り付けの検索結果一覧
  - `public/images/tmp/tmp.txt`（ユーザーが用意した検索結果ファイル。文字化けあり）
  - 必要に応じて確認した競合 URL（HTTP 取得できなかったものは「未確認」扱い）
- **現在の前提**:
  - P0 SEO/AIO 改善済み
  - P1 Batch 1 / Batch 1.5 / Batch 2 エリアページ追加済み（合計 14 エリア）
  - 斎場ページ CTA・Related 導線改善済み（コミット `b5ac6b6` / 完了記録 `c8b6e67`）
  - Search Console 送信は Batch 2 の 3 URL（神根 / 新郷 / 芝）まで完了。残り 3 URL は割り当て制限により後日

---

## 2. 検索キーワード一覧

| # | キーワード | 弊社現在ランクの目安 |
|---|---|---|
| 1 | 川口 市民葬 | 圏内（要確認） |
| 2 | 川口市 市民葬 | 圏内（要確認） |
| 3 | 川口 家族葬 | 圏外〜下位 |
| 4 | 川口市 家族葬 | 圏外〜下位 |
| 5 | 川口 一日葬 | 圏外〜下位 |
| 6 | 川口市 一日葬 | 圏外〜下位 |
| 7 | 川口 火葬 | 中位想定 |
| 8 | 川口市 火葬 | 中位想定 |
| 9 | 川口 直葬 | 圏外〜下位 |
| 10 | 川口市 直葬 | 圏外〜下位 |
| 11 | 川口 無宗教葬 | **圏外** |
| 12 | 川口市 無宗教葬 | **圏外（ランクなし）** |

実際の順位は Search Console / Chrome シークレットでの目視ベース。今後 Search Console の「検索パフォーマンス」で対象クエリの平均掲載順位を継続観測する。

---

## 3. /images/tmp の検索結果ファイル分析

### 確認したファイル

- `public/images/tmp/tmp.txt`（1 ファイルのみ）

### 文字化けの有無と扱い

- セクション見出しが **文字化け**（Shift_JIS / CP932 で書かれた日本語が UTF-8 として表示されている状態）
- 例: 「川口 市民葬」が「��� �s����」のように出る
- **見出し復元は試みず、URL の流れとユーザー指定キーワードリスト（§2）を正として分類**
- 文字化けの傾向から、tmp.txt は 11〜12 セクション構成と推定。これは §2 の 12 キーワードとほぼ対応

### URL 統計

- **総 URL 数**: 207（重複含む）
- **ユニーク URL 数**: 114
- **ユニーク ドメイン数**: 54

### キーワード別の分類

URL の流れと、ドメイン・パスのキーワード（shimin / kazokusou / ichinichi / kasou / chokusou / direct / no-religion / musyukyo など）から分類:

| キーワード群 | 推定 URL 数 | 主な競合ドメイン |
|---|---|---|
| 市民葬系（川口 / 川口市 市民葬） | 約 20 | city.kawaguchi.lg.jp / kawaguchi-shiminsousai.com / zenkoku-shiminsousai.com / saitama.sagamitenrei.com / sougi.bestnet.ne.jp / kawaguchi-sougi.com |
| 家族葬系（川口 / 川口市 家族葬） | 約 35 | hanazen-ceremony.co.jp / osohshiki.jp / e-sogi.com / yoriso.com / musubisu-osoushiki.jp / famille-kazokusou.com / kawaguchi-sougi.com / tear.co.jp / comwellceremony.co.jp |
| 一日葬系（川口 / 川口市 一日葬） | 約 30 | osohshiki.jp / ososhiki.kinpoudou.co.jp / ytenrei.com / sogi-tomoshibi.com / fukushisousai.co.jp / ayumisousai.com / kawaguchishi-megurinomori.info / megurinomori.com |
| 火葬系（川口 / 川口市 火葬） | 約 50 | city.kawaguchi.lg.jp / kawaguchishi-megurinomori.jp / megurinomori.com / kawaguchishi-megurinomori.info / ansinsougi.jp / yoriso.com / hanazen-ceremony.co.jp / saitama.sagamitenrei.com / wikipedia.org |
| 直葬系（川口 / 川口市 直葬） | 約 30 | tera-tyokuso.com / saitama.sagamitenrei.com / ososhiki.kinpoudou.co.jp / ytenrei.com / kawaguchishi-megurinomori.info / soogi.jp / c-fukushi.co.jp |
| 無宗教葬系（川口 / 川口市 無宗教葬） | 約 15 | ososhiki.kinpoudou.co.jp（no-religion）/ seremo-ikeda.jp / ceremore.co.jp / musubisu-osoushiki.jp / hibiya-lsp.com / yawaragisaijyo.com / ending.life / ansinsougi.jp |
| 分類不能・参照系 | 数件 | wikipedia.org（めぐりの森ページ）/ youtube.com / komei.or.jp |

### 競合ドメインの出現傾向（Top 10）

| ドメイン | 出現数 | カテゴリ |
|---|---|---|
| `soogi.jp` | 12 | 全国ポータル |
| `ososhiki.kinpoudou.co.jp` | 11 | 全国ポータル（金宝堂） |
| `kawaguchishi-megurinomori.info` | 9 | めぐりの森 LP（葬儀社運営） |
| `sogi-tomoshibi.com` | 9 | 地域系（ともしび） |
| `city.kawaguchi.lg.jp` | 8 | **川口市公式** |
| `saitama.sagamitenrei.com` | 8 | サガミ典礼 LP |
| `manaka-net.com` | 8 | 全国系（はじまりの森） |
| `kawaguchi-sougi.com` | 8 | 地域葬儀社 |
| `tear.co.jp` | 7 | ティア（大手） |
| `www.osohshiki.jp` | 7 | お葬式.jp（ポータル） |

### 元ファイルの扱い

- `public/images/tmp/tmp.txt` は今回 **削除・移動・リネームしない**
- 個人情報は含まれていない（URL リストのみ）
- ただし `public/` 配下にあるため公開リスクあり（現時点では本番 404 を確認済み = git tracked 外）
- **別タスクで扱う**: `.gitignore` 対象化 / `docs/research/` への移動 / 削除のいずれかを判断

---

## 4. 上位表示されている主な競合タイプ

| タイプ | 例 | 特徴 |
|---|---|---|
| **市公式** | city.kawaguchi.lg.jp | 市民葬・火葬場（めぐりの森）の正本情報。検索結果で必ず上位 |
| **大手葬儀ポータル** | yoriso / osohshiki / e-sogi / ansinsougi / soogi / musubisu / eitaikuyo | 全国カバー・SEO 専業・口コミ多数・斎場 DB |
| **地域葬儀社（自社運営式場あり）** | kawaguchi-sougi / kawaguchi-shiminsousai / hanazen-ceremony / umeda-sougisha / sougi.bestnet.ne.jp（梅田葬儀社）/ ytenrei / fukushisousai / nansaikaikan / c-fukushi | 地名 + 葬儀社名のドメイン。創業年数・式場・対応エリアを訴求 |
| **斎場情報サイト** | kawaguchishi-megurinomori.info / megurinomori.com / saijo-sogi.jp / kawaguchishi-megurinomori.jp | 特定斎場の利用案内・料金・予約導線特化 |
| **市民葬特化 LP** | kawaguchi-shiminsousai.com / zenkoku-shiminsousai.com / todashiminsousai.com | 「川口市民葬」「区民葬」キーワード集中 |
| **プラン特化 LP** | tera-tyokuso.com（直葬）/ ososhiki.kinpoudou.co.jp の `/plan/ichinichi/` / `/plan/chokusoh/` 系 | プラン名 + 地名でロングテール |
| **火葬場・斎場特化ページ** | wikipedia.org（めぐりの森）/ kawaguchishi-megurinomori.* | 情報網羅性・公式感 |
| **無宗教葬・寺院会館系** | seremo-ikeda / ceremore / hibiya-lsp / yawaragisaijyo / ending.life の musyukyo 系 | 「無宗教葬」「自由葬」「お別れの会」を専門ページ化 |

---

## 5. 競合が強い理由（観点別）

### 専用 LP がある

- 多くの上位ページは「川口市 ◯◯」専用 LP を持つ。`/plan/family-funeral/` のような汎用ページではなく `/area/saitama/kawaguchi-city/` のような地名×プラン交差ページが定着している
- 川口典礼は `/area/` と `/plan/` を分離しているが、その**交差ページが存在しない**

### キーワードと title / H1 が一致

- 上位ページは title と H1 に「川口市 + プラン名」が直入し、検索クエリと一致度が高い
- 弊社の plan ページ title は「家族葬プラン | 川口典礼」型で、地名が title 先頭にない

### 料金表がある

- 一日葬・直葬・市民葬で「料金一覧」「総額目安」を画像 or テーブルで掲載するパターンが多い
- 弊社は plan ページに価格があるが、地名込みのページではない

### 葬儀の流れがある

- ほぼ全ての上位ページに「電話→お迎え→安置→打ち合わせ→式→火葬→葬儀後」のフロー図がある（弊社にも既存）

### FAQ が多い

- 10 問以上の FAQ + FAQPage 構造化データの実装が一般的
- 弊社は各エリアページ 6 問、斎場ページ 6〜7 問。**プラン×地名ハブには FAQ が無い**

### 口コミ・施工事例

- 大手ポータルは数百件の口コミを保有（弊社は `/voice/` 30 件＋`/case/` 11 件）
- 施工事例・お客様の声から該当プラン・エリアへの逆リンクが弱い

### 対応斎場一覧

- 地域葬儀社の多くが「対応斎場リスト」をプラン LP にも貼っている
- 弊社プランページから斎場一覧への動線が弱い

### CTA が多い

- 電話・LINE・無料相談ボタンを2〜3箇所に配置するパターンが多い（弊社は中間 CTA を斎場ページに追加済みだが、プランページには未実装）

### 地域名・斎場名・プラン名の内部リンクが強い

- ポータル系は「○○市 × ○○プラン × ○○斎場」の3軸でクロスリンクを構築
- 弊社は area↔plan↔hall↔saijo のクロスリンクが部分的

### ポータルの強み

- 斎場数・口コミ・網羅性。個別の地域葬儀社が短期で追いつけない領域

### 地域葬儀社の強み

- 自社式場の存在・駅近・創業年数・地域密着の信頼感
- **これは弊社が最も活かせる強み**（川口メモリアルホール / 駐車場70台 / めぐりの森車5分 / 創業20年）

---

## 6. 川口典礼の現状評価（10点満点）

| 観点 | 評価 | 補足 |
|---|---|---|
| 現在の SEO/AIO 土台 | **8.0** / 10 | metadata / canonical / JSON-LD / sitemap / breadcrumb は整っている |
| 地域エリアページ | **8.5** / 10 | 14 エリア完備。Related 相互リンク整備済み |
| 斎場・めぐりの森導線 | **8.5** / 10 | Related・CTA・ホール導線を 2026-05-24 強化済み |
| 家族葬・一日葬・直葬などプラン系 | **7.0** / 10 | プランページは存在するが「川口市」前置きの SEO ハブが弱い |
| 市民葬 | **7.5** / 10 | `/plan/kawaguchi-shimin/` 既存。公式整合・FAQ・申請動線の強化余地あり |
| 火葬・めぐりの森系 | **8.0** / 10 | `/saijo/megurinomori/` を 5/24 強化済み。「川口 火葬」キーワードでの直接 LP が無い |
| 無宗教葬 | **4.0** / 10 | **専用ページなし**。検索ランキング外。新設が最も効く領域 |

---

## 7. 足りない対策

### キーワード別ハブページ

- 川口市の家族葬ハブ：`/plan/family-funeral/` を改修 or `/area/kawaguchi/family-funeral/` 等のハブを検討
- 川口市の一日葬ハブ：同上
- 川口市の直葬・火葬式ハブ：「川口 直葬」「川口 火葬式」交差ページが無い
- 川口市民葬ページの SEO 再調整：既存 `/plan/kawaguchi-shimin/` の title / H1 / metaDescription を「川口市民葬」直入に
- **無宗教葬ページ新設**：最優先

### 施工事例・お客様の声との内部リンク強化

- `/case/` / `/voice/` の各記事から、関連プラン・関連エリア・関連斎場への逆リンクを追加
- 「家族葬」「直葬」「無宗教葬」事例のタグ付け → プランページから事例一覧へ誘導

### AIO 向けの結論ボックス・回答ブロック

- 「川口市で◯◯を行う場合、まず川口典礼にご相談いただけます」型の結論ブロックを各ハブページ冒頭に
- 流れ / 費用の考え方 / 注意点 を 3 ブロックで明示
- Generative engine 引用に強い「Q: 〜 A: 〜」型の自然文ブロック

### プランページから斎場・エリアへの内部リンク強化

- プランページ末尾に Related セクション追加（家族葬→川口メモリアルホール / めぐりの森 / 各エリア）

### 斎場ページからプラン・エリア・ホールへの内部リンク強化

- **2026-05-24 強化済み**（コミット `b5ac6b6`）。今後は FAQ 追加とインデックス確認

---

## 8. ページ別改善方針

### `/plan/kawaguchi-shimin/`（川口市民葬）

> 既存 URL は `/plan/kawaguchi-shimin/`。**実装着手前に lib/plans.ts の slug と本番 URL を再確認すること。**

- 「**川口市民葬**」を title / H1 / lead で強める（現状未確認）
- 市公式（city.kawaguchi.lg.jp/soshiki/01090/010/sousai/19407.html）の最新情報との整合
- 利用条件を明確化（市民であること / 葬祭事業登録葬儀社経由）
- 仕様 1・仕様 2（祭壇規模など）の違いを表形式に整理
- **含まれるもの / 別途必要なもの**を分離して提示
- 申請手続きサポートの導線を強化（電話・事前相談）
- 川口メモリアルホール・めぐりの森との関係を明記
- FAQ 強化（10 問前後）
- ※公式情報・正本データの確認後に着手

### `/plan/family-funeral/`（家族葬）

- 「**川口市の家族葬**」セクションを新規追加（H2 で「川口市の家族葬の特徴」）
- 川口メモリアルホールでの家族葬の流れ
- 川口市めぐりの森での火葬までの段取り
- 施工事例 / お客様の声への内部リンク（家族葬事例タグ）
- エリアページへの内部リンク（kawaguchi / araijuku / hatogaya / 駅周辺）
- FAQ 強化（家族葬の進行 / 参列人数 / 通夜・告別式 / 費用感）

### `/plan/oneday-funeral/`（一日葬）

- 「**川口市の一日葬**」セクションを新規追加
- 通夜を行わない流れと、向いているケース・注意点
- 川口メモリアルホールでの一日葬の進行
- めぐりの森での火葬までの段取り
- 「一日葬を選ぶ前に知っておきたいこと」（菩提寺との関係・親族説明）
- FAQ 強化

### `/plan/direct-funeral/`（直葬）

- 「**川口市の直葬・火葬式**」セクションを新規追加
- 川口市めぐりの森との接続を強化（搬送 → 安置 → 火葬の最短フロー）
- 「お別れの時間を取れるか」（火葬前のお別れの場面、面会室の使い方）
- 注意点（菩提寺との事前相談 / 親族への説明 / 別途必要費用の考え方）
- FAQ 強化

### `/saijo/megurinomori/`

- **2026-05-24 強化済み**。CTA / Related / ホール導線セクション追加
- 「川口 火葬」「川口市 火葬」「めぐりの森 葬儀」系の検索意図に対応
- 料金・利用条件は **公式情報確認後のみ**更新（今回は触らない）

### 新規: 無宗教葬ページ

候補 URL:
- `/plan/no-religion-funeral/`（または `/plan/non-religious-funeral/`）
- 既存 plans の slug 命名規則（`family-funeral` / `oneday-funeral` / `direct-funeral`）に合わせる
- **着手前に lib/plans.ts と既存 plan slug を確認**

必要内容:
- 川口市で無宗教葬をお考えの方へ
- 無宗教葬とは（宗教者を呼ばないお別れの形）
- 仏式葬儀との違い（読経・戒名・焼香の有無）
- 進行例（献花 / 黙祷 / 思い出のスライド / 音楽演奏 / 弔辞）
- 川口メモリアルホールでできること
- めぐりの森での火葬までの流れ
- 宗教者を呼ばない場合の注意点（菩提寺の有無確認 / 親族説明 / 後日法要の選択肢）
- 親族への説明の仕方
- 費用の考え方（宗教者へのお礼分が不要、その代わり進行演出費が発生する場合）
- FAQ
- CTA
- 関連リンク（家族葬 / 一日葬 / 川口メモリアルホール / 各エリア）

注意:
- 「宗教を否定する」表現を避ける（「宗教者を呼ばないお別れ」程度に留める）
- 「無宗教葬の方が良い / 安い」と断定しない
- 既存の `area*.faqs` に「宗教者を呼ばないお別れも相談できますか？」がすでに含まれている → このページに集約・誘導

---

## 9. FV 訴求改善案

### 現状認識

トップページ FV と主要ページ FV の信頼訴求として、現在「年間約 200 件」を使用している（CLAUDE.md §10.1 では「年間約 260 件」とも記載あり。**実数を社内確認後に確定**）。

### 推奨表現

- **創業20年・累計4,000件以上の葬儀実績**
- より柔らかくする場合: 「創業20年・累計4,000件以上のご相談・ご葬儀に対応」
- 裏付けが弱い場合の代替: 「創業20年・地域で多くのご葬儀をお手伝い」

### 使う条件

- 「4,000件以上」の根拠が**社内で確認できる場合のみ使用**
- 年間約 200 件 × 創業 20 年 = 約 4,000 件という単純計算だけで断定しない
- 厳密な件数記録がない場合は「累計4,000件以上のご相談・ご葬儀に対応」など柔らかい表現に
- 裏付けが弱い場合は「創業20年・地域で多くのご葬儀をお手伝い」に留める

### FV 改善案

| 項目 | 現在 | 改善案 |
|---|---|---|
| 数値訴求 | 年間約 200 件 | 創業 20 年・累計 4,000 件以上（社内確認後） |
| 代替案 | – | 創業 20 年・累計 4,000 件以上の葬儀実績 |
| 弱め表現 | – | 創業 20 年・地域で多くのご葬儀をお手伝い |

### 注意

- 「実績 4,000 件以上」と表示する場合は**社内確認必須**
- 誇大表現にならないよう、`docs/ai-workflows/guardrails-and-approval.md` の価格・実績表現ルール（§4 §5 §10）に従う
- 実装する前にユーザー確認必須

---

## 10. AIO 対策として必要な回答ブロック

今後、各重要ページ（プラン・斎場・無宗教葬・市民葬）の冒頭に以下の型を入れる方針:

### 結論ボックス

> 川口市で◯◯を行う場合、まず川口典礼にご相談いただけます。
> 川口メモリアルホール、川口市めぐりの森、戸田葬祭場、谷塚斎場など、形式に応じてご案内できます。
> 空き状況や利用条件は時期により変わるため、事前にご相談ください。

### 流れ

1. 電話相談
2. お迎え
3. ご安置
4. 打ち合わせ
5. 式・お別れ
6. 火葬
7. 葬儀後サポート

### 費用の考え方

- プラン基本費用
- 火葬料
- 式場使用料
- 料理・返礼品
- 宗教者へのお礼
- 状況により追加になる可能性がある項目

### 注意点

- 空き状況
- 火葬場予約
- 宗教者の有無
- 参列人数
- 安置場所
- 市民葬制度の条件
- 施設の運営主体（公営 / 民営 / 自社）

---

## 11. 次に実装する順番

### 推奨順

1. **市民葬ページのSEO/AIO再調整**（既存 `/plan/kawaguchi-shimin/` をターゲットキーワードに合わせて改修）
2. **直葬・火葬式ページの川口市向け強化**（`/plan/direct-funeral/` に「川口市の直葬・火葬式」セクション追加）
3. **一日葬ページの川口市向け強化**（`/plan/oneday-funeral/`）
4. **家族葬ページの川口市向け強化**（`/plan/family-funeral/`）
5. **無宗教葬ページ新設**（`/plan/no-religion-funeral/` または同等 slug）
6. **施工事例・お客様の声との内部リンク強化**（`/case/` `/voice/` ↔ プラン・エリア・斎場）
7. **Search Console で対象キーワードの表示回数を継続観測**（検索パフォーマンスタブで対象クエリの掲載順位）

### 補足

無宗教葬は「川口市 無宗教葬」で**ランキング外**のため、早期に専用ページを作る価値が高い。順位 0 → 何かしらの順位に上がるだけでも認知獲得が早い。一方、市民葬は既に圏内にいるため、より大きな SEO リフトを得るには小幅改修で済む可能性がある。

実装順は「リフト効果の大きさ × 既存資産との整合」のバランスで決定。今回は **市民葬から着手 → 直葬 → 一日葬 → 家族葬 → 無宗教葬新設** の順を推奨するが、ユーザー判断で順序入れ替え可能。

---

## 12. 注意事項

- 価格は**推測しない**
- 市民葬は**川口市公式情報と整合**させる（city.kawaguchi.lg.jp の最新版を確認）
- 市民葬の条件・価格・仕様は**最新確認が必要**
- 無宗教葬は「**宗教者を呼ばない葬儀**」として慎重に説明
- **宗教を否定する表現は避ける**
- **断定表現を避ける**（「必ず」「絶対」「100%」「最安」「追加費用なし」「総額確定」は禁止）
- **問い合わせ導線を必ず入れる**
- 公式情報・競合情報を参考にしても**コピーしない**
- **競合を誹謗中傷しない**
- **個人情報を出さない**
- 施工事例・口コミを使う場合は**プライバシー確認必須**（`docs/04-privacy-review.md`）
- 実装前に URL・既存構成・正本データを確認する
- 元 tmp.txt ファイルは今回触らない（削除・移動・コミットしない）

---

## 関連ドキュメント

- `docs/00-project-policy.md`
- `docs/01-seo-aio-policy.md`
- `docs/02-competitor-analysis-summary.md`（P0 時点の競合分析。今回はその差分・補強）
- `docs/03-improvement-roadmap.md`
- `docs/04-privacy-review.md`
- `docs/05-content-guidelines.md`
- `docs/eval/seo-aio-checklist.md`
- `docs/ai-workflows/skill-backlog.md`（local-business-seo-research / competitor-fv-analysis）
- `docs/ai-workflows/eval-metrics.md`
- `docs/ai-workflows/guardrails-and-approval.md`
