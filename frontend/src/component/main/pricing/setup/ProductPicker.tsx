import React, { useState, useMemo } from "react";
import ProductSelectList from "./ProductSelectList";
import SelectAllControls from "./SelectAllControls";
import { Product } from "../../../../type/Pricing";


interface ProductPickerProps {
    products: Product[];
    profileName?: string;
    selectedProducts: Product[];
    setSelectedProducts: (products: Product[]) => void;
}

export default function ProductPicker({ products, profileName, selectedProducts, setSelectedProducts }: ProductPickerProps) {

  const allSelected = selectedProducts.length === products.length;

  const handleToggle = (product: Product) => {
  const next = selectedProducts.includes(product)
    ? selectedProducts.filter((p) => p !== product)
    : [...selectedProducts, product];

    setSelectedProducts(next);
    };

  const handleSelectAll = () => {
    setSelectedProducts(products);
  };

  const handleDeselectAll = () => {
    setSelectedProducts([]);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Select All / Deselect All */}
      <SelectAllControls
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />

      {/* Product List */}
      <ProductSelectList
        products={products}
        selectedProducts={selectedProducts}
        onToggle={handleToggle}
      />

      {/* Debug */}
      <div className="text-sm text-[#637381]">
        You’ve selected {selectedProducts.length} Products, these will be added to the {profileName || "Price Profile"}.
      </div>

    </div>
  );
}