/**
 * Universal ROI Calculator Component
 * Standalone React component for calculating ROI with real-time updates
 */

import * as React from 'react'
import type { RoiCalculatorProps } from './types'
import { DEFAULT_INPUTS, PRESET_INPUTS } from './types'
import {
  calculateRoi,
  validateInputs,
  exportToCsv,
  syncToUrl,
  readFromUrl,
} from './utils'
import { RoiSummary } from './RoiSummary'

// Simple utility for className merging
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

/**
 * Default translations for Dutch (nl) and English (en)
 */
const DEFAULT_TRANSLATIONS = {
  nl: {
    title: 'ROI Calculator',
    subtitle: 'Bereken jouw besparing met Caribbean Azure',
    inputs: {
      teamSize: 'Teamgrootte',
      hourlyRate: 'Uurtarief',
      hoursSavedPerWeek: 'Uren bespaard per week',
      adoption: 'Adoptiepercentage',
    },
    hints: {
      teamSize: 'Aantal medewerkers dat de oplossing gebruikt',
      hourlyRate: 'Gemiddeld uurtarief van je team',
      hoursSavedPerWeek: 'Geschatte tijdsbesparing per persoon per week',
      adoption: 'Percentage van je team dat actief gebruik maakt',
    },
    units: {
      people: 'personen',
      hours: 'uur',
    },
    cta: {
      primary: 'Bekijk mogelijkheden',
      export: 'Exporteer naar CSV',
    },
    privacy: 'Alle berekeningen gebeuren lokaal in je browser. We slaan geen gegevens op.',
    methodology: {
      title: 'Berekeningsmethode:',
      description: 'Deze calculator gebruikt conservatieve schattingen gebaseerd op industriestandaarden.',
      formula: 'Formule: teamgrootte × uurtarief × uren per week × 52 × adoptiepercentage',
    },
    presets: {
      light: 'Light pakket voorinstellingen',
      manufacturing: 'Manufacturing pakket voorinstellingen',
      c2p: 'Connect-to-Produce pakket voorinstellingen',
    },
    validation: {
      teamSize: 'Teamgrootte moet tussen 1 en 1000 zijn',
      hourlyRate: 'Uurtarief moet tussen €10 en €500 zijn',
      hoursSavedPerWeek: 'Uren per week moet tussen 0.5 en 40 zijn',
      adoption: 'Adoptiepercentage moet tussen 10% en 100% zijn',
    },
    error: {
      submit: 'Er is een fout opgetreden. Probeer het opnieuw.',
    },
    submitting: 'Bezig...',
  },
  en: {
    title: 'ROI Calculator',
    subtitle: 'Calculate your savings with Caribbean Azure',
    inputs: {
      teamSize: 'Team size',
      hourlyRate: 'Hourly rate',
      hoursSavedPerWeek: 'Hours saved per week',
      adoption: 'Adoption rate',
    },
    hints: {
      teamSize: 'Number of employees using the solution',
      hourlyRate: 'Average hourly rate of your team',
      hoursSavedPerWeek: 'Estimated time savings per person per week',
      adoption: 'Percentage of your team actively using it',
    },
    units: {
      people: 'people',
      hours: 'hours',
    },
    cta: {
      primary: 'View options',
      export: 'Export to CSV',
    },
    privacy: 'All calculations happen locally in your browser. We do not store any data.',
    methodology: {
      title: 'Calculation method:',
      description: 'This calculator uses conservative estimates based on industry standards.',
      formula: 'Formula: team size × hourly rate × hours per week × 52 × adoption rate',
    },
    presets: {
      light: 'Light package presets',
      manufacturing: 'Manufacturing package presets',
      c2p: 'Connect-to-Produce package presets',
    },
    validation: {
      teamSize: 'Team size must be between 1 and 1000',
      hourlyRate: 'Hourly rate must be between €10 and €500',
      hoursSavedPerWeek: 'Hours per week must be between 0.5 and 40',
      adoption: 'Adoption rate must be between 10% and 100%',
    },
    error: {
      submit: 'An error occurred. Please try again.',
    },
    submitting: 'Submitting...',
  },
}

export interface RoiCalculatorComponentProps extends RoiCalculatorProps {
  /** Locale for translations and formatting */
  locale?: 'nl' | 'en'
  /** Custom translations (merges with defaults) */
  translations?: typeof DEFAULT_TRANSLATIONS.nl
  /** Analytics callback */
  onAnalytics?: (event: string, props: Record<string, any>) => void
}

/**
 * RoiCalculator Component
 * Main calculator component with inputs, real-time calculation, and export functionality
 */
export function RoiCalculator({
  initialInputs,
  variant = 'card',
  preset = 'custom',
  showMethodNote = false,
  ctaLabel,
  onSubmit,
  showExport = true,
  enableUrlSync = false,
  locale = 'nl',
  translations,
  onAnalytics,
}: RoiCalculatorComponentProps) {
  const t = { ...DEFAULT_TRANSLATIONS[locale], ...translations }

  // Track open event once on mount
  React.useEffect(() => {
    onAnalytics?.('roi_open', { variant, preset, locale })
  }, [variant, preset, locale, onAnalytics])

  // Initialize state with preset or defaults
  const [inputs, setInputs] = React.useState(() => {
    const presetDefaults = preset !== 'custom' ? PRESET_INPUTS[preset] : {}
    const defaults = { ...DEFAULT_INPUTS, ...presetDefaults, ...initialInputs }
    if (enableUrlSync && typeof window !== 'undefined') {
      return { ...defaults, ...readFromUrl(defaults) }
    }
    return defaults
  })

  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Calculate result
  const result = React.useMemo(() => calculateRoi(inputs), [inputs])

  // Sync to URL when inputs change (debounced)
  React.useEffect(() => {
    if (!enableUrlSync) return
    const timer = setTimeout(() => syncToUrl(inputs), 500)
    return () => clearTimeout(timer)
  }, [inputs, enableUrlSync])

  // Handle input change
  const handleChange = (field: keyof typeof inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setError(null)
    onAnalytics?.('roi_adjust', { field, value, locale, preset })
  }

  // Handle submit
  const handleSubmit = async () => {
    const validationError = validateInputs(inputs)
    if (validationError) {
      // Map validation key to translated message
      const errorKey = validationError.replace('validation.', '')
      setError(t.validation[errorKey as keyof typeof t.validation] || validationError)
      return
    }

    setError(null)
    onAnalytics?.('roi_submit', {
      annualSavings: result.annualSavings,
      variant,
      preset,
      locale,
    })

    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(inputs, result)
      } catch (err) {
        setError(t.error.submit)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Handle CSV export
  const handleExport = () => {
    exportToCsv(inputs, result, locale)
    onAnalytics?.('calc_export', { annualSavings: result.annualSavings, locale, preset })
  }

  // Variant-specific wrapper
  const wrapperClassName = cn(
    variant === 'inline' &&
      'bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8',
    variant === 'card' && 'bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8',
    variant === 'page' && 'max-w-4xl mx-auto'
  )

  // Resolve CTA label
  const resolvedCtaLabel = ctaLabel || t.cta.primary

  return (
    <div className={wrapperClassName}>
      {/* Header */}
      {variant !== 'inline' && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{t.subtitle}</p>
        </div>
      )}

      {/* Preset Info (if applicable) */}
      {preset !== 'custom' && (
        <div className="mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {t.presets[preset]}
          </p>
        </div>
      )}

      {/* Input Grid */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <InputField
          label={t.inputs.teamSize}
          hint={t.hints.teamSize}
          value={inputs.teamSize}
          onChange={(val) => handleChange('teamSize', val)}
          min={1}
          max={1000}
          step={1}
          suffix={t.units.people}
        />
        <InputField
          label={t.inputs.hourlyRate}
          hint={t.hints.hourlyRate}
          value={inputs.hourlyRate}
          onChange={(val) => handleChange('hourlyRate', val)}
          min={10}
          max={500}
          step={5}
          prefix="€"
        />
        <InputField
          label={t.inputs.hoursSavedPerWeek}
          hint={t.hints.hoursSavedPerWeek}
          value={inputs.hoursSavedPerWeek}
          onChange={(val) => handleChange('hoursSavedPerWeek', val)}
          min={0.5}
          max={40}
          step={0.5}
          suffix={t.units.hours}
        />
        <InputField
          label={t.inputs.adoption}
          hint={t.hints.adoption}
          value={inputs.adoption * 100}
          onChange={(val) => handleChange('adoption', val / 100)}
          min={10}
          max={100}
          step={5}
          suffix="%"
        />
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
          role="alert"
        >
          <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
        </div>
      )}

      {/* Result Summary */}
      <div className="mb-6">
        <RoiSummary result={result} locale={locale} />
      </div>

      {/* Method Note */}
      {showMethodNote && (
        <div className="mb-6 rounded-xl bg-gray-100 dark:bg-gray-800 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{t.methodology.title}</strong> {t.methodology.description}
            <br />
            <em>{t.methodology.formula}</em>
          </div>
        </div>
      )}

      {/* Privacy Note */}
      <div className="mb-6">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">{t.privacy}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? t.submitting : resolvedCtaLabel}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {showExport && (
          <button
            onClick={handleExport}
            className="h-12 px-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t.cta.export}
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Input Field Component
 */
interface InputFieldProps {
  label: string
  hint?: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}

function InputField({ label, hint, value, onChange, min, max, step, prefix, suffix }: InputFieldProps) {
  const inputId = React.useId()

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{hint}</p>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full h-11 rounded-xl border border-gray-300 dark:border-gray-700',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'px-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
            'transition-all duration-200',
            prefix && 'pl-8',
            suffix && 'pr-20'
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
