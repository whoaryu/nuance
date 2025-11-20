import { useCallback, useEffect, useState } from 'react'
import { fetchProduct } from '../api/fakeStore'
import { getCachedValue, setCachedValue } from '../utils/cache'

const keyFor = (id) => `product_${id}`

// hook for fetching a single product by ID
export function useProduct(productId) {
  // check cache first
  const [product, setProduct] = useState(() => getCachedValue(keyFor(productId)))
  const [loading, setLoading] = useState(!product)
  const [error, setError] = useState(null)

  const loadProduct = useCallback(async () => {
    if (!productId) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProduct(productId)
      setProduct(data)
      setCachedValue(keyFor(productId), data)
    } catch (err) {
      setError(err.message || 'Unable to load product.')
    } finally {
      setLoading(false)
    }
  }, [productId])

  // fetch if we don't have it cached
  useEffect(() => {
    if (!product) {
      loadProduct()
    }
  }, [product, loadProduct])

  return {
    product,
    loading,
    error,
    refresh: loadProduct,
  }
}

