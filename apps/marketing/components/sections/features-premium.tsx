'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Zap,
  Clock,
  Shield,
  Workflow,
  BarChart3,
  Code2,
  Boxes,
  Rocket,
  Lock,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

interface Feature {
  id: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
  benefits: string[]
}

export function FeaturesPremium() {
  const t = useTranslations('features')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features: Feature[] = [
    {
      id: 1,
      icon: Workflow,
      title: 'Procesautomatisering',
      description: 'Automatiseer repetitieve taken en workflows. Bespaar tot 60% tijd op dagelijkse operaties.',
      gradient: 'from-[color:var(--brand-600)] to-[color:var(--cyan-600)]',
      benefits: ['60% tijdwinst', 'Foutloos werken', 'Schaalbaar']
    },
    {
      id: 2,
      icon: Zap,
      title: 'Snelle Implementatie',
      description: 'Van prototype naar productie in 72 uur. Geen maanden wachten, maar direct resultaat.',
      gradient: 'from-[color:var(--cyan-600)] to-[color:var(--purple-600)]',
      benefits: ['72u prototype', 'Plug & play', 'Zero downtime']
    },
    {
      id: 3,
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Krijg direct inzicht in je KPIs met dashboards die automatisch bijwerken.',
      gradient: 'from-[color:var(--purple-600)] to-[color:var(--amber-600)]',
      benefits: ['Live dashboards', 'Data insights', 'Voorspellende AI']
    },
    {
      id: 4,
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level beveiliging met end-to-end encryptie en ISO 27001 certificering.',
      gradient: 'from-[color:var(--amber-600)] to-[color:var(--brand-600)]',
      benefits: ['ISO 27001', 'GDPR compliant', '99.9% uptime']
    },
    {
      id: 5,
      icon: Code2,
      title: 'API-First Platform',
      description: 'Integreer met elke tool via REST API, webhooks of pre-built connectoren.',
      gradient: 'from-[color:var(--brand-400)] to-[color:var(--cyan-400)]',
      benefits: ['1000+ integraties', 'Custom APIs', 'Webhooks']
    },
    {
      id: 6,
      icon: Boxes,
      title: 'Modulair & Flexibel',
      description: 'Kies alleen wat je nodig hebt. Schaal mee met je groei zonder vendor lock-in.',
      gradient: 'from-[color:var(--cyan-400)] to-[color:var(--purple-500)]',
      benefits: ['Pay as you grow', 'Geen lock-in', 'White-label']
    },
    {
      id: 7,
      icon: Rocket,
      title: 'AI-Powered Tools',
      description: 'Gebruik GPT-4 en Claude voor slimme automatisering en besluitvorming.',
      gradient: 'from-[color:var(--purple-500)] to-[color:var(--brand-600)]',
      benefits: ['GPT-4 integratie', 'Smart routing', 'Auto-optimize']
    },
    {
      id: 8,
      icon: RefreshCw,
      title: 'Auto-Updates',
      description: 'Altijd de nieuwste features zonder downtime of migratie inspanning.',
      gradient: 'from-[color:var(--brand-600)] to-[color:var(--amber-600)]',
      benefits: ['Zero-downtime', 'Auto-rollback', 'Versie beheer']
    },
    {
      id: 9,
      icon: Lock,
      title: 'Data Privacy',
      description: 'Jouw data blijft in Nederland. Volledige controle en GDPR compliant.',
      gradient: 'from-[color:var(--amber-600)] to-[color:var(--cyan-600)]',
      benefits: ['NL hosting', 'Data eigendom', 'AVG-proof']
    }
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--bg)] via-[color:var(--brand-soft)]/10 to-[color:var(--bg)]" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[color:var(--brand-600)] rounded-full blur-[100px] opacity-10 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[color:var(--cyan-600)] rounded-full blur-[120px] opacity-10 animate-float-slow" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)]/20 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-[color:var(--brand)] animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]">
              Premium Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[color:var(--fg)] mb-6">
            Alles wat je nodig hebt voor{' '}
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--cyan-600)] bg-clip-text text-transparent">
              schaalbare groei
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[color:var(--fg-muted)]">
            Enterprise-grade tools speciaal gebouwd voor ambitieuze MKB bedrijven
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isHovered={hoveredCard === feature.id}
              onHover={() => setHoveredCard(feature.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fadeInUp delay-400">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/oplossingen"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[color:var(--brand)] bg-transparent px-8 py-4 text-lg font-bold text-[color:var(--brand)] transition-all duration-300 hover:bg-[color:var(--brand)] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[color:var(--brand)]/30"
            >
              Bekijk alle oplossingen
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[color:var(--brand-600)]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/50"
            >
              <Zap className="h-5 w-5" />
              Start gratis pilot
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  feature: Feature
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function FeatureCard({ feature, index, isHovered, onHover, onLeave }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <div
      className="group relative animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 blur-2xl transition-opacity duration-500 ${
          isHovered ? 'opacity-30' : ''
        }`}
      />

      {/* Card */}
      <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-white/20">
        {/* Icon with gradient background */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-[color:var(--fg)] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-base leading-relaxed text-[color:var(--fg-muted)]">
          {feature.description}
        </p>

        {/* Benefits list */}
        <ul className="space-y-2">
          {feature.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm font-medium text-[color:var(--fg-muted)] animate-slideInLeft"
              style={{ animationDelay: `${isHovered ? i * 100 : 0}ms` }}
            >
              <CheckCircle2 className={`h-4 w-4 flex-shrink-0 text-[color:var(--brand)] transition-all duration-300 ${isHovered ? 'scale-125' : ''}`} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Meer info</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Animated corner accent */}
        <div
          className={`absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br ${feature.gradient} opacity-0 blur-3xl transition-opacity duration-500 ${
            isHovered ? 'opacity-20' : ''
          }`}
        />
      </div>
    </div>
  )
}
