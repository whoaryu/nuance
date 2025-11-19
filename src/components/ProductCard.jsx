import { Link } from 'react-router-dom'
import { formatCurrency, truncateText } from '../utils/format'
import { useCartStore, CART_LIMITS } from '../store/cart'
import QuantityInput from './QuantityInput'
import useToast from '../hooks/useToast'

export default function ProductCard({ product }) {
  if (!product) return null
  const price = formatCurrency(product.price)
  const pushToast = useToast()
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
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
    <article className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-5 text-stone-900 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.6)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-60px_rgba(15,23,42,0.5)]">
      <Link
        to={`/product/${product.id}`}
        className="mb-4 flex h-52 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ec]"
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-48 object-contain transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <span className="rounded-full bg-stone-100 px-3 py-1 font-semibold text-stone-900">
            {price}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-stone-400">
            {product.category}
          </span>
        </p>
        <p className="mt-3 flex-1 text-sm text-stone-500">{truncateText(product.description)}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-stone-900"
        >
          Explore details
          <span aria-hidden>→</span>
        </Link>
        {isInCart ? (
          <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <QuantityInput
                  value={cartQuantity}
                  min={CART_LIMITS.min}
                  max={CART_LIMITS.max}
                  onChange={handleQuantityChange}
                  label="In bag"
                />
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:text-rose-600"
                aria-label="Remove from bag"
              >
                🗑
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mt-4 rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            onClick={handleAdd}
          >
            Add to bag
          </button>
        )}
      </div>
    </article>
  )
}

