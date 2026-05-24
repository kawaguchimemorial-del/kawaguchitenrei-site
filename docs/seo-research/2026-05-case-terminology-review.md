# 「施工事例 / 施行事例」表記ゆれ現状分析

## 分析目的

サイト内で **「施工事例」** と **「施行事例」** が混在している可能性を確認し、後日まとめて統一するか判断するための現状分析。

本タスクは **分析のみ**。コード・本文・リンクラベルの表記変更は一切行わない。

## 現在の表記ゆれ状況

### サイト全体での出現分布

| 表記 | 出現ファイル数 | 出現箇所数（概算） |
|---|---|---|
| **「施工事例」** | 6 ファイル | 約 16 箇所 |
| **「施行事例」** | 8 ファイル | 多数 |

### 「施工事例」を使っているファイル

| ファイル | 件数 | 用途 |
|---|---|---|
| `lib/plans.ts` | 10 | プラン 6 件の `relatedLinks` ラベル + description |
| `components/plan/PlanDetailBody.tsx` | 2 | kawaguchi-shimin 用 `citizenFuneralRelatedLinks` |
| `app/area/kawaguchi/page.tsx` | 1 | Related の label / description |
| `app/area/araijuku/page.tsx` | 1 | 同上 |
| `app/area/hatogaya/page.tsx` | 1 | 同上 |
| `CLAUDE.md` | 1 | プロジェクト方針記述 |

→ すべて **今回（2026-05-24〜2026-05-25）の `/case/` への内部リンク強化作業で追加された Related ラベル**で発生している表記ゆれ。

### 「施行事例」を使っているファイル

| ファイル | 用途 |
|---|---|
| `app/case/page.tsx` | 施行事例一覧ページのメイン（2026-05-25 強化済み、title・H1・本文すべて） |
| `app/case/[slug]/page.tsx` | 個別事例ページ |
| `components/layout/Header.tsx` | グローバルナビゲーション |
| `components/layout/Footer.tsx` | フッターナビゲーション |
| `app/sitemap/page.tsx` | サイトマップページ |
| `components/case/CaseDetailBody.tsx` | 個別事例本文コンポーネント |
| `components/home/CasesSection.tsx` | トップページの事例セクション |
| `components/case/CaseDetailIntro.tsx` | 個別事例 FV コンポーネント |

→ **サイトの基本ナビゲーション・正式ページタイトル・個別事例ページ・ホームセクションはすべて「施行事例」で統一**されている。

## 主な出現箇所

### 「施行事例」（正式表記、推奨）

- Header / Footer のナビゲーション
- `app/case/page.tsx`（一覧ページ）の `<title>`、`PageHero` 見出し、結論ボックス、FAQ 見出し、Related 見出し
- 個別事例ページ `/case/[slug]/` の `<title>`、breadcrumb、本文
- ホーム `CasesSection` の見出し
- サイトマップページのリンクラベル

### 「施工事例」（混在、要修正候補）

- 各プラン詳細ページの Related カードの `label` と `description`
- 主要 3 エリアページ（kawaguchi / araijuku / hatogaya）の Related カード
- 川口市民葬の専用 Related（PlanDetailBody.tsx 内）
- 無宗教葬の `nonReligiousInfo.relatedLinks`
- CLAUDE.md（プロジェクト方針内のメンション）

## SEO 上の影響

| 観点 | 現状の影響 |
|---|---|
| 検索クエリのカバレッジ | 「施工事例」「施行事例」両方の表記でサイト内検索ヒットあり → 検索流入の取りこぼしは少ない可能性 |
| メイン LP（`/case/`）の表記 | `<title>` / `<h1>` / `description` すべて「施行事例」で統一 → SEO 上の主要シグナルはぶれていない |
| Related ラベルの一貫性 | 各プラン・各エリアからの誘導カードは「施工事例」になっており、`/case/` ページ着地後にラベルとページ見出しが不一致になる ← UX 上の小さな違和感 |
| AIO（AI 検索引用）の整合性 | 同義語として扱われるため致命傷ではないが、サイト内表記統一は引用の精度を高める |

## ユーザー理解への影響

- 葬儀文脈では「**施行事例**」が業界標準の表記。「施行」= 葬儀を執り行うこと
- 「施工事例」は建築・工事業界の標準表記で、葬儀社サイトで使うと **若干の違和感** がある
- ただし、検索ユーザーは両方の表記で検索する可能性があり、内容の理解には致命的影響なし
- 一覧ページ着地時の不一致（Related カード「施工事例」→ 到達先「施行事例一覧」）はあるが、文脈で理解可能

## 推奨表記

**「施行事例」に統一**

理由:
1. 葬儀業界の標準表記
2. すでにサイトの主要シグナル（Header / Footer / `/case/` ページ本体 / 個別事例ページ / トップセクション）が「施行事例」で統一
3. 「施工事例」は今回の `/case/` 一覧への内部リンク強化作業で **新規に発生した表記ゆれ** であり、既存資産の表記揺らぎではない
4. CLAUDE.md でも「施行事例」が複数箇所で使われている（基本表記としての一貫性）

## 今回はコード変更しない理由

- 本タスクは **分析のみ**（ユーザー指示）
- 既存ページの表記統一は **別タスクで判断** する方針（ユーザー指示）
- 短時間 push の連続で表記揺らぎを誘発したのは、本来「`/case/` 一覧への内部リンク強化」が SEO/AIO 上の優先課題だったため。表記統一は次の優先順位として整理しておく

## 次に実装する場合の対象ファイル候補（参考）

| ファイル | 変更内容 | 件数 |
|---|---|---|
| `lib/plans.ts` | 6 プランの `relatedLinks` 内「施工事例」→「施行事例」 | 10 箇所 |
| `components/plan/PlanDetailBody.tsx` | `citizenFuneralRelatedLinks` の「施工事例」→「施行事例」 | 2 箇所 |
| `app/area/kawaguchi/page.tsx` | Related の `label` / `description` | 1 箇所 |
| `app/area/araijuku/page.tsx` | 同上 | 1 箇所 |
| `app/area/hatogaya/page.tsx` | 同上 | 1 箇所 |
| `CLAUDE.md` | プロジェクト方針内メンション | 1 箇所 |

**合計**: 5 ファイル + CLAUDE.md / 約 16 箇所

実装は単純な文字列置換 1 回（`grep -rE` + `sed` 相当）で完結する想定だが、CLAUDE.md は方針記述のため別判断推奨。

## push 前確認が必要かどうか

**必要**

- CLAUDE.md はプロジェクト方針記述に該当するため、書き換えはユーザー確認推奨
- `lib/plans.ts` / `components/plan/PlanDetailBody.tsx` / `app/area/**` は ラベル文字列の修正のみで影響は限定的だが、複数ファイル横断の置換になるため push 前に確認

## 推奨方針

1. **今回はコード変更しない**（分析記録のみ残す）
2. 別タスクで以下を実施:
   - **第 1 段階**: `lib/plans.ts` / `components/plan/PlanDetailBody.tsx` / `app/area/{kawaguchi,araijuku,hatogaya}/page.tsx` の 5 ファイル / 15 箇所を「施行事例」に統一
   - **第 2 段階**: `CLAUDE.md` の表記方針セクションの追加（「葬儀文脈では『施行事例』で統一」を明文化）
3. 統一作業中の安全確認:
   - 既存価格・既存データ・既存画像は触らない
   - 検索流入の取りこぼし防止のため、metaDescription レベルでは両表記の共起を意識（ただし `<title>` は「施行事例」一本で OK、すでに `/case/` の title は「施行事例」で統一済み）
   - push 前確認必須

## 関連ドキュメント

- 直前の作業: `docs/eval/records/2026-05-case-index-seo-aio-improvement.md`
- 内部リンク強化記録: `docs/eval/records/2026-05-case-index-internal-link-improvement.md`
- CLAUDE.md（プロジェクト方針、本タスクの対象外）
