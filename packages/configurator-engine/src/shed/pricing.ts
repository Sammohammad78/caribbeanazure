/**
 * Shed Pricing Calculation
 * Dynamic pricing engine based on materials, labor, and regional factors
 */

import { ShedConfiguration } from './types'
import { calculateQuantities } from './calculations'

// ============================================================================
// BASE MATERIAL COSTS (EUR per unit, 2025 estimates)
// ============================================================================

const MATERIAL_COSTS = {
  // Foundation & base (EUR per m³)
  concrete: 150,
  gravel: 30,

  // Framing lumber (EUR per m³)
  lumber_softwood: 450,

  // Wall cladding (EUR per m²)
  timber_cladding: 45,
  composite_cladding: 75,
  metal_cladding: 65,

  // Roof materials (EUR per m²)
  tiles: 35,
  'metal-sheet': 55,
  'green-roof': 120,
  bitumen: 25,

  // Floor (EUR per m²)
  concrete_slab: 65,
  timber_floor: 40,

  // Openings (EUR per unit)
  door_single: 350,
  door_double: 600,
  window_standard: 180,
} as const

// ============================================================================
// LABOR RATES (EUR per hour, including overhead)
// ============================================================================

const LABOR_RATES = {
  NL: {
    carpenter: 65,
    laborer: 45,
    roofer: 70,
  },
  DE: {
    carpenter: 60,
    laborer: 42,
    roofer: 65,
  },
  BE: {
    carpenter: 58,
    laborer: 40,
    roofer: 62,
  },
} as const

// ============================================================================
// MATERIAL MULTIPLIERS
// ============================================================================

const MATERIAL_MULTIPLIERS = {
  wall: {
    timber: 1.0,
    composite: 1.4,
    metal: 1.3,
  },
  roof: {
    flat: 1.0,
    gabled: 1.25,
    'mono-slope': 1.15,
  },
  roofMaterial: {
    tiles: 1.0,
    'metal-sheet': 1.3,
    'green-roof': 2.5,
    bitumen: 0.8,
  },
} as const

// ============================================================================
// VAT RATES
// ============================================================================

const VAT_RATES = {
  NL: 0.21,
  DE: 0.19,
  BE: 0.21,
} as const

// ============================================================================
// TYPES
// ============================================================================

export interface PriceBreakdown {
  // Line items
  foundation: number
  framing: number
  walls: number
  roof: number
  doors: number
  windows: number
  labor: number

  // Subtotals
  materials: number
  subtotal: number

  // Tax
  vat: number
  vatRate: number

  // Total
  total: number

  // Range (accounting for variance)
  range: {
    min: number
    max: number
  }

  // Metadata
  currency: string
  country: string
  lastUpdated: Date
}

export interface PricingContext {
  country: 'NL' | 'DE' | 'BE'
  region?: string
  currency?: 'EUR'
  locale?: string
}

// ============================================================================
// LABOR TIME ESTIMATION
// ============================================================================

function estimateLaborHours(config: ShedConfiguration): number {
  const quantities = calculateQuantities(config)
  const footprint = quantities.totalFloorArea

  // Base time by footprint (hours per 10m²)
  let baseHours = (footprint / 10) * 12 // ~12 hours per 10m²

  // Add time for roof complexity
  if (config.roofType === 'gabled') {
    baseHours *= 1.3
  } else if (config.roofType === 'mono-slope') {
    baseHours *= 1.15
  }

  // Add time for openings
  baseHours += config.doorCount * 2
  baseHours += config.windowCount * 1.5

  // Add time for complex materials
  if (config.wallMaterial === 'composite') {
    baseHours *= 1.2
  }

  if (config.roofMaterial === 'green-roof') {
    baseHours *= 1.5
  }

  return Math.round(baseHours)
}

// ============================================================================
// REGIONAL MULTIPLIER
// ============================================================================

const REGIONAL_MULTIPLIERS: Record<string, Record<string, number>> = {
  NL: {
    'Noord-Holland': 1.15,
    'Zuid-Holland': 1.1,
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

function getRegionalMultiplier(country: string, region?: string): number {
  if (!region) return 1.0

  const countryMultipliers = REGIONAL_MULTIPLIERS[country]
  if (!countryMultipliers) return 1.0

  return countryMultipliers[region] || countryMultipliers.default || 1.0
}

// ============================================================================
// MAIN PRICING FUNCTION
// ============================================================================

export function calculatePrice(
  config: ShedConfiguration,
  context: PricingContext = { country: 'NL', currency: 'EUR' }
): PriceBreakdown {
  const quantities = calculateQuantities(config)
  const regionalMultiplier = getRegionalMultiplier(context.country, context.region)

  // --- FOUNDATION ---
  const foundationVolume = quantities.totalFloorArea * 0.15
  const foundationCost = foundationVolume * MATERIAL_COSTS.concrete * regionalMultiplier

  // --- FRAMING ---
  const perimeter = quantities.perimeter
  const framingVolume = (perimeter * config.wallHeight * 0.09 + quantities.roofArea * 0.05)
  const framingCost = framingVolume * MATERIAL_COSTS.lumber_softwood * regionalMultiplier

  // --- WALLS ---
  const wallCostPerM2 = MATERIAL_COSTS[`${config.wallMaterial}_cladding` as keyof typeof MATERIAL_COSTS] as number
  const wallMultiplier = MATERIAL_MULTIPLIERS.wall[config.wallMaterial]
  const wallCost = quantities.materials.walls.area * wallCostPerM2 * wallMultiplier * regionalMultiplier

  // --- ROOF ---
  const roofCostPerM2 = MATERIAL_COSTS[config.roofMaterial] as number
  const roofTypeMultiplier = MATERIAL_MULTIPLIERS.roof[config.roofType]
  const roofMaterialMultiplier = MATERIAL_MULTIPLIERS.roofMaterial[config.roofMaterial]
  const roofCost =
    quantities.materials.roof.area *
    roofCostPerM2 *
    roofTypeMultiplier *
    roofMaterialMultiplier *
    regionalMultiplier

  // --- DOORS ---
  const doorCost = config.doorCount * MATERIAL_COSTS.door_single * regionalMultiplier

  // --- WINDOWS ---
  const windowCost = config.windowCount * MATERIAL_COSTS.window_standard * regionalMultiplier

  // --- LABOR ---
  const laborHours = estimateLaborHours(config)
  const laborRates = LABOR_RATES[context.country]
  const avgLaborRate = (laborRates.carpenter + laborRates.laborer + laborRates.roofer) / 3
  const laborCost = laborHours * avgLaborRate * regionalMultiplier

  // --- TOTALS ---
  const materials = foundationCost + framingCost + wallCost + roofCost + doorCost + windowCost
  const subtotal = materials + laborCost

  const vatRate = VAT_RATES[context.country]
  const vat = subtotal * vatRate
  const total = subtotal + vat

  // Price range (±15% variance)
  const variance = 0.15
  const min = total * (1 - variance)
  const max = total * (1 + variance)

  return {
    foundation: Math.round(foundationCost),
    framing: Math.round(framingCost),
    walls: Math.round(wallCost),
    roof: Math.round(roofCost),
    doors: Math.round(doorCost),
    windows: Math.round(windowCost),
    labor: Math.round(laborCost),
    materials: Math.round(materials),
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
    lastUpdated: new Date(),
  }
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'EUR', locale: string = 'nl-NL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
