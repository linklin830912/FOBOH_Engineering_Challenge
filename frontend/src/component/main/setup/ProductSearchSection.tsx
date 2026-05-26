import React from "react";

export type ProductFilters = {
  name: string;
  sku: string;
  category: string;
  segment: string;
  brand: string;
};

type Props = {
  value: ProductFilters;
  onChange: (next: ProductFilters) => void;
};

export default function ProductSearchSection({ value, onChange }: Props) {
  const update = (key: keyof ProductFilters, newValue: string) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <div className="flex w-[1014px] h-[80px] flex-col justify-center items-start gap-[12px] p-0">

      {/* Label */}
      <div className="flex flex-row items-center gap-[16px] w-[132px] h-[20px]">
        <span className="text-sm text-[#637381]">
          Search for Products
        </span>
      </div>

      {/* Inputs Row */}
      <div className="flex flex-row items-center gap-[16px] w-full h-[48px]">

        {/* Product Name */}
        <input
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] text-[#667085]"
          placeholder="Product Name"
          value={value.name}
          onChange={(e) => update("name", e.target.value)}
        />

        {/* SKU */}
        <input
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] text-[#667085]"
          placeholder="SKU"
          value={value.sku}
          onChange={(e) => update("sku", e.target.value)}
        />

        {/* Category */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={value.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Category</option>
        </select>

        {/* Segment */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={value.segment}
          onChange={(e) => update("segment", e.target.value)}
        >
          <option value="">Segment</option>
        </select>

        {/* Brand */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={value.brand}
          onChange={(e) => update("brand", e.target.value)}
        >
          <option value="">Brand</option>
        </select>

      </div>
    </div>
  );
}