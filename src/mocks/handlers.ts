import { http, HttpResponse } from 'msw'
import type { Product } from '../types'

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/backpack.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/tshirt.jpg',
    rating: { rate: 4.1, count: 259 },
  },
]

export const mockCategories = ["men's clothing", 'electronics', 'jewelery', "women's clothing"]

export const handlers = [
  http.get('https://fakestoreapi.com/products', () =>
    HttpResponse.json(mockProducts),
  ),
  http.get('https://fakestoreapi.com/products/categories', () =>
    HttpResponse.json(mockCategories),
  ),
]
