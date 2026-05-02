import Image from "next/image";
import { getAirConditionerById, getCampaignById, getStoreById } from "@/lib/data";
import { formatCurrency, formatFee, formatPercent } from "@/lib/format";
import type { AirConditioner, CalculatedBundleRanking } from "@/types/domain";

type HomeBundleTableProps = {
  rankings: CalculatedBundleRanking[];
};

export function HomeBundleTable({ rankings }: HomeBundleTableProps) {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-8">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-bold text-slate-950">
          おすすめのエアコン組み合わせ一覧
        </h2>
        <p className="text-sm text-slate-500">割引額の赤字を中心に比較できます</p>
      </div>
      <div className="table-scroll rounded-lg border border-slate-200 bg-white">
        <table className="min-w-[1320px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              {[
                "順位",
                "購入先",
                "購入時期の目安",
                "エアコンの組み合わせ",
                "定価合計",
                "販売価格合計",
                "割引額",
                "割引率",
                "工事費",
                "撤去費用",
                "おすすめ理由"
              ].map((heading) => (
                <th key={heading} className="border-b border-r border-slate-200 px-4 py-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankings.map((bundle) => {
              const store = getStoreById(bundle.storeId);
              const campaign = getCampaignById(bundle.campaignId);
              const airConditioners = bundle.airConditionerIds
                .map(getAirConditionerById)
                .filter((item): item is AirConditioner => Boolean(item));

              return (
                <tr key={bundle.id} className={bundle.rank === 1 ? "bg-amber-50" : "bg-white"}>
                  <td className="border-r border-t border-slate-200 px-4 py-4 text-center text-xl font-bold">
                    {bundle.rank}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 font-bold text-slate-950">
                    {store?.name ?? bundle.storeId}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4">
                    <span className="block font-bold text-slate-950">
                      {bundle.purchaseTimingLabel}
                    </span>
                    {campaign ? (
                      <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {campaign.name}
                      </span>
                    ) : null}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4">
                    <div className="grid grid-cols-3 gap-3">
                      {airConditioners.map((item, index) => (
                        <div key={`${bundle.id}-${item.id}-${index}`} className="min-w-0 text-center">
                          <Image
                            src={item.imageUrl ?? "/placeholder-ac.svg"}
                            alt=""
                            width={96}
                            height={36}
                            className="mx-auto object-contain"
                          />
                          <p className="mt-1 truncate text-xs font-bold text-slate-800">
                            {item.manufacturer}
                          </p>
                          <p className="truncate text-xs text-slate-600">{item.modelNumber}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 font-bold">
                    {formatCurrency(bundle.listPriceTotal)}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 text-lg font-bold text-slate-950">
                    {formatCurrency(bundle.salePriceTotal)}
                    {bundle.pointBackTotal ? (
                      <span className="mt-1 block text-xs text-slate-500">
                        実質 {formatCurrency(bundle.effectivePriceTotal)}
                      </span>
                    ) : null}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 text-lg font-bold text-red-600">
                    {formatCurrency(bundle.discountAmount)}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 font-bold">
                    {formatPercent(bundle.discountRate)}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 font-bold text-slate-900">
                    {formatFee(bundle.installationFeeType, bundle.installationFeeTotal)}
                  </td>
                  <td className="border-r border-t border-slate-200 px-4 py-4 font-bold text-slate-900">
                    {formatFee(bundle.removalFeeType, bundle.removalFeeTotal)}
                  </td>
                  <td className="border-t border-slate-200 px-4 py-4 text-slate-700">
                    {bundle.recommendationReason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
