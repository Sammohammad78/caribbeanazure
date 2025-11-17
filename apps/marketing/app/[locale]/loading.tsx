import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[color:var(--bg)] to-[color:color-mix(in_oklab,var(--brand-soft)_15%,var(--bg)_85%)]">
      <div className="text-center">
        {/* Animated loader */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="h-24 w-24 animate-spin rounded-full border-4 border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] border-t-[color:var(--brand)]" />
            {/* Inner icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand)]" style={{ animationDirection: 'reverse' }} />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-lg font-semibold text-[color:var(--fg)]">
          Even geduld...
        </p>
        <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
          Pagina wordt geladen
        </p>

        {/* Animated dots */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--brand)]" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--brand)]" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--brand)]" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
