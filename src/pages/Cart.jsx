import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import StateMessage from '../components/StateMessage'
import PageTitle from '../components/PageTitle'
import { CART_LIMITS, selectCartTotal, useCartStore } from '../store/cart'
import { formatCurrency } from '../utils/format'

// empty cart illustration
function EmptyBagIllustration() {
  return (
    <div className="rounded-full bg-stone-50 p-6 text-stone-300">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="42" width="72" height="56" rx="12" stroke="currentColor" strokeWidth="2" />
        <path
          d="M48 42c0-12 7.5-22 18-22s18 10 18 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M36 62h48" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
        <path
          d="M50 74c4 4 16 4 20 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function CartPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  // show empty state if cart is empty
  if (items.length === 0) {
    return (
      <StateMessage
        title="Your cart is empty"
        message="Add a couple of products to see them listed here."
        actionLabel="Browse products"
        onAction={() => navigate('/')}
        illustration={<EmptyBagIllustration />}
      />
    )
  }

  return (
    <section>
      <PageTitle
        title="Shopping Cart"
        subtitle="Review quantities, remove products, and continue to checkout."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr] lg:gap-8">
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

        <aside className="h-fit space-y-6 overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 p-5 text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl sm:p-8">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-purple-400">Order Summary</p>
            <p className="font-serif mt-3 text-5xl font-semibold tracking-tight text-stone-900">{formatCurrency(total)}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              Taxes calculated at checkout. Complimentary shipping on orders over {formatCurrency(50)}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="group/checkout w-full rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-stone-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/30"
          >
            <span className="flex items-center justify-center gap-2">
            Proceed to Checkout
              <span className="transition-transform duration-300 group-hover/checkout:translate-x-1">→</span>
            </span>
          </button>
        </aside>
      </div>
    </section>
  )
}

