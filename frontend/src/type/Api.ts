import { AdjustmentIncrementMode } from "../component/main/pricing/calculate/AdjustmentIncrementModeSelector";
import { AdjustmentMode } from "../component/main/pricing/calculate/AdjustmentModeSelector";

export type CreatePricingProfileRequest = {
  adjustmentMode: AdjustmentMode;
  adjustmentIncrementMode: AdjustmentIncrementMode;
  adjustmentValue: number;

  productIds: string[];
  customerGroupIds: string[];
  customerIds: string[];

  priority: number;
};

export type UpdateProductPriceRequest = CreatePricingProfileRequest & {id: string};