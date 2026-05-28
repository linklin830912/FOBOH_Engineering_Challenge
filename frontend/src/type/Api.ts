import { AdjustmentIncrementMode } from "../component/main/pricing/calculate/AdjustmentIncrementModeSelector";
import { AdjustmentMode } from "../component/main/pricing/calculate/AdjustmentModeSelector";
import { Customer, PricingProfile, Product } from "./Pricing";

export type CreatePricingProfileRequest = {
    adjustmentMode: AdjustmentMode;
    adjustmentIncrementMode: AdjustmentIncrementMode;
    adjustmentValue: number;

    productIds: string[];
    customerGroupIds: string[];
    customerIds: string[];
    allProducts: boolean;
    priority: number;
};

export type UpdateProductPriceRequest = CreatePricingProfileRequest & { id: string };

export type GetPricingProfileMatchRequest = {
    customerId: string;
    productId: string;
};

export type GetPricingProfileMatchResponse = {
    bestMatch: PricingProfile,
    customer: Customer,
    product: Product,
    newPrice: number,
}