import BasedOnSelector from "./calculate/BasedOnSelector";
import CalculatePriceProfileSectionAccordion from "./calculate/CaculatePriceProfileSectionAccordion";
import PriceProfileHeader from "./PriceProfileHeader";
import PriceProfileSectionAccordion from "./PriceProfileSectionAccordion";
import SetupPriceProfileSectionAccordion from "./setup/SetupPriceProfileSectionAccordion";

export default function MainContent() {
  return (
    <main className="min-h-[calc(100vh-82px)] bg-[#F9FBFC] p-8">
      <div className="mx-auto w-full max-w-[1116px]">
        {/* Header */}
        <PriceProfileHeader />

        {/* Section 1 */}
        <div className="mt-4">
          <PriceProfileSectionAccordion />
        </div>

        {/* Section 2 */}
        <div className="mt-4">
          <SetupPriceProfileSectionAccordion />

          {/* <CalculatePriceProfileSectionAccordion selectedProducts={selectedProducts} /> */}
        </div>
      </div>
    </main>
  );
}