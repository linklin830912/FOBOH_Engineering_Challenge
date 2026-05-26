export enum AdjustmentType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export enum AdjustmentDirection {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

export type PricingProfile = {
  id: string;
  name: string;

  adjustmentType: AdjustmentType;
  direction: AdjustmentDirection;
  value: number;

  priority: number;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
};