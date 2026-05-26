export type AdjustmentIncrementMode = "increase" | "decrease";

interface AdjustmentIncrementModeSelectorProps {
  value: AdjustmentIncrementMode;
  onChange: (value: AdjustmentIncrementMode) => void;
}

export default function AdjustmentIncrementModeSelector({
  value,
  onChange,
}: AdjustmentIncrementModeSelectorProps) {
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
          name="adjustmentIncrementMode"
          value="increase"
          checked={value === "increase"}
          onChange={() => onChange("increase")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">Increase +</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="adjustmentIncrementMode"
          value="decrease"
          checked={value === "decrease"}
          onChange={() => onChange("decrease")}
          className="accent-[#147D73]"
        />
        <span className="text-sm text-[#212B36]">Decrease -</span>
    </label>  
            
    </div>
    </div>
      
  );
}
        