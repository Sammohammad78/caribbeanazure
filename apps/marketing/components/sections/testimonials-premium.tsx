'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
}

export function TestimonialsPremium() {
  const t = useTranslations('testimonials')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Sample testimonials (replace with actual data)
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Jan Bakker',
      role: 'CEO',
      company: 'TechStart BV',
      content: 'Caribbean Azure heeft ons geholpen om 40% tijd te besparen op repetitieve taken. De ROI was binnen 3 maanden zichtbaar.',
      rating: 5
    },
    {
      id: 2,
      name: 'Maria de Vries',
      role: 'Operations Manager',
      company: 'LogiFlow',
      content: 'Fantastische service en expertise. Het team snapt echt wat MKB bedrijven nodig hebben om te groeien.',
      rating: 5
    },
    {
      id: 3,
      name: 'Peter Jansen',
      role: 'Founder',
      company: 'GrowthLab',
      content: 'Van prototype naar productie in 72 uur. Onvoorstelbaar snel en van hoge kwaliteit. Echt een game-changer!',
      rating: 5
    },
    {
      id: 4,
      name: 'Sophie Vermeer',
      role: 'CTO',
      company: 'DataCo',
      content: 'De automatiserings die we hebben geïmplementeerd hebben onze workflow volledig getransformeerd. Aanrader!',
      rating: 5
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--brand-soft)]/10 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)]/20 px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-[color:var(--amber-500)] fill-[color:var(--amber-500)]" />
            <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]">
              Wat klanten zeggen
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[color:var(--fg)] mb-6">
            Meer dan <span className="bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--cyan-600)] bg-clip-text text-transparent">50+ bedrijven</span> gaan ons voor
          </h2>

          <p className="text-lg md:text-xl text-[color:var(--fg-muted)]">
            Ontdek hoe MKB bedrijven hun workflow transformeren met onze automatiserings
          </p>
        </div>

        {/* Testimonials Slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Testimonial Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[color:var(--brand)]/20 via-[color:var(--cyan-600)]/20 to-[color:var(--purple-600)]/20 blur-2xl opacity-50" />

            {/* Card */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 md:p-12 lg:p-16 shadow-2xl">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="h-32 w-32 text-[color:var(--brand)]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-[color:var(--amber-500)] fill-[color:var(--amber-500)] animate-[scale-in_0.3s_ease-out]"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-[color:var(--fg)] leading-relaxed mb-8 animate-fadeInUp">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 animate-fadeInUp delay-100">
                  {/* Avatar */}
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--cyan-600)] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>

                  {/* Details */}
                  <div>
                    <div className="text-xl font-bold text-[color:var(--fg)]">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-sm text-[color:var(--fg-muted)]">
                      {testimonials[activeIndex].role} • {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-4 md:-left-20 md:-right-20">
            <button
              onClick={goToPrevious}
              className="group h-14 w-14 rounded-full border-2 border-[color:var(--brand)]/20 bg-white/5 backdrop-blur-xl flex items-center justify-center hover:bg-[color:var(--brand)] hover:border-[color:var(--brand)] transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-6 w-6 text-[color:var(--brand)] group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={goToNext}
              className="group h-14 w-14 rounded-full border-2 border-[color:var(--brand)]/20 bg-white/5 backdrop-blur-xl flex items-center justify-center hover:bg-[color:var(--brand)] hover:border-[color:var(--brand)] transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-6 w-6 text-[color:var(--brand)] group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-12 bg-[color:var(--brand)]'
                    : 'w-2 bg-[color:var(--fg-muted)]/30 hover:bg-[color:var(--brand)]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[color:var(--fg-muted)]">
            <div className={`h-2 w-2 rounded-full ${isPaused ? 'bg-[color:var(--fg-muted)]' : 'bg-[color:var(--brand)] animate-pulse'}`} />
            <span>{isPaused ? 'Paused' : 'Auto-playing'}</span>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-60">
          <div className="text-sm font-medium text-[color:var(--fg-muted)]">
            VERTROUWD DOOR:
          </div>
          {['TechStart', 'LogiFlow', 'GrowthLab', 'DataCo', 'InnoVent'].map((company) => (
            <div
              key={company}
              className="text-xl font-bold text-[color:var(--fg-muted)] hover:text-[color:var(--brand)] transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
