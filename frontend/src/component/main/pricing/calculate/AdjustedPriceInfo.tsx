export default function AdjustedPriceInfo() {
  return (
    <div className="flex flex-row items-center gap-[8px] w-[454px] h-[20px]">
      <span className="text-xs leading-[18px] text-[#A26306]">
        The adjusted price will be calculated from
      </span>

      <span className="text-xs font-semibold text-[#212B36]">
        Based on Price
      </span>

      <span className="text-xs leading-[18px] text-[#A26306]">
        selected above
      </span>
    </div>
  );
}