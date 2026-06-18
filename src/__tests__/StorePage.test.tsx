import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { CartProvider } from '../context/CartContext'
import StorePage from '../pages/StorePage'
import { server } from '../mocks/server'
import { mockProducts, mockCategories } from '../mocks/handlers'

function renderStorePage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <StorePage />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>,
  )
}

describe('StorePage', () => {
  it('shows skeleton cards while loading', () => {
    renderStorePage()
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(8)
  })

  it('renders product cards after the API resolves', async () => {
    renderStorePage()
    expect(await screen.findByText(mockProducts[0].title)).toBeInTheDocument()
    expect(await screen.findByText(mockProducts[1].title)).toBeInTheDocument()
  })

  it('shows a formatted price for each product', async () => {
    renderStorePage()
    expect(await screen.findByText('$109.95')).toBeInTheDocument()
  })

  it('shows an error message when the API fails', async () => {
    server.use(
      http.get('https://fakestoreapi.com/products', () =>
        new HttpResponse(null, { status: 500 }),
      ),
    )
    renderStorePage()
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('renders category filter buttons after loading', async () => {
    renderStorePage()
    for (const category of mockCategories) {
      expect(await screen.findByRole('button', { name: category })).toBeInTheDocument()
    }
  })

  it('shows an All button that is active by default', async () => {
    renderStorePage()
    const allButton = await screen.findByRole('button', { name: /^all$/i })
    expect(allButton).toBeInTheDocument()
    expect(allButton).toHaveClass('bg-indigo-600')
  })

  it('filters products by category when a filter button is clicked', async () => {
    const user = userEvent.setup()
    renderStorePage()
    // Wait for both products to appear
    await screen.findByText(mockProducts[0].title)
    // Both mock products are in men's clothing — click electronics, expect no products
    const electronicsButton = await screen.findByRole('button', { name: /electronics/i })
    await user.click(electronicsButton)
    expect(screen.queryByText(mockProducts[0].title)).not.toBeInTheDocument()
    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })

  it('filters products by search term', async () => {
    const user = userEvent.setup()
    renderStorePage()
    await screen.findByText(mockProducts[0].title)
    const input = screen.getByPlaceholderText(/search products/i)
    await user.type(input, 'Fjallraven')
    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument()
    expect(screen.queryByText(mockProducts[1].title)).not.toBeInTheDocument()
  })

  it('shows no products found with a clear filters button when search matches nothing', async () => {
    const user = userEvent.setup()
    renderStorePage()
    await screen.findByText(mockProducts[0].title)
    const input = screen.getByPlaceholderText(/search products/i)
    await user.type(input, 'xyznonexistent')
    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument()
  })

  it('clears search and category filter when clear filters is clicked', async () => {
    const user = userEvent.setup()
    renderStorePage()
    await screen.findByText(mockProducts[0].title)
    const input = screen.getByPlaceholderText(/search products/i)
    await user.type(input, 'xyznonexistent')
    await user.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(await screen.findByText(mockProducts[0].title)).toBeInTheDocument()
  })

  it('shows a warning when the categories API fails', async () => {
    server.use(
      http.get('https://fakestoreapi.com/products/categories', () =>
        new HttpResponse(null, { status: 500 }),
      ),
    )
    renderStorePage()
    await waitFor(() => {
      expect(screen.getByText(/could not load category filters/i)).toBeInTheDocument()
    })
  })
})
