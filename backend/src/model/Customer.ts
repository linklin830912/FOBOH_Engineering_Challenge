export type Customer = {
  id: string;
  name: string;
  groupIds?: string[]; // Mock relational field (remove in real DB)
};

export type CustomerGroupType = "custom" | "auto" ;
export type CustomerGroup = {
  id: string;
  name: string;
  customerIds: string[];
  type: CustomerGroupType;
  priceProfileIds?: string[]; // Mock relational field (remove in real DB)
};