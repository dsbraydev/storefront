import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/products/ProductGrid'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function StorePage() {
  const { data: products, isLoading, isError } = useProducts()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-900">Something went wrong</p>
        <p className="mt-1 text-sm text-gray-500">
          Could not load products. Please try again later.
        </p>
      </div>
    )
  }

  return <ProductGrid products={products ?? []} />
}
