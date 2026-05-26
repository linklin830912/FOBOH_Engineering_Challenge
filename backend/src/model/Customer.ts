export type Customer = {
  id: string;
  name: string;

  groupId: string;
  group?: CustomerGroup;
};

export type CustomerGroup = {
  id: string;
  name: string;
};