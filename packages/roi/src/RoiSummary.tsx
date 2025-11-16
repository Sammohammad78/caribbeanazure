/**
 * ROI Summary Component
 * Displays calculated ROI results in a visually appealing format
 */

import * as React from 'react'
import type { RoiResult } from './types'
import { formatCurrency, formatNumber } from './utils'

export interface RoiSummaryProps {
  /** Calculated ROI results */
  result: RoiResult
  /** Locale for number formatting */
  locale?: 'nl' | 'en'
  /** Custom labels for the metrics */
  labels?: {
    monthlySavings?: string
    annualSavings?: string
    hoursSavedAnnually?: string
  }
  /** Show highlight on annual savings */
  highlightAnnual?: boolean
  /** Custom className */
  className?: string
}

/**
 * RoiSummary Component
 * Displays the calculated ROI metrics in a gradient card with three columns
 */
export function RoiSummary({
  result,
  locale = 'nl',
  labels,
  highlightAnnual = true,
  className = '',
}: RoiSummaryProps) {
  const defaultLabels = {
    nl: {
      monthlySavings: 'Maandelijkse besparing',
      annualSavings: 'Jaarlijkse besparing',
      hoursSavedAnnually: 'Uren bespaard',
    },
    en: {
      monthlySavings: 'Monthly savings',
      annualSavings: 'Annual savings',
      hoursSavedAnnually: 'Hours saved',
    },
  }

  const resolvedLabels = {
    ...defaultLabels[locale],
    ...labels,
  }

  const hoursSuffix = locale === 'nl' ? 'uur/jaar' : 'hours/year'

  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 p-8 text-white ${className}`}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <ResultMetric
          label={resolvedLabels.monthlySavings}
          value={formatCurrency(result.monthlySavings, locale)}
        />
        <ResultMetric
          label={resolvedLabels.annualSavings}
          value={formatCurrency(result.annualSavings, locale)}
          highlight={highlightAnnual}
        />
        <ResultMetric
          label={resolvedLabels.hoursSavedAnnually}
          value={formatNumber(result.hoursSavedAnnually, locale)}
          suffix={hoursSuffix}
        />
      </div>
    </div>
  )
}

/**
 * Result Metric Component
 * Internal component for displaying individual metrics
 */
interface ResultMetricProps {
  label: string
  value: string
  suffix?: string
  highlight?: boolean
}

function ResultMetric({ label, value, suffix, highlight }: ResultMetricProps) {
  const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

  return (
    <div className={cn('text-center', highlight && 'sm:scale-110')}>
      <div className="text-sm opacity-90 mb-2">{label}</div>
      <div className={cn('font-bold', highlight ? 'text-3xl' : 'text-2xl')}>{value}</div>
      {suffix && <div className="text-xs opacity-75 mt-1">{suffix}</div>}
    </div>
  )
}
