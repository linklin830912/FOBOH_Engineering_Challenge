import AdjustmentModeSelector, { AdjustmentMode } from "./AdjustmentModeSelector";
import AdjustmentIncrementModeSelector, { AdjustmentIncrementMode} from "./AdjustmentIncrementModeSelector";
import BasedOnSelector from "./BasedOnSelector";
import AdjustedPriceInfo from "./AdjustedPriceInfo";
import NewPriceTable, { ProductPriceRow } from "./NewPriceTable";
import { Product } from "../../../../type/Pricing";
import { useEffect, useState } from "react";

interface CalculatePriceProfileSectionAccordionProps {
  selectedProducts: Product[];
}
export default function CalculatePriceProfileSectionAccordion({ selectedProducts }: CalculatePriceProfileSectionAccordionProps) {

  const [adjustmentMode, setAdjustmentMode] = useState<AdjustmentMode>("fixed");
  const [adjustmentIncrementMode, setAdjustmentIncrementMode] = useState<AdjustmentIncrementMode>("increase");
  
  const [productPriceRows, setProductPriceRows] = useState<ProductPriceRow[]>([]);

    useEffect(() => {
        const rows = selectedProducts.map((product) => ({
            id: product.id,
            checked: false,
            title: product.title,
            sku: product.sku,
            category: product.subCategory,
            basedOnPrice: product.price,
            adjustment: 0,
            newPrice: product.price,
        }));
        setProductPriceRows(rows);
    }, [selectedProducts, adjustmentMode, adjustmentIncrementMode]);
  
  const onAdjustmentChange = (id: string, value: number) => {
    setProductPriceRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, adjustment: value, newPrice: calculateNewPrice(row, value) } : row
      )
    );
  };

  const calculateNewPrice = (row: ProductPriceRow, adjustment: number) => {
    if (adjustmentMode === "fixed") {
      if (adjustmentIncrementMode === "increase") {
        return row.basedOnPrice + adjustment;
      } else {
        return Math.max(0, row.basedOnPrice - adjustment);
      }
    } else {
      if (adjustmentIncrementMode === "increase") {
        return row.basedOnPrice * (1 + adjustment / 100);
      } else {
        return row.basedOnPrice * (1 - adjustment / 100);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px]">

      <BasedOnSelector/>

      <div className="w-full flex flex-col justify-center items-start gap-[6px] mt-5 pt-5 border-t border-[#F0F0F0]">
        <AdjustmentModeSelector adjustmentMode={adjustmentMode} setAdjustmentMode={setAdjustmentMode} />
        <AdjustmentIncrementModeSelector value={adjustmentIncrementMode} onChange={setAdjustmentIncrementMode} />
        <AdjustedPriceInfo />
        <NewPriceTable
          adjustmentMode={adjustmentMode}
          adjustmentIncrementMode={adjustmentIncrementMode}
          productPriceRows={productPriceRows}
          onToggleRow={(rowId) => console.log("Toggled row:", rowId)}
          onRefresh={() => console.log("Refreshed table")}
          onAdjustmentChange={onAdjustmentChange} />
      </div>
    </div>
  );
}