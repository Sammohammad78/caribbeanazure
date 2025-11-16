/**
 * Veranda Pricing Calculation
 */

import { VerandaConfiguration } from './types'
import { calculateVerandaDimensions } from './calculations'

export interface VerandaPriceBreakdown {
  structure: number // Posts, rafters, wall attachment
  roofing: number // Roof panels
  glazing: number // Glass panels if any
  options: number // Gutters, lighting, heater, awning
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
  // Structure per m²
  structure_per_sqm: 160,

  // Roofing materials per m²
  roofMaterial: {
    polycarbonate: 50,
    'steel-sheet': 70,
    'aluminum-panels': 90,
    glass: 180,
  },

  // Post size multipliers
  postSize: {
    80: 0.9,
    100: 1.0,
    120: 1.2,
  },

  // Glass/glazing per m²
  glassType: {
    none: 0,
    'sliding-glass': 350,
    'fixed-glass': 200,
    polycarbonate: 80,
  },

  // Options
  gutters: {
    none: 0,
    'standard-pvc': 25, // per meter
    'aluminum-seamless': 45, // per meter
  },

  lighting: {
    none: 0,
    'led-strip': 150,
    'recessed-spots': 80,
    pendant: 120,
  },

  heater: 400, // per heater
  motorizedAwning: 800, // base cost

  // Wall attachment
  wallAttachment: {
    bracket: 200,
    'ledger-board': 300,
  },

  // Installation (EUR per m²)
  installation_per_sqm: 140,
} as const

const VAT_RATES = {
  NL: 0.21,
  DE: 0.19,
  BE: 0.21,
} as const

/**
 * Calculate veranda price
 */
export function calculateVerandaPrice(
  config: VerandaConfiguration,
  context: PricingContext = { country: 'NL', includeInstallation: true }
): VerandaPriceBreakdown {
  const calcs = calculateVerandaDimensions(config)

  // 1. STRUCTURE COST
  const postSizeMultiplier = PRICING.postSize[config.postSize as keyof typeof PRICING.postSize] || 1.0
  const structureCost =
    calcs.baseArea * PRICING.structure_per_sqm * postSizeMultiplier +
    PRICING.wallAttachment[config.wallAttachment]

  // 2. ROOFING COST
  const roofMaterialPrice = PRICING.roofMaterial[config.roofMaterial]
  const roofingCost = calcs.roofArea * roofMaterialPrice

  // 3. GLAZING COST
  let glazingCost = 0
  if (config.glassType && config.glassType !== 'none' && calcs.glassArea) {
    const glassPrice = PRICING.glassType[config.glassType]
    glazingCost = calcs.glassArea * glassPrice
  }

  // 4. OPTIONS COST
  let optionsCost = 0

  // Gutters
  if (config.gutters !== 'none') {
    const gutterPrice = PRICING.gutters[config.gutters]
    optionsCost += config.width * gutterPrice
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

  // Heater
  if (config.heater) {
    const heaterCount = Math.max(1, Math.ceil(config.width / 4))
    optionsCost += heaterCount * PRICING.heater
  }

  // Motorized awning
  if (config.motorizedAwning) {
    optionsCost += PRICING.motorizedAwning + config.width * 50 // Base + per meter
  }

  // 5. INSTALLATION
  let installationCost = 0
  if (context.includeInstallation !== false) {
    installationCost = calcs.baseArea * PRICING.installation_per_sqm
  }

  // 6. TOTALS
  const subtotal = structureCost + roofingCost + glazingCost + optionsCost + installationCost
  const vatRate = VAT_RATES[context.country]
  const vat = subtotal * vatRate
  const total = subtotal + vat

  // Price range (±15%)
  const variance = 0.15
  const min = total * (1 - variance)
  const max = total * (1 + variance)

  return {
    structure: Math.round(structureCost),
    roofing: Math.round(roofingCost),
    glazing: Math.round(glazingCost),
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
