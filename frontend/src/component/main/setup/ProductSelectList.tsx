import React from "react";
import ProductSelectRow from "./ProductSelectRow";

type Product = {
  id: string;
  name: string;
  sku: string;
};

type ProductSelectListProps = {
  products: Product[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function ProductSelectList({
  products,
  selectedIds,
  onToggle,
}: ProductSelectListProps) {
  return (
    <div className="flex flex-col items-start gap-[16px] w-[352px] h-[314px] overflow-y-auto p-0">
      {products.map((product) => (
        <ProductSelectRow
          key={product.id}
          productName={product.name}
          sku={product.sku}
          checked={selectedIds.includes(product.id)}
          onChange={() => onToggle(product.id)}
        />
      ))}

    </div>
  );
}