import { describe, expect, it } from "vitest";
import { getBundleRankings } from "@/lib/ranking";
import type { BundleCombination } from "@/types/domain";

const fixture: BundleCombination[] = [
  {
    id: "a",
    storeId: "s",
    purchaseTimingLabel: "GWセール",
    airConditionerIds: ["a", "b", "c"],
    listPriceTotal: 300000,
    salePriceTotal: 240000,
    installationFeeType: "included",
    removalFeeType: "separate",
    recommendationReason: "A"
  },
  {
    id: "b",
    storeId: "s",
    purchaseTimingLabel: "5月上旬",
    airConditionerIds: ["a", "b", "c"],
    listPriceTotal: 300000,
    salePriceTotal: 220000,
    installationFeeType: "separate",
    removalFeeType: "included",
    recommendationReason: "B"
  },
  {
    id: "c",
    storeId: "s",
    purchaseTimingLabel: "5月中旬",
    airConditionerIds: ["a", "b", "c"],
    listPriceTotal: 280000,
    salePriceTotal: 220000,
    installationFeeType: "included",
    removalFeeType: "included",
    recommendationReason: "C"
  }
];

describe("ranking", () => {
  it("割引額降順で並べる", () => {
    expect(getBundleRankings(fixture).map((item) => item.id)).toEqual(["b", "c", "a"]);
  });

  it("割引額が同額の場合は販売価格が安い方を上にする", () => {
    expect(getBundleRankings(fixture).map((item) => item.id)).toEqual(["b", "c", "a"]);
  });

  it("工事費込みのみで絞り込む", () => {
    expect(
      getBundleRankings(fixture, "discountAmount", "installationIncluded").map(
        (item) => item.id
      )
    ).toEqual(["c", "a"]);
  });

  it("撤去費込みのみで絞り込む", () => {
    expect(
      getBundleRankings(fixture, "discountAmount", "removalIncluded").map(
        (item) => item.id
      )
    ).toEqual(["b", "c"]);
  });
});
