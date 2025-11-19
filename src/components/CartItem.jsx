import QuantityInput from './QuantityInput'
import { formatCurrency } from '../utils/format'
import useToast from '../hooks/useToast'

export default function CartItem({ item, onQuantityChange, onRemove, limits }) {
  const toast = useToast()
  if (!item) return null

  const handleRemove = () => {
    onRemove(item.id)
    toast({ title: 'Removed from bag', description: item.title, variant: 'danger' })
  }

  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 text-stone-900 shadow-sm shadow-stone-900/5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt={item.title}
          className="h-24 w-24 rounded-2xl border border-stone-100 bg-[#f7f2ec] object-contain p-3"
          loading="lazy"
        />
        <div>
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">{item.category}</p>
          <button
            type="button"
            onClick={handleRemove}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500 hover:text-rose-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-between gap-4 sm:justify-end">
        <QuantityInput
          value={item.quantity}
          min={limits?.min}
          max={limits?.max}
          onChange={(value) => onQuantityChange(item.id, value)}
          label="Qty"
        />
        <div className="text-right text-stone-500">
          <p className="text-xs uppercase tracking-[0.3em]">Price</p>
          <p className="text-lg font-semibold text-stone-900">{formatCurrency(item.price)}</p>
        </div>
        <div className="text-right text-stone-500">
          <p className="text-xs uppercase tracking-[0.3em]">Subtotal</p>
          <p className="text-lg font-semibold text-stone-900">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}

