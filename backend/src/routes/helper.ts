import { CustomerGroup } from "../model/Customer";
import { AdjustmentIncrementMode, AdjustmentMode, PricingProfile } from "../model/PricingProfile";
import { MOCK_CUSTOMER_GROUPS_STORE, MOCK_CUSTOMERS_STORE, MOCK_PRICING_PROFILES_STORE } from "../store/db";

export function createPricingProfile(data: {
  adjustmentMode: AdjustmentMode;
  adjustmentIncrementMode: AdjustmentIncrementMode;
  adjustmentValue: number;
  productIds: string[];
  customerGroupIds?: string[];
  customerIds: string[];
  priority: number;
  allProducts: boolean;
  name: string;
}) {
  let finalCustomerGroupIds = [
    ...(data.customerGroupIds || []),
    ];
    
  if ((data.customerIds || []).length > 0) {
    const newGroup: CustomerGroup = {
      id: `CG_${Date.now()}`,
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
    name: data.name ||
      `Price Profile ${
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