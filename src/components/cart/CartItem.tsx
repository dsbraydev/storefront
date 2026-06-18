import { memo } from 'react'
import type { CartItem as CartItemType } from '../../types'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatCurrency'
import { handleImageError } from '../../utils/imageFallback'

interface CartItemProps {
  item: CartItemType
  onRemove?: (item: CartItemType) => void
}

const CartItem = memo(function CartItem({ item, onRemove }: CartItemProps) {
  const { dispatch } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-4">
      <img
        src={product.image}
        alt={product.title}
        className="h-20 w-20 shrink-0 rounded-md bg-gray-50 p-2 object-contain"
        onError={handleImageError}
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
            onClick={() => onRemove ? onRemove(item) : dispatch({ type: 'REMOVE_ITEM', payload: product.id })}
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
