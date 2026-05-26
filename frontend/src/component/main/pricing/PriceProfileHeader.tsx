import { Plus, ChevronRight } from "lucide-react";

export default function PriceProfileHeader() {
  return (
    <div className="flex w-full items-start justify-between rounded-t-2xl bg-[#F8FAFC] px-[26px] pb-[26px] pt-[34px]">
      {/* Left */}
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#637381]">
          <span>Pricing Profile</span>

          <ChevronRight size={14} className="text-[#A0AEC0]" />

          <span className="text-[#212B36] font-medium">
            Setup a Profile
          </span>
        </div>
        <p className="mt-1 text-sm text-[#637381]">
          Setup your pricing profile, select products and assign customers
        </p>
      </div>

      {/* Right */}
      <button className="flex items-center gap-2 rounded-xl bg-[#147D73] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
        <Plus size={18} />
        Add New
      </button>
    </div>
  );
}