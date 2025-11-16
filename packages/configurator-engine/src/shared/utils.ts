/**
 * Shared Utility Functions
 * Math utilities, formatting, and helpers
 */

/**
 * Round to decimal places
 */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

/**
 * Calculate area of rectangle
 */
export function rectangleArea(width: number, length: number): number {
  return width * length
}

/**
 * Calculate perimeter of rectangle
 */
export function rectanglePerimeter(width: number, length: number): number {
  return 2 * (width + length)
}

/**
 * Calculate area of triangle
 */
export function triangleArea(base: number, height: number): number {
  return (base * height) / 2
}

/**
 * Calculate hypotenuse using Pythagorean theorem
 */
export function hypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b)
}

/**
 * Calculate sloped length given horizontal distance and pitch angle
 */
export function slopedLength(horizontal: number, pitchDegrees: number): number {
  const pitchRadians = degreesToRadians(pitchDegrees)
  return horizontal / Math.cos(pitchRadians)
}

/**
 * Calculate rise given run and pitch
 */
export function calculateRise(run: number, pitchDegrees: number): number {
  const pitchRadians = degreesToRadians(pitchDegrees)
  return run * Math.tan(pitchRadians)
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, locale: string = 'nl-NL'): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Format area (m²)
 */
export function formatArea(area: number, locale: string = 'nl-NL'): string {
  return `${formatNumber(round(area, 1), locale)} m²`
}

/**
 * Format volume (m³)
 */
export function formatVolume(volume: number, locale: string = 'nl-NL'): string {
  return `${formatNumber(round(volume, 1), locale)} m³`
}

/**
 * Format length (m)
 */
export function formatLength(length: number, locale: string = 'nl-NL'): string {
  return `${formatNumber(round(length, 2), locale)} m`
}

/**
 * Format angle (degrees)
 */
export function formatAngle(degrees: number): string {
  return `${round(degrees, 1)}°`
}

/**
 * Parse dimension string (e.g., "3.5m" -> 3.5)
 */
export function parseDimension(dimension: string): number {
  const match = dimension.match(/^(\d+\.?\d*)\s*m?$/i)
  if (match) {
    return parseFloat(match[1])
  }
  return 0
}

/**
 * Check if value is numeric
 */
export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Interpolate value between min and max
 */
export function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t
}

/**
 * Inverse lerp - find t for a value between min and max
 */
export function inverseLerp(min: number, max: number, value: number): number {
  return (value - min) / (max - min)
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = inverseLerp(inMin, inMax, value)
  return lerp(outMin, outMax, t)
}

/**
 * Calculate average
 */
export function average(...values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

/**
 * Calculate sum
 */
export function sum(...values: number[]): number {
  return values.reduce((total, val) => total + val, 0)
}

/**
 * Find minimum value
 */
export function min(...values: number[]): number {
  return Math.min(...values)
}

/**
 * Find maximum value
 */
export function max(...values: number[]): number {
  return Math.max(...values)
}

/**
 * Check if arrays are equal
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false
  return a.every((val, idx) => val === b[idx])
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key])
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    },
    {} as Record<string, T[]>
  )
}
