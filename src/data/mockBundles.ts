import type { BundleCombination } from "@/types/domain";

export const bundles: BundleCombination[] = [
  {
    id: "bundle-xprice-gw",
    storeId: "xprice",
    campaignId: "gw-sale",
    purchaseTimingLabel: "GWセール / 5月上旬",
    airConditionerIds: ["daikin-e25", "mitsubishi-ge25", "sharp-dh25"],
    listPriceTotal: 450000,
    salePriceTotal: 298500,
    installationFeeType: "included",
    removalFeeType: "included",
    recommendationReason: "割引額が最大で、工事費と撤去費用も込み。"
  },
  {
    id: "bundle-bic-early",
    storeId: "bic",
    campaignId: "early-summer",
    purchaseTimingLabel: "夏先取りセール / 5月中旬",
    airConditionerIds: ["daikin-e25", "hitachi-aj25", "sharp-dh25"],
    listPriceTotal: 434000,
    salePriceTotal: 306400,
    installationFeeType: "separate",
    installationFeeTotal: 46200,
    removalFeeType: "separate",
    removalFeeTotal: 13200,
    recommendationReason: "本体価格は安め。工事費を別で確認できる人向け。"
  },
  {
    id: "bundle-amazon-gw",
    storeId: "amazon",
    campaignId: "gw-sale",
    purchaseTimingLabel: "GWセール / 5月上旬",
    airConditionerIds: ["mitsubishi-ge25", "mitsubishi-ge25", "sharp-dh25"],
    listPriceTotal: 448000,
    salePriceTotal: 386100,
    pointBackTotal: 6200,
    installationFeeType: "included",
    removalFeeType: "separate",
    removalFeeTotal: 9900,
    recommendationReason: "同一メーカー中心で選びやすく、標準工事込み。"
  },
  {
    id: "bundle-yamada-month",
    storeId: "yamada",
    campaignId: "month-end",
    purchaseTimingLabel: "月末セール / 5月下旬",
    airConditionerIds: ["daikin-e25", "daikin-e25", "sharp-dh25"],
    listPriceTotal: 452000,
    salePriceTotal: 392700,
    pointBackTotal: 20000,
    installationFeeType: "included",
    removalFeeType: "included",
    recommendationReason: "ポイント還元込みなら実質価格を下げやすい。"
  },
  {
    id: "bundle-kojima-early",
    storeId: "kojima",
    campaignId: "early-summer",
    purchaseTimingLabel: "夏先取りセール / 5月中旬",
    airConditionerIds: ["mitsubishi-ge25", "hitachi-aj25", "hitachi-aj25"],
    listPriceTotal: 428000,
    salePriceTotal: 398100,
    installationFeeType: "separate",
    installationFeeTotal: 46200,
    removalFeeType: "separate",
    removalFeeTotal: 13200,
    recommendationReason: "販売価格重視だが、別途費用を足して判断したい。"
  },
  {
    id: "bundle-yodobashi-stock",
    storeId: "yodobashi",
    purchaseTimingLabel: "在庫処分 / 型落ち時期",
    airConditionerIds: ["panasonic-ex25", "daikin-e25", "hitachi-aj25"],
    listPriceTotal: 452000,
    salePriceTotal: 371000,
    pointBackTotal: 18500,
    installationFeeType: "separate",
    installationFeeTotal: 32340,
    removalFeeType: "separate",
    removalFeeTotal: 13200,
    recommendationReason: "省エネ機種を混ぜつつポイント還元も狙える。"
  }
];
