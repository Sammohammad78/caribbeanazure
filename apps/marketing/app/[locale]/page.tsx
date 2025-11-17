import { Header } from '@/components/layout/header'
import { FooterPremium } from '@/components/layout/footer-premium'
import { HeroPremium } from '@/components/sections/hero-premium'
import { TrustStrip } from '@/components/sections/trust-strip'
import { StatsPremium } from '@/components/sections/stats-premium'
import { FeaturesPremium } from '@/components/sections/features-premium'
import { ROICalculatorSection } from '@/components/sections/roi-calculator'
import { TestimonialsPremium } from '@/components/sections/testimonials-premium'
import { PricingPremium } from '@/components/sections/pricing-premium'
import { FAQPremium } from '@/components/sections/faq-premium'
import { CTASection } from '@/components/sections/cta-section'
import {
  OrganizationSchema,
  ServiceSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from '@/components/seo/structured-data'

export default function HomePage() {
  return (
    <>
      {/* Schema.org structured data for SEO */}
      <OrganizationSchema />
      <ServiceSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />

      <div className="relative min-h-screen">
        <Header />
        <main id="main-content">
          {/* Premium Hero with 3D effects */}
          <HeroPremium />

          {/* Trust indicators */}
          <TrustStrip variant="default" className="py-12 bg-[color:var(--bg)]" />

          {/* Animated statistics */}
          <StatsPremium />

          {/* Interactive features grid */}
          <FeaturesPremium />

          {/* ROI Calculator */}
          <ROICalculatorSection />

          {/* Social proof - testimonials */}
          <TestimonialsPremium />

          {/* Pricing options */}
          <PricingPremium />

          {/* FAQ accordion */}
          <FAQPremium />

          {/* Final CTA */}
          <CTASection />
        </main>

        {/* Premium footer */}
        <FooterPremium />
      </div>
    </>
  )
}
