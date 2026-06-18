import { memo } from 'react'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

interface ProductCardProps {
  product: Product
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square p-6 flex items-center justify-center bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain"
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
          <button className="bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
