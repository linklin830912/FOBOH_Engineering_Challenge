import { CustomerGroup } from "../../../../type/Pricing";
import CustomerGroupSelectRow from "./CustomerGroupSelectRow";

type Props = {
  customerGroups: CustomerGroup[];
  selectedCustomerGroup: CustomerGroup[];
  onToggleCustomerGroup: (customerGroup: CustomerGroup) => void;
};

export default function CustomerGroupSelectList({
  customerGroups,
  selectedCustomerGroup,
  onToggleCustomerGroup,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-[16px] w-[352px] h-[314px]">

      {customerGroups?.map((customerGroup) => (
        <CustomerGroupSelectRow
          key={customerGroup.id}
          customerGroup={customerGroup}
          checked={selectedCustomerGroup?.map((x) => x.id)?.includes(customerGroup.id)}
          onToggle={() => onToggleCustomerGroup(customerGroup)}
        />
      ))}

    </div>
  );
}