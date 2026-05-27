import cors from "cors";
import express from "express";
import { brands, categories, segments } from "./mock/Product";
import { AdjustmentIncrementMode, AdjustmentMode, PricingProfile } from "./model/PricingProfile";
import { MOCK_CUSTOMER_GROUPS_STORE, MOCK_CUSTOMERS_STORE, MOCK_PRICING_PROFILES_STORE, MOCK_PRODUCTS_STORE } from "./store/db";
import { CustomerGroup } from "./model/Customer";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import routes from "./routes";



const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/api", routes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
