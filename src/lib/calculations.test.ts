import { describe, expect, it } from "vitest";
import {
  calculateDiscountAmount,
  calculateDiscountRate,
  calculateEffectivePriceTotal
} from "@/lib/calculations";

describe("calculations", () => {
  it("割引額を計算する", () => {
    expect(calculateDiscountAmount(450000, 298500)).toBe(151500);
  });

  it("割引率を計算する", () => {
    expect(calculateDiscountRate(78300, 450000)).toBeCloseTo(0.174);
  });

  it("ポイント還元込みの実質価格を計算する", () => {
    expect(calculateEffectivePriceTotal(392700, 20000)).toBe(372700);
  });
});
