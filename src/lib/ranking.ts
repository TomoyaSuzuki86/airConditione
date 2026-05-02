import { calculateBundle } from "@/lib/calculations";
import type {
  BundleCombination,
  BundleFilterKey,
  BundleSortKey,
  CalculatedBundleRanking
} from "@/types/domain";

const sorters: Record<
  BundleSortKey,
  (a: CalculatedBundleRanking, b: CalculatedBundleRanking) => number
> = {
  discountAmount: (a, b) =>
    b.discountAmount - a.discountAmount || a.salePriceTotal - b.salePriceTotal,
  salePriceTotal: (a, b) =>
    a.salePriceTotal - b.salePriceTotal || b.discountAmount - a.discountAmount,
  discountRate: (a, b) =>
    b.discountRate - a.discountRate || a.salePriceTotal - b.salePriceTotal
};

export const getBundleRankings = (
  bundles: BundleCombination[],
  sortKey: BundleSortKey = "discountAmount",
  filterKey: BundleFilterKey = "all"
) => {
  const filtered = bundles.filter((bundle) => {
    if (filterKey === "installationIncluded") {
      return bundle.installationFeeType === "included";
    }
    if (filterKey === "removalIncluded") {
      return bundle.removalFeeType === "included";
    }
    return true;
  });

  return filtered
    .map((bundle) => calculateBundle(bundle, 0))
    .sort(sorters[sortKey])
    .map((bundle, index) => ({ ...bundle, rank: index + 1 }));
};
