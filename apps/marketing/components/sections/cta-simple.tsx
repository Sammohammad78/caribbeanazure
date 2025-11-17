'use client'

import { SimpleButton } from '@/components/ui/simple-button'
import { ArrowRight } from 'lucide-react'

export function CTASimple() {
  return (
    <section className="bg-brand py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Klaar om te starten?
          </h2>
          <p className="text-large text-white/90 mb-8">
            Ontdek hoe Caribbean Azure jouw bedrijfsprocessen kan automatiseren.
            Start vandaag nog met onze configurator of plan een gratis gesprek.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/configurator"
              className="btn-primary bg-white text-[color:var(--brand)] hover:bg-white/90"
            >
              Start Configurator
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-[color:var(--brand)]"
            >
              Plan een gesprek
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
