/**
 * Shed Configuration Validation
 * Dimension validation and rules engine
 */

import { ShedConfiguration, SHED_TYPE_RESTRICTIONS, ShedTypeRestrictions } from './types'

export interface ValidationError {
  field: string
  message: string
  suggestion?: string
}

/**
 * Get restrictions for a given shed type
 */
export function getRestrictions(shedType: ShedConfiguration['shedType']): ShedTypeRestrictions {
  return SHED_TYPE_RESTRICTIONS[shedType]
}

/**
 * Validate shed configuration against type-specific restrictions
 */
export function validateConfig(config: ShedConfiguration): ValidationError[] {
  const restrictions = getRestrictions(config.shedType)
  const errors: ValidationError[] = []

  // Width validation
  if (config.width < restrictions.width.min || config.width > restrictions.width.max) {
    errors.push({
      field: 'width',
      message: `Breedte moet tussen ${restrictions.width.min}m en ${restrictions.width.max}m zijn`,
      suggestion: `Pas breedte aan tussen ${restrictions.width.min}m en ${restrictions.width.max}m`,
    })
  }

  // Length validation
  if (config.length < restrictions.length.min || config.length > restrictions.length.max) {
    errors.push({
      field: 'length',
      message: `Lengte moet tussen ${restrictions.length.min}m en ${restrictions.length.max}m zijn`,
      suggestion: `Pas lengte aan tussen ${restrictions.length.min}m en ${restrictions.length.max}m`,
    })
  }

  // Wall height validation
  if (
    config.wallHeight < restrictions.wallHeight.min ||
    config.wallHeight > restrictions.wallHeight.max
  ) {
    errors.push({
      field: 'wallHeight',
      message: `Wandhoogte moet tussen ${restrictions.wallHeight.min}m en ${restrictions.wallHeight.max}m zijn`,
      suggestion: `Pas wandhoogte aan tussen ${restrictions.wallHeight.min}m en ${restrictions.wallHeight.max}m`,
    })
  }

  // Door count validation
  if (
    config.doorCount < restrictions.doorCount.min ||
    config.doorCount > restrictions.doorCount.max
  ) {
    errors.push({
      field: 'doorCount',
      message: `Aantal deuren moet tussen ${restrictions.doorCount.min} en ${restrictions.doorCount.max} zijn`,
      suggestion: `Pas aantal deuren aan tussen ${restrictions.doorCount.min} en ${restrictions.doorCount.max}`,
    })
  }

  // Window count validation
  if (
    config.windowCount < restrictions.windowCount.min ||
    config.windowCount > restrictions.windowCount.max
  ) {
    errors.push({
      field: 'windowCount',
      message: `Aantal ramen moet tussen ${restrictions.windowCount.min} en ${restrictions.windowCount.max} zijn`,
      suggestion: `Pas aantal ramen aan tussen ${restrictions.windowCount.min} en ${restrictions.windowCount.max}`,
    })
  }

  // Roof type validation
  if (!restrictions.allowedRoofTypes.includes(config.roofType)) {
    errors.push({
      field: 'roofType',
      message: `Daktype ${config.roofType} niet toegestaan voor ${config.shedType}`,
      suggestion: `Kies een van de toegestane daktypen: ${restrictions.allowedRoofTypes.join(', ')}`,
    })
  }

  // Roof pitch validation (for non-flat roofs)
  if (config.roofType !== 'flat') {
    if (config.roofPitch < 15 || config.roofPitch > 45) {
      errors.push({
        field: 'roofPitch',
        message: 'Dakhelling moet tussen 15° en 45° zijn voor schuine daken',
        suggestion: 'Pas dakhelling aan tussen 15° en 45°',
      })
    }
  }

  // Door dimension validation
  if (config.doorWidth < 0.8 || config.doorWidth > 2.5) {
    errors.push({
      field: 'doorWidth',
      message: 'Deurbreedte moet tussen 0.8m en 2.5m zijn',
      suggestion: 'Pas deurbreedte aan tussen 0.8m en 2.5m',
    })
  }

  if (config.doorHeight < 1.8 || config.doorHeight > 2.5) {
    errors.push({
      field: 'doorHeight',
      message: 'Deurhoogte moet tussen 1.8m en 2.5m zijn',
      suggestion: 'Pas deurhoogte aan tussen 1.8m en 2.5m',
    })
  }

  // Window dimension validation
  if (config.windowCount > 0) {
    if (config.windowWidth < 0.6 || config.windowWidth > 1.5) {
      errors.push({
        field: 'windowWidth',
        message: 'Raambreedte moet tussen 0.6m en 1.5m zijn',
        suggestion: 'Pas raambreedte aan tussen 0.6m en 1.5m',
      })
    }

    if (config.windowHeight < 0.6 || config.windowHeight > 1.2) {
      errors.push({
        field: 'windowHeight',
        message: 'Raamhoogte moet tussen 0.6m en 1.2m zijn',
        suggestion: 'Pas raamhoogte aan tussen 0.6m en 1.2m',
      })
    }
  }

  // Structural validation: door height should not exceed wall height
  if (config.doorHeight > config.wallHeight - 0.1) {
    errors.push({
      field: 'doorHeight',
      message: 'Deurhoogte moet minimaal 10cm lager zijn dan wandhoogte',
      suggestion: `Verlaag deurhoogte of verhoog wandhoogte (huidige wandhoogte: ${config.wallHeight}m)`,
    })
  }

  return errors
}

/**
 * Check if configuration is valid
 */
export function isValidConfig(config: ShedConfiguration): boolean {
  return validateConfig(config).length === 0
}

/**
 * Get validation warnings (non-blocking suggestions)
 */
export function getValidationWarnings(config: ShedConfiguration): ValidationError[] {
  const warnings: ValidationError[] = []

  // Large door warning
  if (config.doorWidth > 2.0) {
    warnings.push({
      field: 'doorWidth',
      message: 'Zeer brede deuren kunnen extra verstevigingen nodig hebben',
    })
  }

  // Many windows warning
  if (config.windowCount > 4 && config.shedType === 'berging') {
    warnings.push({
      field: 'windowCount',
      message: 'Veel ramen voor een berging kan de veiligheid verminderen',
    })
  }

  // Green roof on small structure
  if (config.roofMaterial === 'green-roof' && config.width * config.length < 10) {
    warnings.push({
      field: 'roofMaterial',
      message: 'Groen dak op kleine constructies kan overwogen constructieve belasting geven',
    })
  }

  return warnings
}
