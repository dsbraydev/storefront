import type { ReactNode } from 'react'

export default function SlideText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        {children}
      </span>
    </span>
  )
}
