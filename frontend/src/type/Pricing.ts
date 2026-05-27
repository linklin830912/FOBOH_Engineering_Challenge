import { AdjustmentIncrementMode } from "../component/main/pricing/calculate/AdjustmentIncrementModeSelector";
import { AdjustmentMode } from "../component/main/pricing/calculate/AdjustmentModeSelector";

export type PricingProfile = {
  id: string;
  name: string;

  adjustmentMode: AdjustmentMode;
  adjustmentIncrementMode: AdjustmentIncrementMode;
  adjustmentValue: number;
  customerGroupIds: string[];
  productIds: string[];

  priority: number;
  isActive: boolean;

  createdAt: Date;
  updatedAt?: Date;
};

export type Product = {
  id: string;
  title: string;
  sku: string;
  brand: string;
  subCategory: string;
  segment: string;
  price: number;
};

export type Customer = {
  id: string;
  name: string;
  groupIds?: string[];
};

export type CustomerGroup = {
  id: string;
  name: string;
  customerIds: string[];
  priceProfileIds?: string[];
};