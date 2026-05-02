"use client";

import type { BundleFilterKey, BundleSortKey } from "@/types/domain";

type DisplayConditionPanelProps = {
  sortKey: BundleSortKey;
  filterKey: BundleFilterKey;
  onSortChange: (value: BundleSortKey) => void;
  onFilterChange: (value: BundleFilterKey) => void;
  resultCount: number;
};

export function DisplayConditionPanel({
  sortKey,
  filterKey,
  onSortChange,
  onFilterChange,
  resultCount
}: DisplayConditionPanelProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <h1 className="text-xl font-bold text-slate-950">表示条件</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            並び順
            <select
              value={sortKey}
              onChange={(event) => onSortChange(event.target.value as BundleSortKey)}
              className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-950"
            >
              <option value="discountAmount">割引額の大きい順</option>
              <option value="salePriceTotal">販売価格の安い順</option>
              <option value="discountRate">割引率の高い順</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            表示対象
            <select
              value={filterKey}
              onChange={(event) => onFilterChange(event.target.value as BundleFilterKey)}
              className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-950"
            >
              <option value="all">すべて</option>
              <option value="installationIncluded">工事費込みのみ</option>
              <option value="removalIncluded">撤去費込みのみ</option>
            </select>
          </label>
          <span className="text-sm font-bold text-slate-500">{resultCount}件</span>
        </div>
      </div>
    </section>
  );
}
