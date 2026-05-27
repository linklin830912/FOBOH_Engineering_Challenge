import { useEffect, useState } from "react";

import CustomerSearchFilters from "./CustomerSearchFilters";
import { getCustomerGroup } from "../../../../api/getCustomerGroup";
import CustomerSelectList from "./CustomerSelectList";
import { getCustomer } from "../../../../api/getCustomer";
import { Customer, CustomerGroup } from "../../../../type/Pricing";
import CustomerGroupSelectList from "./CustomerGroupSelectList";

interface CustomerPriceProfileSectionAccordionProps { 
    selectedCustomer: Customer[];
  onToggleCustomer: (customer: Customer) => void;
    selectedCustomerGroups: CustomerGroup[];
  onToggleCustomerGroup: (customerGroup: CustomerGroup) => void;
}
export default function CustomerPriceProfileSectionAccordion({ selectedCustomerGroups, onToggleCustomerGroup, selectedCustomer, onToggleCustomer }: CustomerPriceProfileSectionAccordionProps) {

  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchCustomerId, setSearchCustomerId] = useState("");

  const [searchCustomerGroupName, setSearchCustomerGroupName] = useState("");
    const [searchCustomerGroupId, setSearchCustomerGroupId] = useState("");

    const [customers, setCustomers] = useState<Customer[]>([]);
    
    
    const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);

    

    useEffect(() => {
        const fetchCustomerGroups = async () => { 
            try {
                const result = await getCustomerGroup(searchCustomerGroupName, searchCustomerGroupId);
                setCustomerGroups(result);
            } catch (error) {
                console.error("Error fetching customer groups:", error);
            }
        }      

    fetchCustomerGroups();
    }, [searchCustomerGroupId, searchCustomerGroupName]);
    
    useEffect(() => {
        const fetchCustomer = async () => { 
            try {
                const result = await getCustomer(searchCustomerName, searchCustomerId);
                setCustomers(result);
            } catch (error) {
                console.error("Error fetching customer groups:", error);
            }
        }      

    fetchCustomer();
  }, [searchCustomerName, searchCustomerId]);
    

  
  return (
    <div className="flex w-full flex-col items-start gap-[10px] rounded-lg bg-white p-[26px] overflow-hidden">

  {/* Header row */}
  <div className="flex w-full items-center justify-between min-w-0">

    <input
      className="text-base font-semibold text-[#212B36] bg-transparent outline-none w-full min-w-0"
      defaultValue="Set Customer"
    />

    <button className="text-sm font-medium text-[#147D73] whitespace-nowrap">
      Expand
    </button>

  </div>

  {/* Search */}
  <div className="w-full flex flex-col justify-center items-start gap-[6px] p-0 min-w-0">
    <CustomerSearchFilters
      customerName={searchCustomerName}
      customerId={searchCustomerId}
      customerGroupName={searchCustomerGroupName}
      customerGroupId={searchCustomerGroupId}
      onCustomerNameChange={setSearchCustomerName}
      onCustomerIdChange={setSearchCustomerId}
      onCustomerGroupNameChange={setSearchCustomerGroupName}
      onCustomerGroupIdChange={setSearchCustomerGroupId}
    />
  </div>

   <div className="w-full flex flex-col gap-[16px] min-w-0">

  {/* Customers Section */}
  <div className="flex flex-col gap-[8px]">

    <div className="text-sm font-semibold text-[#212B36]">
      Customers
    </div>

    <div className="w-full flex flex-col gap-[6px] min-w-0 overflow-auto">
      <CustomerSelectList
        customers={customers}
        selectedCustomer={selectedCustomer}
        onToggleCustomer={onToggleCustomer}
      />
    </div>

  </div>

  {/* Customer Groups Section */}
  <div className="flex flex-col gap-[8px]">

    <div className="text-sm font-semibold text-[#212B36]">
      Customer Groups
    </div>

    <div className="w-full flex flex-col gap-[6px] min-w-0 overflow-auto">
      <CustomerGroupSelectList
        customerGroups={customerGroups}
        selectedCustomerGroup={selectedCustomerGroups}
        onToggleCustomerGroup={onToggleCustomerGroup}
      />
    </div>

  </div>

</div>

</div>
  );
}