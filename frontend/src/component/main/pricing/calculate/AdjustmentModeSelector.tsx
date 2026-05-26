export type AdjustmentMode = "fixed" | "dynamic";

interface AdjustmentModeSelectorProps {
  value: AdjustmentMode;
  onChange: (value: AdjustmentMode) => void;
}

export default function AdjustmentModeSelector({
  value,
  onChange,
}: AdjustmentModeSelectorProps) {
    return (
        <div className="flex flex-col gap-3">
            <div
          className="w-full text-sm text-[#637381] bg-transparent outline-none"
          defaultValue="Accordion details..."
          >
              Set Price Adjustment Mode 
        </div>
    <div className="flex w-[409px] h-[50px] flex-row items-start gap-[26px] p-0">
   
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="productScope"
          value="fixed"
          checked={value === "fixed"}
          onChange={() => onChange("fixed")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">Fixed ($)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="productScope"
          value="dynamic"
          checked={value === "dynamic"}
          onChange={() => onChange("dynamic")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">Dynamic (%)</span>
    </label>  
            
    </div>
    </div>
      
  );
}
        