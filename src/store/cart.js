import { create } from 'zustand'

const STORAGE_KEY = 'nuance_cart_v1'
const MAX_PER_PRODUCT = 10
const MIN_PER_PRODUCT = 1

export const CART_LIMITS = Object.freeze({
  min: MIN_PER_PRODUCT,
  max: MAX_PER_PRODUCT,
})

const isBrowser = typeof window !== 'undefined'

function clamp(value) {
  return Math.min(Math.max(value, MIN_PER_PRODUCT), MAX_PER_PRODUCT)
}

function loadCart() {
  if (!isBrowser) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useCartStore = create((set, get) => ({
  items: loadCart(),
  addItem: (product, quantity = 1) => {
    if (!product?.id) return
    const current = get().items
    const existing = current.find((item) => item.id === product.id)
    const nextQuantity = clamp(quantity)

    let items
    if (existing) {
      items = current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: clamp(item.quantity + nextQuantity) }
          : item,
      )
    } else {
      items = [...current, { ...product, quantity: nextQuantity }]
    }

    set({ items })
  },
  updateQuantity: (productId, quantity) => {
    const items = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: clamp(quantity) } : item,
    )
    set({ items })
  },
  removeItem: (productId) => {
    const items = get().items.filter((item) => item.id !== productId)
    set({ items })
  },
  clearCart: () => set({ items: [] }),
}))

if (isBrowser) {
  useCartStore.subscribe((state) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* noop */
    }
  })
}

export function selectCartCount(state) {
  return state.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function selectCartTotal(state) {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

