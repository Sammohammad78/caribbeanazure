/**
 * Veranda Configuration Types
 */

export type RoofMaterial = 'polycarbonate' | 'steel-sheet' | 'aluminum-panels' | 'glass'

export type RALColor =
  | 'RAL-7016' // Anthracite Grey
  | 'RAL-9005' // Jet Black
  | 'RAL-9010' // Pure White
  | 'RAL-7035' // Light Grey
  | 'RAL-9006' // White Aluminum
  | 'RAL-8017' // Chocolate Brown
  | 'custom'

export type FootingType = 'surface-mount' | 'concrete-bolted' | 'foundation-embedded'

export type GutterType = 'none' | 'standard-pvc' | 'aluminum-seamless'

export type LightingType = 'none' | 'led-strip' | 'recessed-spots' | 'pendant'

export interface VerandaConfiguration {
  // Product
  productType: 'veranda'

  // Dimensions (meters)
  width: number // 3.0-10.0m
  depth: number // 2.5-5.0m (projection from wall)
  height: number // 2.2-3.5m (clearance at front)

  // Roof
  roofType: 'flat' | 'mono-slope' // Verandas are typically attached
  roofPitch: number // degrees (2-10 for drainage)
  roofMaterial: RoofMaterial
  roofOverhang: number // 0.1-0.3m

  // Structure
  postCount: number // Auto-calculated
  postSize: number // mm (80, 100, 120)
  rafterSpacing: number // mm (400, 500, 600)
  ralColor: RALColor
  customRAL?: string

  // Glass/Panels
  glassType?: 'none' | 'sliding-glass' | 'fixed-glass' | 'polycarbonate'
  glassSides?: 'none' | 'left' | 'right' | 'both' | 'front'

  // Options
  footing: FootingType
  gutters: GutterType
  lighting: LightingType
  heater?: boolean // Optional infrared heater
  motorizedAwning?: boolean // Optional retractable awning
  wallAttachment: 'bracket' | 'ledger-board' // How it attaches to building

  // Computed
  totalArea: number // m²
  glassArea?: number // m² if glass panels included
}

export interface VerandaCalculations {
  baseArea: number // m²
  roofArea: number // m² actual roof surface
  postCount: number
  rafterCount: number
  glassArea?: number // m²
  perimeter: number // m
}
