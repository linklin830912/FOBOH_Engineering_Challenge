export type Customer = {
  id: string;
  name: string;
  groupIds?: string[];
};

export type CustomerGroup = {
  id: string;
  name: string;
  customerIds: string[];
};

export const MOCK_CUSTOMER_GROUPS: CustomerGroup[] = [
  {
    id: "group-vip",
    name: "VIP",
    customerIds: ["cust-001", "cust-002"],
  },
  {
    id: "group-retail",
    name: "Retail",
    customerIds: ["cust-003", "cust-004"],
  },
  {
    id: "group-wholesale",
    name: "Wholesale",
    customerIds: ["cust-005"],
  },
  {
    id: "group-hospitality",
    name: "Hospitality",
    customerIds: ["cust-006", "cust-007"],
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    name: "Harbour Fine Wines",
    groupIds: ["group-vip"],
  },
  {
    id: "cust-002",
    name: "Sydney Luxury Cellars",
    groupIds: ["group-vip"],
  },
  {
    id: "cust-003",
    name: "Bondi Bottleshop",
    groupIds: ["group-retail"],
  },
  {
    id: "cust-004",
    name: "City Liquor Store",
    groupIds: ["group-retail"],
  },
  {
    id: "cust-005",
    name: "Aussie Wine Distributors",
    groupIds: ["group-wholesale"],
  },
  {
    id: "cust-006",
    name: "Metro Hospitality Group",
    groupIds: ["group-hospitality"],
  },
  {
    id: "cust-007",
    name: "Coastal Resorts Group",
    groupIds: ["group-hospitality"],
  },
];