import { memo, useState } from 'react'
import { Check } from 'lucide-react'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../hooks/useCart'
import Spinner from '../ui/Spinner'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { dispatch } = useCart()
  const [adding, setAdding] = useState<'idle' | 'loading' | 'done'>('idle')

  function handleAddToCart() {
    setAdding('loading')
    dispatch({ type: 'ADD_ITEM', payload: product })
    setTimeout(() => {
      setAdding('done')
      setTimeout(() => setAdding('idle'), 600)
    }, 500)
  }

  return (
    <div
      className="animate-fade-in bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="aspect-square p-6 flex items-center justify-center bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E"
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={adding !== 'idle'}
            className="inline-flex items-center justify-center gap-1.5 min-w-[108px] bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors disabled:opacity-80"
          >
            {adding === 'loading' && <Spinner />}
            {adding === 'done' && <Check className="h-4 w-4" />}
            {adding === 'loading' ? 'Adding…' : adding === 'done' ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
