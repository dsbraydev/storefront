import { useState, useCallback } from 'react'
import type { Product } from '../types'
import { useCart } from './useCart'

type AddingState = 'idle' | 'loading' | 'done'

const LOADING_DURATION = 500
const SUCCESS_DURATION = 600

export function useAddToCart() {
  const { dispatch } = useCart()
  const [adding, setAdding] = useState<AddingState>('idle')

  const addToCart = useCallback((product: Product) => {
    setAdding('loading')
    dispatch({ type: 'ADD_ITEM', payload: product })
    setTimeout(() => {
      setAdding('done')
      setTimeout(() => setAdding('idle'), SUCCESS_DURATION)
    }, LOADING_DURATION)
  }, [dispatch])

  return { adding, addToCart }
}
