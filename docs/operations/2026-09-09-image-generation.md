# 画像生成の運用（GPT Image 2.5）

作成日: 2026-09-09 / スクリプト: `scripts/generate-image.mjs`

---

## 1. いまの状態（2026-09-09 実測）

| 項目 | 状態 |
|---|---|
| `OPENAI_API_KEY` | `.env.local` に登録済み。有効（models API が 200） |
| 組織認証 | **完了**（Individual・組織 `satorh`） |
| `gpt-image-2.5-sunburst` | **利用可能**。生成・編集とも実測で確認 |
| `gpt-image-2.5-flare` | **利用可能** |
| 依存パッケージ | **追加していない**。Node 標準の `fetch` で API を直接呼ぶ |

`--model` の指定は不要です。何も付けなければ sunburst が使われます。

> 認証は組織単位です。403 が出るようになったら、
> [Settings → Organization](https://platform.openai.com/settings/organization/general) の Verifications と、
> 使っている API キーの組織（`org-J7yY8RAMzoqJuDi4V75usIlC`）が一致しているかを確認してください。

---

## 2. 使い方

```bash
# 基本（sunburst・1536x1024・high・webp）
node --env-file=.env.local scripts/generate-image.mjs \
  --prompt "落ち着いた色調の、事前相談の案内に使う抽象的な背景画像" \
  --out public/images/column/xxx/cover.webp

# 案を何枚も出す（flare・速い）
node --env-file=.env.local scripts/generate-image.mjs --fast --n 4 \
  --prompt "..." --out tmp/image-test/案.webp

# 既存画像を編集する
node --env-file=.env.local scripts/generate-image.mjs \
  --edit public/images/home/hall/hall-exterior.jpg \
  --prompt "空を少し明るく、全体の色調を落ち着かせる" \
  --out tmp/image-test/hall-edit.webp

# 送信せず内容だけ確認
node --env-file=.env.local scripts/generate-image.mjs --prompt "..." --out tmp/a.webp --dry-run

# 生成結果を固定したい場合（日付付きスナップショット）
node --env-file=.env.local scripts/generate-image.mjs \
  --model gpt-image-2.5-sunburst-2026-09-08 --prompt "..." --out tmp/a.webp
```

### オプション

| オプション | 既定 | 内容 |
|---|---|---|
| `--prompt` | （必須） | 生成・編集の指示 |
| `--out` | （必須） | 保存先。**既存ファイルは上書きしない**（`--force` で上書き） |
| `--edit` | — | 編集元の画像。カンマ区切りで複数可 |
| `--fast` | — | `flare` を使う（既定は `sunburst`） |
| `--model` | — | モデル名を直接指定（日付付きスナップショット等） |
| `--size` | `1536x1024` | `1024x1024` / `1536x1024` / `1024x1536` / `auto` |
| `--quality` | `high` | `auto` / `low` / `medium` / `high` / `xhigh` / `max` |
| `--format` | `webp` | `webp` / `png` / `jpeg` |
| `--n` | 1 | 枚数。2枚以上は `-1` `-2` … を付けて保存 |
| `--dry-run` | — | 送信せず内容だけ表示 |

### モデルの使い分け

| 用途 | モデル |
|---|---|
| LPのキービジュアル、既存写真の細かな編集 | `sunburst`（既定） |
| コラムのアイキャッチ、案を何枚も試す | `flare`（`--fast`） |

生成結果を固定したい場合は日付付きスナップショット（`--model gpt-image-2.5-sunburst-2026-09-08`）。通常は日付なしで十分です。

---

## 3. 守ること

### スクリプトが自動で止めること

- **プロンプトに「遺影・名札・会葬礼状・故人・喪主・位牌・焼香・遺体・棺の中」が含まれていたら実行しない**
- **保存先に既存ファイルがあれば上書きしない**（`--force` を明示したときだけ）
- 拡張子と `--format` の不一致、サイズ・品質の指定ミスを弾く

### 人が判断すること（スクリプトでは担保できない）

- **掲載前に必ず目視確認する。** これを飛ばさない（CLAUDE.md §12・§13）
- **生成画像を、当社の実在する建物・スタッフ・お客様として見せない。** 架空の建物を自社式場のように使わない
- **人物を写す場合は「（イメージ）」を添える。** 既存のLPでは「※写真はイメージです」を併記している
- **プロンプトに個人情報を書かない**（氏名・電話・住所・相談内容・故人情報）
- **既存画像のファイル名・配置場所は変更しない**（§13）
- 他社の式場・寺院会館を想起させる画像を、当社の施設として使わない

### 保存先の決め方

| 用途 | 保存先 |
|---|---|
| 試作・案出し | `tmp/image-test/`（Git 管理外） |
| サイトに載せるもの | `public/images/<セクション>/<用途>.webp` |

**いきなり `public/` に生成せず、まず `tmp/image-test/` に出して目視確認してから移す**のが安全です。

---

## 4. 実測メモ（2026-09-09）

| モデル | 条件 | 所要 | サイズ |
|---|---|---|---|
| sunburst | 生成・high・1024x1024・webp | 23.3秒 | 272KB |
| sunburst | **編集**・medium・1536x1024・webp | 21.7秒 | 1,739KB |
| gpt-image-2（旧） | 生成・low・1024x1024・webp | 15.0秒 | 446KB |

- 編集モードは自社ホールの外観写真で確認した。**建物・看板の文字・構図は保たれ、空の色と全体のトーンだけが変わった。**指示への忠実さは実用水準
- ただし編集結果は 1.7MB と大きい。サイトに載せる前に `--quality` を下げるか、圧縮すること
- `high` や `xhigh` は時間もサイズも増えます。ページに載せる場合、**Next/Image が最適化するとはいえ元ファイルが大きすぎると容量に効く**ので、用途に対して過剰な品質を選ばないこと
- 広告LP（`app/lp/**`）に載せる場合は、CLAUDE.md §21.2 の**転送量 50KB 以下（brotli）**に効きます。`node scripts/test-lp-output.mjs` で確認してから公開してください

---

## 5. 参考

- 冒頭のコメントに使い方を全部書いてあるので、`scripts/generate-image.mjs` を開けば単体で分かります
- 画像を追加したら、他のサイト修正と同じく `docs/reports/` に記録を残してください（`skills/work-report/SKILL.md`）
