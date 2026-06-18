import { useMemo } from 'react'
import type { Product } from '../types'

export function useFilteredProducts(
  products: Product[] | undefined,
  search: string,
  activeCategory: string,
): Product[] {
  return useMemo(() => {
    if (!products) return []
    const term = search.toLowerCase().trim()
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch = term === '' || p.title.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [products, search, activeCategory])
}
