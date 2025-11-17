'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  ArrowRight,
  Zap,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react'

export function FooterPremium() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const footerLinks = {
    oplossingen: [
      { label: 'Procesautomatisering', href: '/oplossingen#procesautomatisering' },
      { label: 'AI Integraties', href: '/oplossingen#ai' },
      { label: 'Data Analytics', href: '/oplossingen#analytics' },
      { label: 'Custom Development', href: '/oplossingen#custom' },
      { label: 'API Connectoren', href: '/oplossingen#api' }
    ],
    bedrijf: [
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Ons team', href: '/over-ons#team' },
      { label: 'Carrière', href: '/carriere' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case studies', href: '/cases' }
    ],
    resources: [
      { label: 'Documentatie', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community', href: '/community' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'Support Center', href: '/support' }
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Voorwaarden', href: '/voorwaarden' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'AVG / GDPR', href: '/gdpr' },
      { label: 'SLA', href: '/sla' }
    ]
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/caribbeanazure', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/caribbeanazure', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/caribbeanazure', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/@caribbeanazure', label: 'YouTube' }
  ]

  const trustBadges = [
    { icon: Shield, label: 'ISO 27001' },
    { icon: Award, label: 'GDPR Compliant' },
    { icon: TrendingUp, label: '99.9% Uptime' },
    { icon: Zap, label: 'SOC 2 Type II' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--brand-600)] rounded-full blur-[150px] opacity-10 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--purple-600)] rounded-full blur-[150px] opacity-10 animate-float-slow" />

      <div className="container-custom relative z-10">
        {/* Top Section - Newsletter + Quick Contact */}
        <div className="border-b border-white/10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div className="animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-[color:var(--cyan-400)]" />
                <h3 className="text-2xl font-bold">Blijf op de hoogte</h3>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                Ontvang maandelijks tips, trends en updates over procesautomatisering en AI.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="jouw@email.nl"
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl px-6 py-4 text-white placeholder:text-white/50 transition-all duration-300 focus:border-[color:var(--brand-400)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-400)]/30"
                  required
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] px-8 py-4 font-bold text-white shadow-lg shadow-[color:var(--brand-600)]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/50"
                >
                  Abonneer
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="animate-fadeInUp delay-100">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-[color:var(--cyan-400)]" />
                <h3 className="text-2xl font-bold">Neem contact op</h3>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:info@caribbeanazure.com"
                  className="group flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-[color:var(--cyan-400)]"
                >
                  <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>info@caribbeanazure.com</span>
                </a>
                <a
                  href="tel:+31201234567"
                  className="group flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-[color:var(--cyan-400)]"
                >
                  <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>+31 20 123 4567</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>
                    Amsterdam Science Park<br />
                    1098 XH Amsterdam<br />
                    Nederland
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 animate-fadeInUp">
              <Link href="/" className="inline-block mb-6">
                <div className="text-2xl font-black bg-gradient-to-r from-[color:var(--brand-400)] to-[color:var(--cyan-400)] bg-clip-text text-transparent">
                  Caribbean Azure
                </div>
              </Link>
              <p className="text-sm text-white/60 mb-6 max-w-xs">
                Automatiseer je werk. Versnel je groei. Premium automatiseringsoplossingen voor ambitieuze MKB bedrijven.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--brand-400)] hover:bg-[color:var(--brand-400)] hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Oplossingen */}
            <div className="animate-fadeInUp delay-100">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">
                Oplossingen
              </h4>
              <ul className="space-y-3">
                {footerLinks.oplossingen.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:text-[color:var(--cyan-400)] hover:translate-x-1"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:w-2 group-hover:bg-[color:var(--cyan-400)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bedrijf */}
            <div className="animate-fadeInUp delay-200">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">
                Bedrijf
              </h4>
              <ul className="space-y-3">
                {footerLinks.bedrijf.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:text-[color:var(--cyan-400)] hover:translate-x-1"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:w-2 group-hover:bg-[color:var(--cyan-400)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="animate-fadeInUp delay-300">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:text-[color:var(--cyan-400)] hover:translate-x-1"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:w-2 group-hover:bg-[color:var(--cyan-400)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="animate-fadeInUp delay-400">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/90">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:text-[color:var(--cyan-400)] hover:translate-x-1"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40 transition-all duration-300 group-hover:w-2 group-hover:bg-[color:var(--cyan-400)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 animate-fadeInUp">
            {trustBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.label}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 transition-all duration-300 hover:border-[color:var(--brand-400)] hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 text-[color:var(--cyan-400)] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-semibold text-white/70 transition-colors duration-300 group-hover:text-white">
                    {badge.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p className="animate-fadeInUp">
              © {new Date().getFullYear()} Caribbean Azure. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6 animate-fadeInUp delay-100">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-[color:var(--cyan-400)]"
              >
                Privacy
              </Link>
              <Link
                href="/voorwaarden"
                className="transition-colors duration-300 hover:text-[color:var(--cyan-400)]"
              >
                Voorwaarden
              </Link>
              <Link
                href="/cookies"
                className="transition-colors duration-300 hover:text-[color:var(--cyan-400)]"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[color:var(--brand-400)] to-transparent" />
    </footer>
  )
}
