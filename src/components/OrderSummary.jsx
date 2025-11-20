import { formatCurrency } from '../utils/format'

// order summary sidebar component
export default function OrderSummary({ items, total }) {
  const shipping = total > 0 ? 7.5 : 0
  const grandTotal = total + shipping

  return (
    <aside className="rounded-[2rem] border border-stone-200 bg-white p-6 text-stone-900 shadow-sm shadow-stone-900/5">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <ul className="mt-4 space-y-2 text-sm text-stone-500">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span className="line-clamp-1">{item.title}</span>
            <span>
              {item.quantity} × {formatCurrency(item.price)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-3 text-sm text-stone-500">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-stone-900">{formatCurrency(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="font-semibold text-stone-900">
            {shipping === 0 ? '—' : formatCurrency(shipping)}
          </dd>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-stone-900">
          <dt>Total</dt>
          <dd>{formatCurrency(grandTotal)}</dd>
        </div>
      </dl>
    </aside>
  )
}

