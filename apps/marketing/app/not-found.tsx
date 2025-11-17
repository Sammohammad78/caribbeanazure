import { Compass, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[color:var(--bg)] to-[color:color-mix(in_oklab,var(--brand-soft)_15%,var(--bg)_85%)] px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-strong)] text-white shadow-2xl">
              <Compass className="h-16 w-16 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-amber)] text-white shadow-lg">
              <span className="text-xl font-bold">404</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[color:var(--fg)] md:text-5xl">
          Pagina niet gevonden
        </h1>

        <p className="mb-8 text-lg text-[color:var(--fg-muted)]">
          De pagina die je zoekt bestaat niet of is verplaatst. Controleer de URL of ga terug naar de homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group min-w-[200px] bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-strong)]"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Naar homepage
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]"
          >
            <Link href="/contact">
              <Search className="mr-2 h-4 w-4" />
              Contact opnemen
            </Link>
          </Button>
        </div>

        {/* Popular pages */}
        <div className="mt-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--fg-subtle)]">
            Populaire pagina's
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/oplossingen"
              className="rounded-lg border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition-all hover:border-[color:var(--brand)] hover:bg-[color:color-mix(in_oklab,var(--brand-soft)_20%,transparent)]"
            >
              Oplossingen
            </Link>
            <Link
              href="/over-ons"
              className="rounded-lg border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition-all hover:border-[color:var(--brand)] hover:bg-[color:color-mix(in_oklab,var(--brand-soft)_20%,transparent)]"
            >
              Over ons
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition-all hover:border-[color:var(--brand)] hover:bg-[color:color-mix(in_oklab,var(--brand-soft)_20%,transparent)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
