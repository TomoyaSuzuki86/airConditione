import type { BundleCombination } from "@/types/domain";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);

export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export const formatFee = (
  type: BundleCombination["installationFeeType"] | BundleCombination["removalFeeType"],
  amount?: number
) => {
  if (type === "included") return "込み";
  if (type === "separate") return amount ? `別途 ${formatCurrency(amount)}` : "別途";
  if (type === "mixed") return amount ? `混在 ${formatCurrency(amount)}` : "混在";
  return "不明";
};
