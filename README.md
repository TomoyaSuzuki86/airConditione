# エアコンまとめ買い比較

エアコン3台をまとめ買いする際に、購入先、購入時期、機種の組み合わせ、工事費、撤去費用を比較するためのMVPです。初期版は外部APIやスクレイピングを使わず、固定のモックデータで動作します。

## 画面一覧

- `/`：3台まとめ買いのおすすめ組み合わせ比較
- `/compare`：エアコン単体の性能比較マトリクス

## 技術スタック

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest
- Firebase Hosting
- pnpm

## セットアップ

```bash
pnpm install
```

## ローカル起動

```bash
pnpm dev
```

## テスト

```bash
pnpm test
```

## Lint

```bash
pnpm lint
```

## ビルド

```bash
pnpm build
```

静的エクスポートにより `out/` が生成されます。

## Firebase Hosting デプロイ

Firebase プロジェクトは `.firebaserc` の `airConditioner` を使います。

```bash
pnpm build
firebase deploy
```

## 今後の拡張予定

- Firestore へのデータ移行
- CSVによる価格更新
- 公式APIやアフィリエイトAPIを使った価格取得
- キャンペーン期間と店舗ルールの更新しやすい管理
- Firebase Cloud Functions によるデータ更新処理
