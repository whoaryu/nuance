// toast variant styles
const VARIANT_STYLES = {
  default: 'border-slate-200 bg-white text-slate-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  danger: 'border-rose-200 bg-rose-50 text-rose-900',
}

// renders stack of toast notifications
export default function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4 sm:items-end sm:px-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-slate-900/10 ${
            VARIANT_STYLES[toast.variant] ?? VARIANT_STYLES.default
          }`}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold">{toast.title}</p>
            {toast.description && <p className="mt-1 text-sm opacity-70">{toast.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-xs font-semibold text-slate-400 transition hover:text-slate-900"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  )
}
