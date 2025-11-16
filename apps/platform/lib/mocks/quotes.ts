/**
 * Mock Quote Data
 *
 * TODO: Replace with real database
 */

import { generateId } from '../utils'

export interface Quote {
  id: string
  leadId: string
  productType: 'shed' | 'carport' | 'veranda'
  configData: any
  pricing: {
    subtotal: number
    tax: number
    total: number
    currency: string
  }
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected'
  validUntil: string
  createdAt: string
  updatedAt: string
}

const quotes: Quote[] = [
  {
    id: 'quote-001',
    leadId: 'lead-1001',
    productType: 'shed',
    configData: {
      width: 12,
      depth: 8,
      height: 8,
      roofType: 'gable',
    },
    pricing: {
      subtotal: 8500,
      tax: 850,
      total: 9350,
      currency: 'USD',
    },
    status: 'sent',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'quote-002',
    leadId: 'lead-1003',
    productType: 'veranda',
    configData: {
      width: 4,
      depth: 3,
      height: 2.5,
    },
    pricing: {
      subtotal: 5200,
      tax: 520,
      total: 5720,
      currency: 'USD',
    },
    status: 'viewed',
    validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

/**
 * Get all quotes
 */
export async function getQuotes(): Promise<Quote[]> {
  return [...quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

/**
 * Get quote by ID
 */
export async function getQuoteById(id: string): Promise<Quote | null> {
  return quotes.find((quote) => quote.id === id) || null
}

/**
 * Create new quote
 */
export async function createQuote(
  data: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Quote> {
  const quote: Quote = {
    ...data,
    id: `quote-${generateId()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  quotes.push(quote)
  return quote
}
