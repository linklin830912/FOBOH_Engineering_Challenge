type Props = {
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
};

export default function SectionActions({
  onBack,
  onNext,
  backDisabled = false,
  nextDisabled = false,
}: Props) {
  return (
    <div className="flex flex-row justify-between items-end gap-[26px] w-[1014px] h-[46px]">

      <span className="text-sm text-[#637381]">
        Your entries are saved automatically
      </span>

      <div className="flex items-center gap-[12px]">

        <button
          onClick={onBack}
          disabled={backDisabled}
          className="h-[46px] px-[20px] border border-[#D0D5DD] rounded-[8px] bg-white text-sm font-medium text-[#212B36] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="h-[46px] px-[20px] rounded-[8px] bg-[#147D73] text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>
    </div>
  );
}