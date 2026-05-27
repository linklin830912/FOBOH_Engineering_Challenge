type Props = {
  customerName: string;
  customerId: string;
  customerGroupName: string;
  customerGroupId: string;
  onCustomerNameChange: (value: string) => void;
  onCustomerIdChange: (value: string) => void;
  onCustomerGroupNameChange: (value: string) => void;
  onCustomerGroupIdChange: (value: string) => void;
};

export default function CustomerSearchFilters({
  customerName,
  customerId,
  customerGroupName,
  customerGroupId,
  onCustomerNameChange,
  onCustomerIdChange,
  onCustomerGroupNameChange,
  onCustomerGroupIdChange,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-start gap-[12px] w-[1014px] h-[80px]">

      {/* Label */}
      <div className="flex flex-row items-center gap-[16px] w-full h-[20px]">
        <span className="text-sm text-[#637381]">
          Search for Customers
        </span>
      </div>

      {/* Search Row */}
      <div className="flex flex-row items-center gap-[16px] w-[1014px] h-[48px]">

        {/* Customer Name */}
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] bg-white text-sm text-[#212B36] outline-none"
        />

        {/* Customer ID */}
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => onCustomerIdChange(e.target.value)}
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] bg-white text-sm text-[#212B36] outline-none"
        />

        {/* Customer Group Name */}
        <input
          type="text"
          placeholder="Customer Group Name"
          value={customerGroupName}
          onChange={(e) => onCustomerGroupNameChange(e.target.value)}
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] bg-white text-sm text-[#212B36] outline-none"
        />

        {/* Customer Group ID */}
        <input
          type="text"
          placeholder="Customer Group ID"
          value={customerGroupId}
          onChange={(e) => onCustomerGroupIdChange(e.target.value)}
          className="w-[190px] h-[48px] px-[14px] border border-[#D0D5DD] rounded-[8px] bg-white text-sm text-[#212B36] outline-none"
        />

      </div>
    </div>
  );
}