// Simplified Outcomes Strip
export function OutcomesStrip() {
  return (
    <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
      <div className="container-custom">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-[color:var(--brand)]">-60%</div>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">Minder tijd aan handmatig werk</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[color:var(--brand)]">+30%</div>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">Meer capaciteit</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[color:var(--brand)]">72u</div>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">Tot werkend prototype</p>
          </div>
        </div>
      </div>
    </section>
  )
}
