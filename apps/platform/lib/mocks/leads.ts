/**
 * Mock Lead Data Repository
 *
 * TODO: Replace with real database (Supabase/Prisma)
 */

import { generateId } from '../utils'

export interface LeadData {
  email: string
  name?: string
  phone?: string
  company?: string
  productType: 'shed' | 'carport' | 'veranda'
  message?: string
  configData?: any
  quoteId?: string
  source: 'website' | 'whatsapp' | 'direct' | 'configurator'
}

export interface Lead extends LeadData {
  id: string
  createdAt: string
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
}

// In-memory storage (for demo purposes)
const leads: Lead[] = [
  {
    id: 'lead-1001',
    email: 'john.doe@example.com',
    name: 'John Doe',
    phone: '+1-555-0100',
    productType: 'shed',
    message: 'Interested in a 12x8 shed for backyard',
    source: 'configurator',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
  {
    id: 'lead-1002',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    company: 'Smith Construction',
    productType: 'carport',
    message: 'Need quote for double carport',
    source: 'website',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'contacted',
  },
  {
    id: 'lead-1003',
    email: 'bob.wilson@example.com',
    name: 'Bob Wilson',
    phone: '+1-555-0102',
    productType: 'veranda',
    message: 'Looking for aluminum veranda 4m x 3m',
    source: 'configurator',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'quoted',
  },
]

/**
 * Save a new lead
 */
export async function saveLead(data: LeadData): Promise<Lead> {
  const lead: Lead = {
    ...data,
    id: `lead-${generateId()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  }

  leads.push(lead)
  return lead
}

/**
 * Get all leads
 */
export async function getLeads(): Promise<Lead[]> {
  return [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

/**
 * Get lead by ID
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  return leads.find((lead) => lead.id === id) || null
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  id: string,
  status: Lead['status']
): Promise<Lead | null> {
  const lead = leads.find((l) => l.id === id)
  if (lead) {
    lead.status = status
    return lead
  }
  return null
}
