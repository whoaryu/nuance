import client from './client'

// API endpoints - keeping them centralized makes it easier to change later
const ENDPOINTS = {
  products: '/products',
  product: (id) => `/products/${id}`,
  categories: '/products/categories',
}

export async function fetchProducts() {
  const response = await client.get(ENDPOINTS.products)
  return response.data
}

export async function fetchProduct(productId) {
  if (!productId) throw new Error('Product id is required.')
  const response = await client.get(ENDPOINTS.product(productId))
  return response.data
}

export async function fetchCategories() {
  const response = await client.get(ENDPOINTS.categories)
  return response.data
}

