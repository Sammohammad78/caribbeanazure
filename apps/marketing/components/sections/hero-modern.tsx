'use client'

import { ArrowRight, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroModern() {
  return (
    <section className="section-modern grid-bg relative overflow-hidden">
      <div className="container-modern">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="badge-modern badge-accent mb-8 fade-in-up inline-flex">
            <Sparkles className="h-3 w-3" />
            <span>Automatisering Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
            Automatiseer je bedrijf.{' '}
            <span className="text-gradient">Schaal zonder grenzen.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-[color:var(--text-secondary)] mb-10 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            Caribbean Azure bouwt slimme automatisering voor moderne bedrijven.
            Van prototype naar productie in 72 uur. Geen maanden wachten.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/configurator" className="btn-primary glow-accent">
              Start Configurator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-modern">
              Plan een gesprek
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="border-l border-[color:var(--border-medium)] pl-4 text-left">
              <div className="text-2xl md:text-3xl font-bold text-[color:var(--accent-primary)] mb-1">50+</div>
              <div className="text-sm text-[color:var(--text-tertiary)]">Klanten</div>
            </div>
            <div className="border-l border-[color:var(--border-medium)] pl-4 text-left">
              <div className="text-2xl md:text-3xl font-bold text-[color:var(--accent-primary)] mb-1">60%</div>
              <div className="text-sm text-[color:var(--text-tertiary)]">Tijdwinst</div>
            </div>
            <div className="border-l border-[color:var(--border-medium)] pl-4 text-left">
              <div className="text-2xl md:text-3xl font-bold text-[color:var(--accent-primary)] mb-1">72u</div>
              <div className="text-sm text-[color:var(--text-tertiary)]">Naar productie</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accent glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[color:var(--accent-primary)] to-transparent opacity-30"></div>
    </section>
  )
}
