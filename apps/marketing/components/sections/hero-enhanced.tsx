'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroEnhanced() {
  const t = useTranslations('hero')
  const common = useTranslations('common')

  return (
    <section className="section-padding-y hero-glow relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--brand-soft)_0%,_transparent_50%)] opacity-20" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)] backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {t('badge')}
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[color:var(--fg)] md:text-5xl lg:text-6xl xl:text-7xl">
            {t('title')}
          </h1>

          {/* Subtitle with Highlights */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--fg-muted)] md:text-xl">
            {t('subtitle')}{' '}
            <span className="font-semibold text-[color:var(--brand)]">
              {t('subtitleHighlight1')}
            </span>
            {' '}{t('subtitleAnd')}{' '}
            <span className="font-semibold text-[color:var(--brand)]">
              {t('subtitleHighlight2')}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group min-w-[200px] bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-strong)] shadow-lg shadow-[color:var(--brand)]/25"
            >
              <Link href="/contact">
                {t('cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]"
            >
              <Link href="/oplossingen">
                {t('cta.secondary')}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[color:var(--fg-muted)]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
              <span>72-uurs prototype</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
              <span>30-60% tijdwinst</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
              <span>50+ MKB klanten</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
