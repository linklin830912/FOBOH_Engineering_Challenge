import AdjustmentModeSelector from "./AdjustmentModeSelector";
import AdjustmentIncrementModeSelector from "./AdjustmentIncrementModeSelector";
import BasedOnSelector from "./BasedOnSelector";
import AdjustedPriceInfo from "./AdjustedPriceInfo";
import NewPriceTable from "./NewPriceTable";
import { Product } from "../../../../type/Pricing";

interface CalculatePriceProfileSectionAccordionProps {
  selectedProducts: Product[];
}
export default function CalculatePriceProfileSectionAccordion({ selectedProducts }: CalculatePriceProfileSectionAccordionProps) {

  
  
  
  return (
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px]">

      <BasedOnSelector/>

      <div className="w-full flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <AdjustmentModeSelector value={"fixed"} onChange={(mode) => console.log("Selected mode:", mode)} />
        <AdjustmentIncrementModeSelector value={"increase"} onChange={(mode) => console.log("Selected increment mode:", mode)} />
        <AdjustedPriceInfo />
        <NewPriceTable
          selectedProducts={selectedProducts}
          onToggleRow={(rowId) => console.log("Toggled row:", rowId)}
          onRefresh={() => console.log("Refreshed table")} />
      </div>
    </div>
  );
}