// generic empty/error state component
// used for empty cart, loading errors, no results, etc.
export default function StateMessage({ title, message, actionLabel, onAction, illustration }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-stone-200 bg-white px-8 py-10 text-center text-stone-800 shadow-sm shadow-stone-900/5">
      {illustration && <div className="text-stone-300">{illustration}</div>}
      <p className="text-2xl font-semibold text-stone-900">{title}</p>
      <p className="max-w-2xl text-sm text-stone-500">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {actionLabel ?? 'Try again'}
        </button>
      )}
    </div>
  )
}

