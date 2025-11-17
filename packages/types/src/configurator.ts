/**
 * Product configurator types
 */

export interface ConfiguratorInstance {
  id: string;
  organizationId: string;
  userId?: string;
  type: 'shed' | 'carport' | 'veranda' | 'custom';
  name?: string;
  configuration: Record<string, any>;
  bom?: BillOfMaterials;
  pricing?: PricingBreakdown;
  status: 'draft' | 'completed' | 'quoted';
  createdAt: Date;
  updatedAt: Date;
}

export interface BillOfMaterials {
  items: BOMItem[];
  totalCost: number;
  currency: string;
}

export interface BOMItem {
  id: string;
  category: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  supplier?: string;
  sku?: string;
}

export interface PricingBreakdown {
  subtotal: number;
  laborCost: number;
  materialCost: number;
  tax: number;
  total: number;
  currency: string;
  discounts?: PricingDiscount[];
}

export interface PricingDiscount {
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  amount: number;
}

export type ConfiguratorType = ConfiguratorInstance['type'];
export type ConfiguratorStatus = ConfiguratorInstance['status'];
