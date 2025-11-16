import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold">Klaar om te starten?</h2>
        <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
          Plan een gratis intake gesprek
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/contact">
            Plan een intake
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
