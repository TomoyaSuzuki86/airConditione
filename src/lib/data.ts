import { airConditioners } from "@/data/mockAirConditioners";
import { bundles } from "@/data/mockBundles";
import { campaigns } from "@/data/mockCampaigns";
import { stores } from "@/data/mockStores";

export const getAirConditioners = () => airConditioners;
export const getStores = () => stores;
export const getCampaigns = () => campaigns;
export const getBundles = () => bundles;

export const getAirConditionerById = (id: string) =>
  airConditioners.find((airConditioner) => airConditioner.id === id);

export const getStoreById = (id: string) => stores.find((store) => store.id === id);

export const getCampaignById = (id?: string) =>
  id ? campaigns.find((campaign) => campaign.id === id) : undefined;
