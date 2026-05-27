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
import { createPricingProfile, deletePricingProfile } from "./helper";

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
    allProducts,
    name,
  } = req.body;
  // Validation
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

  const newProfile = createPricingProfile({
    adjustmentMode,
    adjustmentIncrementMode,
    adjustmentValue,
    productIds,
    customerGroupIds,
    customerIds,
    priority,
    allProducts,
    name,
  });

  return res.status(201).json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
    debug: {
      result: newProfile,
      customers: MOCK_CUSTOMERS_STORE,
      customerGroups: MOCK_CUSTOMER_GROUPS_STORE,
      pricingProfiles: MOCK_PRICING_PROFILES_STORE,
    }
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

  // VALIDATION
  if (!id || typeof id !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Invalid or missing pricing profile id",
    });
  }

  const deletedProfile = deletePricingProfile(id);

  if (!deletedProfile) {
    return res.status(404).json({
      status: "error",
      message: "Pricing profile not found",
    });
  }

  return res.status(200).json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
    debug: {
      result: deletedProfile,
      customers: MOCK_CUSTOMERS_STORE,
      customerGroups: MOCK_CUSTOMER_GROUPS_STORE,
      pricingProfiles: MOCK_PRICING_PROFILES_STORE,
    },
  });
});

/**
 * @swagger
 * /pricing-profile:
 *   put:
 *     summary: Update a pricing profile
 *     tags: [Pricing Profile]
 *     description: >
 *       Updates an existing pricing profile and synchronizes related customer group relationships.
 *       Only changed fields are overwritten.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "pricing-profile-1"
 *
 *               name:
 *                 type: string
 *                 example: "VIP Discount"
 *
 *               adjustmentMode:
 *                 type: string
 *                 example: "FIXED"
 *
 *               adjustmentIncrementMode:
 *                 type: string
 *                 example: "INCREASE"
 *
 *               adjustmentValue:
 *                 type: number
 *                 example: 10
 *
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *               customerGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *               priority:
 *                 type: number
 *                 example: 1
 *
 *               isActive:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Pricing profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *
 *                 value:
 *                   $ref: '#/components/schemas/PricingProfile'
 *
 *       400:
 *         description: Invalid request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *
 *                 message:
 *                   type: string
 *                   example: Pricing profile id is required
 *
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
 *
 *                 message:
 *                   type: string
 *                   example: Pricing profile not found
 */
router.put("/pricing-profile", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Pricing profile id is required",
    });
  }

  const existingProfile = MOCK_PRICING_PROFILES_STORE.find(
    (p) => p.id === id
  );

  if (!existingProfile) {
    return res.status(404).json({
      status: "error",
      message: "Pricing profile not found",
    });
  }

  // preserve createdAt
  const createdAt = existingProfile.createdAt;

  // remove old state
  deletePricingProfile(id);

  // rebuild fresh state
  const newProfile = createPricingProfile({
    ...req.body,
    id,
    createdAt,
  });

  return res.status(200).json({
    status: "ok",
    value: MOCK_PRICING_PROFILES_STORE,
    debug: {
      customers: MOCK_CUSTOMERS_STORE,
      customerGroups: MOCK_CUSTOMER_GROUPS_STORE,
      pricingProfiles: MOCK_PRICING_PROFILES_STORE,
    }
  });
});

export default router;