/**
 * Veranda Configuration Validation
 * Ensures logical and safe veranda configurations
 */

import { VerandaConfiguration } from './types'

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
 * Validate veranda configuration
 */
export function validateVerandaConfiguration(config: VerandaConfiguration): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Width validation
  if (config.width < 3.0) {
    errors.push({
      field: 'width',
      message: 'Breedte moet minimaal 3.0m zijn voor een veranda',
      suggestion: 'Verhoog de breedte naar minimaal 3.0m',
    })
  }

  if (config.width > 10.0) {
    warnings.push({
      field: 'width',
      message: 'Breedte boven 10.0m kan speciale constructie vereisen',
    })
  }

  // Depth validation
  if (config.depth < 2.5) {
    errors.push({
      field: 'depth',
      message: 'Uitstrek vanaf muur moet minimaal 2.5m zijn',
      suggestion: 'Verhoog de diepte naar minimaal 2.5m',
    })
  }

  if (config.depth > 5.0) {
    warnings.push({
      field: 'depth',
      message: 'Uitstrek boven 5.0m kan extra palen vereisen voor stabiliteit',
    })
  }

  // Height validation
  if (config.height < 2.2) {
    errors.push({
      field: 'height',
      message: 'Hoogte moet minimaal 2.2m zijn voor comfort',
      suggestion: 'Verhoog de hoogte naar minimaal 2.2m',
    })
  }

  if (config.height > 3.5) {
    warnings.push({
      field: 'height',
      message: 'Hoogte boven 3.5m kan windbelasting problemen geven',
    })
  }

  // Roof pitch validation
  if (config.roofPitch < 2) {
    errors.push({
      field: 'roofPitch',
      message: 'Dakhelling moet minimaal 2° zijn voor waterafvoer',
      suggestion: 'Verhoog de dakhelling naar minimaal 2°',
    })
  }

  if (config.roofPitch > 10) {
    warnings.push({
      field: 'roofPitch',
      message: 'Dakhelling boven 10° is ongebruikelijk voor een veranda',
    })
  }

  // Overhang validation
  if (config.roofOverhang < 0.1) {
    warnings.push({
      field: 'roofOverhang',
      message: 'Minimale overstrek van 0.1m aanbevolen',
    })
  }

  if (config.roofOverhang > 0.3) {
    warnings.push({
      field: 'roofOverhang',
      message: 'Overstrek boven 0.3m kan extra verstevigingen vereisen',
    })
  }

  // Post size validation
  if (config.depth > 4.0 && config.postSize < 100) {
    warnings.push({
      field: 'postSize',
      message: 'Voor uitstrek boven 4m worden palen van 100mm of groter aanbevolen',
    })
  }

  // Rafter spacing validation
  if (config.rafterSpacing > 600) {
    warnings.push({
      field: 'rafterSpacing',
      message: 'Grotere afstand tussen spanten kan dakvervorming veroorzaken',
    })
  }

  // Glass configuration validation
  if (config.glassType && config.glassType !== 'none') {
    if (!config.glassSides || config.glassSides === 'none') {
      errors.push({
        field: 'glassSides',
        message: 'Selecteer welke zijden beglazing krijgen',
        suggestion: 'Kies left, right, both, of front',
      })
    }
  }

  // Glass with roof material validation
  if (config.glassType === 'sliding-glass' && config.roofMaterial !== 'glass') {
    warnings.push({
      field: 'roofMaterial',
      message: 'Schuifbare glazen wanden combineren goed met een glazen dak',
    })
  }

  // Heater validation
  if (config.heater && (!config.glassType || config.glassType === 'none')) {
    warnings.push({
      field: 'heater',
      message: 'Verwarming is efficiënter met beglazing',
    })
  }

  // Wall attachment validation
  if (config.wallAttachment === 'ledger-board' && config.width > 6.0) {
    warnings.push({
      field: 'wallAttachment',
      message: 'Voor brede veranda\'s kunnen extra beugels nodig zijn',
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
export function isValidVerandaConfig(config: VerandaConfiguration): boolean {
  return validateVerandaConfiguration(config).valid
}
