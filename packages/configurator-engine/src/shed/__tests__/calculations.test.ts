/**
 * Shed Calculations Tests
 */

import { describe, it, expect } from 'vitest'
import {
  calculatePerimeter,
  calculateFootprintArea,
  calculateRoofArea,
  calculateWindowArea,
  calculateDoorArea,
  calculateQuantities,
  formatMaterialName,
} from '../calculations'
import { ShedConfiguration } from '../types'

describe('Shed Calculations', () => {
  const basicShed: ShedConfiguration = {
    shedType: 'tuinhuis',
    width: 4.0,
    length: 5.0,
    wallHeight: 2.5,
    roofType: 'gabled',
    roofPitch: 30,
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
    floorHeight: 2.5,
    houseType: 'rectangle',
    windowRatio: 15,
  }

  describe('calculatePerimeter()', () => {
    it('should calculate perimeter correctly', () => {
      const perimeter = calculatePerimeter(basicShed)
      expect(perimeter).toBe(18.0) // 2 * (4 + 5)
    })

    it('should handle square sheds', () => {
      const square = { ...basicShed, width: 4.0, length: 4.0 }
      const perimeter = calculatePerimeter(square)
      expect(perimeter).toBe(16.0)
    })
  })

  describe('calculateFootprintArea()', () => {
    it('should calculate footprint area correctly', () => {
      const area = calculateFootprintArea(basicShed)
      expect(area).toBe(20.0) // 4 * 5
    })

    it('should handle small sheds', () => {
      const small = { ...basicShed, width: 2.5, length: 3.0 }
      const area = calculateFootprintArea(small)
      expect(area).toBe(7.5)
    })
  })

  describe('calculateRoofArea()', () => {
    it('should calculate flat roof area', () => {
      const flatRoof = { ...basicShed, roofType: 'flat' as const, roofPitch: 0 }
      const area = calculateRoofArea(flatRoof)
      expect(area).toBe(20.0) // Same as footprint
    })

    it('should calculate gabled roof area with pitch', () => {
      const area = calculateRoofArea(basicShed)
      expect(area).toBeGreaterThan(20.0) // Should be larger than footprint
      expect(area).toBeLessThan(25.0) // But not too large
    })

    it('should calculate mono-slope roof area', () => {
      const monoSlope = { ...basicShed, roofType: 'mono-slope' as const, roofPitch: 15 }
      const area = calculateRoofArea(monoSlope)
      expect(area).toBeGreaterThan(20.0)
      expect(area).toBeLessThan(22.0)
    })
  })

  describe('calculateWindowArea()', () => {
    it('should calculate window area correctly', () => {
      const area = calculateWindowArea(basicShed)
      expect(area).toBe(2.0) // 2 windows * 1m * 1m
    })

    it('should handle no windows', () => {
      const noWindows = { ...basicShed, windowCount: 0 }
      const area = calculateWindowArea(noWindows)
      expect(area).toBe(0)
    })
  })

  describe('calculateDoorArea()', () => {
    it('should calculate door area correctly', () => {
      const area = calculateDoorArea(basicShed)
      expect(area).toBe(2.1) // 1 door * 1m * 2.1m
    })

    it('should handle multiple doors', () => {
      const multipleDoors = { ...basicShed, doorCount: 2 }
      const area = calculateDoorArea(multipleDoors)
      expect(area).toBe(4.2)
    })
  })

  describe('calculateQuantities()', () => {
    it('should calculate all quantities correctly', () => {
      const quantities = calculateQuantities(basicShed)

      expect(quantities.totalFloorArea).toBe(20.0)
      expect(quantities.floorAreaPerLevel).toBe(20.0)
      expect(quantities.perimeter).toBe(18.0)
      expect(quantities.totalHeight).toBe(2.5)
      expect(quantities.externalWallArea).toBe(45.0) // 18 * 2.5
      expect(quantities.windowArea).toBe(2.0)
      expect(quantities.totalVolume).toBe(50.0) // 20 * 2.5
    })

    it('should include correct material quantities', () => {
      const quantities = calculateQuantities(basicShed)

      expect(quantities.materials.walls.type).toBe('timber')
      expect(quantities.materials.walls.area).toBeGreaterThan(0)
      expect(quantities.materials.windows.count).toBe(2)
      expect(quantities.materials.doors.count).toBe(1)
      expect(quantities.materials.roof.type).toBe('tiles')
      expect(quantities.materials.floor.type).toBe('timber')
    })

    it('should round values correctly', () => {
      const quantities = calculateQuantities(basicShed)

      // All values should be rounded to 1 decimal place
      expect(quantities.totalFloorArea.toString()).not.toMatch(/\.\d{2,}/)
      expect(quantities.roofArea.toString()).not.toMatch(/\.\d{2,}/)
    })
  })

  describe('formatMaterialName()', () => {
    it('should format material names correctly', () => {
      expect(formatMaterialName('timber')).toBe('Houtskeletbouw')
      expect(formatMaterialName('metal')).toBe('Metalen panelen')
      expect(formatMaterialName('tiles')).toBe('Dakpannen')
      expect(formatMaterialName('concrete')).toBe('Betonnen dekvloer')
    })

    it('should return original value for unknown materials', () => {
      expect(formatMaterialName('unknown')).toBe('unknown')
    })
  })
})
