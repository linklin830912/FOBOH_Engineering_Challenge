import { Customer } from "../../../../type/Pricing";

type Props = {
  checked: boolean;
  customer: Customer;
  onToggle: () => void;
};

export default function CustomerSelectRow({
  checked,
  customer,
  onToggle,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className="flex flex-row items-center gap-[12px] w-[352px] h-[50px] cursor-pointer"
    >

      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="w-4 h-4 accent-[#147D73]"
      />

      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-[#212B36]">
          {customer.name}
        </span>

        <span className="text-xs text-[#637381]">
          {customer.id}
        </span>
      </div>

    </div>
  );
}