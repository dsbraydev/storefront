import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'
import { useAddToCart } from '../../hooks/useAddToCart'
import Spinner from '../ui/Spinner'
import { handleImageError } from '../../utils/imageFallback'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { adding, addToCart } = useAddToCart()

  return (
    <div
      className="group animate-fade-in bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="aspect-square p-6 flex items-center justify-center bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
          onError={handleImageError}
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug flex-1">
          {product.title}
        </h3>
        <span className="text-lg font-bold text-gray-900 mt-1">
          {formatCurrency(product.price)}
        </span>
        <div className="flex gap-2 pt-1">
          <Link
            to={`/products/${product.id}`}
            state={{ product }}
            className="flex-1 text-center text-sm font-medium px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => addToCart(product)}
            disabled={adding !== 'idle'}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors disabled:opacity-80"
          >
            {adding === 'loading' && <Spinner />}
            {adding === 'done' && <Check className="h-4 w-4" />}
            {adding === 'loading' ? 'Adding…' : adding === 'done' ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
