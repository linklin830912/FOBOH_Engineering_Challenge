import { useEffect, useState } from "react";
import { Customer, CustomerGroup, Product } from "../../../../type/Pricing";

interface ReviewPriceProfileSectionAccordionProps { 
    selectedProducts: Product[];
    selectedCustomer: Customer[];
    selectedCustomerGroup: CustomerGroup[];
}
export default function ReviewPriceProfileSectionAccordion({  selectedProducts,
    selectedCustomer,
    selectedCustomerGroup
 }: ReviewPriceProfileSectionAccordionProps) {

    

    
    

  
  return (
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px] overflow-hidden">

  {/* Header row */}
  <div className="flex w-full items-center justify-between min-w-0">

    <input
      className="text-base font-semibold text-[#212B36] bg-transparent outline-none w-full min-w-0"
      defaultValue="Review Price Profile"
    />

    <button className="text-sm font-medium text-[#147D73] whitespace-nowrap">
      Expand
    </button>

  </div>
      <div>{`You've selected ${selectedProducts.length} Products`}</div>
      {/* <div>With Price Adjustment Mode set to {Dynamic} {Increase} of 10% </div> */}
      
  


</div>
  );
}