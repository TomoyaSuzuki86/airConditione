import Image from "next/image";
import { RatingStars } from "@/components/RatingStars";
import { formatCurrency } from "@/lib/format";
import type { AirConditioner } from "@/types/domain";

type AirConditionerMatrixProps = {
  airConditioners: AirConditioner[];
};

export function AirConditionerMatrix({ airConditioners }: AirConditionerMatrixProps) {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">エアコンを比較</h1>
          <p className="mt-2 text-sm text-slate-600">
            価格、省エネ性能、静音性、清掃機能を横並びで確認できます。
          </p>
        </div>
        <div className="rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          ★の数が多いほど高評価です
        </div>
      </div>
      <div className="table-scroll rounded-lg border border-slate-200 bg-white">
        <table className="min-w-[1180px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-56 border-b border-r border-slate-200 bg-slate-50 px-5 py-5 text-left text-lg font-bold">
                性能項目
              </th>
              {airConditioners.map((item) => (
                <th
                  key={item.id}
                  className="w-64 border-b border-r border-slate-200 px-5 py-5 text-center"
                >
                  <p className="text-lg font-bold text-slate-950">{item.manufacturer}</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{item.modelNumber}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.seriesName}</p>
                  <Image
                    src={item.imageUrl ?? "/placeholder-ac.svg"}
                    alt=""
                    width={160}
                    height={60}
                    className="mx-auto mt-3 object-contain"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <MatrixRow
              label="メーカー"
              values={airConditioners.map((item) => item.manufacturer)}
            />
            <MatrixRow label="型番" values={airConditioners.map((item) => item.modelNumber)} />
            <MatrixRow
              label="対応畳数"
              values={airConditioners.map((item) => item.roomSizeLabel)}
            />
            <MatrixRow
              label="冷房能力"
              values={airConditioners.map((item) => `${item.coolingCapacityKw.toFixed(1)}kW`)}
            />
            <MatrixRow
              label="暖房能力"
              values={airConditioners.map((item) => `${item.heatingCapacityKw.toFixed(1)}kW`)}
            />
            <MatrixRow
              label="年間消費電力量"
              values={airConditioners.map((item) => (
                <strong
                  key={item.id}
                  className={
                    item.annualPowerConsumptionKwh &&
                    item.annualPowerConsumptionKwh <= 800
                      ? "text-red-600"
                      : "text-slate-950"
                  }
                >
                  {item.annualPowerConsumptionKwh ?? "-"}kWh
                </strong>
              ))}
            />
            <MatrixRow
              label="APF"
              values={airConditioners.map((item) => (
                <span key={item.id} className="font-bold">
                  {item.apf?.toFixed(1) ?? "-"}
                  <span className="mt-1 block">
                    <RatingStars value={Math.round(item.apf ?? 0) - 1} />
                  </span>
                </span>
              ))}
            />
            <MatrixRow
              label="省エネ性能"
              values={airConditioners.map((item) => (
                <RatingStars key={item.id} value={item.energySavingRating} />
              ))}
            />
            <MatrixRow
              label="静音性"
              values={airConditioners.map((item) => (
                <span key={item.id} className="font-bold">
                  <RatingStars
                    value={item.quietnessRating}
                    tone={(item.quietnessRating ?? 0) >= 5 ? "red" : "gold"}
                  />
                  <span
                    className={`mt-1 block ${
                      (item.indoorNoiseDb ?? 99) <= 20 ? "text-red-600" : "text-slate-600"
                    }`}
                  >
                    {item.indoorNoiseDb ? `${item.indoorNoiseDb}dB` : "-"}
                  </span>
                </span>
              ))}
            />
            <MatrixRow
              label="清掃機能"
              values={airConditioners.map((item) => (
                <span key={item.id}>
                  <RatingStars value={item.cleaningRating} />
                  <span className="mt-1 block text-xs text-slate-600">
                    {item.hasSelfCleaning ? "自動清掃あり" : "内部クリーン中心"}
                  </span>
                </span>
              ))}
            />
            <MatrixRow
              label="本体価格"
              values={airConditioners.map((item) => (
                <strong key={item.id} className="text-lg text-slate-950">
                  {formatCurrency(item.referencePrice)}
                </strong>
              ))}
            />
            <MatrixRow
              label="特徴"
              values={airConditioners.map((item) => item.features.join(" / "))}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MatrixRow({
  label,
  values
}: {
  label: string;
  values: React.ReactNode[];
}) {
  return (
    <tr>
      <th className="border-r border-t border-slate-200 bg-slate-50 px-5 py-4 text-left font-bold text-slate-900">
        {label}
      </th>
      {values.map((value, index) => (
        <td
          key={`${label}-${index}`}
          className="border-r border-t border-slate-200 px-5 py-4 text-center font-medium text-slate-800"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}
