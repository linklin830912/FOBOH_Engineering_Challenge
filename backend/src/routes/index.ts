import { Router } from "express";
import customerRouter from "./customer.routes";
import productRouter from "./product.routes";
import pricingProfileRouter from "./pricing-profile.routes";

const router = Router();

router.use(customerRouter);
router.use(productRouter);
router.use(pricingProfileRouter);

export default router; 