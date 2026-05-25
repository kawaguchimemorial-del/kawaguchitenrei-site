# 町屋斎場 施行写真候補 画像配置記録

## 作業目的

町屋斎場ページ（将来実装予定）で使用する候補画像 2 枚を、`public/images/tmp/` の作業用フォルダから正式配置先 `public/images/saijo/machiya-saijo/` に移動・リネームし、サイト内で扱える状態に整理する。

本作業はあくまで **画像配置のみ**。町屋斎場ページ本体（`app/saijo/machiya-saijo/page.tsx` 等）は未実装。

## 町屋斎場ページ用の候補画像であること

- 本画像は、将来追加予定の **町屋斎場ページ用の候補素材**として配置する
- 町屋斎場ページの実装可否、構成、画像の利用位置・利用枚数・キャプション・alt の最終決定は **ページ実装時に改めて確認**する
- 本作業の時点では、画像はリポジトリ内に配置されるのみで、サイト上での露出はない（どのページからも参照されていない）

## 移動元ファイル

| # | 移動元 |
|---|---|
| 1 | `public/images/tmp/ChatGPT Image 2026年5月25日 13_17_59 (1).png`（2,259,857 bytes） |
| 2 | `public/images/tmp/ChatGPT Image 2026年5月25日 13_17_59 (2).png`（2,361,519 bytes） |

## 移動先ファイル

| # | 移動先 |
|---|---|
| 1 | `public/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-01.png`（近景・祭壇） |
| 2 | `public/images/saijo/machiya-saijo/machiya-saijo-funeral-ceremony-02.png`（遠景・式場全体） |

ファイルサイズはバイト単位で同一（mv による単純移動、内容変更なし）。

## 画像加工状況と人間確認

- 本画像 2 枚は、**人間側で個人情報保護のために加工済み**
- **遺影・供花札・個人名・戒名・顔などが判読できない状態**であることを **人間側で確認済み**
- 本記録時点で Claude Code 側からは、Privacy Review として「加工済みであり判読困難」の人間判定を信頼ベースで採用
- ファイル名「ChatGPT Image」が示す通り、画像は AI 生成 or AI 加工を経たものである可能性が高い

## サイト上での表現方針（保留）

サイトに掲載する場合の表現（alt / キャプション / 周辺本文）について、以下のいずれを選ぶかは **町屋斎場ページ実装時に改めて確認する**:

- 案 a: 「実際の施行写真」として掲載
- 案 b: 「町屋斎場での施行写真をもとにした加工済み画像（イメージ）」として掲載
- 案 c: 「イメージ画像」として掲載
- 案 d: 掲載しない（テキストのみのページとする）

現時点では案 a〜d のどれにも決定していない。**ページ実装時に再度判断**する。

## 町屋斎場ページの実装状況

- ❌ **未実装**（`app/saijo/machiya-saijo/page.tsx` は存在しない）
- 本作業は画像の物理配置のみで、ページ実装は別タスク

## 安全確認

| 項目 | 結果 |
|---|---|
| `public/images/tmp/tmp.txt` 接触 | ✅ **未接触**（読まず・編集せず・削除せず・git add せず） |
| 対象 2 画像以外の `public/images/tmp/` 配下ファイル | ✅ 未接触 |
| `app/**` 変更 | ✅ なし |
| `components/**` 変更 | ✅ なし |
| `lib/**` 変更 | ✅ なし |
| `.env*` / secrets / credentials / API キー | ✅ 未接触 |
| `app/api/**` / `app/contact/**` / `app/estimate/**` | ✅ 未接触 |
| Webhook / `FORM_WEBHOOK_SECRET` | ✅ 未接触 |
| 問い合わせフォーム | ✅ 未接触 |
| `package.json` / lockfile / `next.config.ts` | ✅ 未変更 |
| `components/layout/Header.tsx` / `Footer.tsx` / `MobileBottomCTA.tsx` | ✅ 未変更 |
| `funeral-system/` | ✅ 未接触 |
| sitemap / robots / canonical / noindex | ✅ 未変更 |
| 価格データ | ✅ 未変更 |
| Review / aggregateRating / ratingValue | ✅ 未追加 |
| 個人名・故人名・喪主名の本文記載 | ✅ なし（本作業はファイル配置のみ） |

## build 省略理由

画像配置と docs 作成のみで、TypeScript コンパイル対象（`app/**` / `lib/**` / `components/**`）・静的生成対象に変更なし。`public/images/saijo/machiya-saijo/*.png` はどのページからも import / 参照されていないため、ビルド成果物（131/131 static pages）は変化しない。直近の build 成功状態（commit `e8cdc70` 時点）が維持される。

## 今後の次作業

| # | 次作業 | 備考 |
|---|---|---|
| 1 | **町屋斎場ページ追加の現状分析** | `/saijo/` の既存パターン（`/saijo/megurinomori/`・`/saijo/toda-sousaijyo/`・`/saijo/yatsuka-saijo/`）と整合する設計を検討。`skills/seo-page-improvement/SKILL.md` の Step 1 を実施 |
| 2 | **東京博善公式情報の確認** | 町屋斎場は東京博善が運営する火葬場併設斎場。最新の式場使用料・利用条件・宗派条件・控室・付帯設備・空き状況は公式情報を一次ソースとして確認する。**推測しない** |
| 3 | **料金表記の扱い確認** | 「目安」表記とするか、「川口典礼で確認のうえご案内」表記とするか、CLAUDE.md §14（価格表記ルール）に照らして判断 |
| 4 | **画像をページ内で使う位置の最終判断** | サイト上での表現方針（実際の施行写真 / 加工済みイメージ / 掲載しない）を §「サイト上での表現方針」の案 a〜d から選定。alt 文言も含めて決定 |

## 関連コミット履歴

- `1a5e03e` Add saijo area link observation checklist
- `e8cdc70` Add area links to saijo venue anchors
- `f593bff` Add AI workflow rules and skills foundation
- `75ee21a` Document Search Console inspection for saijo page
- `fd36299` Document temple hall section expansion
- `d71a507` Expand temple hall section by area with 16 venues

## 関連ドキュメント

- 画像取り扱いルール: `CLAUDE.md` §13
- Privacy Review 方針: `CLAUDE.md` §12・`docs/04-privacy-review.md`
- Privacy Review Skill: `skills/privacy-review-jp/SKILL.md`
- 既存斎場ページのパターン参考: `app/saijo/megurinomori/`・`app/saijo/toda-sousaijyo/`・`app/saijo/yatsuka-saijo/`
