export default function QuantityInput({
  value,
  min = 1,
  max = 10,
  onChange,
  label = 'Quantity',
}) {
  const decrement = () => onChange(Math.max(min, value - 1))
  const increment = () => onChange(Math.min(max, value + 1))

  return (
    <div className="flex flex-col gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-stone-400">
      <span>{label}</span>
      <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-2 py-1.5 text-stone-900 shadow-sm shadow-stone-900/5">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="rounded-full px-3 py-1 text-lg transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          –
        </button>
        <span className="w-10 text-center text-base font-semibold">{value}</span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="rounded-full px-3 py-1 text-lg transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  )
}

