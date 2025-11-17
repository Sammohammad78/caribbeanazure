'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroPremium() {
  const t = useTranslations('hero')
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />

      {/* Mesh Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-50 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.15) 0%, transparent 50%)`
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--brand-600)] rounded-full blur-[120px] opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--cyan-600)] rounded-full blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[color:var(--purple-600)] rounded-full blur-[150px] opacity-10 animate-pulse" />

      {/* Content */}
      <div className="container-custom relative z-10 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <div className="mb-8 flex justify-center animate-fadeInUp">
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[color:var(--brand-600)] via-[color:var(--cyan-600)] to-[color:var(--purple-600)] opacity-75 blur-lg group-hover:opacity-100 transition duration-500" />

              {/* Badge content */}
              <div className="relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3">
                <Sparkles className="h-5 w-5 text-[color:var(--cyan-400)] animate-pulse" />
                <span className="bg-gradient-to-r from-[color:var(--cyan-400)] to-[color:var(--brand-400)] bg-clip-text text-sm font-bold uppercase tracking-[0.2em] text-transparent">
                  {t('badge')}
                </span>
                <div className="h-2 w-2 rounded-full bg-[color:var(--cyan-400)] animate-ping" />
              </div>
            </div>
          </div>

          {/* Main Headline - HUGE */}
          <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 animate-fadeInUp delay-100">
            <span className="block text-white">
              Automatiseer je werk.
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[color:var(--brand-400)] via-[color:var(--cyan-400)] to-[color:var(--purple-500)] bg-clip-text text-transparent animate-gradient-x">
              Versnel je groei.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-center text-xl md:text-2xl text-white/70 leading-relaxed mb-12 animate-fadeInUp delay-200">
            {t('subtitle')}{' '}
            <span className="font-semibold text-white bg-gradient-to-r from-[color:var(--cyan-400)] to-[color:var(--brand-400)] bg-clip-text text-transparent">
              {t('subtitleHighlight1')}
            </span>
            {' '}{t('subtitleAnd')}{' '}
            <span className="font-semibold text-white bg-gradient-to-r from-[color:var(--brand-400)] to-[color:var(--purple-500)] bg-clip-text text-transparent">
              {t('subtitleHighlight2')}
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fadeInUp delay-300">
            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="group relative min-w-[240px] h-14 bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] text-white font-bold text-lg rounded-xl shadow-lg shadow-[color:var(--brand-600)]/50 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/70 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  {t('cta.primary')}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[240px] h-14 border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300"
            >
              <Link href="/oplossingen">
                {t('cta.secondary')}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators - Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeInUp delay-400">
            {/* Stat 1 */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[color:var(--brand-600)]/20 to-[color:var(--cyan-600)]/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-[color:var(--cyan-400)]" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-[color:var(--cyan-400)] to-[color:var(--brand-400)] bg-clip-text text-transparent mb-2">
                  72h
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wide">
                  Prototype klaar
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[color:var(--brand-600)]/20 to-[color:var(--purple-600)]/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="h-8 w-8 text-[color:var(--brand-400)]" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-[color:var(--brand-400)] to-[color:var(--purple-500)] bg-clip-text text-transparent mb-2">
                  30-60%
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wide">
                  Tijdwinst
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[color:var(--purple-600)]/20 to-[color:var(--cyan-600)]/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="h-8 w-8 text-[color:var(--purple-500)]" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-[color:var(--purple-500)] to-[color:var(--cyan-400)] bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wide">
                  MKB klanten
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex justify-center animate-bounce">
            <div className="rounded-full border-2 border-white/20 p-2">
              <div className="h-6 w-0.5 bg-gradient-to-b from-white/80 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </section>
  )
}
