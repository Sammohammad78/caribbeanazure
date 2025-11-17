/**
 * Shed Configuration Types
 */

export type ShedType = 'berging' | 'tuinhuis' | 'schuur' | 'atelier'

export type RoofType = 'flat' | 'gabled' | 'mono-slope'

export type WallMaterial = 'timber' | 'metal' | 'composite'

export type RoofMaterial = 'tiles' | 'metal-sheet' | 'green-roof' | 'bitumen'

export type FloorMaterial = 'timber' | 'concrete' | 'tiles'

export interface ShedConfiguration {
  // Shed Type (determines default restrictions)
  shedType: ShedType

  // Dimensions
  width: number // meters (2-10)
  length: number // meters (2-10)
  wallHeight: number // meters (2.0-3.0)
  roofType: RoofType
  roofPitch: number // degrees (15-45) - only for gabled/mono-slope

  // Doors
  doorCount: number // 0-4
  doorWidth: number // meters (0.8-2.5)
  doorHeight: number // meters (1.8-2.5)

  // Windows
  windowCount: number // 0-8
  windowWidth: number // meters (0.6-1.5)
  windowHeight: number // meters (0.6-1.2)

  // Materials
  wallMaterial: WallMaterial
  roofMaterial: RoofMaterial
  floorMaterial: FloorMaterial

  // Visual Options
  showFloor: boolean
  showFrame: boolean // Corner posts visibility

  // Legacy compatibility
  floors: number // Always 1 for sheds
  floorHeight: number // Same as wallHeight
  houseType: 'rectangle' // Fixed for sheds
  windowRatio: number // Calculated from windowCount
}

// Product restrictions by shed type
export interface ShedTypeRestrictions {
  width: { min: number; max: number }
  length: { min: number; max: number }
  wallHeight: { min: number; max: number }
  doorCount: { min: number; max: number }
  windowCount: { min: number; max: number }
  allowedRoofTypes: RoofType[]
  defaultDoorWidth: number
  defaultDoorHeight: number
  defaultWindowWidth: number
  defaultWindowHeight: number
}

export const SHED_TYPE_RESTRICTIONS: Record<ShedType, ShedTypeRestrictions> = {
  berging: {
    // Storage shed - compact
    width: { min: 2.0, max: 4.0 },
    length: { min: 2.0, max: 4.0 },
    wallHeight: { min: 2.0, max: 2.5 },
    doorCount: { min: 1, max: 1 },
    windowCount: { min: 0, max: 2 },
    allowedRoofTypes: ['flat', 'mono-slope'],
    defaultDoorWidth: 0.9,
    defaultDoorHeight: 2.0,
    defaultWindowWidth: 0.6,
    defaultWindowHeight: 0.6,
  },
  tuinhuis: {
    // Garden house - medium
    width: { min: 2.5, max: 6.0 },
    length: { min: 3.0, max: 6.0 },
    wallHeight: { min: 2.2, max: 2.8 },
    doorCount: { min: 1, max: 2 },
    windowCount: { min: 1, max: 6 },
    allowedRoofTypes: ['flat', 'gabled', 'mono-slope'],
    defaultDoorWidth: 1.0,
    defaultDoorHeight: 2.1,
    defaultWindowWidth: 1.0,
    defaultWindowHeight: 1.0,
  },
  schuur: {
    // Large shed/barn
    width: { min: 4.0, max: 10.0 },
    length: { min: 4.0, max: 10.0 },
    wallHeight: { min: 2.5, max: 3.0 },
    doorCount: { min: 1, max: 4 },
    windowCount: { min: 0, max: 8 },
    allowedRoofTypes: ['gabled', 'mono-slope'],
    defaultDoorWidth: 2.4,
    defaultDoorHeight: 2.4,
    defaultWindowWidth: 1.2,
    defaultWindowHeight: 1.0,
  },
  atelier: {
    // Workshop - lots of light
    width: { min: 3.0, max: 8.0 },
    length: { min: 4.0, max: 8.0 },
    wallHeight: { min: 2.4, max: 3.0 },
    doorCount: { min: 1, max: 2 },
    windowCount: { min: 2, max: 8 },
    allowedRoofTypes: ['flat', 'gabled', 'mono-slope'],
    defaultDoorWidth: 1.0,
    defaultDoorHeight: 2.1,
    defaultWindowWidth: 1.2,
    defaultWindowHeight: 1.2,
  },
}

export interface QuantityResults {
  // Areas in m²
  totalFloorArea: number
  floorAreaPerLevel: number
  externalWallArea: number
  windowArea: number
  opaqueWallArea: number
  roofArea: number

  // Volumes in m³
  totalVolume: number

  // Dimensions
  perimeter: number
  totalHeight: number

  // Material quantities (simplified)
  materials: {
    walls: {
      type: WallMaterial
      area: number
      unit: 'm²'
    }
    windows: {
      count: number
      area: number
      unit: 'm²'
    }
    roof: {
      type: RoofMaterial
      area: number
      unit: 'm²'
    }
    floor: {
      type: FloorMaterial
      area: number
      unit: 'm²'
    }
    doors: {
      count: number
      unit: 'stuks'
    }
  }
}
