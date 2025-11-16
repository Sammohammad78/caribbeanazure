import { cn } from "@/lib/utils"

interface TrustStripProps {
  variant?: "default" | "compact"
  className?: string
}

export function TrustStrip({ variant = "default", className }: TrustStripProps) {
  return (
    <section className={cn("py-8", className)}>
      <div className="container-custom">
        <p className="text-center text-sm text-[color:var(--fg-muted)]">
          Vertrouwd door 50+ MKB bedrijven
        </p>
      </div>
    </section>
  )
}
