import axios from 'axios'
import type { Product } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com',
  timeout: 10000,
})

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/products/categories')
  return data
}
