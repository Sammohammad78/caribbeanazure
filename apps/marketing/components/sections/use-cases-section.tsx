'use client'

import { useTranslations } from 'next-intl'
import { Mail, FileText, MessageSquare, ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const useCaseIcons = {
  0: Mail,
  1: FileText,
  2: MessageSquare,
}

export function UseCasesSection() {
  const t = useTranslations('useCases')

  const useCases = [0, 1, 2].map((index) => ({
    icon: useCaseIcons[index as keyof typeof useCaseIcons],
    title: t(`items.${index}.title`),
    problem: t(`items.${index}.problem`),
    solution: t(`items.${index}.solution`),
    example: t(`items.${index}.example`),
    outcome: t(`items.${index}.outcome`),
  }))

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-[color:var(--fg-subtle)] md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card
                key={index}
                className="group relative flex flex-col overflow-hidden border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_50%,transparent)] backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-2xl hover:shadow-[color:color-mix(in_oklab,var(--brand)_20%,transparent)]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_oklab,var(--brand)_8%,transparent)] via-transparent to-[color:color-mix(in_oklab,var(--accent)_5%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>

                  <CardTitle className="text-xl font-bold">{useCase.title}</CardTitle>
                </CardHeader>

                <CardContent className="relative flex flex-1 flex-col space-y-4">
                  {/* Problem */}
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--accent)]">
                      <div className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                      Problem
                    </div>
                    <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                      {useCase.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
                      <div className="h-1 w-1 rounded-full bg-[color:var(--brand)]" />
                      Solution
                    </div>
                    <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                      {useCase.solution}
                    </p>
                  </div>

                  {/* Example */}
                  <div className="rounded-lg border border-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)] p-3">
                    <div className="mb-1 text-xs font-medium text-[color:var(--fg-subtle)]">
                      Example:
                    </div>
                    <p className="text-sm leading-relaxed text-[color:var(--fg)]">
                      {useCase.example}
                    </p>
                  </div>

                  {/* Outcome Badge */}
                  <div className="mt-auto flex items-start gap-2 rounded-lg bg-gradient-to-r from-[color:color-mix(in_oklab,var(--brand)_10%,transparent)] to-[color:color-mix(in_oklab,var(--accent)_10%,transparent)] p-4">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--brand)]" />
                    <div>
                      <div className="text-xs font-medium text-[color:var(--fg-subtle)]">
                        Impact
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[color:var(--brand)]">
                        {useCase.outcome}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[color:color-mix(in_oklab,var(--brand)_30%,transparent)]"
          >
            {t('cta')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
