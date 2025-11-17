'use client'

import { useTranslations } from 'next-intl'
import { Zap, Workflow, BarChart3, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const iconMap = {
  0: Zap,
  1: Workflow,
  2: BarChart3,
  3: Sparkles,
}

export function ServicesGrid() {
  const t = useTranslations('services')

  const services = [0, 1, 2, 3].map((index) => ({
    title: t(`items.${index}.title`),
    description: t(`items.${index}.description`),
    icon: iconMap[index as keyof typeof iconMap],
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

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_40%,transparent)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[color:var(--brand)] hover:shadow-xl hover:shadow-[color:color-mix(in_oklab,var(--brand)_20%,transparent)]"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_oklab,var(--brand)_8%,transparent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed text-[color:var(--fg-subtle)]">
                    {service.description}
                  </CardDescription>
                </CardContent>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)] transition-all duration-300 group-hover:w-full" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
