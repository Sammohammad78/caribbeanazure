/**
 * Quote and proposal types
 */

export interface Quote {
  id: string;
  organizationId: string;
  leadId?: string;
  configurationId?: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  validUntil: Date;
  notes?: string;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  viewedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
}

export interface QuoteItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  category?: string;
}

export type QuoteStatus = Quote['status'];
