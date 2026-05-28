import { useState } from "react";
import { getPricingProfileMatch } from "../../../../api/getPricingProfileMatch";
import { GetPricingProfileMatchRequest, GetPricingProfileMatchResponse } from "../../../../type/Api";

export default function BestPricePriceProfileSectionAccordion() {
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState<GetPricingProfileMatchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatchPriceTrack = async () => {
    try {
      if (!customerId || !productId) {
        throw new Error("Customer ID and Product ID are required");
      }
      setResult(null);
      setLoading(true);

      const result = await getPricingProfileMatch({
        customerId,
        productId,
      }as GetPricingProfileMatchRequest);

      setResult(result);
    } catch (error) {
      console.error("Error tracking price match:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-[16px] rounded-lg bg-white p-[26px] overflow-hidden">

      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <input
          className="w-full bg-transparent outline-none text-base font-semibold text-[#212B36]"
          defaultValue="Track Match Price"
        />

        <button className="text-sm font-medium text-[#147D73] whitespace-nowrap">
          Expand
        </button>
      </div>

      {/* Inputs */}
      <div className="flex items-center gap-[12px] w-full">
        <input
          className="w-[200px] border border-[#D0D5DD] rounded-[8px] px-[12px] py-[8px] text-sm outline-none"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <input
          className="w-[200px] border border-[#D0D5DD] rounded-[8px] px-[12px] py-[8px] text-sm outline-none"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <button
          onClick={handleMatchPriceTrack}
          className="text-sm font-medium text-white bg-[#147D73] px-[14px] py-[8px] rounded-[8px]"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>

      
      {/* Result */}
      {result && <><div className="text-sm text-[#637381]">
        For Customer{" "}
        <span className="font-medium text-[#212B36]">
          {result?.customer.name || "-"}
        </span>
        {" "}
        best Price for{" "}
        <span className="font-medium text-[#212B36]">
          {result?.product.title || "-"}
        </span>
        {" "}is{" "}
        <span className="font-medium text-[#212B36]">
          {result?.newPrice ? `$${result.newPrice}` : "$0.00"}
        </span>
        {" "}using{" "}
        <span className="font-medium text-[#212B36]">
          {result?.bestMatch?.name || "-"}
        </span>
      </div>
        
        <div className="text-sm text-[#637381]">
        Calculation{" "}
        <span className="font-medium text-[#212B36]">
          {result?.newPrice ? `$${result.newPrice}` : "$0.00"}
        </span>
        {" "}={" "}
        <span className="font-medium text-[#212B36]">
            ${result?.product.price || "-"}
          </span>
          {result?.bestMatch?.adjustmentMode === "fixed" && <span className="font-medium text-[#212B36]">
          {result?.bestMatch?.adjustmentIncrementMode === "increase" ? " + " : " - "}
          ${result?.bestMatch?.adjustmentValue}
          </span>}
          {result?.bestMatch?.adjustmentMode === "dynamic" && <span className="font-medium text-[#212B36]">
            *{100 + (result?.bestMatch?.adjustmentIncrementMode === "increase" ? result?.bestMatch?.adjustmentValue : -result?.bestMatch?.adjustmentValue)}%
          </span>}        
      </div>      
      </>}

    </div>
  );
}