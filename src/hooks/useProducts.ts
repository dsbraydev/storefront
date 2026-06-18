import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../services/api'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
