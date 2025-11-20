import { useCallback, useEffect, useState } from 'react'
import { fetchCategories } from '../api/fakeStore'
import { getCachedValue, setCachedValue } from '../utils/cache'

const CACHE_KEY = 'product_categories'

// same pattern as useProducts, just for categories
export function useCategories() {
  const [categories, setCategories] = useState(() => getCachedValue(CACHE_KEY) ?? [])
  const [loading, setLoading] = useState(categories.length === 0)
  const [error, setError] = useState(null)

  const loadCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCategories()
      setCategories(data)
      setCachedValue(CACHE_KEY, data)
    } catch (err) {
      setError(err.message || 'Failed to load categories.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (categories.length === 0) {
      loadCategories()
    }
  }, [categories.length, loadCategories])

  return {
    categories,
    loading,
    error,
    refresh: loadCategories,
  }
}

