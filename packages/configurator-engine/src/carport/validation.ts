/**
 * Carport Configuration Validation
 * Structural and dimensional validation
 */

import { CarportConfiguration } from './types'

export interface ValidationError {
  field: string
  message: string
  suggestion?: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Validate carport configuration
 */
export function validateCarportConfiguration(config: CarportConfiguration): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Width validation
  if (config.width < 2.5) {
    errors.push({
      field: 'width',
      message: 'Breedte moet minimaal 2.5m zijn voor een carport',
      suggestion: 'Verhoog de breedte naar minimaal 2.5m',
    })
  }

  if (config.width > 6.0) {
    warnings.push({
      field: 'width',
      message: 'Breedte boven 6.0m kan extra verstevigingen vereisen',
    })
  }

  // Depth validation
  if (config.depth < 4.0) {
    errors.push({
      field: 'depth',
      message: 'Diepte moet minimaal 4.0m zijn voor een auto',
      suggestion: 'Verhoog de diepte naar minimaal 4.0m',
    })
  }

  if (config.depth > 7.0) {
    warnings.push({
      field: 'depth',
      message: 'Diepte boven 7.0m kan extra palen vereisen',
    })
  }

  // Height validation
  if (config.height < 2.1) {
    errors.push({
      field: 'height',
      message: 'Hoogte moet minimaal 2.1m zijn voor voertuigen',
      suggestion: 'Verhoog de hoogte naar minimaal 2.1m',
    })
  }

  if (config.height > 3.0) {
    warnings.push({
      field: 'height',
      message: 'Hoogte boven 3.0m is ongebruikelijk voor een carport',
    })
  }

  // Roof pitch validation
  if (config.roofType !== 'flat' && config.roofPitch < 2) {
    errors.push({
      field: 'roofPitch',
      message: 'Dakhelling moet minimaal 2° zijn voor waterafvoer',
      suggestion: 'Verhoog de dakhelling naar minimaal 2°',
    })
  }

  if (config.roofPitch > 15) {
    warnings.push({
      field: 'roofPitch',
      message: 'Dakhelling boven 15° is ongebruikelijk voor een carport',
    })
  }

  // Overhang validation
  if (config.roofOverhang < 0.2) {
    warnings.push({
      field: 'roofOverhang',
      message: 'Minimale overstrek van 0.2m aanbevolen voor betere bescherming',
    })
  }

  if (config.roofOverhang > 0.5) {
    warnings.push({
      field: 'roofOverhang',
      message: 'Overstrek boven 0.5m kan extra verstevigingen vereisen',
    })
  }

  // Post size validation based on span
  const span = Math.max(config.width, config.depth)
  if (span > 5.0 && config.postSize < 120) {
    warnings.push({
      field: 'postSize',
      message: 'Voor spans boven 5m worden palen van 120mm of groter aanbevolen',
    })
  }

  if (span > 6.0 && config.postSize < 150) {
    errors.push({
      field: 'postSize',
      message: 'Voor spans boven 6m zijn palen van 150mm vereist',
      suggestion: 'Verhoog de paalgrootte naar 150mm',
    })
  }

  // Beam size validation
  if (config.width > 4.0 && config.beamSize < 150) {
    warnings.push({
      field: 'beamSize',
      message: 'Voor breedte boven 4m worden balken van 150mm of groter aanbevolen',
    })
  }

  // Glass roof validation
  if (config.roofMaterial === 'glass' && config.roofPitch < 5) {
    warnings.push({
      field: 'roofMaterial',
      message: 'Glazen daken vereisen minimaal 5° helling voor zelfreiniging',
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Check if configuration is valid (no errors)
 */
export function isValidCarportConfig(config: CarportConfiguration): boolean {
  return validateCarportConfiguration(config).valid
}
