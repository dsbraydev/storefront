import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { formatCurrency } from '../utils/formatCurrency'
import { useAddToCart } from '../hooks/useAddToCart'
import Spinner from '../components/ui/Spinner'
import DetailSkeleton from '../components/ui/DetailSkeleton'
import RatingStars from '../components/ui/RatingStars'
import { handleImageError } from '../utils/imageFallback'


const notFound = (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <p className="text-lg font-semibold text-white">Product not found</p>
    <p className="mt-1 text-sm text-gray-400">This product may no longer be available.</p>
    <Link
      to="/products"
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Products
    </Link>
  </div>
)

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: products, isLoading } = useProducts()
  const { adding, addToCart } = useAddToCart()

  if (isLoading) return <DetailSkeleton />
  if (!id || isNaN(Number(id))) return notFound

  const product = products?.find((p) => p.id === Number(id))
  if (!product) return notFound

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center p-8 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
            onError={handleImageError}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-white leading-snug">
            {product.title}
          </h1>
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
          <span className="text-3xl font-extrabold text-white">
            {formatCurrency(product.price)}
          </span>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-800 pt-4 mt-auto">
            <button
              onClick={() => product && addToCart(product)}
              disabled={adding !== 'idle'}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all disabled:opacity-80 text-base"
            >
              {adding === 'loading' ? <Spinner className="h-5 w-5" /> : adding === 'done' ? <Check className="h-5 w-5" /> : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
