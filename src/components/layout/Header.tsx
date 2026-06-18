import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartIcon from '../ui/CartIcon'

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
          <CartIcon />
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
