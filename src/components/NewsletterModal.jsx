export default function NewsletterModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-black/70 via-black/60 to-black/70 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 p-8 text-stone-900 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl">
        <div className="absolute inset-0 bg-linear-to-br from-purple-50/40 via-transparent to-blue-50/30 opacity-50" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/60 bg-white/80 text-lg text-stone-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-stone-300 hover:text-stone-900 hover:shadow-md"
          aria-label="Close"
        >
          ×
        </button>
        <div className="relative">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-purple-500">Nuance Insiders</p>
          <h2 className="font-serif mt-3 text-3xl font-semibold tracking-tight">Join Our Circle</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Receive exclusive access to new collections, seasonal offers, and personalized styling recommendations. Curated updates, delivered thoughtfully.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              onClose(true)
            }}
          >
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              className="w-full rounded-2xl border border-stone-200/60 bg-linear-to-br from-white to-stone-50/30 px-5 py-3.5 text-sm text-stone-900 shadow-sm backdrop-blur-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:border-purple-300/60 focus:shadow-md"
            />
            <label className="flex items-center gap-3 text-xs text-stone-600">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-stone-300 text-purple-500 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20" />
              <span>Send me personalized offers via WhatsApp</span>
            </label>
            <button
              type="submit"
              className="group/submit w-full rounded-2xl bg-linear-to-br from-stone-900 to-stone-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/30"
            >
              <span className="flex items-center justify-center gap-2">
                Subscribe Now
                <span className="transition-transform duration-300 group-hover/submit:translate-x-1">→</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

