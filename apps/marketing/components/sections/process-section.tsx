'use client'

import { useTranslations } from 'next-intl'
import { ClipboardList, Zap, Rocket } from 'lucide-react'

const stepIcons = {
  0: ClipboardList,
  1: Zap,
  2: Rocket,
}

export function ProcessSection() {
  const t = useTranslations('process')

  const steps = [
    {
      number: 1,
      icon: stepIcons[0],
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      number: 2,
      icon: stepIcons[1],
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      number: 3,
      icon: stepIcons[2],
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ]

  return (
    <section className="section-padding-y bg-gradient-to-b from-transparent via-[color:color-mix(in_oklab,var(--panel)_30%,transparent)] to-transparent">
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

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[color:var(--brand)] via-[color:var(--accent)] to-[color:var(--brand)] lg:block" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-5/12">
                    <div
                      className={`group relative overflow-hidden rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_60%,transparent)] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-2xl hover:shadow-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] ${
                        isEven ? 'lg:text-right' : 'lg:text-left'
                      }`}
                    >
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_oklab,var(--brand)_5%,transparent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative">
                        {/* Icon (Mobile/Tablet only) */}
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg lg:hidden">
                          <Icon className="h-7 w-7" />
                        </div>

                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-[color:var(--fg-subtle)]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon (Desktop only) */}
                  <div className="hidden lg:block lg:w-2/12">
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                      {/* Outer Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] opacity-20 blur-xl" />

                      {/* Icon Container */}
                      <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-[color:var(--panel)] bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-xl">
                        <Icon className="h-9 w-9" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--panel)] text-sm font-bold text-[color:var(--brand)] shadow-lg ring-2 ring-[color:var(--brand)]">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
