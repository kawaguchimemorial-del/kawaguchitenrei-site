# kawaguchitenrei.com フルSEO監査レポート

実施日: 2026-07-20 / 対象: https://kawaguchitenrei.com/ / 手法: 全128URLの実クロール＋ソースコード検証

---

## SEO Health Score: **73 / 100**

| カテゴリ | 重み | スコア | 主因 |
|---|---|---|---|
| Technical SEO | 22% | **78** | 基礎は堅牢。セキュリティヘッダー4種欠落、www正規化なし、全リダイレクトが2ホップ |
| Content Quality | 23% | **68** | YMYLに必要な著者/監修者情報ゼロ、口コミ30ページが薄い、コラム流入がCV非直結 |
| On-Page SEO | 20% | **62** | **口コミ30ページでh1欠落**、title規約超95件、description超過18件 |
| Schema | 10% | **70** | 実装は網羅的だが `@id` 不統一で60+ページに重複エンティティ |
| Performance | 10% | **80** | 転送量・TTFBは優秀。トップのDOMノード約3,967が唯一の懸念 |
| AI Search Readiness | 10% | **85** | llms.txt・@graph・結論先出し・FAQPage。**サイトの最大の強み** |
| Images | 5% | **92** | 全1,038枚にalt。next/image・lazy適正 |

**総評**: 技術的な土台と AI 検索対応は同業他社を大きく上回る水準にある。一方で、**単純な実装ミス（h1欠落・title長）が放置されており、これが CTR 0% 問題の直接原因になっている可能性が高い**。伸び代は難しい施策ではなく、既知の基本項目の消化にある。

---

## 検証で確認できた「問題なし」項目

推測ではなく実測で確認済み。ここは触る必要がない。

| 項目 | 実測結果 |
|---|---|
| 全URLのHTTPステータス | 128/128 が **200**。4xx/5xxゼロ |
| canonical | 128ページ全てで自己参照一致。**不一致ゼロ** |
| noindex 誤設定 | robotsメタ出力ゼロ（誤ってnoindexになっているページなし） |
| 画像alt | 1,038枚中 **alt欠落 0枚** |
| robots.txt | 200・Sitemap記載・/admin/ と /post/ を適切にDisallow |
| sitemap.xml | 128URL・lastmod/changefreq/priority 完備 |
| description重複 | **ゼロ** |
| HTTPS化・HSTS | `Strict-Transport-Security: max-age=63072000` 設定済み |
| 圧縮 | Brotli適用。トップ1.4MB → **転送60KB**（圧縮率96%） |
| TTFB | 0.04〜0.08秒（Vercel Edge Cache HIT） |
| 禁止表現 | 「最安」「必ず」「絶対」「追加費用なし」「総額確定」「標準価格」の**公開本文への混入なし** |
| LCP画像 | ヒーロー画像を `<link rel="preload" as="image">` で先読み済み |
| AIクローラー | robots.txt が `*: Allow /`。GPTBot/ClaudeBot/PerplexityBot 等すべて許可状態 |

---

## Critical（即対応）

### C-1. 口コミ30ページ全てで `<h1>` が存在しない

**実測**: `/voice/[slug]/` の30ページすべてで h1数 = 0。他の98ページは全て h1 = 1。

**原因**: `components/voice/VoiceDetailIntro.tsx` L61 が引用文を `<blockquote>` でレンダリングしており、ページ内に h1 が一つもない。
対比して `components/case/CaseDetailIntro.tsx` L33 は `<h1>` を正しく使用しており、**voice だけ実装が漏れている**。

**影響**: 検索エンジンがページの主題を判定できない。サイト全体の23%（30/128）が構造的に不完全な状態。

**修正案**（既存の見た目を変えずに解決）:
```tsx
<blockquote className="...既存クラスはそのまま...">
  <h1 className="font-serif-jp text-[1.8rem] font-medium leading-[1.6] text-ink-deep md:text-[2.4rem] md:leading-[1.55]">
    {voice.title}
  </h1>
</blockquote>
```

---

### C-2. title が規約（全角30字）を超えるページが95件

**実測**: 128ページ中 **95ページが32字超**。最長54字。

| ページ群 | 字数レンジ | 件数 |
|---|---|---|
| コラム | 35〜54字 | 44件全て |
| 口コミ | 33〜42字 | 30件全て |
| エリア | 34〜43字 | 15件中14件 |
| 事例 | 33〜44字 | 11件全て |

**最長の例**:
- 54字 `/column/kenshi-nagare/` — 検視の流れ｜遺体が警察に安置されたら家族がやるべきこと（川口市・めぐりの森利用を想定） | 川口典礼 コラム
- 53字 `/column/Nofuneral/`
- 52字 `/column/jiyusou/` `/column/ichinichi-sou/`

**影響**: Google の SERP 表示幅（PC で全角30〜32字前後）を超え、末尾が省略される。「｜川口典礼 コラム」というブランド部分が常に切れる。

**これが CTR 0% 問題の直接原因である可能性が高い。**

---

### C-3. トップと主要プランページの description が100字超

**実測**: description が規約（60〜80字、最長100字）を超えるページが18件。

| URL | 字数 |
|---|---|
| `/` | **135** |
| `/plan/oneday-funeral/` | 127 |
| `/plan/family-funeral/` | 124 |
| `/saijo/` | 123 |
| `/case/` | 118 |
| `/saijo/yatsuka-saijo/` | 117 |

**影響**: 後半（価格・対応範囲などCV直結情報）が切り捨てられ、Google が本文から別の一文を自動生成して差し替える。訴求のコントロールを失っている。

**改善案**:

トップ（現135字 → 75字）
- title（25字）: `川口市の葬儀・家族葬なら川口典礼｜24時間365日`
- description: `川口市・新井宿の葬儀社、創業20年の川口典礼。家族葬・直葬・一日葬に24時間365日対応。自社式場からめぐりの森まで車で約5分。`

`/plan/family-funeral/`（現124字 → 78字）
- title（23字）: `川口市の家族葬｜川口メモリアルホール｜川口典礼`
- description: `川口市の家族葬なら川口典礼。1日1組貸切の自社式場でお別れ、めぐりの森で火葬。事前相談会員価格528,000円(税込)〜。24時間365日受付。`

---

## High（1週間以内）

### H-1. JSON-LD の `@id` 不統一 — 60ページ以上で同一事業者が重複エンティティ化

正しく `@id: .../#funeralhome` を持つのは**トップページのみ**。他は同じ事業者を `@id` なしで再定義している。

| ページ群 | 状態 | 件数 |
|---|---|---|
| `/`（トップ） | `@id` あり（正本） | 1 ✅ |
| `/area/*` | `@id` なし。しかも `url:` が**そのエリアページのURL** | 16 |
| `/voice/[slug]/` | `Review.itemReviewed` にインライン定義 | 30 |
| `/plan/[slug]/` + `/plan/` | `Service.provider` にインライン定義 | 10 |
| `/hall/kawaguchi-memorial-hall/` | `@id` なし | 1 |

エリアページは `url` がページ自身のURLになっているため、**同一事業者が16の異なるURLを持つ別法人であるかのように解釈されるリスク**がある。ナレッジグラフ／AI の名寄せに直接効く。

**修正方針**: `lib/company.ts` にヘルパーを追加し、各ページはフル定義ではなく参照渡しにする。
```ts
export function getFuneralHomeRef() {
  return { "@id": `${SITE_URL}/#funeralhome` };
}
```
影響範囲が広いため、`/plan/[slug]/`（10件）から段階的に。

### H-2. エリアページ15本のテンプレ流用率が高くドアウェイ判定リスク

- 見出し構成（features 3・reasons 6・faqs 6〜9）が全エリアで完全に同一
- `otherFacilities` の説明文が新井宿・鳩ヶ谷・西川口・東川口・川口元郷・南鳩ヶ谷でほぼ一言一句同じ（地名のみ差し替え）
- `primarySaijoSlugs` が**全エリアで同一配列**（`megurinomori, toda-sousaijyo, yatsuka-saijo`）— 西川口と東川口が同じ斎場に近いという地理的検証がされていない
- 各ページ460〜500語でほぼ均一。**エリア固有の一次情報（固有の寺院名・実測所要時間・駅からの実距離）がほぼゼロ**

推定でテンプレ率60〜70%。手書きの自然文であるため即ペナルティではないが、AI が「同じ情報の言い換え」と認識し引用価値が下がるリスクがある。まず3〜5エリアで固有情報を追加する試験実装を推奨。

### H-3. `/contact/` `/estimate/` に JSON-LD が1件もない

JSON-LDゼロは5ページ: `/contact/` `/estimate/` `/privacy/` `/tokushoho/` `/sitemap/`。
うち **contact / estimate はCV直結ページ**でパンくずすらなく、AI がサイト構造内での位置づけを推測に頼る状態。

```tsx
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact/#webpage`,
  url: `${SITE_URL}/contact/`,
  name: "お問い合わせ | 川口典礼",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#funeralhome` },
  inLanguage: "ja",
};
```
※ `app/contact/**` `app/estimate/**` は CLAUDE.md §19.2 により **push は人間承認後**。

### H-4. YMYL に必要な著者・監修者情報がゼロ

コラム44本すべて `author: 川口典礼(Organization)`。個人の執筆者・監修者（葬祭ディレクター資格等）名が一切ない。
制度解説記事（`/column/hojokin/` `/column/sousai-fujo/` `/column/kenan/`）に**厚労省・埼玉県・川口市の公式データへの出典リンクがない**のも YMYL では減点。

### H-5. LocalBusiness JSON-LD に `geo`（緯度経度）がない

`lib/company.ts` の `getLocalBusinessJsonLd()` に geo プロパティが存在しない。`/access/` の地図埋め込みも住所文字列からの都度ジオコーディング方式。地図パック狙いでは基本項目。1ファイル修正で完結する。

---

## Medium（1ヶ月以内）

### M-1. セキュリティヘッダー4種が未設定

```
$ curl -sI https://kawaguchitenrei.com/
Strict-Transport-Security: max-age=63072000   ← あり
```
| ヘッダー | 状態 |
|---|---|
| HSTS | ✅ あり（ただし `includeSubDomains` / `preload` なし） |
| X-Content-Type-Options | ❌ なし |
| X-Frame-Options | ❌ なし |
| Referrer-Policy | ❌ なし |
| CSP | ❌ なし |

※ `next.config.ts` の変更は CLAUDE.md §19.2 により push 前確認必須。

### M-2. www が非wwwへリダイレクトされない

```
https://www.kawaguchitenrei.com/ → 200 hops=0
```
リダイレクトなしで200を返す。ただし **canonical は正しく `https://kawaguchitenrei.com/` を指している**ため、実害は限定的。301統一が望ましいが緊急ではない。

### M-3. 全リダイレクトが常に2ホップ

`next.config.ts` の約190件すべてが `/old-path` →（config）→ `/new-path` →（trailingSlash）→ `/new-path/` の2段。404落ち・ループ・3ホップ以上は**検出されず**。destination に末尾スラッシュ付きの最終URLを直接書けば1ホップに削減できる。

### M-4. トップページの DOM ノード数

| 指標 | 実測 |
|---|---|
| HTML（非圧縮） | 1,265 KB |
| **転送量（Brotli）** | **60 KB** ← 転送は問題なし |
| 要素タグ総数 | 約 **3,967** |
| `<img>` | 137 |
| `<svg>` / `<path>` | 642 / 643 |

内訳: `<img>` タグ26.7%、インラインSVG 12.7%、RSCペイロード12.4%。
**転送量は60KBで全く問題ない**が、DOMノード約3,967は Google の推奨（〜1,400）を大きく超えており、**INP（応答性）への影響が懸念される**。主因は口コミ・事例のマーキー（自動スクロール）が同じカードを3回複製していること。

### M-5. title 完全重複1組

`/voice/20240521__kasoou2/` と `/voice/tq4nrjZa/` がともに
「丁寧に対応していただき、ありがとうございました。 | 川口典礼 お客様の声」

---

## Low（バックログ）

- **L-1**: 口コミ30ページのテキスト量が約1,000字と最少（C-1のh1修正後、本文の薄さが残る場合のみ個別拡充を検討）
- **L-2**: `Article`/`Review` の `dateModified` が `datePublished` と常に同一（`lib/cases.ts` `lib/voices.ts` に `updatedAt` フィールドがない）。コラムは `updatedAt` 実装済みで良好
- **L-3**: 法人格つき正式社名「株式会社川口典礼」がサイト上のどこにも出ていない（`CompanyInfo.legalName` フィールドは存在するが未設定）。外部サイテーションとの NAP 完全一致に影響しうる
- **L-4**: `/tokushoho/` の h2 が 0個
- **L-5**: 斎場8施設（光の間・せせらぎの間等）は `lib/saijo.ts` の `hallRooms` に料金・画像・定員データが既にあり、`HallRoom.detailHref` フィールドも用意済み。個別ページ化のコストは低い。ただし**川口典礼の運営施設ではない旨の `importantNotice` 踏襲が必須**

---

## 実効性がないと判明した既存実装（削除は不要）

事実として記録しておく。追加投資は不要。

| 実装 | 状況 |
|---|---|
| `aggregateRating` ★4.5・27件 | Google は2019年以降、**自社サイト上の自己申告レビューにスニペットを付与しない**。星は SERP に出ない。AI引用の evidence にはなるため維持で可 |
| `FAQPage`（多数ページ） | FAQリッチリザルトは**ほぼ全サイトで廃止済み**。SERP装飾効果はない。ただし **AI/LLM 引用（GEO）には有効**なので維持 |
| `Review`（口コミ30ページ） | 同じく自己申告レビューのためスニペット対象外 |

---

## 参照ファイル

- クロールデータ: `findings/crawl.csv`（128URL × 15項目）
- 詳細所見: `findings/onpage.txt`
