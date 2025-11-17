'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Check, Zap, Crown, Rocket, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PricingTier {
  id: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  popular: boolean
  features: string[]
  cta: string
  ctaLink: string
}

export function PricingPremium() {
  const t = useTranslations('pricing')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  const tiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Perfect voor kleine teams',
      price: billingPeriod === 'monthly' ? 499 : 4490,
      priceLabel: billingPeriod === 'monthly' ? '/maand' : '/jaar',
      description: 'Begin met automatisering zonder grote investering',
      icon: Zap,
      gradient: 'from-[color:var(--brand-600)] to-[color:var(--cyan-600)]',
      popular: false,
      features: [
        '5 automatiserings',
        '1.000 taken per maand',
        'Basis integraties (Slack, Gmail)',
        'Email support',
        '1 gebruiker',
        'Dashboard analytics',
        'API toegang'
      ],
      cta: 'Start gratis trial',
      ctaLink: '/contact?plan=starter'
    },
    {
      id: 'professional',
      name: 'Professional',
      tagline: 'Meest gekozen door MKB',
      price: billingPeriod === 'monthly' ? 1299 : 11690,
      priceLabel: billingPeriod === 'monthly' ? '/maand' : '/jaar',
      description: 'Volledige automatisering met premium support',
      icon: Crown,
      gradient: 'from-[color:var(--purple-600)] to-[color:var(--amber-600)]',
      popular: true,
      features: [
        '25 automatiserings',
        '10.000 taken per maand',
        'Alle premium integraties',
        'Priority support (2u response)',
        '5 gebruikers',
        'Advanced analytics + AI insights',
        'Custom webhooks',
        'White-label optie',
        'Dedicated onboarding'
      ],
      cta: 'Start nu - 14 dagen gratis',
      ctaLink: '/contact?plan=professional'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Voor schaalbare organisaties',
      price: 0,
      priceLabel: 'Op maat',
      description: 'Volledig custom oplossing met SLA garanties',
      icon: Rocket,
      gradient: 'from-[color:var(--cyan-600)] to-[color:var(--brand-600)]',
      popular: false,
      features: [
        'Onbeperkte automatiserings',
        'Onbeperkte taken',
        'Alle integraties + custom builds',
        '24/7 dedicated support',
        'Onbeperkt gebruikers',
        'Enterprise security (SSO, SAML)',
        'Custom SLA (99.9% uptime)',
        'Persoonlijke account manager',
        'Maandelijkse strategie sessies',
        'On-premise deployment optie'
      ],
      cta: 'Plan een demo',
      ctaLink: '/contact?plan=enterprise'
    }
  ]

  const yearlyDiscount = 10 // 10% discount

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />

      {/* Animated gradient mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--brand-600)] rounded-full blur-[150px] opacity-20 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--purple-600)] rounded-full blur-[150px] opacity-20 animate-float-slow" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-[color:var(--cyan-400)] animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[color:var(--cyan-400)] to-[color:var(--brand-400)] bg-clip-text text-transparent">
              Transparante Prijzen
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Betaal alleen voor wat je{' '}
            <span className="bg-gradient-to-r from-[color:var(--brand-400)] to-[color:var(--cyan-400)] bg-clip-text text-transparent">
              écht gebruikt
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Flexibele plannen die meegroeien met je ambities. Altijd opzegbaar, geen verborgen kosten.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-fadeInUp delay-100">
          <span className={`text-sm font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-white/50'}`}>
            Maandelijks
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="relative h-8 w-16 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/40"
            aria-label="Toggle billing period"
          >
            <div
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-gradient-to-r from-[color:var(--brand-400)] to-[color:var(--cyan-400)] shadow-lg transition-transform duration-300 ${
                billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors ${billingPeriod === 'yearly' ? 'text-white' : 'text-white/50'}`}>
            Jaarlijks
          </span>
          {billingPeriod === 'yearly' && (
            <span className="rounded-full bg-gradient-to-r from-[color:var(--amber-600)] to-[color:var(--brand-600)] px-3 py-1 text-xs font-bold text-white animate-scale-in">
              Bespaar {yearlyDiscount}%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={index}
              isHovered={hoveredTier === tier.id}
              onHover={() => setHoveredTier(tier.id)}
              onLeave={() => setHoveredTier(null)}
            />
          ))}
        </div>

        {/* Trust Bar */}
        <div className="text-center animate-fadeInUp delay-400">
          <p className="text-sm text-white/50 mb-4">VERTROUWD DOOR 50+ NEDERLANDSE BEDRIJVEN</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['TechStart', 'LogiFlow', 'GrowthLab', 'DataCo', 'InnoVent'].map((company) => (
              <div
                key={company}
                className="text-lg font-bold text-white hover:text-[color:var(--brand-400)] transition-colors cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  tier: PricingTier
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function PricingCard({ tier, index, isHovered, onHover, onLeave }: PricingCardProps) {
  const Icon = tier.icon

  return (
    <div
      className={`relative animate-fadeInUp ${tier.popular ? 'lg:-mt-4' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[color:var(--amber-600)] to-[color:var(--brand-600)] blur-lg opacity-75" />
            <div className="relative rounded-full bg-gradient-to-r from-[color:var(--amber-600)] to-[color:var(--brand-600)] px-6 py-2 text-sm font-bold text-white shadow-xl">
              ⭐ Meest Gekozen
            </div>
          </div>
        </div>
      )}

      {/* Glow effect */}
      <div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${tier.gradient} opacity-0 blur-2xl transition-opacity duration-500 ${
          isHovered || tier.popular ? 'opacity-40' : ''
        }`}
      />

      {/* Card */}
      <div
        className={`relative h-full rounded-3xl border backdrop-blur-2xl p-8 transition-all duration-500 ${
          tier.popular
            ? 'border-white/20 bg-gradient-to-br from-white/15 to-white/5 hover:-translate-y-2'
            : 'border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] hover:-translate-y-2'
        }`}
      >
        {/* Icon */}
        <div className="mb-6">
          <div className={`inline-flex rounded-2xl bg-gradient-to-br ${tier.gradient} p-4 shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
          <p className="text-sm text-white/60">{tier.tagline}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          {tier.price === 0 ? (
            <div className="text-4xl font-black text-white">{tier.priceLabel}</div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-lg text-white/70">€</span>
              <span className="text-5xl font-black text-white">{tier.price.toLocaleString('nl-NL')}</span>
              <span className="text-lg text-white/70">{tier.priceLabel}</span>
            </div>
          )}
          <p className="mt-2 text-sm text-white/60">{tier.description}</p>
        </div>

        {/* CTA Button */}
        <a
          href={tier.ctaLink}
          className={`block w-full mb-8 text-center rounded-xl px-6 py-4 font-bold transition-all duration-300 ${
            tier.popular
              ? 'bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] text-white shadow-lg shadow-[color:var(--brand-600)]/50 hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/70'
              : 'border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {tier.cta}
            <ArrowRight className="h-5 w-5" />
          </span>
        </a>

        {/* Features List */}
        <ul className="space-y-3">
          {tier.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-white/80 animate-slideInLeft"
              style={{ animationDelay: `${isHovered ? i * 50 : 0}ms` }}
            >
              <Check className={`h-5 w-5 flex-shrink-0 text-[color:var(--brand-400)] transition-all duration-300 ${isHovered ? 'scale-125' : ''}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Hover gradient accent */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r ${tier.gradient} transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  )
}
