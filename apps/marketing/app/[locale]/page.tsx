import { Header } from '@/components/layout/header'
import { FooterSimple } from '@/components/layout/footer-simple'
import { HeroSimple } from '@/components/sections/hero-simple'
import { FeaturesSimple } from '@/components/sections/features-simple'
import { ROICalculatorSection } from '@/components/sections/roi-calculator'
import { CTASimple } from '@/components/sections/cta-simple'
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
          {/* Simple, clean hero */}
          <HeroSimple />

          {/* Features grid - consistent design */}
          <FeaturesSimple />

          {/* ROI Calculator - white background */}
          <ROICalculatorSection />

          {/* CTA section - brand background */}
          <CTASimple />
        </main>

        {/* Simple footer */}
        <FooterSimple />
      </div>
    </>
  )
}
