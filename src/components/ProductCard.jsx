import { Link } from 'react-router-dom'
import { formatCurrency, truncateText } from '../utils/format'
import { useCartStore, CART_LIMITS } from '../store/cart'
import QuantityInput from './QuantityInput'
import useToast from '../hooks/useToast'

// product card component for the grid view
export default function ProductCard({ product }) {
  if (!product) return null
  const price = formatCurrency(product.price)
  const pushToast = useToast()
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  // check if this product is already in cart
  const cartQuantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  )
  const isInCart = cartQuantity > 0

  const handleAdd = () => {
    addItem(product, 1)
    pushToast({ title: 'Added to bag', description: product.title, variant: 'success' })
  }

  const handleQuantityChange = (nextValue) => {
    updateQuantity(product.id, nextValue)
  }

  const handleRemove = () => {
    removeItem(product.id)
    pushToast({ title: 'Removed from bag', description: product.title, variant: 'danger' })
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-4xl border border-stone-200/60 bg-linear-to-br from-white via-white to-stone-50/30 p-4 text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset] sm:p-6">
      <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 via-transparent to-blue-50/0 opacity-0 transition-opacity duration-500 group-hover:from-purple-50/40 group-hover:to-blue-50/20 group-hover:opacity-100" />
      <Link
        to={`/product/${product.id}`}
        className="relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-stone-50 to-stone-100/50 shadow-inner sm:mb-5 sm:h-56"
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-52 object-contain transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-2xl"
          loading="lazy"
        />
      </Link>
      <div className="relative flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight sm:text-lg">{product.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-stone-500">
          <span className="rounded-full bg-linear-to-br from-stone-900 to-stone-700 px-4 py-1.5 font-semibold text-white shadow-md">
            {price}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-stone-400">
            {product.category}
          </span>
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-500">{truncateText(product.description)}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:gap-3 hover:text-stone-900"
        >
          Explore details
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        {isInCart ? (
          <div className="mt-4 rounded-2xl border border-stone-200/60 bg-linear-to-br from-stone-50/80 to-stone-100/40 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
                <QuantityInput
                  value={cartQuantity}
                  min={CART_LIMITS.min}
                  max={CART_LIMITS.max}
                  onChange={handleQuantityChange}
                  label="In bag"
                inline
                />
              <button
                type="button"
                onClick={handleRemove}
                className="group/remove flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200/60 bg-white text-stone-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-rose-300/60 hover:bg-linear-to-br hover:from-rose-50 hover:to-rose-100/50 hover:text-rose-600 hover:shadow-md"
                aria-label="Remove from bag"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover/remove:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="group/add mt-3 rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/30"
            onClick={handleAdd}
          >
            <span className="flex items-center justify-center gap-2">
            Add to bag
              <span className="transition-transform duration-300 group-hover/add:translate-x-1">→</span>
            </span>
          </button>
        )}
      </div>
    </article>
  )
}

