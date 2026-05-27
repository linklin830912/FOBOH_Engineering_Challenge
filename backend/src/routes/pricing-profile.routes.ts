import { Router } from "express";
import {
  MOCK_CUSTOMERS_STORE,
  MOCK_CUSTOMER_GROUPS_STORE,
  MOCK_PRICING_PROFILES_STORE,
  MOCK_PRODUCTS_STORE,
} from "../store/db";
import { CustomerGroup } from "../model/Customer";
import { PricingProfile } from "../model/PricingProfile";
import { calculatePrice, resolvePrice } from "../services/pricing.service";

const router = Router();

/**
 * @swagger
 * /api/pricing-profile:
 *   get:
 *     summary: Get all pricing profiles
 *     responses:
 *       200:
 *         description: List of pricing profiles
 */
router.get("/pricing-profile", (_req, res) => {
  res.json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
  });
});

/**
 * @swagger
 * /api/pricing-profile:
 *   post:
 *     summary: Create a new pricing profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adjustmentMode
 *               - adjustmentIncrementMode
 *               - adjustmentValue
 *               - productIds
 *             properties:
 *               adjustmentMode:
 *                 type: string
 *                 enum: [fixed, dynamic]
 *               adjustmentIncrementMode:
 *                 type: string
 *                 enum: [increase, decrease]
 *               adjustmentValue:
 *                 type: number
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               customerGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               customerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               priority:
 *                 type: number
 *     responses:
 *       200:
 *         description: Created pricing profile
 *       400:
 *         description: Invalid request body
 */
router.post("/pricing-profile", (req, res) => {
  const {
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentValue,
    productIds,
    customerGroupIds = [],
    customerIds = [],
    priority,
  } = req.body;

  // 1. VALIDATION
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

  // 2. CREATE CUSTOMER GROUP (IF customerIds EXIST)
  if (customerIds.length > 0) {
    const newGroup: CustomerGroup = {
      id: `CG_${Date.now()}`,
      name: `Auto Group ${MOCK_CUSTOMER_GROUPS_STORE.length + 1}`,
      customerIds,
      type: "auto",
      priceProfileIds: [],
    };

    MOCK_CUSTOMER_GROUPS_STORE.push(newGroup);

    customerIds.forEach((customerId: string) => {
      const customer = MOCK_CUSTOMERS_STORE.find((c) => c.id === customerId);
      if (customer) {
        customer.groupIds ??= [];
        if (!customer.groupIds.includes(newGroup.id)) {
          customer.groupIds.push(newGroup.id);
        }
      }
    });

    finalCustomerGroupIds.push(newGroup.id);
  }

  // 3. CREATE PRICING PROFILE
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

  // 4. SYNC BACK → CustomerGroup.priceProfileIds
  finalCustomerGroupIds.forEach((groupId: string) => {
    const group = MOCK_CUSTOMER_GROUPS_STORE.find((g) => g.id === groupId);
    if (group) {
      group.priceProfileIds ??= [];
      if (!group.priceProfileIds.includes(newProfile.id)) {
        group.priceProfileIds.push(newProfile.id);
      }
    }
  });

  return res.json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
  });
});

/**
 * @swagger
 * /api/pricing-profile/match:
 *   get:
 *     summary: Resolve the best price for a customer + product
 *     parameters:
 *       - in: query
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resolved price with source profile and reason
 *       400:
 *         description: Missing customerId or productId
 *       404:
 *         description: Customer or product not found
 */
router.get("/pricing-profile/match", (req, res) => {
  const { customerId, productId } = req.query;

  if (!customerId || !productId) {
    return res.status(400).json({
      status: "error",
      message: "customerId and productId are required",
    });
  }

  const customer = MOCK_CUSTOMERS_STORE.find((c) => c.id === customerId);
  if (!customer) {
    return res.status(404).json({ status: "error", message: "Customer not found" });
  }

  const product = MOCK_PRODUCTS_STORE.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ status: "error", message: "Product not found" });
  }

  const result = resolvePrice(customer, product, MOCK_PRICING_PROFILES_STORE);

  return res.json({
    status: "ok",
    value: result,
  });
});


/**
 * @swagger
 * /api/pricing-profile/:id:
 *   delete:
 *     summary: Delete a pricing profile by ID
 *     tags: [Pricing Profile]
 *     description: Removes a pricing profile from the in-memory store by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the pricing profile to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Pricing profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 value:
 *                   $ref: '#/components/schemas/PricingProfile'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid id format. Expected UUID
 *       404:
 *         description: Pricing profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Pricing profile not found
 */
router.delete("/pricing-profile/:id", (req, res) => {
  const { id } = req.params;

  // 1. Validate id
  if (!id || typeof id !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Invalid or missing pricing profile id",
    });
  }

  // 2. Find pricing profile
  const profileIndex = MOCK_PRICING_PROFILES_STORE.findIndex(
    (p) => p.id === id
  );

  if (profileIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Pricing profile not found",
    });
  }

  const [deletedProfile] = MOCK_PRICING_PROFILES_STORE.splice(profileIndex, 1);

  const relatedGroupIds = deletedProfile.customerGroupIds || [];

  const groupsToDelete: string[] = [];

  // 3. Update groups (NO reassignment, safe mutation)
  MOCK_CUSTOMER_GROUPS_STORE.forEach((group) => {
    if (!relatedGroupIds.includes(group.id)) return;

    // remove pricing profile link
    group.priceProfileIds = (group.priceProfileIds || []).filter(
      (pid: string) => pid !== id
    );

    // ONLY for auto groups → cascade + mark for deletion
    if (group.type === "auto") {
      groupsToDelete.push(group.id);

      group.customerIds.forEach((customerId: string) => {
        const customer = MOCK_CUSTOMERS_STORE.find(
          (c) => c.id === customerId
        );

        if (!customer) return;

        customer.groupIds = (customer.groupIds || []).filter(
          (gid: string) => gid !== group.id
        );
      });
    }
  });

  // 4. Remove auto groups from store
  groupsToDelete.forEach((groupId) => {
    const index = MOCK_CUSTOMER_GROUPS_STORE.findIndex(
      (g) => g.id === groupId
    );

    if (index !== -1) {
      MOCK_CUSTOMER_GROUPS_STORE.splice(index, 1);
    }
  });

  // 5. Response
  return res.status(200).json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
    debug: {
      customers: MOCK_CUSTOMERS_STORE,
      customerGroups: MOCK_CUSTOMER_GROUPS_STORE,
      pricingProfiles: MOCK_PRICING_PROFILES_STORE,
    },
  });
});

export default router;