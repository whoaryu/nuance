export default function ProductFilters({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <section className="mb-12 space-y-6 overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 px-8 py-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
        <label className="flex flex-1 flex-col text-[0.65rem] font-medium tracking-[0.25em] text-stone-400">
          SEARCH COLLECTION
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-200/60 bg-linear-to-br from-white to-stone-50/30 px-5 py-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 focus-within:border-purple-300/60 focus-within:shadow-md">
            <span className="text-xl text-stone-300">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by product, style, or category..."
              className="flex-1 bg-transparent text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col text-[0.65rem] font-medium tracking-[0.25em] text-stone-400 lg:w-72">
          FILTER BY CATEGORY
          <select
            value={activeCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="mt-2 cursor-pointer rounded-2xl border border-stone-200/60 bg-linear-to-br from-white to-stone-50/30 px-5 py-3.5 text-base font-medium text-stone-900 shadow-sm backdrop-blur-sm outline-none transition-all duration-300 hover:border-purple-300/60 hover:shadow-md"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {['all', ...categories].map((categoryValue) => {
          const isActive = activeCategory === categoryValue
          return (
            <button
              key={categoryValue}
              type="button"
              onClick={() => onCategoryChange(categoryValue)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium capitalize transition-all duration-300 ${
                isActive
                  ? 'bg-linear-to-br from-stone-900 to-stone-700 text-white shadow-lg shadow-stone-900/25 hover:shadow-xl hover:shadow-stone-900/30'
                  : 'border border-stone-200/60 bg-white/50 text-stone-600 backdrop-blur-sm hover:scale-105 hover:border-purple-200/60 hover:bg-white hover:text-stone-900 hover:shadow-md'
              }`}
            >
              {categoryValue}
            </button>
          )
        })}
      </div>
    </section>
  )
}

