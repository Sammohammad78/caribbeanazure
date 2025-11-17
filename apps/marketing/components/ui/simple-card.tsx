import { type ReactNode } from 'react'

interface SimpleCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function SimpleCard({ children, className = '', hover = true }: SimpleCardProps) {
  return (
    <div className={`card-simple ${hover ? 'hover:shadow-md' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-2xl font-semibold text-[color:var(--text)] mb-3 ${className}`}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-base text-[color:var(--text-muted)] ${className}`}>
      {children}
    </p>
  )
}
