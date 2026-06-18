import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'
import { CartProvider } from '../context/CartContext'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
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

// Populates the cart then renders CartItem with the live item from context
function ConnectedCartItem({ initialQty = 2 }: { initialQty?: number }) {
  const { dispatch, items } = useCart()

  useEffect(() => {
    for (let i = 0; i < initialQty; i++) {
      dispatch({ type: 'ADD_ITEM', payload: mockProduct })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const item = items.find((i) => i.product.id === mockProduct.id)
  if (!item) return null
  return <CartItem item={item} />
}

function ItemCount() {
  const { items } = useCart()
  return <span data-testid="item-count">{items.length}</span>
}

function renderCartItem(initialQty = 2) {
  return render(
    <CartProvider>
      <ItemCount />
      <ConnectedCartItem initialQty={initialQty} />
    </CartProvider>,
  )
}

describe('CartItem', () => {
  it('renders the product title', async () => {
    renderCartItem()
    expect(await screen.findByText('Test Jacket')).toBeInTheDocument()
  })

  it('renders the unit price', async () => {
    renderCartItem()
    expect(await screen.findByText('$55.99 each')).toBeInTheDocument()
  })

  it('renders the current quantity', async () => {
    renderCartItem()
    expect(await screen.findByText('2')).toBeInTheDocument()
  })

  it('renders the line total (price × quantity)', async () => {
    renderCartItem()
    // 2 × $55.99 = $111.98
    expect(await screen.findByText('$111.98')).toBeInTheDocument()
  })

  it('removes the item when Remove is clicked', async () => {
    const user = userEvent.setup()
    renderCartItem(1)
    await screen.findByText('Test Jacket')
    await user.click(screen.getByRole('button', { name: /remove/i }))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  it('decrements quantity using the − button', async () => {
    const user = userEvent.setup()
    renderCartItem(2)
    await screen.findByText('Test Jacket')
    await user.click(screen.getByRole('button', { name: /decrease quantity/i }))
    expect(await screen.findByTestId('qty-display')).toHaveTextContent('1')
  })

  it('increments quantity using the + button', async () => {
    const user = userEvent.setup()
    renderCartItem(1)
    await screen.findByText('Test Jacket')
    await user.click(screen.getByRole('button', { name: /increase quantity/i }))
    expect(await screen.findByTestId('qty-display')).toHaveTextContent('2')
  })
})
