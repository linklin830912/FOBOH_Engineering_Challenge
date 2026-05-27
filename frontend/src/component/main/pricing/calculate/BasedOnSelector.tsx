import React from "react";


export default function BasedOnSelector() {
  return (
    <div className="flex flex-col justify-center items-start gap-[12px] w-[400px] h-[78px] p-0">

      {/* Label */}
      <span className="text-sm text-[#637381]">
        Based on
      </span>

      {/* Select */}
      <select
        className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] text-[#212B36] bg-white"
      >
        <option value="price">Based on Price</option>
      </select>

    </div>
  );
}