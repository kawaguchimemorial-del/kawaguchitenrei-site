# 内部利用・テストの計測除外

確認日: 2026-09-06。対象は川口典礼サイトのGA4・GTM起動とVercel Web Analytics。

## 実装

- `lib/analytics-policy.ts` の判定をroot layoutでGTMより前に読み込む。
- HTTPSの本番ドメイン（wwwを含む）だけを計測対象とする。localhost・Vercel previewは除外する。
- `/admin/**`、`/post/**`、`/voice/survey/` は除外。admin・postを直接開くと、そのブラウザへ内部利用フラグを保存する。
- GA4の公開measurement IDに対応する `ga-disable-*` を動的に判定し、GTM読み込み後の内部ページへの遷移も除外する。
- フォーム完了イベントとVercel Analyticsも同じ判定に従う。通常の本番利用者による問い合わせと広告LPは対象のまま。
- 除外判定を通らないnoscriptのGTM iframeは撤去した。JavaScriptが無効な利用者のタグ計測は行わない。

## 社内・テスト用ブラウザの設定

- 本番トップを `https://kawaguchitenrei.com/?analytics=off` で一度開く。同じブラウザの後続利用も除外する。
- 解除するときだけ `https://kawaguchitenrei.com/?analytics=on` を開く。
- localStorageを削除した場合、別ブラウザ・別端末では改めて設定する。wwwと非wwwは別オリジン。
- ストレージ拒否時は現在のページのoff指定を尊重するが、別ページ読み込みへは保存できない。
- 公開ページからSPA遷移で内部ページに入った場合、そのページではGA4送信を停止する。ブラウザ全体の永続除外は上記offの設定を使う。

## 検証と限界

`node scripts/test-analytics-policy.mjs` で本番・LP・内部パス・プレビュー・除外の保存と解除・ストレージ拒否・SPA遷移を検証。

過去のGA4データは修正・削除しない。GA4管理画面のIPフィルタは、社内固定IPを確認できていないため追加しない。既に読み込まれたGoogle広告タグのSPA遷移後の個別動作までは本検証の対象外。実問い合わせの送信テストは行わない。

参照: [Googleの計測無効化仕様](https://developers.google.com/tag-platform/security/guides/privacy)。計測IDを変更する場合は、この実装とテストも更新する。
