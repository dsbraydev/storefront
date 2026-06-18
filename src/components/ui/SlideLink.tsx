import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface SlideLinkProps {
  to: string
  children: ReactNode
  className?: string
}

export default function SlideLink({ to, children, className = '' }: SlideLinkProps) {
  return (
    <Link to={to} className={`group relative inline-flex overflow-hidden ${className}`}>
      <span className="flex items-center gap-1 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      <span aria-hidden className="absolute inset-0 flex items-center gap-1 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        {children}
      </span>
    </Link>
  )
}
