import { cartReducer } from '../context/CartContext'
import type { CartItem, Product } from '../types'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  description: 'desc',
  category: 'test',
  image: 'img.jpg',
  rating: { rate: 4, count: 10 },
}

const anotherProduct: Product = { ...mockProduct, id: 2, price: 20 }

describe('cartReducer', () => {
  describe('ADD_ITEM', () => {
    it('adds a new product with quantity 1', () => {
      const result = cartReducer([], { type: 'ADD_ITEM', payload: mockProduct })
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({ product: mockProduct, quantity: 1 })
    })

    it('increments quantity when the same product is added again', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 1 }]
      const result = cartReducer(initial, { type: 'ADD_ITEM', payload: mockProduct })
      expect(result).toHaveLength(1)
      expect(result[0].quantity).toBe(2)
    })

    it('does not affect other items when adding a new one', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 3 }]
      const result = cartReducer(initial, { type: 'ADD_ITEM', payload: anotherProduct })
      expect(result).toHaveLength(2)
      expect(result[0].quantity).toBe(3)
    })
  })

  describe('REMOVE_ITEM', () => {
    it('removes the item by product id', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 2 }]
      const result = cartReducer(initial, { type: 'REMOVE_ITEM', payload: 1 })
      expect(result).toHaveLength(0)
    })

    it('only removes the targeted item', () => {
      const initial: CartItem[] = [
        { product: mockProduct, quantity: 1 },
        { product: anotherProduct, quantity: 1 },
      ]
      const result = cartReducer(initial, { type: 'REMOVE_ITEM', payload: 1 })
      expect(result).toHaveLength(1)
      expect(result[0].product.id).toBe(2)
    })
  })

  describe('UPDATE_QUANTITY', () => {
    it('sets the quantity to the given value', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 1 }]
      const result = cartReducer(initial, {
        type: 'UPDATE_QUANTITY',
        payload: { id: 1, quantity: 5 },
      })
      expect(result[0].quantity).toBe(5)
    })

    it('removes the item when quantity is set to 0', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 2 }]
      const result = cartReducer(initial, {
        type: 'UPDATE_QUANTITY',
        payload: { id: 1, quantity: 0 },
      })
      expect(result).toHaveLength(0)
    })

    it('removes the item when quantity is negative', () => {
      const initial: CartItem[] = [{ product: mockProduct, quantity: 1 }]
      const result = cartReducer(initial, {
        type: 'UPDATE_QUANTITY',
        payload: { id: 1, quantity: -1 },
      })
      expect(result).toHaveLength(0)
    })
  })

  describe('CLEAR_CART', () => {
    it('empties all items', () => {
      const initial: CartItem[] = [
        { product: mockProduct, quantity: 3 },
        { product: anotherProduct, quantity: 1 },
      ]
      const result = cartReducer(initial, { type: 'CLEAR_CART' })
      expect(result).toHaveLength(0)
    })
  })

  describe('derived values', () => {
    const items: CartItem[] = [
      { product: mockProduct, quantity: 2 },
      { product: anotherProduct, quantity: 3 },
    ]

    it('derives totalItems correctly', () => {
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
      expect(totalItems).toBe(5)
    })

    it('derives totalPrice correctly', () => {
      const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      )
      // 2 × $10 + 3 × $20 = $80
      expect(totalPrice).toBeCloseTo(80)
    })
  })
})
