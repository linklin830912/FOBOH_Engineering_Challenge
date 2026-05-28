import { useEffect, useState } from "react";
import { Customer, CustomerGroup, PricingProfile, Product} from "../../../type/Pricing";
import { FilterOptions, ProductFilters } from "./setup/ProductSearchSection";
import { defaultProductFilters } from "./MainContent";
import { ProductScope } from "./setup/ProductScopeSelector";
import CalculatePriceProfileSectionAccordion, { PriceProfileOptions } from "./calculate/CaculatePriceProfileSectionAccordion";
import SetupPriceProfileSectionAccordion from "./setup/SetupPriceProfileSectionAccordion";
import CustomerPriceProfileSectionAccordion from "./customer/CustomerPriceProfileSectionAccordion";
import SectionActions from "../shared/SectionActions";
import { UpdateProductPriceRequest } from "../../../type/Api";

export const PricingProfileSteps = ["Product", "Customer"] as const;
interface PriceProfileSectionAccordionProps { 
  products: Product[];
  priceProfile: PricingProfile;
  handlePriceProfileDelete: (id: string) => void;
  handlePriceProfileChange: (profile: UpdateProductPriceRequest) => void;
  filters: FilterOptions | null;
}
export default function PriceProfileSectionAccordion({ products,filters, priceProfile, handlePriceProfileDelete, handlePriceProfileChange }: PriceProfileSectionAccordionProps) {  
  useEffect(() => {
    setEditingPriceProfile(priceProfile);
  }, [priceProfile]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [productFilters, setProductFilters] = useState<ProductFilters>(defaultProductFilters);
  const [productScope, setProductScope] = useState<ProductScope>("multiple");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([]);
  const [priceProfileOptions, setPriceProfileOptions] = useState<PriceProfileOptions | null>({
    adjustmentIncrementMode: priceProfile.adjustmentIncrementMode,
    adjustmentMode: priceProfile.adjustmentMode,
    adjustmentValue: priceProfile.adjustmentValue,
    priority: priceProfile.priority,
    allProducts: false
  });
  const [selectedCustomerGroups, setSelectedCustomerGroups] = useState<CustomerGroup[]>([]);
  const [editingPriceProfile, setEditingPriceProfile] = useState<PricingProfile>(priceProfile);
  
  const handleProductScopeChange = (scope: ProductScope) => {
    if (scope === "all") {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
    setProductScope(scope);
  }

  const handleToggleCustomer = (customer: Customer) => {
      setSelectedCustomer((prev) =>
          prev.map(x=>x.id).includes(customer.id)
          ? prev.filter((x) => x.id !== customer.id)
          : [...prev, customer]
      );
  };

  const handleToggleCustomerGroup = (customerGroup: CustomerGroup) => {
      setSelectedCustomerGroups((prev) =>
          prev.map(x=>x.id).includes(customerGroup.id)
          ? prev.filter((x) => x.id !== customerGroup.id)
          : [...prev, customerGroup]
      );
  }
  
  return (
  <div className="flex w-full flex-col items-start gap-[16px] rounded-lg bg-white p-[26px] overflow-hidden">

    {/* Header */}
    <div className="flex w-full items-center justify-between gap-[12px]">

      <input
        className="w-full bg-transparent outline-none text-base font-semibold text-[#212B36]"
        value={priceProfile.name}
        readOnly
      />

        <div className="flex items-center gap-[10px] shrink-0">
        <button
            onClick={() => {
              if (isEditing) {
                handlePriceProfileChange({
                  ...editingPriceProfile,
                  adjustmentMode: priceProfileOptions?.adjustmentMode ?? editingPriceProfile.adjustmentMode,
                  adjustmentIncrementMode: priceProfileOptions?.adjustmentIncrementMode ?? editingPriceProfile.adjustmentIncrementMode,
                  adjustmentValue: priceProfileOptions?.adjustmentValue ?? editingPriceProfile.adjustmentValue,
                  productIds: selectedProducts.map((p) => p.id),
                  customerGroupIds: selectedCustomerGroups.map((g) => g.id),
                  customerIds: selectedCustomer.map((c) => c.id),
                  priority: priceProfileOptions?.priority ?? editingPriceProfile.priority,
                  allProducts: priceProfileOptions?.allProducts ?? editingPriceProfile.allProducts ?? false,
                })
              }
              setIsEditing(prev => !prev);
            }}
          className="text-sm font-medium text-black-600 hover:underline"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => handlePriceProfileDelete(editingPriceProfile.id)}
          className="text-sm font-medium text-black-600 hover:underline"
        >
          Delete
        </button>

      </div>
    </div>

    {/* Products */}
    <div className="flex flex-col gap-[6px]">
      <div className="text-sm text-[#637381]">
        You've selected{" "}
        <span className="font-medium text-[#212B36]">
          {priceProfile.allProducts ? "All" : priceProfile.productIds.length}
        </span>{" "}
        Products
      </div>
    </div>

    {/* Price summary */}
    <div className="text-xs font-normal text-[#637381] leading-[18px] w-full max-w-[345px]">
      With Price Adjustment Mode set to{" "}
      <span className="font-semibold text-[#212B36]">
        {priceProfile.adjustmentMode === "fixed" ? "Fixed" : "Dynamic"}{" "}
        {priceProfile.adjustmentIncrementMode === "increase" ? "Increase" : "Decrease"}{" "}
        of {priceProfile.adjustmentValue}
        {priceProfile.adjustmentMode === "fixed" ? "$" : "%"}
      </span>
      </div>
      

      {isEditing && <>
        {currentStep === 0 && <>
                    {filters && <SetupPriceProfileSectionAccordion
                      productScope={productScope} setProductScope={handleProductScopeChange}
                      products={products}
                      setProductFilters={setProductFilters}
                      productFilters={productFilters}
                      filters={filters}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                    />}
        
                    <CalculatePriceProfileSectionAccordion
                      selectedProducts={selectedProducts}
                      setPriceProfileOptions={setPriceProfileOptions} />
                  </>}
        
            {currentStep === 1 && <>
              <CustomerPriceProfileSectionAccordion
                selectedCustomer={selectedCustomer} onToggleCustomer={handleToggleCustomer}
                selectedCustomerGroups={selectedCustomerGroups} onToggleCustomerGroup={handleToggleCustomerGroup} />
            </>}
        
        <div className="mt-4">
                    <SectionActions backDisabled={currentStep === 0} nextDisabled={currentStep === PricingProfileSteps.length - 1}
                      onBack={() => {
                        setCurrentStep((prev) => Math.max(0, prev - 1));
                      }}
                      onNext={() => setCurrentStep((prev) => Math.min(PricingProfileSteps.length - 1, prev + 1))}
                    />
                  </div>
      </>}

  </div>
);
}