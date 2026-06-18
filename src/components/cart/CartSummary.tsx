import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartSummary() {
  const { totalItems, totalPrice } = useCart()

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Items ({totalItems})</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span className="text-green-600">Free</span>
      </div>
      <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <button
        disabled={totalItems === 0}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
