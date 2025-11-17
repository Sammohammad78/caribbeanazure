'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, etc.)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[color:var(--bg)] to-[color:color-mix(in_oklab,var(--brand-soft)_15%,var(--bg)_85%)] px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--error)] to-[color:var(--error-strong)] text-white shadow-2xl">
            <AlertTriangle className="h-12 w-12" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[color:var(--fg)] md:text-5xl">
          Oeps, er ging iets mis
        </h1>

        <p className="mb-8 text-lg text-[color:var(--fg-muted)]">
          Er is een onverwachte fout opgetreden. Probeer de pagina opnieuw te laden of ga terug naar de homepage.
        </p>

        {/* Error details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 rounded-2xl border border-[color:var(--error)] bg-[color:color-mix(in_oklab,var(--error)_10%,transparent)] p-6 text-left">
            <p className="mb-2 font-mono text-sm text-[color:var(--error)]">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-xs text-[color:var(--fg-subtle)]">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="group min-w-[200px] bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-strong)]"
          >
            <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
            Probeer opnieuw
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Naar homepage
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <p className="mt-12 text-sm text-[color:var(--fg-subtle)]">
          Blijft het probleem bestaan?{' '}
          <Link href="/contact" className="font-semibold text-[color:var(--brand)] hover:underline">
            Neem contact met ons op
          </Link>
        </p>
      </div>
    </div>
  )
}
