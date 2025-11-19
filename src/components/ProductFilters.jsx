export default function ProductFilters({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <section className="mb-10 space-y-5 rounded-[2rem] border border-stone-200 bg-white px-6 py-5 shadow-sm shadow-stone-900/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex flex-1 flex-col text-xs font-semibold tracking-[0.3em] text-stone-400">
          SEARCH
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
            <span className="text-stone-300">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type product, mood, or intent"
              className="flex-1 bg-transparent text-base font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col text-xs font-semibold tracking-[0.3em] text-stone-400 lg:w-64">
          CATEGORY
          <select
            value={activeCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="mt-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-semibold text-stone-900 outline-none"
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

      <div className="flex flex-wrap gap-3">
        {['all', ...categories].map((categoryValue) => {
          const isActive = activeCategory === categoryValue
          return (
            <button
              key={categoryValue}
              type="button"
              onClick={() => onCategoryChange(categoryValue)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                isActive
                  ? 'bg-stone-900 text-white'
                  : 'border border-stone-200 text-stone-500 hover:text-stone-900'
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

