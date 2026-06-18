import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Check } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { formatCurrency } from '../utils/formatCurrency'
import { useCart } from '../hooks/useCart'
import Spinner from '../components/ui/Spinner'

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

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
      <div className="aspect-square rounded-xl bg-gray-200" />
      <div className="flex flex-col gap-4 pt-2">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-8 w-20 rounded bg-gray-200" />
        <div className="space-y-2 mt-2">
          <div className="h-3 rounded bg-gray-200" />
          <div className="h-3 rounded bg-gray-200" />
          <div className="h-3 w-2/3 rounded bg-gray-200" />
        </div>
        <div className="h-12 rounded-md bg-gray-200 mt-4" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: products, isLoading } = useProducts()
  const { dispatch } = useCart()
  const [adding, setAdding] = useState<'idle' | 'loading' | 'done'>('idle')

  function handleAddToCart() {
    if (!product) return
    setAdding('loading')
    dispatch({ type: 'ADD_ITEM', payload: product })
    setTimeout(() => {
      setAdding('done')
      setTimeout(() => setAdding('idle'), 600)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-5 w-32 rounded bg-gray-200 animate-pulse mb-8" />
        <DetailSkeleton />
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
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E"
            }}
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
              onClick={handleAddToCart}
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
