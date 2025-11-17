'use client'

import { Workflow, Zap, BarChart3, Shield, Code2, Boxes, Rocket, Clock, Lock } from 'lucide-react'

const features = [
  {
    icon: Workflow,
    title: 'Procesautomatisering',
    description: 'Automatiseer repetitieve taken. Bespaar tot 60% tijd op dagelijkse operaties.'
  },
  {
    icon: Zap,
    title: 'Snelle Implementatie',
    description: 'Van prototype naar productie in 72 uur. Direct resultaat, geen maanden wachten.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Live dashboards met automatische updates. Directinzicht in je KPIs.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'ISO 27001 certificering. End-to-end encryptie. Bank-level beveiliging.'
  },
  {
    icon: Code2,
    title: 'API-First Platform',
    description: '1000+ integraties. REST API. Webhooks. Koppel met elke tool.'
  },
  {
    icon: Boxes,
    title: 'Modulair & Flexibel',
    description: 'Schaal mee met je groei. Pay as you grow. Geen vendor lock-in.'
  },
  {
    icon: Rocket,
    title: 'AI-Powered',
    description: 'GPT-4 & Claude integratie. Slimme automatisering met AI assistentie.'
  },
  {
    icon: Clock,
    title: 'Auto-Updates',
    description: 'Altijd de nieuwste features. Zero downtime updates. Automatische rollback.'
  },
  {
    icon: Lock,
    title: 'GDPR Compliant',
    description: 'Data blijft in Nederland. Volledige AVG compliance. Jouw data, jouw controle.'
  }
]

export function FeaturesModern() {
  return (
    <section className="section-modern relative">
      <div className="container-modern">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="badge-modern badge-accent mb-6 inline-flex">
            <Zap className="h-3 w-3" />
            <span>Premium Features</span>
          </div>
          <h2 className="mb-4">
            Enterprise tools voor{' '}
            <span className="text-accent">moderne bedrijven</span>
          </h2>
          <p className="text-lg text-[color:var(--text-secondary)]">
            Alle tools die je nodig hebt om je bedrijfsprocessen te automatiseren en te schalen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="card-modern group fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--bg-tertiary)] border border-[color:var(--border-medium)] transition-all duration-200 group-hover:border-[color:var(--accent-primary)] group-hover:bg-[color:var(--accent-primary)]/10">
                  <Icon className="h-5 w-5 text-[color:var(--accent-primary)] transition-transform duration-200 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
