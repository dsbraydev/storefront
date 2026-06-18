import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import StorePage from './pages/StorePage'
import CartPage from './pages/CartPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}
