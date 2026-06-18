import { lazy, Suspense, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import StartupLoader from './components/ui/StartupLoader'

const queryClient = new QueryClient()

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <StartupLoader visible={!ready} />
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-24 text-gray-400">
                    Loading…
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </>
  )
}
