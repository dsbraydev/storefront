import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface EmptyStateAction {
  label: string
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'text'
}

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: EmptyStateAction
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {icon}
      <h2 className="mt-4 text-xl font-bold text-white">{title}</h2>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
      {action && action.to && (
        <Link
          to={action.to}
          className="mt-6 bg-violet-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-violet-700 transition-colors"
        >
          {action.label}
        </Link>
      )}
      {action && action.onClick && (
        <button
          onClick={action.onClick}
          className={action.variant === 'text'
            ? 'mt-4 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors'
            : 'mt-6 bg-violet-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-violet-700 transition-colors'
          }
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
