import { Header } from '@/components/layout/header'
import { FooterModern } from '@/components/layout/footer-modern'
import { Rocket, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Configurator | Caribbean Azure',
  description: 'Bouw je eigen automatiseringsoplossing in minuten'
}

export default function ConfiguratorPage() {
  return (
    <div className="relative min-h-screen bg-[color:var(--bg-primary)]">
      <Header />
      <main id="main-content">
        <section className="section-modern grid-bg">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="badge-modern badge-accent mb-8 inline-flex">
                <Rocket className="h-3 w-3" />
                <span>Configurator</span>
              </div>

              {/* Heading */}
              <h1 className="mb-6">
                Bouw je eigen{' '}
                <span className="text-gradient">automatiseringsoplossing</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-[color:var(--text-secondary)] mb-12 max-w-2xl mx-auto">
                Onze interactieve configurator helpt je om in minuten een op maat gemaakte
                automatiseringsoplossing te bouwen. Geen technische kennis vereist.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  'Visuele workflow editor',
                  'Real-time preview',
                  'Directe kostenschatting'
                ].map((feature) => (
                  <div key={feature} className="card-modern text-left">
                    <CheckCircle2 className="h-5 w-5 text-[color:var(--accent-primary)] mb-2" />
                    <p className="text-sm text-[color:var(--text-secondary)]">{feature}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="border-gradient p-12">
                <h3 className="text-2xl font-bold mb-4">De configurator is binnenkort beschikbaar</h3>
                <p className="text-[color:var(--text-secondary)] mb-8">
                  We werken hard aan de lancering van onze interactieve configurator.
                  Meld je aan voor early access of plan een gesprek met een expert.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact?interest=configurator" className="btn-primary glow-accent">
                    Aanmelden voor early access
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="btn-modern">
                    Plan een gesprek
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterModern />
    </div>
  )
}
