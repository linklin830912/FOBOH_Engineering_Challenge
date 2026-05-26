import { useState } from "react";
import ProductScopeSelector, { ProductScope } from "./ProductScopeSelector";
import ProductSearchSection, { ProductFilters } from "./ProductSearchSection";
import ProductSelectList from "./ProductSelectList";
import ProductPicker from "./ProductPicker";

type Product = {
  id: string;
  name: string;
  sku: string;
};
// Mock data (replace with API later)
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Nike Air Max", sku: "NIKE-001" },
  { id: "2", name: "Adidas Ultraboost", sku: "ADID-002" },
  { id: "3", name: "Puma Runner", sku: "PUMA-003" },
  { id: "4", name: "Reebok Classic", sku: "REEB-004" },
];
export default function SetupPriceProfileSectionAccordion() {

  const [productScope, setProductScope] = useState<ProductScope>("all");
  const [filters, setFilters] = useState<ProductFilters>({
    name: "",
    sku: "",
    category: "",
    segment: "",
    brand: "",
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  
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
        <ProductSearchSection value={filters} onChange={setFilters} />
      </div>
      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <ProductPicker
          products={MOCK_PRODUCTS}
        />
      </div>
    </div>
  );
}