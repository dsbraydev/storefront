import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartSummary() {
  const { totalItems, totalPrice } = useCart()

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-white">Order Summary</h2>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Items ({totalItems})</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Shipping</span>
        <span className="text-green-500">Free</span>
      </div>
      <div className="border-t border-gray-800 pt-4 flex justify-between font-bold text-white">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <button
        disabled={totalItems === 0}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
