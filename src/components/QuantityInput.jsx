export default function QuantityInput({
  value,
  min = 1,
  max = 10,
  onChange,
  label = 'Quantity',
  inline = false,
}) {
  const decrement = () => onChange(Math.max(min, value - 1))
  const increment = () => onChange(Math.min(max, value + 1))

  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-stone-400">
          {label}
        </span>
        <div className="inline-flex w-fit items-center gap-1 rounded-full border border-stone-200/60 bg-linear-to-br from-white to-stone-50/30 px-2 py-1 text-stone-900 shadow-sm backdrop-blur-sm">
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium transition-all duration-300 hover:bg-stone-100 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className="w-9 text-center text-sm font-semibold">{value}</span>
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium transition-all duration-300 hover:bg-stone-100 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-stone-400">
      <span>{label}</span>
      <div className="inline-flex w-fit items-center gap-1 rounded-full border border-stone-200/60 bg-linear-to-br from-white to-stone-50/30 px-2 py-1 text-stone-900 shadow-sm backdrop-blur-sm">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium transition-all duration-300 hover:bg-stone-100 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="w-9 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium transition-all duration-300 hover:bg-stone-100 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  )
}

