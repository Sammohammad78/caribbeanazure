'use client'

import { useTranslations } from 'next-intl'
import { Quote, Star, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  const testimonials = [0, 1, 2].map((index) => ({
    quote: t(`items.${index}.quote`),
    author: t(`items.${index}.author`),
    company: t(`items.${index}.company`),
    result: t(`items.${index}.result`),
  }))

  return (
    <section className="section-padding-y bg-gradient-to-b from-transparent via-[color:color-mix(in_oklab,var(--panel)_20%,transparent)] to-transparent">
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

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_60%,transparent)] backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-2xl hover:shadow-[color:color-mix(in_oklab,var(--brand)_20%,transparent)]"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_oklab,var(--brand)_6%,transparent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardContent className="relative p-8">
                {/* Quote Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg">
                  <Quote className="h-6 w-6" />
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[color:var(--accent)] text-[color:var(--accent)]"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="mb-6 text-base leading-relaxed text-[color:var(--fg)]">
                  "{testimonial.quote}"
                </blockquote>

                {/* Divider */}
                <div className="mb-6 h-px bg-gradient-to-r from-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] via-[color:color-mix(in_oklab,var(--brand)_40%,transparent)] to-transparent" />

                {/* Author Info */}
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-[color:var(--fg)]">
                      {testimonial.author}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[color:var(--fg-subtle)]">
                      <Building2 className="h-3.5 w-3.5" />
                      {testimonial.company}
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] to-[color:color-mix(in_oklab,var(--accent)_15%,transparent)] px-4 py-2 text-sm font-semibold text-[color:var(--brand)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
                    {testimonial.result}
                  </div>
                </div>
              </CardContent>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)] transition-all duration-500 group-hover:w-full" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
