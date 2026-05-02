export type FeeType = "included" | "separate" | "unknown";

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
  energySavingRating?: number;
  quietnessRating?: number;
  cleaningRating?: number;
  indoorNoiseDb?: number;
  hasSelfCleaning?: boolean;
  widthMm?: number;
  heightMm?: number;
  depthMm?: number;
  listPrice: number;
  referencePrice: number;
  features: string[];
};

export type Store = {
  id: string;
  name: string;
  storeType: "ec" | "physical" | "both";
  siteUrl?: string;
  notes?: string;
};

export type Campaign = {
  id: string;
  storeId: string;
  name: string;
  periodLabel: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  discountType: "price" | "point" | "bundle" | "coupon" | "unknown";
};

export type PriceOffer = {
  id: string;
  airConditionerId: string;
  storeId: string;
  campaignId?: string;
  price: number;
  pointBackAmount?: number;
  pointBackRate?: number;
  installationFeeType: FeeType;
  installationFeeAmount?: number;
  removalFeeType: FeeType;
  removalFeeAmount?: number;
  purchaseTimingLabel: string;
  observedAt: string;
  sourceUrl?: string;
};

export type BundleCombination = {
  id: string;
  storeId: string;
  campaignId?: string;
  purchaseTimingLabel: string;
  airConditionerIds: [string, string, string];
  listPriceTotal: number;
  salePriceTotal: number;
  pointBackTotal?: number;
  installationFeeType: FeeType | "mixed";
  installationFeeTotal?: number;
  removalFeeType: FeeType | "mixed";
  removalFeeTotal?: number;
  recommendationReason: string;
};

export type CalculatedBundleRanking = BundleCombination & {
  discountAmount: number;
  discountRate: number;
  effectivePriceTotal: number;
  rank: number;
};

export type BundleSortKey = "discountAmount" | "salePriceTotal" | "discountRate";
export type BundleFilterKey = "all" | "installationIncluded" | "removalIncluded";
