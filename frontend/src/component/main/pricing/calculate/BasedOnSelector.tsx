import React, { useState } from "react";

interface BasedOnSelectorProps {
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<number>>;
}

export default function BasedOnSelector({ priority, setPriority }: BasedOnSelectorProps) {
  const [basedOn, setBasedOn] = useState("price");

  return (
    <div className="flex flex-col justify-center items-start gap-[12px] w-[400px] p-0">

      {/* Label */}
      <span className="text-sm text-[#637381]">
        Based on
      </span>

      {/* Select */}
      <select
        value={basedOn}
        onChange={(e) => setBasedOn(e.target.value)}
        className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] text-[#212B36] bg-white"
      >
        <option value="price">Based on Price</option>
      </select>

      {/* Instruction */}
      <div className="text-sm mt-3 text-[#637381]">
        Set Priority Level
      </div>

      {/* Priority */}
      <div className="flex flex-row items-center gap-[26px] w-[409px]">

        <span className="text-sm font-medium text-[#212B36]">
          Priority
        </span>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="priority"
            value="low"
            checked={priority === 0}
            onChange={() => setPriority(0)}
            className="accent-[#147D73]"
          />
          <span className="text-sm text-[#212B36]">Low</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={priority === 1}
            onChange={() => setPriority(1)}
            className="accent-[#147D73]"
          />
          <span className="text-sm text-[#212B36]">Medium</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="priority"
            value="high"
            checked={priority === 2}
            onChange={() => setPriority(2)}
            className="accent-[#147D73]"
          />
          <span className="text-sm text-[#212B36]">High</span>
        </label>

      </div>
    </div>
  );
}