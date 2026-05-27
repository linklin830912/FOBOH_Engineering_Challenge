export type AdjustmentMode = "fixed" | "dynamic";
export type AdjustmentIncrementMode = "increase" | "decrease";

export type PricingProfile = {
  id: string;
  name: string;

  adjustmentMode: AdjustmentMode;
  adjustmentIncrementMode: AdjustmentIncrementMode;
  adjustmentValue: number;
  customerGroupIds: string[];
  productIds: string[];

  priority: number;
  allProducts?: boolean;

  createdAt: Date;
  updatedAt: Date;
};