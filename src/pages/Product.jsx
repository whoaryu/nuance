import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuantityInput from '../components/QuantityInput'
import StateMessage from '../components/StateMessage'
import PageTitle from '../components/PageTitle'
import ProductSkeleton from '../components/ProductSkeleton'
import { useProduct } from '../hooks/useProduct'
import { formatCurrency } from '../utils/format'
import { CART_LIMITS, useCartStore } from '../store/cart'
import useToast from '../hooks/useToast'

const DETAIL_LIMITS = { min: 1, max: 5 }

export default function ProductPage() {
  const { productId } = useParams()
  const { product, loading, error, refresh } = useProduct(productId)
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const cartQuantity = useCartStore(
    (state) => state.items.find((entry) => entry.id === Number(productId))?.quantity ?? 0,
  )
  const toast = useToast()
  const [quantity, setQuantity] = useState(1)

  const price = useMemo(() => formatCurrency(product?.price ?? 0), [product?.price])

  const handleAdd = () => {
    addItem(product, quantity)
    toast({ title: 'Added to bag', description: product.title, variant: 'success' })
  }

  const handleCartQuantity = (nextValue) => {
    updateQuantity(product.id, nextValue)
  }

  const handleRemove = () => {
    removeItem(product.id)
    toast({ title: 'Removed from bag', description: product.title, variant: 'danger' })
  }

  if (loading && !product) {
    return (
      <section>
        <PageTitle title="Loading" subtitle="Fetching the latest details." />
        <ProductSkeleton />
      </section>
    )
  }

  if (error) {
    return (
      <StateMessage
        title="Product unavailable"
        message={error}
        actionLabel="Retry"
        onAction={refresh}
      />
    )
  }

  if (!product) {
    return (
      <StateMessage
        title="Product not found"
        message="The product you’re looking for may have been removed."
      />
    )
  }

  return (
    <section>
      <PageTitle
        title={product.title}
        subtitle="Detailed view with quantity guardrails and interaction copy."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-linear-to-br from-white via-white to-stone-50/30 p-12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
          <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 via-transparent to-blue-50/0 opacity-0 transition-opacity duration-500 group-hover:from-purple-50/40 group-hover:to-blue-50/20 group-hover:opacity-100" />
          <img
            src={product.image}
            alt={product.title}
            className="relative mx-auto h-96 w-full max-w-md object-contain drop-shadow-[0_25px_35px_rgba(15,23,42,0.15)] transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_35px_45px_rgba(15,23,42,0.2)]"
          />
        </div>
        <div className="flex flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 p-10 text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl">
          <div>
            <p className="inline-flex rounded-full border border-purple-200/60 bg-linear-to-br from-purple-50 to-purple-100/50 px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-purple-600 shadow-sm backdrop-blur-sm">
              {product.category}
            </p>
            <p className="font-serif mt-4 text-5xl font-semibold tracking-tight text-stone-900">{price}</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
              <span className="text-lg">⭐</span>
              <span className="font-medium">{product?.rating?.rate ?? 0}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-400">{product?.rating?.count ?? 0} verified reviews</span>
            </div>
          </div>

          <p className="text-base leading-relaxed text-stone-600">{product.description}</p>

          {cartQuantity > 0 ? (
            <div className="rounded-2xl border border-stone-200/60 bg-linear-to-br from-stone-50/80 to-stone-100/40 px-6 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <QuantityInput
                  value={cartQuantity}
                  min={CART_LIMITS.min}
                  max={CART_LIMITS.max}
                  onChange={handleCartQuantity}
                  label="In bag"
                  inline
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="group/remove flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200/60 bg-white text-stone-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-rose-300/60 hover:bg-linear-to-br hover:from-rose-50 hover:to-rose-100/50 hover:text-rose-600 hover:shadow-md"
                  aria-label="Remove from bag"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover/remove:scale-110"
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
              <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-purple-400">
                Updates sync instantly
              </p>
            </div>
          ) : (
            <>
              <QuantityInput
                value={quantity}
                min={DETAIL_LIMITS.min}
                max={DETAIL_LIMITS.max}
                onChange={setQuantity}
              />

              <button
                type="button"
                onClick={handleAdd}
                className="group/add w-full rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-stone-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/30"
              >
                <span className="flex items-center justify-center gap-2">
                  Add to Shopping Bag
                  <span className="transition-transform duration-300 group-hover/add:translate-x-1">→</span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

