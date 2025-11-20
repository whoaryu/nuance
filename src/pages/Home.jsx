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
  const gridRef = useRef(null) // not used yet but keeping for scroll-to-top later
  const PER_PAGE = 9

  // filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE))
  // paginate the filtered results
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  )

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [search, category])

  // if current page is out of bounds (e.g. after filtering), fix it
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  return (
    <section>
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

