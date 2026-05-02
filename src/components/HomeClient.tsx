"use client";

import { useMemo, useState } from "react";
import { DisplayConditionPanel } from "@/components/DisplayConditionPanel";
import { HomeBundleTable } from "@/components/HomeBundleTable";
import { getBundleRankings } from "@/lib/ranking";
import type { BundleCombination, BundleFilterKey, BundleSortKey } from "@/types/domain";

type HomeClientProps = {
  bundles: BundleCombination[];
};

export function HomeClient({ bundles }: HomeClientProps) {
  const [sortKey, setSortKey] = useState<BundleSortKey>("discountAmount");
  const [filterKey, setFilterKey] = useState<BundleFilterKey>("all");
  const rankings = useMemo(
    () => getBundleRankings(bundles, sortKey, filterKey),
    [bundles, sortKey, filterKey]
  );

  return (
    <>
      <DisplayConditionPanel
        sortKey={sortKey}
        filterKey={filterKey}
        onSortChange={setSortKey}
        onFilterChange={setFilterKey}
        resultCount={rankings.length}
      />
      <HomeBundleTable rankings={rankings} />
    </>
  );
}
