/**
 * Organization and tenant types
 */

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  industry?: string;
  size?: 'solo' | 'small' | 'medium' | 'large' | 'enterprise';
  plan: 'free' | 'base' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  organizationId: string;
  brandColor?: string;
  brandLogo?: string;
  notificationEmail?: string;
  enabledFeatures: string[];
  customDomain?: string;
}

export type OrganizationPlan = Organization['plan'];
export type OrganizationSize = NonNullable<Organization['size']>;
