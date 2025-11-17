import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Scale, AlertCircle } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-[color:var(--bg)] to-[color:color-mix(in_oklab,var(--brand-soft)_15%,var(--bg)_85%)]">
        <Header />
        <main id="main-content">
          <Container size="default">
            {/* Header */}
            <section className="pb-8 pt-32">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-strong)] text-white shadow-lg">
                    <Scale className="h-8 w-8" />
                  </div>
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-[color:var(--fg)] md:text-5xl">
                  {t('title')}
                </h1>
                <p className="text-lg text-[color:var(--fg-muted)]">
                  {t('subtitle')}
                </p>
              </div>
            </section>

            {/* Content */}
            <section className="pb-24">
              <div className="mx-auto max-w-4xl space-y-8">
                {/* Section 1: Algemeen */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        1. Algemene Bepalingen
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen,
                      offertes en overeenkomsten tussen Caribbean Azure en de opdrachtgever.
                    </p>
                    <p className="text-[color:var(--fg-muted)]">
                      Afwijkingen van deze voorwaarden zijn slechts geldig indien en voor zover
                      deze uitdrukkelijk schriftelijk zijn overeengekomen.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 2: Offertes en Opdrachten */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        2. Offertes en Opdrachten
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Alle offertes zijn vrijblijvend en geldig voor 30 dagen, tenzij anders vermeld.
                    </p>
                    <p className="text-[color:var(--fg-muted)]">
                      Een overeenkomst komt tot stand op het moment dat de opdrachtgever de
                      offerte schriftelijk of digitaal heeft geaccepteerd.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 3: Uitvoering */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        3. Uitvoering van de Opdracht
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Caribbean Azure zal de opdracht naar beste inzicht en vermogen uitvoeren,
                      met inachtneming van de eisen van goed vakmanschap.
                    </p>
                    <p className="text-[color:var(--fg-muted)]">
                      Opgegeven termijnen zijn indicatief en gelden nimmer als fatale termijnen,
                      tenzij uitdrukkelijk anders is overeengekomen.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 4: Betaling */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        4. Betaling
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij
                      schriftelijk anders is overeengekomen.
                    </p>
                    <p className="text-[color:var(--fg-muted)]">
                      Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim
                      en is Caribbean Azure gerechtigd de wettelijke rente in rekening te brengen.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 5: Aansprakelijkheid */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        5. Aansprakelijkheid
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Caribbean Azure is niet aansprakelijk voor schade die voortvloeit uit
                      onjuiste of onvolledige informatie verstrekt door de opdrachtgever.
                    </p>
                    <p className="text-[color:var(--fg-muted)]">
                      De aansprakelijkheid is beperkt tot het bedrag dat in het desbetreffende
                      geval door de aansprakelijkheidsverzekering wordt uitbetaald.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 6: Contact */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-[color:var(--fg)]">
                        Contact
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[color:var(--fg-muted)]">
                      Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
                    </p>
                    <div className="space-y-2">
                      <p className="text-[color:var(--fg-muted)]">
                        <strong className="text-[color:var(--fg)]">Email:</strong> info@caribbeanazure.com
                      </p>
                      <p className="text-[color:var(--fg-muted)]">
                        <strong className="text-[color:var(--fg)]">Telefoon:</strong> +31 6 87879092
                      </p>
                    </div>
                    <p className="mt-6 text-sm text-[color:var(--fg-subtle)]">
                      Laatste update: November 2025
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  )
}
