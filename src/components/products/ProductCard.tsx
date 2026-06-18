import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'
import { useAddToCart } from '../../hooks/useAddToCart'
import { useCart } from '../../hooks/useCart'
import Spinner from '../ui/Spinner'
import { handleImageError } from '../../utils/imageFallback'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { adding, addToCart } = useAddToCart()
  const { items } = useCart()
  const cartQty = items.find(i => i.product.id === product.id)?.quantity ?? 0

  return (
    <div
      className="group animate-fade-in bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative aspect-square p-6 flex items-center justify-center bg-gray-800">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
          onError={handleImageError}
        />
        {cartQty > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-violet-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            <ShoppingCart className="h-3 w-3" />
            <span>{cartQty}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug flex-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-white">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-gray-300">{product.rating.rate}</span>
            <span className="text-xs text-gray-500">({product.rating.count})</span>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Link
            to={`/products/${product.id}`}
            state={{ product }}
            className="flex-1 text-center text-sm font-medium px-3 py-1.5 rounded-md border border-gray-700 text-gray-300 hover:border-violet-500 hover:text-violet-500 transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => addToCart(product)}
            disabled={adding !== 'idle'}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-violet-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors disabled:opacity-80"
          >
            {adding === 'loading' ? <Spinner /> : adding === 'done' ? <Check className="h-4 w-4" /> : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
