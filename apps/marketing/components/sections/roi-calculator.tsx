'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Calculator, TrendingUp, Clock } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/format'

export function ROICalculatorSection() {
  const t = useTranslations('roiSection')
  const locale = useLocale() as 'nl' | 'en'

  // Input state
  const [teamSize, setTeamSize] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(65)
  const [hoursSaved, setHoursSaved] = useState(5)
  const [adoption, setAdoption] = useState(80)

  // Calculated results
  const [results, setResults] = useState({
    monthlySavings: 0,
    annualSavings: 0,
    totalHoursSaved: 0
  })

  // Calculate ROI whenever inputs change
  useEffect(() => {
    // Monthly savings = (teamSize × hourlyRate × hoursSaved × 4.33 weeks) × (adoption / 100)
    const weeksPerMonth = 4.33
    const monthlySavings = (teamSize * hourlyRate * hoursSaved * weeksPerMonth) * (adoption / 100)

    // Annual savings = monthly × 12
    const annualSavings = monthlySavings * 12

    // Total hours saved per year = teamSize × hoursSaved × 52 weeks × (adoption / 100)
    const totalHoursSaved = teamSize * hoursSaved * 52 * (adoption / 100)

    setResults({
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      totalHoursSaved: Math.round(totalHoursSaved)
    })
  }, [teamSize, hourlyRate, hoursSaved, adoption])

  return (
    <Section spacing="xl" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[color:color-mix(in_oklab,var(--brand-soft)_8%,transparent)] to-transparent" />

      <Container size="default" className="relative">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-strong)] text-white shadow-lg">
                <Calculator className="h-8 w-8" />
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[color:var(--fg)] md:text-4xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[color:var(--fg-muted)]">
              {t('subtitle')}
            </p>
          </div>

          {/* ROI Calculator Card */}
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 shadow-2xl backdrop-blur-xl md:p-12">
            {/* Input Grid */}
            <div className="mb-10 grid gap-6 sm:grid-cols-2">
              {/* Team Size */}
              <div className="space-y-3">
                <label htmlFor="team-size" className="block text-sm font-semibold text-[color:var(--fg)]">
                  {t('inputs.teamSize.label')}
                </label>
                <input
                  id="team-size"
                  type="number"
                  min="1"
                  max="1000"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 text-[color:var(--fg)] transition-all focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-opacity-20"
                  placeholder="10"
                  aria-describedby="team-size-help"
                />
                <p id="team-size-help" className="text-xs text-[color:var(--fg-subtle)]">
                  {t('inputs.teamSize.help')}
                </p>
              </div>

              {/* Hourly Rate */}
              <div className="space-y-3">
                <label htmlFor="hourly-rate" className="block text-sm font-semibold text-[color:var(--fg)]">
                  {t('inputs.hourlyRate.label')}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)]">
                    €
                  </span>
                  <input
                    id="hourly-rate"
                    type="number"
                    min="10"
                    max="500"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-elevated)] py-3 pl-8 pr-4 text-[color:var(--fg)] transition-all focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-opacity-20"
                    placeholder="65"
                    aria-describedby="hourly-rate-help"
                  />
                </div>
                <p id="hourly-rate-help" className="text-xs text-[color:var(--fg-subtle)]">
                  {t('inputs.hourlyRate.help')}
                </p>
              </div>

              {/* Hours Saved Per Week */}
              <div className="space-y-3">
                <label htmlFor="hours-saved" className="block text-sm font-semibold text-[color:var(--fg)]">
                  {t('inputs.hoursSaved.label')}
                </label>
                <input
                  id="hours-saved"
                  type="number"
                  min="0"
                  max="40"
                  step="0.5"
                  value={hoursSaved}
                  onChange={(e) => setHoursSaved(Number(e.target.value))}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 text-[color:var(--fg)] transition-all focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-opacity-20"
                  placeholder="5"
                  aria-describedby="hours-saved-help"
                />
                <p id="hours-saved-help" className="text-xs text-[color:var(--fg-subtle)]">
                  {t('inputs.hoursSaved.help')}
                </p>
              </div>

              {/* Adoption Rate */}
              <div className="space-y-3">
                <label htmlFor="adoption" className="block text-sm font-semibold text-[color:var(--fg)]">
                  {t('inputs.adoption.label')}
                </label>
                <div className="relative">
                  <input
                    id="adoption"
                    type="number"
                    min="10"
                    max="100"
                    value={adoption}
                    onChange={(e) => setAdoption(Number(e.target.value))}
                    className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 pr-10 text-[color:var(--fg)] transition-all focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-opacity-20"
                    placeholder="80"
                    aria-describedby="adoption-help"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)]">
                    %
                  </span>
                </div>
                <p id="adoption-help" className="text-xs text-[color:var(--fg-subtle)]">
                  {t('inputs.adoption.help')}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-[color:var(--border)] to-transparent" />

            {/* Results */}
            <div className="space-y-6">
              <h3 className="text-center text-lg font-semibold text-[color:var(--fg)]">
                {t('results.title')}
              </h3>

              {/* Results Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Monthly Savings */}
                <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-gradient-to-br from-[color:color-mix(in_oklab,var(--brand-soft)_30%,transparent)] to-transparent p-6 text-center">
                  <div className="mb-2 flex justify-center">
                    <TrendingUp className="h-5 w-5 text-[color:var(--brand)]" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-[color:var(--fg)]" aria-live="polite">
                    {formatCurrency(results.monthlySavings, locale)}
                  </div>
                  <div className="text-sm text-[color:var(--fg-muted)]">
                    {t('results.monthly')}
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="rounded-2xl border-2 border-[color:var(--brand)] bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-strong)] p-6 text-center text-white shadow-lg">
                  <div className="mb-2 flex justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="mb-1 text-3xl font-bold" aria-live="polite">
                    {formatCurrency(results.annualSavings, locale)}
                  </div>
                  <div className="text-sm opacity-90">
                    {t('results.annual')}
                  </div>
                </div>

                {/* Hours Saved */}
                <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--accent-amber)_20%,transparent)] bg-gradient-to-br from-[color:color-mix(in_oklab,var(--accent-amber-light)_30%,transparent)] to-transparent p-6 text-center">
                  <div className="mb-2 flex justify-center">
                    <Clock className="h-5 w-5 text-[color:var(--accent-amber)]" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-[color:var(--fg)]" aria-live="polite">
                    {formatNumber(results.totalHoursSaved, locale)}
                  </div>
                  <div className="text-sm text-[color:var(--fg-muted)]">
                    {t('results.hours')}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-strong)] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-offset-2"
                >
                  {t('cta')}
                </Link>
                <p className="mt-4 text-sm text-[color:var(--fg-subtle)]">
                  {t('disclaimer')}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-center text-sm text-[color:var(--fg-subtle)]">
            {t('note')}
          </p>
        </div>
      </Container>
    </Section>
  )
}
