import type { BundleCombination, CalculatedBundleRanking } from "@/types/domain";

export const calculateDiscountAmount = (listPriceTotal: number, salePriceTotal: number) =>
  listPriceTotal - salePriceTotal;

export const calculateDiscountRate = (discountAmount: number, listPriceTotal: number) =>
  listPriceTotal === 0 ? 0 : discountAmount / listPriceTotal;

export const calculateEffectivePriceTotal = (
  salePriceTotal: number,
  pointBackTotal = 0
) => salePriceTotal - pointBackTotal;

export const calculateBundle = (
  bundle: BundleCombination,
  rank: number
): CalculatedBundleRanking => {
  const discountAmount = calculateDiscountAmount(
    bundle.listPriceTotal,
    bundle.salePriceTotal
  );

  return {
    ...bundle,
    discountAmount,
    discountRate: calculateDiscountRate(discountAmount, bundle.listPriceTotal),
    effectivePriceTotal: calculateEffectivePriceTotal(
      bundle.salePriceTotal,
      bundle.pointBackTotal
    ),
    rank
  };
};
