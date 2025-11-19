import { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import StateMessage from '../components/StateMessage'
import PageTitle from '../components/PageTitle'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'

export default function HomePage() {
  const { products, loading, error, refresh } = useProducts()
  const { categories } = useCategories()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const gridRef = useRef(null)
  const PER_PAGE = 9

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE))
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  )

  useEffect(() => {
    setPage(1)
  }, [search, category])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  return (
    <section>
      <div className="rounded-[2.5rem] border border-stone-200 bg-gradient-to-br from-white via-white to-[#f9f6f1] px-8 py-10 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.6)] sm:px-12 sm:py-14">
        <p className="text-xs uppercase tracking-[0.5em] text-stone-400">Nuance · Resort 25</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
          Edited staples with sharp lines and sun-faded palettes.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-500">
          A curated drop of daily essentials—dresses, denim, and objects—meant to mix seamlessly day
          to night. The SPA caches everything so browsing stays instant.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Shop the collection
          </button>
          <div className="rounded-full border border-stone-200 px-6 py-3 text-sm font-semibold text-stone-500">
            Bag updates sync everywhere instantly
          </div>
        </div>
      </div>

      <PageTitle
        title="Living catalog"
        subtitle="Search, filter, and add without losing context—everything is cached locally."
      />

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {loading && products.length === 0 && (
        <StateMessage title="Loading products" message="Fetching the latest catalog…" />
      )}

      {error && (
        <StateMessage
          title="Unable to load products"
          message={error}
          actionLabel="Retry"
          onAction={refresh}
        />
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <StateMessage
          title="No products match your filters"
          message="Try clearing the search or switching categories."
        />
      )}

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && products.length === 0
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          : paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {!loading && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </section>
  )
}

