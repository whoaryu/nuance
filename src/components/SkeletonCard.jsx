export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.2)]">
      <div className="mb-4 h-52 rounded-2xl bg-stone-100" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded-full bg-stone-100" />
        <div className="h-3 w-1/2 rounded-full bg-stone-100" />
        <div className="h-3 w-2/3 rounded-full bg-stone-100" />
        <div className="h-10 rounded-2xl bg-stone-100" />
      </div>
    </div>
  )
}

