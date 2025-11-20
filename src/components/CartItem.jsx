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
    <div className="group relative flex flex-col gap-5 overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 p-4 text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset] sm:flex-row sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 via-transparent to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:from-purple-50/30 group-hover:to-blue-50/15 group-hover:opacity-100" />
      <div className="relative flex items-center gap-5">
        <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-linear-to-br from-stone-50 to-stone-100/50 p-3 shadow-sm sm:p-4">
        <img
          src={item.image}
          alt={item.title}
            className="h-20 w-20 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24"
          loading="lazy"
        />
        </div>
        <div>
          <p className="text-lg font-semibold leading-snug tracking-tight">{item.title}</p>
          <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-stone-400">{item.category}</p>
          <button
            type="button"
            onClick={handleRemove}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500 transition-colors duration-300 hover:text-rose-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 flex-wrap items-center justify-between gap-5 sm:justify-end">
        <QuantityInput
          value={item.quantity}
          min={limits?.min}
          max={limits?.max}
          onChange={(value) => onQuantityChange(item.id, value)}
          label="Qty"
        />
        <div className="text-right text-stone-500">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em]">Unit Price</p>
          <p className="mt-1 text-lg font-semibold text-stone-900">{formatCurrency(item.price)}</p>
        </div>
        <div className="text-right text-stone-500">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em]">Subtotal</p>
          <p className="mt-1 text-lg font-semibold text-stone-900">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}

