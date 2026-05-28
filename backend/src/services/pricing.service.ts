import { Customer, CustomerGroup } from "../model/Customer";
import { Product } from "../model/Product";
import { AdjustmentIncrementMode, AdjustmentMode, PricingProfile } from "../model/PricingProfile";
import { MOCK_CUSTOMER_GROUPS_STORE, MOCK_CUSTOMERS_STORE, MOCK_PRICING_PROFILES_STORE } from "../store/db";


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
  } as GetPricingProfileMatchResponse;
}

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


export function createPricingProfile(data: CreatePricingProfileRequest, autoCustomerGroupId?: string): PricingProfile {
  let finalCustomerGroupIds = [
    ...(data.customerGroupIds || []),
    ];

  if ((data.customerIds || []).length > 0) {
    const newGroup: CustomerGroup = {
      id: autoCustomerGroupId ?? `CG_${Date.now()}`,
      name: `Auto Group ${
        MOCK_CUSTOMER_GROUPS_STORE.length + 1
      }`,
      customerIds: data.customerIds || [],
      type: "auto",
      priceProfileIds: [],
    };

    MOCK_CUSTOMER_GROUPS_STORE.push(newGroup);

    // sync customer.groupIds
    newGroup.customerIds.forEach((customerId:string) => {
      const customer = MOCK_CUSTOMERS_STORE.find(
        (c) => c.id === customerId
      );

      if (!customer) return;

      customer.groupIds ??= [];

      if (!customer.groupIds.includes(newGroup.id)) {
        customer.groupIds.push(newGroup.id);
      }
    });

    finalCustomerGroupIds.push(newGroup.id);
  }

  const newProfile: PricingProfile = {
    id: `PP_${Date.now()}`,
    name: `Price Profile ${
        MOCK_PRICING_PROFILES_STORE.length + 1
      }`,
    adjustmentMode: data.adjustmentMode,
    adjustmentIncrementMode:
    data.adjustmentIncrementMode,
    adjustmentValue: data.adjustmentValue,
    productIds: data.productIds,
    customerGroupIds: finalCustomerGroupIds,
    priority: data.priority ?? 0,
    allProducts: data.allProducts ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  MOCK_PRICING_PROFILES_STORE.push(newProfile);

  finalCustomerGroupIds.forEach((groupId) => {
    const group = MOCK_CUSTOMER_GROUPS_STORE.find(
      (g) => g.id === groupId
    );

    if (!group) return;

    group.priceProfileIds ??= [];

    if (!group.priceProfileIds.includes(newProfile.id)) {
      group.priceProfileIds.push(newProfile.id);
    }
  });

  return newProfile;
}

export function deletePricingProfile(id: string) {
  const profileIndex = MOCK_PRICING_PROFILES_STORE.findIndex(
    (p) => p.id === id
  );

  if (profileIndex === -1) {
    return null;
  }

  const [deletedProfile] =
        MOCK_PRICING_PROFILES_STORE.splice(profileIndex, 1);
    
    if (!deletedProfile) {
        return null;
    }

  const relatedGroupIds =
    deletedProfile.customerGroupIds || [];

  const groupsToDelete: string[] = [];

  MOCK_CUSTOMER_GROUPS_STORE.forEach((group) => {
    if (!relatedGroupIds.includes(group.id)) return;

    // remove profile relation
    group.priceProfileIds = (
      group.priceProfileIds || []
    ).filter((pid:string) => pid !== id);

    // remove auto group relations
    if (group.type === "auto") {
      groupsToDelete.push(group.id);

      group.customerIds.forEach((customerId:string) => {
        const customer = MOCK_CUSTOMERS_STORE.find(
          (c) => c.id === customerId
        );

        if (!customer) return;

        customer.groupIds = (
          customer.groupIds || []
        ).filter((gid:string) => gid !== group.id);
      });
    }
  });


  // REMOVE AUTO GROUPS
  groupsToDelete.forEach((groupId) => {
    const index = MOCK_CUSTOMER_GROUPS_STORE.findIndex(
      (g) => g.id === groupId
    );

    if (index !== -1) {
      MOCK_CUSTOMER_GROUPS_STORE.splice(index, 1);
    }
  });

  return deletedProfile;
}