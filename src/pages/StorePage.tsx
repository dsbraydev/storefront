import { useState, useMemo } from 'react'
import { useProducts, useCategories } from '../hooks/useProducts'
import ProductGrid from '../components/products/ProductGrid'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function StorePage() {
  const { data: products, isLoading, isError } = useProducts()
  const { data: categories } = useCategories()

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (!products) return []
    const term = search.toLowerCase().trim()
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory
      const matchesSearch = term === '' || p.title.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [products, search, activeCategory])

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
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
              onClick={() => setActiveCategory(category)}
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

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-900">No products found</p>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
          <button
            onClick={() => {
              setSearch('')
              setActiveCategory('all')
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
