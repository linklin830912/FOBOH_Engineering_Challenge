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