/**
 * Carport Calculations
 * Calculate dimensions, post count, and surface areas
 */

import { CarportConfiguration, CarportCalculations } from './types'

/**
 * Calculate optimal post count based on span
 */
export function calculatePostCount(config: CarportConfiguration): number {
  const { width, depth } = config

  // Single car carport (width < 4m) typically needs 4 posts (2x2 grid)
  if (width < 4.0 && depth < 6.0) {
    return 4
  }

  // Double car carport or larger spans need 6 posts (2x3 grid)
  if (width >= 4.0 && width < 6.0) {
    return 6
  }

  // Very large carports need 8 posts (2x4 grid)
  if (depth > 6.5 || width >= 6.0) {
    return 8
  }

  return 4
}

/**
 * Calculate base area (footprint)
 */
export function calculateBaseArea(config: CarportConfiguration): number {
  return config.width * config.depth
}

/**
 * Calculate covered area including overhang
 */
export function calculateCoveredArea(config: CarportConfiguration): number {
  const widthWithOverhang = config.width + 2 * config.roofOverhang
  const depthWithOverhang = config.depth + 2 * config.roofOverhang
  return widthWithOverhang * depthWithOverhang
}

/**
 * Calculate actual roof surface area (accounting for pitch)
 */
export function calculateRoofArea(config: CarportConfiguration): number {
  const coveredArea = calculateCoveredArea(config)

  if (config.roofType === 'flat') {
    return coveredArea
  }

  // For pitched roofs, calculate sloped area
  const pitchRadians = (config.roofPitch * Math.PI) / 180
  const slopeMultiplier = 1 / Math.cos(pitchRadians)

  if (config.roofType === 'mono-slope') {
    return coveredArea * slopeMultiplier
  }

  if (config.roofType === 'gabled') {
    // Gabled roof has two slopes
    return coveredArea * slopeMultiplier
  }

  return coveredArea
}

/**
 * Calculate rafter/joist count
 */
export function calculateRafterCount(config: CarportConfiguration): number {
  const spacing = 0.6 // 60cm spacing
  return Math.ceil(config.width / spacing) + 1
}

/**
 * Calculate beam length (main support beams)
 */
export function calculateBeamLength(config: CarportConfiguration): number {
  // Main beams run the depth of the carport
  return config.depth + config.roofOverhang * 2
}

/**
 * Calculate perimeter for gutters
 */
export function calculatePerimeter(config: CarportConfiguration): number {
  const width = config.width + 2 * config.roofOverhang
  const depth = config.depth + 2 * config.roofOverhang
  return 2 * (width + depth)
}

/**
 * Perform all carport calculations
 */
export function calculateCarportDimensions(config: CarportConfiguration): CarportCalculations {
  return {
    baseArea: Math.round(calculateBaseArea(config) * 10) / 10,
    coveredArea: Math.round(calculateCoveredArea(config) * 10) / 10,
    roofArea: Math.round(calculateRoofArea(config) * 10) / 10,
    postCount: calculatePostCount(config),
    beamLength: Math.round(calculateBeamLength(config) * 10) / 10,
    rafterCount: calculateRafterCount(config),
    perimeter: Math.round(calculatePerimeter(config) * 10) / 10,
  }
}
