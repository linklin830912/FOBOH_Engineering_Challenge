import React from "react";

type Props = {
  checked: boolean;
  productName: string;
  sku: string;
  onChange: () => void;
};

export default function ProductSelectRow({
  checked,
  productName,
  sku,
  onChange,
}: Props) {
  return (
    <div
      className="flex flex-row items-center gap-[12px] w-[352px] h-[50px] cursor-pointer"
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="w-4 h-4 accent-[#147D73]"
      />

      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-[#212B36]">
          {productName}
        </span>

        <span className="text-xs text-[#637381]">
          {sku}
        </span>
      </div>
    </div>
  );
}