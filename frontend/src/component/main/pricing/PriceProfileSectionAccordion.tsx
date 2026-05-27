import { useState } from "react";
import { PricingProfile} from "../../../type/Pricing";

interface PriceProfileSectionAccordionProps { 
  priceProfile: PricingProfile;
  handlePriceProfileDelete: (id: string) => void;
}
export default function PriceProfileSectionAccordion({ priceProfile, handlePriceProfileDelete }: PriceProfileSectionAccordionProps) {  

  return (
  <div className="flex w-full flex-col items-start gap-[16px] rounded-lg bg-white p-[26px] overflow-hidden">

    {/* Header */}
    <div className="flex w-full items-center justify-between gap-[12px]">

      <input
        className="w-full bg-transparent outline-none text-base font-semibold text-[#212B36]"
        value={priceProfile.name}
        readOnly
      />

      <div className="flex items-center gap-[10px] shrink-0">

        <button
          onClick={() => handlePriceProfileDelete(priceProfile.id)}
          className="text-sm font-medium text-black-600 hover:underline"
        >
          Delete
        </button>

      </div>
    </div>

    {/* Products */}
    <div className="flex flex-col gap-[6px]">
      <div className="text-sm text-[#637381]">
        You've selected{" "}
        <span className="font-medium text-[#212B36]">
          {priceProfile.productIds.length}
        </span>{" "}
        Products
      </div>
    </div>

    {/* Price summary */}
    <div className="text-xs font-normal text-[#637381] leading-[18px] w-full max-w-[345px]">
      With Price Adjustment Mode set to{" "}
      <span className="font-semibold text-[#212B36]">
        {priceProfile.adjustmentMode === "fixed" ? "Fixed" : "Dynamic"}{" "}
        {priceProfile.adjustmentIncrementMode === "increase" ? "Increase" : "Decrease"}{" "}
        of {priceProfile.adjustmentValue}
        {priceProfile.adjustmentMode === "fixed" ? "$" : "%"}
      </span>
    </div>

  </div>
);
}