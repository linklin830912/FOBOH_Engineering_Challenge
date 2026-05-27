import { useEffect, useState } from "react";
import PriceProfileHeader from "./PriceProfileHeader";
import PriceProfileSectionAccordion from "./PriceProfileSectionAccordion";
import SetupPriceProfileSectionAccordion from "./setup/SetupPriceProfileSectionAccordion";
import { FilterOptions, ProductFilters } from "./setup/ProductSearchSection";
import { getProducts } from "../../../api/getProducts";
import { Customer, CustomerGroup, PricingProfile, Product } from "../../../type/Pricing";
import { getProductFilters } from "../../../api/getProductFilters";
import CalculatePriceProfileSectionAccordion, { PriceProfileOptions } from "./calculate/CaculatePriceProfileSectionAccordion";
import SectionActions from "../shared/SectionActions";
import CustomerPriceProfileSectionAccordion from "./customer/CustomerPriceProfileSectionAccordion";
import ReviewPriceProfileSectionAccordion from "./review/ReviewPriceProfileSectionAccordion";
import { createPricingProfile } from "../../../api/createPricingProfile";
import BestPricePriceProfileSectionAccordion from "./best-price/PriceProfileSectionAccordion";
import { ProductScope } from "./setup/ProductScopeSelector";
import { deletePricingProfile } from "../../../api/deletePricingProfile";
import { UpdateProductPriceRequest } from "../../../type/Api";
import { updatePriceProfile } from "../../../api/updatePriceProfile";

export const PricingProfileSteps = ["Product", "Customer", "Review"] as const;
export const defaultProductFilters: ProductFilters = {
  title: "",
  sku: "",
  subCategory: "",
  segment: "",
  brand: "",
};
export default function MainContent() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>(defaultProductFilters);
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [productScope, setProductScope] = useState<ProductScope>("multiple");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([]);
  const [priceProfileOptions, setPriceProfileOptions] = useState<PriceProfileOptions | null>(null);
  const [selectedCustomerGroups, setSelectedCustomerGroups] = useState<CustomerGroup[]>([]);
  const[savedPriceProfiles, setSavedPriceProfiles] = useState<PricingProfile[]>([]);

  const handleToggleCustomer = (customer: Customer) => {
      setSelectedCustomer((prev) =>
          prev.map(x=>x.id).includes(customer.id)
          ? prev.filter((x) => x.id !== customer.id)
          : [...prev, customer]
      );
  };

  const handleProductScopeChange = (scope: ProductScope) => {
    if (scope === "all") {
      setSelectedProducts(products);
      setPriceProfileOptions((prev) => prev ? { ...prev, allProducts: true } : null);
    } else {
      setSelectedProducts([]);
    }
    setProductScope(scope);
  }

  const handlePriceProfileDelete = async(id: string) => { 
    try {
      const result = await deletePricingProfile(id);
      setSavedPriceProfiles(result);
    } catch (err) { 
      console.error("Error deleting price profile:", err);
    }
  }
  
  const handleToggleCustomerGroup = (customerGroup: CustomerGroup) => {
      setSelectedCustomerGroups((prev) =>
          prev.map(x=>x.id).includes(customerGroup.id)
          ? prev.filter((x) => x.id !== customerGroup.id)
          : [...prev, customerGroup]
      );
  }

  const handlePriceProfileChange = async(newProfile: UpdateProductPriceRequest) => {
    try {
      const result = await updatePriceProfile(newProfile);
      console.log("Updated:", result);
      setSavedPriceProfiles(result);
    } catch (err) { 
      console.error("Error updating price profile:", err);
    }
  }

  const handlePriceProfileSave = async () => { 
    try {
      if (!priceProfileOptions) throw new Error("Price profile options not set");
      const result = await createPricingProfile({
      adjustmentMode: priceProfileOptions.adjustmentMode,
      adjustmentIncrementMode: priceProfileOptions.adjustmentIncrementMode,
      adjustmentValue: priceProfileOptions.adjustmentValue,
      productIds: selectedProducts.map((p) => p.id),
      customerGroupIds: selectedCustomerGroups.map((g) => g.id),
      customerIds: selectedCustomer.map((c) => c.id),
      allProducts: productScope === "all",
      priority: priceProfileOptions.priority ?? 0,
    });

    setSavedPriceProfiles(result);
    setProductFilters(defaultProductFilters);
    setSelectedProducts([]);
    setSelectedCustomer([]);
    setSelectedCustomerGroups([]);
    setPriceProfileOptions(null);
      setCurrentStep(0);
    
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    async function loadFilters() {
      try {
        const data = await getProductFilters();
        console.log("Received filters in component:", data.categories);
        setFilters(data);
      } catch (err) {
        console.error("Error loading filters:", err);
      } 
    }
    loadFilters();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try { 
        const data = await getProducts(productFilters);
        console.log("Fetched products with filters",  data);
        setProducts(data);
      } catch (err) { 
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, [productFilters]);
  
  return (
    <main className="min-h-[calc(100vh-82px)] bg-[#F9FBFC] p-8">
      <div className="mx-auto w-full max-w-[1116px]">
        {/* Header */}
        <PriceProfileHeader />

        {/* Section 1 */}
        <div className="mt-4">
          {savedPriceProfiles?.map((profile) => (
            <PriceProfileSectionAccordion key={profile.id}
              products={products}
              filters={filters}
              priceProfile={profile}
              handlePriceProfileDelete={handlePriceProfileDelete} handlePriceProfileChange={handlePriceProfileChange} />
          ))}
        </div>

        {/* Section 2 */}
        <div className="mt-4">
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

          {currentStep === 2 && <>
            <ReviewPriceProfileSectionAccordion priceProfileOptions={priceProfileOptions}
              selectedCustomer={selectedCustomer} selectedCustomerGroup={selectedCustomerGroups}
              selectedProducts={selectedProducts} handlePriceProfileSave={handlePriceProfileSave}/>
          </>}

          <div className="mt-4">
            <SectionActions backDisabled={currentStep === 0} nextDisabled={currentStep === PricingProfileSteps.length - 1}
              onBack={() => {
                setCurrentStep((prev) => Math.max(0, prev - 1));
              }}
              onNext={() => setCurrentStep((prev) => Math.min(PricingProfileSteps.length - 1, prev + 1))}
            />
          </div>
        </div> 
        
        <div className="mt-4">
          <BestPricePriceProfileSectionAccordion/>
        </div>
      </div>
    </main>
  );
}