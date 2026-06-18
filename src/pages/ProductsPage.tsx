import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useProducts, useCategories } from '../hooks/useProducts'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import ProductGrid from '../components/products/ProductGrid'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts()
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useCategories()

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') ?? 'all'

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(categoryParam)

  // Sync activeCategory when the URL param changes (e.g. clicking category cards)
  useEffect(() => {
    setActiveCategory(categoryParam)
  }, [categoryParam])

  function handleCategoryClick(category: string) {
    setActiveCategory(category)
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const filtered = useFilteredProducts(products, search, activeCategory)

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
        <p className="mt-1 text-sm text-gray-500">Could not load products. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <p className="text-sm text-gray-500 mt-1">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          {search || activeCategory !== 'all' ? ' found' : ''}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Category filters */}
      {categoriesError && (
        <p className="text-sm text-amber-600">Could not load category filters.</p>
      )}
      {categoriesLoading && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}
      {!categoriesError && !categoriesLoading && categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick('all')}
            aria-current={activeCategory === 'all' ? 'true' : undefined}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              aria-current={activeCategory === category ? 'true' : undefined}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-lg font-semibold text-gray-900">No products found</p>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
          <button
            onClick={() => {
              setSearch('')
              handleCategoryClick('all')
            }}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  )
}
