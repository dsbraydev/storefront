import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
          Storefront
        </Link>
        <Link
          to="/cart"
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={`Cart (${totalItems} items)`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span
              key={totalItems}
              className="animate-scale-pop absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
