import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useProducts, useCategories } from '../hooks/useProducts'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import ProductGrid from '../components/products/ProductGrid'
import ProductGridSkeleton from '../components/ui/ProductGridSkeleton'
import EmptyState from '../components/ui/EmptyState'
import CategoryFilterButton from '../components/products/CategoryFilterButton'

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

  if (isLoading) return <ProductGridSkeleton />

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-white">Something went wrong</p>
        <p className="mt-1 text-sm text-gray-400">Could not load products. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">All Products</h1>
        <p className="text-sm text-gray-400 mt-1">
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
          className="w-full rounded-md bg-gray-900 border border-gray-700 pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>

      {/* Category filters */}
      {categoriesError && (
        <p className="text-sm text-amber-600">Could not load category filters.</p>
      )}
      {categoriesLoading && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-gray-800 animate-pulse" />
          ))}
        </div>
      )}
      {!categoriesError && !categoriesLoading && categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <CategoryFilterButton
            label="All"
            isActive={activeCategory === 'all'}
            onClick={() => handleCategoryClick('all')}
          />
          {categories.map((category) => (
            <CategoryFilterButton
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-12 w-12 text-gray-300" />}
          title="No products found"
          description="Try adjusting your search or filter."
          action={{
            label: 'Clear filters',
            onClick: () => { setSearch(''); handleCategoryClick('all') },
            variant: 'text',
          }}
        />
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  )
}
