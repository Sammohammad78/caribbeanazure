/**
 * Carport Pricing Calculation
 * Calculate estimated price for carport configurations
 */

import { CarportConfiguration } from './types'
import { calculateCarportDimensions } from './calculations'

export interface CarportPriceBreakdown {
  structure: number // Posts, beams, purlins
  roofing: number // Roof panels
  options: number // Gutters, lighting, side panels
  installation: number // Labor
  subtotal: number
  vat: number
  vatRate: number
  total: number
  range: {
    min: number
    max: number
  }
  currency: string
  country: string
}

export interface PricingContext {
  country: 'NL' | 'DE' | 'BE'
  includeInstallation?: boolean
  currency?: 'EUR'
}

// Base prices (EUR)
const PRICING = {
  // Structure per meter (posts + beams)
  structure_per_sqm: 180, // €180 per m²

  // Roofing materials per m²
  roofMaterial: {
    polycarbonate: 45,
    'steel-sheet': 65,
    'aluminum-panels': 85,
    glass: 150,
  },

  // Post size multipliers
  postSize: {
    100: 1.0,
    120: 1.2,
    150: 1.5,
  },

  // Options
  gutters: {
    none: 0,
    'standard-pvc': 25, // per meter
    'aluminum-seamless': 45, // per meter
  },

  lighting: {
    none: 0,
    'led-strip': 150, // per strip
    'recessed-spots': 80, // per spot
    pendant: 120, // per pendant
  },

  sidePanel_per_sqm: 95, // €95 per m²

  storageArea_base: 800, // Fixed cost for storage area

  // Installation (EUR per m²)
  installation_per_sqm: 120,
} as const

const VAT_RATES = {
  NL: 0.21,
  DE: 0.19,
  BE: 0.21,
} as const

/**
 * Calculate carport price
 */
export function calculateCarportPrice(
  config: CarportConfiguration,
  context: PricingContext = { country: 'NL', includeInstallation: true }
): CarportPriceBreakdown {
  const calcs = calculateCarportDimensions(config)

  // 1. STRUCTURE COST
  const postSizeMultiplier = PRICING.postSize[config.postSize as keyof typeof PRICING.postSize] || 1.0
  const structureCost = calcs.baseArea * PRICING.structure_per_sqm * postSizeMultiplier

  // 2. ROOFING COST
  const roofMaterialPrice = PRICING.roofMaterial[config.roofMaterial]
  const roofingCost = calcs.roofArea * roofMaterialPrice

  // 3. OPTIONS COST
  let optionsCost = 0

  // Gutters
  if (config.gutters !== 'none') {
    const gutterPrice = PRICING.gutters[config.gutters]
    optionsCost += calcs.perimeter * gutterPrice
  }

  // Lighting
  if (config.lighting !== 'none') {
    let lightingCount = 1
    if (config.lighting === 'led-strip') {
      lightingCount = Math.ceil(config.width / 2)
    } else if (config.lighting === 'recessed-spots') {
      lightingCount = Math.ceil((config.width * config.depth) / 4)
    } else if (config.lighting === 'pendant') {
      lightingCount = Math.max(2, Math.ceil(config.width / 3))
    }
    optionsCost += lightingCount * PRICING.lighting[config.lighting]
  }

  // Side panels
  if (config.sidePanel && config.sidePanel !== 'none') {
    const sidePanelArea = config.height * config.depth
    if (config.sidePanel === 'both') {
      optionsCost += sidePanelArea * 2 * PRICING.sidePanel_per_sqm
    } else {
      optionsCost += sidePanelArea * PRICING.sidePanel_per_sqm
    }
  }

  // Storage area
  if (config.storageArea) {
    optionsCost += PRICING.storageArea_base
  }

  // 4. INSTALLATION
  let installationCost = 0
  if (context.includeInstallation !== false) {
    installationCost = calcs.baseArea * PRICING.installation_per_sqm
  }

  // 5. TOTALS
  const subtotal = structureCost + roofingCost + optionsCost + installationCost
  const vatRate = VAT_RATES[context.country]
  const vat = subtotal * vatRate
  const total = subtotal + vat

  // Price range (±12%)
  const variance = 0.12
  const min = total * (1 - variance)
  const max = total * (1 + variance)

  return {
    structure: Math.round(structureCost),
    roofing: Math.round(roofingCost),
    options: Math.round(optionsCost),
    installation: Math.round(installationCost),
    subtotal: Math.round(subtotal),
    vat: Math.round(vat),
    vatRate,
    total: Math.round(total),
    range: {
      min: Math.round(min),
      max: Math.round(max),
    },
    currency: context.currency || 'EUR',
    country: context.country,
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
