# AGENTS.md

## プロジェクト概要

このリポジトリは、エアコン3台をまとめ買いする際に、どの時期に、どのサイト・店舗で、どの組み合わせを購入するのが最もお得かを比較できるWebサイトを作成するためのプロジェクトである。

Firebase プロジェクトは `airConditioner` として作成済み。

Codex は gpt-5.5 を前提に、要件を満たす範囲で自発的に設計・実装・改善を進めてよい。

---

## 最重要ゴール

ユーザーが一目で以下を判断できること。

1. エアコン3台まとめ買いで、どの組み合わせが最もおすすめか
2. 定価で3台買う場合と比べて、いくら安くなるか
3. 割引額が大きい順に比較できること
4. どの時期に買うのがよいか
5. どこのサイト・店舗で買うのがよいか
6. 工事費が込みか別途か
7. 撤去費用が込みか別途か

余計な機能・装飾・複雑な入力フォームは不要。  
必要最小限の情報で、比較と意思決定に集中できるサイトにする。

---

## 実装方針

### 初期MVPの方針

まずは、外部APIやスクレイピングは実装しない。  
固定のモックデータを使って、以下を完成させる。

- 画面レイアウト
- 3台組み合わせ比較
- 割引額計算
- 割引額降順ソート
- 店舗・購入時期・工事費・撤去費用の表示
- エアコン単体性能の比較画面

価格データの自動取得は、MVP完成後の拡張として設計だけ残す。

### 作り込みすぎないこと

以下は初期MVPでは作らない。

- ユーザー認証
- お気に入り機能
- 検討中リスト
- セールカレンダー専用画面
- コメント機能
- 口コミ投稿
- 管理画面
- 複雑な検索条件入力
- 決済機能
- 外部ECへの自動購入連携

---

## 想定技術スタック

基本は以下で実装する。

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Hosting
- Firestore
- Firebase Cloud Functions
- pnpm
- ESLint
- Vitest

ただし、初期MVPでは Firestore / Cloud Functions は必須ではない。  
まずは `src/data` 配下の固定データで動作する静的サイトとして完成させる。

将来的に Firestore 化しやすいよう、データ取得層は分離する。

---

## Firebase 前提

Firebase プロジェクト名：

```txt
airConditioner
```

想定する Firebase 構成：

```txt
Firebase Hosting
Firestore
Cloud Functions
```

初期MVPでは Firebase Hosting へのデプロイを優先する。

---

## 画面構成

画面は2つだけ作る。

```txt
/
/home 相当。3台まとめ買いのおすすめ組み合わせ比較

/compare
エアコン単体の性能比較マトリクス
```

ヘッダーのタブは以下のみ。

```txt
ホーム
エアコンを比較
```

以下のタブ・要素は不要。

```txt
セール・カレンダー
お気に入り
お役立ち情報
あなたの検討中リスト
```

---

## ホーム画面仕様

### 目的

エアコン3台まとめ買いにおいて、どの時期・どの店舗・どの組み合わせが最もお得かを比較する画面。

### 表示する要素

ヘッダー直下には以下のみ表示する。

1. 表示条件
2. おすすめのエアコン組み合わせ一覧

以下のような説明欄・ヒーローエリアは不要。

```txt
3台まとめて、賢くお得にエアコンを選ぼう
```

右側の以下も不要。

```txt
3台合計の目安
あなたの検討中リスト
```

### 表示条件エリア

最小限でよい。

表示項目：

- 並び順
  - 初期値：割引額の大きい順
- 表示対象
  - すべて
  - 工事費込みのみ
  - 撤去費込みのみ

条件入力フォームは不要。  
部屋サイズや設置場所の入力も不要。

### おすすめのエアコン組み合わせ一覧

一覧はテーブル形式を基本とする。

列は以下。

| 列 | 内容 |
|---|---|
| 順位 | 割引額降順の順位 |
| 購入先 | ECサイト・店舗名 |
| 購入時期の目安 | GWセール、5月上旬、決算期など |
| エアコンの組み合わせ | 3台の機種名 |
| 定価合計 | 3台のメーカー定価または基準価格合計 |
| 販売価格合計 | 3台まとめ買い時の販売価格合計 |
| 割引額 | 定価合計 - 販売価格合計 |
| 割引率 | 割引額 / 定価合計 |
| 工事費 | 込み / 別途 / 金額 |
| 撤去費用 | 込み / 別途 / 金額 |
| おすすめ理由 | 短い一文 |

### ソート仕様

初期表示は必ず `discountAmount` の降順。

表示条件で切り替えられる並び順：

- 割引額の大きい順
- 販売価格の安い順
- 割引率の高い順

### ホーム画面で重視すること

- 一覧性を最優先
- 情報量を増やしすぎない
- スマホでも比較しやすい
- 赤字で割引額を強調
- 「いつ・どこで・どれを買うべきか」がすぐ分かる

---

## エアコンを比較画面仕様

### 目的

各エアコン単体の性能をマトリクスで視覚的に比較できる画面。

### 表示形式

横軸：エアコン機種  
縦軸：性能項目

### 表示項目

最低限、以下を表示する。

| 項目 | 内容 |
|---|---|
| メーカー | ダイキン、三菱電機、日立、シャープ、パナソニックなど |
| 型番 | 例：S253ATES-W |
| 対応畳数 | 例：6〜9畳 |
| 冷房能力 | kW |
| 暖房能力 | kW |
| 年間消費電力量 | kWh |
| APF | 通年エネルギー消費効率 |
| 省エネ性能 | 5段階など |
| 静音性 | dBまたは5段階 |
| 清掃機能 | あり / なし / 簡易説明 |
| 本体価格 | 参考税込価格 |
| 特徴 | 短い説明 |

### 視覚表現

- 数値だけでなく、星・バー・バッジなどで直感的に比較できるようにする
- ただし装飾しすぎない
- 価格・省エネ・静音性は目立たせる

### 比較画面で不要なもの

- 詳細すぎるカタログ情報
- 長文説明
- 口コミ
- 購入ボタン
- お気に入り

---

## データモデル

初期MVPでは `src/data/mockAirConditioners.ts` などに固定データを置く。  
将来的に Firestore に移行しやすいよう、型定義を必ず作る。

### AirConditioner

```ts
export type AirConditioner = {
  id: string;
  manufacturer: string;
  modelNumber: string;
  seriesName?: string;
  displayName: string;
  imageUrl?: string;
  roomSizeLabel: string;
  coolingCapacityKw: number;
  heatingCapacityKw: number;
  annualPowerConsumptionKwh?: number;
  apf?: number;
  energySavingRating?: number; // 1-5
  quietnessRating?: number; // 1-5
  cleaningRating?: number; // 1-5
  indoorNoiseDb?: number;
  hasSelfCleaning?: boolean;
  widthMm?: number;
  heightMm?: number;
  depthMm?: number;
  listPrice: number;
  referencePrice: number;
  features: string[];
};
```

### Store

```ts
export type Store = {
  id: string;
  name: string;
  storeType: 'ec' | 'physical' | 'both';
  siteUrl?: string;
  notes?: string;
};
```

### Campaign

```ts
export type Campaign = {
  id: string;
  storeId: string;
  name: string;
  periodLabel: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  discountType: 'price' | 'point' | 'bundle' | 'coupon' | 'unknown';
};
```

### PriceOffer

```ts
export type PriceOffer = {
  id: string;
  airConditionerId: string;
  storeId: string;
  campaignId?: string;
  price: number;
  pointBackAmount?: number;
  pointBackRate?: number;
  installationFeeType: 'included' | 'separate' | 'unknown';
  installationFeeAmount?: number;
  removalFeeType: 'included' | 'separate' | 'unknown';
  removalFeeAmount?: number;
  purchaseTimingLabel: string;
  observedAt: string;
  sourceUrl?: string;
};
```

### BundleCombination

```ts
export type BundleCombination = {
  id: string;
  storeId: string;
  campaignId?: string;
  purchaseTimingLabel: string;
  airConditionerIds: [string, string, string];
  listPriceTotal: number;
  salePriceTotal: number;
  pointBackTotal?: number;
  installationFeeType: 'included' | 'separate' | 'mixed' | 'unknown';
  installationFeeTotal?: number;
  removalFeeType: 'included' | 'separate' | 'mixed' | 'unknown';
  removalFeeTotal?: number;
  recommendationReason: string;
};
```

### CalculatedBundleRanking

```ts
export type CalculatedBundleRanking = BundleCombination & {
  discountAmount: number;
  discountRate: number;
  effectivePriceTotal: number;
  rank: number;
};
```

---

## 計算ロジック

### 割引額

```ts
discountAmount = listPriceTotal - salePriceTotal
```

ポイント還元を実質値引きとして扱う場合は、別途 `effectivePriceTotal` を算出する。

```ts
effectivePriceTotal = salePriceTotal - pointBackTotal
```

初期MVPでは、割引額ランキングは原則として以下で計算する。

```ts
discountAmount = listPriceTotal - salePriceTotal
```

ポイント還元込みの実質価格は補助情報として扱う。

### 割引率

```ts
discountRate = discountAmount / listPriceTotal
```

表示時はパーセント表記にする。

```ts
17.4%
```

### ランキング

初期表示は割引額の降順。

```ts
rankings.sort((a, b) => b.discountAmount - a.discountAmount)
```

同額の場合は、販売価格が安い方を上にする。

```ts
if (b.discountAmount === a.discountAmount) {
  return a.salePriceTotal - b.salePriceTotal;
}
```

---

## 価格取得方針

初期MVPでは自動取得しない。  
固定データで表示と計算を完成させる。

将来的な価格取得は以下の優先順位で検討する。

1. 公式APIがある場合はAPIを使う
2. アフィリエイトAPIが利用できる場合はそれを使う
3. 手動CSV更新
4. 規約上問題ない範囲でスクレイピング

スクレイピングを実装する場合は、必ず各サイトの利用規約・robots.txt・アクセス頻度に配慮する。  
無断で高頻度アクセスする実装は禁止。

### 想定購入先

初期データでは以下を想定する。

- Amazon
- 楽天市場
- Yahoo!ショッピング
- ビックカメラ
- ヨドバシカメラ
- ヤマダデンキ
- Joshin
- XPRICE
- ケーズデンキ
- エディオン

---

## 購入時期の考え方

購入時期は価格そのものではなく、比較判断の補助情報として表示する。

想定ラベル：

```txt
GWセール
5月上旬
5月中旬
5月下旬
夏前セール
決算期
型落ち時期
在庫処分
```

画面上では、各組み合わせごとに `purchaseTimingLabel` を表示する。

---

## ディレクトリ構成案

Next.js App Router を想定する。

```txt
.
├── AGENTS.md
├── README.md
├── firebase.json
├── .firebaserc
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── compare
│   │       └── page.tsx
│   ├── components
│   │   ├── Header.tsx
│   │   ├── HomeBundleTable.tsx
│   │   ├── BundleSummaryCard.tsx
│   │   ├── DisplayConditionPanel.tsx
│   │   ├── AirConditionerMatrix.tsx
│   │   └── RatingStars.tsx
│   ├── data
│   │   ├── mockAirConditioners.ts
│   │   ├── mockStores.ts
│   │   ├── mockCampaigns.ts
│   │   └── mockBundles.ts
│   ├── lib
│   │   ├── calculations.ts
│   │   ├── format.ts
│   │   └── ranking.ts
│   ├── types
│   │   └── domain.ts
│   └── styles
│       └── globals.css
├── functions
│   └── src
│       └── index.ts
└── docs
    ├── requirements.md
    ├── screen-spec.md
    └── data-model.md
```

---

## コンポーネント方針

### Header

- 左にサイト名
- 中央または右にタブ
- タブは2つのみ
  - ホーム
  - エアコンを比較
- 現在ページを青い下線で表示

### DisplayConditionPanel

表示条件だけを扱う。

- 並び順
- 表示対象

入力条件を増やさない。

### HomeBundleTable

ホーム画面の主役。  
3台まとめ買いの比較テーブルを表示する。

必ず割引額が見やすいこと。

### AirConditionerMatrix

エアコン単体の性能比較を行う。  
横スクロール可能なマトリクスでもよい。

---

## UIデザイン方針

- 白背景
- 青をメインカラー
- 赤は割引額の強調だけに使う
- 緑はおすすめ・込み表示などの補助に使う
- 装飾は最小限
- カードよりも表の見やすさを優先
- スマホでは横スクロールテーブルを許容する
- PCでは一覧性を優先する

### 表記ルール

金額：

```txt
¥298,500
```

割引額：

```txt
¥78,300
```

割引率：

```txt
17.4%
```

工事費：

```txt
込み
別途 ¥18,000
不明
```

撤去費用：

```txt
込み
別途 ¥6,600
不明
```

---

## テスト方針

最低限、以下のテストを作る。

1. 割引額計算
2. 割引率計算
3. 割引額降順ランキング
4. 同額時の販売価格昇順
5. 工事費込みフィルター
6. 撤去費込みフィルター

テスト対象例：

```txt
src/lib/calculations.ts
src/lib/ranking.ts
```

---

## 実装順序

Codex は以下の順で実装する。

1. Next.js / TypeScript / Tailwind の基本構成を確認・作成
2. 型定義を作成
3. モックデータを作成
4. 計算ロジックを作成
5. ホーム画面を作成
6. エアコン比較画面を作成
7. レスポンシブ対応
8. テスト追加
9. Firebase Hosting 設定
10. README に起動・デプロイ手順を記載

---

## Firebase Hosting 方針

Firebase Hosting にデプロイできる状態にする。

必要に応じて以下を用意する。

```txt
firebase.json
.firebaserc
```

`.firebaserc` の project は `airConditioner` を使う。

```json
{
  "projects": {
    "default": "airConditioner"
  }
}
```

Next.js のデプロイ方法は、実装時点の Firebase Hosting 対応に合わせて判断する。  
静的エクスポートで十分なら静的サイトとしてデプロイしてよい。

初期MVPは動的SSR不要。  
可能なら静的配信を優先する。

---

## README に書くこと

README.md には以下を必ず記載する。

- プロジェクト概要
- 画面一覧
- 技術スタック
- セットアップ手順
- ローカル起動手順
- テスト実行手順
- ビルド手順
- Firebase Hosting デプロイ手順
- 今後の拡張予定

---

## 受け入れ条件

以下を満たしたらMVP完了とする。

### ホーム画面

- ヘッダーに「ホーム」「エアコンを比較」の2タブだけが表示される
- ヘッダー下に不要な説明欄がない
- 表示条件とおすすめのエアコン一覧だけが表示される
- 3台組み合わせごとに購入先が分かる
- 購入時期が分かる
- 定価合計が分かる
- 販売価格合計が分かる
- 割引額が分かる
- 割引率が分かる
- 工事費の有無が分かる
- 撤去費用の有無が分かる
- 割引額の大きい順に並んでいる

### エアコンを比較画面

- エアコン単体の性能がマトリクスで比較できる
- 価格、省エネ性能、静音性、清掃機能が見やすい
- 不要な長文説明がない

### 技術面

- TypeScript の型エラーがない
- lint が通る
- build が通る
- 主要ロジックのテストが通る
- Firebase Hosting にデプロイ可能

---

## 実装時の判断基準

迷った場合は以下を優先する。

1. 情報量を増やすより、比較しやすさを優先
2. 機能追加より、割引額・購入時期・購入先の見やすさを優先
3. デザイン性より、実用性を優先
4. 自動取得より、まずは手動データで正しく比較できることを優先
5. 完璧な価格精度より、後で更新しやすいデータ構造を優先

---

## 注意事項

価格やキャンペーン情報は変動する。  
画面下部に以下の注記を表示する。

```txt
※価格・キャンペーン情報は参考情報です。購入前に必ず販売サイト・店舗で最新情報をご確認ください。
※工事費・撤去費用の条件は販売店や設置状況により異なる場合があります。
```

---

## 既存資料の参照

以下の資料が `docs` 配下に配置済みである。  
Codex は実装前に必ず確認し、画面仕様・調査内容・UI方針に反映すること。

```txt
docs/ChatGPT Image 2026年5月2日 14_39_00.png
docs/ChatGPT Image 2026年5月2日 14_39_11.png
docs/deep-research-report.md
```

### 画面サンプル

以下2つの画像は、UIの方向性を示す画面サンプルである。

```txt
docs/ChatGPT Image 2026年5月2日 14_39_00.png
docs/ChatGPT Image 2026年5月2日 14_39_11.png
```

実装では、これらを参考に以下を守ること。

- ヘッダーのタブは「ホーム」「エアコンを比較」の2つだけにする
- ホーム画面は、説明エリアを置かず、表示条件とおすすめ一覧を中心にする
- 3台まとめ買いの比較表を主役にする
- 購入時期、購入先、組み合わせ、定価合計、販売価格合計、割引額、工事費、撤去費用が分かるようにする
- エアコン比較画面は、各エアコンの性能をマトリクス形式で視覚的に比較できるようにする

画像内の文言や数値を完全に再現する必要はない。  
ただし、余計なナビゲーションや不要なカードを増やさず、シンプルな比較画面にすること。

### 調査結果

以下のファイルは、価格・購入時期・販売店・キャンペーン傾向などの調査結果である。

```txt
docs/deep-research-report.md
```

Codex はこの内容を読み、初期モックデータや画面表示に反映すること。  
ただし、調査結果の価格情報は変動するため、画面上では参考情報として扱い、購入前確認の注記を表示すること。

---

## Codex への実行指示

この AGENTS.md を読んだら、まず既存リポジトリの状態と `docs` 配下の資料を確認し、不足している構成を補完すること。  
実装に必要なファイルが存在しない場合は作成してよい。  
既存ファイルがある場合は破壊的変更を避け、差分を確認しながら進めること。

最初のゴールは、固定データで以下が動く状態にすること。

```txt
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm build
firebase deploy
```

実データ取得や自動更新は後回しでよい。  
まずは、ホーム画面とエアコン比較画面の完成度を優先すること。

