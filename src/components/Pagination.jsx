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
        className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
          current === page
            ? 'bg-stone-900 text-white'
            : 'border border-stone-200 text-stone-600 hover:text-stone-900'
        }`}
      >
        {current}
      </button>,
    )
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      {pages}
      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}

