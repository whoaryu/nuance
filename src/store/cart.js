import { create } from 'zustand'

// version the storage key so we can migrate if needed later
const STORAGE_KEY = 'nuance_cart_v1'
const MAX_PER_PRODUCT = 10
const MIN_PER_PRODUCT = 1

// export these so components can use them for validation
export const CART_LIMITS = Object.freeze({
  min: MIN_PER_PRODUCT,
  max: MAX_PER_PRODUCT,
})

const isBrowser = typeof window !== 'undefined'

// keep quantities within bounds
function clamp(value) {
  return Math.min(Math.max(value, MIN_PER_PRODUCT), MAX_PER_PRODUCT)
}

// load cart from localStorage on init
function loadCart() {
  if (!isBrowser) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    // if parsing fails, just return empty array
    return []
  }
}

export const useCartStore = create((set, get) => ({
  items: loadCart(),
  
  // adds item or increments if already in cart
  addItem: (product, quantity = 1) => {
    if (!product?.id) return
    
    const current = get().items
    const existing = current.find((item) => item.id === product.id)
    const nextQuantity = clamp(quantity)

    let items
    if (existing) {
      // update existing item quantity
      items = current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: clamp(item.quantity + nextQuantity) }
          : item,
      )
    } else {
      // add new item
      items = [...current, { ...product, quantity: nextQuantity }]
    }

    set({ items })
  },
  
  // update quantity for a specific product
  updateQuantity: (productId, quantity) => {
    const items = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: clamp(quantity) } : item,
    )
    set({ items })
  },
  
  // remove item completely
  removeItem: (productId) => {
    const items = get().items.filter((item) => item.id !== productId)
    set({ items })
  },
  
  // clear everything (useful for after checkout)
  clearCart: () => set({ items: [] }),
}))

// sync to localStorage whenever cart changes
if (isBrowser) {
  useCartStore.subscribe((state) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // localStorage might be full or disabled, just ignore
    }
  })
}

// selector for total item count
export function selectCartCount(state) {
  return state.items.reduce((sum, item) => sum + item.quantity, 0)
}

// selector for total price
export function selectCartTotal(state) {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

