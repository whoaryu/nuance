import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { selectCartCount, selectCartTotal, useCartStore } from './store/cart'
import { formatCurrency } from './utils/format'
import NewsletterModal from './components/NewsletterModal'

// main navigation items
const navItems = [
  { label: 'Collection', to: '/' },
  { label: 'Bag', to: '/cart' },
  { label: 'Checkout', to: '/checkout' },
]

// trust badges shown in header
const badges = [
  {
    label: 'Free doorstep returns',
    detail: 'Pick-up from 28k pin codes',
  },
  {
    label: 'Same-day dispatch',
    detail: 'On orders before 2 PM',
  },
  {
    label: 'Club Nuance Rewards',
    detail: 'Earn 2× points this month',
  },
]

// main app layout component
export default function App() {
  const cartCount = useCartStore(selectCartCount)
  const subtotal = useCartStore(selectCartTotal)
  const [menuOpen, setMenuOpen] = useState(false) // mobile menu state
  const [showNewsletter, setShowNewsletter] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)
  
  // check if a nav item is active based on current route
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // show newsletter modal on first visit (with a small delay)
  useEffect(() => {
    const hasSeen = window.localStorage.getItem('nuance_newsletter_seen')
    if (!hasSeen) {
      const timer = setTimeout(() => setShowNewsletter(true), 1200)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  const handleNewsletterClose = (accepted) => {
    window.localStorage.setItem('nuance_newsletter_seen', 'true')
    setShowNewsletter(false)
    if (accepted) {
      // TODO: send email to backend
    }
  }

  return (
    <div className="min-h-screen text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="group relative overflow-visible rounded-[2.5rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 px-6 py-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset] sm:overflow-hidden sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-purple-50/30 via-transparent to-blue-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-serif text-2xl font-semibold tracking-tight text-stone-900">Nuance</p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">Curated Collection</p>
            </div>

            <div className="hidden flex-1 items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-stone-50/50 to-stone-100/30 px-4 py-3 text-xs text-stone-600 backdrop-blur-sm sm:flex">
              {badges.map((badge) => (
                <div key={badge.label} className="group/badge flex items-center gap-2 rounded-xl border border-stone-200/60 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-200/60 hover:shadow-md">
                  <div className="text-xs font-medium">
                    {badge.label}
                    <div className="text-[10px] font-normal uppercase tracking-[0.25em] text-stone-400 transition-colors group-hover/badge:text-purple-400">
                      {badge.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:text-stone-900 sm:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              Menu
              <span className="relative h-10 w-10">
                <span className="absolute inset-0 rounded-full border border-stone-200" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-2 rounded-full bg-stone-600" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 rounded-full bg-stone-600" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 translate-y-2 rounded-full bg-stone-600" />
              </span>
            </button>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className="group/cart flex items-center gap-3 rounded-full border border-stone-200/60 bg-linear-to-br from-white to-stone-50/50 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-200/60 hover:text-stone-900 hover:shadow-md"
            >
              <span className="relative">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-stone-900 to-stone-700 text-lg shadow-lg transition-transform duration-300 group-hover/cart:scale-110">
                  👜
                </span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 animate-pulse rounded-full bg-linear-to-br from-rose-500 to-rose-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </span>
              <div className="text-left text-[0.65rem] uppercase tracking-[0.25em] text-stone-400">
                Shopping Bag
                <p className="text-base font-semibold text-stone-900">
                  {formatCurrency(subtotal)}
                </p>
              </div>
            </NavLink>
          </div>

          <div className="mt-6 hidden items-center justify-center gap-2 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActivePath(item.to)
                    ? 'bg-linear-to-br from-stone-900 to-stone-700 text-white shadow-lg shadow-stone-900/25 hover:shadow-xl hover:shadow-stone-900/30'
                    : 'border border-stone-200/60 bg-white/50 text-stone-600 backdrop-blur-sm hover:scale-105 hover:border-purple-200/60 hover:bg-white hover:text-stone-900 hover:shadow-md'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div
            className={`mt-4 overflow-hidden rounded-2xl border border-stone-100 bg-white transition-[max-height,opacity] sm:hidden ${
              menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col divide-y divide-stone-100 text-sm font-semibold text-stone-600">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={`px-4 py-3 transition ${
                    isActivePath(item.to) ? 'text-stone-900' : 'hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="mt-10 flex-1">
          <Outlet />
        </main>
      </div>
      {(() => {
        const hideFloatingBag = location.pathname.startsWith('/cart') || location.pathname.startsWith('/checkout')
        if (hideFloatingBag) return null
        return (
          <Link
            to="/cart"
            aria-label="Open shopping bag"
            className="fixed bottom-6 right-4 z-30 sm:hidden"
          >
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-stone-900 to-stone-700 text-2xl text-white shadow-xl shadow-stone-900/30 transition hover:scale-105">
              🛍️
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white shadow">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
        )
      })()}
      <NewsletterModal open={showNewsletter} onClose={handleNewsletterClose} />
    </div>
  )
}
