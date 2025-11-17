'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { TrendingUp, Users, Zap, Clock, Award, Target } from 'lucide-react'

interface Stat {
  id: number
  label: string
  value: number
  suffix: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
}

function useCountUp(end: number, duration: number = 2000, enabled: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      // Easing function for smooth animation (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [end, duration, enabled])

  return count
}

export function StatsPremium() {
  const t = useTranslations('stats')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to trigger animation when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const stats: Stat[] = [
    {
      id: 1,
      label: 'MKB Klanten',
      value: 50,
      suffix: '+',
      icon: Users,
      color: 'var(--brand-400)',
      gradient: 'from-[color:var(--brand-600)] to-[color:var(--cyan-600)]'
    },
    {
      id: 2,
      label: 'Tijdwinst',
      value: 40,
      suffix: '%',
      icon: Clock,
      color: 'var(--cyan-400)',
      gradient: 'from-[color:var(--cyan-600)] to-[color:var(--brand-400)]'
    },
    {
      id: 3,
      label: 'ROI Gemiddeld',
      value: 312,
      suffix: '%',
      icon: TrendingUp,
      color: 'var(--amber-500)',
      gradient: 'from-[color:var(--amber-600)] to-[color:var(--brand-600)]'
    },
    {
      id: 4,
      label: 'Projecten Live',
      value: 120,
      suffix: '+',
      icon: Zap,
      color: 'var(--purple-500)',
      gradient: 'from-[color:var(--purple-600)] to-[color:var(--cyan-600)]'
    },
    {
      id: 5,
      label: 'Team Experts',
      value: 15,
      suffix: '+',
      icon: Award,
      color: 'var(--brand-400)',
      gradient: 'from-[color:var(--brand-400)] to-[color:var(--purple-600)]'
    },
    {
      id: 6,
      label: 'Uptime Garantie',
      value: 99,
      suffix: '.9%',
      icon: Target,
      color: 'var(--success-green)',
      gradient: 'from-[color:var(--jade-600)] to-[color:var(--cyan-600)]'
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--brand-soft)]/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)]/20 px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-[color:var(--brand)]" />
            <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]">
              Prestaties die spreken
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[color:var(--fg)] mb-6">
            Cijfers die het{' '}
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--cyan-600)] bg-clip-text text-transparent">
              verschil maken
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[color:var(--fg-muted)]">
            Bewezen resultaten van Nederlandse bedrijven die hun processen automatiseren
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fadeInUp delay-400">
          <p className="text-lg text-[color:var(--fg-muted)] mb-4">
            Klaar om deze resultaten ook te behalen?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[color:var(--brand-600)]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/50"
          >
            <Zap className="h-5 w-5" />
            Start je transformatie
          </a>
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: Stat
  index: number
  isVisible: boolean
}

function StatCard({ stat, index, isVisible }: StatCardProps) {
  const count = useCountUp(stat.value, 2000, isVisible)
  const Icon = stat.icon

  return (
    <div
      className="group relative animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${stat.color}33, transparent)`
        }}
      />

      {/* Card */}
      <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center">
          <div
            className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 shadow-lg`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Value with counter animation */}
        <div className="mb-3 text-center">
          <span
            className="text-5xl md:text-6xl font-black tracking-tight"
            style={{ color: stat.color }}
          >
            {count}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-[color:var(--fg-muted)]">
          {stat.label}
        </p>

        {/* Animated underline */}
        <div className="mt-4 flex justify-center">
          <div
            className={`h-1 w-12 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-300 group-hover:w-20`}
          />
        </div>
      </div>
    </div>
  )
}
