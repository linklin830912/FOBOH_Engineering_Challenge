import { Router } from "express";
import { MOCK_PRODUCTS_STORE } from "../store/db";
import { brands, categories, segments } from "../mock/Product";

const router = Router();

/**
 * @swagger
 * /api/product/filters:
 *   get:
 *     summary: Get all product filters (categories, segments, brands)
 *     responses:
 *       200:
 *         description: Filter options
 */
router.get("/product/filters", (_req, res) => {
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

export default router;