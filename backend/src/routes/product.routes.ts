import { Router } from "express";
import { MOCK_PRODUCTS_STORE } from "../store/db";
import { brands, categories, segments } from "../mock/Product";

const router = Router();

/**
 * @swagger
 * /api/product-filters:
 *   get:
 *     summary: Get all filters values for categories, segments, brands
 *     responses:
 *       200:
 *         description: Filter options
 */
router.get("/product-filters", (_req, res) => {
  res.json({
    status: "ok",
    value: { categories, segments, brands },
  });
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with optional filters
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: sku
 *         schema:
 *           type: string
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *       - in: query
 *         name: segment
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/products", (req, res) => {
  const { title, sku, subCategory, segment, brand } = req.query;

  const filteredProducts = MOCK_PRODUCTS_STORE.filter((p) => {
    return (
      (!title ||
        p.title.toLowerCase().includes((title as string).toLowerCase())) &&
      (!sku || p.sku.toLowerCase().includes((sku as string).toLowerCase())) &&
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

/**
 * @swagger
 * /api/products/{id}/price:
 *   patch:
 *     summary: Update product price by product ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *                 example: 120
 *     responses:
 *       200:
 *         description: Product price updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 value:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: P_1
 *                     title:
 *                       type: string
 *                       example: Wine A
 *                     price:
 *                       type: number
 *                       example: 120
 *       400:
 *         description: Invalid request body or parameters
 *       404:
 *         description: Product not found
 */
router.patch("/products/:id/price", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  // 1. Validate input
  if (!id || typeof id !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Invalid product id",
    });
  }

  if (price === undefined || typeof price !== "number" || price < 0) {
    return res.status(400).json({
      status: "error",
      message: "Invalid price value",
    });
  }

  // 2. Find product
  const productIndex = MOCK_PRODUCTS_STORE.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  // 3. Update product (immutable-style safe update)
  const updatedProduct = {
    ...MOCK_PRODUCTS_STORE[productIndex],
    price,
  };

  MOCK_PRODUCTS_STORE[productIndex] = updatedProduct;

  // 4. Return response
  return res.status(200).json({
    status: "ok",
    value: updatedProduct,
    debug: {
      allProducts: MOCK_PRODUCTS_STORE,
    },
  });
});


export default router;