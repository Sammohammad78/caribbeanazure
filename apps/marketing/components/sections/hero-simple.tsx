'use client'

import { useTranslations } from 'next-intl'
import { SimpleButton } from '@/components/ui/simple-button'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSimple() {
  const t = useTranslations('hero')

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="badge mb-6">
            <Zap className="h-4 w-4" />
            <span>Automatisering voor MKB</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[color:var(--text)] mb-6">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-large text-[color:var(--text-muted)] mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SimpleButton href="/configurator" icon={<ArrowRight className="h-5 w-5" />}>
              Start Configurator
            </SimpleButton>
            <SimpleButton href="/contact" variant="secondary">
              Plan een gesprek
            </SimpleButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[color:var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              <span>50+ klanten</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              <span>60% tijdwinst</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              <span>99.9% uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
