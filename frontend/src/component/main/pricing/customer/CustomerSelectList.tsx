import { Customer } from "../../../../type/Pricing";
import CustomerSelectRow from "./CustomerSelectRow";

type Props = {
  customers: Customer[];
  selectedCustomer: Customer[];
  onToggleCustomer: (customer: Customer) => void;
};

export default function CustomerSelectList({
  customers,
  selectedCustomer,
  onToggleCustomer,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-[16px] w-[352px] h-[314px]">

      {customers.map((customer) => (
        <CustomerSelectRow
          key={customer.id}
          customer={customer}
          checked={selectedCustomer?.map(x=>x.id)?.includes(customer.id)}
          onToggle={() => onToggleCustomer(customer)}
        />
      ))}

    </div>
  );
}