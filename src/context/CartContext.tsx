import { createContext, type ReactNode } from 'react'

export const CartContext = createContext<null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContext.Provider value={null}>{children}</CartContext.Provider>
}
