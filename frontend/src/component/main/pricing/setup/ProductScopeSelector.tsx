export type ProductScope = "all" | "one" | "multiple";

interface ProductScopeSelectorProps {
  value: ProductScope;
  onChange: (value: ProductScope) => void;
}

export default function ProductScopeSelector({
  value,
  onChange,
}: ProductScopeSelectorProps) {
    return (
        <div className="flex flex-col gap-3">
            <div
          className="w-full text-sm text-[#637381] bg-transparent outline-none"
          defaultValue="Accordion details..."
          >
              You are creating a Pricing Profile for
        </div>
    <div className="flex w-[409px] h-[50px] flex-row items-start gap-[26px] p-0">
   
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="productScope"
          value="one"
          checked={value === "one"}
          onChange={() => onChange("one")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">One Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="productScope"
          value="multiple"
          checked={value === "multiple"}
          onChange={() => onChange("multiple")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">Multiple Products</span>
                </label>
                
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="productScope"
          value="all"
          checked={value === "all"}
          onChange={() => onChange("all")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">All Products</span>
      </label>
            
    </div>
    </div>
      
  );
}
        