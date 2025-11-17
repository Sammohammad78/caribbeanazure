'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Mail } from 'lucide-react'

export function FooterSimple() {
  const locale = useLocale()

  const buildHref = (slug: string) => {
    const path = slug ? `/${slug}` : '/'
    return locale === 'nl' ? path : `/en${path}`
  }

  const footerLinks = {
    company: [
      { label: 'Over ons', href: buildHref('over-ons') },
      { label: 'Contact', href: buildHref('contact') }
    ],
    solutions: [
      { label: 'Oplossingen', href: buildHref('oplossingen') },
      { label: 'Configurator', href: '/configurator' }
    ],
    legal: [
      { label: 'Privacy', href: buildHref('privacy') },
      { label: 'Voorwaarden', href: buildHref('voorwaarden') }
    ]
  }

  return (
    <footer className="bg-subtle border-t border-[color:var(--border)]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href={buildHref('')} className="inline-block mb-4">
              <div className="text-2xl font-black text-[color:var(--brand)]">
                Caribbean Azure
              </div>
            </Link>
            <p className="text-sm text-[color:var(--text-muted)] mb-4">
              Automatiseer je werk. Versnel je groei.
            </p>
            <a
              href="mailto:info@caribbeanazure.com"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--brand)] hover:underline"
            >
              <Mail className="h-4 w-4" />
              info@caribbeanazure.com
            </a>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--text)] mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--brand)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--text)] mb-4">
              Oplossingen
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--brand)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--text)] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--brand)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[color:var(--border)]">
          <p className="text-sm text-[color:var(--text-muted)] text-center">
            © {new Date().getFullYear()} Caribbean Azure. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  )
}
