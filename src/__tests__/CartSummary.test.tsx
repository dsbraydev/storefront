import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import CartSummary from '../components/cart/CartSummary'
import type { Product } from '../types'

const mockProduct: Product = {
  id: 1,
  title: 'Test Jacket',
  price: 55.99,
  description: 'A great jacket.',
  category: "men's clothing",
  image: 'https://example.com/jacket.jpg',
  rating: { rate: 4.1, count: 200 },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Test Shirt',
  price: 20.0,
  description: 'A nice shirt.',
  category: "men's clothing",
  image: 'https://example.com/shirt.jpg',
  rating: { rate: 4.0, count: 100 },
}

function Seeder({ products, qty = 1 }: { products: Product[]; qty?: number }) {
  const { dispatch } = useCart()
  useEffect(() => {
    products.forEach((p) => {
      for (let i = 0; i < qty; i++) {
        dispatch({ type: 'ADD_ITEM', payload: p })
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

function renderCartSummary(products: Product[] = [mockProduct], qty = 1) {
  return render(
    <CartProvider>
      <Seeder products={products} qty={qty} />
      <CartSummary />
    </CartProvider>,
  )
}

describe('CartSummary', () => {
  it('shows the item count', async () => {
    renderCartSummary([mockProduct], 2)
    expect(await screen.findByText(/items \(2\)/i)).toBeInTheDocument()
  })

  it('shows the formatted order total', async () => {
    renderCartSummary([mockProduct], 2)
    // 2 × $55.99 = $111.98
    const totals = await screen.findAllByText('$111.98')
    expect(totals.length).toBeGreaterThan(0)
  })

  it('shows a free shipping line', async () => {
    renderCartSummary()
    expect(await screen.findByText(/free/i)).toBeInTheDocument()
  })

  it('sums multiple products correctly', async () => {
    renderCartSummary([mockProduct, mockProduct2])
    // $55.99 + $20.00 = $75.99
    const totals = await screen.findAllByText('$75.99')
    expect(totals.length).toBeGreaterThan(0)
  })

  it('renders the checkout button', async () => {
    renderCartSummary()
    expect(await screen.findByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument()
  })

  it('checkout button is disabled when cart is empty', () => {
    render(
      <CartProvider>
        <CartSummary />
      </CartProvider>,
    )
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeDisabled()
  })

  it('checkout button is enabled when cart has items', async () => {
    renderCartSummary()
    expect(
      await screen.findByRole('button', { name: /proceed to checkout/i }),
    ).not.toBeDisabled()
  })
})
