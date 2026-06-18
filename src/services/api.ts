import axios from 'axios'
import type { Product } from '../types'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/products/categories')
  return data
}
