import { memo } from 'react'
import type { CartItem as CartItemType } from '../../types'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatCurrency'

interface CartItemProps {
  item: CartItemType
}

const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-4">
      <img
        src={product.image}
        alt={product.title}
        className="h-20 w-20 shrink-0 rounded-md bg-gray-50 p-2 object-contain"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E"
        }}
      />
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{formatCurrency(product.price)} each</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: product.id, quantity: quantity - 1 },
                })
              }
              className="h-7 w-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              data-testid="qty-display"
              className="w-8 text-center text-sm font-semibold text-gray-900"
            >
              {quantity}
            </span>
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: product.id, quantity: quantity + 1 },
                })
              }
              className="h-7 w-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: product.id })}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
            aria-label={`Remove ${product.title} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
      <span className="text-sm font-bold text-gray-900 shrink-0">
        {formatCurrency(product.price * quantity)}
      </span>
    </div>
  )
})

export default CartItem
