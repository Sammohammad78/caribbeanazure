/**
 * Shed Calculation Functions
 * Surface area, volume, and quantity calculations
 */

import { ShedConfiguration, QuantityResults } from './types'

/**
 * Calculate perimeter of the shed
 */
export function calculatePerimeter(config: ShedConfiguration): number {
  return 2 * (config.width + config.length)
}

/**
 * Calculate footprint area (floor area)
 */
export function calculateFootprintArea(config: ShedConfiguration): number {
  return config.width * config.length
}

/**
 * Calculate roof area based on roof type and pitch
 */
export function calculateRoofArea(config: ShedConfiguration): number {
  const footprintArea = calculateFootprintArea(config)

  switch (config.roofType) {
    case 'flat':
      return footprintArea

    case 'gabled': {
      // For gabled roof, calculate sloped surface area
      // Area = footprint * (1 / cos(pitch))
      const pitchRadians = (config.roofPitch * Math.PI) / 180
      const slopeMultiplier = 1 / Math.cos(pitchRadians)
      return footprintArea * slopeMultiplier
    }

    case 'mono-slope': {
      // For mono-slope, similar calculation but single slope
      const pitchRadians = (config.roofPitch * Math.PI) / 180
      const slopeMultiplier = 1 / Math.cos(pitchRadians)
      return footprintArea * slopeMultiplier
    }

    default:
      return footprintArea
  }
}

/**
 * Calculate total window area
 */
export function calculateWindowArea(config: ShedConfiguration): number {
  return config.windowCount * config.windowWidth * config.windowHeight
}

/**
 * Calculate total door area
 */
export function calculateDoorArea(config: ShedConfiguration): number {
  return config.doorCount * config.doorWidth * config.doorHeight
}

/**
 * Calculate all quantities for the shed configuration
 */
export function calculateQuantities(config: ShedConfiguration): QuantityResults {
  // Basic dimensions
  const perimeter = calculatePerimeter(config)
  const footprintArea = calculateFootprintArea(config)
  const totalHeight = config.wallHeight

  // Floor areas
  const floorAreaPerLevel = footprintArea
  const totalFloorArea = floorAreaPerLevel * config.floors

  // Wall calculations
  const externalWallArea = perimeter * totalHeight
  const windowArea = calculateWindowArea(config)
  const doorArea = calculateDoorArea(config)
  const opaqueWallArea = externalWallArea - windowArea - doorArea

  // Roof
  const roofArea = calculateRoofArea(config)

  // Volume
  const totalVolume = totalFloorArea * config.wallHeight

  return {
    totalFloorArea: Math.round(totalFloorArea * 10) / 10,
    floorAreaPerLevel: Math.round(floorAreaPerLevel * 10) / 10,
    externalWallArea: Math.round(externalWallArea * 10) / 10,
    windowArea: Math.round(windowArea * 10) / 10,
    opaqueWallArea: Math.round(opaqueWallArea * 10) / 10,
    roofArea: Math.round(roofArea * 10) / 10,
    totalVolume: Math.round(totalVolume * 10) / 10,
    perimeter: Math.round(perimeter * 10) / 10,
    totalHeight: Math.round(totalHeight * 10) / 10,
    materials: {
      walls: {
        type: config.wallMaterial,
        area: Math.round(opaqueWallArea * 10) / 10,
        unit: 'm²',
      },
      windows: {
        count: config.windowCount,
        area: Math.round(windowArea * 10) / 10,
        unit: 'm²',
      },
      roof: {
        type: config.roofMaterial,
        area: Math.round(roofArea * 10) / 10,
        unit: 'm²',
      },
      floor: {
        type: config.floorMaterial,
        area: Math.round(totalFloorArea * 10) / 10,
        unit: 'm²',
      },
      doors: {
        count: config.doorCount,
        unit: 'stuks',
      },
    },
  }
}

/**
 * Format material names for display
 */
export function formatMaterialName(material: string): string {
  const names: Record<string, string> = {
    timber: 'Houtskeletbouw',
    metal: 'Metalen panelen',
    composite: 'Composiet',
    tiles: 'Dakpannen',
    'metal-sheet': 'Metalen dakplaten',
    'green-roof': 'Groen dak',
    bitumen: 'Bitumen dakbedekking',
    concrete: 'Betonnen dekvloer',
  }

  return names[material] || material
}
