import React from "react";

type Props = {
  resultCount: number;
  query: string; // Product Name or SKU
  brands: string[]; // selected brands (can be multiple)
};

export default function ResultsSummary({
  resultCount,
  query,
  brands,
}: Props) {
  return (
    <div className="flex flex-row items-center gap-[16px] w-[517px] h-[32px]">

      {/* Showing X results */}
      <span className="text-sm text-[#637381]">
        Showing{" "}
        <span className="font-medium text-[#212B36]">
          {resultCount}
        </span>{" "}
        Result{resultCount !== 1 ? "s" : ""}
      </span>

      {/* Query */}
      {query && (
        <span className="text-sm text-[#637381]">
          for{" "}
          <span className="font-medium text-[#212B36]">
            {query}
          </span>
        </span>
      )}

      {/* Brands */}
      {brands?.length > 0 && (
        <span className="text-sm text-[#637381]">
          {brands.map((b, i) => (
            <span key={i} className="font-medium text-[#212B36]">
              {b}
              {i < brands.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}