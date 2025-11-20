export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const goTo = (next) => {
    if (next < 1 || next > totalPages) return
    onChange(next)
  }

  const pages = []
  for (let current = 1; current <= totalPages; current += 1) {
    pages.push(
      <button
        key={current}
        type="button"
        onClick={() => goTo(current)}
        className={`h-10 w-10 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 ${
          current === page
            ? 'bg-linear-to-br from-stone-900 to-stone-700 text-white shadow-lg shadow-stone-900/25 hover:shadow-xl hover:shadow-stone-900/30'
            : 'border border-stone-200/60 bg-white/50 text-stone-600 backdrop-blur-sm hover:scale-110 hover:border-purple-200/60 hover:bg-white hover:text-stone-900 hover:shadow-md'
        }`}
      >
        {current}
      </button>,
    )
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3 overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 px-6 py-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="group rounded-full border border-stone-200/60 bg-white/50 px-5 py-2.5 text-sm font-medium text-stone-600 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-200/60 hover:bg-white hover:text-stone-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
      >
        <span className="flex items-center gap-2">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Prev
        </span>
      </button>
      {pages}
      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="group rounded-full border border-stone-200/60 bg-white/50 px-5 py-2.5 text-sm font-medium text-stone-600 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-200/60 hover:bg-white hover:text-stone-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
      >
        <span className="flex items-center gap-2">
          Next
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </button>
    </div>
  )
}

