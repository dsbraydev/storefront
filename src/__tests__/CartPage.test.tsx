import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import CartPage from '../pages/CartPage'
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

function Seeder({ products }: { products: Product[] }) {
  const { dispatch } = useCart()
  useEffect(() => {
    products.forEach((p) => dispatch({ type: 'ADD_ITEM', payload: p }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

function renderCartPage(products: Product[] = []) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Seeder products={products} />
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>,
  )
}

describe('CartPage', () => {
  it('shows an empty state when the cart has no items', () => {
    renderCartPage()
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('shows a link back to the store in the empty state', () => {
    renderCartPage()
    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument()
  })

  it('renders cart items when the cart has products', async () => {
    renderCartPage([mockProduct])
    expect(await screen.findByText('Test Jacket')).toBeInTheDocument()
  })

  it('renders the shopping cart heading when items are present', async () => {
    renderCartPage([mockProduct])
    expect(await screen.findByRole('heading', { name: /shopping cart/i })).toBeInTheDocument()
  })

  it('renders the order summary when items are present', async () => {
    renderCartPage([mockProduct])
    expect(await screen.findByRole('heading', { name: /order summary/i })).toBeInTheDocument()
  })

  it('does not show the cart heading in the empty state', () => {
    renderCartPage()
    expect(screen.queryByRole('heading', { name: /shopping cart/i })).not.toBeInTheDocument()
  })
})
