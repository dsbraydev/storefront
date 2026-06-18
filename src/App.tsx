import { lazy, Suspense, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import StartupLoader from './components/ui/StartupLoader'
import ProductGridSkeleton from './components/ui/ProductGridSkeleton'
import DetailSkeleton from './components/ui/DetailSkeleton'
import EmptyState from './components/ui/EmptyState'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
})

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
              <Suspense fallback={<ProductGridSkeleton />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<Suspense fallback={<DetailSkeleton />}><ProductDetailPage /></Suspense>} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={
                    <EmptyState
                      icon={<Search className="h-16 w-16 text-gray-600" strokeWidth={1} />}
                      title="Page not found"
                      description="The page you're looking for doesn't exist."
                      action={{ label: 'Go home', to: '/' }}
                    />
                  } />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </>
  )
}
