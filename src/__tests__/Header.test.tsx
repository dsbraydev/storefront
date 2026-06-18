import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import Header from '../components/layout/Header'
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

function Seeder({ qty }: { qty: number }) {
  const { dispatch } = useCart()
  useEffect(() => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', payload: mockProduct })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

function renderHeader(qty = 0) {
  return render(
    <CartProvider>
      <Seeder qty={qty} />
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </CartProvider>,
  )
}

describe('Header', () => {
  it('renders the storefront logo link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /storefront/i })).toBeInTheDocument()
  })

  it('renders the cart link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
  })

  it('does not show a badge when the cart is empty', () => {
    renderHeader(0)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows the item count badge when cart has items', async () => {
    renderHeader(3)
    expect(await screen.findByText('3')).toBeInTheDocument()
  })

  it('updates the cart aria-label with the current count', async () => {
    renderHeader(2)
    expect(await screen.findByRole('link', { name: /cart \(2 items\)/i })).toBeInTheDocument()
  })

  it('caps the badge at 99+ for large counts', async () => {
    const { rerender } = render(
      <CartProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </CartProvider>,
    )
    // Manually add 100 items via a seeder re-render
    rerender(
      <CartProvider>
        <Seeder qty={100} />
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </CartProvider>,
    )
    expect(await screen.findByText('99+')).toBeInTheDocument()
  })
})
