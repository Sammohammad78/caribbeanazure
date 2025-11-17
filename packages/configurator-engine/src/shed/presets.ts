/**
 * Shed Presets
 * Common shed configurations for quick start
 */

import { ShedConfiguration } from './types'

export interface Preset {
  name: string
  description: string
  config: ShedConfiguration
}

export const DEFAULT_CONFIG: ShedConfiguration = {
  shedType: 'tuinhuis',
  width: 3.5,
  length: 4.0,
  wallHeight: 2.4,
  roofType: 'gabled',
  roofPitch: 25,
  doorCount: 1,
  doorWidth: 1.0,
  doorHeight: 2.1,
  windowCount: 2,
  windowWidth: 1.0,
  windowHeight: 1.0,
  wallMaterial: 'timber',
  roofMaterial: 'tiles',
  floorMaterial: 'timber',
  showFloor: true,
  showFrame: true,
  floors: 1,
  floorHeight: 2.4,
  houseType: 'rectangle',
  windowRatio: 15,
}

export const PRESETS: Preset[] = [
  {
    name: 'Tuinberging Compact',
    description: 'Kleine berging voor tuingereedschap • 2.5×3m • Plat dak',
    config: {
      shedType: 'berging',
      width: 2.5,
      length: 3.0,
      wallHeight: 2.2,
      roofType: 'flat',
      roofPitch: 0,
      doorCount: 1,
      doorWidth: 0.9,
      doorHeight: 2.0,
      windowCount: 0,
      windowWidth: 0.6,
      windowHeight: 0.6,
      wallMaterial: 'timber',
      roofMaterial: 'metal-sheet',
      floorMaterial: 'concrete',
      showFloor: true,
      showFrame: true,
      floors: 1,
      floorHeight: 2.2,
      houseType: 'rectangle',
      windowRatio: 0,
    },
  },
  {
    name: 'Tuinhuis Standaard',
    description: 'Veelzijdig tuinhuis met ramen • 3.5×4m • Zadeldak',
    config: {
      shedType: 'tuinhuis',
      width: 3.5,
      length: 4.0,
      wallHeight: 2.4,
      roofType: 'gabled',
      roofPitch: 25,
      doorCount: 1,
      doorWidth: 1.0,
      doorHeight: 2.1,
      windowCount: 3,
      windowWidth: 1.0,
      windowHeight: 1.0,
      wallMaterial: 'timber',
      roofMaterial: 'tiles',
      floorMaterial: 'timber',
      showFloor: true,
      showFrame: true,
      floors: 1,
      floorHeight: 2.4,
      houseType: 'rectangle',
      windowRatio: 20,
    },
  },
  {
    name: 'Atelier met Licht',
    description: 'Werkplaats met veel licht • 4×6m • Lessenaarsdak',
    config: {
      shedType: 'atelier',
      width: 4.0,
      length: 6.0,
      wallHeight: 2.6,
      roofType: 'mono-slope',
      roofPitch: 20,
      doorCount: 1,
      doorWidth: 1.0,
      doorHeight: 2.1,
      windowCount: 6,
      windowWidth: 1.2,
      windowHeight: 1.2,
      wallMaterial: 'timber',
      roofMaterial: 'metal-sheet',
      floorMaterial: 'timber',
      showFloor: true,
      showFrame: true,
      floors: 1,
      floorHeight: 2.6,
      houseType: 'rectangle',
      windowRatio: 30,
    },
  },
  {
    name: 'Grote Schuur',
    description: 'Royale schuur voor opslag • 6×8m • Zadeldak',
    config: {
      shedType: 'schuur',
      width: 6.0,
      length: 8.0,
      wallHeight: 2.8,
      roofType: 'gabled',
      roofPitch: 30,
      doorCount: 2,
      doorWidth: 2.4,
      doorHeight: 2.4,
      windowCount: 4,
      windowWidth: 1.2,
      windowHeight: 1.0,
      wallMaterial: 'metal',
      roofMaterial: 'metal-sheet',
      floorMaterial: 'concrete',
      showFloor: true,
      showFrame: true,
      floors: 1,
      floorHeight: 2.8,
      houseType: 'rectangle',
      windowRatio: 15,
    },
  },
  {
    name: 'Workshop Premium',
    description: 'Luxe atelier met composiet afwerking • 5×7m',
    config: {
      shedType: 'atelier',
      width: 5.0,
      length: 7.0,
      wallHeight: 2.8,
      roofType: 'gabled',
      roofPitch: 28,
      doorCount: 2,
      doorWidth: 1.0,
      doorHeight: 2.1,
      windowCount: 8,
      windowWidth: 1.2,
      windowHeight: 1.2,
      wallMaterial: 'composite',
      roofMaterial: 'tiles',
      floorMaterial: 'timber',
      showFloor: true,
      showFrame: true,
      floors: 1,
      floorHeight: 2.8,
      houseType: 'rectangle',
      windowRatio: 35,
    },
  },
]

/**
 * Get preset by name
 */
export function getPresetByName(name: string): Preset | undefined {
  return PRESETS.find((preset) => preset.name === name)
}

/**
 * Get all presets for a specific shed type
 */
export function getPresetsByShedType(shedType: ShedConfiguration['shedType']): Preset[] {
  return PRESETS.filter((preset) => preset.config.shedType === shedType)
}
