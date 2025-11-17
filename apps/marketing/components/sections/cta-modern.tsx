'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function CTAModern() {
  return (
    <section className="section-modern relative overflow-hidden">
      <div className="container-modern">
        <div className="border-gradient relative p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-primary)]/5 to-transparent"></div>

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="badge-modern badge-accent mb-6 inline-flex">
              <Sparkles className="h-3 w-3" />
              <span>Start vandaag</span>
            </div>

            <h2 className="mb-6">
              Klaar om te beginnen?
            </h2>

            <p className="text-lg text-[color:var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Ontdek hoe Caribbean Azure jouw bedrijfsprocessen kan automatiseren.
              Start met onze configurator of plan een gratis gesprek met een expert.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/configurator" className="btn-primary glow-accent">
                Start Configurator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-modern">
                Plan een gesprek
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[color:var(--text-tertiary)] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]"></div>
                <span>Geen setup kosten</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]"></div>
                <span>14 dagen gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
