import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import UndoToast from '../components/ui/UndoToast'
import type { CartItem as CartItemType } from '../types'

export default function CartPage() {
  const { items, dispatch } = useCart()
  const [removedItem, setRemovedItem] = useState<CartItemType | null>(null)

  const handleRemove = useCallback((item: CartItemType) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })
    setRemovedItem(item)
  }, [dispatch])

  const handleUndo = useCallback(() => {
    if (!removedItem) return
    dispatch({ type: 'ADD_ITEM', payload: removedItem.product })
    if (removedItem.quantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: removedItem.product.id, quantity: removedItem.quantity },
      })
    }
    setRemovedItem(null)
  }, [removedItem, dispatch])

  const handleDismiss = useCallback(() => setRemovedItem(null), [])

  if (items.length === 0 && !removedItem) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingCart className="h-16 w-16 text-gray-300" strokeWidth={1} />
        <h2 className="mt-4 text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-1 text-sm text-gray-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          to="/"
          className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>

      {removedItem && (
        <UndoToast
          message={`"${removedItem.product.title.slice(0, 30)}…" removed`}
          onUndo={handleUndo}
          onDismiss={handleDismiss}
        />
      )}
    </>
  )
}
