/**
 * Carport Configuration Types
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

export interface CarportConfiguration {
  // Product
  productType: 'carport'

  // Dimensions (meters)
  width: number // 2.5-6.0m (single car: 2.5-3.5m, double: 5.0-6.0m)
  depth: number // 4.0-7.0m
  height: number // 2.1-3.0m (clearance)

  // Roof
  roofType: 'flat' | 'mono-slope' | 'gabled'
  roofPitch: number // degrees (0-15 for carport)
  roofMaterial: RoofMaterial
  roofOverhang: number // 0.2-0.5m

  // Structure
  postCount: number // Auto-calculated based on span
  postSize: number // mm (100, 120, 150)
  beamSize: number // mm (120, 150, 200)
  ralColor: RALColor
  customRAL?: string // If ralColor is 'custom'

  // Options
  footing: FootingType
  gutters: GutterType
  lighting: LightingType
  sidePanel?: 'left' | 'right' | 'both' | 'none' // Optional wind protection
  storageArea?: boolean // Back storage compartment

  // Computed
  totalArea: number // m² (width * depth)
  coveredArea: number // m² including overhang
}

export interface CarportCalculations {
  baseArea: number // m²
  coveredArea: number // m² with overhang
  roofArea: number // m² actual roof surface
  postCount: number
  beamLength: number // m
  rafterCount: number
  perimeter: number // m
}
