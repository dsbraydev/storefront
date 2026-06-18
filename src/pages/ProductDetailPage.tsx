import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Check } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { formatCurrency } from '../utils/formatCurrency'
import { useAddToCart } from '../hooks/useAddToCart'
import Spinner from '../components/ui/Spinner'
import DetailSkeleton from '../components/ui/DetailSkeleton'
import { handleImageError } from '../utils/imageFallback'

function RatingStars({ rate, count }: { rate: number; count: number }) {
  const filled = Math.round(rate)
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">{rate} ({count} reviews)</span>
    </div>
  )
}


export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: products, isLoading } = useProducts()
  const { adding, addToCart } = useAddToCart()

  if (isLoading) return <DetailSkeleton />

  if (!id || isNaN(Number(id))) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-900">Product not found</p>
        <p className="mt-1 text-sm text-gray-500">This product may no longer be available.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    )
  }

  const product = products?.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-900">Product not found</p>
        <p className="mt-1 text-sm text-gray-500">This product may no longer be available.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-8 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
            onError={handleImageError}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
          <span className="text-3xl font-extrabold text-gray-900">
            {formatCurrency(product.price)}
          </span>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-auto">
            <button
              onClick={() => product && addToCart(product)}
              disabled={adding !== 'idle'}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors disabled:opacity-80 text-base"
            >
              {adding === 'loading' && <Spinner />}
              {adding === 'done' && <Check className="h-5 w-5" />}
              {adding === 'loading' ? 'Adding…' : adding === 'done' ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
