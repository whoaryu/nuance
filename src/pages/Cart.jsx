import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import StateMessage from '../components/StateMessage'
import PageTitle from '../components/PageTitle'
import { CART_LIMITS, selectCartTotal, useCartStore } from '../store/cart'
import { formatCurrency } from '../utils/format'

export default function CartPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  if (items.length === 0) {
    return (
      <StateMessage
        title="Your cart is empty"
        message="Add a couple of products to see them listed here."
        actionLabel="Browse products"
        onAction={() => navigate('/')}
      />
    )
  }

  return (
    <section>
      <PageTitle
        title="Shopping Cart"
        subtitle="Review quantities, remove products, and continue to checkout."
      />

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
              limits={CART_LIMITS}
            />
          ))}
        </div>

        <aside className="h-fit space-y-4 rounded-[2rem] border border-stone-200 bg-white p-6 text-stone-900 shadow-sm shadow-stone-900/5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Cart total</p>
            <p className="text-4xl font-semibold text-stone-900">{formatCurrency(total)}</p>
            <p className="mt-3 text-sm text-stone-500">
              Taxes auto-adjust at checkout; shipping is a flat {formatCurrency(7.5)}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full rounded-2xl bg-stone-900 px-4 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </section>
  )
}

