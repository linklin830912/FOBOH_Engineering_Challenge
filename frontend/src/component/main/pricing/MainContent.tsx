import { useEffect, useState } from "react";
import PriceProfileHeader from "./PriceProfileHeader";
import PriceProfileSectionAccordion from "./PriceProfileSectionAccordion";
import SetupPriceProfileSectionAccordion from "./setup/SetupPriceProfileSectionAccordion";
import { FilterOptions, ProductFilters } from "./setup/ProductSearchSection";
import { getProducts } from "../../../api/getProducts";
import { Customer, CustomerGroup, Product } from "../../../type/Pricing";
import { getProductFilters } from "../../../api/getProductFilters";
import CalculatePriceProfileSectionAccordion from "./calculate/CaculatePriceProfileSectionAccordion";
import SectionActions from "../shared/SectionActions";
import CustomerPriceProfileSectionAccordion from "./customer/CustomerPriceProfileSectionAccordion";
import ReviewPriceProfileSectionAccordion from "./review/ReviewPriceProfileSectionAccordion";

const PricingProfileSteps = ["Product", "Customer", "Review"] as const;
export default function MainContent() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    title: "",
    sku: "",  
    subCategory: "",
    segment: "",
    brand: "",
  });
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([]);
  const handleToggleCustomer = (customer: Customer) => {
      setSelectedCustomer((prev) =>
          prev.map(x=>x.id).includes(customer.id)
          ? prev.filter((x) => x.id !== customer.id)
          : [...prev, customer]
      );
  };
  const [selectedCustomerGroups, setSelectedCustomerGroups] = useState<CustomerGroup[]>([]);
  const handleToggleCustomerGroup = (customerGroup: CustomerGroup) => {
      setSelectedCustomerGroups((prev) =>
          prev.map(x=>x.id).includes(customerGroup.id)
          ? prev.filter((x) => x.id !== customerGroup.id)
          : [...prev, customerGroup]
      );
  }

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
          <PriceProfileSectionAccordion />
        </div>

        {/* Section 2 */}
        <div className="mt-4">
          {currentStep === 0 && <>
            {filters && <SetupPriceProfileSectionAccordion
              products={products}
              setProductFilters={setProductFilters}
              productFilters={productFilters}
              filters={filters}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />}

            <CalculatePriceProfileSectionAccordion selectedProducts={selectedProducts} />
          </>}

          {currentStep === 1 && <>
            <CustomerPriceProfileSectionAccordion
              selectedCustomer={selectedCustomer} onToggleCustomer={handleToggleCustomer}
              selectedCustomerGroups={selectedCustomerGroups} onToggleCustomerGroup={handleToggleCustomerGroup} />
          </>}

          {currentStep === 2 && <>
           <ReviewPriceProfileSectionAccordion selectedCustomer={selectedCustomer} selectedCustomerGroup={selectedCustomerGroups} selectedProducts={selectedProducts} />
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
      </div>
    </main>
  );
}