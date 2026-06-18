import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import ProductCard from '../components/products/ProductCard'
import type { Product } from '../types'

const mockProduct: Product = {
  id: 1,
  title: 'Fjallraven Backpack',
  price: 109.95,
  description: 'Your perfect pack for everyday use.',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/backpack.jpg',
  rating: { rate: 3.9, count: 120 },
}

function CartCount() {
  const { totalItems } = useCart()
  return <span data-testid="total-items">{totalItems}</span>
}

function renderProductCard(product = mockProduct) {
  return render(
    <CartProvider>
      <BrowserRouter>
        <CartCount />
        <ProductCard product={product} />
      </BrowserRouter>
    </CartProvider>,
  )
}

describe('ProductCard', () => {
  it('renders the product title', () => {
    renderProductCard()
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
  })

  it('renders the formatted price', () => {
    renderProductCard()
    expect(screen.getByText('$109.95')).toBeInTheDocument()
  })

  it('renders the product image with alt text', () => {
    renderProductCard()
    expect(screen.getByRole('img', { name: mockProduct.title })).toBeInTheDocument()
  })

  it('dispatches ADD_ITEM when Add to Cart is clicked', async () => {
    const user = userEvent.setup()
    renderProductCard()
    expect(screen.getByTestId('total-items')).toHaveTextContent('0')
    await user.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('total-items')).toHaveTextContent('1')
  })

  it('increments the count on repeated clicks', async () => {
    const user = userEvent.setup()
    renderProductCard()
    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)
    await user.click(button)
    expect(screen.getByTestId('total-items')).toHaveTextContent('2')
  })
})
