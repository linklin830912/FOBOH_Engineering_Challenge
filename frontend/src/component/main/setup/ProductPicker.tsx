import React, { useState, useMemo } from "react";
import ProductSelectList from "./ProductSelectList";
import SelectAllControls from "./SelectAllControls";

type Product = {
  id: string;
  name: string;
  sku: string;
};
interface ProductPickerProps {
    products: Product[];
    profileName?: string;
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
}

export default function ProductPickerParent({ products, profileName, selectedIds, setSelectedIds }: ProductPickerProps) {

  const allSelected = selectedIds.length === products.length;

  const handleToggle = (id: string) => {
  const next = selectedIds.includes(id)
    ? selectedIds.filter((x) => x !== id)
    : [...selectedIds, id];

    setSelectedIds(next);
    };

  const handleSelectAll = () => {
    setSelectedIds(products.map((p) => p.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
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
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />

      {/* Debug */}
      <div className="text-sm text-[#637381]">
        You’ve selected {selectedIds.length} Products, these will be added to the {profileName || "Price Profile"}.
      </div>

    </div>
  );
}