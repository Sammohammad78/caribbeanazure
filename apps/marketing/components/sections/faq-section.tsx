'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="group rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_50%,transparent)] backdrop-blur-xl transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-lg">
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-6 text-left transition-colors duration-200"
        aria-expanded={isOpen}
      >
        {/* Icon */}
        <div className="mt-1 flex-shrink-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen
                ? 'bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] text-white shadow-lg'
                : 'bg-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] text-[color:var(--fg-subtle)] group-hover:bg-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] group-hover:text-[color:var(--brand)]'
            }`}
          >
            <HelpCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Question Text */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[color:var(--fg)] transition-colors duration-200 group-hover:text-[color:var(--brand)]">
            {question}
          </h3>
        </div>

        {/* Chevron */}
        <div className="mt-1 flex-shrink-0">
          <ChevronDown
            className={`h-5 w-5 text-[color:var(--fg-subtle)] transition-all duration-300 ${
              isOpen ? 'rotate-180 text-[color:var(--brand)]' : 'group-hover:text-[color:var(--brand)]'
            }`}
          />
        </div>
      </button>

      {/* Answer Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] px-6 pb-6 pt-4">
            {/* Answer with left accent */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-[color:var(--brand)] to-[color:var(--accent)]" />
              <p className="text-base leading-relaxed text-[color:var(--fg-subtle)]">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  // Get all FAQ questions
  const faqItems = [0, 1, 2, 3, 4].map((index) => {
    try {
      return {
        question: t(`questions.${index}.q`),
        answer: t(`questions.${index}.a`),
      }
    } catch {
      return null
    }
  }).filter(Boolean) as Array<{ question: string; answer: string }>

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-[color:var(--fg-subtle)] md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[color:var(--fg-subtle)]">
            Still have questions?{' '}
            <a
              href="#contact"
              className="font-semibold text-[color:var(--brand)] underline decoration-[color:var(--accent)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--accent)]"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
