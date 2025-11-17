/**
 * Base Pricing Utilities
 * Common pricing calculations and formatting
 */

export interface PricingContext {
  country: 'NL' | 'DE' | 'BE'
  region?: string
  currency?: 'EUR'
  includeVAT?: boolean
}

export interface PriceRange {
  min: number
  max: number
  variance: number
}

// VAT rates by country
export const VAT_RATES = {
  NL: 0.21, // 21% BTW
  DE: 0.19, // 19% MwSt
  BE: 0.21, // 21% TVA/BTW
} as const

// Regional cost multipliers
export const REGIONAL_MULTIPLIERS: Record<string, Record<string, number>> = {
  NL: {
    'Noord-Holland': 1.15,
    'Zuid-Holland': 1.1,
    Utrecht: 1.08,
    Zeeland: 0.95,
    Limburg: 0.92,
    Groningen: 0.9,
    default: 1.0,
  },
  DE: {
    Bayern: 1.12,
    'Baden-Württemberg': 1.08,
    Berlin: 1.05,
    'Nordrhein-Westfalen': 1.0,
    Sachsen: 0.88,
    default: 1.0,
  },
  BE: {
    Brussels: 1.12,
    Flanders: 1.05,
    Wallonia: 0.95,
    default: 1.0,
  },
}

/**
 * Get VAT rate for a country
 */
export function getVATRate(country: 'NL' | 'DE' | 'BE'): number {
  return VAT_RATES[country]
}

/**
 * Calculate VAT amount
 */
export function calculateVAT(amount: number, country: 'NL' | 'DE' | 'BE'): number {
  return amount * getVATRate(country)
}

/**
 * Get regional cost multiplier
 */
export function getRegionalMultiplier(country: string, region?: string): number {
  if (!region) return 1.0

  const countryMultipliers = REGIONAL_MULTIPLIERS[country]
  if (!countryMultipliers) return 1.0

  return countryMultipliers[region] || countryMultipliers.default || 1.0
}

/**
 * Calculate price range with variance
 */
export function calculatePriceRange(basePrice: number, variance: number = 0.15): PriceRange {
  return {
    min: basePrice * (1 - variance),
    max: basePrice * (1 + variance),
    variance,
  }
}

/**
 * Format price for display
 */
export function formatPrice(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'nl-NL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format price range
 */
export function formatPriceRange(
  range: PriceRange,
  currency: string = 'EUR',
  locale: string = 'nl-NL'
): string {
  return `${formatPrice(range.min, currency, locale)} - ${formatPrice(range.max, currency, locale)}`
}

/**
 * Round to nearest value
 */
export function roundToNearest(value: number, nearest: number = 10): number {
  return Math.round(value / nearest) * nearest
}

/**
 * Apply discount percentage
 */
export function applyDiscount(amount: number, discountPercent: number): number {
  return amount * (1 - discountPercent / 100)
}

/**
 * Calculate price per unit
 */
export function pricePerUnit(totalPrice: number, quantity: number): number {
  if (quantity === 0) return 0
  return totalPrice / quantity
}

/**
 * Calculate markup
 */
export function applyMarkup(cost: number, markupPercent: number): number {
  return cost * (1 + markupPercent / 100)
}

/**
 * Convert currency (placeholder - would integrate with exchange API)
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  // Placeholder - in real implementation would use exchange rates
  if (fromCurrency === toCurrency) return amount

  // For now, just return the same amount
  return amount
}

/**
 * Price breakdown formatter
 */
export interface PriceBreakdownItem {
  label: string
  amount: number
  description?: string
}

export function formatPriceBreakdown(
  items: PriceBreakdownItem[],
  currency: string = 'EUR',
  locale: string = 'nl-NL'
): string {
  let output = ''

  items.forEach((item) => {
    const price = formatPrice(item.amount, currency, locale)
    output += `${item.label.padEnd(30)} ${price.padStart(15)}\n`
    if (item.description) {
      output += `  ${item.description}\n`
    }
  })

  return output
}
