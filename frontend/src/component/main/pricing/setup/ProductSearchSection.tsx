import React, { useEffect, useState } from "react";
import { Product } from "../../../../type/Pricing";
import { getProductFilters } from "../../../../api/getProductFilters";
import { getProducts } from "../../../../api/getProducts";

export type ProductFilters = {
  title: string;
  sku: string;
  subCategory: string;
  segment: string;
  brand: string;
};

type ProductSearchSectionProps = {
  productFilters: ProductFilters;
  setProductFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
  filters: FilterOptions;
};
export type FilterOptions = {
  categories: string[];
  segments: string[];
  brands: string[];
};

export default function ProductSearchSection({ productFilters, setProductFilters, filters }: ProductSearchSectionProps) {

  

  


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
          onBlur={(e)=>setProductFilters({...productFilters, title: e.target.value})}
        />

        {/* SKU */}
        <input
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] text-[#667085]"
          placeholder="SKU"
          onBlur={(e) => setProductFilters({...productFilters, sku: e.target.value})}
        />

        {/* Category */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={productFilters.subCategory}
          onChange={(e) => setProductFilters({...productFilters, subCategory: e.target.value})}
        >
          <option value="">All Categories</option>
          {filters?.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Segment */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={productFilters.segment}
          onChange={(e) => setProductFilters({...productFilters, segment: e.target.value})}
        >
          <option value="">All Segments</option>
          {filters?.segments.map((segment) => (
            <option key={segment} value={segment}>
              {segment}
            </option>
          ))}
        </select>

        {/* Brand */}
        <select
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px]"
          value={productFilters.brand}
          onChange={(e) => setProductFilters({...productFilters, brand: e.target.value})}
        >
          <option value="">All Brands</option>
          {filters?.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}