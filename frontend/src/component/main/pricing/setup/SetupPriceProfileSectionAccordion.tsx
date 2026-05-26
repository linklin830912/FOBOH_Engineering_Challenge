import { useEffect, useState } from "react";
import ProductScopeSelector, { ProductScope } from "./ProductScopeSelector";
import ProductSearchSection, { ProductFilters } from "./ProductSearchSection";
import ProductPicker from "./ProductPicker";
import { Product } from "../../../../type/Pricing";
import { getProducts } from "../../../../api/getProducts";

// Mock data (replace with API later)
const MOCK_PRODUCTS: Product[] = [
  { id: "1", title: "Nike Air Max", sku: "NIKE-001", brand: "Nike", subCategory: "Running", segment: "Men", price: 129.99 },
  { id: "2", title: "Adidas Ultraboost", sku: "ADID-002", brand: "Adidas", subCategory: "Running", segment: "Women", price: 149.99 },
  { id: "3", title: "Puma Runner", sku: "PUMA-003", brand: "Puma", subCategory: "Running", segment: "Unisex", price: 99.99 },
  { id: "4", title: "Reebok Classic", sku: "REEB-004", brand: "Reebok", subCategory: "Training", segment: "Men", price: 89.99 },
];
export default function SetupPriceProfileSectionAccordion() {

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [productScope, setProductScope] = useState<ProductScope>("all");
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    title: "",
    sku: "",  
    subCategory: "",
    segment: "",
    brand: "",
  });

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
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px]">
      {/* Header row */}
      <div className="flex w-full items-center justify-between">
        <input
          className="text-base font-semibold text-[#212B36] bg-transparent outline-none"
          defaultValue="Set Product Pricing"
        />

        <button className="text-sm font-medium text-[#147D73]">
          Expand
        </button>
      </div>

      <div className="flex flex-col justify-center items-start gap-[6px] p-0">
        <input
          className="w-full text-sm text-[#637381] bg-transparent outline-none"
          defaultValue="Accordion details..."
        />
      </div>

      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <ProductScopeSelector value={productScope} onChange={setProductScope} />
      </div>
      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <ProductSearchSection productFilters={productFilters} setProductFilters={setProductFilters} />
      </div>
      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <ProductPicker
          products={products}
          selectedIds={selectedProductIds}
          setSelectedIds={setSelectedProductIds}
        />
      </div>
    </div>
  );
}