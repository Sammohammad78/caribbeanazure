import Link from 'next/link'
import { type ReactNode } from 'react'

interface SimpleButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: ReactNode
}

export function SimpleButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon
}: SimpleButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const classes = `${baseClass} ${className}`

  const content = (
    <>
      {children}
      {icon}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
