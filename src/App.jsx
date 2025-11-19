import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { selectCartCount, selectCartTotal, useCartStore } from './store/cart'
import { formatCurrency } from './utils/format'
import NewsletterModal from './components/NewsletterModal'

const navItems = [
  { label: 'Collection', to: '/' },
  { label: 'Bag', to: '/cart' },
  { label: 'Checkout', to: '/checkout' },
]

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

export default function App() {
  const cartCount = useCartStore(selectCartCount)
  const subtotal = useCartStore(selectCartTotal)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

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
      // placeholder for API call
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <header className="rounded-[36px] border border-stone-200 bg-white/95 px-4 py-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-stone-400">Nuance</p>
            </div>

            <div className="hidden flex-1 items-center justify-center gap-3 rounded-2xl bg-stone-100/80 px-4 py-3 text-xs text-stone-600 sm:flex">
              {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 rounded-xl border border-white/60 bg-white px-3 py-2 shadow-sm">
                  <div className="text-xs font-semibold">
                    {badge.label}
                    <div className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
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
              className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:text-stone-900"
            >
              <span className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white">
                  👜
                </span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              <div className="text-left text-xs uppercase tracking-[0.3em] text-stone-400">
                Bag
                <p className="text-base font-semibold text-stone-900">
                  {formatCurrency(subtotal)}
                </p>
              </div>
            </NavLink>
          </div>

          <div className="mt-5 hidden items-center justify-center gap-2 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActivePath(item.to)
                    ? 'bg-stone-900 text-white shadow-sm shadow-stone-900/20'
                    : 'border border-transparent text-stone-500 hover:text-stone-900'
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
      <NewsletterModal open={showNewsletter} onClose={handleNewsletterClose} />
    </div>
  )
}
