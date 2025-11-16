/**
 * Lead and customer inquiry types
 */

export interface Lead {
  id: string;
  organizationId: string;
  email: string;
  phone?: string;
  name?: string;
  company?: string;
  message?: string;
  source: 'website' | 'roi_calculator' | 'configurator' | 'contact_form' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  stage?: 'soft' | 'medium' | 'hard';
  budget?: string;
  timeline?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  convertedAt?: Date;
}

export type LeadStatus = Lead['status'];
export type LeadStage = NonNullable<Lead['stage']>;
export type LeadSource = Lead['source'];
