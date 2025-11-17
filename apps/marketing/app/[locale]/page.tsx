import { Header } from '@/components/layout/header'
import { FooterModern } from '@/components/layout/footer-modern'
import { HeroModern } from '@/components/sections/hero-modern'
import { FeaturesModern } from '@/components/sections/features-modern'
import { CTAModern } from '@/components/sections/cta-modern'
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

      <div className="relative min-h-screen bg-[color:var(--bg-primary)]">
        <Header />
        <main id="main-content">
          {/* Ultra-modern hero with grid background */}
          <HeroModern />

          {/* Modern features grid */}
          <FeaturesModern />

          {/* CTA with gradient border */}
          <CTAModern />
        </main>

        {/* Modern footer */}
        <FooterModern />
      </div>
    </>
  )
}
