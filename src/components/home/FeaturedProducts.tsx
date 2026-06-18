import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../products/ProductCard'
import SkeletonCard from '../ui/SkeletonCard'

export default function FeaturedProducts() {
  const { data: products, isLoading } = useProducts()

  const featured = products
    ? [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)
    : []

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <Link
          to="/products"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
      </div>
    </section>
  )
}
