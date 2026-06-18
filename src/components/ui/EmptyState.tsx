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
      <h2 className="mt-4 text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && action.to && (
        <Link
          to={action.to}
          className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {action.label}
        </Link>
      )}
      {action && action.onClick && (
        <button
          onClick={action.onClick}
          className={action.variant === 'text'
            ? 'mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors'
            : 'mt-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors'
          }
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
