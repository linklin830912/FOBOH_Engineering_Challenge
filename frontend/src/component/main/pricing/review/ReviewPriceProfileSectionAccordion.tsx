import { useEffect, useState } from "react";
import { Customer, CustomerGroup, Product } from "../../../../type/Pricing";
import { PriceProfileOptions } from "../calculate/CaculatePriceProfileSectionAccordion";

interface ReviewPriceProfileSectionAccordionProps { 
  priceProfileOptions: PriceProfileOptions | null;
    selectedProducts: Product[];
    selectedCustomer: Customer[];
  selectedCustomerGroup: CustomerGroup[];
  handlePriceProfileSave: () => void;
}
export default function ReviewPriceProfileSectionAccordion({ priceProfileOptions,  selectedProducts,
    handlePriceProfileSave
 }: ReviewPriceProfileSectionAccordionProps) {

   return (
  <div className="flex w-full flex-col items-start gap-[16px] rounded-lg bg-white p-[26px] overflow-hidden">

    {/* Header */}
    <div className="flex w-full items-center justify-between min-w-0">

      <input
        className="w-full min-w-0 bg-transparent outline-none text-base font-semibold text-[#212B36]"
        defaultValue="Review Price Profile"
      />

      <button className="text-sm font-medium text-[#147D73] whitespace-nowrap">
        Expand
      </button>

    </div>

    {/* Empty state */}
    {(selectedProducts.length === 0 || !priceProfileOptions) && (
      <div className="text-sm text-[#637381]">
        No price profile options or products selected.
      </div>
    )}

    {/* Content */}
    {selectedProducts.length > 0 && priceProfileOptions && (
      <div className="flex flex-col gap-[12px] w-full">

        {/* Products */}
        <div className="flex flex-col gap-[6px]">

          <div className="text-sm text-[#637381]">
            You’ve selected {selectedProducts.length} Products
          </div>

          <div className="flex flex-wrap items-center gap-x-[8px] gap-y-[4px]">

            {selectedProducts.map((product, index) => (
              <span
                key={product.id}
                className="text-sm font-medium text-[#212B36] leading-[20px]"
              >
                {product.title}
                {index !== selectedProducts.length - 1 && " & "}
              </span>
            ))}

          </div>

        </div>

        {/* Price summary */}
        <div className="text-xs font-normal text-[#637381] leading-[18px] w-full max-w-[345px]">

          With Price Adjustment Mode set to{" "}
          <span className="font-semibold text-[#212B36]">
            {priceProfileOptions.adjustmentMode === "fixed" ? "Fixed" : "Dynamic"}{" "}
            {priceProfileOptions.adjustmentIncrementMode === "increase" ? "Increase" : "Decrease"}{" "}
            of {priceProfileOptions.adjustmentValue}
            {priceProfileOptions.adjustmentMode === "fixed" ? "$" : "%"}
          </span>

        </div>

        {/* Action */}
           <button className="text-sm font-medium text-white bg-[#147D73] px-[14px] py-[8px] rounded-[8px] w-fit"
           onClick={handlePriceProfileSave}>
        Save Price Profile
      </button>

      </div>
    )}

  </div>
);
}