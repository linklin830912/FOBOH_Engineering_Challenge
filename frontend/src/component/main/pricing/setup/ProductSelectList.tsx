import React from "react";
import ProductSelectRow from "./ProductSelectRow";
import { Product } from "../../../../type/Pricing";

type ProductSelectListProps = {
  products: Product[];
  selectedProducts: Product[];
  onToggle: (product: Product) => void;
};

export default function ProductSelectList({
  products,
  selectedProducts,
  onToggle,
}: ProductSelectListProps) {
  return (
    <div className="flex flex-col items-start gap-[16px] w-[352px] h-[314px] overflow-y-auto p-0">
      {products.map((product, i) => (
        <ProductSelectRow
          key={product.id}
          productName={product.title}
          sku={product.sku}
          checked={selectedProducts.includes(product)}
          onChange={() => onToggle(product)}
        />
      ))}

    </div>
  );
}