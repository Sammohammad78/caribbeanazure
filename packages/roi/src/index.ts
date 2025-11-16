/**
 * @caribbean-azure/roi
 * Universal ROI Calculator Package
 *
 * Standalone package for calculating ROI with real-time updates,
 * Dutch number formatting, and CSV export functionality.
 */

// Main Components
export { RoiCalculator } from './RoiCalculator'
export type { RoiCalculatorComponentProps } from './RoiCalculator'
export { RoiSummary } from './RoiSummary'
export type { RoiSummaryProps } from './RoiSummary'

// Types
export type {
  RoiInputs,
  RoiResult,
  RoiVariant,
  RoiPreset,
  RoiCalculatorProps,
} from './types'

export { DEFAULT_INPUTS, PRESET_INPUTS } from './types'

// Utilities
export {
  calculateRoi,
  validateInputs,
  formatCurrency,
  formatNumber,
  formatPercent,
  exportToCsv,
  syncToUrl,
  readFromUrl,
} from './utils'
