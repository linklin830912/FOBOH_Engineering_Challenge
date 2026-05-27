import cors from "cors";
import express from "express";
import { brands, categories, segments } from "./mock/Product";
import { AdjustmentIncrementMode, AdjustmentMode, PricingProfile } from "./model/PricingProfile";
import { MOCK_CUSTOMER_GROUPS_STORE, MOCK_CUSTOMERS_STORE, MOCK_PRICING_PROFILES_STORE, MOCK_PRODUCTS_STORE } from "./store/db";
import { CustomerGroup } from "./model/Customer";
import { profile } from "node:console";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/product/filters", (_req, res) => {
  res.json({ status: "ok", service: "backend", value: { categories, segments, brands } });
});

app.get("/api/products", (req, res) => {
  const { title, sku, subCategory, segment, brand } = req.query;

  // example: filter logic (in-memory or DB later)
  const filteredProducts = MOCK_PRODUCTS_STORE.filter((p) => {
    return (
      (!title || p.title.includes(title as string)) &&
      (!sku || p.sku.includes(sku as string)) &&
      (!subCategory || p.subCategory === subCategory) &&
      (!segment || p.segment === segment) &&
      (!brand || p.brand === brand)
    );
  });

  res.json({
    status: "ok",
    value: filteredProducts,
  });
});

app.get("/customer", (req, res) => {
  const { id, name } = req.query;

  const filteredCustomers = MOCK_CUSTOMERS_STORE.filter((customer) => {
    return (
      (!id ||
        customer.id.toLowerCase().includes((id as string).toLowerCase())) &&
      (!name ||
        customer.name
          .toLowerCase()
          .includes((name as string).toLowerCase()))
    );
  });

  res.json({
    status: "ok",
    value: filteredCustomers,
  });
});

app.get("/customergroup", (req, res) => {
  const { id, name } = req.query;
  
  const filteredGroups = MOCK_CUSTOMER_GROUPS_STORE.filter((group) => {
    return (
      (!id ||
        group.id.toLowerCase().includes((id as string).toLowerCase())) &&
      (!name ||
        group.name
          .toLowerCase()
          .includes((name as string).toLowerCase()))
    );
  });

  res.json({
    status: "ok",
    value: filteredGroups,
  });
});



export type PricingProfileRequest = {
  adjustmentMode: AdjustmentMode;
  adjustmentIncrementMode: AdjustmentIncrementMode;
  adjustmentValue: number;

  productIds: string[];
  customerGroupIds: string[];
  customerIds: string[];

  priority: number;
};


app.post("/pricing-profile", (req, res) => {
  const body = req.body;

  const {
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentValue,
    productIds,
    customerGroupIds = [],
    customerIds = [],
    priority,
  } = body;

  // =================================================
  // 1. VALIDATION
  // =================================================
  if (
    !adjustmentMode ||
    !adjustmentIncrementMode ||
    adjustmentValue === undefined ||
    !Array.isArray(productIds)
  ) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request body",
    });
  }

  let finalCustomerGroupIds = [...customerGroupIds];

  // =================================================
  // 2. CREATE CUSTOMER GROUP (IF customerIds EXIST)
  // =================================================
  if (customerIds.length > 0) {
    const newGroup: CustomerGroup = {
      id: `CG_${Date.now()}`,
      name: `Auto Group ${MOCK_CUSTOMER_GROUPS_STORE.length + 1}`,
      customerIds,
      priceProfileIds: [],
    };

    MOCK_CUSTOMER_GROUPS_STORE.push(newGroup);

    // -----------------------------------------
    // sync customers → add groupId
    // -----------------------------------------
    customerIds.forEach((customerId: string) => {
      const customer = MOCK_CUSTOMERS_STORE.find(
        (c) => c.id === customerId
      );

      if (customer) {
        customer.groupIds ??= [];

        if (!customer.groupIds.includes(newGroup.id)) {
          customer.groupIds.push(newGroup.id);
        }
      }
    });

    finalCustomerGroupIds.push(newGroup.id);
  }

  // =================================================
  // 3. CREATE PRICING PROFILE
  // =================================================
  const newProfile = {
    id: `PP_${Date.now()}`,
    name: `Price Profile ${MOCK_PRICING_PROFILES_STORE.length + 1}`,
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentValue,
    productIds,
    customerGroupIds: finalCustomerGroupIds,
    priority: priority ?? 0,
    createdAt: new Date().toISOString(),
  };

  MOCK_PRICING_PROFILES_STORE.push(newProfile);

  // =================================================
  // 4. SYNC BACK → CustomerGroup.priceProfileIds
  // =================================================
  finalCustomerGroupIds.forEach((groupId) => {
    const group = MOCK_CUSTOMER_GROUPS_STORE.find((g) => g.id === groupId);

    if (group) {
      group.priceProfileIds ??= [];

      if (!group.priceProfileIds.includes(newProfile.id)) {
        group.priceProfileIds.push(newProfile.id);
      }
    }
  });

  // =================================================
  // 5. RESPONSE
  // =================================================
  return res.json({
    status: "ok",
    data: MOCK_PRICING_PROFILES_STORE,
    debug: {
      PRICING_PROFILES: MOCK_PRICING_PROFILES_STORE,
      CUSTOMER_GROUPS: MOCK_CUSTOMER_GROUPS_STORE,
      CUSTOMERS: MOCK_CUSTOMERS_STORE,
    },
  });
});



function calculatePrice(
  basePrice: number,
  priceProfile:PricingProfile
) {
  let adjustedPrice = basePrice;
  if (priceProfile.adjustmentMode === "fixed") {
    adjustedPrice = priceProfile.adjustmentIncrementMode === "increase"
      ? basePrice + priceProfile.adjustmentValue
      : basePrice - priceProfile.adjustmentValue;
  } else if (priceProfile.adjustmentMode === "dynamic") {
    const adjustmentAmount = (basePrice * priceProfile.adjustmentValue) / 100;
    adjustedPrice = priceProfile.adjustmentIncrementMode === "increase"
      ? basePrice + adjustmentAmount
      : basePrice - adjustmentAmount;
  }

  adjustedPrice = Math.max(0, adjustedPrice);

  return Number(adjustedPrice.toFixed(2));
}

app.get("/pricing-profile/match", (req, res) => {
  const { customerId, productId } = req.query;

  if (!customerId || !productId) {
    return res.status(400).json({
      status: "error",
      message: "customerId and productId are required",
    });
  }

  // =================================================
  // 1. FIND CUSTOMER
  // =================================================
  const customer = MOCK_CUSTOMERS_STORE.find(
    (c) => c.id === customerId
  );

  if (!customer) {
    return res.status(404).json({
      status: "error",
      message: "Customer not found",
    });
  }

  const customerGroupIds = customer.groupIds ?? [];

  // =================================================
  // 2. FIND PRODUCT
  // =================================================
  const product = MOCK_PRODUCTS_STORE.find(
    (p) => p.id === productId
  );

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  // =================================================
  // 3. MATCH PRICING PROFILES
  // =================================================
  const matchedProfiles = MOCK_PRICING_PROFILES_STORE.filter(
    (profile) => {
      const hasGroupMatch = profile.customerGroupIds?.some((id: string) =>
        customerGroupIds.includes(id)
      );

      const hasProductMatch = profile.productIds?.includes(productId as string);

      return hasGroupMatch && hasProductMatch;
    }
  );

  // =================================================
  // 4. SORT (priority DESC → price ASC)
  // =================================================
  const sorted = matchedProfiles.sort((a, b) => {
  const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);

  if (priorityDiff !== 0) {
    return priorityDiff; // highest priority first
  }

  const priceA = calculatePrice(product.price, a);
  const priceB = calculatePrice(product.price, b);

  // lowest price wins
  return priceA - priceB;
});

  // =================================================
  // 5. BEST MATCH
  // =================================================
  const bestMatch = sorted[0] ?? null;

  // =================================================
  // 6. RESPONSE
  // =================================================
  return res.json({
    status: "ok",
    value: {
      customer,
      product,
      bestMatch,
      newPrice: bestMatch ? calculatePrice(product.price, bestMatch) : product.price,
    },
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
