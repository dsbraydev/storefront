import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import StorePage from './pages/StorePage'

const CartPage = lazy(() => import('./pages/CartPage'))

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-24 text-gray-400">
                  Loading…
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<StorePage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}
