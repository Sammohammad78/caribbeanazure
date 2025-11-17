'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  HelpCircle,
  ChevronDown,
  Clock,
  Shield,
  Zap,
  DollarSign,
  Users,
  Code,
  Rocket,
  Lock
} from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
  icon: React.ComponentType<{ className?: string }>
  category: 'algemeen' | 'technisch' | 'prijzen' | 'veiligheid'
}

export function FAQPremium() {
  const t = useTranslations('faq')
  const [openItems, setOpenItems] = useState<number[]>([1]) // First item open by default
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'Hoe snel kan ik beginnen?',
      answer: 'Je kunt binnen 24 uur live gaan! Na aanmelding krijg je direct toegang tot ons platform. Ons onboarding team helpt je met de eerste setup, en binnen 72 uur is je eerste prototype klaar. Voor enterprise klanten bieden we een dedicated kickoff sessie aan.',
      icon: Rocket,
      category: 'algemeen'
    },
    {
      id: 2,
      question: 'Welke integraties worden ondersteund?',
      answer: 'We ondersteunen 1000+ integraties out-of-the-box, waaronder Slack, Microsoft Teams, Gmail, Outlook, Salesforce, HubSpot, Zapier, Make.com, en alle populaire cloud tools. Daarnaast bieden we REST API en webhooks voor custom integraties. Enterprise klanten krijgen ook custom connector development.',
      icon: Code,
      category: 'technisch'
    },
    {
      id: 3,
      question: 'Wat kost het en zijn er verborgen kosten?',
      answer: 'Onze prijzen zijn transparant vanaf €499/maand voor Starter, €1.299/maand voor Professional, en custom pricing voor Enterprise. Er zijn GEEN verborgen kosten, setup fees, of exit fees. Je betaalt alleen voor wat je gebruikt. Bij jaarlijkse betaling krijg je 10% korting.',
      icon: DollarSign,
      category: 'prijzen'
    },
    {
      id: 4,
      question: 'Is mijn data veilig?',
      answer: 'Absoluut! We gebruiken end-to-end encryptie (AES-256), ISO 27001 certificering, en GDPR compliance. Alle data wordt opgeslagen in Nederlandse datacenters. We hebben een 99.9% uptime SLA en dagelijkse backups. Enterprise klanten krijgen ook SSO, SAML, en on-premise deployment opties.',
      icon: Shield,
      category: 'veiligheid'
    },
    {
      id: 5,
      question: 'Hoeveel tijd bespaar ik echt?',
      answer: 'Onze klanten rapporteren gemiddeld 30-60% tijdwinst op repetitieve taken. Een typisch voorbeeld: een team van 10 personen bespaart 5 uur per week per persoon = 200 uur/maand = €13.000/maand aan arbeidskosten (bij €65/uur). De ROI is vaak binnen 3 maanden zichtbaar.',
      icon: Clock,
      category: 'algemeen'
    },
    {
      id: 6,
      question: 'Kan ik opzeggen wanneer ik wil?',
      answer: 'Ja, je kunt maandelijks opzeggen zonder opzegtermijn. We geloven in onze waarde en willen je niet vasthouden met lange contracten. Bij jaarcontracten krijg je wel 10% korting, maar ook daar geldt een faire exit clausule. Geen vendor lock-in!',
      icon: Users,
      category: 'prijzen'
    },
    {
      id: 7,
      question: 'Werkt het ook op mobiel?',
      answer: 'Ja! Ons platform is volledig responsive en werkt perfect op desktop, tablet, en mobiel. We hebben ook native apps voor iOS en Android in ontwikkeling (Q2 2025). Je kunt workflows monitoren, alerts ontvangen, en eenvoudige aanpassingen maken vanaf elke device.',
      icon: Zap,
      category: 'technisch'
    },
    {
      id: 8,
      question: 'Wat gebeurt er met mijn data als ik stop?',
      answer: 'Je behoudt altijd volledige controle over je data. Bij opzegging krijg je 30 dagen om al je data te exporteren via onze API of data export tool. We verwijderen daarna alle data permanent volgens GDPR richtlijnen. Je krijgt een certificaat van verwijdering.',
      icon: Lock,
      category: 'veiligheid'
    }
  ]

  const categories = [
    { id: 'all', label: 'Alles', count: faqs.length },
    { id: 'algemeen', label: 'Algemeen', count: faqs.filter(f => f.category === 'algemeen').length },
    { id: 'technisch', label: 'Technisch', count: faqs.filter(f => f.category === 'technisch').length },
    { id: 'prijzen', label: 'Prijzen', count: faqs.filter(f => f.category === 'prijzen').length },
    { id: 'veiligheid', label: 'Veiligheid', count: faqs.filter(f => f.category === 'veiligheid').length }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--bg)] via-[color:var(--brand-soft)]/5 to-[color:var(--bg)]" />

      {/* Floating gradient orb */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[color:var(--brand-600)] rounded-full blur-[120px] opacity-10 animate-float" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)]/20 px-4 py-2 mb-6">
            <HelpCircle className="h-4 w-4 text-[color:var(--brand)]" />
            <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]">
              Veelgestelde Vragen
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[color:var(--fg)] mb-6">
            Vragen?{' '}
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--cyan-600)] bg-clip-text text-transparent">
              We hebben antwoorden.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[color:var(--fg-muted)]">
            Alles wat je wilt weten over Caribbean Azure en onze automatiseringsoplossingen
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fadeInUp delay-100">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] text-white shadow-lg shadow-[color:var(--brand-600)]/30'
                  : 'border border-[color:var(--fg)]/20 bg-[color:var(--panel)]/50 text-[color:var(--fg-muted)] hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand-soft)]/20'
              }`}
            >
              <span className="flex items-center gap-2">
                {category.label}
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[color:var(--fg)]/10 text-[color:var(--fg-subtle)]'
                  }`}
                >
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl space-y-4">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={index}
              isOpen={openItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fadeInUp delay-300">
          <div className="rounded-3xl border border-[color:var(--brand)]/20 bg-gradient-to-br from-[color:var(--brand-soft)]/20 to-transparent p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-[color:var(--fg)] mb-4">
              Nog vragen? We helpen je graag!
            </h3>
            <p className="text-[color:var(--fg-muted)] mb-6 max-w-2xl mx-auto">
              Ons team staat klaar om al je vragen te beantwoorden. Plan een gratis 30-minuten gesprek of stuur ons een bericht.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[color:var(--brand-600)]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--brand-600)]/50"
              >
                <Zap className="h-5 w-5" />
                Plan een gesprek
              </a>
              <a
                href="mailto:info@caribbeanazure.com"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[color:var(--brand)] bg-transparent px-8 py-4 text-lg font-bold text-[color:var(--brand)] transition-all duration-300 hover:bg-[color:var(--brand)] hover:text-white hover:scale-105"
              >
                Stuur een email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  faq: FAQ
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const Icon = faq.icon

  return (
    <div
      className="group animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`relative rounded-2xl border transition-all duration-300 ${
          isOpen
            ? 'border-[color:var(--brand)]/30 bg-gradient-to-br from-[color:var(--brand-soft)]/20 to-transparent shadow-lg shadow-[color:var(--brand)]/10'
            : 'border-[color:var(--fg)]/10 bg-[color:var(--panel)]/50 hover:border-[color:var(--brand)]/20 hover:bg-[color:var(--brand-soft)]/10'
        }`}
      >
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="w-full p-6 text-left transition-all duration-300"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`flex-shrink-0 rounded-xl p-3 transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--cyan-600)] shadow-lg'
                  : 'bg-[color:var(--brand-soft)]/30'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-colors duration-300 ${
                  isOpen ? 'text-white' : 'text-[color:var(--brand)]'
                }`}
              />
            </div>

            {/* Question Text */}
            <div className="flex-1 pr-8">
              <h3
                className={`text-lg font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[color:var(--brand)]' : 'text-[color:var(--fg)]'
                }`}
              >
                {faq.question}
              </h3>
            </div>

            {/* Chevron */}
            <div className="flex-shrink-0">
              <ChevronDown
                className={`h-6 w-6 text-[color:var(--brand)] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </button>

        {/* Answer */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 pl-[76px]">
            <p className="text-[color:var(--fg-muted)] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>

        {/* Gradient accent line */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] animate-slideInLeft" />
        )}
      </div>
    </div>
  )
}
