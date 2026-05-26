export default function PriceProfileSectionAccordion() {
  return (
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px]">
      {/* Header row (mock accordion header) */}
      <div className="flex w-full items-center justify-between">
        <h3 className="text-base font-semibold text-[#212B36]">
          Section Title
        </h3>

        <button className="text-sm font-medium text-[#147D73]">
          Expand
        </button>
      </div>

      {/* Content */}
      <div className="w-full text-sm text-[#637381]">
        Accordion content goes here...
      </div>
    </div>
  );
}