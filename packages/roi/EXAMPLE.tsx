/**
 * Example Usage of @caribbean-azure/roi
 *
 * This file demonstrates various ways to use the ROI Calculator package
 */

import React from 'react'
import {
  RoiCalculator,
  RoiSummary,
  calculateRoi,
  formatCurrency,
  type RoiInputs,
  type RoiResult
} from '@caribbean-azure/roi'

// Example 1: Basic Usage
export function BasicExample() {
  return (
    <div className="container mx-auto p-8">
      <RoiCalculator
        locale="nl"
        variant="card"
        showExport={true}
      />
    </div>
  )
}

// Example 2: With Custom Initial Values
export function CustomValuesExample() {
  return (
    <RoiCalculator
      locale="nl"
      initialInputs={{
        teamSize: 10,
        hourlyRate: 75,
        hoursSavedPerWeek: 3,
        adoption: 0.8,
      }}
      showMethodNote={true}
    />
  )
}

// Example 3: Using Presets
export function PresetExample() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Manufacturing Package</h2>
      <RoiCalculator
        locale="nl"
        preset="manufacturing"
        variant="inline"
      />
    </div>
  )
}

// Example 4: With Form Submission Handler
export function FormSubmissionExample() {
  const handleSubmit = async (inputs: RoiInputs, result: RoiResult) => {
    console.log('ROI Calculation Submitted:', { inputs, result })

    // Example: Send to API
    const response = await fetch('/api/roi-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs, result }),
    })

    if (response.ok) {
      alert('Bedankt! We nemen contact met je op.')
    }
  }

  return (
    <RoiCalculator
      locale="nl"
      onSubmit={handleSubmit}
      ctaLabel="Vraag offerte aan"
    />
  )
}

// Example 5: With Analytics Tracking
export function AnalyticsExample() {
  const handleAnalytics = (event: string, props: Record<string, any>) => {
    // Send to Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(event, { props })
    }

    // Or send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, props)
    }

    console.log('Analytics Event:', event, props)
  }

  return (
    <RoiCalculator
      locale="en"
      onAnalytics={handleAnalytics}
      showExport={true}
    />
  )
}

// Example 6: Using Summary Component Separately
export function SummaryOnlyExample() {
  const [inputs, setInputs] = React.useState<RoiInputs>({
    teamSize: 5,
    hourlyRate: 65,
    hoursSavedPerWeek: 2,
    adoption: 0.7,
  })

  const result = calculateRoi(inputs)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Team Size</label>
          <input
            type="number"
            value={inputs.teamSize}
            onChange={(e) => setInputs({ ...inputs, teamSize: Number(e.target.value) })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Hourly Rate (€)</label>
          <input
            type="number"
            value={inputs.hourlyRate}
            onChange={(e) => setInputs({ ...inputs, hourlyRate: Number(e.target.value) })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <RoiSummary
        result={result}
        locale="nl"
        highlightAnnual={true}
      />
    </div>
  )
}

// Example 7: Programmatic Calculation
export function ProgrammaticExample() {
  const inputs: RoiInputs = {
    teamSize: 8,
    hourlyRate: 75,
    hoursSavedPerWeek: 4,
    adoption: 0.7,
  }

  const result = calculateRoi(inputs)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">ROI Calculation Results</h3>

      <div className="space-y-2">
        <p>
          <strong>Annual Savings:</strong>{' '}
          {formatCurrency(result.annualSavings, 'nl')}
        </p>
        <p>
          <strong>Monthly Savings:</strong>{' '}
          {formatCurrency(result.monthlySavings, 'nl')}
        </p>
        <p>
          <strong>Hours Saved Annually:</strong>{' '}
          {result.hoursSavedAnnually.toLocaleString('nl-NL')} uur
        </p>
      </div>
    </div>
  )
}

// Example 8: Multi-language Support
export function MultiLanguageExample() {
  const [currentLocale, setCurrentLocale] = React.useState<'nl' | 'en'>('nl')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentLocale('nl')}
          className={`px-4 py-2 rounded ${currentLocale === 'nl' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Nederlands
        </button>
        <button
          onClick={() => setCurrentLocale('en')}
          className={`px-4 py-2 rounded ${currentLocale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          English
        </button>
      </div>

      <RoiCalculator
        locale={currentLocale}
        variant="card"
        showExport={true}
        enableUrlSync={true}
      />
    </div>
  )
}

// Example 9: URL Parameter Sync
export function UrlSyncExample() {
  return (
    <RoiCalculator
      locale="nl"
      enableUrlSync={true}
      variant="page"
      showMethodNote={true}
    />
  )
}

// Example 10: Custom Translations
export function CustomTranslationsExample() {
  const customTranslations = {
    title: 'Bereken je besparingen',
    subtitle: 'Ontdek hoeveel tijd en geld je kunt besparen',
    cta: {
      primary: 'Plan een demo',
      export: 'Download resultaten',
    },
  }

  return (
    <RoiCalculator
      locale="nl"
      translations={customTranslations}
      showExport={true}
    />
  )
}
