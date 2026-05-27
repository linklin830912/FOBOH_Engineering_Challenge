import { PricingProfile} from "../../../type/Pricing";

interface PriceProfileSectionAccordionProps { 
  priceProfile: PricingProfile;
}
export default function PriceProfileSectionAccordion({ priceProfile }: PriceProfileSectionAccordionProps) {  

  return (
  <div className="flex w-full flex-col items-start gap-[16px] rounded-lg bg-white p-[26px] overflow-hidden">

    {/* Header */}
    <div className="flex w-full items-center justify-between min-w-0">

      <input
        className="w-full min-w-0 bg-transparent outline-none text-base font-semibold text-[#212B36]"
        defaultValue={priceProfile.name}
      />

      <button className="text-sm font-medium text-[#147D73] whitespace-nowrap">
        Expand
      </button>

    </div>

    {/* Products */}
        <div className="flex flex-col gap-[6px]">

          <div className="text-sm text-[#637381]">
            You've selected {priceProfile.productIds.length} Products
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