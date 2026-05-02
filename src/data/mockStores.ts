import type { Store } from "@/types/domain";

export const stores: Store[] = [
  { id: "xprice", name: "XPRICE 楽天市場店", storeType: "ec" },
  { id: "bic", name: "ビックカメラ.com", storeType: "both" },
  { id: "amazon", name: "Amazon 公式ストア", storeType: "ec" },
  { id: "yamada", name: "ヤマダデンキ 楽天市場店", storeType: "both" },
  { id: "kojima", name: "コジマ 楽天市場店", storeType: "both" },
  { id: "yodobashi", name: "ヨドバシカメラ", storeType: "both" },
  { id: "joshin", name: "Joshin web", storeType: "both" }
];
