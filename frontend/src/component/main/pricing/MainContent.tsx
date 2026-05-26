import { useEffect, useState } from "react";
import PriceProfileHeader from "./PriceProfileHeader";
import PriceProfileSectionAccordion from "./PriceProfileSectionAccordion";
import SetupPriceProfileSectionAccordion from "./setup/SetupPriceProfileSectionAccordion";
import { FilterOptions, ProductFilters } from "./setup/ProductSearchSection";
import { getProducts } from "../../../api/getProducts";
import { Product } from "../../../type/Pricing";
import { getProductFilters } from "../../../api/getProductFilters";
import CalculatePriceProfileSectionAccordion from "./calculate/CaculatePriceProfileSectionAccordion";

export default function MainContent() {

  const [products, setProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    title: "",
    sku: "",  
    subCategory: "",
    segment: "",
    brand: "",
  });
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadFilters() {
      try {
        const data = await getProductFilters();
        console.log("Received filters in component:", data.categories);
        setFilters(data);
      } catch (err) {
        console.error("Error loading filters:", err);
      } 
    }
    loadFilters();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try { 
        const data = await getProducts(productFilters);
        console.log("Fetched products with filters",  data);
        setProducts(data);
      } catch (err) { 
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [productFilters]);
  
  return (
    <main className="min-h-[calc(100vh-82px)] bg-[#F9FBFC] p-8">
      <div className="mx-auto w-full max-w-[1116px]">
        {/* Header */}
        <PriceProfileHeader />

        {/* Section 1 */}
        <div className="mt-4">
          <PriceProfileSectionAccordion />
        </div>

        {/* Section 2 */}
        <div className="mt-4">
          {filters && <SetupPriceProfileSectionAccordion
            products={products}
            setProductFilters={setProductFilters}
            productFilters={productFilters}
            filters={filters}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />}

          <CalculatePriceProfileSectionAccordion selectedProducts={selectedProducts} />
        </div>
      </div>
    </main>
  );
}