import { useState, useCallback, useEffect, useRef } from 'react'
import type { Product } from '../types'
import { useCart } from './useCart'

type AddingState = 'idle' | 'loading' | 'done'

const LOADING_DURATION = 500
const SUCCESS_DURATION = 600

export function useAddToCart() {
  const { dispatch } = useCart()
  const [adding, setAdding] = useState<AddingState>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => { timers.current.forEach(clearTimeout) }
  }, [])

  const addToCart = useCallback((product: Product) => {
    setAdding('loading')
    dispatch({ type: 'ADD_ITEM', payload: product })
    const t1 = setTimeout(() => {
      setAdding('done')
      const t2 = setTimeout(() => setAdding('idle'), SUCCESS_DURATION)
      timers.current.push(t2)
    }, LOADING_DURATION)
    timers.current.push(t1)
  }, [dispatch])

  return { adding, addToCart }
}
