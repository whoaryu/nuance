import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api/fakeStore'
import { getCachedValue, setCachedValue } from '../utils/cache'

const CACHE_KEY = 'products_all'

export function useProducts() {
  const [products, setProducts] = useState(() => getCachedValue(CACHE_KEY) ?? [])
  const [loading, setLoading] = useState(products.length === 0)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
      setCachedValue(CACHE_KEY, data)
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (products.length === 0) {
      loadProducts()
    }
  }, [products.length, loadProducts])

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
  }
}

