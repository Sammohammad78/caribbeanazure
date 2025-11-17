import { type ReactNode } from 'react'

interface SimpleSectionProps {
  children: ReactNode
  background?: 'white' | 'subtle'
  className?: string
}

export function SimpleSection({
  children,
  background = 'white',
  className = ''
}: SimpleSectionProps) {
  const bgClass = background === 'subtle' ? 'bg-subtle' : 'bg-white'

  return (
    <section className={`section-padding ${bgClass} ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  badge?: {
    icon?: ReactNode
    text: string
  }
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className = ''
}: SectionHeaderProps) {
  const alignClass = centered ? 'text-center mx-auto' : ''

  return (
    <div className={`mb-12 max-w-3xl ${alignClass} ${className}`}>
      {badge && (
        <div className="badge mb-4">
          {badge.icon}
          <span>{badge.text}</span>
        </div>
      )}

      <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--text)] mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-[color:var(--text-muted)]">
          {description}
        </p>
      )}
    </div>
  )
}
