import { useState } from "react";
import ProductScopeSelector, { ProductScope } from "./ProductScopeSelector";
import ProductSearchSection, { FilterOptions, ProductFilters } from "./ProductSearchSection";
import ProductPicker from "./ProductPicker";
import { Product } from "../../../../type/Pricing";

interface SetupPriceProfileSectionAccordionProps { 
  productScope: ProductScope;
  setProductScope: (scope: ProductScope) => void;
  productFilters: ProductFilters;
  setProductFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
  products: Product[];
  filters: FilterOptions;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
export default function SetupPriceProfileSectionAccordion({
  productFilters, setProductFilters, products, filters, selectedProducts, setSelectedProducts,productScope,setProductScope }: SetupPriceProfileSectionAccordionProps) {
  
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
      {
        productScope === "all" && <div className="text-sm text-[#637381]">
          You've selected All Products, these will be added to the Price Profile.
        </div>
      }
      {productScope!=="all" &&<>
      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <ProductSearchSection productFilters={productFilters} setProductFilters={setProductFilters} filters={filters}/>
      </div>
      <div className="flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
          <ProductPicker
            productScope={productScope}
            products={products}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />      
        </div>
      </>}
    </div>
  );
}