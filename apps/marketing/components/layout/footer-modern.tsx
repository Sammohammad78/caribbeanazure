'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Mail, ArrowUpRight } from 'lucide-react'

export function FooterModern() {
  const locale = useLocale()

  const buildHref = (slug: string) => {
    const path = slug ? `/${slug}` : '/'
    return locale === 'nl' ? path : `/en${path}`
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-[color:var(--bg-primary)]">
      <div className="container-modern py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href={buildHref('')} className="inline-block mb-4">
              <div className="text-2xl font-bold text-gradient">
                Caribbean Azure
              </div>
            </Link>
            <p className="text-sm text-[color:var(--text-secondary)] mb-6 max-w-sm">
              Automatiseer je bedrijf. Schaal zonder grenzen.
              Enterprise automatisering voor moderne bedrijven.
            </p>
            <a
              href="mailto:info@caribbeanazure.com"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--accent-primary)] hover:underline"
            >
              <Mail className="h-4 w-4" />
              info@caribbeanazure.com
            </a>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={buildHref('oplossingen')}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Oplossingen
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/configurator"
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Configurator
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={buildHref('over-ons')}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Over ons
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href={buildHref('contact')}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Contact
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={buildHref('privacy')}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Privacy
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href={buildHref('voorwaarden')}
                  className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors inline-flex items-center gap-1 group"
                >
                  Voorwaarden
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)] mb-4">
              Status
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--success)]/10 border border-[color:var(--success)]/20">
              <div className="h-2 w-2 rounded-full bg-[color:var(--success)] animate-pulse"></div>
              <span className="text-xs font-medium text-[color:var(--success)]">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[color:var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[color:var(--text-tertiary)]">
            © {currentYear} Caribbean Azure. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-[color:var(--text-tertiary)]">
            <span>Built with</span>
            <span className="text-[color:var(--accent-primary)]">▲</span>
            <span>Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
