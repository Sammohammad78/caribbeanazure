/**
 * Configurator Engine
 * Unified configurator logic for sheds, carports, and verandas
 */

// Shed exports
export * from './shed/types'
export * from './shed/calculations'
export * from './shed/validation'
export * from './shed/bom'
export * from './shed/pricing'
export * from './shed/presets'

// Carport exports
export * from './carport/types'
export * from './carport/calculations'
export * from './carport/validation'
export * from './carport/bom'
export * from './carport/pricing'

// Veranda exports
export * from './veranda/types'
export * from './veranda/calculations'
export * from './veranda/validation'
export * from './veranda/bom'
export * from './veranda/pricing'

// Shared utilities
export * from './shared/rules-engine'
export * from './shared/pricing-base'
export * from './shared/utils'

// Re-export namespaced modules for clarity
import * as Shed from './shed/types'
import * as ShedCalculations from './shed/calculations'
import * as ShedValidation from './shed/validation'
import * as ShedBOM from './shed/bom'
import * as ShedPricing from './shed/pricing'
import * as ShedPresets from './shed/presets'

import * as Carport from './carport/types'
import * as CarportCalculations from './carport/calculations'
import * as CarportValidation from './carport/validation'
import * as CarportBOM from './carport/bom'
import * as CarportPricing from './carport/pricing'

import * as Veranda from './veranda/types'
import * as VerandaCalculations from './veranda/calculations'
import * as VerandaValidation from './veranda/validation'
import * as VerandaBOM from './veranda/bom'
import * as VerandaPricing from './veranda/pricing'

export {
  Shed,
  ShedCalculations,
  ShedValidation,
  ShedBOM,
  ShedPricing,
  ShedPresets,
  Carport,
  CarportCalculations,
  CarportValidation,
  CarportBOM,
  CarportPricing,
  Veranda,
  VerandaCalculations,
  VerandaValidation,
  VerandaBOM,
  VerandaPricing,
}
