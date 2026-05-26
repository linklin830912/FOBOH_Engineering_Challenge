import React, { useEffect, useMemo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Product } from "../../../../type/Pricing";
import { AdjustmentMode } from "./AdjustmentModeSelector";
import { AdjustmentIncrementMode } from "./AdjustmentIncrementModeSelector";

export type ProductPriceRow = {
  id: string;
  checked: boolean;
  title: string;
  sku: string;
  category: string;
  basedOnPrice: number;
  adjustment: number;
  newPrice: number;
};

type NewPriceTableProps = {
    adjustmentMode: AdjustmentMode;
    adjustmentIncrementMode: AdjustmentIncrementMode;
  productPriceRows: ProductPriceRow[];
  onToggleRow: (id: string) => void;
    onRefresh: () => void;
  onAdjustmentChange: (
  id: string,
  value: number
) => void;
};

export default function NewPriceTable({
    adjustmentMode,
    adjustmentIncrementMode,
  productPriceRows,
  onToggleRow,
  onRefresh,
  onAdjustmentChange
}: NewPriceTableProps) {

    

  return (
    <div className="flex flex-col justify-center items-start gap-[12px] w-[1019px]">

      {/* Refresh */}
      <div className="flex flex-row justify-end items-center gap-[8px] w-[1014px] pb-[8px]">
        <button
          onClick={onRefresh}
          className="flex items-center gap-[8px]"
        >
          <span className="text-sm font-medium text-[#563FE3]">
            Refresh New Price Table
          </span>

          <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#563FE3]">
            <ArrowPathIcon className="w-[14px] h-[14px] text-white" />
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-row items-center w-[1014px] h-[20px]">

        <div className="w-[40px] flex justify-center">
          <input type="checkbox" />
        </div>

        <div className="w-[163px] text-sm text-[#637381]">
          Product Title
        </div>

        <div className="w-[163px] text-sm text-[#637381]">
          SKU Code
        </div>

        <div className="w-[163px] text-sm text-[#637381]">
          Category
        </div>

        <div className="w-[163px] text-sm text-[#637381]">
          Based on Price
        </div>

        <div className="w-[163px] text-sm text-[#637381]">
          Adjustment
        </div>

        <div className="w-[163px] text-sm font-medium text-[#212B36]">
          New Price
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col w-[1014px]">

        {productPriceRows.map((row) => (
          <div
            key={row.id}
            className="flex flex-row w-[1014px] h-[48px]"
          >

            {/* Checkbox */}
            <div className="flex items-center justify-center w-[40px] border border-[#F0F0F0]">
              <input
                type="checkbox"
                checked={row.checked}
                onChange={() => onToggleRow(row.id)}
              />
            </div>

            {/* Product Title */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#F0F0F0]">
              <span className="text-sm font-medium text-[#212B36]">
                {row.title}
              </span>
            </div>

            {/* SKU */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#F0F0F0]">
              <span className="text-sm font-medium text-[#212B36]">
                {row.sku}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#F0F0F0]">
              <span className="text-sm font-medium text-[#212B36]">
                {row.category}
              </span>
            </div>

            {/* Based On Price */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#F0F0F0]">
              <span className="text-sm font-medium text-[#637381]">
                ${row.basedOnPrice.toFixed(2)}
              </span>
            </div>

            {/* Adjustment */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#08822A] bg-[#F4FFF7]">

            <div className="flex items-center gap-[8px] w-full">

                {/* Prefix */}
                <span className="text-sm font-medium text-[#637381] whitespace-nowrap">
                {adjustmentIncrementMode === "increase" ? "+" : "-"}
                {adjustmentMode === "fixed" ? "$" : "%"}
                </span>

                {/* Input */}
                <input
                    value={row.adjustment}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if(adjustmentMode === "dynamic") {
                                        value = Math.min(
                                        100,
                                        Math.max(0, value)
                                    );
                                }else if(adjustmentMode === "fixed" && adjustmentIncrementMode === "decrease") {
                                    value = Math.min(row.basedOnPrice, value);
                                }
                        onAdjustmentChange(row.id, value);                        
                    }
                    }
                    className="w-full bg-transparent outline-none text-sm font-medium text-[#212B36]"
                />

            </div>
            </div>

            {/* New Price */}
            <div className="flex items-center px-[12px] w-[163px] border border-[#F0F0F0]">
              <span className="text-sm font-medium text-[#212B36]">
                ${row.newPrice.toFixed(2)}
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}