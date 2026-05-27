import cors from "cors";
import express from "express";
import MOCK_PRODUCTS, { brands, categories, segments } from "./mock/Product";
import { MOCK_CUSTOMER_GROUPS, MOCK_CUSTOMERS } from "./mock/Customer";

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
  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
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

  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
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
console.log("Filtering customer groups with id:", id, "name:", name, "result:");
  const filteredGroups = MOCK_CUSTOMER_GROUPS.filter((group) => {
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
