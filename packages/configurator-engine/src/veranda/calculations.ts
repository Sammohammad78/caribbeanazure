/**
 * Veranda Calculations
 * Calculate dimensions, glass areas, and joist spacing
 */

import { VerandaConfiguration, VerandaCalculations } from './types'

/**
 * Calculate optimal post count for veranda
 * Verandas are attached to building, so posts only on front edge
 */
export function calculatePostCount(config: VerandaConfiguration): number {
  const { width } = config

  // Posts every 2.5-3m on front edge
  const postSpacing = 2.5
  const posts = Math.ceil(width / postSpacing) + 1 // +1 for end post

  return Math.max(2, posts) // Minimum 2 posts
}

/**
 * Calculate base area
 */
export function calculateBaseArea(config: VerandaConfiguration): number {
  return config.width * config.depth
}

/**
 * Calculate roof surface area (accounting for pitch)
 */
export function calculateRoofArea(config: VerandaConfiguration): number {
  const baseArea = config.width * (config.depth + config.roofOverhang)

  if (config.roofType === 'flat') {
    return baseArea
  }

  // For mono-slope, calculate sloped area
  const pitchRadians = (config.roofPitch * Math.PI) / 180
  const slopeMultiplier = 1 / Math.cos(pitchRadians)

  return baseArea * slopeMultiplier
}

/**
 * Calculate rafter/joist count based on spacing
 */
export function calculateRafterCount(config: VerandaConfiguration): number {
  const spacing = config.rafterSpacing / 1000 // Convert mm to m
  return Math.ceil(config.width / spacing) + 1
}

/**
 * Calculate glass area if glass panels are included
 */
export function calculateGlassArea(config: VerandaConfiguration): number | undefined {
  if (!config.glassType || config.glassType === 'none') {
    return undefined
  }

  if (!config.glassSides || config.glassSides === 'none') {
    return undefined
  }

  let glassArea = 0

  // Side panels (left/right/both)
  if (
    config.glassSides === 'left' ||
    config.glassSides === 'right' ||
    config.glassSides === 'both'
  ) {
    const sideArea = config.depth * config.height
    if (config.glassSides === 'both') {
      glassArea += sideArea * 2
    } else {
      glassArea += sideArea
    }
  }

  // Front panel
  if (config.glassSides === 'front') {
    glassArea += config.width * config.height
  }

  return Math.round(glassArea * 10) / 10
}

/**
 * Calculate perimeter for gutters
 */
export function calculatePerimeter(config: VerandaConfiguration): number {
  // Veranda perimeter: front + 2 sides (back is attached to wall)
  return config.width + 2 * config.depth
}

/**
 * Perform all veranda calculations
 */
export function calculateVerandaDimensions(config: VerandaConfiguration): VerandaCalculations {
  return {
    baseArea: Math.round(calculateBaseArea(config) * 10) / 10,
    roofArea: Math.round(calculateRoofArea(config) * 10) / 10,
    postCount: calculatePostCount(config),
    rafterCount: calculateRafterCount(config),
    glassArea: calculateGlassArea(config),
    perimeter: Math.round(calculatePerimeter(config) * 10) / 10,
  }
}
