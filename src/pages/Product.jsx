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
        <div className="rounded-[2.5rem] border border-stone-200 bg-white p-10 shadow-sm shadow-stone-900/5">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-96 w-full max-w-md object-contain drop-shadow-[0_25px_35px_rgba(15,23,42,0.15)]"
          />
        </div>
        <div className="flex flex-col gap-6 rounded-[2.5rem] border border-stone-200 bg-white p-8 text-stone-900 shadow-sm shadow-stone-900/5">
          <div>
            <p className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs uppercase tracking-[0.4em] text-stone-400">
              {product.category}
            </p>
            <p className="mt-3 text-4xl font-semibold text-stone-900">{price}</p>
            <p className="mt-2 text-sm text-stone-500">
              ⭐ {product?.rating?.rate ?? 0} · {product?.rating?.count ?? 0} verified buyers
            </p>
          </div>

          <p className="text-base leading-relaxed text-stone-600">{product.description}</p>

          {cartQuantity > 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
              <QuantityInput
                value={cartQuantity}
                min={CART_LIMITS.min}
                max={CART_LIMITS.max}
                onChange={handleCartQuantity}
                label="In bag"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-stone-400">
                Adjustments sync instantly
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
                className="w-full rounded-2xl bg-stone-900 px-6 py-3 text-lg font-semibold text-white transition hover:-translate-y-0.5"
              >
                Add to bag
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

