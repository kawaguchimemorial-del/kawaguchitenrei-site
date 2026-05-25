# エリアページから /saijo/ 寺院会館アンカーへの内部リンク追加 完了記録

## 作業目的

直近の `/saijo/` 強化（寺院会館・民営式場 16 施設 / 7 エリアグループ化、commit `d71a507`）に対する内部リンク網の補強。

エリアページ 14 ファイルから `/saijo/` 一覧トップまたは寺院会館グループの `#アンカー` への導線が**ゼロ件**（既存は `/saijo/megurinomori/`（火葬場）のみ）だったため、各エリアの地理的近接性に基づいて 1 件ずつ追加する。

## 対象 14 ページ

| # | エリア slug | 追加先 URL |
|---|---|---|
| 1 | `app/area/angyo/page.tsx` | `/saijo/#angyo-tozuka-angyo` |
| 2 | `app/area/tozuka-angyo/page.tsx` | `/saijo/#angyo-tozuka-angyo` |
| 3 | `app/area/higashikawaguchi/page.tsx` | `/saijo/#angyo-tozuka-angyo` |
| 4 | `app/area/aoki/page.tsx` | `/saijo/#kamiaoki-aoki` |
| 5 | `app/area/kamiaoki/page.tsx` | `/saijo/#kamiaoki-aoki` |
| 6 | `app/area/minami-hatogaya/page.tsx` | `/saijo/#asahi-minami-hatogaya` |
| 7 | `app/area/hatogaya/page.tsx` | `/saijo/#asahi-minami-hatogaya` |
| 8 | `app/area/shingo/page.tsx` | `/saijo/#hagimatsu-shingo-sashima` |
| 9 | `app/area/kawaguchi-motogo/page.tsx` | `/saijo/#motogo-ryoke` |
| 10 | `app/area/kamine/page.tsx` | `/saijo/#edobukuro-shinbori` |
| 11 | `app/area/araijuku/page.tsx` | `/saijo/` 一覧トップ |
| 12 | `app/area/shiba/page.tsx` | `/saijo/` 一覧トップ |
| 13 | `app/area/nishikawaguchi/page.tsx` | `/saijo/` 一覧トップ |
| 14 | `app/area/kawaguchi/page.tsx` | `/saijo/` 一覧トップ |

## 追加した /saijo/ 導線 対応表

### アンカー導線（10 件）

| エリア | アンカー | label | description |
|---|---|---|---|
| angyo | `#angyo-tozuka-angyo` | 川口市内の寺院会館・民営式場（安行・戸塚安行方面） | 安行・戸塚安行エリアで利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。 |
| tozuka-angyo | `#angyo-tozuka-angyo` | 川口市内の寺院会館・民営式場（安行・戸塚安行方面） | 安行・戸塚安行エリアで利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。 |
| higashikawaguchi | `#angyo-tozuka-angyo` | 川口市内の寺院会館・民営式場（安行・戸塚安行方面） | 東川口・戸塚安行方面で利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。 |
| aoki | `#kamiaoki-aoki` | 川口市内の寺院会館・民営式場（上青木・青木方面） | 青木・上青木エリアで利用できる寺院会館・民営式場の候補もご案内します。 |
| kamiaoki | `#kamiaoki-aoki` | 川口市内の寺院会館・民営式場（上青木・青木方面） | 上青木・青木エリアで利用できる寺院会館・民営式場の候補もご案内します。 |
| minami-hatogaya | `#asahi-minami-hatogaya` | 川口市内の寺院会館・民営式場（朝日・南鳩ヶ谷方面） | 朝日・南鳩ヶ谷エリアで利用できる寺院会館・民営式場をエリア別にご案内します。 |
| hatogaya | `#asahi-minami-hatogaya` | 川口市内の寺院会館・民営式場（朝日・南鳩ヶ谷方面） | 鳩ヶ谷・南鳩ヶ谷方面で利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。 |
| shingo | `#hagimatsu-shingo-sashima` | 川口市内の寺院会館・民営式場（榛松・新郷・差間方面） | 新郷・榛松・差間エリアで利用できる寺院会館・民営式場の候補もあわせてご相談いただけます。 |
| kawaguchi-motogo | `#motogo-ryoke` | 川口市内の寺院会館・民営式場（元郷・領家方面） | 元郷・領家エリアで利用できる寺院会館・民営式場の候補もご案内します。 |
| kamine | `#edobukuro-shinbori` | 川口市内の寺院会館・民営式場（江戸袋・新堀方面） | 神根エリアからのご希望に応じて、川口市内の寺院会館・民営式場の候補もご案内します。 |

### /saijo/ 一覧トップ導線（4 件）

| エリア | href | label | description |
|---|---|---|---|
| araijuku | `/saijo/` | 川口市・近隣の葬儀場一覧 | 川口メモリアルホール・寺院会館・民営式場をエリア別にご紹介しています。 |
| shiba | `/saijo/` | 川口市・近隣の葬儀場一覧 | 川口メモリアルホール・寺院会館・民営式場をエリア別にご紹介しています。 |
| nishikawaguchi | `/saijo/` | 川口市・近隣の葬儀場一覧 | 川口市内の寺院会館・民営式場の候補をエリア別にご紹介しています。 |
| kawaguchi | `/saijo/` | 川口市・近隣の葬儀場一覧 | 寺院会館・民営式場を含む川口市内の葬儀場候補をエリア別にご紹介しています。 |

## 実装内容

各エリアページの `relatedLinks` 配列内、**「川口市めぐりの森」（`/saijo/megurinomori/`）リンクの直後**に 1 オブジェクト（label / description / href）を追加。

火葬場（`/saijo/megurinomori/`）→ 式場（寺院会館・民営式場グループまたは一覧トップ）の順で並ぶことで、ユーザーの「式場と火葬場の両方を確認したい」動線に自然に対応する。

## /saijo/ 強化後の内部リンク補強としての位置付け

| 段階 | 内容 | コミット |
|---|---|---|
| 1 | /saijo/ 寺院会館・民営式場セクションを 7 → 16 件 / 7 エリアグループ化（id 付与で `#アンカー` 対応） | `d71a507` |
| 2 | 完了記録 docs 作成 | `fd36299` |
| 3 | /saijo/ の Search Console URL 検査・公開 URL テスト・インデックス登録リクエスト | `75ee21a`（作業ログ docs） |
| 4 | AI 作業ルール・Skill / Agent 基盤の整備 | `f593bff` |
| 5 | **エリアページから /saijo/ への内部導線追加（本作業）** | （本コミット） |

`/saijo/` の権威を、エリアページから内部リンクで集める段階。Search Console 上では `/saijo/` への内部リンク被リンク数が 0 → 14 に増えることになる。

## 安全確認

| 項目 | 結果 |
|---|---|
| 価格の追加・変更 | ✅ なし（CLAUDE.md §9 プラン正本との突合も差分なし） |
| 式場使用料の追加・変更 | ✅ なし |
| 空き状況・式場利用可否の新規断定 | ✅ なし（「ご相談いただけます」「ご案内します」「候補もあわせて」表現に統一） |
| 宗派条件の新規断定 | ✅ なし |
| 「川口典礼の運営施設」のような表現 | ✅ なし |
| 「川口市めぐりの森を川口典礼が運営」のような表現 | ✅ なし（既存「川口市営の火葬場」表記を維持） |
| 禁止表現（必ず利用 / 空きがあります / 宗派問わず利用 / 追加費用なし / 最安 / 川口典礼の運営施設） | ✅ **0 件**（grep 確認） |
| Header / Footer / MobileBottomCTA への変更 | ✅ なし |
| `app/api/**` / `app/contact/**` / `app/estimate/**` / Webhook / `.env*` への接触 | ✅ なし |
| `package.json` / lockfile / `next.config.ts` への変更 | ✅ なし |
| `funeral-system/` への接触 | ✅ なし |
| `public/images/tmp/tmp.txt` への接触 | ✅ なし |
| `lib/voices.ts` / `lib/cases.ts` への変更 | ✅ なし |
| Review / aggregateRating / ratingValue の追加 | ✅ なし |
| `lib/areas.ts`・共通コンポーネント・型定義への変更 | ✅ なし（各 page.tsx のローカル配列 `relatedLinks` のみ追加） |
| 追加した /saijo/ アンカー ID の実在確認 | ✅ 6 アンカーすべて `app/saijo/page.tsx` に存在（grep 確認） |
| sitemap / robots / canonical / noindex への変更 | ✅ なし |

## build 結果

```
✓ Compiled successfully in 2.7s
  Finished TypeScript in 3.5s ...
✓ Generating static pages using 23 workers (131/131) in 649ms
```

- ✅ TypeScript pass
- ✅ **131/131 static pages** 生成（ページ数変化なし）
- ✅ エラー・警告なし

## 想定差分

`git diff --stat`:
```
 14 files changed, 70 insertions(+)
```

各ファイル一律 +5 行 / -0 行（純粋な追加のみ）。

## 今後の Search Console 観測候補

### 観測タイミング

| 期間 | 観測内容 |
|---|---|
| 2〜3 日後 | `/saijo/` のインデックス更新確認（リンク経由でクロール促進） |
| 1 週間後 | エリアページから `/saijo/` への内部リンクが Search Console「リンク」レポートに反映される |
| 2〜4 週間後 | `/saijo/` の表示回数・平均掲載順位・クリック数の変化を観測 |
| 6〜8 週間後 | `/saijo/` の権威向上による「川口市 葬儀場」「川口 寺院会館 葬儀」キーワードの順位変動を観測 |

### Search Console URL 検査の追加候補

新規ページ追加ではないため URL 検査の追加は必須ではないが、**Search Console「リンク」レポート**で `/saijo/` への内部リンク数が増えていることを 1 週間後に確認する。

### 観測キーワード候補

| キーワード | 注目理由 |
|---|---|
| 川口市 葬儀場 | /saijo/ の主要キーワード、内部リンク補強で順位上昇期待 |
| 川口 寺院会館 葬儀 | アンカー対応で AIO 拾われやすくなる可能性 |
| 川口 民営式場 葬儀 | 同上 |
| 安行 葬儀場 | angyo / tozuka-angyo / higashikawaguchi の 3 ページから #angyo-tozuka-angyo 流入 |
| 上青木 葬儀場 / 青木 葬儀場 | aoki / kamiaoki の 2 ページから #kamiaoki-aoki 流入 |
| 南鳩ヶ谷 葬儀場 / 朝日 葬儀場 | minami-hatogaya / hatogaya から #asahi-minami-hatogaya 流入 |
| 新郷 葬儀場 | shingo から #hagimatsu-shingo-sashima 流入 |

## 関連コミット履歴

- `f593bff` Add AI workflow rules and skills foundation
- `75ee21a` Document Search Console inspection for saijo page
- `fd36299` Document temple hall section expansion
- `d71a507` Expand temple hall section by area with 16 venues
- 本コミット（追記）

## 関連ドキュメント

- /saijo/ 強化記録: `docs/eval/records/2026-05-saijo-temple-hall-expansion.md`
- Search Console 作業ログ: `docs/operations/search-console/2026-05-saijo-url-inspection-log.md`
- SEO/AIO 改善 Skill: `skills/seo-page-improvement/SKILL.md`
- 自動 push 範囲: `CLAUDE.md` §19
