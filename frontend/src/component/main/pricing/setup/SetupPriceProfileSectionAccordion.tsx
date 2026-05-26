import { useEffect, useState } from "react";
import ProductScopeSelector, { ProductScope } from "./ProductScopeSelector";
import ProductSearchSection, { ProductFilters } from "./ProductSearchSection";
import ProductPicker from "./ProductPicker";
import { Product } from "../../../../type/Pricing";
import { getProducts } from "../../../../api/getProducts";

export default function SetupPriceProfileSectionAccordion() {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
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
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>
    </div>
  );
}