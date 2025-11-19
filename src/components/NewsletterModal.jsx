export default function NewsletterModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 text-stone-900 shadow-2xl shadow-stone-900/20">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-sm font-semibold text-stone-400 transition hover:text-stone-900"
          aria-label="Close"
        >
          ×
        </button>
        <p className="text-xs uppercase tracking-[0.4em] text-orange-500">Nuance insiders</p>
        <h2 className="mt-3 text-2xl font-semibold">Stay in the loop</h2>
        <p className="mt-2 text-sm text-stone-500">
          Sign up for early access drops, seasonal coupons, and member-only styling sessions. We send
          no more than one email a week.
        </p>
        <form
          className="mt-6 space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            onClose(true)
          }}
        >
          <input
            type="email"
            required
            placeholder="name@email.com"
            className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none"
          />
          <label className="flex items-center gap-2 text-xs text-stone-600">
            <input type="checkbox" defaultChecked className="rounded border-stone-300 text-orange-500" />
            Send me personalised offers on WhatsApp
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Get updates
          </button>
        </form>
      </div>
    </div>
  )
}

