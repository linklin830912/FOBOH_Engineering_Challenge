import { Router } from "express";
import { MOCK_CUSTOMERS_STORE, MOCK_CUSTOMER_GROUPS_STORE } from "../store/db";

const router = Router();

/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary: Get all customers
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/customer", (req, res) => {
  const { id, name } = req.query;

  const filteredCustomers = MOCK_CUSTOMERS_STORE.filter((customer) => {
    return (
      (!id ||
        customer.id.toLowerCase().includes((id as string).toLowerCase())) &&
      (!name ||
        customer.name.toLowerCase().includes((name as string).toLowerCase()))
    );
  });

  res.json({
    status: "ok",
    value: filteredCustomers,
  });
});

/**
 * @swagger
 * /api/customergroup:
 *   get:
 *     summary: Get all customer groups
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:            
 *           type: string
 *     responses:
 *       200:
 *         description: List of customer groups
 */
router.get("/customergroup", (req, res) => {
  const { id, name } = req.query;

  const filteredGroups = MOCK_CUSTOMER_GROUPS_STORE.filter((group) => {
    return (
      (!id ||
        group.id.toLowerCase().includes((id as string).toLowerCase())) &&
      (!name ||
        group.name.toLowerCase().includes((name as string).toLowerCase()))
    );
  });

  res.json({
    status: "ok",
    value: filteredGroups,
  });
});

export default router;