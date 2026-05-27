import { Customer } from "../model/Customer";
import { PricingProfile } from "../model/PricingProfile";
import { Product } from "../model/Product";

export function calculatePrice(basePrice: number, profile: PricingProfile): number {
  let adjusted = basePrice;

  if (profile.adjustmentMode === "fixed") {
    adjusted = profile.adjustmentIncrementMode === "increase"
      ? basePrice + profile.adjustmentValue
      : basePrice - profile.adjustmentValue;
  } else {
    const amount = (basePrice * profile.adjustmentValue) / 100;
    adjusted = profile.adjustmentIncrementMode === "increase"
      ? basePrice + amount
      : basePrice - amount;
  }

  return Number(Math.max(0, adjusted).toFixed(2));
}

export function resolvePrice(customer: Customer, product: Product, profiles: PricingProfile[]) {
  const customerGroupIds = customer.groupIds ?? [];

  const matched = profiles.filter((profile) => {
    const hasGroupMatch = profile.customerGroupIds?.some((id) =>
      customerGroupIds.includes(id)
    );
    const hasProductMatch = profile.productIds?.includes(product.id);
    return hasGroupMatch && hasProductMatch;
  });

  const sorted = matched.sort((a, b) => {
    const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
    if (priorityDiff !== 0) return priorityDiff;
    return calculatePrice(product.price, a) - calculatePrice(product.price, b);
  });

  const best = sorted[0] ?? null;

  return {
    customer,
    product,
    bestMatch: best,
    newPrice: best ? calculatePrice(product.price, best) : product.price,
  };
}