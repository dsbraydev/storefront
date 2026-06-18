import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { CartProvider } from '../context/CartContext'
import StorePage from '../pages/StorePage'
import { server } from '../mocks/server'
import { mockProducts } from '../mocks/handlers'

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
})
