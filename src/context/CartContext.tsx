import { createContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  dispatch: React.Dispatch<CartAction>
}

export const CartContext = createContext<CartContextValue | null>(null)

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.product.id === action.payload.id)
      if (existing) {
        return state.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...state, { product: action.payload, quantity: 1 }]
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.product.id !== action.payload)
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter((item) => item.product.id !== action.payload.id)
      }
      return state.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      )
    case 'CLEAR_CART':
      return []
  }
}

const CART_STORAGE_KEY = 'storefront_cart'

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? (JSON.parse(saved) as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
