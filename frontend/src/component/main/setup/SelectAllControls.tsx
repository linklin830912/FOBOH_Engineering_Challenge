import React from "react";

type SelectAllControlsProps = {
  allSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
};

export default function SelectAllControls({
  allSelected,
  onSelectAll,
  onDeselectAll,
}: SelectAllControlsProps) {
  return (
    <div className="flex flex-row items-center gap-[12px] w-[216px] h-[20px]">

      {!allSelected ? (
        <button
          onClick={onSelectAll}
          className="text-sm text-[#147D73] font-medium"
        >
          Select All
        </button>
      ) : (
        <button
          onClick={onDeselectAll}
          className="text-sm text-[#147D73] font-medium"
        >
          Deselect All
        </button>
      )}

    </div>
  );
}