export default function PageTitle({ title, subtitle, action }) {
  return (
    <header className="my-10 flex flex-wrap items-start justify-between gap-6 rounded-[2rem] border border-stone-200 bg-white/80 px-8 py-6 text-stone-900 shadow-sm shadow-stone-900/5">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-stone-400">Nuance Edit</p>
        <h2 className="text-xl font-semibold leading-tight sm:text-xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-stone-500">{subtitle}</p>}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

