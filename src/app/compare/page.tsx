import { AirConditionerMatrix } from "@/components/AirConditionerMatrix";
import { getAirConditioners } from "@/lib/data";

export default function ComparePage() {
  return (
    <main>
      <AirConditionerMatrix airConditioners={getAirConditioners()} />
      <div className="mx-auto max-w-[1500px] px-4 pb-8 text-xs leading-6 text-slate-500 sm:px-8">
        <p>※価格・キャンペーン情報は参考情報です。購入前に必ず販売サイト・店舗で最新情報をご確認ください。</p>
        <p>※工事費・撤去費用の条件は販売店や設置状況により異なる場合があります。</p>
      </div>
    </main>
  );
}
