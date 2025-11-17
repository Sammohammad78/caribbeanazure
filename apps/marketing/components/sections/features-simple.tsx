'use client'

import { SimpleSection, SectionHeader } from '@/components/ui/simple-section'
import { SimpleCard, CardTitle, CardDescription } from '@/components/ui/simple-card'
import { Workflow, Zap, BarChart3, Shield, Code2, Boxes } from 'lucide-react'

const features = [
  {
    icon: Workflow,
    title: 'Procesautomatisering',
    description: 'Automatiseer repetitieve taken en workflows. Bespaar tot 60% tijd op dagelijkse operaties.'
  },
  {
    icon: Zap,
    title: 'Snelle Implementatie',
    description: 'Van prototype naar productie in 72 uur. Geen maanden wachten, maar direct resultaat.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Krijg direct inzicht in je KPIs met dashboards die automatisch bijwerken.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level beveiliging met end-to-end encryptie en ISO 27001 certificering.'
  },
  {
    icon: Code2,
    title: 'API-First Platform',
    description: 'Integreer met elke tool via REST API, webhooks of pre-built connectoren.'
  },
  {
    icon: Boxes,
    title: 'Modulair & Flexibel',
    description: 'Kies alleen wat je nodig hebt. Schaal mee met je groei zonder vendor lock-in.'
  }
]

export function FeaturesSimple() {
  return (
    <SimpleSection background="subtle">
      <SectionHeader
        badge={{ icon: <Zap className="h-4 w-4" />, text: 'Features' }}
        title="Alles wat je nodig hebt"
        description="Premium automatiseringstools gebouwd voor moderne bedrijven"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <SimpleCard key={feature.title}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--brand)] text-white">
                <Icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </SimpleCard>
          )
        })}
      </div>
    </SimpleSection>
  )
}
