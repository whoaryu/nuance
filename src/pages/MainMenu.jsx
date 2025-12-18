import { Link } from 'react-router-dom'

export default function MainMenu() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-purple-50/30">
      <div className="max-w-4xl w-full px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 mb-4 tracking-tight">
            Nuance
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl">
            Choose your experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Shopping Experience Button */}
          <Link
            to="/shop"
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/95 via-white/90 to-white/80 p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset] hover:scale-[1.02]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
                🛍️
              </div>
              <h2 className="font-serif text-3xl font-semibold text-stone-900 mb-3">
                Shopping Experience
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Explore our curated collection of premium products. Browse, filter, and shop with an elegant, modern interface.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Enter Store</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>

          {/* ReactFlow Demo Button */}
          <Link
            to="/reactflow-demo"
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/95 via-white/90 to-white/80 p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset] hover:scale-[1.02]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
                🎨
              </div>
              <h2 className="font-serif text-3xl font-semibold text-stone-900 mb-3">
                ReactFlow Demo
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Interactive demonstration of ReactFlow capabilities. Explore node types, edges, controls, and advanced features.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Demo</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-400 text-sm">
            Built with React, ReactFlow, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}

