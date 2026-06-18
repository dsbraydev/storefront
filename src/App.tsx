import { lazy, Suspense, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import StartupLoader from './components/ui/StartupLoader'
import SkeletonCard from './components/ui/SkeletonCard'
import DetailSkeleton from './components/ui/DetailSkeleton'

const queryClient = new QueryClient()

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

export default function App() {
  const [ready, setReady] = useState(() => window.location.pathname !== '/')

  useEffect(() => {
    if (ready) return
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<Suspense fallback={<DetailSkeleton />}><ProductDetailPage /></Suspense>} />
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
