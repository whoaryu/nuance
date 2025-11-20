export default function PageTitle({ title, subtitle, action }) {
  return (
    <header className="group relative my-12 overflow-hidden rounded-[2rem] border border-white/60 bg-linear-to-br from-white/95 via-white/90 to-white/80 px-10 py-8 text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
      <div className="absolute inset-0 bg-linear-to-br from-purple-50/30 via-transparent to-blue-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-purple-400">Nuance Collection</p>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-500">{subtitle}</p>}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  )
}

