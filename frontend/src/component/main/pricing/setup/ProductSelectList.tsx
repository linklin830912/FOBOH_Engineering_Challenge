import React from "react";
import ProductSelectRow from "./ProductSelectRow";
import { Product } from "../../../../type/Pricing";

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
      {products.map((product, i) => (
        <ProductSelectRow
          key={product.id}
          productName={product.title}
          sku={product.sku}
          checked={selectedIds.includes(product.id)}
          onChange={() => onToggle(product.id)}
        />
      ))}

    </div>
  );
}