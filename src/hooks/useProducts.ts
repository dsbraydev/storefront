import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../services/api'

const STALE_TIME = 5 * 60 * 1000

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: STALE_TIME,
  })
}
