import type { Campaign } from "@/types/domain";

export const campaigns: Campaign[] = [
  {
    id: "gw-sale",
    storeId: "xprice",
    name: "GWセール",
    periodLabel: "2026年5月上旬",
    startDate: "2026-04-24",
    endDate: "2026-05-10",
    discountType: "bundle",
    description: "対象モデルのまとめ買い値引き"
  },
  {
    id: "early-summer",
    storeId: "bic",
    name: "夏先取りセール",
    periodLabel: "2026年5月中旬",
    discountType: "price"
  },
  {
    id: "month-end",
    storeId: "yamada",
    name: "月末セール",
    periodLabel: "2026年5月下旬",
    discountType: "point"
  }
];
